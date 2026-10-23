package com.alumniconnect.repository;

import com.alumniconnect.entity.ConnectionRequest;
import com.alumniconnect.entity.ConnectionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConnectionRequestRepository extends JpaRepository<ConnectionRequest, Long> {

    List<ConnectionRequest> findByReceiverIdAndStatus(Long receiverId, ConnectionStatus status);

    List<ConnectionRequest> findBySenderIdAndStatus(Long senderId, ConnectionStatus status);

    Optional<ConnectionRequest> findBySenderIdAndReceiverId(Long senderId, Long receiverId);

    Boolean existsBySenderIdAndReceiverId(Long senderId, Long receiverId);

    @Query("SELECT c FROM ConnectionRequest c WHERE " +
           "(c.sender.id = :userId OR c.receiver.id = :userId) AND c.status = 'ACCEPTED'")
    List<ConnectionRequest> findAcceptedConnections(@Param("userId") Long userId);
}
