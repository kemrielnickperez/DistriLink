package com.group5.distributorsystem.models;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("CollectorRemittanceProofs")
public class CollectorRemittanceProof {

    @Id
    private String collectorremittanceproofid;
    private String name;
    private String type;
    private byte[] content;

    private CollectionPaymentReceipt collectionPaymentReceipt;

    public CollectorRemittanceProof() {
    }


    public CollectorRemittanceProof(String collectorremittanceproofid, String name, String type, byte[] content, CollectionPaymentReceipt collectionPaymentReceipt) {
        this.collectorremittanceproofid = collectorremittanceproofid;
        this.name = name;
        this.type = type;
        this.content = content;
        this.collectionPaymentReceipt = collectionPaymentReceipt;
    }

    public String getCollectorremittanceproofid() {
        return collectorremittanceproofid;
    }

    public void setCollectorremittanceproofid(String collectorremittanceproofid) {
        this.collectorremittanceproofid = collectorremittanceproofid;
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
