package com.example.blog.controller;
import com.example.blog.model.Article;
import com.example.blog.service.ArticleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/articles")
public class ArticleController {
    private final ArticleService articleService;
    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }
    @PostMapping
    public Article create(@RequestBody Map<String, String> body) {
        String title = body.get("title");
        String content = body.get("content");
        Long userId = Long.parseLong(body.get("userId"));
        return articleService.createArticle(title, content, userId);
    }
    @GetMapping
    public List<Map<String, Object>> getAllArticles() {
        List<Article> articles = articleService.getAllArticles();

        return articles.stream().map(article -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", article.getId());
            map.put("title", article.getTitle());
            map.put("content", article.getContent());
            map.put("createdAt", article.getCreatedAt().toString());
            map.put("author", article.getAuthor().getUsername());
            return map;
        }).toList();
    }
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getArticleById(@PathVariable Long id) {
        Article article = articleService.getArticleById(id);
        if (article == null) {
            return ResponseEntity.notFound().build();
        }

        Map<String, Object> map = new HashMap<>();
        map.put("id", article.getId());
        map.put("title", article.getTitle());
        map.put("content", article.getContent());
        map.put("createdAt", article.getCreatedAt().toString());
        map.put("author", article.getAuthor().getUsername());

        return ResponseEntity.ok(map);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteArticle(@PathVariable Long id) {
        articleService.deleteArticle(id);
        return ResponseEntity.ok("Article deleted successfully");
    }
    @PutMapping("/{id}")
    public ResponseEntity<Article> updateArticle(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String title = body.get("title");
        String content = body.get("content");
        Long userId = Long.parseLong(body.get("userId"));
        Article updated = articleService.updateArticle(id, title, content, userId);
        return ResponseEntity.ok(updated);
    }



}
