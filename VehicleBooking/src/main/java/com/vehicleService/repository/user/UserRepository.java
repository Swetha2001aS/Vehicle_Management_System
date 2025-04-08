package com.vehicleService.repository.user;



import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.vehicleService.entity.UserMaster.UserMasterEntity;
import com.vehicleService.entity.user.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity , Long>{

	

//	List<UserEntity> findDeletedUsers();
	@Query(value = "SELECT * FROM user_entity WHERE is_delete = N;", nativeQuery = true)

	List<UserEntity> findByIsDeleted();

	UserEntity findByUserId(Long userId);

	UserEntity findByUserId(UserMasterEntity userOptional);

	
//	@Query("SELECT u FROM UserEntity u WHERE u.isDelete = Y")
//	List<UserEntity> findAllIsDelete();
//
//	



}
