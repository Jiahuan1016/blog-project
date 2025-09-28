package com.example.blog.controller;
import com.example.blog.model.LoginRequest;
import com.example.blog.model.User;
import com.example.blog.service.UserService;
import com.example.blog.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.register(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<User> optionalUser = userService.findByUsername(loginRequest.getUsername());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getPassword().equals(loginRequest.getPassword())) {
                String token = jwtUtil.generateToken(user.getUsername());
                Map<String, Object> response = new HashMap<>();
                response.put("id", user.getId());
                response.put("username", user.getUsername());
                response.put("email", user.getEmail());
                response.put("token", token);
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Password wrong");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Username does not exist");
        }
    }
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

}

