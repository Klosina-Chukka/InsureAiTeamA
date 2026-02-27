package com.insurance.repository;

import com.insurance.entity.InsurancePlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InsurancePlanRepository extends JpaRepository<InsurancePlan, Long> {
    
    List<InsurancePlan> findByPlanType(InsurancePlan.PlanType planType);
    
    List<InsurancePlan> findByIsActive(Boolean isActive);
    
    @Query("SELECT p FROM InsurancePlan p WHERE p.isActive = true ORDER BY p.premiumAmount ASC")
    List<InsurancePlan> findActivePlansOrderByPremium();
    
    @Query("SELECT p FROM InsurancePlan p WHERE p.planType = :planType AND p.isActive = true")
    List<InsurancePlan> findActivePlansByType(@Param("planType") InsurancePlan.PlanType planType);
    
    @Query("SELECT COUNT(p) FROM InsurancePlan p WHERE p.planType = :planType AND p.isActive = true")
    long countActivePlansByType(@Param("planType") InsurancePlan.PlanType planType);
    
    @Query("SELECT p FROM InsurancePlan p WHERE p.premiumAmount BETWEEN :minAmount AND :maxAmount AND p.isActive = true")
    List<InsurancePlan> findPlansByPremiumRange(@Param("minAmount") Double minAmount, 
                                               @Param("maxAmount") Double maxAmount);
}
