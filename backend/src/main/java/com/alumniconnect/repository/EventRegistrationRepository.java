package com.alumniconnect.repository;

import com.alumniconnect.entity.EventRegistration;
import com.alumniconnect.entity.RegistrationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventRegistrationRepository extends JpaRepository<EventRegistration, Long> {

    List<EventRegistration> findByEventIdAndStatus(Long eventId, RegistrationStatus status);

    List<EventRegistration> findByUserIdAndStatus(Long userId, RegistrationStatus status);

    Optional<EventRegistration> findByEventIdAndUserId(Long eventId, Long userId);

    Boolean existsByEventIdAndUserIdAndStatus(Long eventId, Long userId, RegistrationStatus status);

    Long countByEventIdAndStatus(Long eventId, RegistrationStatus status);
}
