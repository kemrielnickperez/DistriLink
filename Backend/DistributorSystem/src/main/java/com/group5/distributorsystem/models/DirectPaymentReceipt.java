package com.group5.distributorsystem.models;


import org.bson.types.ObjectId;
import org.springframework.data.annotation.*;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;


public class DirectPaymentReceipt extends PaymentReceipt {

    private LocalDate datepaid;

    private double receivedamount;

    private LocalDate daterecorded;



    public DirectPaymentReceipt(){}

    public DirectPaymentReceipt(LocalDate datepaid, double receivedamount, LocalDate daterecorded) {
        this.datepaid = datepaid;
        this.receivedamount = receivedamount;
        this.daterecorded = daterecorded;
    }

    public DirectPaymentReceipt(String paymentreceiptid, String remarks, double amountpaid, String paymenttype, String paymenttransactionid, String receiverID, String receivername, LocalDate datepaid, double receivedamount, LocalDate daterecorded) {
        super(paymentreceiptid, remarks, amountpaid, paymenttype, paymenttransactionid, receiverID, receivername);
        this.datepaid = datepaid;
        this.receivedamount = receivedamount;
        this.daterecorded = daterecorded;
    }

    public LocalDate getDatepaid() {
        return datepaid;
    }

    public double getReceivedamount() {
        return receivedamount;
    }

    public LocalDate getDaterecorded() {
        return daterecorded;
    }

    public void setDatepaid(LocalDate datepaid) {
        this.datepaid = datepaid;
    }

    public void setReceivedamount(double receivedamount) {
        this.receivedamount = receivedamount;
    }

    public void setDaterecorded(LocalDate daterecorded) {
        this.daterecorded = daterecorded;
    }
}

