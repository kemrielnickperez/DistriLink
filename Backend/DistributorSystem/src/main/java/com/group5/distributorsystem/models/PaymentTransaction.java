package com.group5.distributorsystem.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "payment_transactions")
public class PaymentTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int paymenttransactionid;

    @Column
    private double amountdue;

    @Column
    private LocalDate startingdate;

    @Column
    private LocalDate enddate;

    @Column
    private int installmentnumber;

    @ManyToOne
    @JoinColumn(name = "orderid", nullable = true)
    @JsonIgnore
    private Order order;

    public PaymentTransaction() {
    }

    public PaymentTransaction(int paymenttransactionid, double amountdue, LocalDate startingdate, LocalDate enddate, int installmentnumber, Order order) {
        this.paymenttransactionid = paymenttransactionid;
        this.amountdue = amountdue;
        this.startingdate = startingdate;
        this.enddate = enddate;
        this.installmentnumber = installmentnumber;
        this.order = order;
    }

    public int getPaymenttransactionid() {
        return paymenttransactionid;
    }

    public void setPaymenttransactionid(int paymenttransactionid) {
        this.paymenttransactionid = paymenttransactionid;
    }

    public double getAmountdue() {
        return amountdue;
    }

    public void setAmountdue(double amountdue) {
        this.amountdue = amountdue;
    }

    public LocalDate getStartingdate() {
        return startingdate;
    }

    public void setStartingdate(LocalDate startingdate) {
        this.startingdate = startingdate;
    }

    public LocalDate getEnddate() {
        return enddate;
    }

    public void setEnddate(LocalDate enddate) {
        this.enddate = enddate;
    }

    public int getInstallmentnumber() {
        return installmentnumber;
    }

    public void setInstallmentnumber(int installmentnumber) {
        this.installmentnumber = installmentnumber;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }


}
