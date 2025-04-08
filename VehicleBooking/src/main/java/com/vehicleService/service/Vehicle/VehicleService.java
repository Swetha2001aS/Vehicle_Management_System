package com.vehicleService.service.Vehicle;


import com.vehicleService.dto.Vehicle.VehicleDto;
import com.vehicleService.entity.Vehicle.VehicleEntity;
import com.vehicleService.repository.Vehicle.VehicleRepository;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    public Long saveVehicle(VehicleDto vehicleDTO) {
        VehicleEntity vehicle;

        if (vehicleDTO.getId() == null || vehicleDTO.getId() == 0) {
            // Create new vehicle
            vehicle = new VehicleEntity();
            vehicle.setCreatedBy("admin");
            vehicle.setCreatedTime(LocalDateTime.now());
        	} else {
            // Update existing vehicle
            vehicle = vehicleRepository.findById(vehicleDTO.getId())
                    .orElseThrow(() -> new EntityNotFoundException("Vehicle not found"));
        }

        // Set common properties
        vehicle.setName(vehicleDTO.getName());
        vehicle.setType(vehicleDTO.getType());
        vehicle.setRegistrationNumber(vehicleDTO.getRegistrationNumber());
        vehicle.setPricePerDay(vehicleDTO.getPricePerDay());
        vehicle.setIsDelete("n");
        vehicle.setModifiedBy("admin");
        vehicle.setModifiedTime(LocalDateTime.now());

        VehicleEntity savedVehicle = vehicleRepository.save(vehicle);
        return savedVehicle.getId();
    }


    public List<VehicleDto> getAllVehicles() {
        List<VehicleEntity> vehicles = vehicleRepository.findByIsDelete("n"); // Only fetch active vehicles
        System.out.println("" + vehicles.size());
        
        List<VehicleDto> vehicledto = new ArrayList<>();
        for (VehicleEntity vehicle : vehicles) {
        	VehicleDto dto = convertToDTO(vehicle);
        	vehicledto.add(dto);
        }
        return vehicledto;
    }
    
    private VehicleDto convertToDTO(VehicleEntity vehicle) {
        VehicleDto dto = new VehicleDto();
        dto.setId(vehicle.getId());
        dto.setName(vehicle.getName());
        dto.setType(vehicle.getType());
        dto.setRegistrationNumber(vehicle.getRegistrationNumber());
        dto.setPricePerDay(vehicle.getPricePerDay());
        dto.setIsDelete(vehicle.getIsDelete());
        dto.setCreatedBy(vehicle.getCreatedBy());
        dto.setCreatedTime(vehicle.getCreatedTime());
        dto.setModifiedBy(vehicle.getModifiedBy());
        dto.setModifiedTime(vehicle.getModifiedTime());
        
        return dto;
    }

    public Optional<VehicleDto> getVehicleById(Long id) {
        Optional<VehicleEntity> vehicleEntityOptional = vehicleRepository.findById(id);
        if (vehicleEntityOptional.isPresent()) {
            VehicleEntity vehicleEntity = vehicleEntityOptional.get();
            VehicleDto vehicleDto = convertToDTO(vehicleEntity);
            return Optional.of(vehicleDto);
        } else {
            return Optional.empty();
        }
    }


    // Soft Delete: Update isDelete instead of removing record
    public void deleteVehicle(Long id, String modifiedBy) {
        Optional<VehicleEntity> optionalVehicle = vehicleRepository.findById(id);
        if (optionalVehicle.isPresent()) {
            VehicleEntity vehicle = optionalVehicle.get();
            vehicle.setIsDelete("y"); // Mark as deleted
            vehicle.setModifiedBy(modifiedBy);
            vehicle.setModifiedTime(LocalDateTime.now());
            vehicleRepository.save(vehicle);
        }
    }


}
