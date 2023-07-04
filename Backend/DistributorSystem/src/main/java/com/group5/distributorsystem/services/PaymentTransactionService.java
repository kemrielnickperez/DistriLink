package com.group5.distributorsystem.services;


import com.group5.distributorsystem.models.OrderedProduct;
import com.group5.distributorsystem.models.PaymentTransaction;
import com.group5.distributorsystem.repositories.PaymentTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentTransactionService {

    @Autowired
    PaymentTransactionRepository paymentTransactionRepository;


    public PaymentTransaction createPaymentTransaction(PaymentTransaction paymentTransaction){
        return paymentTransactionRepository.save(paymentTransaction);
    }

    public Iterable<PaymentTransaction> getAllPaymentTransactions(){
        return paymentTransactionRepository.findAll();
    }

}
