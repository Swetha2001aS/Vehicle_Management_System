package com.vehicleService.service.Address;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vehicleService.dto.Address.AddressDto;
import com.vehicleService.dto.user.UserDto;
import com.vehicleService.entity.AddressEntity.AddressEntity;
import com.vehicleService.entity.UserMaster.UserMasterEntity;
import com.vehicleService.repository.Address.AddressRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
public class AddressService {

	
	@Autowired
	private AddressRepository addressRepository;

	private Calendar cl = Calendar.getInstance();

	

	public Long createOrUpdateAddress(UserDto userDto) 
	{
	    if (userDto == null || userDto.getAddress() == null || userDto.getAddress().isEmpty()) {
	        throw new IllegalArgumentException("UserDto or AddressList cannot be null or empty");
	    }

	    // Fetch existing addresses for the user
	    List<AddressEntity> existingAddresses = addressRepository.findByUserId(userDto.getUserId());
	    boolean addressExists = false;
        AddressEntity addressEntity = null;
	    // Iterate through the addresses in UserDto
	    for (AddressDto addressDto : userDto.getAddress()) 
	    {
	       

	        // Check if the address already exists
	        if (!existingAddresses.isEmpty())
	        {
	            for (AddressEntity existingAddress : existingAddresses) 
	            {
	                if (addressDto.getAddressId() != null &&
	                    addressDto.getAddressId().equals(existingAddress.getAddressId()))
	                {
	                    // Address exists, update it
	                    addressEntity = existingAddress;
	                    addressEntity.setNation(addressDto.getNation());
	                    addressEntity.setState(addressDto.getState());
	                    addressEntity.setDistrict(addressDto.getDistrict());
	                    addressEntity.setPincode(addressDto.getPincode());
	                    addressEntity.setModifiedBy("admin");
	                    addressEntity.setModifiedTime(new Date());
	                    addressEntity.setIsDelete("N");
	                    addressExists = true;
	                    break; // Exit loop after finding the address
	                }
	            }
	        }

	        // If the address does not exist or existingAddresses is empty, create a new one
	        if (!addressExists) {
	            addressEntity = new AddressEntity();
	            addressEntity.setUserId(userDto.getUserId());
	            addressEntity.setNation(addressDto.getNation());
	            addressEntity.setState(addressDto.getState());
	            addressEntity.setDistrict(addressDto.getDistrict());
	            addressEntity.setPincode(addressDto.getPincode());
	            addressEntity.setCreatedBy("admin");
	            addressEntity.setCreatedTime(new Date());
	            addressEntity.setIsDelete("N");
	        }

	        // Save the address entity
	        addressRepository.save(addressEntity);
	        
	    }
	    
	    return userDto.getUserId(); // Return the user ID after processing
	}


	    
    	
	       
	   
	

	public Object getAllAddresses() {
		// TODO Auto-generated method stub
		return null;
	}






//	public void deleteAddress(Long id) {
//		// TODO Auto-generated method stub
//		
//	}

}
