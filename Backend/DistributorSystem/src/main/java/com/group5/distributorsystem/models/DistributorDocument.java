package com.group5.distributorsystem.models;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("DistributorDocuments")
public class DistributorDocument {

    @Id
    private String documentid;
    private String name;
    private String type;
    private byte[] content;


    private Distributor distributor;

    public DistributorDocument() {
    }

    public DistributorDocument(String documentid, String name, String type, byte[] content, Distributor distributor) {
        this.documentid = documentid;
        this.name = name;
        this.type = type;
        this.content = content;
        this.distributor = distributor;
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

    public Distributor getDistributor() {
        return distributor;
    }

    public void setDistributor(Distributor distributor) {
        this.distributor = distributor;
    }
}
