package com.isi.proiect.serviceImpl;

import com.isi.proiect.dtos.LoginDto;
import com.isi.proiect.entity.User;
import com.isi.proiect.repository.UserRepository;
import com.isi.proiect.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User addUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    @Override
    public User checkUserLogin(LoginDto loginDto) {
        if (this.userRepository.existsByEmail(loginDto.getEmail())) {
            User user = this.userRepository.findByEmail(loginDto.getEmail());
            if (user.getPassword().equals(loginDto.getPassword())) {
                return user;
            }
        }
        return new User();
    }

    @Override
    public User login(List<String> params) {
        String name = params.get(0);
        String password = params.get(1);
        if (this.userRepository.existsByEmail(name)) {
            User user = this.userRepository.findByEmail(name);
            if (user.getPassword().equals(password)) {
                return user;
            }
        }
        return new User();
    }
}
