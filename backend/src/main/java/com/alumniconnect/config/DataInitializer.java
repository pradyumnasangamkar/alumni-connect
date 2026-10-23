package com.alumniconnect.config;

import com.alumniconnect.entity.*;
import com.alumniconnect.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    private final UserRepository userRepository;
    private final AlumniProfileRepository profileRepository;
    private final JobRepository jobRepository;
    private final EventRepository eventRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           AlumniProfileRepository profileRepository,
                           JobRepository jobRepository,
                           EventRepository eventRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.jobRepository = jobRepository;
        this.eventRepository = eventRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) {
        if (userRepository.count() > 0) {
            logger.info("Database already seeded with user records. Skipping DataInitializer.");
            return;
        }

        logger.info("Initializing relational database with verified seed dataset...");

        // 1. Create System Administrator
        User admin = new User(
                "admin@university.edu",
                passwordEncoder.encode("AdminSecure#2026"),
                "System Administrator",
                Role.ADMIN
        );
        userRepository.save(admin);

        AlumniProfile adminProfile = new AlumniProfile(admin);
        adminProfile.setHeadline("University Alumni Relations & Platform Governance");
        adminProfile.setDepartment("Academic Governance");
        adminProfile.setCurrentRole("Chief Coordinator");
        adminProfile.setCurrentCompany("University Office");
        profileRepository.save(adminProfile);

        // 2. Create Student Account
        User student = new User(
                "student@university.edu",
                passwordEncoder.encode("Password@123"),
                "Sangamesh Patil",
                Role.STUDENT
        );
        userRepository.save(student);

        AlumniProfile studentProfile = new AlumniProfile(student);
        studentProfile.setHeadline("Aspiring Full Stack Engineer | CSE '26 | Java & React Enthusiast");
        studentProfile.setDepartment("Computer Science and Engineering");
        studentProfile.setGraduationYear(2026);
        studentProfile.setCurrentRole("Student Developer");
        studentProfile.setCurrentCompany("University Institute");
        studentProfile.setLocation("Bengaluru, India");
        studentProfile.setBio("Pre-final year Computer Science student passionate about building scalable web applications. Currently mastering Java, Spring Boot, and modern React interfaces.");
        studentProfile.setSkills("Java, Spring Boot, MySQL, React, JavaScript, Tailwind CSS, Git");
        studentProfile.setLinkedinUrl("https://linkedin.com");
        studentProfile.setGithubUrl("https://github.com");
        studentProfile.setAvatarUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250");
        profileRepository.save(studentProfile);

        // 3. Create Alumni: Priya Sharma (Google)
        User priya = new User(
                "alumni@google.com",
                passwordEncoder.encode("Password@123"),
                "Priya Sharma",
                Role.ALUMNI
        );
        userRepository.save(priya);

        AlumniProfile priyaProfile = new AlumniProfile(priya);
        priyaProfile.setHeadline("Senior Software Engineer at Google | Cloud Infrastructure");
        priyaProfile.setCurrentCompany("Google");
        priyaProfile.setCurrentRole("Senior Software Engineer");
        priyaProfile.setDepartment("Computer Science and Engineering");
        priyaProfile.setGraduationYear(2019);
        priyaProfile.setLocation("Hyderabad, India");
        priyaProfile.setBio("Ex-Amazon, now designing high-throughput distributed systems at Google Cloud. Eager to mentor CSE undergrads on system design and Java backend engineering.");
        priyaProfile.setSkills("Java, Distributed Systems, Kubernetes, Spring Cloud, Go, GCP");
        priyaProfile.setLinkedinUrl("https://linkedin.com");
        priyaProfile.setGithubUrl("https://github.com");
        priyaProfile.setAvatarUrl("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250");
        profileRepository.save(priyaProfile);

        // 4. Create Alumni: Arjun Verma (Microsoft)
        User arjun = new User(
                "arjun.v@microsoft.com",
                passwordEncoder.encode("Password@123"),
                "Arjun Verma",
                Role.ALUMNI
        );
        userRepository.save(arjun);

        AlumniProfile arjunProfile = new AlumniProfile(arjun);
        arjunProfile.setHeadline("Product Architect at Microsoft | Azure Developer Division");
        arjunProfile.setCurrentCompany("Microsoft");
        arjunProfile.setCurrentRole("Product Architect");
        arjunProfile.setDepartment("Information Technology");
        arjunProfile.setGraduationYear(2017);
        arjunProfile.setLocation("Bengaluru, India");
        arjunProfile.setBio("Alumnus batch of 2017. Passionate about developer tooling, API architecture, and helping juniors ace their campus placement rounds.");
        arjunProfile.setSkills("Azure, C#, Spring Boot, Microservices, RESTful APIs, Docker");
        arjunProfile.setLinkedinUrl("https://linkedin.com");
        arjunProfile.setGithubUrl("https://github.com");
        arjunProfile.setAvatarUrl("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250");
        profileRepository.save(arjunProfile);

        // 5. Create Sample Jobs
        Job job1 = new Job();
        job1.setPostedBy(priya);
        job1.setTitle("Associate Software Engineer (Java / Backend)");
        job1.setCompanyName("Salesforce");
        job1.setLocation("Bengaluru (Hybrid)");
        job1.setJobType(JobType.FULL_TIME);
        job1.setExperienceLevel("Fresher / 0-1 Years");
        job1.setDescription("Looking for bright 2025/2026 graduates with strong Java fundamentals, basic Spring Boot knowledge, and understanding of REST APIs and relational databases.");
        job1.setRequirements("Proficiency in Java 17/21 and OOP\nFamiliarity with Spring Boot and Spring Data JPA\nGood command over SQL queries\nUnderstanding of Git");
        job1.setApplicationUrl("https://salesforce.com/careers");
        job1.setDeadline(LocalDate.now().plusMonths(2));
        jobRepository.save(job1);

        Job job2 = new Job();
        job2.setPostedBy(arjun);
        job2.setTitle("Software Engineering Intern - Summer 2027");
        job2.setCompanyName("Google Cloud");
        job2.setLocation("Hyderabad (On-site)");
        job2.setJobType(JobType.INTERNSHIP);
        job2.setExperienceLevel("Pre-final Year (2026 Batch)");
        job2.setDescription("Exciting 6-month internship for pre-final year students passionate about large-scale distributed computing, reliable cloud backends, and low latency microservices.");
        job2.setRequirements("Enrolled in B.Tech / B.E. Computer Science\nStrong foundation in Data Structures and Algorithms\nHands-on coding in Java, C++, or Go");
        job2.setApplicationUrl("https://google.com/about/careers");
        job2.setDeadline(LocalDate.now().plusMonths(3));
        jobRepository.save(job2);

        // 6. Create Sample Events
        Event event1 = new Event();
        event1.setOrganizer(priya);
        event1.setTitle("Demystifying Spring Boot & Microservices for Campus Placements");
        event1.setDescription("An insider look at what product companies actually test in Java Full Stack interviews. We'll break down Spring Boot core concepts, Hibernate traps, and how to present your personal projects effectively.");
        event1.setEventType(EventType.WEBINAR);
        event1.setEventDate(LocalDate.now().plusWeeks(2));
        event1.setEventTime("6:00 PM - 7:30 PM IST");
        event1.setLocationOrLink("Google Meet (Link emailed upon RSVP)");
        event1.setMaxCapacity(100);
        eventRepository.save(event1);

        Event event2 = new Event();
        event2.setOrganizer(admin);
        event2.setTitle("Annual Alumni & Final-Year Networking Gala 2026");
        event2.setDescription("Connect with over 150 alumni returning to campus from across leading tech enterprises, startups, and research labs. Refreshments, panel discussions, and career booth networking.");
        event2.setEventType(EventType.REUNION);
        event2.setEventDate(LocalDate.now().plusMonths(1));
        event2.setEventTime("5:00 PM - 9:00 PM IST");
        event2.setLocationOrLink("Main Auditorium & Banquet Hall, Campus");
        event2.setMaxCapacity(250);
        eventRepository.save(event2);

        logger.info("Relational database successfully populated with admin, student, alumni, jobs, and events!");
    }
}
