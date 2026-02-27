package com.insurance.repository;

import com.insurance.entity.AgentAvailability;
import com.insurance.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface AgentAvailabilityRepository extends JpaRepository<AgentAvailability, Long> {
    
    List<AgentAvailability> findByAgent(User agent);
    
    List<AgentAvailability> findByAgentAndAvailableDate(User agent, LocalDate date);
    
    List<AgentAvailability> findByAvailableDateAndIsBookedFalse(LocalDate date);
    
    @Query("SELECT a FROM AgentAvailability a WHERE a.agent.id = :agentId AND a.availableDate = :date AND " +
           "a.isBooked = false AND a.availableDate >= :currentDate ORDER BY a.startTime")
    List<AgentAvailability> findAvailableSlotsForAgent(@Param("agentId") Long agentId,
                                                        @Param("date") LocalDate date,
                                                        @Param("currentDate") LocalDate currentDate);
    
    @Query("SELECT a FROM AgentAvailability a WHERE a.availableDate = :date AND a.isBooked = false " +
           "AND a.availableDate >= :currentDate ORDER BY a.agent.firstName, a.startTime")
    List<AgentAvailability> findAllAvailableSlots(@Param("date") LocalDate date,
                                                 @Param("currentDate") LocalDate currentDate);
    
    @Query("SELECT a FROM AgentAvailability a WHERE a.agent.id = :agentId AND a.availableDate = :date AND " +
           "((a.startTime <= :startTime AND a.endTime > :startTime) OR " +
           "(a.startTime < :endTime AND a.endTime >= :endTime) OR " +
           "(a.startTime >= :startTime AND a.endTime <= :endTime))")
    List<AgentAvailability> findOverlappingSlots(@Param("agentId") Long agentId,
                                                  @Param("date") LocalDate date,
                                                  @Param("startTime") LocalTime startTime,
                                                  @Param("endTime") LocalTime endTime);
    
    @Query("SELECT a FROM AgentAvailability a WHERE a.availableDate BETWEEN :startDate AND :endDate " +
           "AND a.isBooked = false ORDER BY a.availableDate, a.startTime")
    List<AgentAvailability> findAvailableSlotsInDateRange(@Param("startDate") LocalDate startDate,
                                                          @Param("endDate") LocalDate endDate);
    
    @Query("SELECT COUNT(a) FROM AgentAvailability a WHERE a.agent.id = :agentId AND a.availableDate = :date")
    long countSlotsForAgentOnDate(@Param("agentId") Long agentId, @Param("date") LocalDate date);
}
