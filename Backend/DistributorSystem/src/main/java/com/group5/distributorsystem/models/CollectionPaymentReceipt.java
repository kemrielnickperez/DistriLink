package com.group5.distributorsystem.models;


import org.bson.types.ObjectId;
import org.springframework.data.annotation.*;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;




public class CollectionPaymentReceipt extends PaymentReceipt {

    private LocalDate collectiondate;

    private String collectionamount;

    private LocalDate remitteddate;

    private String remittedamount;

    private LocalDate confirmationdate;


    private boolean isConfirmed;

    //DBRef
    private Employee collector;



   /* @ManyToOne
    @JoinColumn(name = "collectorid")
    @JsonBackReference("employee-collectionpaymenttransactions-reference")
    */


    public CollectionPaymentReceipt() {
    }

    public CollectionPaymentReceipt(String paymentreceiptid, String remarks, String paymenttype, PaymentTransaction paymenttransaction, Employee cashier, LocalDate collectiondate, String collectionamount, LocalDate remitteddate, String remittedamount, LocalDate confirmationdate, boolean isConfirmed, Employee collector) {
        super(paymentreceiptid, remarks, paymenttype, paymenttransaction, cashier);
        this.collectiondate = collectiondate;
        this.collectionamount = collectionamount;
        this.remitteddate = remitteddate;
        this.remittedamount = remittedamount;
        this.confirmationdate = confirmationdate;
        this.isConfirmed = isConfirmed;
        this.collector = collector;
    }

    public LocalDate getCollectiondate() {
        return collectiondate;
    }

    public void setCollectiondate(LocalDate collectiondate) {
        this.collectiondate = collectiondate;
    }

    public String getCollectionamount() {
        return collectionamount;
    }

    public void setCollectionamount(String collectionamount) {
        this.collectionamount = collectionamount;
    }

    public LocalDate getRemitteddate() {
        return remitteddate;
    }

    public void setRemitteddate(LocalDate remitteddate) {
        this.remitteddate = remitteddate;
    }

    public String getRemittedamount() {
        return remittedamount;
    }

    public void setRemittedamount(String remittedamount) {
        this.remittedamount = remittedamount;
    }

    public LocalDate getConfirmationdate() {
        return confirmationdate;
    }

    public void setConfirmationdate(LocalDate confirmationdate) {
        this.confirmationdate = confirmationdate;
    }

    public boolean isConfirmed() {
        return isConfirmed;
    }

    public void setConfirmed(boolean confirmed) {
        isConfirmed = confirmed;
    }

    public Employee getCollector() {
        return collector;
    }

    public void setCollector(Employee collector) {
        this.collector = collector;
    }
}
