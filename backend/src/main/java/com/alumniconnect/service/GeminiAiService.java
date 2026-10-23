package com.alumniconnect.service;

import com.alumniconnect.dto.AiGuidanceRequest;
import com.alumniconnect.dto.AiGuidanceResponse;
import com.alumniconnect.entity.CareerConversation;
import com.alumniconnect.entity.User;
import com.alumniconnect.repository.CareerConversationRepository;
import com.alumniconnect.repository.UserRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class GeminiAiService {

    private static final Logger logger = LoggerFactory.getLogger(GeminiAiService.class);

    private final CareerConversationRepository conversationRepository;
    private final UserRepository userRepository;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    @Value("${app.ai.gemini.api-key:demo_key}")
    private String defaultApiKey;

    @Value("${app.ai.gemini.model:gemini-1.5-flash}")
    private String model;

    public GeminiAiService(CareerConversationRepository conversationRepository,
                           UserRepository userRepository) {
        this.conversationRepository = conversationRepository;
        this.userRepository = userRepository;
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }

    public AiGuidanceResponse generateCareerGuidance(Long userId, AiGuidanceRequest request) {
        String activeKey = (request.getApiKey() != null && !request.getApiKey().isBlank())
                ? request.getApiKey().trim()
                : defaultApiKey;

        AiGuidanceResponse response;

        if (activeKey != null && !activeKey.isBlank() && !activeKey.equals("demo_key")) {
            try {
                response = callGeminiApi(request, activeKey);
            } catch (Exception e) {
                logger.warn("Live Gemini API call failed, falling back to intelligent domain engine: {}", e.getMessage());
                response = generateDomainSpecificRoadmap(request);
            }
        } else {
            response = generateDomainSpecificRoadmap(request);
        }

        final AiGuidanceResponse finalResponse = response;
        if (userId != null) {
            userRepository.findById(userId).ifPresent(user -> {
                try {
                    String jsonResponse = objectMapper.writeValueAsString(finalResponse);
                    CareerConversation conversation = new CareerConversation(
                            user,
                            "Role: " + request.getTargetRole() + " | Skills: " + request.getCurrentSkills(),
                            jsonResponse,
                            model
                    );
                    conversationRepository.save(conversation);
                } catch (Exception e) {
                    logger.error("Failed to persist career conversation: {}", e.getMessage());
                }
            });
        }

        return response;
    }

    private AiGuidanceResponse callGeminiApi(AiGuidanceRequest request, String keyToUse) {
        String endpoint = "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent?key=" + keyToUse;

        String prompt = "You are a distinguished Silicon Valley software engineering director and technical interviewer.\n" +
                "Target Role: " + request.getTargetRole() + "\n" +
                "Current Candidate Skills: " + request.getCurrentSkills() + "\n" +
                "Education & Cohort Level: " + request.getEducationLevel() + "\n\n" +
                "Generate a customized, deeply technical career preparation roadmap specifically for this target role.\n" +
                "You must return ONLY a strictly valid JSON object without markdown formatting or code fences, matching this schema:\n" +
                "{\n" +
                "  \"assessment\": \"string analyzing their background and high-impact gaps for this exact role\",\n" +
                "  \"coreSkills\": [\"array\", \"of\", \"skills\"],\n" +
                "  \"roadmapPhases\": [{\"phase\": \"Phase title with timeframe\", \"focus\": \"concise technical focus\"}],\n" +
                "  \"recommendedProjects\": [{\"title\": \"Project name\", \"summary\": \"detailed production-level project description\"}],\n" +
                "  \"interviewQuestions\": [\"5 technical interview questions frequently asked for this exact role\"]\n" +
                "}";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(
                                Map.of("text", prompt)
                        ))
                )
        );

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
        ResponseEntity<String> apiResponse = restTemplate.postForEntity(endpoint, entity, String.class);

        if (apiResponse.getStatusCode().is2xxSuccessful() && apiResponse.getBody() != null) {
            try {
                JsonNode root = objectMapper.readTree(apiResponse.getBody());
                String contentText = root.path("candidates").get(0).path("content").path("parts").get(0).path("text").asText();

                if (contentText.contains("```json")) {
                    contentText = contentText.substring(contentText.indexOf("```json") + 7);
                    contentText = contentText.substring(0, contentText.lastIndexOf("```"));
                } else if (contentText.contains("```")) {
                    contentText = contentText.substring(contentText.indexOf("```") + 3);
                    contentText = contentText.substring(0, contentText.lastIndexOf("```"));
                }

                return objectMapper.readValue(contentText.trim(), AiGuidanceResponse.class);
            } catch (Exception e) {
                logger.warn("Could not parse Gemini JSON response: {}", e.getMessage());
            }
        }

        return generateDomainSpecificRoadmap(request);
    }

    /**
     * Domain-adaptive engine that dynamically customizes the roadmap, project specs,
     * core skill matrix, and interview question bank based on the exact target role and skills.
     */
    private AiGuidanceResponse generateDomainSpecificRoadmap(AiGuidanceRequest request) {
        String roleLower = request.getTargetRole().toLowerCase();
        String skillsLower = request.getCurrentSkills().toLowerCase();

        AiGuidanceResponse response = new AiGuidanceResponse();

        if (roleLower.contains("frontend") || roleLower.contains("ui") || roleLower.contains("react") || roleLower.contains("web developer")) {
            // FRONTEND FOCUS
            response.setAssessment(
                    "For a frontend engineer targeting " + request.getTargetRole() + " starting from " + request.getCurrentSkills() +
                    ", recruiters look beyond simple HTML/CSS styling. You must demonstrate state management efficiency, " +
                    "deep understanding of browser rendering pipelines, Virtual DOM diffing, accessibility (ARIA), and Core Web Vitals optimization."
            );
            response.setCoreSkills(List.of(
                    "JavaScript (ES2024+, Closures, Event Loop)",
                    "React 18/19 & Concurrent Features",
                    "TypeScript & Type-Safe Component Contracts",
                    "Tailwind CSS & Design System Architecture",
                    "State Management (Zustand / Redux Toolkit)",
                    "Web Performance & Core Web Vitals (LCP, INP, CLS)",
                    "Client-Side Testing (Vitest & React Testing Library)"
            ));
            response.setRoadmapPhases(List.of(
                    new AiGuidanceResponse.RoadmapPhaseDto(
                            "Phase 1: Advanced JS Internals & Modern React (Weeks 1-4)",
                            "Master asynchronous JavaScript (Promises, Event Loop microtasks), custom React hooks, reconciliation diffing, and memoization (useMemo, useCallback)."
                    ),
                    new AiGuidanceResponse.RoadmapPhaseDto(
                            "Phase 2: TypeScript & Design Systems (Weeks 5-8)",
                            "Build a headless accessible UI component library using Tailwind CSS and Radix primitives with 100% strict TypeScript types and zero layout shift."
                    ),
                    new AiGuidanceResponse.RoadmapPhaseDto(
                            "Phase 3: Performance, SSR & Edge Deployment (Weeks 9-12)",
                            "Implement code-splitting via dynamic imports, service workers for offline caching, Next.js App Router for Server Components, and deploy to Vercel/Cloudflare Pages."
                    )
            ));
            response.setRecommendedProjects(List.of(
                    new AiGuidanceResponse.RecommendedProjectDto(
                            "Collaborative Real-Time Canvas / Whiteboard",
                            "A responsive real-time diagramming tool built with React, HTML5 Canvas/SVG, WebSockets, and Zustand with infinite undo/redo history."
                    ),
                    new AiGuidanceResponse.RecommendedProjectDto(
                            "Enterprise Data Grid & Analytics Dashboard",
                            "A virtualized data table rendering 50,000+ rows smoothly with column resizing, multi-column sorting, debounced filtering, and zero frame drops."
                    )
            ));
            response.setInterviewQuestions(List.of(
                    "Explain the browser Event Loop, call stack, microtask queue, and macrotask queue in detail.",
                    "How does React's Reconciliation algorithm compare Virtual DOM trees, and why are keys essential in lists?",
                    "What is the difference between client-side rendering (CSR), server-side rendering (SSR), and incremental static regeneration (ISR)?",
                    "How do you optimize Core Web Vitals, specifically Largest Contentful Paint (LCP) and Interaction to Next Paint (INP)?",
                    "Explain JavaScript closures and prototype inheritance with real code examples."
            ));

        } else if (roleLower.contains("devops") || roleLower.contains("cloud") || roleLower.contains("sre") || roleLower.contains("infrastructure")) {
            // CLOUD & DEVOPS FOCUS
            response.setAssessment(
                    "For an aspiring " + request.getTargetRole() + " with skills in " + request.getCurrentSkills() +
                    ", industry infrastructure teams expect hands-on comfort with containerization, immutable infrastructure as code (IaC), " +
                    "automated CI/CD pipelines, and distributed observability (metrics, logs, traces)."
            );
            response.setCoreSkills(List.of(
                    "Linux Kernel & Shell Scripting (Bash)",
                    "Docker & Multi-stage Container Builds",
                    "Kubernetes (Pods, Deployments, Services, Ingress)",
                    "Infrastructure as Code (Terraform)",
                    "CI/CD Automation (GitHub Actions / GitLab CI)",
                    "Cloud Providers (AWS / GCP Core Services)",
                    "Observability (Prometheus, Grafana, OpenTelemetry)"
            ));
            response.setRoadmapPhases(List.of(
                    new AiGuidanceResponse.RoadmapPhaseDto(
                            "Phase 1: Linux System Administration & Containers (Weeks 1-4)",
                            "Master process management, networking (IP, DNS, iptables), SSH hardening, and building hardened, rootless Docker containers under 50MB."
                    ),
                    new AiGuidanceResponse.RoadmapPhaseDto(
                            "Phase 2: Kubernetes Orchestration & GitOps (Weeks 5-8)",
                            "Deploy microservices on a local k8s cluster (minikube/k3s) configuring Horizontal Pod Autoscaling (HPA), Secrets, and ArgoCD GitOps pipelines."
                    ),
                    new AiGuidanceResponse.RoadmapPhaseDto(
                            "Phase 3: Cloud IaC & Observability (Weeks 9-12)",
                            "Provision AWS VPC, EKS, and RDS infrastructure using modular Terraform, with automated Prometheus metrics and Grafana alerts."
                    )
            ));
            response.setRecommendedProjects(List.of(
                    new AiGuidanceResponse.RecommendedProjectDto(
                            "Zero-Downtime Blue-Green Kubernetes Deployment",
                            "A self-healing containerized application deployed across Kubernetes using Terraform, automated GitHub Actions CI/CD, and NGINX ingress traffic shifting."
                    ),
                    new AiGuidanceResponse.RecommendedProjectDto(
                            "Distributed Cloud Monitoring & Alerting Suite",
                            "A complete observability stack monitoring system resources, container health, and application HTTP latencies with alert triggers to Slack."
                    )
            ));
            response.setInterviewQuestions(List.of(
                    "What happens under the hood when a Kubernetes Pod is scheduled and created?",
                    "Explain the difference between Docker bridge, host, and overlay networking.",
                    "How does Terraform track infrastructure state and resolve state drift?",
                    "What is the difference between a Blue-Green deployment and a Canary rollout?",
                    "How do you troubleshoot a Kubernetes Pod stuck in CrashLoopBackOff status?"
            ));

        } else if (roleLower.contains("data") || roleLower.contains("machine learning") || roleLower.contains("ai engineer") || roleLower.contains("ml")) {
            // DATA & ML/AI FOCUS
            response.setAssessment(
                    "For a candidate targeting " + request.getTargetRole() + " building on " + request.getCurrentSkills() +
                    ", recruiters look for rigorous mathematical foundations, data wrangling fluency, feature engineering mastery, " +
                    "and practical experience deploying production ML models as low-latency REST microservices."
            );
            response.setCoreSkills(List.of(
                    "Python 3 (NumPy, Pandas, Vectorized Ops)",
                    "Exploratory Data Analysis & Feature Engineering",
                    "Classical ML (Scikit-Learn, XGBoost, Regression/Trees)",
                    "Deep Learning Basics (PyTorch)",
                    "Model Serving (FastAPI, ONNX, Docker)",
                    "Relational & Vector Databases (PostgreSQL / ChromaDB)",
                    "Model Evaluation & Drift Monitoring"
            ));
            response.setRoadmapPhases(List.of(
                    new AiGuidanceResponse.RoadmapPhaseDto(
                            "Phase 1: Data Manipulation & Statistical Foundations (Weeks 1-4)",
                            "Master vectorized Pandas operations, probability distributions, hypothesis testing, missing data imputation, and outlier treatment."
                    ),
                    new AiGuidanceResponse.RoadmapPhaseDto(
                            "Phase 2: Supervised & Unsupervised Modeling (Weeks 5-8)",
                            "Implement cross-validation, hyperparameter tuning via Optuna, ensemble trees (Random Forests, LightGBM), and evaluation metrics (AUC-ROC, F1-score)."
                    ),
                    new AiGuidanceResponse.RoadmapPhaseDto(
                            "Phase 3: End-to-End MLOps & Production Inference (Weeks 9-12)",
                            "Containerize model inference pipelines inside FastAPI with input pydantic schemas, deploy to cloud instances, and track experiments using MLflow."
                    )
            ));
            response.setRecommendedProjects(List.of(
                    new AiGuidanceResponse.RecommendedProjectDto(
                            "End-to-End Predictive Placement & Salary Forecaster",
                            "An ML web service training Gradient Boosting models on student academic data, packaged in Docker with an interactive Streamlit/React interface."
                    ),
                    new AiGuidanceResponse.RecommendedProjectDto(
                            "Retrieval-Augmented Generation (RAG) Document Query Engine",
                            "A domain knowledge assistant chunking technical documentation, embedding with SentenceTransformers into ChromaDB, and querying via LLM prompts."
                    )
            ));
            response.setInterviewQuestions(List.of(
                    "Explain the Bias-Variance tradeoff and how regularization (L1 Lasso vs L2 Ridge) impacts model complexity.",
                    "What is the difference between Precision, Recall, and F1-score, and which would you prioritize for fraud detection?",
                    "How does Gradient Descent work mathematically, and why do we use Adam optimizer over standard SGD?",
                    "What is data leakage and how do you prevent it during preprocessing and cross-validation?",
                    "Explain how vector embeddings and cosine similarity enable semantic search in RAG architectures."
            ));

        } else if (roleLower.contains("mobile") || roleLower.contains("android") || roleLower.contains("ios") || roleLower.contains("flutter")) {
            // MOBILE DEVELOPMENT FOCUS
            response.setAssessment(
                    "For a mobile engineer targeting " + request.getTargetRole() + " with skills in " + request.getCurrentSkills() +
                    ", companies look for clean architecture (MVVM), responsive touch ergonomics, offline-first local caching, " +
                    "asynchronous background processing, and battery/memory efficiency."
            );
            response.setCoreSkills(List.of(
                    "Kotlin / Dart Modern Language Features",
                    "Jetpack Compose / Flutter Declarative UI",
                    "MVVM Architecture & Unidirectional Data Flow",
                    "Local Persistence (Room DB / SQLite)",
                    "Asynchronous Coroutines & StateFlow",
                    "REST Client Integration (Retrofit / Dio)",
                    "Material Design 3 & Accessibility"
            ));
            response.setRoadmapPhases(List.of(
                    new AiGuidanceResponse.RoadmapPhaseDto(
                            "Phase 1: Declarative UI & Reactive State (Weeks 1-4)",
                            "Build responsive mobile layouts using Compose/Flutter declarative primitives, state hoisting, and dark theme tokens."
                    ),
                    new AiGuidanceResponse.RoadmapPhaseDto(
                            "Phase 2: Offline-First Architecture & Networking (Weeks 5-8)",
                            "Implement repository pattern caching network responses into local Room/SQLite database with Kotlin Coroutines and Flow."
                    ),
                    new AiGuidanceResponse.RoadmapPhaseDto(
                            "Phase 3: Background Jobs, Push Notifications & Play Store Release (Weeks 9-12)",
                            "Configure WorkManager for background sync, Firebase Cloud Messaging (FCM) for push notifications, and build release APK/AAB packages."
                    )
            ));
            response.setRecommendedProjects(List.of(
                    new AiGuidanceResponse.RecommendedProjectDto(
                            "Offline-First University Campus Companion App",
                            "A native mobile app featuring event schedules, offline cached alumni directories, instant bookmarking, and push notification reminders."
                    ),
                    new AiGuidanceResponse.RecommendedProjectDto(
                            "Personal Finance & Expense Tracker with Biometric Auth",
                            "A secure mobile finance ledger with Room database encryption, biometric fingerprint login, and interactive spending charts."
                    )
            ));
            response.setInterviewQuestions(List.of(
                    "Explain the Android Activity/Fragment lifecycle and how ViewModel preserves state across configuration changes.",
                    "What is the difference between StateFlow and SharedFlow in Kotlin Coroutines?",
                    "How does Compose/Flutter minimize recomposition and layout redraw passes?",
                    "How do you implement an offline-first repository pattern in mobile applications?",
                    "What strategies do you use to prevent memory leaks in mobile applications?"
            ));

        } else {
            // BACKEND & FULL STACK JAVA (Default & Enhanced)
            response.setAssessment(
                    "For a candidate targeting " + request.getTargetRole() + " with foundation in " + request.getCurrentSkills() +
                    ", recruiters look for demonstrable mastery of the complete web request lifecycle, relational ACID transactions, " +
                    "Spring Security filter chains, clean DTO separation, and high-performance database indexing."
            );
            response.setCoreSkills(List.of(
                    "Java 21 LTS (Virtual Threads, Records, Pattern Matching)",
                    "Spring Boot 3.x (Spring MVC, Auto-Configuration)",
                    "Spring Data JPA & Hibernate 6",
                    "MySQL 8.0 (3NF Normalization, Indexing, Transactions)",
                    "Spring Security 6 (BCrypt Hashing & JWT Cookies)",
                    "RESTful API Design & RFC-7807 Error Standards",
                    "React 18 & Client Fetch Integration"
            ));
            response.setRoadmapPhases(List.of(
                    new AiGuidanceResponse.RoadmapPhaseDto(
                            "Phase 1: Backend Rigor & Request Lifecycle (Weeks 1-4)",
                            "Master DispatcherServlet routing, JSR-380 Bean Validation (@Valid), DTO separation, and @RestControllerAdvice global exception handling."
                    ),
                    new AiGuidanceResponse.RoadmapPhaseDto(
                            "Phase 2: Relational Data Persistence (Weeks 5-8)",
                            "Design 3NF relational schemas, implement entity relationships (@OneToMany, @ManyToMany), prevent Hibernate N+1 query traps with join fetch, and tune HikariCP."
                    ),
                    new AiGuidanceResponse.RoadmapPhaseDto(
                            "Phase 3: Enterprise Security & Cloud Deployment (Weeks 9-12)",
                            "Implement BCrypt password hashing, secure HttpOnly cookie session management, connect React frontend fetch client, and deploy publicly to Render & Vercel."
                    )
            ));
            response.setRecommendedProjects(List.of(
                    new AiGuidanceResponse.RecommendedProjectDto(
                            "Alumni Connect Production Platform",
                            "A full-stack university networking application built with Spring Boot 3, MySQL, and React, demonstrating role-based security, normalized database design, and external AI integration."
                    ),
                    new AiGuidanceResponse.RecommendedProjectDto(
                            "Distributed High-Concurrency Seat Booking Ledger",
                            "A ticket reservation backend handling concurrent seat booking requests using database row-level locking, idempotent REST endpoints, and transaction rollbacks."
                    )
            ));
            response.setInterviewQuestions(List.of(
                    "Explain the architectural differences between JDBC, JPA, Hibernate, and Spring Data JPA.",
                    "How does the Spring MVC DispatcherServlet process an incoming HTTP request?",
                    "Why should production web applications store JWTs in HttpOnly cookies rather than browser localStorage?",
                    "What is the Hibernate N+1 select problem and what are two ways to solve it?",
                    "How does Spring's @Transactional annotation work internally using AOP proxies?"
            ));
        }

        return response;
    }
}
