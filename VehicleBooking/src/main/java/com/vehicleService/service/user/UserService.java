package com.vehicleService.service.user;



import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.vehicleService.dto.user.UserDto;
import com.vehicleService.entity.user.UserEntity;
import com.vehicleService.repository.user.UserRepository;
import com.vehicleService.service.Address.AddressService;
import com.vehicleService.service.UserMaster.UserMasterService;

import jakarta.persistence.EntityNotFoundException;


@Service
public class UserService {
	
	@Autowired
	private UserRepository userrepository;
	@Autowired
	private UserMasterService usermasterService;
	
	public Long saveuser(UserDto userdto) {
		 Calendar cal = Calendar.getInstance();
		 UserEntity userEntity;
		if(userdto.getUserId()==0) 
		{
			userEntity = new UserEntity();
			userEntity.setIsDelete("N");
			userEntity.setCreatedTime(cal.getTime());
			userEntity.setModifiedTime(cal.getTime());
			userEntity.setCreatedby("admin");
			userEntity.setModifiedby("admin");							
			//UserEntity ob  = userrepository.save(userEntity);
		  //  userdto.setUserId(ob.getUserId());
		    //usermasterService.createUserMaster(userdto);
		        
			
			}
		
			else 
			{
	            userEntity = userrepository.findById(userdto.getUserId())
	                    .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userdto.getUserId()));
	        }

	        // Setting or updating attributes
	        userEntity.setFirstName(userdto.getFirstName());
	        userEntity.setLastName(userdto.getLastName());

	        userEntity.setUserEmail(userdto.getUserEmail());
			userEntity.setUserPhoneNumber(userdto.getUserPhoneNumber());
			userEntity.setIsDelete("N");
			userEntity.setCreatedTime(cal.getTime());
			userEntity.setModifiedTime(cal.getTime());
			userEntity.setCreatedby("admin");
			userEntity.setModifiedby("admin");							
			UserEntity ob  = userrepository.save(userEntity);
		    userdto.setUserId(ob.getUserId());
		    
	        
	        
	         return  usermasterService.createUserMaster(userdto);
	    }
	
	
	
	public UserDto getuserById(Long id) {
	    UserEntity user = userrepository.findById(id).orElse(null);
	    return (user != null) ? convertToDTO(user) : null;
	}

		
	private UserDto convertToDTO(UserEntity user) {
	    UserDto dto = new UserDto();
	    dto.setUserId(user.getUserId());
	    dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
	    dto.setIsDelete(user.getIsDelete());
	    dto.setUserPhoneNumber(user.getUserPhoneNumber());
	    dto.setCreatedby(user.getCreatedby());
	    dto.setModifiedby(user.getModifiedby());
	    dto.setCreatedTime(user.getCreatedTime());
	    dto.setModifiedTime(user.getModifiedTime());
	    
	    return dto;
	}
	public List<UserDto> getAlluserId() {
	    List<UserDto> userDtos = new ArrayList<>();
	    List<UserEntity> users = userrepository.findByIsDeleted();

	    for (UserEntity user : users) {
	        userDtos.add(convertToDTO(user));
	    }
	    
	    return userDtos;
		}
	
	public String deleteuserById(Long id) {
			
		UserEntity user = userrepository.findById(id).orElse(null);
			    
			    if (user == null) {
			        return "User not found";
			    }

			    if ("Y".equals(user.getIsDelete())) {
			        return "User is already deleted";
			    } else if ("N".equals(user.getIsDelete())) {
			        user.setIsDelete("Y");
			        userrepository.save(user);
			        return "User deleted successfully";
			    }
			    return "Invalid user status";

	    }
	}






