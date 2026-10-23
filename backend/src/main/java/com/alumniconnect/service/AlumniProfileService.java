package com.alumniconnect.service;

import com.alumniconnect.dto.AlumniProfileDto;
import com.alumniconnect.entity.AlumniProfile;
import com.alumniconnect.entity.ConnectionRequest;
import com.alumniconnect.entity.ConnectionStatus;
import com.alumniconnect.entity.User;
import com.alumniconnect.exception.ResourceNotFoundException;
import com.alumniconnect.repository.AlumniProfileRepository;
import com.alumniconnect.repository.ConnectionRequestRepository;
import com.alumniconnect.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AlumniProfileService {

    private final AlumniProfileRepository profileRepository;
    private final ConnectionRequestRepository connectionRepository;
    private final UserRepository userRepository;

    public AlumniProfileService(AlumniProfileRepository profileRepository,
                                 ConnectionRequestRepository connectionRepository,
                                 UserRepository userRepository) {
        this.profileRepository = profileRepository;
        this.connectionRepository = connectionRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<AlumniProfileDto> searchAlumni(String keyword, String department, Integer gradYear, Long currentUserId) {
        List<AlumniProfile> profiles = profileRepository.searchProfiles(
                keyword != null && !keyword.isBlank() ? keyword : null,
                department != null && !department.isBlank() && !"ALL".equalsIgnoreCase(department) ? department : null,
                gradYear != null && gradYear > 0 ? gradYear : null
        );

        return profiles.stream()
                .map(p -> mapToDto(p, currentUserId))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public AlumniProfileDto getProfileById(Long id, Long currentUserId) {
        AlumniProfile profile = profileRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found with id: " + id));

        return mapToDto(profile, currentUserId);
    }

    @Transactional
    public AlumniProfileDto updateProfile(Long userId, AlumniProfileDto dto) {
        AlumniProfile profile = profileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found for user id: " + userId));

        if (dto.getHeadline() != null) profile.setHeadline(dto.getHeadline());
        if (dto.getCurrentCompany() != null) profile.setCurrentCompany(dto.getCurrentCompany());
        if (dto.getCurrentRole() != null) profile.setCurrentRole(dto.getCurrentRole());
        if (dto.getLocation() != null) profile.setLocation(dto.getLocation());
        if (dto.getDepartment() != null) profile.setDepartment(dto.getDepartment());
        if (dto.getGraduationYear() != null) profile.setGraduationYear(dto.getGraduationYear());
        if (dto.getBio() != null) profile.setBio(dto.getBio());
        if (dto.getLinkedinUrl() != null) profile.setLinkedinUrl(dto.getLinkedinUrl());
        if (dto.getGithubUrl() != null) profile.setGithubUrl(dto.getGithubUrl());
        if (dto.getAvatarUrl() != null) profile.setAvatarUrl(dto.getAvatarUrl());

        if (dto.getSkills() != null) {
            profile.setSkills(String.join(", ", dto.getSkills()));
        }

        AlumniProfile saved = profileRepository.save(profile);
        return mapToDto(saved, userId);
    }

    private AlumniProfileDto mapToDto(AlumniProfile profile, Long currentUserId) {
        AlumniProfileDto dto = new AlumniProfileDto();
        dto.setId(profile.getId());

        User user = profile.getUser();
        if (user != null) {
            dto.setUserId(user.getId());
            dto.setFullName(user.getFullName());
            dto.setEmail(user.getEmail());
            dto.setRole(user.getRole());
        }

        dto.setHeadline(profile.getHeadline());
        dto.setCurrentCompany(profile.getCurrentCompany() != null ? profile.getCurrentCompany() : "Tech Enterprise");
        dto.setCurrentRole(profile.getCurrentRole() != null ? profile.getCurrentRole() : "Software Engineer");
        dto.setLocation(profile.getLocation());
        dto.setDepartment(profile.getDepartment());
        dto.setGraduationYear(profile.getGraduationYear());
        dto.setBio(profile.getBio());
        dto.setLinkedinUrl(profile.getLinkedinUrl());
        dto.setGithubUrl(profile.getGithubUrl());
        dto.setAvatarUrl(profile.getAvatarUrl());

        if (profile.getSkills() != null && !profile.getSkills().isBlank()) {
            dto.setSkills(Arrays.stream(profile.getSkills().split(","))
                    .map(String::trim)
                    .collect(Collectors.toList()));
        } else {
            dto.setSkills(Collections.emptyList());
        }

        // Determine connection status relative to the current user
        dto.setConnectionStatus("NONE");
        if (currentUserId != null && user != null && !currentUserId.equals(user.getId())) {
            Optional<ConnectionRequest> req1 = connectionRepository.findBySenderIdAndReceiverId(currentUserId, user.getId());
            Optional<ConnectionRequest> req2 = connectionRepository.findBySenderIdAndReceiverId(user.getId(), currentUserId);

            if (req1.isPresent()) {
                dto.setConnectionStatus(req1.get().getStatus().name());
            } else if (req2.isPresent()) {
                dto.setConnectionStatus(req2.get().getStatus().name());
            }
        }

        return dto;
    }
}
