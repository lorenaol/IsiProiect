package com.isi.proiect.rest;

import com.isi.proiect.dtos.LoginDto;
import com.isi.proiect.entity.User;
import com.isi.proiect.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
public class LoginController {
    private final UserService userService;

    public LoginController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public ResponseEntity<User> login(@RequestBody LoginDto loginDto) {
        return new ResponseEntity<>(userService.checkUserLogin(loginDto), HttpStatus.OK);
    }
}
