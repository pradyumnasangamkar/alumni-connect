package com.alumniconnect.repository;

import com.alumniconnect.entity.CareerConversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CareerConversationRepository extends JpaRepository<CareerConversation, Long> {

    List<CareerConversation> findByUserIdOrderByCreatedAtDesc(Long userId);
}
