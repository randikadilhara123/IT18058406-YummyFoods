package com.yummyfood.service;


import com.yummyfood.exception.DataNotFoundException;
import com.yummyfood.model.Comment;
import com.yummyfood.model.User;
import com.yummyfood.repository.CommentRepository;
import com.yummyfood.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;

    private final UserRepository userRepository;

    @Override
    public List<Comment> getAllComments() {
        List<Comment> comments = commentRepository.findAll();
        comments.forEach(comment -> {
            if (comment.getUserId() != null) {
                Optional<User> user = userRepository.findById(comment.getUserId());
                user.ifPresent(comment::setCommentedUser);
            }
        });
        return comments;
    }

    @Override
    public List<Comment> getCommentsByPostId(String postId) {
        List<Comment> comments = commentRepository.findAll();
        comments.forEach(comment -> {
            if (comment.getUserId() != null) {
                Optional<User> user = userRepository.findById(comment.getUserId());
                user.ifPresent(comment::setCommentedUser);
            }
        });
        return comments;
    }

    @Override
    public List<Comment> getCommentsByUserId(String userId) {
        return commentRepository.findByUserId(userId);
    }

    @Override
    public Comment getCommentById(String id, String userId) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Comment not found with id : " + id));
        if (!comment.getUserId().equals(userId)) {
            throw new DataNotFoundException("You are not authorized to access this comment.");
        }
        return comment;
    }

    @Override
    public Comment addComment(Comment comment) {
        comment.setCommentedTime(LocalDateTime.now());
        Comment newComment = commentRepository.save(comment);
        Optional<User> user = userRepository.findById(newComment.getUserId());
        user.ifPresent(comment::setCommentedUser);
        return newComment;
    }

    @Override
    public Comment updateComment(Comment comment) {
        Comment existingComment = commentRepository.findById(comment.getId())
                .orElseThrow(() -> new DataNotFoundException("Comment not found with id: " + comment.getId()));
        existingComment.setText(comment.getText());
        Comment updatedComment = commentRepository.save(existingComment);
        Optional<User> user = userRepository.findById(updatedComment.getUserId());
        user.ifPresent(updatedComment::setCommentedUser);
        return updatedComment;
    }

    @Override
    public void deleteComment(String id, String userId) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Comment not found with id: " + id));
        if (!comment.getUserId().equals(userId)) {
            throw new DataNotFoundException("You are not authorized to delete this comment.");
        }
        commentRepository.deleteById(id);
    }
}
