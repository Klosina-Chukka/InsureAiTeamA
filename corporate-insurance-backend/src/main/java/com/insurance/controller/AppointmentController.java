package com.insurance.controller;

import com.insurance.dto.AppointmentRequest;
import com.insurance.entity.Appointment;
import com.insurance.service.AppointmentService;
import com.insurance.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private AuthService authService;

    @PostMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<?> createAppointment(@Valid @RequestBody AppointmentRequest request) {
        try {
            var currentUser = authService.getCurrentUser();
            Appointment appointment = appointmentService.createAppointment(currentUser.getId(), request);
            return ResponseEntity.ok(appointment);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/customer")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<?> getCustomerAppointments() {
        try {
            var currentUser = authService.getCurrentUser();
            List<Appointment> appointments = appointmentService.getCustomerAppointments(currentUser.getId());
            return ResponseEntity.ok(appointments);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/customer/upcoming")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<?> getUpcomingAppointmentsForCustomer() {
        try {
            var currentUser = authService.getCurrentUser();
            List<Appointment> appointments = appointmentService.getUpcomingAppointmentsForCustomer(currentUser.getId());
            return ResponseEntity.ok(appointments);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/agent")
    @PreAuthorize("hasRole('AGENT')")
    public ResponseEntity<?> getAgentAppointments() {
        try {
            var currentUser = authService.getCurrentUser();
            List<Appointment> appointments = appointmentService.getAgentAppointments(currentUser.getId());
            return ResponseEntity.ok(appointments);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/agent/upcoming")
    @PreAuthorize("hasRole('AGENT')")
    public ResponseEntity<?> getUpcomingAppointmentsForAgent() {
        try {
            var currentUser = authService.getCurrentUser();
            List<Appointment> appointments = appointmentService.getUpcomingAppointmentsForAgent(currentUser.getId());
            return ResponseEntity.ok(appointments);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/{appointmentId}/status")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('AGENT')")
    public ResponseEntity<?> updateAppointmentStatus(
            @PathVariable Long appointmentId,
            @RequestParam Appointment.AppointmentStatus status) {
        try {
            var currentUser = authService.getCurrentUser();
            Appointment appointment = appointmentService.updateAppointmentStatus(appointmentId, status, currentUser.getId());
            return ResponseEntity.ok(appointment);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/{appointmentId}")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('AGENT')")
    public ResponseEntity<?> deleteAppointment(@PathVariable Long appointmentId) {
        try {
            var currentUser = authService.getCurrentUser();
            appointmentService.deleteAppointment(appointmentId, currentUser.getId());
            return ResponseEntity.ok("Appointment deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/range")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAppointmentsInDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        try {
            List<Appointment> appointments = appointmentService.getAppointmentsInDateRange(startDate, endDate);
            return ResponseEntity.ok(appointments);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/{appointmentId}")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('AGENT') or hasRole('ADMIN')")
    public ResponseEntity<?> getAppointmentById(@PathVariable Long appointmentId) {
        try {
            var currentUser = authService.getCurrentUser();
            // This would need additional implementation to fetch by ID
            // For now, return a placeholder response
            return ResponseEntity.ok("Appointment details endpoint");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}
