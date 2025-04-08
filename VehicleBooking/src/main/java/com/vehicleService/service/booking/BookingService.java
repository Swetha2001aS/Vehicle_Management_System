package com.vehicleService.service.booking;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;

import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vehicleService.dto.Address.AddressDto;
import com.vehicleService.dto.Vehicle.VehicleDto;
import com.vehicleService.dto.booking.BookingDto;
import com.vehicleService.dto.user.UserDto;
import com.vehicleService.entity.AddressEntity.AddressEntity;
import com.vehicleService.entity.Vehicle.VehicleEntity;
import com.vehicleService.entity.booking.BookingEntity;
import com.vehicleService.entity.user.UserEntity;
import com.vehicleService.repository.Address.AddressRepository;
import com.vehicleService.repository.Vehicle.VehicleRepository;
import com.vehicleService.repository.booking.BookingRepository;
import com.vehicleService.repository.user.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Service  
@Slf4j  
public class BookingService {  

    @Autowired  
    private BookingRepository bookingRepository; 
      
    @Autowired
    private UserRepository userRepository;
       
    @Autowired
    private VehicleRepository vehicleRepository;
    
    @Autowired
    private AddressRepository addressRepository;
    
    
    private Calendar cl = Calendar.getInstance(); // Add this line in your class

   
    public Long saveBooking(BookingDto bookDto) {
        if (bookDto.getUserId() == null || bookDto.getVehicleId() == null) {
            throw new IllegalArgumentException("User ID and Vehicle ID are required.");
        }

        BookingEntity booking;
        Long bookingId = bookDto.getBookingId(); // Avoid NullPointerException

        if (bookingId == 0) {
            // Creating a new booking
            booking = new BookingEntity();
            booking.setStatus("P");
            booking.setPaymentStatus("P");  
            booking.setBookingDate(cl.getTime());
            booking.setCreatedTime(cl.getTime()); // `c.getTime()` replaced with `new Date()`
            booking.setIsDelete(false); 
            System.out.println("created");
        } else {
            booking = bookingRepository.findById(bookingId)
                    .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + bookingId));
            booking.setModifiedTime(cl.getTime()); // `c.getTime()` replaced with `new Date()`
            log.info("Updating booking with ID: {}", bookingId);
        }

        // Set common fields
        booking.setUserId(bookDto.getUserId());
        booking.setVehicleId(bookDto.getVehicleId());
        booking.setStatus(bookDto.getStatus() != null ? bookDto.getStatus() : booking.getStatus());
        booking.setPaymentStatus(bookDto.getPaymentStatus() != null ? bookDto.getPaymentStatus() : booking.getPaymentStatus());
        booking.setEstimatedDeliveryDate(bookDto.getEstimatedDeliveryDate());
        booking.setCreatedBy(bookDto.getCreatedBy() != null ? bookDto.getCreatedBy() : "System");
        booking.setModifiedBy(bookDto.getModifiedBy() != null ? bookDto.getModifiedBy() : "System");

        // Save to the repository
        BookingEntity savedBooking = bookingRepository.save(booking);
        log.info("Booking saved successfully with ID: {}", savedBooking.getBookingId());
        
        return savedBooking.getBookingId();
        
    }

    public BookingEntity getBookingById(Long bookingId) {
        return bookingRepository.findById(bookingId)
                .filter(booking -> !booking.getIsDelete())
                .orElseThrow(() -> {
                    log.warn("Booking not found with ID: {}", bookingId);
                    return new RuntimeException("Booking not found with ID: " + bookingId);
                });
    }

    public List<BookingDto> getAllBookings() {
        List<BookingEntity> bookings = bookingRepository.findByIsDeleteFalse();
        log.info("Retrieved {} active bookings", bookings.size());

        List<BookingDto> bookingDTOs = new ArrayList<>();
        for (BookingEntity booking : bookings) {
            BookingDto dto = convertToDTO(booking);
            bookingDTOs.add(dto);
        }

        return bookingDTOs;
    }

    private BookingDto convertToDTO(BookingEntity booking) {
        BookingDto dto = new BookingDto();
        dto.setBookingId(booking.getBookingId());
        dto.setUserId(booking.getUserId());
        dto.setVehicleId(booking.getVehicleId());
        dto.setStatus(booking.getStatus());
        dto.setPaymentStatus(booking.getPaymentStatus());
        dto.setEstimatedDeliveryDate(booking.getEstimatedDeliveryDate());
        dto.setBookingDate(booking.getBookingDate());
        dto.setCreatedTime(booking.getCreatedTime());
        dto.setCreatedBy(booking.getCreatedBy());
        dto.setModifiedBy(booking.getModifiedBy());
        dto.setModifiedTime(booking.getModifiedTime());
        dto.setIsDelete(booking.getIsDelete());
        return dto;
    }

   
    public void deleteBooking(Long bookingId) {
    	BookingEntity booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + bookingId));
        
        booking.setIsDelete(true);
        booking.setModifiedTime(cl.getTime());
        booking.setModifiedBy("System");

        bookingRepository.save(booking);
        log.info("Booking ID {} marked as deleted", bookingId);
    }
    
    private List<UserDto> getAllUsers() {
        return new ArrayList<>();
    }
    
    public List<BookingDto> getBookingDetailsById(Long bookingId) {
    	List<BookingEntity> bookings = bookingRepository.findAll();
    	List<UserEntity> users = userRepository.findAll();
    	List<VehicleEntity> vehicles = vehicleRepository.findAll();
    	List<BookingDto> bookingDetailsList = new ArrayList<>();
    	
    	for(BookingEntity booking:bookings) {
    		if(booking.getBookingId().equals(bookingId)) {
    			UserEntity matchedUser = null;
    			VehicleEntity matchedVehicle = null;
    			
    			for(UserEntity user:users) {
    				if(user.getUserId().equals(booking.getBookingId())) {
    					matchedUser = user;
    					break;
    				}
    			}
    			for(VehicleEntity vehicle:vehicles) {
    				if (vehicle.getId().equals(booking.getVehicleId())) {
                        matchedVehicle = vehicle;
                        break;
                    }
    			}
    			 if (matchedUser != null && matchedVehicle != null) {
    				 BookingDto bookingDto = convertToDTO(booking);
    	                UserDto userDto = convertToUserDto(matchedUser);
    	                VehicleDto vehicleDto = convertToVehicleDto(matchedVehicle);

    	                bookingDto.setUser(userDto);
    	                bookingDto.setVehicle(vehicleDto);

    	                // Add BookingDto to the list
    	                bookingDetailsList.add(bookingDto);
    	            }
    			
    		}
    	}
		return bookingDetailsList;
    	
    }
    

//    private BookingDto convertToBookingDto(BookingEntity booking) {
//        BookingDto bookingDto = new BookingDto();
//        bookingDto.setBookingId(booking.getBookingId());
//        bookingDto.setUserId(booking.getUserId());
//        bookingDto.setVehicleId(booking.getVehicleId());
//        bookingDto.setBookingDate(booking.getBookingDate());
//        bookingDto.setStatus(booking.getStatus());
//        return bookingDto;
//    }

    private UserDto convertToUserDto(UserEntity user) {
        UserDto userDto = new UserDto();
        userDto.setUserId(user.getUserId());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setUserEmail(user.getUserEmail());
        userDto.setUserPhoneNumber(user.getUserPhoneNumber());
        userDto.setCreatedby(user.getCreatedby());
        userDto.setModifiedby(user.getModifiedby());
        userDto.setCreatedTime(user.getCreatedTime());
        userDto.setModifiedTime(user.getModifiedTime());
        userDto.setIsDelete(user.getIsDelete());
        
        
        
        
        List<AddressDto> addressDtos = new ArrayList<>();
        List<AddressEntity> addresses = addressRepository.findByUserId(user.getUserId());
        if (addresses != null && !addresses.isEmpty()) {
            for (AddressEntity address : addresses) {
                AddressDto addressDto = new AddressDto();
                addressDto.setNation(address.getNation());
                addressDto.setState(address.getState());
                addressDto.setDistrict(address.getDistrict());
                addressDto.setPincode(address.getPincode());
                addressDto.setAddressId(address.getAddressId());
                addressDto.setUserId(address.getUserId());
                addressDto.setCreatedBy(address.getCreatedBy());
                addressDto.setCreatedTime(address.getCreatedTime());;
                addressDto.setModifiedBy(address.getModifiedBy());
                addressDto.setModifiedTime(address.getModifiedTime());
                addressDto.setIsDelete(address.getIsDelete());
                addressDtos.add(addressDto);
            }
            
          
            
            
        }
        userDto.setAddress(addressDtos);
        return userDto;
    }

    private VehicleDto convertToVehicleDto(VehicleEntity vehicle) {
        VehicleDto vehicleDto = new VehicleDto();
        vehicleDto.setName(vehicle.getName());
        vehicleDto.setPricePerDay(vehicle.getPricePerDay());
        vehicleDto.setRegistrationNumber(vehicle.getRegistrationNumber());
        vehicleDto.setType(vehicle.getType());
        vehicleDto.setModifiedTime(vehicle.getModifiedTime());
        vehicleDto.setIsDelete(vehicle.getIsDelete());
        vehicleDto.setId(vehicle.getId());
        vehicleDto.setCreatedBy(vehicle.getCreatedBy());
        vehicleDto.setCreatedTime(vehicle.getCreatedTime());
        vehicleDto.setModifiedBy(vehicle.getModifiedBy());
        return vehicleDto;
    }
    
    
  
    
    
    
}
