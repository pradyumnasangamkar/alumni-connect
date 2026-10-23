package com.alumniconnect.controller;

import com.alumniconnect.dto.AiGuidanceRequest;
import com.alumniconnect.dto.AiGuidanceResponse;
import com.alumniconnect.dto.ApiResponse;
import com.alumniconnect.security.UserDetailsImpl;
import com.alumniconnect.service.GeminiAiService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ai")
public class AiAdvisorController {

    private final GeminiAiService aiService;

    public AiAdvisorController(GeminiAiService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/guidance")
    public ResponseEntity<ApiResponse<AiGuidanceResponse>> getCareerGuidance(
            @Valid @RequestBody AiGuidanceRequest request,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        Long userId = userDetails != null ? userDetails.getId() : null;
        AiGuidanceResponse guidance = aiService.generateCareerGuidance(userId, request);

        return ResponseEntity.ok(ApiResponse.success("AI career roadmap generated successfully", guidance));
    }
}
