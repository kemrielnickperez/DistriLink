package com.group5.distributorsystem.services;


import com.group5.distributorsystem.models.DirectPaymentReceipt;
import com.group5.distributorsystem.models.Employee;
import com.group5.distributorsystem.models.Order;
import com.group5.distributorsystem.models.PaymentTransaction;
import com.group5.distributorsystem.repositories.*;
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

    @Autowired
    OrderRepository orderRepository;


    @Autowired
    EmployeeRepository employeeRepository;

    public DirectPaymentReceipt createDirectPaymentReceipt(DirectPaymentReceipt directPaymentReceipt){

        DirectPaymentReceipt newdirectPaymentReceipt = directPaymentReceiptRepository.save(directPaymentReceipt);

        PaymentTransaction paymentTransaction = paymentTransactionRepository.findById(newdirectPaymentReceipt.getPaymenttransaction().getPaymenttransactionid()).get();

        System.out.println(newdirectPaymentReceipt.getCashier().getEmployeeid());
        Employee cashier = employeeRepository.findById(newdirectPaymentReceipt.getCashier().getEmployeeid()).get();


        paymentTransaction.setPaymentreceiptid(newdirectPaymentReceipt.getPaymentreceiptid());
        paymentTransactionRepository.save(paymentTransaction);
        paymentTransactionService.updatePaidPaymentTransaction(paymentTransaction.getPaymenttransactionid());

        cashier.getPaymentreceiptids().add(newdirectPaymentReceipt.getPaymentreceiptid());

        newdirectPaymentReceipt.setPaymenttransaction(paymentTransaction);
        newdirectPaymentReceipt.setCashier(cashier);

        paymentTransactionRepository.save(paymentTransaction);

        employeeRepository.save(cashier);

        directPaymentReceiptRepository.save(newdirectPaymentReceipt);

        return directPaymentReceiptRepository.save(newdirectPaymentReceipt);
    }

    public List<DirectPaymentReceipt> getAllDirectPaymentReceipts(){
        return directPaymentReceiptRepository.findAll();
    }
}
