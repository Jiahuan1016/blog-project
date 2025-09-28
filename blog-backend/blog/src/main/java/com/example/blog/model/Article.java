package com.example.blog.model;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @Column(columnDefinition = "TEXT")
    private String content;
    private LocalDateTime createdAt;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User author;
    public Article() {}
    public Article(String title, String content, LocalDateTime createdAt, User author) {
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.author = author;
    }

}
