package com.isi.proiect.rest;

import com.isi.proiect.entity.User;
import com.isi.proiect.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getUsers() {
        return userService.getAll();
    }

    @PostMapping
    public User addUser(@RequestBody User user) {
        User u = null;
        if (user != null) {
            u = userService.addUser(user);
        }
        return u;
    }

    @PutMapping
    @ResponseBody
    public User updateUser(@RequestBody User user) {
        return userService.updateUser(user);
    }

    @DeleteMapping
    public void deleteUser(@RequestBody User user) {
        userService.deleteUser(user);
    }
}
