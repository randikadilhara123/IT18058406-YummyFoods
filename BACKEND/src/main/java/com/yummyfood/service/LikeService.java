package com.yummyfood.service;


import com.yummyfood.model.Like;

public interface LikeService {
    void addLike(Like like);

    void removeLikeById(String likeId);
}
