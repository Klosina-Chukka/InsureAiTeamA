package com.insurance.repository;

import com.insurance.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    
    boolean existsByEmail(String email);
    
    @Query("SELECT u FROM User u WHERE u.role = :role")
    Page<User> findByRole(@Param("role") User.Role role, Pageable pageable);
    
    @Query("SELECT COUNT(u) FROM User u WHERE u.role = :role")
    long countByRole(@Param("role") User.Role role);
    
    @Query("SELECT u FROM User u WHERE u.role = :role AND u.enabled = :enabled")
    Page<User> findByRoleAndEnabled(@Param("role") User.Role role, @Param("enabled") boolean enabled, Pageable pageable);
    
    @Query("SELECT u FROM User u WHERE u.emailVerified = true AND u.enabled = true")
    Page<User> findActiveUsers(Pageable pageable);
}
