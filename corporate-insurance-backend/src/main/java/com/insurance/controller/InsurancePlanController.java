package com.insurance.controller;

import com.insurance.entity.InsurancePlan;
import com.insurance.service.InsurancePlanService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plans")
@CrossOrigin(origins = "*", maxAge = 3600)
public class InsurancePlanController {

    @Autowired
    private InsurancePlanService planService;

    @GetMapping
    public ResponseEntity<?> getAllPlans() {
        try {
            List<InsurancePlan> plans = planService.getActivePlans();
            return ResponseEntity.ok(plans);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllPlansIncludingInactive() {
        try {
            List<InsurancePlan> plans = planService.getAllPlans();
            return ResponseEntity.ok(plans);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/{planId}")
    public ResponseEntity<?> getPlanById(@PathVariable Long planId) {
        try {
            InsurancePlan plan = planService.getPlanById(planId);
            return ResponseEntity.ok(plan);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/type/{planType}")
    public ResponseEntity<?> getPlansByType(@PathVariable String planType) {
        try {
            InsurancePlan.PlanType type = InsurancePlan.PlanType.valueOf(planType.toUpperCase());
            List<InsurancePlan> plans = planService.getActivePlansByType(type);
            return ResponseEntity.ok(plans);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/premium-range")
    public ResponseEntity<?> getPlansByPremiumRange(
            @RequestParam Double minAmount,
            @RequestParam Double maxAmount) {
        try {
            List<InsurancePlan> plans = planService.getPlansByPremiumRange(minAmount, maxAmount);
            return ResponseEntity.ok(plans);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/sorted-by-premium")
    public ResponseEntity<?> getPlansSortedByPremium() {
        try {
            List<InsurancePlan> plans = planService.getActivePlansOrderByPremium();
            return ResponseEntity.ok(plans);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createPlan(@Valid @RequestBody InsurancePlan plan) {
        try {
            InsurancePlan createdPlan = planService.createPlan(plan);
            return ResponseEntity.ok(createdPlan);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/{planId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updatePlan(@PathVariable Long planId, @Valid @RequestBody InsurancePlan planDetails) {
        try {
            InsurancePlan updatedPlan = planService.updatePlan(planId, planDetails);
            return ResponseEntity.ok(updatedPlan);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/{planId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deletePlan(@PathVariable Long planId) {
        try {
            planService.deletePlan(planId);
            return ResponseEntity.ok("Plan deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/{planId}/activate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> activatePlan(@PathVariable Long planId) {
        try {
            InsurancePlan plan = planService.activatePlan(planId);
            return ResponseEntity.ok(plan);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/{planId}/deactivate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deactivatePlan(@PathVariable Long planId) {
        try {
            InsurancePlan plan = planService.deactivatePlan(planId);
            return ResponseEntity.ok(plan);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}
