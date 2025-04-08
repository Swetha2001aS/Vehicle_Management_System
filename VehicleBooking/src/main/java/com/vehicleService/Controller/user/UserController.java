package com.vehicleService.Controller.user;




//package com.vehicleSerivce.controller.user;

import java.util.List;
import java.util.concurrent.ExecutorService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.vehicleService.dto.user.UserDto;
//import com.vehicleService.service.user.UserService;

import com.vehicleService.dto.user.UserDto;
import com.vehicleService.service.user.UserService;



@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/user")
public class UserController {
    
	@Autowired
    private UserService userservice;

    UserController(UserService userservice) {
        this.userservice = userservice;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long userId) {
        UserDto userDto = userservice.getuserById(userId);
        return ResponseEntity.ok(userDto);
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserDto>> getAlluserId() {
        List<UserDto> users = userservice.getAlluserId();
        return ResponseEntity.ok(users);
    }

    
    
    @PostMapping("/")
    public ResponseEntity<Long> saveUser(@RequestBody UserDto userdto) {
        Long userId = userservice.saveuser(userdto);
        return ResponseEntity.ok(userId);
    }

    // Delete user by ID
    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId) {
    	String result = userservice.deleteuserById(userId);
        return ResponseEntity.ok(result);

    	}
    
    
    
    
    
}

