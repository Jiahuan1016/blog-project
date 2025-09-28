package com.example.blog.service;
import com.example.blog.model.User;
import com.example.blog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    public User register(User user){
        Optional<User>existing=userRepository.findByUsername(user.getUsername());
        if(existing.isPresent()){
            throw new RuntimeException("username's been existed");
        }
        return userRepository.save(user);
    }
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

}
