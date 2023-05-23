package com.yummyfood.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Document(collection = "orders")
public class Order {

    @Id
    private String id;

    private String postId;

    private String userId;

    private double quantity;

    private double price;

    private double total;

    private Status orderStatus;

    private LocalDateTime createdTime;
}
