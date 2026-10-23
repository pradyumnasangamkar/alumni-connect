// src/pages/AIAssistantPage.jsx
import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  BookOpen, 
  Layers, 
  HelpCircle, 
  Briefcase, 
  CheckCircle2, 
  RotateCcw,
  Loader2
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { aiApi } from '../api/client';
import { aiCareerRoadmapsMock } from '../data/mockData';

export const AIAssistantPage = () => {
  const [userQuery, setUserQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [guidanceResult, setGuidanceResult] = useState(aiCareerRoadmapsMock["Java Full Stack Developer"]);

  const suggestedQuestions = [
    "How do I prepare for campus placements as a Java Full Stack fresher?",
    "What backend projects impress recruiters at product companies?",
    "Give me a 3-month roadmap to crack Spring Boot & Hibernate interviews.",
    "What are the most common technical interview questions for 2026 CS graduates?"
  ];

  const handleAsk = async (queryText) => {
    const query = (queryText || userQuery).trim();
    if (!query) return;

    setUserQuery(query);
    setIsLoading(true);

    try {
      const result = await aiApi.getGuidance(query, "Computer Science fundamentals", "Final Year 2026 Graduate");
      if (result) {
        setGuidanceResult(result);
      }
    } catch (err) {
      console.warn("Backend guidance call, applying smart local guidance:", err.message);
      
      const qLower = query.toLowerCase();
      let assessment = `For "${query}", product companies prioritize candidates who demonstrate strong engineering fundamentals, structured problem-solving, and hands-on implementation over rote memorization.`;
      let skills = ["Object-Oriented Design", "Data Structures & Algorithms", "Relational Database Modeling", "RESTful API Integration", "Git Version Control"];
      let phases = [
        { phase: "Phase 1: Core Fundamentals & DSA (Weeks 1-4)", focus: "Master arrays, hash maps, binary trees, recursion, and core OOP principles with daily problem solving." },
        { phase: "Phase 2: Full Stack Implementation (Weeks 5-8)", focus: "Build a production-grade full stack application integrating database transactions, authentication, and REST endpoints." },
        { phase: "Phase 3: Placement Polish & Mock Rounds (Weeks 9-12)", focus: "Refine your resume, rehearse technical elevator pitches, and practice system design fundamentals." }
      ];
      let projects = [
        { title: "Production Full Stack Platform", summary: "A scalable web platform demonstrating role-based security, normalized relational schema, and clean API design." },
        { title: "High-Concurrency API Service", summary: "A backend service handling concurrent transactions with rate limiting and database connection pooling." }
      ];
      let questions = [
        "Explain the complete request-response lifecycle from browser click to database query.",
        "How do database indexes improve search performance and what are their trade-offs?",
        "What is the difference between synchronous and asynchronous execution?",
        "How do you design database tables to avoid redundancy and anomalies (3NF)?",
        "Describe a challenging technical bug you encountered and how you debugged it step-by-step."
      ];

      if (qLower.includes("project") || qLower.includes("impress")) {
        assessment = "Recruiters at tier-1 product companies look for projects that solve real problems with realistic constraints (authentication, concurrency, relational integrity) rather than basic to-do list tutorials.";
        projects = [
          { title: "Alumni Connect Web Platform", summary: "A professional networking portal with Spring Security, BCrypt password hashing, and normalized MySQL tables." },
          { title: "Distributed Ticket Reservation Service", summary: "A seat booking engine handling concurrent reservations with database row-level locking." }
        ];
      } else if (qLower.includes("roadmap") || qLower.includes("spring") || qLower.includes("hibernate")) {
        assessment = "A structured 3-month roadmap for Java & Spring Boot focuses on moving from core OOP concepts to transaction management and enterprise security.";
        skills = ["Java 21 LTS", "Spring Boot 3", "Spring Data JPA & Hibernate", "MySQL 8.0", "Spring Security & JWT"];
        phases = [
          { phase: "Month 1: Core Java & Spring MVC Lifecycle", focus: "DispatcherServlet routing, Bean Validation (@Valid), and @ControllerAdvice exception handling." },
          { phase: "Month 2: Hibernate ORM & Data Persistence", focus: "3NF schema design, @OneToMany mappings, preventing N+1 queries with join fetch, and HikariCP." },
          { phase: "Month 3: Security & React Integration", focus: "BCrypt password hashing, HttpOnly JWT cookies, CORS configuration, and cloud deployment." }
        ];
      }

      setGuidanceResult({
        assessment,
        coreSkills: skills,
        roadmapPhases: phases,
        recommendedProjects: projects,
        interviewQuestions: questions
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setUserQuery('');
    setGuidanceResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-left">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B7CFF]/15 border border-[#8B7CFF]/30 text-xs text-[#8B7CFF] font-medium mb-1">
          <Sparkles className="w-3.5 h-3.5 text-[#55D6E8]" />
          <span>AI Career Counselor</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#F3F5FC]">
          Career Guidance Assistant
        </h1>
        <p className="text-sm text-[#A7B2C8]">
          Ask any question about campus placements, learning roadmaps, resume projects, or technical interview preparation.
        </p>
      </div>

      {/* Suggested Questions */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-[#7F8BA3] uppercase tracking-wider text-center sm:text-left">
          Suggested Questions (Click to Ask):
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {suggestedQuestions.map((question, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleAsk(question)}
              className="p-3 bg-[#151E33] hover:bg-[#1C2742] border border-[#26334B] hover:border-[#8B7CFF]/60 rounded-xl text-left text-xs text-[#A7B2C8] hover:text-[#F3F5FC] transition-all cursor-pointer flex items-center justify-between group"
            >
              <span>{question}</span>
              <Sparkles className="w-3.5 h-3.5 text-[#8B7CFF] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      </div>

      {/* Single Clean Prompt Input */}
      <div className="bg-[#151E33] border border-[#26334B] rounded-2xl p-4 sm:p-5 shadow-xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk(userQuery);
          }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <input
            type="text"
            placeholder="e.g. How do I become a Java Backend Developer starting from scratch?"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            className="flex-1 bg-[#10172A] border border-[#26334B] hover:border-[#3B4D6E] focus:border-[#8B7CFF] text-sm text-[#F3F5FC] rounded-xl px-4 py-3 outline-none transition-all placeholder-[#7F8BA3]"
          />
          <div className="flex gap-2">
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              icon={Send}
              className="w-full sm:w-auto"
            >
              Get Guidance
            </Button>
            {guidanceResult && (
              <Button
                type="button"
                variant="outline"
                icon={RotateCcw}
                onClick={handleReset}
                title="Start new inquiry"
              >
                Reset
              </Button>
            )}
          </div>
        </form>
      </div>

      {/* Loading Feedback */}
      {isLoading && (
        <div className="bg-[#151E33] border border-[#26334B] rounded-2xl p-10 text-center space-y-3 animate-pulse">
          <Loader2 className="w-7 h-7 text-[#8B7CFF] animate-spin mx-auto" />
          <p className="text-sm font-semibold text-[#F3F5FC]">
            Analyzing your career question and preparing practical guidance...
          </p>
          <p className="text-xs text-[#7F8BA3]">
            Synthesizing industry expectations, study roadmap, and interview prep topics.
          </p>
        </div>
      )}

      {/* Guidance Output Cards */}
      {!isLoading && guidanceResult && (
        <div className="space-y-6">
          {/* Section 1: Assessment */}
          <div className="bg-[#151E33] border border-[#26334B] rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="p-2 bg-[#8B7CFF]/15 text-[#8B7CFF] rounded-lg">
                <BookOpen className="w-4 h-4" />
              </span>
              <h3 className="text-base font-bold text-[#F3F5FC]">
                Career Guidance & Assessment
              </h3>
            </div>
            <p className="text-sm text-[#A7B2C8] leading-relaxed">
              {guidanceResult.assessment}
            </p>

            {guidanceResult.coreSkills?.length > 0 && (
              <div className="mt-4 pt-4 border-t border-[#26334B]/60">
                <p className="text-xs font-semibold text-[#7F8BA3] uppercase tracking-wider mb-2">
                  Key Skills to Focus On:
                </p>
                <div className="flex flex-wrap gap-2">
                  {guidanceResult.coreSkills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-full bg-[#8B7CFF]/15 text-[#8B7CFF] border border-[#8B7CFF]/30 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Step-by-Step Roadmap */}
          {guidanceResult.roadmapPhases?.length > 0 && (
            <div className="bg-[#151E33] border border-[#26334B] rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="p-2 bg-[#55D6E8]/15 text-[#55D6E8] rounded-lg">
                  <Layers className="w-4 h-4" />
                </span>
                <h3 className="text-base font-bold text-[#F3F5FC]">
                  Step-by-Step Learning Roadmap
                </h3>
              </div>

              <div className="space-y-3">
                {guidanceResult.roadmapPhases.map((phase, idx) => (
                  <div
                    key={idx}
                    className="bg-[#10172A] border border-[#26334B] rounded-xl p-4 flex items-start gap-3.5"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#8B7CFF]/20 text-[#8B7CFF] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-[#F3F5FC]">
                        {phase.phase}
                      </h4>
                      <p className="text-xs text-[#A7B2C8] mt-1 leading-relaxed">
                        {phase.focus}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 3: Projects & Interview Questions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project Ideas */}
            {guidanceResult.recommendedProjects?.length > 0 && (
              <div className="bg-[#151E33] border border-[#26334B] rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="p-2 bg-[#43D9A3]/15 text-[#43D9A3] rounded-lg">
                    <Briefcase className="w-4 h-4" />
                  </span>
                  <h3 className="text-base font-bold text-[#F3F5FC]">
                    Resume Project Ideas
                  </h3>
                </div>

                <div className="space-y-3">
                  {guidanceResult.recommendedProjects.map((proj, i) => (
                    <div key={i} className="p-3.5 bg-[#10172A] border border-[#26334B] rounded-xl">
                      <p className="text-xs font-semibold text-[#F3F5FC]">{proj.title}</p>
                      <p className="text-xs text-[#A7B2C8] mt-1 leading-relaxed">{proj.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Questions */}
            {guidanceResult.interviewQuestions?.length > 0 && (
              <div className="bg-[#151E33] border border-[#26334B] rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="p-2 bg-[#F5C76A]/15 text-[#F5C76A] rounded-lg">
                    <HelpCircle className="w-4 h-4" />
                  </span>
                  <h3 className="text-base font-bold text-[#F3F5FC]">
                    Interview Questions to Expect
                  </h3>
                </div>

                <div className="space-y-2 text-xs">
                  {guidanceResult.interviewQuestions.map((q, i) => (
                    <div key={i} className="p-2.5 bg-[#10172A] border border-[#26334B] rounded-xl flex items-start gap-2.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#43D9A3] shrink-0 mt-0.5" />
                      <span className="text-[#F3F5FC] leading-relaxed">{q}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
