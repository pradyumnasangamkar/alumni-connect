# Alumni Connect — Production Java Full Stack Web Platform

![Project Banner](https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200)

> A modern, production-grade alumni networking and career development web platform built with **Java 21 LTS**, **Spring Boot 3.x**, **Spring Data JPA**, **MySQL 8.0**, **React 18**, and **Tailwind CSS**.

---

## 🌟 Key Highlights

- **Executive Obsidian Design:** Bespoke dark theme (`#0B1020` & Electric Iris `#8B7CFF`) built with Tailwind CSS, delivering long-session readability and responsive ergonomics.
- **Enterprise Security:** Spring Security 6, BCrypt password hashing, role-based authorization (`STUDENT`, `ALUMNI`, `ADMIN`), and stateless JWT token handling via secure `HttpOnly` cookies.
- **Normalized Relational Schema (3NF):** High-performance MySQL 8 database modeling 7 relational entities with composite unique constraints and database indexing.
- **AI Career Counselor:** Native integration with Google Gemini REST API generating 12-week roadmaps, capstone project blueprints, and technical interview questions.
- **Production Monolith:** Modular monolithic architecture ensuring clean domain boundary separation with zero microservices overhead.

---

## 🏗️ Architecture & 7-Step Request Lifecycle

```
[React 18 Client] 
   └── HTTP Fetch with Credentials (credentials: 'include')
       └── [Spring Security Filter Chain]
           └── JwtAuthenticationFilter (OncePerRequestFilter)
               └── DispatcherServlet & REST Controller (@Valid JSR-380)
                   └── Transactional Service Layer (@Service, @Transactional)
                       └── Spring Data JPA Repositories (JpaRepository)
                           └── Hibernate 6 ORM Dialect
                               └── [MySQL 8.0 Database]
```

1. **User Action:** React UI triggers an action (e.g. searching alumni, toggling event RSVP, submitting login).
2. **Network Transmission:** Asynchronous fetch sends HTTP request with cookies attached automatically.
3. **Security Interception:** `AuthTokenFilter` extracts JWT from HttpOnly cookie, validates signature with HMAC-SHA256, and injects `Authentication` into `SecurityContextHolder`.
4. **Controller Routing:** DispatcherServlet matches `@RestController` method. JSR-380 `@Valid` validates input DTOs.
5. **Business Logic:** `@Service` executes business rules inside an ACID `@Transactional` boundary.
6. **Data Persistence:** Spring Data JPA dynamically generates optimized SQL executed via HikariCP against MySQL.
7. **Response Serialization:** Output DTO is wrapped in `ApiResponse<T>` and serialized to JSON.

---

## 🚀 Quick Start Guide

### Prerequisites
- **Java:** JDK 21 LTS (`java -version`)
- **Maven:** 3.9+ (`mvn -v`)
- **Node.js:** 18+ (`node -v`)
- **MySQL:** 8.0 running on `localhost:3306` with user `root` and password `root`

---

### Step 1: Start MySQL Database
Ensure MySQL is running and execute:
```sql
CREATE DATABASE IF NOT EXISTS alumni_connect_db;
```

---

### Step 2: Run the Spring Boot Backend
```bash
cd backend
mvn clean compile
mvn test
mvn spring-boot:run
```
*Backend runs at:* `http://localhost:8080/api/v1`  
*Default seed accounts automatically bootstrapped by `DataInitializer`:*
- **Administrator:** `admin@university.edu` / `AdminSecure#2026`
- **Student:** `student@university.edu` / `Password@123`
- **Alumni (Google):** `alumni@google.com` / `Password@123`

---

### Step 3: Run the React Frontend
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs at:* `http://localhost:5173`

---

## 🧪 Automated Testing Suite

Run all automated unit and integration tests:
```bash
cd backend
mvn test
```
*Test coverage includes:*
- Spring Application Context bootstrap (`AlumniConnectApplicationTests`)
- Duplicate registration rejection & email uniqueness (`AuthServiceTest`)
- Administrator self-registration prevention (`AuthServiceTest`)
- Role-based permissions on job postings (`JobServiceTest`)

---

## 🌐 Free-Tier Cloud Deployment Guide

| Component | Recommended Platform | Free Tier Configuration |
| :--- | :--- | :--- |
| **Frontend** | [Vercel](https://vercel.com) | Framework: Vite • Root: `frontend` • Rewrites configured in `vercel.json` |
| **Backend** | [Render](https://render.com) | Web Service • Docker or Java 21 • Root: `backend` • Port: `8080` |
| **Database** | [Aiven](https://aiven.io) or [Railway](https://railway.app) | Managed MySQL 8.0 • 5GB Free Tier • SSL Enabled |

### Production Environment Variables
- `SPRING_DATASOURCE_URL`: `jdbc:mysql://<host>:<port>/<db>?useSSL=true`
- `SPRING_DATASOURCE_USERNAME`: `<db_username>`
- `SPRING_DATASOURCE_PASSWORD`: `<db_password>`
- `APP_JWT_SECRET`: `<64-byte-base64-random-secret>`
- `APP_CORS_ALLOWED_ORIGINS`: `https://your-app.vercel.app`
- `GEMINI_API_KEY`: `<google-ai-studio-api-key>`
