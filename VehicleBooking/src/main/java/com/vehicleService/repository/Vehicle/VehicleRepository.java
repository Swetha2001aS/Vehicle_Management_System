package com.vehicleService.repository.Vehicle;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vehicleService.entity.Vehicle.VehicleEntity;

import java.util.List;

public interface VehicleRepository extends JpaRepository<VehicleEntity, Long> {
    List<VehicleEntity> findByIsDelete(String isDelete);
    
}


