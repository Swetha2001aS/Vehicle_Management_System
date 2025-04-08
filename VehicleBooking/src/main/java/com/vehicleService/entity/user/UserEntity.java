package com.vehicleService.entity.user;



import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="user_entity")

public class UserEntity {
	
	
	

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long userId;
	private String firstName;
	private String lastName;
	private String userPhoneNumber;
	private String userEmail;
	private String createdby;
	private String modifiedby;
	private Date createdTime;
	private Date modifiedTime;
	private String isDelete;
	


}
