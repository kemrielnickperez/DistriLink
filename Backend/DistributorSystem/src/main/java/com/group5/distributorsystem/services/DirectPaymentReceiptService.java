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


    public PaymentReceiver findPaymentReceiverById(String receiverId) {
        Optional<Distributor> distributorOptional = distributorRepository.findById(receiverId);
        if (distributorOptional.isPresent()) {
            return distributorOptional.get();
        }

        Optional<Employee> employeeOptional = employeeRepository.findById(receiverId);
        return employeeOptional.orElse(null);
    }
    public DirectPaymentReceipt createDirectPaymentReceipt(DirectPaymentReceipt directPaymentReceipt){

        DirectPaymentReceipt newdirectPaymentReceipt = directPaymentReceiptRepository.save(directPaymentReceipt);

        PaymentTransaction paymentTransaction = paymentTransactionRepository.findById(newdirectPaymentReceipt.getPaymenttransaction().getPaymenttransactionid()).get();

        /*System.out.println(newdirectPaymentReceipt.getCashier().getEmployeeid());*/
        PaymentReceiver receiver = findPaymentReceiverById(newdirectPaymentReceipt.getReceiver().getReceiverId());


        paymentTransaction.setPaymentreceiptid(newdirectPaymentReceipt.getPaymentreceiptid());
        paymentTransactionRepository.save(paymentTransaction);
        paymentTransactionService.updatePaidPaymentTransaction(paymentTransaction.getPaymenttransactionid());

        if (receiver instanceof Employee) {
            Employee employeeReceiver = (Employee) receiver;
            employeeReceiver.getPaymentreceiptids().add(newdirectPaymentReceipt.getPaymentreceiptid());
            employeeRepository.save(employeeReceiver);
        } else if (receiver instanceof Distributor) {
            Distributor distributorReceiver = (Distributor) receiver;
            distributorReceiver.getPaymentreceiptids().add(newdirectPaymentReceipt.getPaymentreceiptid());
            distributorRepository.save(distributorReceiver);
        }

        newdirectPaymentReceipt.setPaymenttransaction(paymentTransaction);
        newdirectPaymentReceipt.setReceiver(receiver);

        paymentTransactionRepository.save(paymentTransaction);



        directPaymentReceiptRepository.save(newdirectPaymentReceipt);

        return directPaymentReceiptRepository.save(newdirectPaymentReceipt);
    }

    public List<DirectPaymentReceipt> getAllDirectPaymentReceipts(){
        return directPaymentReceiptRepository.findAll();
    }
}
