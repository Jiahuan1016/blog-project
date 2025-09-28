package com.example.blog.controller;

import com.example.blog.model.Comment;
import com.example.blog.model.User;
import com.example.blog.service.CommentService;
import com.example.blog.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comment")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")

public class CommentController {

    @Autowired
    private CommentService commentService;
    @Autowired
    private UserService userService;


    @PostMapping("/add")
    public ResponseEntity<String> addComment(@RequestParam Long articleId,
                                             @AuthenticationPrincipal UserDetails userDetails,
                                             @RequestParam String content) {
        User user = userService.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Long userId = user.getId();

        commentService.addComment(articleId, userId, content);

        return ResponseEntity.ok("Comment added successfully.");
    }

    @GetMapping("/article/{id}")
    public List<Comment> getCommentsByArticle(@PathVariable("id") Long articleId) {
        return commentService.getCommentsByArticle(articleId);
    }


    @GetMapping("/user/{id}")
    public List<Comment> getCommentsByUser(@PathVariable("id") Long userId) {
        return commentService.getCommentsByUser(userId);
    }
}
