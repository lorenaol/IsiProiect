package com.isi.proiect.service;

import com.isi.proiect.dtos.LoginDto;
import com.isi.proiect.entity.User;

import java.util.List;

public interface UserService {

    User addUser(User user);

    List<User> getAll();

    User updateUser(User user);

    void deleteUser(User user);

    User checkUserLogin(LoginDto loginDto);

    User login(List<String> params);
}
