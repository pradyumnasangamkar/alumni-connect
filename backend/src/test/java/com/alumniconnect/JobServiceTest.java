package com.alumniconnect;

import com.alumniconnect.dto.CreateJobRequest;
import com.alumniconnect.dto.JobDto;
import com.alumniconnect.entity.Job;
import com.alumniconnect.entity.JobType;
import com.alumniconnect.entity.Role;
import com.alumniconnect.entity.User;
import com.alumniconnect.exception.BadRequestException;
import com.alumniconnect.repository.JobRepository;
import com.alumniconnect.repository.UserRepository;
import com.alumniconnect.service.JobService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class JobServiceTest {

    @Mock
    private JobRepository jobRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private JobService jobService;

    @Test
    void createJob_ShouldThrowException_WhenUserIsStudent() {
        User student = new User("student@university.edu", "pass", "Student", Role.STUDENT);
        student.setId(1L);
        when(userRepository.findById(1L)).thenReturn(Optional.of(student));

        CreateJobRequest request = new CreateJobRequest();
        request.setTitle("Software Engineer");
        request.setCompanyName("Google");
        request.setJobType(JobType.FULL_TIME);
        request.setDescription("Role description");

        BadRequestException ex = assertThrows(BadRequestException.class, () -> jobService.createJob(1L, request));
        assertTrue(ex.getMessage().contains("Only verified alumni and administrators can post opportunities"));
        verify(jobRepository, never()).save(any());
    }

    @Test
    void createJob_ShouldSucceed_WhenUserIsAlumni() {
        User alumni = new User("alumni@google.com", "pass", "Priya Sharma", Role.ALUMNI);
        alumni.setId(2L);
        when(userRepository.findById(2L)).thenReturn(Optional.of(alumni));

        CreateJobRequest request = new CreateJobRequest();
        request.setTitle("Junior Java Developer");
        request.setCompanyName("Salesforce");
        request.setJobType(JobType.FULL_TIME);
        request.setDescription("Spring Boot developer needed");

        Job savedJob = new Job();
        savedJob.setId(100L);
        savedJob.setTitle("Junior Java Developer");
        savedJob.setCompanyName("Salesforce");
        savedJob.setPostedBy(alumni);
        savedJob.setJobType(JobType.FULL_TIME);
        savedJob.setDescription("Spring Boot developer needed");
        savedJob.setIsActive(true);

        when(jobRepository.save(any(Job.class))).thenReturn(savedJob);

        JobDto result = jobService.createJob(2L, request);
        assertNotNull(result);
        assertEquals("Junior Java Developer", result.getTitle());
        assertEquals("Salesforce", result.getCompanyName());
        verify(jobRepository, times(1)).save(any(Job.class));
    }
}
