package com.yummyfood.service;

import com.yummyfood.exception.ResourceNotFoundException;
import com.yummyfood.model.User;
import com.yummyfood.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public User getByUserId(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Map<String, String> deleteUserById(String id) {
        Map<String, String> response = new HashMap<>();
        userRepository.deleteById(id);
        response.put("response", "success");
        return response;
    }

    @Override
    public User editUserById(String id, User user) {
        Optional<User> oldUser = userRepository.findById(id);
        if (oldUser.isPresent()) {
            userRepository.save(user);
        } else {
            return new User();
        }
        return user;
    }
}
