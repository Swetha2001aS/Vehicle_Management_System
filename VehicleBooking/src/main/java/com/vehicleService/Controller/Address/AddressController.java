package com.vehicleService.Controller.Address;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vehicleService.dto.Address.AddressDto;
import com.vehicleService.dto.user.UserDto;
import com.vehicleService.entity.AddressEntity.AddressEntity;
import com.vehicleService.service.Address.AddressService;

@RestController
@RequestMapping("/addressess")
public class AddressController {
	
	@Autowired
	private AddressService addressService;
	
	@PostMapping
	public Long createOrUpdateAddress(@RequestBody UserDto userDto){
        return addressService.createOrUpdateAddress(userDto);
	}
	
	@GetMapping("/id")
	public ResponseEntity<Object> getAllAddresses() {
	     return ResponseEntity.ok(addressService.getAllAddresses());
	 }
	
//	@DeleteMapping("/{id}")
//    public ResponseEntity<String> deleteAddress(@PathVariable Long id) {
//        addressService.deleteAddress(id);
//        return ResponseEntity.ok("Address deleted successfully.");
//    }

}
