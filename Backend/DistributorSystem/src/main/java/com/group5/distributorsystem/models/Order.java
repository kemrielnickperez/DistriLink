package com.group5.distributorsystem.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "orders")
public class Order {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderid;

    @Column
    private LocalDate orderdate;

    @Column
    private LocalDate distributiondate;

    @Column
    private float penaltyrate;

    @Column
    private int paymentterms;

    @Column
    private double orderamount;

    @OneToMany(mappedBy = "order")
    @JsonManagedReference("order-orderedproducts-reference")
    private Set<OrderedProduct> orderedProducts;


    @OneToMany(mappedBy = "order")
    @JsonManagedReference("order-paymenttransactions-reference")
    private Set<PaymentTransaction> paymentTransactions;


    @ManyToOne
    @JoinColumn(name = "dealerid", nullable = false)
    private Dealer dealer;

    @ManyToOne
    @JoinColumn(name = "collectorid", nullable = true)
    //@JsonManagedReference("order-employee-reference")
    private Employee collector;


    public Order() {
    }

    public Order(int orderid, LocalDate orderdate, LocalDate distributiondate, float penaltyrate, int paymentterms, double orderamount, Set<OrderedProduct> orderedProducts, Set<PaymentTransaction> paymentTransactions, Dealer dealer, Employee collector) {
        this.orderid = orderid;
        this.orderdate = orderdate;
        this.distributiondate = distributiondate;
        this.penaltyrate = penaltyrate;
        this.paymentterms = paymentterms;
        this.orderamount = orderamount;
        this.orderedProducts = orderedProducts;
        this.paymentTransactions = paymentTransactions;
        this.dealer = dealer;
        this.collector = collector;
    }

    public Order(LocalDate orderdate, LocalDate distributiondate, float penaltyrate, String paymentterms, Dealer dealer, Employee collector) {
    }

    public int getOrderid() {
        return orderid;
    }

    public void setOrderid(int orderid) {
        this.orderid = orderid;
    }

    public LocalDate getOrderdate() {
        return orderdate;
    }

    public void setOrderdate(LocalDate orderdate) {
        this.orderdate = orderdate;
    }

    public LocalDate getDistributiondate() {
        return distributiondate;
    }

    public void setDistributiondate(LocalDate distributiondate) {
        this.distributiondate = distributiondate;
    }

    public float getPenaltyrate() {
        return penaltyrate;
    }

    public void setPenaltyrate(float penaltyrate) {
        this.penaltyrate = penaltyrate;
    }

    public int getPaymentterms() {
        return paymentterms;
    }

    public void setPaymentterms(int paymentterms) {
        this.paymentterms = paymentterms;
    }

    public double getOrderamount() {
        return orderamount;
    }

    public void setOrderamount(double orderamount) {
        this.orderamount = orderamount;
    }

    public Dealer getDealer() {
        return dealer;
    }

    public void setDealer(Dealer dealer) {
        this.dealer = dealer;
    }

    public Set<OrderedProduct> getOrderedProducts() {
        return orderedProducts;
    }

    public void setOrderedProducts(Set<OrderedProduct> orderedProducts) {
        this.orderedProducts = orderedProducts;
    }

    public Employee getCollector() {
        return collector;
    }

    public void setCollector(Employee collector) {
        this.collector = collector;
    }

    public Set<PaymentTransaction> getPaymentTransactions() {
        return paymentTransactions;
    }

    public void setPaymentTransactions(Set<PaymentTransaction> paymentTransactions) {
        this.paymentTransactions = paymentTransactions;
    }
}
