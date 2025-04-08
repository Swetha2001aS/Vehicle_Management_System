package com.vehicleService.entity.UserMaster;

import lombok.Data;
import lombok.NoArgsConstructor;


import java.time.LocalDateTime;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user_master")


public class UserMasterEntity {

	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long userMasterId;
	private String userRole;
	private Long userId;
	private String userName;
	private String userPassword;
	private String createdBy;
	private String modifiedBy;
	private Date createdTime;
	private Date modifiedTime;
	private String isDelete;

}
