package com.alumniconnect.controller;

import com.alumniconnect.dto.ApiResponse;
import com.alumniconnect.dto.CreateEventRequest;
import com.alumniconnect.dto.EventDto;
import com.alumniconnect.entity.EventType;
import com.alumniconnect.security.UserDetailsImpl;
import com.alumniconnect.service.EventService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping("/public")
    public ResponseEntity<ApiResponse<List<EventDto>>> getPublicEvents() {
        List<EventDto> events = eventService.searchEvents(null, null, null);
        return ResponseEntity.ok(ApiResponse.success("Upcoming university events", events));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<EventDto>>> searchEvents(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) EventType eventType,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        Long currentUserId = userDetails != null ? userDetails.getId() : null;
        List<EventDto> events = eventService.searchEvents(keyword, eventType, currentUserId);
        return ResponseEntity.ok(ApiResponse.success("Event search results", events));
    }

    @PostMapping("/{id}/rsvp")
    public ResponseEntity<ApiResponse<EventDto>> toggleRsvp(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        EventDto updated = eventService.toggleRsvp(id, userDetails.getId());
        return ResponseEntity.ok(ApiResponse.success(
                updated.getIsRegistered() ? "RSVP confirmed" : "RSVP cancelled",
                updated
        ));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<EventDto>> createEvent(
            @Valid @RequestBody CreateEventRequest request,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        EventDto created = eventService.createEvent(userDetails.getId(), request);
        return ResponseEntity.ok(ApiResponse.success("Event created successfully", created));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteEvent(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        eventService.deleteEvent(id, userDetails.getId(), userDetails.getRole());
        return ResponseEntity.ok(ApiResponse.success("Event removed successfully", null));
    }
}
