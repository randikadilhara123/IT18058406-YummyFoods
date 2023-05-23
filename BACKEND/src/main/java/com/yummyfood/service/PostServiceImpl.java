package com.yummyfood.service;

import com.yummyfood.model.*;
import com.yummyfood.repository.CommentRepository;
import com.yummyfood.repository.LikeRepository;
import com.yummyfood.repository.PostRepository;
import com.yummyfood.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PostServiceImpl implements PostService {


    private final PostRepository postRepository;

    private final CommentRepository commentRepository;

    private final LikeRepository likeRepository;

    private final UserRepository userRepository;


    @Override
    public List<Post> getAllPosts() {
        List<Post> posts = postRepository.findAll();
        posts.forEach(this::mapValuesToPost);
        return posts;
    }

    @Override
    public Optional<Post> getPostById(String postId) {
        Optional<Post> post = postRepository.findById(postId);
        post.ifPresent(this::mapValuesToPost);
        return post;
    }

    @Override
    public Post createPost(Post post) {
        post.setPostedTime(LocalDateTime.now());
        if (post.getStatus() == null) {
            post.setStatus(Status.PENDING);
        }
        return postRepository.save(post);
    }

    @Override
    public Post updatePost(Post post) {
        return postRepository.save(post);
    }

    @Override
    public void deletePostById(String postId) {
        postRepository.deleteById(postId);
    }

    private void mapValuesToPost(Post post) {
        List<Comment> comments = commentRepository.findByPostId(post.getId());
        if (comments != null) {
            post.setComments(comments);
            comments.forEach(comment -> {
                Optional<User> user = userRepository.findById(comment.getUserId());
                user.ifPresent(comment::setCommentedUser);
            });
        }
        List<Like> likes = likeRepository.findByPostId(post.getId());
        if (comments != null) {
            post.setLikes(likes);
        }
        if (post.getUserId() != null) {
            Optional<User> user = userRepository.findById(post.getId());
            user.ifPresent(post::setPostedUser);
        }
    }

}
