package com.toDoList.Controller;


import com.toDoList.Models.User;
import com.toDoList.Repository.UserRepository;
import com.toDoList.Service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {

    private UserRepository repository;
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(path = "/register")
    public ResponseEntity<?> register(@RequestBody User user){
        return ResponseEntity.ok().body(userService.registerUser(user));
    }


    @GetMapping(path = "")
    public String working(){
        return "working";
    }

}
