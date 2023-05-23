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
@Document(collection = "comments")
public class Comment {

    @Id
    private String id;

    private String postId;

    private String userId;

    private String text;

    private LocalDateTime commentedTime;

    private User commentedUser;

}
