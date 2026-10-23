package com.alumniconnect.dto;

import jakarta.validation.constraints.NotBlank;

public class AiGuidanceRequest {

    @NotBlank(message = "Target role is required")
    private String targetRole;

    @NotBlank(message = "Current skills are required")
    private String currentSkills;

    @NotBlank(message = "Education/experience level is required")
    private String educationLevel;

    private String apiKey; // Optional user-provided Gemini API key

    public AiGuidanceRequest() {
    }

    public AiGuidanceRequest(String targetRole, String currentSkills, String educationLevel) {
        this.targetRole = targetRole;
        this.currentSkills = currentSkills;
        this.educationLevel = educationLevel;
    }

    public String getTargetRole() {
        return targetRole;
    }

    public void setTargetRole(String targetRole) {
        this.targetRole = targetRole;
    }

    public String getCurrentSkills() {
        return currentSkills;
    }

    public void setCurrentSkills(String currentSkills) {
        this.currentSkills = currentSkills;
    }

    public String getEducationLevel() {
        return educationLevel;
    }

    public void setEducationLevel(String educationLevel) {
        this.educationLevel = educationLevel;
    }

    public String getApiKey() {
        return apiKey;
    }

    public void setApiKey(String apiKey) {
        this.apiKey = apiKey;
    }
}
