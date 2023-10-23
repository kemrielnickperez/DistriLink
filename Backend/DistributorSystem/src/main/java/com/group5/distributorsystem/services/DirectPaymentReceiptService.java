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
        //Save direct payment receipt pass as parameter
        DirectPaymentReceipt newdirectPaymentReceipt = directPaymentReceiptRepository.save(directPaymentReceipt);

        PaymentTransaction paymentTransaction = paymentTransactionRepository.findById(newdirectPaymentReceipt.getPaymenttransaction().getPaymenttransactionid()).get();

        Order order = orderRepository.findById(newdirectPaymentReceipt.getPaymenttransaction().getOrderid()).get();

        Employee cashier = employeeRepository.findById(newdirectPaymentReceipt.getCashier().getEmployeeid()).get();

        paymentTransaction.setPaymentreceiptid(newdirectPaymentReceipt.getPaymentreceiptid());

        paymentTransactionService.updatePaidPaymentTransaction(paymentTransaction.getPaymenttransactionid());

        paymentTransaction.setPaid((true));

        for(PaymentTransaction pt : order.getPaymenttransactions()) {
            if (pt.getPaymenttransactionid().equals(paymentTransaction.getPaymenttransactionid())) {
                pt.setPaid(paymentTransaction.isPaid());
            }
        }

        paymentTransaction.setPaymentreceiptid(newdirectPaymentReceipt.getPaymentreceiptid());

        cashier.getPaymentreceiptids().add(newdirectPaymentReceipt.getPaymentreceiptid());

        paymentTransactionRepository.save(paymentTransaction);

        employeeRepository.save(cashier);

        orderRepository.save(order);

        return directPaymentReceiptRepository.save(newdirectPaymentReceipt);
    }

    public List<DirectPaymentReceipt> getAllDirectPaymentReceipts(){
        return directPaymentReceiptRepository.findAll();
    }
}
