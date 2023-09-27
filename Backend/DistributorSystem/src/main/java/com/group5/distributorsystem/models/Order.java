package com.group5.distributorsystem.models;



import org.bson.types.ObjectId;
import org.springframework.data.annotation.*;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;


@Document("Orders")
public class Order {

    @Id
    private String orderid;

    private LocalDate orderdate;

    private LocalDate distributiondate;

    private float penaltyrate;

    private int paymentterms;

    private double orderamount;


    private Dealer dealer;


    private Employee collector;

    private Set<OrderedProduct> orderedproducts;

    private Set<PaymentTransaction> paymenttransactions;



    //private Set<PaymentTransaction> paymentTransactions;


   /* @OneToMany(mappedBy = "order")
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
    private Employee collector;*/

    public Order() {
    }

    public Order(String orderid, LocalDate orderdate, LocalDate distributiondate, float penaltyrate, int paymentterms, double orderamount, Dealer dealer, Employee collector, Set<OrderedProduct> orderedproducts, Set<PaymentTransaction> paymenttransactions) {
        this.orderid = orderid;
        this.orderdate = orderdate;
        this.distributiondate = distributiondate;
        this.penaltyrate = penaltyrate;
        this.paymentterms = paymentterms;
        this.orderamount = orderamount;
        this.dealer = dealer;
        this.collector = collector;
        this.orderedproducts = orderedproducts;
        this.paymenttransactions = paymenttransactions;
    }

    public String getOrderid() {
        return orderid;
    }

    public void setOrderid(String orderid) {
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

    public Employee getCollector() {
        return collector;
    }

    public void setCollector(Employee collector) {
        this.collector = collector;
    }

    public Set<OrderedProduct> getOrderedproducts() {
        return orderedproducts;
    }

    public void setOrderedproducts(Set<OrderedProduct> orderedproducts) {
        this.orderedproducts = orderedproducts;
    }

    public Set<PaymentTransaction> getPaymenttransactions() {
        return paymenttransactions;
    }

    public void setPaymenttransactions(Set<PaymentTransaction> paymenttransactions) {
        this.paymenttransactions = paymenttransactions;
    }
}
