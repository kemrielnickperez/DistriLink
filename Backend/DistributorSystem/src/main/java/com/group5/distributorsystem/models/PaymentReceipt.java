package com.group5.distributorsystem.models;


import org.bson.types.ObjectId;
import org.springframework.data.annotation.*;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;



@Document("PaymentReceipts")
public class PaymentReceipt {

    @Id
    private String paymentreceiptid;

    private String remarks;

    private double amountpaid;

    private String paymenttype;

    //@DBRef
    private PaymentTransaction paymenttransaction;

    private PaymentReceiver receiver;

    //comment sani kay murag nagdala og panganib
   /* @ManyToOne
    @JoinColumn(name = "cashierid")
    @JsonBackReference("employee-paymentreceipts-reference")
    private Employee cashier;*/
    public PaymentReceipt(){}
    public PaymentReceipt(String paymentreceiptid, String remarks, double amountpaid, String paymenttype, PaymentTransaction paymenttransaction, PaymentReceiver receiver) {
        this.paymentreceiptid = paymentreceiptid;
        this.remarks = remarks;
        this.amountpaid = amountpaid;
        this.paymenttype = paymenttype;
        this.paymenttransaction = paymenttransaction;
        this.receiver = receiver;
    }

    public void setPaymentreceiptid(String paymentreceiptid) {
        this.paymentreceiptid = paymentreceiptid;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public void setAmountpaid(double amountpaid) {
        this.amountpaid = amountpaid;
    }

    public void setPaymenttype(String paymenttype) {
        this.paymenttype = paymenttype;
    }

    public void setPaymenttransaction(PaymentTransaction paymenttransaction) {
        this.paymenttransaction = paymenttransaction;
    }

    public void setReceiver(PaymentReceiver receiver) {
        this.receiver = receiver;
    }

    public String getPaymentreceiptid() {
        return paymentreceiptid;
    }

    public String getRemarks() {
        return remarks;
    }

    public double getAmountpaid() {
        return amountpaid;
    }

    public String getPaymenttype() {
        return paymenttype;
    }

    public PaymentTransaction getPaymenttransaction() {
        return paymenttransaction;
    }

    public PaymentReceiver getReceiver() {
        return receiver;
    }
}
