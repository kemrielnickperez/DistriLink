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

    private Distributor distributor;

    private Dealer dealer;

    private Employee collector;

    private Set<OrderedProduct> orderedproducts;

    private Set<PaymentTransaction> paymenttransactions;

    private boolean isconfirmed;

    private boolean isclosed;


    public Order() {
    }

    public Order(String orderid, LocalDate orderdate, LocalDate distributiondate, float penaltyrate, int paymentterms, double orderamount, Distributor distributor, Dealer dealer, Employee collector, Set<OrderedProduct> orderedproducts, Set<PaymentTransaction> paymenttransactions, boolean isconfirmed, boolean isclosed) {
        this.orderid = orderid;
        this.orderdate = orderdate;
        this.distributiondate = distributiondate;
        this.penaltyrate = penaltyrate;
        this.paymentterms = paymentterms;
        this.orderamount = orderamount;
        this.distributor = distributor;
        this.dealer = dealer;
        this.collector = collector;
        this.orderedproducts = orderedproducts;
        this.paymenttransactions = paymenttransactions;
        this.isconfirmed = isconfirmed;
        this.isclosed = isclosed;
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

    public Distributor getDistributor() {
        return distributor;
    }

    public void setDistributor(Distributor distributor) {
        this.distributor = distributor;
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

    public boolean getConfirmed() {
        return isconfirmed;
    }

    public void setConfirmed(boolean confirmed) {
        isconfirmed = confirmed;
    }

    public boolean isIsclosed() {
        return isclosed;
    }

    public void setIsclosed(boolean isclosed) {
        this.isclosed = isclosed;
    }
}
