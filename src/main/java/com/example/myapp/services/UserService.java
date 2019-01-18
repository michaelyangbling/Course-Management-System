package com.example.myapp.services;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.myapp.model.User;

@RestController
public class UserService {
	User alice = new User(-2, "alice(Example)", "Alice", "Wonderland","Student");
	User bob   = new User(-1, "bob(Example)", "Bob", "Marley","Faculty");
	User[] users = {alice, bob};

	@GetMapping("/api/user")
	public User[] findAllUser() {
		return users;
	}
	@GetMapping("/api/user/{userId}")
	public User findUserById(
			@PathVariable("userId") Integer id) {
		for(User user: users) {
			if(id == user.getId().intValue())
				return user;
		}
		return null;
	}
//	public User createUser(User user) {
//		
//	}
//	public void deleteUser(Integer id) {
//		
//	}
//	public User updateUser(Integer id, User user) {
//		
//	}
}