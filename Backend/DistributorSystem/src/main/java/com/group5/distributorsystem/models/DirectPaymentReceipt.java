package com.group5.distributorsystem.models;


import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.time.LocalDate;


@Entity
@DiscriminatorValue("direct")
public class DirectPaymentReceipt extends PaymentReceipt {

    @Column
    private LocalDate datepaid;

    @Column
    private double amountpaid;

    public DirectPaymentReceipt() {
    }


    public DirectPaymentReceipt(int receiptid, String remarks, String paymenttype, PaymentTransaction paymenttransaction, Employee cashier, LocalDate datepaid, double amountpaid) {
        super(receiptid, remarks, paymenttype, paymenttransaction/*, cashier*/);
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
