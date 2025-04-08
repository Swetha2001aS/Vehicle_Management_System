package com.vehicleService.repository.Address;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vehicleService.entity.AddressEntity.AddressEntity;
import com.vehicleService.entity.UserMaster.UserMasterEntity;

@Repository
public interface AddressRepository extends JpaRepository<AddressEntity, Long> {
    
    // Find all addresses for a specific user
    List<AddressEntity> findByUserId(Long userId);

    // Find all non-deleted addresses
    List<AddressEntity> findByIsDelete(String isDelete);
}