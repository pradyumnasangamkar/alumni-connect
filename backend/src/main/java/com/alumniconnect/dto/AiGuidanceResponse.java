package com.alumniconnect.dto;

import java.util.List;

public class AiGuidanceResponse {

    private String assessment;
    private List<String> coreSkills;
    private List<RoadmapPhaseDto> roadmapPhases;
    private List<RecommendedProjectDto> recommendedProjects;
    private List<String> interviewQuestions;

    public AiGuidanceResponse() {
    }

    public static class RoadmapPhaseDto {
        private String phase;
        private String focus;

        public RoadmapPhaseDto() {}
        public RoadmapPhaseDto(String phase, String focus) {
            this.phase = phase;
            this.focus = focus;
        }
        public String getPhase() { return phase; }
        public void setPhase(String phase) { this.phase = phase; }
        public String getFocus() { return focus; }
        public void setFocus(String focus) { this.focus = focus; }
    }

    public static class RecommendedProjectDto {
        private String title;
        private String summary;

        public RecommendedProjectDto() {}
        public RecommendedProjectDto(String title, String summary) {
            this.title = title;
            this.summary = summary;
        }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getSummary() { return summary; }
        public void setSummary(String summary) { this.summary = summary; }
    }

    // Getters and Setters
    public String getAssessment() {
        return assessment;
    }

    public void setAssessment(String assessment) {
        this.assessment = assessment;
    }

    public List<String> getCoreSkills() {
        return coreSkills;
    }

    public void setCoreSkills(List<String> coreSkills) {
        this.coreSkills = coreSkills;
    }

    public List<RoadmapPhaseDto> getRoadmapPhases() {
        return roadmapPhases;
    }

    public void setRoadmapPhases(List<RoadmapPhaseDto> roadmapPhases) {
        this.roadmapPhases = roadmapPhases;
    }

    public List<RecommendedProjectDto> getRecommendedProjects() {
        return recommendedProjects;
    }

    public void setRecommendedProjects(List<RecommendedProjectDto> recommendedProjects) {
        this.recommendedProjects = recommendedProjects;
    }

    public List<String> getInterviewQuestions() {
        return interviewQuestions;
    }

    public void setInterviewQuestions(List<String> interviewQuestions) {
        this.interviewQuestions = interviewQuestions;
    }
}
