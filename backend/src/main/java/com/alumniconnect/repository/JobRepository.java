package com.alumniconnect.repository;

import com.alumniconnect.entity.Job;
import com.alumniconnect.entity.JobType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findByIsActiveTrueOrderByCreatedAtDesc();

    @Query("SELECT j FROM Job j JOIN FETCH j.postedBy WHERE j.isActive = true AND " +
           "(:keyword IS NULL OR LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           " OR LOWER(j.companyName) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           " OR LOWER(j.location) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
           "AND (:jobType IS NULL OR j.jobType = :jobType) " +
           "ORDER BY j.createdAt DESC")
    List<Job> searchJobs(@Param("keyword") String keyword, @Param("jobType") JobType jobType);
}
