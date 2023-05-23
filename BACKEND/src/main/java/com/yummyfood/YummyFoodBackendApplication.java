package com.yummyfood;

import com.yummyfood.config.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class YummyFoodBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(YummyFoodBackendApplication.class, args);
    }

}
