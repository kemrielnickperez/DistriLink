package com.group5.distributorsystem.models;


import org.bson.types.ObjectId;
import org.springframework.data.annotation.*;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;



@Document("OrderedProducts")
public class OrderedProduct {

    @Id
    private String orderedproductid;


    private int quantity;


    private double subtotal;

/*    @ManyToOne
    @JoinColumn(name = "productid", nullable = false)
    private Product product;

    @ManyToOne
    @JoinColumn(name = "orderid", nullable = true)
    @JsonBackReference("order-orderedproducts-reference")
    private Order order;*/


    //@DBRef
    private Product product;


    //@DBRef
    private String orderid;

    public OrderedProduct() {
    }

    public OrderedProduct(String orderedproductid, int quantity, double subtotal, Product product, String orderid) {
        this.orderedproductid = orderedproductid;
        this.quantity = quantity;
        this.subtotal = subtotal;
        this.product = product;
        this.orderid = orderid;
    }

    public String getOrderedproductid() {
        return orderedproductid;
    }

    public void setOrderedproductid(String orderedproductid) {
        this.orderedproductid = orderedproductid;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(double subtotal) {
        this.subtotal = subtotal;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public String getOrderid() {
        return orderid;
    }

    public void setOrderid(String orderid) {
        this.orderid = orderid;
    }
}
