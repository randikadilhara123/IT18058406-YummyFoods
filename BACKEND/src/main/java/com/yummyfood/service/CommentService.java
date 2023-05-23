package com.yummyfood.service;


import com.yummyfood.model.Comment;

import java.util.List;


public interface CommentService {

    List<Comment> getAllComments();

    List<Comment> getCommentsByPostId(String postId);

    List<Comment> getCommentsByUserId(String userId);

    Comment getCommentById(String id, String userId);

    Comment addComment(Comment comment);

    Comment updateComment(Comment comment);

    void deleteComment(String id, String userId);
}
