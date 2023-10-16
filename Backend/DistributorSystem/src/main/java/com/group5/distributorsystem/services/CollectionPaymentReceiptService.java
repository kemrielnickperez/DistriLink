package com.group5.distributorsystem.services;


import com.group5.distributorsystem.models.CollectionPaymentReceipt;
import com.group5.distributorsystem.models.DirectPaymentReceipt;
import com.group5.distributorsystem.models.Employee;
import com.group5.distributorsystem.models.PaymentTransaction;
import com.group5.distributorsystem.repositories.CollectionPaymentReceiptRepository;
import com.group5.distributorsystem.repositories.DirectPaymentReceiptRepository;
import com.group5.distributorsystem.repositories.EmployeeRepository;
import com.group5.distributorsystem.repositories.PaymentTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CollectionPaymentReceiptService {

    @Autowired
    CollectionPaymentReceiptRepository collectionPaymentReceiptRepository;

    @Autowired
    PaymentTransactionService paymentTransactionService;

    @Autowired
    PaymentTransactionRepository paymentTransactionRepository;

    @Autowired
    EmployeeRepository employeeRepository;


    public CollectionPaymentReceipt createCollectionPaymentReceipt(CollectionPaymentReceipt collectionPaymentReceipt){

        PaymentTransaction paymentTransaction = paymentTransactionRepository.findById(collectionPaymentReceipt.getPaymenttransaction().getPaymenttransactionid()).get();

        Employee collector = employeeRepository.findById(collectionPaymentReceipt.getCollector().getEmployeeid()).get();

        paymentTransaction.setPaymentreceiptid(collectionPaymentReceipt.getPaymentreceiptid());

        collector.getCollectionpaymentids().add(collectionPaymentReceipt.getPaymentreceiptid());

        paymentTransactionService.updatePaidPaymentTransaction(paymentTransaction.getPaymenttransactionid());

        paymentTransactionRepository.save(paymentTransaction);

        employeeRepository.save(collector);

        paymentTransactionRepository.save(paymentTransaction);

        return collectionPaymentReceiptRepository.save(collectionPaymentReceipt);
    }

    public ResponseEntity confirmCollectionPaymentReceipt(String collectionpaymentreciptid, String cashierid) {

        CollectionPaymentReceipt collectionPaymentReceipt = collectionPaymentReceiptRepository.findById(collectionpaymentreciptid).get();

        Employee cashier = employeeRepository.findById(cashierid).get();

        collectionPaymentReceipt.setConfirmed(true);
        collectionPaymentReceipt.setCashier(cashier);
        cashier.getPaymentreceiptids().add(collectionPaymentReceipt.getPaymentreceiptid());


        collectionPaymentReceiptRepository.save(collectionPaymentReceipt);
        employeeRepository.save(cashier);

        return new ResponseEntity("Collection Payment Receipt Confirmed Successfully!", HttpStatus.OK);
    }

    public List<CollectionPaymentReceipt> findByIsConfirmedFalse() {
        return collectionPaymentReceiptRepository.findByIsConfirmedFalse();
    }
}
