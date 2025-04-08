package com.vehicleService.Controller.booking;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vehicleService.dto.booking.BookingDto;
import com.vehicleService.entity.booking.BookingEntity;
import com.vehicleService.service.booking.BookingService;



@RestController  
@RequestMapping("/api/bookings")  
public class BookingController {  

    @Autowired  
    private BookingService bookingService;  
    @PostMapping("/")
    public ResponseEntity<Long> saveBooking(@RequestBody BookingDto bookingDto) {
        Long bookingId = bookingService.saveBooking(bookingDto);
        return ResponseEntity.ok(bookingId);
    }


    @GetMapping("/{bookingId}")
    public ResponseEntity<BookingEntity> getBookingById(@PathVariable Long bookingId) {
    	BookingEntity booking = bookingService.getBookingById(bookingId);
        return ResponseEntity.ok(booking);
    }


  @GetMapping("/")
  public List<BookingDto> getAllBookings() {
      List<BookingDto> bookings = bookingService.getAllBookings();
      return bookings;
  }


    @DeleteMapping("/{bookingId}")
    public ResponseEntity<String> deleteBooking(@PathVariable Long bookingId) {
        bookingService.deleteBooking(bookingId);
        return ResponseEntity.ok("Booking with ID " + bookingId + " has been deleted successfully.");
    }
    
    @GetMapping("/details/{bookingId}")
    public List<BookingDto> getBookingDetailsById(@PathVariable Long bookingId) {
    	return bookingService.getBookingDetailsById(bookingId);
    }
}
