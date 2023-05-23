package com.yummyfood.controller;


import com.yummyfood.model.Comment;
import com.yummyfood.service.CommentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    @GetMapping("/post/{postId}")
    public List<Comment> getCommentsByPostId(@PathVariable String postId) {
        return commentService.getCommentsByPostId(postId);
    }

    @GetMapping("/user/{userId}")
    public List<Comment> getCommentsByUserId(@PathVariable String userId) {
        return commentService.getCommentsByUserId(userId);
    }


    @PostMapping("/")
    public ResponseEntity<Comment> addComment(@Valid @RequestBody Comment comment) {
        Comment savedComment = commentService.addComment(comment);
        return new ResponseEntity<>(savedComment, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public Comment updateComment(@PathVariable String id, @Valid @RequestBody Comment comment) {
        comment.setId(id);
        return commentService.updateComment(comment);
    }

    @DeleteMapping("/{id}/{userId}")
    public ResponseEntity<Map<String, String>> deleteComment(@PathVariable String id, @PathVariable String userId) {
        commentService.deleteComment(id, userId);
        Map<String, String> response = new HashMap<>();
        response.put("response", "success");
        return ResponseEntity.ok(response);
    }

}
