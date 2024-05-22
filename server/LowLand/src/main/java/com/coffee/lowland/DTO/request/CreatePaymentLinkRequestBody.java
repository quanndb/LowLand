package com.coffee.lowland.DTO.request;

import com.lib.payos.type.ItemData;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
public class CreatePaymentLinkRequestBody {
  private int price;
  private String description;
  private String returnUrl;
  private String cancelUrl;
  private List<ItemData> items;
}