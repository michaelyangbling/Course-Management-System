package com.example.myapp.services;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;

import org.springframework.web.bind.annotation.RequestBody;

import com.example.myapp.model.User;
import java.util.ArrayList;



@RestController
public class UserService {
	//User alice = new User(-2, "alice(Example)", "Alice", "Wonderland","Student");
	//User bob   = new User(-1, "bob(Example)", "Bob", "Marley","Faculty");
	ArrayList<User> users = new ArrayList<User>();
	
	int count=0;
	@GetMapping("/api/user")
	public ArrayList<User> findAllUser() {
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

	@PostMapping("/api/user")
	public User createUser(@RequestBody User newUser) {
		count += 1; //sync issue?
		newUser.setId(count);
		users.add(newUser);
   		return newUser; //maybe we only need to return id?
	}

	@DeleteMapping("/api/user/{id}")
	public User deleteUser(@PathVariable Integer id) {
		//sync issue?
		int i=0;
		while(i<users.size()){
			if (users.get(i).getId().equals(id))
				users.remove(i);
			i=i+1;
		}
   		return null; //maybe we only need to return id?
	}


//	}
//	public void deleteUser(Integer id) {
//		
//	}
//	public User updateUser(Integer id, User user) {
//		
//	}
}