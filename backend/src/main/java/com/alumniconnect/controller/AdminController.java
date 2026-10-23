package com.alumniconnect.controller;

import com.alumniconnect.dto.ApiResponse;
import com.alumniconnect.entity.Role;
import com.alumniconnect.entity.User;
import com.alumniconnect.entity.UserStatus;
import com.alumniconnect.exception.BadRequestException;
import com.alumniconnect.exception.ResourceNotFoundException;
import com.alumniconnect.repository.AlumniProfileRepository;
import com.alumniconnect.repository.EventRepository;
import com.alumniconnect.repository.JobRepository;
import com.alumniconnect.repository.UserRepository;
import com.alumniconnect.service.EventService;
import com.alumniconnect.service.JobService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserRepository userRepository;
    private final AlumniProfileRepository profileRepository;
    private final JobRepository jobRepository;
    private final EventRepository eventRepository;
    private final JobService jobService;
    private final EventService eventService;

    public AdminController(UserRepository userRepository,
                           AlumniProfileRepository profileRepository,
                           JobRepository jobRepository,
                           EventRepository eventRepository,
                           JobService jobService,
                           EventService eventService) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.jobRepository = jobRepository;
        this.eventRepository = eventRepository;
        this.jobService = jobService;
        this.eventService = eventService;
    }

    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<Map<String, Object>> result = users.stream().map(u -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", u.getId());
            map.put("fullName", u.getFullName());
            map.put("email", u.getEmail());
            map.put("role", u.getRole().name());
            map.put("status", u.getStatus().name());
            map.put("createdAt", u.getCreatedAt());

            profileRepository.findByUserId(u.getId()).ifPresent(p -> {
                map.put("currentCompany", p.getCurrentCompany());
                map.put("currentRole", p.getCurrentRole());
                map.put("department", p.getDepartment());
                map.put("avatarUrl", p.getAvatarUrl());
            });

            return map;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(ApiResponse.success("User directory", result));
    }

    @PatchMapping("/users/{id}/status")
    public ResponseEntity<ApiResponse<Void>> updateUserStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        String statusStr = body.get("status");
        if (statusStr == null) {
            throw new BadRequestException("Status is required");
        }

        try {
            UserStatus newStatus = UserStatus.valueOf(statusStr.toUpperCase());
            user.setStatus(newStatus);
            userRepository.save(user);
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid status value: " + statusStr);
        }

        return ResponseEntity.ok(ApiResponse.success("User status updated successfully", null));
    }

    @DeleteMapping("/jobs/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteJobByAdmin(@PathVariable Long id) {
        jobService.deleteJob(id, 0L, Role.ADMIN);
        return ResponseEntity.ok(ApiResponse.success("Job listing removed by admin", null));
    }

    @DeleteMapping("/events/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteEventByAdmin(@PathVariable Long id) {
        eventService.deleteEvent(id, 0L, Role.ADMIN);
        return ResponseEntity.ok(ApiResponse.success("Event removed by admin", null));
    }

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<Map<String, Long>>> getSystemStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalJobs", jobRepository.count());
        stats.put("totalEvents", eventRepository.count());
        return ResponseEntity.ok(ApiResponse.success("System statistics", stats));
    }
}
