package com.alumniconnect.controller;

import com.alumniconnect.dto.AlumniProfileDto;
import com.alumniconnect.dto.ApiResponse;
import com.alumniconnect.security.UserDetailsImpl;
import com.alumniconnect.service.AlumniProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alumni")
public class AlumniProfileController {

    private final AlumniProfileService profileService;

    public AlumniProfileController(AlumniProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/public")
    public ResponseEntity<ApiResponse<List<AlumniProfileDto>>> getPublicFeaturedProfiles() {
        List<AlumniProfileDto> profiles = profileService.searchAlumni(null, null, null, null);
        return ResponseEntity.ok(ApiResponse.success("Featured alumni retrieved", profiles));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<AlumniProfileDto>>> searchAlumni(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) Integer gradYear,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        Long currentUserId = userDetails != null ? userDetails.getId() : null;
        List<AlumniProfileDto> results = profileService.searchAlumni(keyword, department, gradYear, currentUserId);
        return ResponseEntity.ok(ApiResponse.success("Alumni directory retrieved", results));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AlumniProfileDto>> getProfileById(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        Long currentUserId = userDetails != null ? userDetails.getId() : null;
        AlumniProfileDto profile = profileService.getProfileById(id, currentUserId);
        return ResponseEntity.ok(ApiResponse.success("Profile details retrieved", profile));
    }

    @PutMapping("/me")
    public ResponseEntity<ApiResponse<AlumniProfileDto>> updateCurrentProfile(
            @RequestBody AlumniProfileDto dto,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        AlumniProfileDto updated = profileService.updateProfile(userDetails.getId(), dto);
        return ResponseEntity.ok(ApiResponse.success("Profile updated successfully", updated));
    }
}
