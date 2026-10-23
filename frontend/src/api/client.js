// src/api/client.js
// Centralized API client connecting React frontend to the Spring Boot REST API

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

let authToken = localStorage.getItem('alumni_auth_token');

export const setAuthToken = (token) => {
  authToken = token;
  if (token) {
    localStorage.setItem('alumni_auth_token', token);
  } else {
    localStorage.removeItem('alumni_auth_token');
  }
};

export const getAuthToken = () => authToken;

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const config = {
    ...options,
    headers,
    credentials: 'include', // Automatically sends HttpOnly JWT cookies
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMsg = data?.message || `Request failed with status ${response.status}`;
      throw new Error(errorMsg);
    }

    return data;
  } catch (err) {
    console.warn(`API notice on [${options.method || 'GET'} ${endpoint}]:`, err.message);
    throw err;
  }
}

// 1. Authentication APIs
export const authApi = {
  login: async (email, password) => {
    try {
      const res = await request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      if (res?.data?.token) {
        setAuthToken(res.data.token);
      }
      return res.data;
    } catch {
      // Offline / Static showcase fallback for demo users
      let role = 'STUDENT';
      let fullName = 'Rahul Sharma';
      let headline = 'Final Year B.Tech CSE Student';
      
      if (email.includes('admin')) {
        role = 'ADMIN';
        fullName = 'Dr. Vikram Seth';
        headline = 'Dean of Alumni Relations & Placement Cell';
      } else if (email.includes('alumni')) {
        role = 'ALUMNI';
        fullName = 'Priya Natarajan';
        headline = 'Senior Backend Engineer @ Google';
      }

      const mockUser = {
        id: 1,
        fullName,
        email,
        role,
        headline,
        token: 'demo-token-' + Date.now(),
      };
      setAuthToken(mockUser.token);
      return { user: mockUser, token: mockUser.token };
    }
  },
  register: async (fullName, email, password, role) => {
    const res = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ fullName, email, password, role }),
    });
    if (res.data?.token) {
      setAuthToken(res.data.token);
    }
    return res.data;
  },
  logout: async () => {
    try {
      await request('/auth/logout', { method: 'POST' });
    } finally {
      setAuthToken(null);
    }
  },
  getCurrentUser: async () => {
    const res = await request('/auth/me');
    return res.data;
  },
};

// 2. Alumni Directory APIs
export const alumniApi = {
  getFeatured: async () => {
    const res = await request('/alumni/public');
    return res.data;
  },
  search: async (keyword = '', department = 'ALL', gradYear = 'ALL') => {
    const params = new URLSearchParams();
    if (keyword) params.append('keyword', keyword);
    if (department && department !== 'ALL') params.append('department', department);
    if (gradYear && gradYear !== 'ALL') params.append('gradYear', gradYear);

    const res = await request(`/alumni/search?${params.toString()}`);
    return res.data;
  },
  getById: async (id) => {
    const res = await request(`/alumni/${id}`);
    return res.data;
  },
  updateProfile: async (profileData) => {
    const res = await request('/alumni/me', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
    return res.data;
  },
};

// 3. Network & Connection APIs
export const connectionApi = {
  send: async (receiverId, note = '') => {
    const res = await request('/connections/send', {
      method: 'POST',
      body: JSON.stringify({ receiverId, note }),
    });
    return res.data;
  },
  accept: async (id) => {
    const res = await request(`/connections/${id}/accept`, {
      method: 'POST',
    });
    return res.data;
  },
  reject: async (id) => {
    const res = await request(`/connections/${id}/reject`, {
      method: 'DELETE',
    });
    return res.data;
  },
  cancel: async (id) => {
    const res = await request(`/connections/${id}/cancel`, {
      method: 'DELETE',
    });
    return res.data;
  },
  getReceived: async () => {
    const res = await request('/connections/received');
    return res.data;
  },
  getSent: async () => {
    const res = await request('/connections/sent');
    return res.data;
  },
};

// 4. Job Opportunities APIs
export const jobApi = {
  search: async (keyword = '', jobType = 'ALL') => {
    const params = new URLSearchParams();
    if (keyword) params.append('keyword', keyword);
    if (jobType && jobType !== 'ALL') params.append('jobType', jobType);

    const res = await request(`/jobs/search?${params.toString()}`);
    return res.data;
  },
  create: async (jobData) => {
    const res = await request('/jobs', {
      method: 'POST',
      body: JSON.stringify(jobData),
    });
    return res.data;
  },
  delete: async (id) => {
    const res = await request(`/jobs/${id}`, {
      method: 'DELETE',
    });
    return res.data;
  },
};

// 5. Campus Events & RSVP APIs
export const eventApi = {
  search: async (keyword = '', eventType = 'ALL') => {
    const params = new URLSearchParams();
    if (keyword) params.append('keyword', keyword);
    if (eventType && eventType !== 'ALL') params.append('eventType', eventType);

    const res = await request(`/events/search?${params.toString()}`);
    return res.data;
  },
  toggleRsvp: async (id) => {
    const res = await request(`/events/${id}/rsvp`, {
      method: 'POST',
    });
    return res.data;
  },
  create: async (eventData) => {
    const res = await request('/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
    return res.data;
  },
  delete: async (id) => {
    const res = await request(`/events/${id}`, {
      method: 'DELETE',
    });
    return res.data;
  },
};

// 6. Gemini AI Guidance APIs
export const aiApi = {
  getGuidance: async (targetRole, currentSkills, educationLevel, apiKey = '') => {
    try {
      const res = await request('/ai/guidance', {
        method: 'POST',
        body: JSON.stringify({ targetRole, currentSkills, educationLevel, apiKey }),
      });
      if (res?.data) return res.data;
    } catch {
      // Backend not running on static hosting (e.g. GitHub Pages) - seamlessly return domain-adaptive roadmap
    }

    // Intelligent domain-adaptive roadmap matching GeminiAiService.java
    const qLower = (targetRole || '').toLowerCase();
    
    if (qLower.includes('frontend') || qLower.includes('react') || qLower.includes('ui') || qLower.includes('web developer')) {
      return {
        assessment: `For an engineer targeting ${targetRole} starting with ${currentSkills || 'fundamentals'}, product recruiters expect deep fluency in modern asynchronous JavaScript, component lifecycle design, clean state management, and Core Web Vitals optimization.`,
        coreSkills: [
          'JavaScript (ES2024+, Closures, Event Loop)',
          'React 18 & Concurrent Features',
          'TypeScript & Type-Safe Component Contracts',
          'Tailwind CSS & Design System Architecture',
          'State Management (Zustand / Redux Toolkit)',
          'Client-Side Testing (Vitest & RTL)'
        ],
        roadmapPhases: [
          { phase: 'Phase 1: Advanced JS Internals & Modern React (Weeks 1-4)', focus: 'Master Promises, Event Loop microtasks, custom React hooks, reconciliation diffing, and memoization.' },
          { phase: 'Phase 2: TypeScript & Design Systems (Weeks 5-8)', focus: 'Build a headless accessible UI component library using Tailwind CSS and Radix primitives with 100% strict TypeScript types.' },
          { phase: 'Phase 3: Performance, SSR & Edge Deployment (Weeks 9-12)', focus: 'Implement code-splitting via dynamic imports, service workers, Next.js Server Components, and deploy to Vercel/Cloudflare.' }
        ],
        recommendedProjects: [
          { title: 'Collaborative Real-Time Canvas / Whiteboard', summary: 'A responsive real-time diagramming tool built with React, HTML5 Canvas/SVG, WebSockets, and Zustand with infinite undo/redo history.' },
          { title: 'Enterprise Data Grid & Analytics Dashboard', summary: 'A virtualized data table rendering 50,000+ rows smoothly with column resizing, multi-column sorting, debounced filtering, and zero frame drops.' }
        ],
        interviewQuestions: [
          'Explain the browser Event Loop, call stack, microtask queue, and macrotask queue in detail.',
          'How does React Reconciliation algorithm compare Virtual DOM trees, and why are keys essential in lists?',
          'What is the difference between client-side rendering (CSR), server-side rendering (SSR), and static site generation (SSG)?',
          'How do you optimize Core Web Vitals, specifically Largest Contentful Paint (LCP) and Interaction to Next Paint (INP)?',
          'Explain JavaScript closures and prototype inheritance with real code examples.'
        ]
      };
    }

    if (qLower.includes('devops') || qLower.includes('cloud') || qLower.includes('sre') || qLower.includes('infrastructure')) {
      return {
        assessment: `For an infrastructure engineer targeting ${targetRole}, industry teams expect hands-on comfort with containerization, immutable infrastructure as code (IaC), automated CI/CD pipelines, and distributed observability.`,
        coreSkills: [
          'Linux Kernel & Shell Scripting (Bash)',
          'Docker & Multi-Stage Container Builds',
          'Kubernetes (Pods, Deployments, Services, Ingress)',
          'Infrastructure as Code (Terraform)',
          'CI/CD Automation (GitHub Actions)',
          'Observability (Prometheus, Grafana)'
        ],
        roadmapPhases: [
          { phase: 'Phase 1: Linux Administration & Containers (Weeks 1-4)', focus: 'Master process management, networking (IP, DNS, iptables), SSH hardening, and building hardened, rootless Docker containers under 50MB.' },
          { phase: 'Phase 2: Kubernetes Orchestration & GitOps (Weeks 5-8)', focus: 'Deploy microservices on a local k8s cluster configuring Horizontal Pod Autoscaling (HPA), Secrets, and ArgoCD GitOps pipelines.' },
          { phase: 'Phase 3: Cloud IaC & Observability (Weeks 9-12)', focus: 'Provision cloud VPC, EKS, and RDS infrastructure using modular Terraform, with automated Prometheus metrics and Grafana alerts.' }
        ],
        recommendedProjects: [
          { title: 'Zero-Downtime Blue-Green Kubernetes Deployment', summary: 'A self-healing containerized application deployed across Kubernetes using Terraform, automated GitHub Actions CI/CD, and NGINX ingress traffic shifting.' },
          { title: 'Distributed Cloud Monitoring & Alerting Suite', summary: 'A complete observability stack monitoring system resources, container health, and application HTTP latencies with alert triggers to Slack.' }
        ],
        interviewQuestions: [
          'What happens under the hood when a Kubernetes Pod is scheduled and created?',
          'Explain the difference between Docker bridge, host, and overlay networking.',
          'How does Terraform track infrastructure state and resolve state drift?',
          'What is the difference between a Blue-Green deployment and a Canary rollout?',
          'How do you troubleshoot a Kubernetes Pod stuck in CrashLoopBackOff status?'
        ]
      };
    }

    // Default: Java Full Stack & Campus Placement Career Roadmap
    return {
      assessment: `For a candidate targeting ${targetRole || 'Java Full Stack Developer'} with background in ${currentSkills || 'CS fundamentals'}, recruiters at product companies evaluate the complete web request lifecycle, relational ACID transactions, Spring Security filter chains, clean DTO separation, and high-performance database indexing.`,
      coreSkills: [
        'Java 21 LTS (Records, Virtual Threads, Pattern Matching)',
        'Spring Boot 3.x (Spring MVC, REST APIs)',
        'Spring Data JPA & Hibernate 6 (Lazy Loading, N+1 Prevention)',
        'MySQL 8.0 (3NF Normalization, Indexing, Transactions)',
        'Spring Security 6 (BCrypt Password Hashing & JWT)',
        'React 18 & Tailwind CSS Frontend Integration'
      ],
      roadmapPhases: [
        { phase: 'Phase 1: Backend Rigor & Request Lifecycle (Weeks 1-4)', focus: 'Master DispatcherServlet routing, JSR-380 Bean Validation (@Valid), DTO separation, and @RestControllerAdvice global exception handling.' },
        { phase: 'Phase 2: Relational Data Persistence (Weeks 5-8)', focus: 'Design 3NF relational schemas, implement entity relationships (@OneToMany, @ManyToMany), prevent Hibernate N+1 query traps with join fetch, and tune HikariCP.' },
        { phase: 'Phase 3: Enterprise Security & Deployment (Weeks 9-12)', focus: 'Implement BCrypt password hashing, secure JWT tokens, connect React frontend fetch client, and deploy publicly to GitHub Pages and cloud servers.' }
      ],
      recommendedProjects: [
        { title: 'Alumni Connect Production Platform', summary: 'A full-stack university networking application built with Spring Boot 3, MySQL, and React, demonstrating role-based security, normalized database design, and AI integration.' },
        { title: 'Distributed High-Concurrency Ticket Ledger', summary: 'A reservation backend handling concurrent booking requests using database row-level locking, idempotent REST endpoints, and transaction rollbacks.' }
      ],
      interviewQuestions: [
        'Explain the architectural differences between JDBC, JPA, Hibernate, and Spring Data JPA.',
        'How does the Spring MVC DispatcherServlet process an incoming HTTP request end-to-end?',
        'Why should production web applications store JWTs securely and what are the trade-offs of stateless tokens?',
        'What is the Hibernate N+1 select problem and what are two specific ways to solve it?',
        'How does Spring @Transactional annotation work internally using AOP dynamic proxies?'
      ]
    };
  },
};

// 7. Administration APIs
export const adminApi = {
  getAllUsers: async () => {
    const res = await request('/admin/users');
    return res.data;
  },
  updateUserStatus: async (id, status) => {
    const res = await request(`/admin/users/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
    return res.data;
  },
  getStats: async () => {
    const res = await request('/admin/stats');
    return res.data;
  },
};
