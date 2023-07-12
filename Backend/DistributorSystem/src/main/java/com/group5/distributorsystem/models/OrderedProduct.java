package com.group5.distributorsystem.models;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

@Entity
@Table(name = "ordered_products")
public class OrderedProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderedproductid;

    @Column
    private int quantity;

    @Column
    private double subtotal;

    @ManyToOne
    @JoinColumn(name = "productid", nullable = false)
    private Product product;

    @ManyToOne
    @JoinColumn(name = "orderid", nullable = true)
    @JsonBackReference
    private Order order;

    public OrderedProduct() {
    }

    public OrderedProduct(int orderedproductid, int quantity, double subtotal, Product product, Order order) {
        this.orderedproductid = orderedproductid;
        this.quantity = quantity;
        this.subtotal = subtotal;
        this.product = product;
        this.order = order;
    }

    public OrderedProduct(int productid, int quantity, double subTotal, int newOrderId) {
    }

    public int getOrderedproductid() {
        return orderedproductid;
    }

    public void setOrderedproductid(int orderedproductid) {
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

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }
}
