package com.group5.distributorsystem.services;


import com.group5.distributorsystem.models.*;
import com.group5.distributorsystem.repositories.OrderRepository;
import com.group5.distributorsystem.repositories.PaymentTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentTransactionService {

    @Autowired
    PaymentTransactionRepository paymentTransactionRepository;

    @Autowired
    OrderRepository orderRepository;

    @Transactional
    public PaymentTransaction createPaymentTransaction(PaymentTransaction paymentTransaction) {

        PaymentTransaction pt = paymentTransactionRepository.save(paymentTransaction);
                /*new PaymentTransaction(paymentTransaction.getPaymenttransactionid(), paymentTransaction.getAmountdue(), paymentTransaction.getStartingdate(), paymentTransaction.getEnddate(), paymentTransaction.getInstallmentnumber(), paymentTransaction.isPaid(), paymentTransaction.getOrder(), paymentTransaction.getPaymentreceiptid());*/

        //Order order = orderRepository.findById(pt.getOrder().getOrderid()).get();
        //order.getPaymenttransactions().add(pt);
        //orderRepository.save(order);
        //pt.setOrder((pt.getOrder()));

        Order order = orderRepository.findById(pt.getOrder().getOrderid()).get();
        order.getPaymenttransactions().add(pt);
        orderRepository.save(order);
        return pt;
    }

    public List<PaymentTransaction> getAllPaymentTransactions() {
        return paymentTransactionRepository.findAll();
    }

    public Optional<PaymentTransaction> getPaymentTransactionByID(String paymenttransactionid){
        return paymentTransactionRepository.findById(paymenttransactionid);
    }

    public ResponseEntity updatePaymentTransaction(String paymenttransactionid, PaymentTransaction paymentTransaction) {
        PaymentTransaction updatedPaymentTransaction = paymentTransactionRepository.findById(paymenttransactionid).get();

        //07-18-23 - I removed the feature of changing the amount due for each installment/gives kay lisod, might change later if maka gets ko unsaon ni
        //  updatedPaymentTransaction.setAmountdue(paymentTransaction.getAmountdue());
        updatedPaymentTransaction.setEnddate(paymentTransaction.getEnddate());
        updatedPaymentTransaction.setStartingdate(paymentTransaction.getStartingdate());

        paymentTransactionRepository.save(updatedPaymentTransaction);
        return new ResponseEntity("Payment Transaction Updated Successfully!", HttpStatus.OK);
    }

    public ResponseEntity updatePaidPaymentTransaction(String paymenttransactionid) {
        PaymentTransaction updatedPaymentTransaction = paymentTransactionRepository.findById(paymenttransactionid).get();

        updatedPaymentTransaction.setPaid(true);

        paymentTransactionRepository.save(updatedPaymentTransaction);
        return new ResponseEntity("Payment Transaction Updated as Paid Successfully!", HttpStatus.OK);
    }
}

