package com.alumniconnect.service;

import com.alumniconnect.dto.CreateJobRequest;
import com.alumniconnect.dto.JobDto;
import com.alumniconnect.entity.Job;
import com.alumniconnect.entity.JobType;
import com.alumniconnect.entity.Role;
import com.alumniconnect.entity.User;
import com.alumniconnect.exception.BadRequestException;
import com.alumniconnect.exception.ResourceNotFoundException;
import com.alumniconnect.repository.JobRepository;
import com.alumniconnect.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    public JobService(JobRepository jobRepository, UserRepository userRepository) {
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<JobDto> searchJobs(String keyword, JobType jobType) {
        List<Job> jobs = jobRepository.searchJobs(
                keyword != null && !keyword.isBlank() ? keyword : null,
                jobType
        );

        return jobs.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public JobDto getJobById(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job opportunity not found with id: " + id));

        return mapToDto(job);
    }

    @Transactional
    public JobDto createJob(Long userId, CreateJobRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        // Enforce permissions: only ALUMNI or ADMIN can post jobs
        if (user.getRole() != Role.ALUMNI && user.getRole() != Role.ADMIN) {
            throw new BadRequestException("Only verified alumni and administrators can post opportunities.");
        }

        Job job = new Job();
        job.setPostedBy(user);
        job.setTitle(request.getTitle());
        job.setCompanyName(request.getCompanyName());
        job.setLocation(request.getLocation() != null ? request.getLocation() : "Remote / Hybrid");
        job.setJobType(request.getJobType());
        job.setExperienceLevel(request.getExperienceLevel() != null ? request.getExperienceLevel() : "Fresher / 0-1 Years");
        job.setDescription(request.getDescription());
        job.setApplicationUrl(request.getApplicationUrl() != null ? request.getApplicationUrl() : "https://careers.example.com");
        job.setDeadline(request.getDeadline());
        job.setIsActive(true);

        if (request.getRequirements() != null) {
            job.setRequirements(String.join("\n", request.getRequirements()));
        }

        Job saved = jobRepository.save(job);
        return mapToDto(saved);
    }

    @Transactional
    public void deleteJob(Long jobId, Long userId, Role role) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job opportunity not found with id: " + jobId));

        // Owner or Admin only
        if (!job.getPostedBy().getId().equals(userId) && role != Role.ADMIN) {
            throw new BadRequestException("You do not have permission to delete this job listing.");
        }

        jobRepository.delete(job);
    }

    private JobDto mapToDto(Job job) {
        JobDto dto = new JobDto();
        dto.setId(job.getId());
        dto.setPostedById(job.getPostedBy().getId());
        dto.setPostedByName(job.getPostedBy().getFullName());
        dto.setTitle(job.getTitle());
        dto.setCompanyName(job.getCompanyName());
        dto.setLocation(job.getLocation());
        dto.setJobType(job.getJobType());
        dto.setExperienceLevel(job.getExperienceLevel());
        dto.setDescription(job.getDescription());
        dto.setApplicationUrl(job.getApplicationUrl());
        dto.setIsActive(job.getIsActive());
        dto.setDeadline(job.getDeadline());
        dto.setCreatedAt(job.getCreatedAt());

        if (job.getRequirements() != null && !job.getRequirements().isBlank()) {
            dto.setRequirements(Arrays.stream(job.getRequirements().split("\n"))
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .collect(Collectors.toList()));
        } else {
            dto.setRequirements(Collections.emptyList());
        }

        return dto;
    }
}
