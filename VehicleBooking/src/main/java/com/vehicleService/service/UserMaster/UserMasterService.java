package com.vehicleService.service.UserMaster;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vehicleService.dto.Address.AddressDto;
import com.vehicleService.dto.UserMaster.UserMasterDto;
import com.vehicleService.dto.Vehicle.VehicleDto;
import com.vehicleService.dto.booking.BookingDto;
import com.vehicleService.dto.user.UserDto;
import com.vehicleService.entity.AddressEntity.AddressEntity;
import com.vehicleService.entity.UserMaster.UserMasterEntity;
import com.vehicleService.entity.Vehicle.VehicleEntity;
import com.vehicleService.entity.booking.BookingEntity;
import com.vehicleService.entity.user.UserEntity;
import com.vehicleService.repository.Address.AddressRepository;
import com.vehicleService.repository.UserMaster.UserMasterRepository;
import com.vehicleService.repository.Vehicle.VehicleRepository;
import com.vehicleService.repository.booking.BookingRepository;
import com.vehicleService.repository.user.UserRepository;
import com.vehicleService.service.Address.AddressService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class UserMasterService {
	
		@Autowired
    	private UserRepository userRepository;

		@Autowired
		private AddressService addressService;
	

		@Autowired
		private UserMasterRepository userMasterRepository;
	  

	    @Autowired  
	    private AddressRepository addressRepository; 
	    
	    @Autowired  
	    private BookingRepository bookingRepository;
	    
	    @Autowired  
	    private	VehicleRepository vehicleRepository; 
		
	    Calendar cal = Calendar.getInstance();


	    public Long createUserMaster(UserDto userdto) {
	    	UserMasterEntity  user =userMasterRepository.findByUserId(userdto.getUserId());
	    	
	    	if(user==null) {
	        user = new UserMasterEntity();
	        user.setUserId(userdto.getUserId());
	        user.setUserName(userdto.getUsermasterdto().getUserName());
	        user.setUserRole(userdto.getUsermasterdto().getUserRole());
	        user.setUserPassword(userdto.getUsermasterdto().getUserPassword());
	        user.setCreatedBy("admin");
	        user.setCreatedTime(cal.getTime());
	        user.setModifiedBy("admin");
	        user.setModifiedTime(cal.getTime());
	        user.setIsDelete("N");  
	        
	        }
	    	userMasterRepository.save(user);
	        return  addressService.createOrUpdateAddress(userdto);
	    }



	    public void deleteUser(Long id) {
	        userMasterRepository.deleteById(id);

	    }

	    public List<UserMasterEntity> getAllUsers() {
	        return userMasterRepository.findAll();
	    }

	    public UserMasterEntity getUserById(Long id) {
	        return userMasterRepository.findById(id).orElse(null);
	    }
	    
	    
//checking name and password	    
	    public boolean checkUsernameAndPassword(String userName, String userNewPassword) {
	        Optional<UserMasterEntity> userOptional = userMasterRepository.findByUserNameAndUserPassword(userName, userNewPassword);
	        if (userOptional.isPresent()) {
	            UserMasterEntity user = userOptional.get();
	            return userNewPassword.equals(user.getUserPassword());
	        }
	        return false;
	    }
//update password

	    public boolean updateUserPassword(UserMasterDto userMasterDto) {
	    	if(checkUsernameAndPassword((userMasterDto.getUserName()),(userMasterDto.getUserPassword()))){
	        	UserMasterEntity userMasterEntity=userMasterRepository.findUserName(userMasterDto.getUserName()).get();
	        	if(userMasterEntity != null) {

	                if (userMasterEntity.getUserPassword().equals(userMasterEntity.getUserPassword())) {
	                	userMasterEntity.setUserPassword(userMasterDto.getUserNewPassword());
	                    userMasterRepository.save(userMasterEntity);
	                    return true;
	                }
	            }

	        }
			return false;
	    }

// get all details

	    public UserDto getUserDetailsIfAuthenticated(String userName, String userPassword) {
	        if (checkUsernameAndPassword(userName, userPassword)) {
	            UserMasterEntity userMaster = userMasterRepository.findUserName(userName).get();
	            
	            UserEntity userEntity = userRepository.findById(userMaster.getUserId())
	                                                  .orElseThrow(() -> new EntityNotFoundException("User not found"));
	            List<AddressEntity> addresses = addressRepository.findByUserId(userMaster.getUserId());
	            return mapToUserDto(userEntity, addresses);
	        }
			return null;
	    }
	    public UserDto mapToUserDto(UserEntity userEntity, List<AddressEntity> addresses) {
	        UserDto userDto = new UserDto();
	        userDto.setUserId(userEntity.getUserId());
	        userDto.setFirstName(userEntity.getFirstName());
	        userDto.setLastName(userEntity.getLastName());
	        userDto.setUserPhoneNumber(userEntity.getUserPhoneNumber());
	        userDto.setUserEmail(userEntity.getUserEmail());
	        userDto.setCreatedby(userEntity.getCreatedby());
	        userDto.setModifiedby(userEntity.getModifiedby());
	        userDto.setCreatedTime(userEntity.getCreatedTime());
	        userDto.setModifiedTime(userEntity.getModifiedTime());
	        userDto.setIsDelete(userEntity.getIsDelete());
	        List<AddressDto> addressDtos = new ArrayList<>();
	        for (AddressEntity addressEntity : addresses) {
	            AddressDto dto = mapToAddressDto(addressEntity);
	            addressDtos.add(dto);
	        }
	        userDto.setAddress(addressDtos);
	        return userDto;

	    }
	    private AddressDto mapToAddressDto(AddressEntity addressEntity) {
	        AddressDto dto = new AddressDto();
	        dto.setAddressId(addressEntity.getAddressId());
	        dto.setUserId(addressEntity.getUserId());
	        dto.setNation(addressEntity.getNation());
	        dto.setState(addressEntity.getState());
	        dto.setDistrict(addressEntity.getDistrict());
	        dto.setPincode(addressEntity.getPincode());
	        dto.setCreatedBy(addressEntity.getCreatedBy());
	        dto.setCreatedTime(addressEntity.getCreatedTime());
	        dto.setModifiedBy(addressEntity.getModifiedBy());
	        dto.setModifiedTime(addressEntity.getModifiedTime());
	        dto.setIsDelete(addressEntity.getIsDelete());
	        return dto;
	    }



	
	    public boolean updateDetailsByUserNameAndUserPassword(UserMasterDto userMasterDetails) {
	        // Authenticate the user
	        UserMasterEntity userMasterEntity = userMasterRepository.findByUserNameAndUserPassword(
	                userMasterDetails.getUserName(),
	                userMasterDetails.getUserPassword()
	        ).get();

	        if (userMasterEntity!=null) {
	            // Get the user entity
	        	UserEntity userEntity = userRepository.findByUserId(userMasterEntity.getUserId());
	            // Update user details if present
	            if (userMasterDetails.getUserDto().getUserPhoneNumber() != null) {
	            	userEntity.setUserPhoneNumber(userMasterDetails.getUserDto().getUserPhoneNumber());
	            }
	            if (userMasterDetails.getUserDto().getFirstName() != null) {
	            	userEntity.setFirstName(userMasterDetails.getUserDto().getFirstName());
	            }
	            if (userMasterDetails.getUserDto().getLastName() != null) {
	            	userEntity.setLastName(userMasterDetails.getUserDto().getLastName());
	            }
	            if (userMasterDetails.getUserDto().getUserEmail() != null) {
	            	userEntity.setUserEmail(userMasterDetails.getUserDto().getUserEmail());
	            }

	            // Save the updated entity
	            userRepository.save(userEntity); // Ensure the correct repository is used
	            return true;
	        } else {
	            // Handle case where authentication fails
	            throw new RuntimeException("Authentication failed. Invalid username or password.");
	        }
	    }














		
}
