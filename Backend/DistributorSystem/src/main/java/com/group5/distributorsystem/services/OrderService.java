package com.group5.distributorsystem.services;

import com.group5.distributorsystem.models.*;
import com.group5.distributorsystem.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;
import java.util.Set;


@Service
public class OrderService {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderedProductService orderedProductService;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    OrderedProductRepository orderedProductRepository;

    @Autowired
    EmployeeRepository employeeRepository;

    public Order createOrder(Order order) {
        Order newOrder =  orderRepository.save(order);

        double orderamount=0;

        Set<OrderedProduct> newOrderedProducts = order.getOrderedProducts();

        for(OrderedProduct op :newOrderedProducts) {
            int productid = op.getProduct().getProductid();
            int quantity = op.getQuantity();


            Product product = productRepository.findById(productid).get();
            Order newOrder1 = orderRepository.findById(newOrder.getOrderid()).get();

            if(product != null){
                float price = product.getPrice();
                double subtotal = price *quantity;

                OrderedProduct newOrderedProduct = new OrderedProduct(-1, quantity, subtotal, product, newOrder);
                newOrderedProduct = orderedProductRepository.save(newOrderedProduct);
                orderamount += subtotal;

            }
            newOrder.setOrderamount(orderamount);
        }

        return orderRepository.save(newOrder);

       /* Order newOrder = orderRepository.save(order);

        int newOrderId = newOrder.getOrderid();

        Set<OrderedProduct> orderedProducts = newOrder.getOrderedProducts();

        double orderAmount = 0;

        if (orderedProducts != null) {
            for (OrderedProduct productInfo : orderedProducts) {
                int productId = productInfo.getProduct().getProductid();
                int quantity = productInfo.getQuantity();

                Product product = productRepository.findById(productId).orElse(null);

                if (product != null) {
                    double productPrice = product.getPrice();
                    double subTotal = productPrice * quantity;

                    OrderedProduct orderedProduct = new OrderedProduct(productId, quantity, subTotal, newOrderId);
                    newOrder.getOrderedProducts().add(orderedProduct); // Associate the OrderedProduct with the Order
                    orderamount += subTotal;
                } else {
                    orderamount = 20000;
                }
            }
        } else {
            orderAmount = 40000;
        }

        newOrder.setOrderamount(orderAmount);*/


    }


    public Iterable<Order> getAllOrders(){
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderByID(int orderid){
        return orderRepository.findById(orderid);
    }

    public ResponseEntity assignCollector(int orderid, Employee collector){
        Order order = orderRepository.findById(orderid).get();

        //Employee collector = employeeRepository.findById(collectorid).get();
        order.setCollector(collector);

        orderRepository.save(order);
        return new ResponseEntity("Collector assigned successfully", HttpStatus.OK);
    }

    public ResponseEntity removeCollector(int orderid){
        Order order = orderRepository.findById(orderid).get();

        order.setCollector(null);

        orderRepository.save(order);

        return new ResponseEntity("Collector removed successfully", HttpStatus.OK);

    }
}
