package com.alumniconnect.controller;

import com.alumniconnect.dto.ApiResponse;
import com.alumniconnect.dto.ConnectionRequestDto;
import com.alumniconnect.security.UserDetailsImpl;
import com.alumniconnect.service.ConnectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/connections")
public class ConnectionController {

    private final ConnectionService connectionService;

    public ConnectionController(ConnectionService connectionService) {
        this.connectionService = connectionService;
    }

    @PostMapping("/send")
    public ResponseEntity<ApiResponse<ConnectionRequestDto>> sendRequest(
            @RequestBody Map<String, Object> body,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        Long receiverId = Long.valueOf(body.get("receiverId").toString());
        String note = (String) body.get("note");

        ConnectionRequestDto result = connectionService.sendConnectionRequest(userDetails.getId(), receiverId, note);
        return ResponseEntity.ok(ApiResponse.success("Connection invitation sent", result));
    }

    @PostMapping("/{id}/accept")
    public ResponseEntity<ApiResponse<ConnectionRequestDto>> acceptRequest(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        ConnectionRequestDto result = connectionService.acceptRequest(id, userDetails.getId());
        return ResponseEntity.ok(ApiResponse.success("Connection request accepted", result));
    }

    @DeleteMapping("/{id}/reject")
    public ResponseEntity<ApiResponse<Void>> rejectRequest(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        connectionService.rejectRequest(id, userDetails.getId());
        return ResponseEntity.ok(ApiResponse.success("Connection request ignored", null));
    }

    @DeleteMapping("/{id}/cancel")
    public ResponseEntity<ApiResponse<Void>> cancelRequest(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        connectionService.cancelRequest(id, userDetails.getId());
        return ResponseEntity.ok(ApiResponse.success("Connection request cancelled", null));
    }

    @GetMapping("/received")
    public ResponseEntity<ApiResponse<List<ConnectionRequestDto>>> getReceivedRequests(
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        List<ConnectionRequestDto> requests = connectionService.getReceivedPendingRequests(userDetails.getId());
        return ResponseEntity.ok(ApiResponse.success("Pending received invitations", requests));
    }

    @GetMapping("/sent")
    public ResponseEntity<ApiResponse<List<ConnectionRequestDto>>> getSentRequests(
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        List<ConnectionRequestDto> requests = connectionService.getSentPendingRequests(userDetails.getId());
        return ResponseEntity.ok(ApiResponse.success("Pending sent invitations", requests));
    }
}
