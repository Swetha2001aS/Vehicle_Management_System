package com.vehicleService.dto.UserMaster;

import java.sql.Date;
import java.util.List;

import com.vehicleService.dto.Address.AddressDto;
import com.vehicleService.dto.user.UserDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserMasterDto {
	private Long userMasterId;
	private String userName;
	private String userPassword;
	private UserDto userDto; //for update user details 
	private String userNewPassword;
	private String userRole;
	private Long userId;
	private String createdBy;
	private String modifiedBy;
	private Date createdTime;
	private Date modifiedTime;
	private String isDelete;
	private String confirmPassword;
	
	

}
