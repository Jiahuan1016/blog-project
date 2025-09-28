package com.example.blog.service;

import com.example.blog.model.Comment;
import com.example.blog.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public String addComment(Long articleId, Long userId, String content) {
        Comment comment = new Comment();
        comment.setArticleId(articleId);
        comment.setUserId(userId);
        comment.setContent(content);
        commentRepository.save(comment);
        return "success";
    }


    public List<Comment> getCommentsByArticle(Long articleId) {
        return commentRepository.findByArticleId(articleId);
    }


    public List<Comment> getCommentsByUser(Long userId) {
        return commentRepository.findByUserId(userId);
    }
}