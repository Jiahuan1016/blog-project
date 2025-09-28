package com.example.blog.service;
import com.example.blog.model.Article;
import com.example.blog.model.User;
import com.example.blog.repository.ArticleRepository;
import com.example.blog.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ArticleService {
    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;
    public ArticleService(ArticleRepository articleRepository, UserRepository userRepository) {
        this.articleRepository = articleRepository;
        this.userRepository = userRepository;
    }
    public Article createArticle(String title, String content, Long userId) {
        User author = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Article article = new Article(title, content, LocalDateTime.now(), author);
        return articleRepository.save(article);
    }
    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }
    public void deleteArticle(Long articleId) {
        if (!articleRepository.existsById(articleId)) {
            throw new RuntimeException("Article not found");
        }
        articleRepository.deleteById(articleId);
    }
    public Article getArticleById(Long id) {
        return articleRepository.findById(id).orElse(null);
    }
    public Article updateArticle(Long id, String title, String content, Long userId) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found"));
        article.setTitle(title);
        article.setContent(content);
        article.setAuthor(userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found")));
        return articleRepository.save(article);
    }

}
