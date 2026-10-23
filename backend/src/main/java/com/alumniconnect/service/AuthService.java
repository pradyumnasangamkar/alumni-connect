package com.alumniconnect.service;

import com.alumniconnect.dto.AuthResponse;
import com.alumniconnect.dto.LoginRequest;
import com.alumniconnect.dto.RegisterRequest;
import com.alumniconnect.entity.AlumniProfile;
import com.alumniconnect.entity.Role;
import com.alumniconnect.entity.User;
import com.alumniconnect.exception.BadRequestException;
import com.alumniconnect.repository.AlumniProfileRepository;
import com.alumniconnect.repository.UserRepository;
import com.alumniconnect.security.JwtUtils;
import com.alumniconnect.security.UserDetailsImpl;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final AlumniProfileRepository profileRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public AuthService(AuthenticationManager authenticationManager,
                       UserRepository userRepository,
                       AlumniProfileRepository profileRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    @Transactional
    public AuthResult login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        String jwt = jwtUtils.generateTokenFromEmail(userDetails.getUsername(), userDetails.getRole().name());
        ResponseCookie cookie = jwtUtils.generateJwtCookie(jwt);

        String avatarUrl = profileRepository.findByUserId(userDetails.getId())
                .map(AlumniProfile::getAvatarUrl)
                .orElse(null);

        AuthResponse response = new AuthResponse(
                jwt,
                userDetails.getId(),
                userDetails.getFullName(),
                userDetails.getUsername(),
                userDetails.getRole(),
                userDetails.getStatus(),
                avatarUrl
        );

        return new AuthResult(response, cookie);
    }

    @Transactional
    public AuthResult register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("An account with email " + request.getEmail() + " already exists.");
        }

        // Strict role safety: users cannot self-register as ADMIN
        if (request.getRole() == Role.ADMIN) {
            throw new BadRequestException("Self-registration as an Administrator is strictly prohibited.");
        }

        // 1. Create and persist User entity
        User user = new User(
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                request.getFullName(),
                request.getRole()
        );
        User savedUser = userRepository.save(user);

        // 2. Initialize corresponding 1:1 AlumniProfile
        AlumniProfile profile = new AlumniProfile(savedUser);
        profile.setDepartment("Computer Science and Engineering");
        profile.setGraduationYear(request.getRole() == Role.ALUMNI ? 2022 : 2026);
        profile.setHeadline(request.getRole() == Role.ALUMNI 
                ? "University Alumnus | Open to Mentorship" 
                : "Student Scholar | B.Tech CSE");
        profileRepository.save(profile);

        // 3. Generate token and session cookie
        String jwt = jwtUtils.generateTokenFromEmail(savedUser.getEmail(), savedUser.getRole().name());
        ResponseCookie cookie = jwtUtils.generateJwtCookie(jwt);

        AuthResponse response = new AuthResponse(
                jwt,
                savedUser.getId(),
                savedUser.getFullName(),
                savedUser.getEmail(),
                savedUser.getRole(),
                savedUser.getStatus(),
                null
        );

        return new AuthResult(response, cookie);
    }

    public ResponseCookie logout() {
        return jwtUtils.getCleanJwtCookie();
    }

    public static class AuthResult {
        private final AuthResponse response;
        private final ResponseCookie cookie;

        public AuthResult(AuthResponse response, ResponseCookie cookie) {
            this.response = response;
            this.cookie = cookie;
        }

        public AuthResponse getResponse() {
            return response;
        }

        public ResponseCookie getCookie() {
            return cookie;
        }
    }
}
