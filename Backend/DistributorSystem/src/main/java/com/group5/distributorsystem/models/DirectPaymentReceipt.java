package com.group5.distributorsystem.models;


import org.bson.types.ObjectId;
import org.springframework.data.annotation.*;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;


public class DirectPaymentReceipt extends PaymentReceipt {

    private LocalDate datepaid;

    private double amountpaid;

    public DirectPaymentReceipt() {
    }

    public DirectPaymentReceipt(LocalDate datepaid, double amountpaid) {
        this.datepaid = datepaid;
        this.amountpaid = amountpaid;
    }

    public DirectPaymentReceipt(String paymentreceiptid, String remarks, String paymenttype, PaymentTransaction paymenttransaction, Employee cashier, LocalDate datepaid, double amountpaid) {
        super(paymentreceiptid, remarks, paymenttype, paymenttransaction, cashier);
        this.datepaid = datepaid;
        this.amountpaid = amountpaid;
    }

    public LocalDate getDatepaid() {
        return datepaid;
    }

    public void setDatepaid(LocalDate datepaid) {
        this.datepaid = datepaid;
    }

    public double getAmountpaid() {
        return amountpaid;
    }

    public void setAmountpaid(double amountpaid) {
        this.amountpaid = amountpaid;
    }


}
