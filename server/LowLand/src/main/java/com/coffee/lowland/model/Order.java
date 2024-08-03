package com.coffee.lowland.model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "`order`")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String orderId;
    int orderCode;
    String accountId;
    String customerName;
    String phoneNumber;
    String address;
    int status;
    String createdBy;
    LocalDateTime createdDate;
    String updatedBy;
    LocalDateTime updatedDate;
    String paymentLink;
    String note;
    String message;
}
