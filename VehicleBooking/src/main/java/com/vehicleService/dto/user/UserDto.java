package com.vehicleService.dto.user;
import java.util.Date;
import java.util.List;

import com.vehicleService.dto.Address.AddressDto;
import com.vehicleService.dto.UserMaster.UserMasterDto;
import com.vehicleService.dto.Vehicle.VehicleDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
	private Long userId;
	private String firstName;
	private String lastName;
	private String userPhoneNumber;
	private String userEmail;
	private UserMasterDto usermasterdto;
	private List<AddressDto> address;
	private String createdby;
	private String modifiedby;
	private Date createdTime;
	private Date modifiedTime;
	private String isDelete;




}
