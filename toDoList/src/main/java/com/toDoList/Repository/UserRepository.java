package com.toDoList.Repository;

import com.toDoList.Models.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Integer> {
    Optional<User> findUserByEmail(String email);
    Boolean existsUserByEmail(String email);
    User getUserByEmail(String email);
}
