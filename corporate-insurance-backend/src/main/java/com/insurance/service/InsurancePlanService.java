package com.insurance.service;

import com.insurance.entity.InsurancePlan;
import com.insurance.repository.InsurancePlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@Transactional
public class InsurancePlanService {

    @Autowired
    private InsurancePlanRepository planRepository;

    public InsurancePlan createPlan(InsurancePlan plan) {
        return planRepository.save(plan);
    }

    public InsurancePlan updatePlan(Long planId, InsurancePlan planDetails) {
        InsurancePlan plan = planRepository.findById(planId)
                .orElseThrow(() -> new RuntimeException("Plan not found"));

        plan.setPlanName(planDetails.getPlanName());
        plan.setPlanType(planDetails.getPlanType());
        plan.setDescription(planDetails.getDescription());
        plan.setCoverageAmount(planDetails.getCoverageAmount());
        plan.setPremiumAmount(planDetails.getPremiumAmount());
        plan.setDurationMonths(planDetails.getDurationMonths());
        plan.setIsActive(planDetails.getIsActive());

        return planRepository.save(plan);
    }

    public void deletePlan(Long planId) {
        InsurancePlan plan = planRepository.findById(planId)
                .orElseThrow(() -> new RuntimeException("Plan not found"));
        planRepository.delete(plan);
    }

    public InsurancePlan getPlanById(Long planId) {
        return planRepository.findById(planId)
                .orElseThrow(() -> new RuntimeException("Plan not found"));
    }

    public List<InsurancePlan> getAllPlans() {
        return planRepository.findAll();
    }

    public List<InsurancePlan> getActivePlans() {
        return planRepository.findByIsActive(true);
    }

    public List<InsurancePlan> getPlansByType(InsurancePlan.PlanType planType) {
        return planRepository.findByPlanType(planType);
    }

    public List<InsurancePlan> getActivePlansByType(InsurancePlan.PlanType planType) {
        return planRepository.findActivePlansByType(planType);
    }

    public List<InsurancePlan> getPlansByPremiumRange(Double minAmount, Double maxAmount) {
        return planRepository.findPlansByPremiumRange(minAmount, maxAmount);
    }

    public List<InsurancePlan> getActivePlansOrderByPremium() {
        return planRepository.findActivePlansOrderByPremium();
    }

    public long countActivePlansByType(InsurancePlan.PlanType planType) {
        return planRepository.countActivePlansByType(planType);
    }

    public InsurancePlan deactivatePlan(Long planId) {
        InsurancePlan plan = getPlanById(planId);
        plan.setIsActive(false);
        return planRepository.save(plan);
    }

    public InsurancePlan activatePlan(Long planId) {
        InsurancePlan plan = getPlanById(planId);
        plan.setIsActive(true);
        return planRepository.save(plan);
    }
}
