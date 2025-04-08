package com.vehicleService.entity.AddressEntity;

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
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "address")
public class AddressEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long addressId;
	private Long userId;
	private String nation;
	private String state;
	private String district;
	private String pincode;
	private Date createdTime;
	private String createdBy;
	private Date modifiedTime;
	private String modifiedBy;
	private String isDelete = "N";
	
	
}
