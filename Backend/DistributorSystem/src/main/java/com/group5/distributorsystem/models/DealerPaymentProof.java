package com.group5.distributorsystem.models;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("DealerPaymentProofs")
public class DealerPaymentProof {

    @Id
    private String dealerpaymentproofid;
    private String name;
    private String type;
    private byte[] content;

    private CollectionPaymentReceipt collectionPaymentReceipt;

    public DealerPaymentProof() {
    }

    public DealerPaymentProof(String dealerpaymentproofid, String name, String type, byte[] content, CollectionPaymentReceipt collectionPaymentReceipt) {
        this.dealerpaymentproofid = dealerpaymentproofid;
        this.name = name;
        this.type = type;
        this.content = content;
        this.collectionPaymentReceipt = collectionPaymentReceipt;
    }

    public String getDealerpaymentproofid() {
        return dealerpaymentproofid;
    }

    public void setDealerpaymentproofid(String dealerpaymentproofid) {
        this.dealerpaymentproofid = dealerpaymentproofid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public byte[] getContent() {
        return content;
    }

    public void setContent(byte[] content) {
        this.content = content;
    }

    public CollectionPaymentReceipt getCollectionPaymentReceipt() {
        return collectionPaymentReceipt;
    }

    public void setCollectionPaymentReceipt(CollectionPaymentReceipt collectionPaymentReceipt) {
        this.collectionPaymentReceipt = collectionPaymentReceipt;
    }
}
