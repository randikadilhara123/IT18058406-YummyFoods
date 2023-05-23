package com.yummyfood.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Document(collection = "posts")
public class Post {

    @Id
    private String id;

    @Field(name = "userId")
    private String userId;

    @Field(name = "status")
    private Status status;

    @Field(name = "imageUrl")
    private List<String> imageUrl;

    @Field(name = "description")
    private String description;

    @Field(name = "price")
    private double price;


    private LocalDateTime postedTime;

    private User postedUser;

    @Transient
    private List<Comment> comments;

    @Transient
    private List <Like> likes;

}
