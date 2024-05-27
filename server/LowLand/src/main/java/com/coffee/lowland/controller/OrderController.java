//package com.coffee.lowland.controller;
//
//import com.coffee.lowland.DTO.request.CreatePaymentLinkRequestBody;
//import com.fasterxml.jackson.databind.JsonNode;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.fasterxml.jackson.databind.node.ObjectNode;
//import com.lib.payos.PayOS;
//import com.lib.payos.type.ItemData;
//import com.lib.payos.type.PaymentData;
//
//import org.springframework.web.bind.annotation.*;
//
//import java.util.ArrayList;
//import java.util.Date;
//import java.util.List;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/order")
//public class OrderController {
//    private final PayOS payOS;
//
//    public OrderController(PayOS payOS) {
//        super();
//        this.payOS = payOS;
//    }
//
//    @PostMapping(path = "/create")
//    public ObjectNode createPaymentLink(@RequestBody CreatePaymentLinkRequestBody RequestBody) {
//        ObjectMapper objectMapper = new ObjectMapper();
//        try {
//            final List<ItemData> items = RequestBody.getItems();
//            final String description = RequestBody.getDescription();
//            final String returnUrl = RequestBody.getReturnUrl();
//            final String cancelUrl = RequestBody.getCancelUrl();
//            final int price = RequestBody.getPrice();
//            //Gen order code
//            String currentTimeString = String.valueOf(String.valueOf(new Date().getTime()));
//            int orderCode =
//                    Integer.parseInt(currentTimeString.substring(currentTimeString.length() - 6));
//
//            PaymentData paymentData = new PaymentData(orderCode, price, description,
//                    items, cancelUrl, returnUrl);
//
//            JsonNode data = payOS.createPaymentLink(paymentData);
//
//            ObjectNode respon = objectMapper.createObjectNode();
//            respon.put("error", 0);
//            respon.put("message", "success");
//            respon.set("data", data);
//            return respon;
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            ObjectNode respon = objectMapper.createObjectNode();
//            respon.put("error", -1);
//            respon.put("message", "fail");
//            respon.set("data", null);
//            return respon;
//
//        }
//    }
//
//
//    @GetMapping(path = "/{orderId}")
//    public ObjectNode getOrderById(@PathVariable("orderId") int orderId) {
//        ObjectMapper objectMapper = new ObjectMapper();
//        ObjectNode respon = objectMapper.createObjectNode();
//
//        try {
//            JsonNode order = payOS.getPaymentLinkInfomation(orderId);
//
//            respon.set("data", order);
//            respon.put("error", 0);
//            respon.put("message", "ok");
//            return respon;
//        } catch (Exception e) {
//            e.printStackTrace();
//            respon.put("error", -1);
//            respon.put("message", e.getMessage());
//            respon.set("data", null);
//            return respon;
//        }
//    }
//
//    @PutMapping(path = "/{orderId}")
//    public ObjectNode cancelOrder(@PathVariable("orderId") int orderId) {
//        ObjectMapper objectMapper = new ObjectMapper();
//        ObjectNode respon = objectMapper.createObjectNode();
//        try {
//            JsonNode order = payOS.cancelPaymentLink(orderId, null);
//            respon.set("data", order);
//            respon.put("error", 0);
//            respon.put("message", "ok");
//            return respon;
//        } catch (Exception e) {
//            e.printStackTrace();
//            respon.put("error", -1);
//            respon.put("message", e.getMessage());
//            respon.set("data", null);
//            return respon;
//        }
//
//    }
//    private String formatterDateTimeFromArray(JsonNode dateTimeArray) {
//        int year = dateTimeArray.get(0).asInt();
//        int month = dateTimeArray.get(1).asInt();
//        int day = dateTimeArray.get(2).asInt();
//        int hour = dateTimeArray.get(3).asInt();
//        int minute = dateTimeArray.get(4).asInt();
//        int second = dateTimeArray.get(5).asInt();
//
//        return String.format("%04d-%02d-%02d %02d:%02d:%02d", year, month, day, hour, minute, second);
//    }
//}
