package com.alumniconnect.service;

import com.alumniconnect.dto.CreateEventRequest;
import com.alumniconnect.dto.EventDto;
import com.alumniconnect.entity.*;
import com.alumniconnect.exception.BadRequestException;
import com.alumniconnect.exception.ResourceNotFoundException;
import com.alumniconnect.repository.EventRegistrationRepository;
import com.alumniconnect.repository.EventRepository;
import com.alumniconnect.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final EventRegistrationRepository registrationRepository;
    private final UserRepository userRepository;

    public EventService(EventRepository eventRepository,
                        EventRegistrationRepository registrationRepository,
                        UserRepository userRepository) {
        this.eventRepository = eventRepository;
        this.registrationRepository = registrationRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<EventDto> searchEvents(String keyword, EventType eventType, Long currentUserId) {
        List<Event> events = eventRepository.searchEvents(
                keyword != null && !keyword.isBlank() ? keyword : null,
                eventType
        );

        return events.stream().map(e -> mapToDto(e, currentUserId)).collect(Collectors.toList());
    }

    @Transactional
    public EventDto toggleRsvp(Long eventId, Long currentUserId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + eventId));

        User user = userRepository.findById(currentUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + currentUserId));

        Optional<EventRegistration> existingReg = registrationRepository.findByEventIdAndUserId(eventId, currentUserId);

        if (existingReg.isPresent()) {
            EventRegistration reg = existingReg.get();
            if (reg.getStatus() == RegistrationStatus.CONFIRMED) {
                // Cancel RSVP
                reg.setStatus(RegistrationStatus.CANCELLED);
                registrationRepository.save(reg);
            } else {
                // Re-confirm RSVP
                verifyCapacity(event);
                reg.setStatus(RegistrationStatus.CONFIRMED);
                registrationRepository.save(reg);
            }
        } else {
            // New RSVP
            verifyCapacity(event);
            EventRegistration newReg = new EventRegistration(event, user);
            registrationRepository.save(newReg);
        }

        return mapToDto(event, currentUserId);
    }

    private void verifyCapacity(Event event) {
        Long confirmedCount = registrationRepository.countByEventIdAndStatus(event.getId(), RegistrationStatus.CONFIRMED);
        if (confirmedCount >= event.getMaxCapacity()) {
            throw new BadRequestException("This event has reached its maximum attendance capacity.");
        }
    }

    @Transactional
    public EventDto createEvent(Long userId, CreateEventRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        Event event = new Event();
        event.setOrganizer(user);
        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setEventDate(request.getEventDate());
        event.setEventTime(request.getEventTime() != null ? request.getEventTime() : "6:00 PM IST");
        event.setLocationOrLink(request.getLocationOrLink() != null ? request.getLocationOrLink() : "Virtual Google Meet");
        event.setEventType(request.getEventType());
        event.setMaxCapacity(request.getMaxCapacity() != null ? request.getMaxCapacity() : 100);

        Event saved = eventRepository.save(event);
        return mapToDto(saved, userId);
    }

    @Transactional
    public void deleteEvent(Long eventId, Long userId, Role role) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found with id: " + eventId));

        if (!event.getOrganizer().getId().equals(userId) && role != Role.ADMIN) {
            throw new BadRequestException("You do not have permission to delete this event.");
        }

        eventRepository.delete(event);
    }

    private EventDto mapToDto(Event event, Long currentUserId) {
        EventDto dto = new EventDto();
        dto.setId(event.getId());
        dto.setOrganizerId(event.getOrganizer().getId());
        dto.setOrganizerName(event.getOrganizer().getFullName());
        dto.setTitle(event.getTitle());
        dto.setDescription(event.getDescription());
        dto.setEventDate(event.getEventDate());
        dto.setEventTime(event.getEventTime());
        dto.setLocationOrLink(event.getLocationOrLink());
        dto.setEventType(event.getEventType());
        dto.setMaxCapacity(event.getMaxCapacity());
        dto.setCreatedAt(event.getCreatedAt());

        Long confirmedCount = registrationRepository.countByEventIdAndStatus(event.getId(), RegistrationStatus.CONFIRMED);
        dto.setRegisteredCount(confirmedCount);

        boolean isRegistered = currentUserId != null &&
                registrationRepository.existsByEventIdAndUserIdAndStatus(event.getId(), currentUserId, RegistrationStatus.CONFIRMED);
        dto.setIsRegistered(isRegistered);

        return dto;
    }
}
