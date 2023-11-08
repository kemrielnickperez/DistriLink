package com.group5.distributorsystem.services;

import com.group5.distributorsystem.models.Dealer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class DealerEmailService {

        @Autowired
        private JavaMailSender javaMailSender;
        public void sendConfirmEmail(Dealer dealer, String subject, String content ) {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom("capstone.distrilink@gmail.com");
            mailMessage.setTo(dealer.getEmailaddress());
            mailMessage.setSubject(subject); // Use the subject parameter
            mailMessage.setText(content); // Use the content parameter

            javaMailSender.send(mailMessage);
            System.out.println("Confirmed Successfully!");
        }
    public void sendPendingEmail(Dealer dealer, String subject, String content) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom("capstone.distrilink@gmail.com");
        mailMessage.setTo(dealer.getEmailaddress());
        mailMessage.setSubject(subject);
        mailMessage.setText(content);

        javaMailSender.send(mailMessage);
        System.out.println("Pending Email Sent Successfully!");
    }
    }

