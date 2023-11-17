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

                PaymentTransaction newpt = new PaymentTransaction(pt.getPaymenttransactionid(), pt.getAmountdue(), pt.getStartingdate(), pt.getEnddate(), pt.getInstallmentnumber(), pt.isPaid(),  order, pt.getPaymentreceiptid());
                newpt = paymentTransactionRepository.save(newpt);

                order.getPaymenttransactionids().add(newpt.getPaymenttransactionid());
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


    public List<PaymentTransaction> getAllPaymentTransactionsByOrderID(String orderid) {
        System.out.println(orderid);
        return paymentTransactionRepository.findByOrder_Orderid(orderid);
    }


    public Optional<PaymentTransaction> getPaymentTransactionByID(String paymenttransactionid){
        return paymentTransactionRepository.findById(paymenttransactionid);
    }

    /*public ResponseEntity updatePaymentTransaction(PaymentTransaction[] paymentTransaction) {

        for(int i=0; i<paymentTransaction.length; i++) {

            PaymentTransaction updatedPaymentTransaction = paymentTransactionRepository.findById(paymentTransaction[i].getPaymenttransactionid()).get();
            Order order = orderRepository.findById(paymentTransaction[i].getOrderid()).get();

            updatedPaymentTransaction.setEnddate(paymentTransaction[i].getEnddate());
            updatedPaymentTransaction.setStartingdate(paymentTransaction[i].getStartingdate());

            PaymentTransaction updated2 = paymentTransactionRepository.save(updatedPaymentTransaction);

            for(PaymentTransaction pt : order.getPaymenttransactionids()) {
                if (pt.getPaymenttransactionid().equals(updated2.getPaymenttransactionid())) {
                    pt.setEnddate(updated2.getEnddate());
                    pt.setStartingdate(updated2.getStartingdate());
                }
                orderRepository.save(order);
            }
        }

        return new ResponseEntity("Payment Transaction Updated Successfully!", HttpStatus.OK);
    }*/


    public ResponseEntity updatePaymentTransaction(String paymenttransactionid, PaymentTransaction paymentTransaction) {
        PaymentTransaction updatedPaymentTransaction = paymentTransactionRepository.findById(paymenttransactionid).get();

        Order order = orderRepository.findById(paymentTransaction.getOrder().getOrderid()).get();
        updatedPaymentTransaction.setEnddate(paymentTransaction.getEnddate());
        updatedPaymentTransaction.setStartingdate(paymentTransaction.getStartingdate());

        PaymentTransaction updated2 = paymentTransactionRepository.save(updatedPaymentTransaction);

        List<PaymentTransaction> paymentTransactionsFromOrder = paymentTransactionRepository.findByOrder_Orderid(order.getOrderid());

        for(PaymentTransaction pt : paymentTransactionsFromOrder)
            if(pt.getPaymenttransactionid().equals(updated2.getPaymenttransactionid())){
                pt.setEnddate(updated2.getEnddate());
                pt.setStartingdate(updated2.getStartingdate());
            }

        paymentTransactionRepository.save(updatedPaymentTransaction);
        orderRepository.save(order);
        return new ResponseEntity("Payment Transaction Updated Successfully!", HttpStatus.OK);
    }

    public PaymentTransaction updatePaidPaymentTransaction(String paymenttransactionid) {
        PaymentTransaction updatedPaymentTransaction = paymentTransactionRepository.findById(paymenttransactionid).get();

        Order order = orderRepository.findById(updatedPaymentTransaction.getOrder().getOrderid()).get();

        updatedPaymentTransaction.setPaid(true);

        List<PaymentTransaction> paymentTransactionsFromOrder = paymentTransactionRepository.findByOrder_Orderid(order.getOrderid());

        for(PaymentTransaction pt : paymentTransactionsFromOrder) {
            if (pt.getPaymenttransactionid().equals(updatedPaymentTransaction.getPaymenttransactionid())) {
                pt.setPaid(updatedPaymentTransaction.isPaid());
                pt.setPaymentreceiptid(updatedPaymentTransaction.getPaymentreceiptid());
            }
        }

        orderRepository.save(order);

        return paymentTransactionRepository.save(updatedPaymentTransaction);


    }


}

