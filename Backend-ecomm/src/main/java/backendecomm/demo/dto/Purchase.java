package backendecomm.demo.dto;

import backendecomm.demo.entities.Address;
import backendecomm.demo.entities.Customer;
import backendecomm.demo.entities.Order;
import backendecomm.demo.entities.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {
    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}

