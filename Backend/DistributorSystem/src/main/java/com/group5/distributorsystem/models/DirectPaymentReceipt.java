package com.group5.distributorsystem.models;


import org.bson.types.ObjectId;
import org.springframework.data.annotation.*;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;


public class DirectPaymentReceipt extends PaymentReceipt {

    private LocalDate datepaid;

    private double amountpaid;

    private LocalDate daterecored;

    public DirectPaymentReceipt() {
    }

    public DirectPaymentReceipt(LocalDate datepaid, double amountpaid, LocalDate daterecored) {
        this.datepaid = datepaid;
        this.amountpaid = amountpaid;
        this.daterecored = daterecored;
    }

    public DirectPaymentReceipt(String paymentreceiptid, String remarks, String paymenttype, PaymentTransaction paymenttransaction, Employee cashier, LocalDate datepaid, double amountpaid, LocalDate daterecored) {
        super(paymentreceiptid, remarks, paymenttype, paymenttransaction, cashier);
        this.datepaid = datepaid;
        this.amountpaid = amountpaid;
        this.daterecored = daterecored;
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

    public LocalDate getDaterecored() {
        return daterecored;
    }

    public void setDaterecored(LocalDate daterecored) {
        this.daterecored = daterecored;
    }
}
