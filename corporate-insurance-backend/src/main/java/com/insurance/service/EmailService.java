package com.insurance.service;

import com.insurance.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public void sendVerificationEmail(User user, String token) {
        String subject = "Email Verification - Corporate Insurance";
        String verificationUrl = "http://localhost:8090/api/auth/verify-email?token=" + token;
        
        String message = "Dear " + user.getFirstName() + " " + user.getLastName() + ",\n\n" +
                        "Thank you for registering with Corporate Insurance. Please click the link below to verify your email address:\n\n" +
                        verificationUrl + "\n\n" +
                        "This link will expire in 24 hours.\n\n" +
                        "Best regards,\n" +
                        "Corporate Insurance Team";

        sendEmail(user.getEmail(), subject, message);
    }

    public void sendPasswordResetEmail(User user, String resetToken) {
        String subject = "Password Reset - Corporate Insurance";
        String resetUrl = "http://localhost:5173/reset-password?token=" + resetToken;
        
        String message = "Dear " + user.getFirstName() + " " + user.getLastName() + ",\n\n" +
                        "You have requested to reset your password. Please click the link below to reset your password:\n\n" +
                        resetUrl + "\n\n" +
                        "This link will expire in 1 hour.\n\n" +
                        "If you did not request this password reset, please ignore this email.\n\n" +
                        "Best regards,\n" +
                        "Corporate Insurance Team";

        sendEmail(user.getEmail(), subject, message);
    }

    public void sendAppointmentConfirmation(User user, String appointmentDetails) {
        String subject = "Appointment Confirmation - Corporate Insurance";
        
        String message = "Dear " + user.getFirstName() + " " + user.getLastName() + ",\n\n" +
                        "Your appointment has been successfully scheduled. Here are the details:\n\n" +
                        appointmentDetails + "\n\n" +
                        "Please make sure to arrive on time. If you need to reschedule or cancel, please contact us.\n\n" +
                        "Best regards,\n" +
                        "Corporate Insurance Team";

        sendEmail(user.getEmail(), subject, message);
    }

    public void sendAppointmentCancellation(User user, String appointmentDetails) {
        String subject = "Appointment Cancelled - Corporate Insurance";
        
        String message = "Dear " + user.getFirstName() + " " + user.getLastName() + ",\n\n" +
                        "Your appointment has been cancelled. Here were the details:\n\n" +
                        appointmentDetails + "\n\n" +
                        "If you did not request this cancellation, please contact us immediately.\n\n" +
                        "Best regards,\n" +
                        "Corporate Insurance Team";

        sendEmail(user.getEmail(), subject, message);
    }

    public void sendAppointmentReminder(User user, String appointmentDetails) {
        String subject = "Appointment Reminder - Corporate Insurance";
        
        String message = "Dear " + user.getFirstName() + " " + user.getLastName() + ",\n\n" +
                        "This is a reminder about your upcoming appointment:\n\n" +
                        appointmentDetails + "\n\n" +
                        "Please make sure to arrive on time. If you need to reschedule or cancel, please contact us.\n\n" +
                        "Best regards,\n" +
                        "Corporate Insurance Team";

        sendEmail(user.getEmail(), subject, message);
    }

    public void sendPlanExpiryReminder(User user, String planDetails) {
        String subject = "Insurance Plan Expiry Reminder - Corporate Insurance";
        
        String message = "Dear " + user.getFirstName() + " " + user.getLastName() + ",\n\n" +
                        "This is a reminder that your insurance plan is expiring soon:\n\n" +
                        planDetails + "\n\n" +
                        "Please renew your plan to continue your coverage. Contact us if you need assistance.\n\n" +
                        "Best regards,\n" +
                        "Corporate Insurance Team";

        sendEmail(user.getEmail(), subject, message);
    }

    public void sendGeneralNotification(User user, String title, String message) {
        String subject = title + " - Corporate Insurance";
        
        String emailMessage = "Dear " + user.getFirstName() + " " + user.getLastName() + ",\n\n" +
                            message + "\n\n" +
                            "Best regards,\n" +
                            "Corporate Insurance Team";

        sendEmail(user.getEmail(), subject, emailMessage);
    }

    private void sendEmail(String to, String subject, String message) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(fromEmail);
            mailMessage.setTo(to);
            mailMessage.setSubject(subject);
            mailMessage.setText(message);
            
            mailSender.send(mailMessage);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send email: " + e.getMessage());
        }
    }
}
