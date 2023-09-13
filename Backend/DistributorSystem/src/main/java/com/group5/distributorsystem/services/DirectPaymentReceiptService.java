package com.group5.distributorsystem.services;


import com.group5.distributorsystem.models.DirectPaymentReceipt;
import com.group5.distributorsystem.models.PaymentTransaction;
import com.group5.distributorsystem.repositories.DirectPaymentReceiptRepository;
import com.group5.distributorsystem.repositories.PaymentTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DirectPaymentReceiptService {

    @Autowired
    DirectPaymentReceiptRepository directPaymentReceiptRepository;

    @Autowired
    PaymentTransactionService paymentTransactionService;

    public DirectPaymentReceipt createDirectPaymentReceipt(DirectPaymentReceipt directPaymentReceipt, int paymenttransactionid){
        paymentTransactionService.updatePaidPaymentTransaction(paymenttransactionid);

        return directPaymentReceiptRepository.save(directPaymentReceipt);
    }

    public Iterable<DirectPaymentReceipt> getAllDirectPaymentReceipts(){
        return directPaymentReceiptRepository.findAll();
    }
}
