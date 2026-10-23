package com.alumniconnect.service;

import com.alumniconnect.dto.ConnectionRequestDto;
import com.alumniconnect.entity.AlumniProfile;
import com.alumniconnect.entity.ConnectionRequest;
import com.alumniconnect.entity.ConnectionStatus;
import com.alumniconnect.entity.User;
import com.alumniconnect.exception.BadRequestException;
import com.alumniconnect.exception.ResourceNotFoundException;
import com.alumniconnect.repository.AlumniProfileRepository;
import com.alumniconnect.repository.ConnectionRequestRepository;
import com.alumniconnect.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ConnectionService {

    private final ConnectionRequestRepository connectionRepository;
    private final UserRepository userRepository;
    private final AlumniProfileRepository profileRepository;

    public ConnectionService(ConnectionRequestRepository connectionRepository,
                             UserRepository userRepository,
                             AlumniProfileRepository profileRepository) {
        this.connectionRepository = connectionRepository;
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
    }

    @Transactional
    public ConnectionRequestDto sendConnectionRequest(Long senderId, Long receiverId, String note) {
        if (senderId.equals(receiverId)) {
            throw new BadRequestException("You cannot send a connection request to yourself.");
        }

        if (connectionRepository.existsBySenderIdAndReceiverId(senderId, receiverId) ||
            connectionRepository.existsBySenderIdAndReceiverId(receiverId, senderId)) {
            throw new BadRequestException("A connection request or relationship already exists between these users.");
        }

        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new ResourceNotFoundException("Sender not found with id: " + senderId));
        User receiver = userRepository.findById(receiverId)
                .orElseThrow(() -> new ResourceNotFoundException("Receiver not found with id: " + receiverId));

        ConnectionRequest request = new ConnectionRequest(sender, receiver, note);
        ConnectionRequest saved = connectionRepository.save(request);

        return mapToDto(saved);
    }

    @Transactional
    public ConnectionRequestDto acceptRequest(Long requestId, Long currentUserId) {
        ConnectionRequest request = connectionRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Connection request not found with id: " + requestId));

        if (!request.getReceiver().getId().equals(currentUserId)) {
            throw new BadRequestException("Only the recipient can accept this connection request.");
        }

        request.setStatus(ConnectionStatus.ACCEPTED);
        ConnectionRequest saved = connectionRepository.save(request);

        return mapToDto(saved);
    }

    @Transactional
    public void rejectRequest(Long requestId, Long currentUserId) {
        ConnectionRequest request = connectionRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Connection request not found with id: " + requestId));

        if (!request.getReceiver().getId().equals(currentUserId)) {
            throw new BadRequestException("Only the recipient can reject this connection request.");
        }

        connectionRepository.delete(request);
    }

    @Transactional
    public void cancelRequest(Long requestId, Long currentUserId) {
        ConnectionRequest request = connectionRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Connection request not found with id: " + requestId));

        if (!request.getSender().getId().equals(currentUserId)) {
            throw new BadRequestException("Only the sender can cancel this connection request.");
        }

        connectionRepository.delete(request);
    }

    @Transactional(readOnly = true)
    public List<ConnectionRequestDto> getReceivedPendingRequests(Long currentUserId) {
        List<ConnectionRequest> requests = connectionRepository.findByReceiverIdAndStatus(currentUserId, ConnectionStatus.PENDING);
        return requests.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ConnectionRequestDto> getSentPendingRequests(Long currentUserId) {
        List<ConnectionRequest> requests = connectionRepository.findBySenderIdAndStatus(currentUserId, ConnectionStatus.PENDING);
        return requests.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    private ConnectionRequestDto mapToDto(ConnectionRequest req) {
        ConnectionRequestDto dto = new ConnectionRequestDto();
        dto.setId(req.getId());
        dto.setSenderId(req.getSender().getId());
        dto.setSenderName(req.getSender().getFullName());
        dto.setReceiverId(req.getReceiver().getId());
        dto.setReceiverName(req.getReceiver().getFullName());
        dto.setStatus(req.getStatus());
        dto.setNote(req.getNote());
        dto.setCreatedAt(req.getCreatedAt());

        profileRepository.findByUserId(req.getSender().getId()).ifPresent(profile -> {
            dto.setSenderRole(profile.getCurrentRole());
            dto.setSenderCompany(profile.getCurrentCompany());
            dto.setSenderAvatar(profile.getAvatarUrl());
        });

        return dto;
    }
}
