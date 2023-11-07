package com.group5.distributorsystem.models;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("EmployeeDocuments")
public class EmployeeDocument {

    @Id
    private String documentid;
    private String name;
    private String type;
    private byte[] content;

    private Employee employee;

    public EmployeeDocument() {
    }

    public EmployeeDocument(String documentid, String name, String type, byte[] content, Employee employee) {
        this.documentid = documentid;
        this.name = name;
        this.type = type;
        this.content = content;
        this.employee = employee;
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

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}
