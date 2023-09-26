package com.group5.distributorsystem.services;


import com.group5.distributorsystem.models.DirectPaymentReceipt;
import com.group5.distributorsystem.models.Employee;
import com.group5.distributorsystem.models.Order;
import com.group5.distributorsystem.models.PaymentTransaction;
import com.group5.distributorsystem.repositories.DirectPaymentReceiptRepository;
import com.group5.distributorsystem.repositories.PaymentReceiptRepository;
import com.group5.distributorsystem.repositories.PaymentTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DirectPaymentReceiptService {

    @Autowired
    DirectPaymentReceiptRepository directPaymentReceiptRepository;

    @Autowired
    PaymentTransactionService paymentTransactionService;

    @Autowired
    PaymentTransactionRepository paymentTransactionRepository;

    public DirectPaymentReceipt createDirectPaymentReceipt(DirectPaymentReceipt directPaymentReceipt, String paymenttransactionid){

        PaymentTransaction paymentTransaction = paymentTransactionRepository.findById(directPaymentReceipt.getPaymenttransaction().getPaymenttransactionid()).get();

        paymentTransaction.setPaymentreceiptid(directPaymentReceipt.getPaymentreceiptid());


        paymentTransactionService.updatePaidPaymentTransaction(paymenttransactionid);

        paymentTransactionRepository.save(paymentTransaction);
        return directPaymentReceiptRepository.save(directPaymentReceipt);
    }

    public List<DirectPaymentReceipt> getAllDirectPaymentReceipts(){
        return directPaymentReceiptRepository.findAll();
    }
}
