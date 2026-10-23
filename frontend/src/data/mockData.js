// src/data/mockData.js
// Isolated prototype dataset representing real MySQL database entities.
// In Phase 5, these will be replaced with real Spring Boot REST API calls.

export const currentUserMock = {
  id: 1,
  fullName: "Sangamesh Patil",
  email: "sangamesh.dev@university.edu",
  role: "STUDENT", // 'STUDENT' | 'ALUMNI' | 'ADMIN'
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
  headline: "Aspiring Full Stack Engineer | CSE '26 | Java & React Enthusiast",
  department: "Computer Science and Engineering",
  graduationYear: 2026,
  location: "Bengaluru, India",
  profileCompletion: 85,
  bio: "Pre-final year Computer Science student passionate about building scalable web applications. Currently mastering Java, Spring Boot, microservices architecture, and modern React interfaces.",
  skills: ["Java", "Spring Boot", "MySQL", "React", "JavaScript", "Tailwind CSS", "Git"],
  linkedinUrl: "https://linkedin.com",
  githubUrl: "https://github.com",
};

export const alumniProfilesMock = [
  {
    id: 101,
    userId: 2,
    fullName: "Priya Sharma",
    email: "priya.sharma@google.com",
    role: "ALUMNI",
    headline: "Senior Software Engineer at Google | Cloud Infrastructure",
    currentCompany: "Google",
    currentRole: "Senior Software Engineer",
    department: "Computer Science and Engineering",
    graduationYear: 2019,
    location: "Hyderabad, India",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250",
    bio: "Ex-Amazon, now designing high-throughput distributed systems at Google Cloud. Eager to mentor CSE undergrads on system design and Java backend engineering.",
    skills: ["Java", "Distributed Systems", "Kubernetes", "Spring Cloud", "Go", "GCP"],
    linkedinUrl: "https://linkedin.com",
    githubUrl: "https://github.com",
    connectionStatus: "NONE", // 'NONE' | 'PENDING' | 'ACCEPTED'
  },
  {
    id: 102,
    userId: 3,
    fullName: "Arjun Verma",
    email: "arjun.v@microsoft.com",
    role: "ALUMNI",
    headline: "Product Architect at Microsoft | Azure Developer Division",
    currentCompany: "Microsoft",
    currentRole: "Product Architect",
    department: "Information Technology",
    graduationYear: 2017,
    location: "Bengaluru, India",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
    bio: "Alumnus batch of 2017. Passionate about developer tooling, API architecture, and helping juniors ace their campus placement rounds.",
    skills: ["Azure", "C#", "Spring Boot", "Microservices", "RESTful APIs", "Docker"],
    linkedinUrl: "https://linkedin.com",
    githubUrl: "https://github.com",
    connectionStatus: "ACCEPTED",
  },
  {
    id: 103,
    userId: 4,
    fullName: "Ananya Iyer",
    email: "ananya.iyer@salesforce.com",
    role: "ALUMNI",
    headline: "Lead Backend Developer at Salesforce | Open Source Contributor",
    currentCompany: "Salesforce",
    currentRole: "Lead Backend Developer",
    department: "Computer Science and Engineering",
    graduationYear: 2020,
    location: "Bengaluru, India",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250",
    bio: "Focused on high-performance CRM microservices. Regular speaker at university tech chapters and enthusiastic open-source maintainer.",
    skills: ["Java", "Spring Boot", "Kafka", "PostgreSQL", "Redis", "CI/CD"],
    linkedinUrl: "https://linkedin.com",
    githubUrl: "https://github.com",
    connectionStatus: "PENDING",
  },
  {
    id: 104,
    userId: 5,
    fullName: "Rohan Kulkarni",
    email: "rohan.k@uber.com",
    role: "ALUMNI",
    headline: "Software Engineer II at Uber | Marketplace Routing Team",
    currentCompany: "Uber",
    currentRole: "Software Engineer II",
    department: "Electronics & Communication",
    graduationYear: 2021,
    location: "Hyderabad, India",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250",
    bio: "Transitioned from ECE to core backend software engineering. Ready to assist non-CS & CS students with DSA, LeetCode, and competitive programming tips.",
    skills: ["Java", "Algorithms", "Apache Flink", "System Design", "MySQL"],
    linkedinUrl: "https://linkedin.com",
    githubUrl: "https://github.com",
    connectionStatus: "NONE",
  },
  {
    id: 105,
    userId: 6,
    fullName: "Meera Nair",
    email: "meera.nair@adobe.com",
    role: "ALUMNI",
    headline: "Full Stack Engineer at Adobe | Creative Cloud Experience",
    currentCompany: "Adobe",
    currentRole: "Full Stack Engineer",
    department: "Information Technology",
    graduationYear: 2022,
    location: "Noida, India",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250",
    bio: "Passionate about bridge-building between sleek React frontends and solid Spring Boot backends. Happy to review student resumes and portfolio projects.",
    skills: ["React", "JavaScript", "Spring Boot", "GraphQL", "Tailwind CSS", "Java"],
    linkedinUrl: "https://linkedin.com",
    githubUrl: "https://github.com",
    connectionStatus: "NONE",
  },
  {
    id: 106,
    userId: 7,
    fullName: "Devraj Sengupta",
    email: "devraj.s@goldmansachs.com",
    role: "ALUMNI",
    headline: "Quantitative Tech Analyst at Goldman Sachs | Low Latency Systems",
    currentCompany: "Goldman Sachs",
    currentRole: "Tech Analyst",
    department: "Computer Science and Engineering",
    graduationYear: 2018,
    location: "Bengaluru, India",
    avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=250",
    bio: "Building robust financial computation pipelines. Mentoring students on clean code practices, concurrent programming, and Java memory management.",
    skills: ["Core Java", "Multithreading", "Spring Data JPA", "Financial Tech", "SQL"],
    linkedinUrl: "https://linkedin.com",
    githubUrl: "https://github.com",
    connectionStatus: "NONE",
  }
];

export const connectionRequestsMock = [
  {
    id: 1,
    sender: {
      id: 104,
      fullName: "Rohan Kulkarni",
      currentRole: "Software Engineer II",
      currentCompany: "Uber",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250",
      department: "ECE '21",
    },
    sentAt: "2 days ago",
    note: "Hey Sangamesh! Saw your interest in Spring Boot backend engineering. Would love to connect and share some resources."
  },
  {
    id: 2,
    sender: {
      id: 105,
      fullName: "Meera Nair",
      currentRole: "Full Stack Engineer",
      currentCompany: "Adobe",
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250",
      department: "IT '22",
    },
    sentAt: "3 days ago",
    note: "Happy to connect with fellow university developers! Feel free to reach out for portfolio reviews."
  }
];

export const jobsMock = [
  {
    id: 201,
    title: "Associate Software Engineer (Java / Backend)",
    companyName: "Salesforce",
    companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=120",
    location: "Bengaluru (Hybrid)",
    jobType: "FULL_TIME", // 'FULL_TIME' | 'INTERNSHIP' | 'REMOTE'
    experienceLevel: "Fresher / 0-1 Years",
    postedBy: "Ananya Iyer (Alumna '20)",
    postedAt: "1 day ago",
    deadline: "2026-11-30",
    isActive: true,
    description: "Looking for bright 2025/2026 graduates with strong Java fundamentals, basic Spring Boot knowledge, and understanding of REST APIs and relational databases. Team handles customer cloud microservices.",
    requirements: [
      "Proficiency in Java 17/21 and Object-Oriented Design",
      "Familiarity with Spring Framework (Spring Boot, Spring Data JPA)",
      "Good command over SQL queries and schema normalization",
      "Basic understanding of Git and version control workflows"
    ],
    applicationUrl: "https://salesforce.com/careers"
  },
  {
    id: 202,
    title: "Software Engineering Intern - Summer 2027",
    companyName: "Google Cloud",
    companyLogo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&q=80&w=120",
    location: "Hyderabad (On-site)",
    jobType: "INTERNSHIP",
    experienceLevel: "Pre-final Year (2026 Batch)",
    postedBy: "Priya Sharma (Alumna '19)",
    postedAt: "3 days ago",
    deadline: "2026-12-15",
    isActive: true,
    description: "Exciting 6-month internship for pre-final year students passionate about large-scale distributed computing, reliable cloud backends, and low latency microservices.",
    requirements: [
      "Enrolled in B.Tech / B.E. Computer Science or related degree",
      "Strong foundation in Data Structures, Algorithms, and Operating Systems",
      "Hands-on coding experience in Java, C++, or Go",
      "Eagerness to learn cloud architectures (GCP/AWS)"
    ],
    applicationUrl: "https://google.com/about/careers"
  },
  {
    id: 203,
    title: "Junior Full Stack Developer",
    companyName: "Razorpay",
    companyLogo: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=120",
    location: "Remote / Bengaluru",
    jobType: "REMOTE",
    experienceLevel: "0-2 Years",
    postedBy: "Arjun Verma (Alumnus '17)",
    postedAt: "5 days ago",
    deadline: "2026-11-20",
    isActive: true,
    description: "Join the merchant dashboard team. You will build user-facing React web components and integrate them with high-reliability Java Spring Boot microservices.",
    requirements: [
      "Solid understanding of JavaScript (ES6+), React, and CSS/Tailwind",
      "Experience with Spring Boot REST API integration",
      "Knowledge of authentication principles (JWT, Session cookies)",
      "Attention to responsive UI detail and accessibility"
    ],
    applicationUrl: "https://razorpay.com/jobs"
  }
];

export const eventsMock = [
  {
    id: 301,
    title: "Demystifying Spring Boot & Microservices for Campus Placements",
    eventType: "WEBINAR",
    organizerName: "Priya Sharma & Arjun Verma",
    date: "Saturday, Nov 15, 2026",
    time: "6:00 PM - 7:30 PM IST",
    locationOrLink: "Google Meet (Link emailed upon RSVP)",
    maxCapacity: 100,
    registeredCount: 68,
    isRegistered: true,
    description: "An insider look at what product companies actually test in Java Full Stack interviews. We'll break down Spring Boot core concepts, Hibernate traps, and how to present your personal projects effectively.",
    highlights: [
      "Live Q&A with Senior Engineers from Google and Microsoft",
      "Common Spring Security and JPA interview pitfalls",
      "Portfolio architecture review session"
    ]
  },
  {
    id: 302,
    title: "Annual Alumni & Final-Year Networking Gala 2026",
    eventType: "REUNION",
    organizerName: "University Alumni Relations",
    date: "Friday, Dec 12, 2026",
    time: "5:00 PM - 9:00 PM IST",
    locationOrLink: "Main Auditorium & Banquet Hall, Campus",
    maxCapacity: 250,
    registeredCount: 192,
    isRegistered: false,
    description: "Connect with over 150 alumni returning to campus from across leading tech enterprises, startups, and research labs. Refreshments, panel discussions, and career booth networking.",
    highlights: [
      "Keynote addresses from distinguished alumni entrepreneurs",
      "Dedicated department networking lounges",
      "Direct referral exchange zone"
    ]
  },
  {
    id: 303,
    title: "Hands-on Workshop: Building & Deploying Full Stack React + Spring Apps",
    eventType: "WORKSHOP",
    organizerName: "Ananya Iyer & Meera Nair",
    date: "Sunday, Nov 23, 2026",
    time: "10:00 AM - 1:00 PM IST",
    locationOrLink: "Virtual Zoom Session",
    maxCapacity: 75,
    registeredCount: 54,
    isRegistered: false,
    description: "Live coding workshop demonstrating step-by-step how to connect a modern React frontend to a Spring Boot backend, configure JWT authentication, and deploy to cloud platforms without spending a penny.",
    highlights: [
      "CORS configuration and secure cookie handling",
      "Dockerization and free-tier cloud deployment",
      "Starter repository code provided to all attendees"
    ]
  }
];

export const notificationsMock = [
  {
    id: 1,
    title: "Connection Accepted",
    message: "Arjun Verma accepted your connection request.",
    timestamp: "10 minutes ago",
    isRead: false,
  },
  {
    id: 2,
    title: "New Job Match",
    message: "Salesforce posted 'Associate Software Engineer (Java)' matching your profile.",
    timestamp: "2 hours ago",
    isRead: false,
  },
  {
    id: 3,
    title: "Event RSVP Confirmed",
    message: "You are registered for 'Demystifying Spring Boot for Campus Placements'.",
    timestamp: "Yesterday",
    isRead: true,
  }
];

export const aiCareerRoadmapsMock = {
  "Java Full Stack Developer": {
    assessment: "Your foundation in Java, Spring Boot, and React puts you in high demand for campus recruitment and fresher SDE-1 roles. Product companies prioritize candidates with clear understanding of Spring MVC internals, database indexing, and responsive React state management.",
    coreSkills: ["Java 21 LTS", "Spring Boot 3", "Spring Data JPA", "MySQL & Indexing", "React 18", "Tailwind CSS", "Git & REST APIs"],
    roadmapPhases: [
      {
        phase: "Phase 1: Backend Rigor (Weeks 1-4)",
        focus: "Spring Boot MVC Request Lifecycle, Bean Validation, Global Exception Handling (@ControllerAdvice), and Spring Security with JWT."
      },
      {
        phase: "Phase 2: Database Mastery (Weeks 5-7)",
        focus: "Relational modeling (3NF), Hibernate entity relationships (@OneToMany, @ManyToMany), N+1 query problem, and HikariCP connection pooling."
      },
      {
        phase: "Phase 3: Frontend & Deployment (Weeks 8-10)",
        focus: "React component architecture, custom hooks, CORS configuration, HttpOnly cookies, and deploying frontend to Vercel and backend to Render/Railway."
      }
    ],
    recommendedProjects: [
      {
        title: "Alumni Connect Web Platform",
        summary: "A production-grade alumni networking portal featuring role-based Spring Security, normalized MySQL schema, and Google Gemini AI career advisor."
      },
      {
        title: "Distributed Rate Limiter Service",
        summary: "A lightweight token-bucket API rate limiter built using Spring Boot and Redis to demonstrate concurrency and distributed caching fundamentals."
      }
    ],
    interviewQuestions: [
      "Explain the exact difference between JPA, Hibernate, and Spring Data JPA.",
      "How does the Spring MVC DispatcherServlet handle an incoming HTTP request?",
      "Why should you store JWTs in HttpOnly cookies instead of browser localStorage?",
      "What is the Hibernate N+1 select problem and how do you resolve it?",
      "Explain Inversion of Control (IoC) and Dependency Injection (DI) with a real code example."
    ]
  }
};
