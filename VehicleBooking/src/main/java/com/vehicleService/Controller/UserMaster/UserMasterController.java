package com.vehicleService.Controller.UserMaster;

import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vehicleService.dto.UserMaster.UserMasterDto;
import com.vehicleService.dto.booking.BookingDto;
import com.vehicleService.dto.user.UserDto;
import com.vehicleService.entity.UserMaster.UserMasterEntity;
import com.vehicleService.service.UserMaster.UserMasterService;

@RestController
@RequestMapping("/api/Users_master")
public class UserMasterController {
	@Autowired
	private UserMasterService userMasterService;
	
	@PostMapping("/") 
    public ResponseEntity<Long> createUserMaster(@RequestBody UserDto user) {
        Long createdUser = userMasterService.createUserMaster(user);
        return ResponseEntity.ok(createdUser);
    }

    

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userMasterService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<UserMasterEntity>> getAllUsers() {
        List<UserMasterEntity> users = userMasterService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    
    @GetMapping("/master/{id}")
    public ResponseEntity<UserMasterEntity> getUserById(@PathVariable Long id) {
        UserMasterEntity user = userMasterService.getUserById(id);
        return ResponseEntity.ok(user);
    }
    
    @PutMapping("/upadatePass/")
    public ResponseEntity<String> updateUserPassword(@RequestBody UserMasterDto userMasterDto){
    	boolean updatePassword = userMasterService.updateUserPassword(userMasterDto);
    	return ResponseEntity.ok("updated");
    }

    @GetMapping("/authenticate")  // Ensure this is mapped to POST request
    public ResponseEntity<UserDto> authenticateUser(@RequestBody UserMasterDto userMasterDto) {
        UserDto userDetails = userMasterService.getUserDetailsIfAuthenticated(
            userMasterDto.getUserName(), userMasterDto.getUserPassword()
        );
        return ResponseEntity.ok(userDetails);
    }
    
    @PutMapping("/updateDetails")
    public ResponseEntity<String> updateDetailsByUserNameAndUserPassword(@RequestBody UserMasterDto userMasterDto) {
        boolean isUpdated = userMasterService.updateDetailsByUserNameAndUserPassword(
        		userMasterDto
        );

        if (isUpdated) {
            return ResponseEntity.ok("User details updated successfully.");
        } else {
            return ResponseEntity.status(401).body("Invalid username or password.");
        }
    }
    
}
