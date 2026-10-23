package com.alumniconnect.repository;

import com.alumniconnect.entity.AlumniProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AlumniProfileRepository extends JpaRepository<AlumniProfile, Long> {

    Optional<AlumniProfile> findByUserId(Long userId);

    @Query("SELECT p FROM AlumniProfile p JOIN FETCH p.user u WHERE " +
           "(:keyword IS NULL OR LOWER(u.fullName) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           " OR LOWER(p.currentCompany) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           " OR LOWER(p.currentRole) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           " OR LOWER(p.skills) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
           "AND (:department IS NULL OR p.department = :department) " +
           "AND (:gradYear IS NULL OR p.graduationYear = :gradYear)")
    List<AlumniProfile> searchProfiles(@Param("keyword") String keyword,
                                       @Param("department") String department,
                                       @Param("gradYear") Integer gradYear);
}
