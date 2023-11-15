package com.group5.distributorsystem.models;


import org.bson.types.ObjectId;
import org.springframework.data.annotation.*;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;


public class CollectionPaymentReceipt extends PaymentReceipt {

    private LocalDate collectiondate;

    private double collectionamount;

    private LocalDate remitteddate;

    private double remittedamount;

    private LocalDate confirmationdate;

    private boolean isconfirmed;

    private Set<String> collectorremittanceproofids = new HashSet<>();

    private Set<String> dealerpaymentproofids = new HashSet<>();

    public CollectionPaymentReceipt() {
    }

    public CollectionPaymentReceipt(LocalDate collectiondate, double collectionamount, LocalDate remitteddate, double remittedamount, LocalDate confirmationdate, boolean isconfirmed, Set<String> collectorremittanceproofids, Set<String> dealerpaymentproofids) {
        this.collectiondate = collectiondate;
        this.collectionamount = collectionamount;
        this.remitteddate = remitteddate;
        this.remittedamount = remittedamount;
        this.confirmationdate = confirmationdate;
        this.isconfirmed = isconfirmed;
        this.collectorremittanceproofids = collectorremittanceproofids;
        this.dealerpaymentproofids = dealerpaymentproofids;
    }

    public CollectionPaymentReceipt(String paymentreceiptid, String remarks, double amountpaid, String paymenttype, PaymentTransaction paymenttransaction, Employee cashier, LocalDate collectiondate, double collectionamount, LocalDate remitteddate, double remittedamount, LocalDate confirmationdate, boolean isconfirmed, Set<String> collectorremittanceproofids, Set<String> dealerpaymentproofids) {
        super(paymentreceiptid, remarks, amountpaid, paymenttype, paymenttransaction, cashier);
        this.collectiondate = collectiondate;
        this.collectionamount = collectionamount;
        this.remitteddate = remitteddate;
        this.remittedamount = remittedamount;
        this.confirmationdate = confirmationdate;
        this.isconfirmed = isconfirmed;
        this.collectorremittanceproofids = collectorremittanceproofids;
        this.dealerpaymentproofids = dealerpaymentproofids;
    }

    public LocalDate getCollectiondate() {
        return collectiondate;
    }

    public void setCollectiondate(LocalDate collectiondate) {
        this.collectiondate = collectiondate;
    }

    public double getCollectionamount() {
        return collectionamount;
    }

    public void setCollectionamount(double collectionamount) {
        this.collectionamount = collectionamount;
    }

    public LocalDate getRemitteddate() {
        return remitteddate;
    }

    public void setRemitteddate(LocalDate remitteddate) {
        this.remitteddate = remitteddate;
    }

    public double getRemittedamount() {
        return remittedamount;
    }

    public void setRemittedamount(double remittedamount) {
        this.remittedamount = remittedamount;
    }

    public LocalDate getConfirmationdate() {
        return confirmationdate;
    }

    public void setConfirmationdate(LocalDate confirmationdate) {
        this.confirmationdate = confirmationdate;
    }

    public boolean isIsconfirmed() {
        return isconfirmed;
    }

    public void setIsconfirmed(boolean isconfirmed) {
        this.isconfirmed = isconfirmed;
    }

    public Set<String> getCollectorremittanceproofids() {
        return collectorremittanceproofids;
    }

    public void setCollectorremittanceproofids(Set<String> collectorremittanceproofids) {
        this.collectorremittanceproofids = collectorremittanceproofids;
    }

    public Set<String> getDealerpaymentproofids() {
        return dealerpaymentproofids;
    }

    public void setDealerpaymentproofids(Set<String> dealerpaymentproofids) {
        this.dealerpaymentproofids = dealerpaymentproofids;
    }
}
