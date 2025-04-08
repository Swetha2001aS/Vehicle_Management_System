package com.vehicleService.dto.Address;



import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddressDto {
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
    private String isDelete;
}




