package com.isi.proiect.serviceImpl;

import com.isi.proiect.entity.User;
import com.isi.proiect.repository.UserRepository;
import com.isi.proiect.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User addUser(User user) {
        return userRepository.save(user);
    }
}
