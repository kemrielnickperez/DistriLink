package com.group5.distributorsystem.models;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@DiscriminatorValue("collection")
public class CollectionPaymentReceipt extends PaymentReceipt {

    @Column
    private LocalDate collectiondate;

    @Column
    private String collectionamount;
    @Column
    private LocalDate remitteddate;
    @Column
    private String remittedamount;
    @Column
    private LocalDate confirmationdate;

    @Column
    private boolean isConfirmed;

    @ManyToOne
    @JoinColumn(name = "collectorid")
    @JsonBackReference("employee-collectionpaymenttransactions-reference")
    private Employee collector;


    public CollectionPaymentReceipt() {
    }

    public CollectionPaymentReceipt(int receiptid, String remarks, String paymenttype, PaymentTransaction paymenttransaction, Employee cashier, LocalDate collectiondate, String collectionamount, LocalDate remitteddate, String remittedamount, LocalDate confirmationdate, boolean isConfirmed, Employee collector) {
        super(receiptid, remarks, paymenttype, paymenttransaction/*, cashier*/);
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
