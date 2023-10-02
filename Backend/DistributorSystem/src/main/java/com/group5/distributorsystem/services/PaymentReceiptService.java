package com.group5.distributorsystem.services;


import com.group5.distributorsystem.models.DirectPaymentReceipt;
import com.group5.distributorsystem.models.PaymentReceipt;
import com.group5.distributorsystem.models.PaymentTransaction;
import com.group5.distributorsystem.repositories.DirectPaymentReceiptRepository;
import com.group5.distributorsystem.repositories.PaymentReceiptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PaymentReceiptService {

    @Autowired
    PaymentReceiptRepository paymentReceiptRepository;

    @Autowired
    DirectPaymentReceiptRepository directPaymentReceiptRepository;

    public Iterable<PaymentReceipt> getAllPaymentReceipts(){
       return paymentReceiptRepository.findAll();
    }

    //di rako need ani kay sa list of receipts kay nagsagol raman tanan
   /* public Iterable<DirectPaymentReceipt> getPaymentReceiptsByDiscriminatorValue(String discriminatorvalue){
        return paymentReceiptRepository.getPaymentReceiptsByDiscriminatorValue(discriminatorvalue);
    }*/

    //I decided nga dili nalang ibutang diri nag methods para dili samok
    /*public DirectPaymentReceipt createDirectPaymentReceipt(DirectPaymentReceipt directPaymentReceipt){

        return paymentReceiptRepository.save(directPaymentReceipt);
    }*/

    public Optional<PaymentReceipt> getPaymentReceiptByID(String paymentreceiptid){
        return paymentReceiptRepository.findById(paymentreceiptid);
    }
}
