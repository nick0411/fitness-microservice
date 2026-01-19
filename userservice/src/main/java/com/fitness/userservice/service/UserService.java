package com.fitness.userservice.service;

import com.fitness.userservice.dto.RegisterRequest;
import com.fitness.userservice.dto.UserResponse;
import com.fitness.userservice.model.User;
import com.fitness.userservice.repository.UserRepository;
import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public UserResponse register( RegisterRequest request) {

        if (repository.existsByEmail(request.getEmail())){
            throw new RuntimeException("Email already exist");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());

        User savedUsesr = repository.save(user);

        UserResponse userResponse = new UserResponse();
        userResponse.setId(savedUsesr.getId());
        userResponse.setPassword(savedUsesr.getPassword());
        userResponse.setEmail(savedUsesr.getEmail());
        userResponse.setFirstName((savedUsesr.getFirstName()));
        userResponse.setLastName(savedUsesr.getLastName());
        userResponse.setCreatedAt(savedUsesr.getCreatedAt());
        userResponse.setUpdatedAt(savedUsesr.getUpdatedAt());

        return userResponse;
    }

    public UserResponse getUserProfile(String userId) {
        User user = repository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        UserResponse userResponse = new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setPassword(user.getPassword());
        userResponse.setEmail(user.getEmail());
        userResponse.setFirstName((user.getFirstName()));
        userResponse.setLastName(user.getLastName());
        userResponse.setCreatedAt(user.getCreatedAt());
        userResponse.setUpdatedAt(user.getUpdatedAt());
        return userResponse;
    }

    public Boolean existByUserId(String userId) {
        return repository.existsById(userId);
    }
}
