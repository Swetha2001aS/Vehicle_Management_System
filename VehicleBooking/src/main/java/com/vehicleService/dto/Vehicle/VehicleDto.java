package com.vehicleService.dto.Vehicle;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VehicleDto {
    private Long id;
    private String name;
    private String type;
    private String registrationNumber;
    private double pricePerDay;
    private String isDelete;
    private String createdBy;
    private String modifiedBy;
    private LocalDateTime createdTime;
    private LocalDateTime modifiedTime;
}

