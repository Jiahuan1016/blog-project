package com.example.blog.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.blog.model.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByUsername(String Username);
}
