package com.yummyfood.service;

import com.yummyfood.model.Order;
import com.yummyfood.model.Status;
import com.yummyfood.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Order getOrderById(String id) {
        return orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
    }

    @Override
    public Order createOrder(Order order) {
        order.setOrderStatus(Status.PENDING);
        return orderRepository.save(order);
    }

    @Override
    public Order updateOrder(String id, Order updatedOrder) {
        Order order = getOrderById(id);
        order.setUserId(updatedOrder.getUserId());
        order.setQuantity(updatedOrder.getQuantity());
        order.setPrice(updatedOrder.getPrice());
        order.setTotal(updatedOrder.getTotal());
        order.setOrderStatus(updatedOrder.getOrderStatus());
        order.setCreatedTime(updatedOrder.getCreatedTime());
        return orderRepository.save(order);
    }

    @Override
    public void deleteOrder(String id) {
        Order order = getOrderById(id);
        orderRepository.delete(order);
    }

    @Override
    public Order approveOrder(String id) {
        Optional<Order> order = orderRepository.findById(id);
        if (order.isPresent()) {
            order.get().setOrderStatus(Status.APPROVED);
            orderRepository.save(order.get());
            return order.get();
        }
        return new Order();
    }
}
