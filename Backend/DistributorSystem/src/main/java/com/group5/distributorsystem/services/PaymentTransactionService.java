package com.group5.distributorsystem.services;


import com.group5.distributorsystem.models.*;
import com.group5.distributorsystem.repositories.OrderRepository;
import com.group5.distributorsystem.repositories.PaymentTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class PaymentTransactionService {

    @Autowired
    PaymentTransactionRepository paymentTransactionRepository;

    @Autowired
    OrderRepository orderRepository;

    public void createPaymentTransaction(PaymentTransaction[] paymentTransactions, String orderid) {

        Order order = orderRepository.findById(orderid).get();
    //if(order != null){
        //for(int i=0; i<= paymentTransaction.length; i++){
        for(PaymentTransaction pt :paymentTransactions) {

                PaymentTransaction newpt = new PaymentTransaction(pt.getPaymenttransactionid(), pt.getAmountdue(), pt.getStartingdate(), pt.getEnddate(), pt.getInstallmentnumber(), pt.isPaid(),  orderid, pt.getPaymentreceiptid());
                newpt = paymentTransactionRepository.save(newpt);

                order.getPaymenttransactions().add(newpt);
        }

        orderRepository.save(order);

        //OrderedProduct newOrderedProduct = new OrderedProduct(op.getOrderedproductid(), quantity, subtotal, productid, newOrder.getOrderid());
       // newOrderedProduct = orderedProductRepository.save(newOrderedProduct);

        //PaymentTransaction pt = paymentTransactionRepository.save(paymentTransaction);
        //PaymentTransaction pt = new PaymentTransaction(paymentTransaction.getPaymenttransactionid(), paymentTransaction.getAmountdue(), paymentTransaction.getStartingdate(), paymentTransaction.getEnddate(), paymentTransaction.getInstallmentnumber(), paymentTransaction.isPaid(),  orderid, paymentTransaction.getPaymentreceiptid());
        //pt = paymentTransactionRepository.save(pt);

        //PaymentTransaction pt =paymentTransactionRepository.save(paymentTransaction);
        //Order order = orderRepository.findById(pt.getOrderid()).get();
        //order.getPaymenttransactions().add(pt.getPaymenttransactionid());

        //orderRepository.save(order);
/*        pt.setOrderid(orderid);
        ;*/
        //return order;

    }

    public List<PaymentTransaction> getAllPaymentTransactions() {
        return paymentTransactionRepository.findAll();
    }

    public Optional<PaymentTransaction> getPaymentTransactionByID(String paymenttransactionid){
        return paymentTransactionRepository.findById(paymenttransactionid);
    }

    public ResponseEntity updatePaymentTransaction(String paymenttransactionid, PaymentTransaction paymentTransaction) {
        PaymentTransaction updatedPaymentTransaction = paymentTransactionRepository.findById(paymenttransactionid).get();
        System.out.println(updatedPaymentTransaction.getStartingdate());

        Order order = orderRepository.findById(paymentTransaction.getOrderid()).get();
        //07-18-23 - I removed the feature of changing the amount due for each installment/gives kay lisod, might change later if maka gets ko unsaon ni
        //  updatedPaymentTransaction.setAmountdue(paymentTransaction.getAmountdue());
        updatedPaymentTransaction.setEnddate(paymentTransaction.getEnddate());
        updatedPaymentTransaction.setStartingdate(paymentTransaction.getStartingdate());

        PaymentTransaction updated2 =paymentTransactionRepository.save(updatedPaymentTransaction);
        for(PaymentTransaction pt : order.getPaymenttransactions())
            if(pt.getPaymenttransactionid().equals(updated2.getPaymenttransactionid())){
                System.out.println("yey same");
                pt.setEnddate(updated2.getEnddate());
                pt.setStartingdate(updated2.getStartingdate());
            }

        paymentTransactionRepository.save(updatedPaymentTransaction);
        orderRepository.save(order);
        return new ResponseEntity("Payment Transaction Updated Successfully!", HttpStatus.OK);
    }

    public ResponseEntity updatePaidPaymentTransaction(String paymenttransactionid) {
        PaymentTransaction updatedPaymentTransaction = paymentTransactionRepository.findById(paymenttransactionid).get();

        updatedPaymentTransaction.setPaid(true);

        paymentTransactionRepository.save(updatedPaymentTransaction);
        return new ResponseEntity("Payment Transaction Updated as Paid Successfully!", HttpStatus.OK);
    }
}

