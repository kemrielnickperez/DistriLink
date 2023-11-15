package com.group5.distributorsystem.models;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("DealerDocuments")
public class DealerDocument {

    @Id
    private String documentid;
    private String name;
    private String type;
    private byte[] content;


    private Dealer dealer;

    public DealerDocument() {
    }

    public DealerDocument(String documentid, String name, String type, byte[] content, Dealer dealer) {
        this.documentid = documentid;
        this.name = name;
        this.type = type;
        this.content = content;
        this.dealer = dealer;
    }

    public String getDocumentid() {
        return documentid;
    }

    public void setDocumentid(String documentid) {
        this.documentid = documentid;
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

    public Dealer getDealer() {
        return dealer;
    }

    public void setDealer(Dealer dealer) {
        this.dealer = dealer;
    }
}
