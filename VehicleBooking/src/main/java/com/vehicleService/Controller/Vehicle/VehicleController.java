package com.vehicleService.Controller.Vehicle;

import com.vehicleService.dto.Vehicle.VehicleDto;
import com.vehicleService.service.Vehicle.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/vehicles")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @PostMapping
    public ResponseEntity<Long> addVehicle(@RequestBody VehicleDto vehicleDto) {
        Long vehicleId = vehicleService.saveVehicle(vehicleDto);
        return ResponseEntity.ok(vehicleId);
    }

    @GetMapping
    public ResponseEntity<List<VehicleDto>> getAllVehicles() {
        List<VehicleDto> vehicles = vehicleService.getAllVehicles();
        return ResponseEntity.ok(vehicles);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VehicleDto> getVehicleById(@PathVariable Long id) {
        Optional<VehicleDto> vehicleDto = vehicleService.getVehicleById(id);
        return vehicleDto.map(ResponseEntity::ok)
                         .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteVehicle(@PathVariable Long id) {
        vehicleService.deleteVehicle(id, "admin"); // Replace "admin" with the actual user performing the deletion
        return ResponseEntity.ok("Vehicle deleted successfully");
    }
    
    //_______________________________________________________________
    
  
    
    
}
