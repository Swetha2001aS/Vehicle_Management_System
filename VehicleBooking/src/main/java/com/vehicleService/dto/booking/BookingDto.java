package com.vehicleService.dto.booking;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import com.vehicleService.dto.Address.AddressDto;
import com.vehicleService.dto.Vehicle.VehicleDto;
import com.vehicleService.dto.user.UserDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingDto {
    private Long userId;
    private Long vehicleId;
    private Long bookingId;
    private Date estimatedDeliveryDate;
    private String status;         // Booking status (e.g., "P" for pending, "C" for confirmed)
    private String paymentStatus;  // Payment status (e.g., "P" for pending, "C" for completed")
    private Date bookingDate; // Date when the booking was made

    
    private UserDto user;
    private VehicleDto vehicle;
    private List<AddressDto> addresses;
    
    private Date createdTime;
    private String createdBy;
    private Date modifiedTime;
    private String modifiedBy;
    private Boolean isDelete;
}

