package com.insurance.service;

import com.insurance.entity.EmailVerificationToken;
import com.insurance.entity.PasswordResetToken;
import com.insurance.entity.User;
import com.insurance.repository.EmailVerificationTokenRepository;
import com.insurance.repository.PasswordResetTokenRepository;
import com.insurance.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@Transactional
public class TokenService {

    @Autowired
    private EmailVerificationTokenRepository emailVerificationTokenRepository;

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    private UserRepository userRepository;

    public EmailVerificationToken createEmailVerificationToken(User user) {
        // Delete existing tokens for this user
        emailVerificationTokenRepository.deleteByUser(user);
        
        String token = UUID.randomUUID().toString();
        LocalDateTime expiryDate = LocalDateTime.now().plusHours(24); // 24 hours expiry
        
        EmailVerificationToken emailVerificationToken = new EmailVerificationToken(token, user, expiryDate);
        return emailVerificationTokenRepository.save(emailVerificationToken);
    }

    public PasswordResetToken createPasswordResetToken(User user) {
        // Delete existing tokens for this user
        passwordResetTokenRepository.deleteByUser(user);
        
        String token = UUID.randomUUID().toString();
        LocalDateTime expiryDate = LocalDateTime.now().plusHours(1); // 1 hour expiry
        
        PasswordResetToken passwordResetToken = new PasswordResetToken(token, user, expiryDate);
        return passwordResetTokenRepository.save(passwordResetToken);
    }

    @Transactional
    public boolean verifyEmail(String token) {
        EmailVerificationToken verificationToken = emailVerificationTokenRepository.findByToken(token)
                .orElse(null);
        
        if (verificationToken == null || verificationToken.isExpired()) {
            return false;
        }
        
        User user = verificationToken.getUser();
        user.setEmailVerified(true);
        userRepository.save(user);
        
        // Delete the token after verification
        emailVerificationTokenRepository.delete(verificationToken);
        
        return true;
    }

    public User validatePasswordResetToken(String token) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token)
                .orElse(null);
        
        if (resetToken == null || resetToken.isExpired()) {
            return null;
        }
        
        return resetToken.getUser();
    }

    public void deletePasswordResetToken(String token) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token)
                .orElse(null);
        if (resetToken != null) {
            passwordResetTokenRepository.delete(resetToken);
        }
    }

    public void cleanupExpiredTokens() {
        LocalDateTime now = LocalDateTime.now();
        emailVerificationTokenRepository.deleteExpiredTokens(now);
        passwordResetTokenRepository.deleteExpiredTokens(now);
    }
}
