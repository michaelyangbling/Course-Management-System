package com.example.myapp.model;

public class User {
	private Integer id;
	private String username;
	private String password;
	private String firstName;
	private String lastName;
	private String role;
	public User() {}
	public User(int id, String username, String firstName, String lastName, String role) {
		this.id = id;
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.role=role;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getUsername() {
		return this.username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return this.password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getFirstName() {
		return this.firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return this.lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
    
	public String getRole() {
		return this.role;
	}

	public void setRole(String role) {
		this.role = role;
	}

}