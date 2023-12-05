package com.group5.distributorsystem.models;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("PaymentReceipts")
public class PaymentReceipt {

    @Id
    private String paymentreceiptid;

    private String remarks;

    private double amountpaid;

    private String paymenttype;

    private String paymenttransactionid;

   /* private PaymentReceiver paymentReceiver;*/

    private String receiverID; // Generic identifier for either Distributor or Employee
    private String receivername;

    //comment sani kay murag nagdala og panganib
   /* @ManyToOne
    @JoinColumn(name = "cashierid")
    @JsonBackReference("employee-paymentreceipts-reference")
    private Employee cashier;*/
    public PaymentReceipt(){}

    public PaymentReceipt(String paymentreceiptid, String remarks, double amountpaid, String paymenttype, String paymenttransactionid, String receiverID, String receivername) {
        this.paymentreceiptid = paymentreceiptid;
        this.remarks = remarks;
        this.amountpaid = amountpaid;
        this.paymenttype = paymenttype;
        this.paymenttransactionid = paymenttransactionid;
        this.receiverID = receiverID;
        this.receivername = receivername;
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

    public double getAmountpaid() {
        return amountpaid;
    }

    public void setAmountpaid(double amountpaid) {
        this.amountpaid = amountpaid;
    }

    public String getPaymenttype() {
        return paymenttype;
    }

    public void setPaymenttype(String paymenttype) {
        this.paymenttype = paymenttype;
    }

    public String getPaymenttransactionid() {
        return paymenttransactionid;
    }

    public void setPaymenttransactionid(String paymenttransactionid) {
        this.paymenttransactionid = paymenttransactionid;
    }

    public String getReceiverID() {
        return receiverID;
    }

    public void setReceiverID(String receiverID) {
        this.receiverID = receiverID;
    }

    public String getReceivername() {
        return receivername;
    }

    public void setReceivername(String receivername) {
        this.receivername = receivername;
    }
}
