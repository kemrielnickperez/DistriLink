package com.group5.distributorsystem.services;


import com.group5.distributorsystem.models.Employee;
import com.group5.distributorsystem.models.Order;
import com.group5.distributorsystem.models.OrderedProduct;
import com.group5.distributorsystem.models.PaymentTransaction;
import com.group5.distributorsystem.repositories.PaymentTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class PaymentTransactionService {

    @Autowired
    PaymentTransactionRepository paymentTransactionRepository;


    public PaymentTransaction createPaymentTransaction(PaymentTransaction paymentTransaction) {
        return paymentTransactionRepository.save(paymentTransaction);
    }

    public Iterable<PaymentTransaction> getAllPaymentTransactions() {
        return paymentTransactionRepository.findAll();
    }

    public ResponseEntity updatePaymentTransaction(int paymenttransactionid, PaymentTransaction paymentTransaction) {
        PaymentTransaction updatedPaymentTransaction = paymentTransactionRepository.findById(paymenttransactionid).get();

        //07-18-23 - I removed the feature of changing the amount due for each installment/gives kay lisod, might change later if maka gets ko unsaon ni
        //  updatedPaymentTransaction.setAmountdue(paymentTransaction.getAmountdue());
        updatedPaymentTransaction.setEnddate(paymentTransaction.getEnddate());
        updatedPaymentTransaction.setStartingdate(paymentTransaction.getStartingdate());

        paymentTransactionRepository.save(updatedPaymentTransaction);
        return new ResponseEntity("Payment Transaction Updated Successfully!", HttpStatus.OK);
    }
}

