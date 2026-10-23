package com.alumniconnect.controller;

import com.alumniconnect.dto.ApiResponse;
import com.alumniconnect.dto.CreateJobRequest;
import com.alumniconnect.dto.JobDto;
import com.alumniconnect.entity.JobType;
import com.alumniconnect.security.UserDetailsImpl;
import com.alumniconnect.service.JobService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/jobs")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @GetMapping("/public")
    public ResponseEntity<ApiResponse<List<JobDto>>> getPublicJobs() {
        List<JobDto> jobs = jobService.searchJobs(null, null);
        return ResponseEntity.ok(ApiResponse.success("Active job opportunities", jobs));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<JobDto>>> searchJobs(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) JobType jobType) {
        List<JobDto> jobs = jobService.searchJobs(keyword, jobType);
        return ResponseEntity.ok(ApiResponse.success("Job search results", jobs));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<JobDto>> getJobById(@PathVariable Long id) {
        JobDto job = jobService.getJobById(id);
        return ResponseEntity.ok(ApiResponse.success("Job details retrieved", job));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<JobDto>> createJob(
            @Valid @RequestBody CreateJobRequest request,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        JobDto created = jobService.createJob(userDetails.getId(), request);
        return ResponseEntity.ok(ApiResponse.success("Job opportunity posted successfully", created));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteJob(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        jobService.deleteJob(id, userDetails.getId(), userDetails.getRole());
        return ResponseEntity.ok(ApiResponse.success("Job listing removed successfully", null));
    }
}
