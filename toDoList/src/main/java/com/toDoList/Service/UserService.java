package com.toDoList.Service;


import com.toDoList.Models.User;
import com.toDoList.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepository repository;

    public User registerUser(User user){
        if (!repository.existsUserByEmail(user.getEmail())) {
            repository.save(user);
        }
        return repository.getUserByEmail(user.getEmail());

    }
}
