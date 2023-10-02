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

    private String paymenttype;

    //@DBRef
    private PaymentTransaction paymenttransaction;

    private Employee cashier;

    //comment sani kay murag nagdala og panganib
   /* @ManyToOne
    @JoinColumn(name = "cashierid")
    @JsonBackReference("employee-paymentreceipts-reference")
    private Employee cashier;*/

    public PaymentReceipt() {
    }

    public PaymentReceipt(String paymentreceiptid, String remarks, String paymenttype, PaymentTransaction paymenttransaction, Employee cashier) {
        this.paymentreceiptid = paymentreceiptid;
        this.remarks = remarks;
        this.paymenttype = paymenttype;
        this.paymenttransaction = paymenttransaction;
        this.cashier = cashier;
    }

    public String getPaymentreceiptid() {
        return paymentreceiptid;
    }

    public void setPaymentreceiptid(String paymentreceiptid) {
        this.paymentreceiptid = paymentreceiptid;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getPaymenttype() {
        return paymenttype;
    }

    public void setPaymenttype(String paymenttype) {
        this.paymenttype = paymenttype;
    }

    public PaymentTransaction getPaymenttransaction() {
        return paymenttransaction;
    }

    public void setPaymenttransaction(PaymentTransaction paymenttransaction) {
        this.paymenttransaction = paymenttransaction;
    }

    public Employee getCashier() {
        return cashier;
    }

    public void setCashier(Employee cashier) {
        this.cashier = cashier;
    }
}
