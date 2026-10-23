package com.alumniconnect;

import com.alumniconnect.dto.RegisterRequest;
import com.alumniconnect.entity.Role;
import com.alumniconnect.entity.User;
import com.alumniconnect.exception.BadRequestException;
import com.alumniconnect.repository.AlumniProfileRepository;
import com.alumniconnect.repository.UserRepository;
import com.alumniconnect.security.JwtUtils;
import com.alumniconnect.service.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private UserRepository userRepository;

    @Mock
    private AlumniProfileRepository profileRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtils jwtUtils;

    @InjectMocks
    private AuthService authService;

    @Test
    void register_ShouldThrowException_WhenEmailAlreadyExists() {
        RegisterRequest request = new RegisterRequest("Test Student", "existing@university.edu", "Password123", Role.STUDENT);
        when(userRepository.existsByEmail("existing@university.edu")).thenReturn(true);

        BadRequestException ex = assertThrows(BadRequestException.class, () -> authService.register(request));
        assertTrue(ex.getMessage().contains("already exists"));
        verify(userRepository, never()).save(any());
    }

    @Test
    void register_ShouldThrowException_WhenAdminRoleRequested() {
        RegisterRequest request = new RegisterRequest("Attacker", "hacker@university.edu", "Password123", Role.ADMIN);
        when(userRepository.existsByEmail("hacker@university.edu")).thenReturn(false);

        BadRequestException ex = assertThrows(BadRequestException.class, () -> authService.register(request));
        assertTrue(ex.getMessage().contains("Administrator is strictly prohibited"));
        verify(userRepository, never()).save(any());
    }

    @Test
    void register_ShouldSucceed_WhenValidStudentRequest() {
        RegisterRequest request = new RegisterRequest("Sangamesh", "sanga@university.edu", "Password@123", Role.STUDENT);
        when(userRepository.existsByEmail("sanga@university.edu")).thenReturn(false);
        when(passwordEncoder.encode(any())).thenReturn("hashedPassword");

        User savedUser = new User("sanga@university.edu", "hashedPassword", "Sangamesh", Role.STUDENT);
        savedUser.setId(10L);
        when(userRepository.save(any(User.class))).thenReturn(savedUser);

        when(jwtUtils.generateTokenFromEmail(any(), any())).thenReturn("mock.jwt.token");
        when(jwtUtils.generateJwtCookie(any())).thenReturn(ResponseCookie.from("token", "val").build());

        AuthService.AuthResult result = authService.register(request);

        assertNotNull(result);
        assertEquals("sanga@university.edu", result.getResponse().getEmail());
        assertEquals(Role.STUDENT, result.getResponse().getRole());
        verify(userRepository, times(1)).save(any(User.class));
        verify(profileRepository, times(1)).save(any());
    }
}
