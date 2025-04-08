package com.vehicleService.entity.booking;


import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingEntity {
	

	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    private Long userId;
    private Long vehicleId;
    private Date estimatedDeliveryDate;
    private String status;        
    private String paymentStatus;  
    private Date bookingDate; 
    private Date createdTime;
    private String createdBy;
    private Date modifiedTime;
    private String modifiedBy;
    private Boolean isDelete;


}

