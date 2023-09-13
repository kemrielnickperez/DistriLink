package com.group5.distributorsystem.services;


import com.group5.distributorsystem.models.CollectionPaymentReceipt;
import com.group5.distributorsystem.models.DirectPaymentReceipt;
import com.group5.distributorsystem.repositories.CollectionPaymentReceiptRepository;
import com.group5.distributorsystem.repositories.DirectPaymentReceiptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CollectionPaymentReceiptService {

    @Autowired
    CollectionPaymentReceiptRepository collectionPaymentReceiptRepository;

    @Autowired
    PaymentTransactionService paymentTransactionService;

    public CollectionPaymentReceipt createCollectionPaymentReceipt(CollectionPaymentReceipt collectionPaymentReceipt, int paymenttransactionid){

        paymentTransactionService.updatePaidPaymentTransaction(paymenttransactionid);

        return collectionPaymentReceiptRepository.save(collectionPaymentReceipt);
    }

}
