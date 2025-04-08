package com.vehicleService.repository.UserMaster;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.vehicleService.dto.UserMaster.UserMasterDto;
import com.vehicleService.entity.UserMaster.UserMasterEntity;
import com.vehicleService.entity.user.UserEntity;

public interface UserMasterRepository extends JpaRepository<UserMasterEntity, Long> {

	Optional<UserMasterEntity> findByUserMasterIdAndIsDelete(Long id, String string);

	@Query("SELECT u FROM UserMasterEntity u WHERE u.userName = :userName AND u.userPassword = :userPassword")
    Optional<UserMasterEntity> findByUserNameAndUserPassword(@Param("userName") String userName, @Param("userPassword") String userPassword);
	
	@Query("SELECT u FROM UserMasterEntity u WHERE u.userName = :userName")
	Optional<UserMasterEntity> findUserName(String userName);
	
	
   // Optional<UserMasterEntity> findByUserName(String userName);
	@Query("SELECT u FROM UserMasterEntity u WHERE u.userId = :userId")
	UserMasterEntity findByUserId(Long userId);
	



	//UserMasterEntity saveAll(Long id);
    // Additional query methods can be defined here if needed
}
