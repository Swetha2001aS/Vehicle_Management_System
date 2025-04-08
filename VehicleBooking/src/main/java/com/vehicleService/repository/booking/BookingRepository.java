package com.vehicleService.repository.booking;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.vehicleService.entity.booking.BookingEntity;

@Repository  
public interface BookingRepository extends JpaRepository<BookingEntity, Long> {  

    
    List<BookingEntity> findByUserIdAndIsDeleteFalse(Long userId);
    
//    @Query(value="SELECT ft FROM Booking ft where ft.isDelete = 'N' AND  ")
    @Query("SELECT b FROM BookingEntity b WHERE b.isDelete = false")
    List<BookingEntity> findByIsDeleteFalse();

    @Query("SELECT b FROM BookingEntity b WHERE b.userId = :userId AND b.status = :status AND b.isDelete = false")
    List<BookingEntity> findByUserIdAndStatusAndIsDeleteFalse(@Param("userId") Long userId, @Param("status") String status);

    @Query("SELECT b FROM BookingEntity b WHERE b.userId = :userId AND b.paymentStatus = :paymentStatus AND b.isDelete = false")
    List<BookingEntity> findByUserIdAndPaymentStatusAndIsDeleteFalse(@Param("userId") Long userId, @Param("paymentStatus") String paymentStatus);
}

