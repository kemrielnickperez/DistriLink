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
import org.springframework.stereotype.Service;

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

    public CollectionPaymentReceipt createCollectionPaymentReceipt(CollectionPaymentReceipt collectionPaymentReceipt, String paymenttransactionid){

        PaymentTransaction paymentTransaction = paymentTransactionRepository.findById(collectionPaymentReceipt.getPaymenttransaction().getPaymenttransactionid()).get();

        Employee employee = employeeRepository.findById(collectionPaymentReceipt.getCollector().getEmployeeid()).get();


        employee.getCollectionpaymentids().add(collectionPaymentReceipt.getPaymentreceiptid());

        employeeRepository.save(employee);

        paymentTransaction.setPaymentreceiptid(collectionPaymentReceipt.getPaymentreceiptid());


        paymentTransactionService.updatePaidPaymentTransaction(paymenttransactionid);

        paymentTransactionRepository.save(paymentTransaction);



        return collectionPaymentReceiptRepository.save(collectionPaymentReceipt);
    }

}
