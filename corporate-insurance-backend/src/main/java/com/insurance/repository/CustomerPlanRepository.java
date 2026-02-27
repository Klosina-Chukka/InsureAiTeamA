package com.insurance.repository;

import com.insurance.entity.CustomerPlan;
import com.insurance.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CustomerPlanRepository extends JpaRepository<CustomerPlan, Long> {
    
    List<CustomerPlan> findByCustomer(User customer);
    
    List<CustomerPlan> findByPlanId(Long planId);
    
    List<CustomerPlan> findByStatus(CustomerPlan.PlanStatus status);
    
    @Query("SELECT cp FROM CustomerPlan cp WHERE cp.customer.id = :customerId AND cp.status = 'ACTIVE'")
    List<CustomerPlan> findActivePlansByCustomer(@Param("customerId") Long customerId);
    
    @Query("SELECT cp FROM CustomerPlan cp WHERE cp.customer.id = :customerId AND cp.endDate >= :currentDate ORDER BY cp.endDate")
    List<CustomerPlan> findCurrentPlansByCustomer(@Param("customerId") Long customerId, @Param("currentDate") LocalDate currentDate);
    
    @Query("SELECT cp FROM CustomerPlan cp WHERE cp.endDate < :currentDate AND cp.status = 'ACTIVE'")
    List<CustomerPlan> findExpiredPlans(@Param("currentDate") LocalDate currentDate);
    
    @Query("SELECT COUNT(cp) FROM CustomerPlan cp WHERE cp.plan.id = :planId AND cp.status = 'ACTIVE'")
    long countActivePlansByPlanId(@Param("planId") Long planId);
    
    @Query("SELECT cp FROM CustomerPlan cp WHERE cp.policyNumber = :policyNumber")
    CustomerPlan findByPolicyNumber(@Param("policyNumber") String policyNumber);
    
    @Query("SELECT cp FROM CustomerPlan cp WHERE cp.customer.id = :customerId AND cp.plan.planType = :planType")
    List<CustomerPlan> findByCustomerAndPlanType(@Param("customerId") Long customerId, @Param("planType") String planType);
}
