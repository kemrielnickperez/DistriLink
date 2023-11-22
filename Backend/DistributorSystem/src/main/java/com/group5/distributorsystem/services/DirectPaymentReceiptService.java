package com.group5.distributorsystem.services;


import com.group5.distributorsystem.models.*;
import com.group5.distributorsystem.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
    DistributorRepository distributorRepository;


    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    PaymentReceiptRepository paymentReceiptRepository;



    public DirectPaymentReceipt createDirectPaymentReceipt(DirectPaymentReceipt directPaymentReceipt, String receiverID) {

        DirectPaymentReceipt newdirectPaymentReceipt = directPaymentReceiptRepository.save(directPaymentReceipt);

        PaymentTransaction paymentTransaction = paymentTransactionRepository
                .findById(newdirectPaymentReceipt.getPaymenttransactionid()).get();

        if (receiverID != null) {
            Distributor distributor = distributorRepository.findById(receiverID).orElse(null);
            Employee employee = employeeRepository.findById(receiverID).orElse(null);

            if (distributor != null) {
                newdirectPaymentReceipt.setReceiverID(distributor.getDistributorid());
                newdirectPaymentReceipt.setReceivername(distributor.getFullName());
                distributor.getPaymentreceiptids().add(newdirectPaymentReceipt.getPaymentreceiptid());
                distributorRepository.save(distributor);
            } else if (employee != null) {
                newdirectPaymentReceipt.setReceiverID(employee.getEmployeeid());
                newdirectPaymentReceipt.setReceivername(employee.getFullName());
                employee.getPaymentreceiptids().add(newdirectPaymentReceipt.getPaymentreceiptid());
                employeeRepository.save(employee);
            }
        }
        paymentTransaction.getPaymentreceipts().add(newdirectPaymentReceipt);
        paymentTransactionRepository.save(paymentTransaction);

        //code para ma true na ang isPaid sa payment transaction if ang tanan amount sa PR kay equal na sa amount due sa PT
        paymentTransactionService.updatePaidPaymentTransaction(paymentTransaction.getPaymenttransactionid());


        return directPaymentReceiptRepository.save(newdirectPaymentReceipt);
    }








    public List<DirectPaymentReceipt> getAllDirectPaymentReceipts(){
        return directPaymentReceiptRepository.findAll();
    }
}
