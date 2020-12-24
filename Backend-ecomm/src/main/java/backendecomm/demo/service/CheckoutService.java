package backendecomm.demo.service;

import backendecomm.demo.dto.Purchase;
import backendecomm.demo.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
