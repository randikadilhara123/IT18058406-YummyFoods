package com.yummyfood.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Document(collection = "users")
public class User {
    @Id
    private String id;

    @Field(name = "name")
    private String name;

    @Email
    @Indexed(unique = true)
    @Field(name = "email")
    private String email;

    @Field(name = "imageUrl")
    private String imageUrl;

    @Field(name = "emailVerified")
    private Boolean emailVerified = false;

    @Field(name = "password")
    private String password;

    @NotNull
    @Indexed
    @Field(name = "provider")
    private AuthProvider provider;

    @Field(name = "providerId")
    private String providerId;

    @Field(name = "role")
    private String role;
}
