$(document).ready(function() {
	$(".toggle").on("click", function() {
		$(".container").stop().addClass("active");
	});

	$(".close").on("click", function() {
		$(".container").stop().removeClass("active");
	});

	// Country-State-District data
	const countryData = {
		"USA": {
			"California": ["Los Angeles", "San Francisco", "San Diego"],
			"New York": ["Manhattan", "Brooklyn", "Queens"],
			"Texas": ["Houston", "Dallas", "Austin"]
		},
		"IND": {
			"Kerala": ["Thiruvananthapuram", "Kollam", "Pathanamthitta", "Alappuzha",
				"Kottayam", "Idukki", "Ernakulam", "Thrissur",
				"Palakkad", "Malappuram", "Kozhikode", "Wayanad",
				"Kannur", "Kasaragod"],
			"Maharashtra": ["Mumbai", "Pune", "Nagpur"],
			"Karnataka": ["Bangalore", "Mysore", "Hubli"],
			"Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"]
		},
		"UK": {
			"England": ["London", "Manchester", "Birmingham"],
			"Scotland": ["Edinburgh", "Glasgow", "Aberdeen"],
			"Wales": ["Cardiff", "Swansea", "Newport"]
		},
		"CAN": {
			"Ontario": ["Toronto", "Ottawa", "Mississauga"],
			"Quebec": ["Montreal", "Quebec City", "Laval"],
			"British Columbia": ["Vancouver", "Victoria", "Surrey"]
		},
		"AUS": {
			"New South Wales": ["Sydney", "Newcastle", "Wollongong"],
			"Victoria": ["Melbourne", "Geelong", "Ballarat"],
			"Queensland": ["Brisbane", "Gold Coast", "Cairns"]
		}
	};

	// Initialize existing sections
	$('.address-section').each(function() {
		initAddressSection($(this));
	});

	// Add new address section
	$('.add-address-btn').on('click', function() {
		const $addressContainer = $('.address-container');
		const $newSection = $('.address-section').first().clone();

		// Reset all fields
		resetAddressSection($newSection);

		$addressContainer.append($newSection);
		initAddressSection($newSection);
	});

	// Reset section fields
	function resetAddressSection($section) {
		$section.find('.country-select').prop('selectedIndex', 0);

		const $stateSelect = $section.find('.state-select');
		$stateSelect.html('<option value="" disabled selected>Select Country First</option>');
		$stateSelect.prop('disabled', true);

		const $districtSelect = $section.find('.district-select');
		$districtSelect.html('<option value="" disabled selected>Select State First</option>');
		$districtSelect.prop('disabled', true);

		$section.find('input[type="text"]').val('');
	}

	// Initialize event handlers for a section
	function initAddressSection($section) {
		const $countrySelect = $section.find('.country-select');
		const $stateSelect = $section.find('.state-select');
		const $districtSelect = $section.find('.district-select');

		// Country change handler
		$countrySelect.on('change', function() {
			const country = $(this).val();

			if (country && countryData[country]) {
				$stateSelect.prop('disabled', false);
				$stateSelect.html('<option value="" disabled selected>Select State</option>');

				// Populate states
				$.each(countryData[country], function(state) {
					$stateSelect.append($('<option>', {
						value: state,
						text: state
					}));
				});

				// Reset district
				$districtSelect.html('<option value="" disabled selected>Select State First</option>');
				$districtSelect.prop('disabled', true);
			} else {
				$stateSelect.html('<option value="" disabled selected>Select Country First</option>');
				$stateSelect.prop('disabled', true);
			}
		});

		// State change handler
		$stateSelect.on('change', function() {
			const country = $countrySelect.val();
			const state = $(this).val();

			if (country && state && countryData[country]?.[state]) {
				$districtSelect.prop('disabled', false);
				$districtSelect.html('<option value="" disabled selected>Select District</option>');

				// Populate districts
				$.each(countryData[country][state], function(index, district) {
					$districtSelect.append($('<option>', {
						value: district,
						text: district,
					}));
				});
			} else {
				$districtSelect.html('<option value="" disabled selected>Select State First</option>');
				$districtSelect.prop('disabled', true);
			}
		});
	}

	// Remove address section
	$('.address-container').on('click', '.remove-address-btn', function(e) {
		if ($('.address-section').length > 1) {
			$(this).closest('.address-section').remove();
		}
	});

	// Add has-value class on select change
	$('.address-section .input-container select').on('change', function() {
		$(this).toggleClass('has-value', !!$(this).val());
	});
});

	//--------------------------------registration------------------------------------

	$(document).ready(function() {

		// Apply validation to the registration form
		$("#registrationForm").validate({
	  
		  // Error styling
		  errorElement: "span", // Show errors in <span> tag
		  errorClass: "error-text", // Custom class for styling error messages
		  focusInvalid: false,
	  
		  // Validation rules for each field
		  rules: {
			firstname: "required", // First name is required
			lastname: "required",  // Last name is required
			phone: {
			  required: true,
			  digits: true,
			  minlength: 10,
			  maxlength: 15
			},
			email: {
			  required: true,
			  email: true
			},
			username: "required",
			password: {
			  required: true,
			  minlength: 6
			},
			confirm_password: {
			  required: true,
			  equalTo: "#register-password" // Must match password field
			},
			country: "required",
			role: "required",
			pincode: {
			  required: true,
			  digits: true,
			  minlength: 6,
			  maxlength: 6
			}
		  },
	  
		  // Error messages for each field
		  messages: {
			firstname: "Enter your first name",
			lastname: "Enter your last name",
			phone: {
			  required: "Phone number is required",
			  digits: "Enter valid digits only",
			  minlength: "Too short",
			  maxlength: "Too long"
			},
			email: "Enter a valid email address",
			username: "Enter a username",
			password: {
			  required: "Enter a password",
			  minlength: "Minimum 6 characters"
			},
			confirm_password: {
			  required: "Please confirm your password",
			  equalTo: "Passwords do not match"
			},
			country: "Please select a country",
			role: "Select a role",
			pincode: {
			  required: "Enter a pincode",
			  digits: "Only digits allowed",
			  minlength: "Minimum 6 digits",
			  maxlength: "Maximum 6 digits"
			}
		  },
	  
		  // Highlight field when error is shown
		  highlight: function(e) {
			$(e).closest('.form-group')
			  .removeClass('has-info')
			  .addClass('has-error');
		  },
	  
		  // On successful validation, remove error highlight
		  success: function(e) {
			$(e).closest('.form-group')
			  .removeClass('has-error');
			$(e).remove();
		  },
	  
		  // When form is valid and submitted
		  submitHandler: function(form) {
	  
			// Collect all form values
			const signupData = {
			  userId: 0,
			  firstName: $(".firstname").val(),
			  lastName: $(".lastname").val(),
			  userPhoneNumber: $(".phone").val(),
			  userEmail: $("#email").val(),
	  
			  // Nested object for login-related info
			  usermasterdto: {
				userName: $("#register-username").val(),
				userPassword: $("#register-password").val(),
				userRole: $("#user-role").val()
			  },
	  
			  // Loop through all address sections
			  address: $(".address-section").map(function() {
				return {
				  nation: $(this).find(".country-select").val(),
				  state: $(this).find(".state-select").val(),
				  district: $(this).find(".district-select").val(),
				  pincode: $(this).find("#pincode").val()
				};
			  }).get()
			};
	  
			console.log("-----------", signupData);
	  
			// Send signup data to the server
			$.ajax({
			  url: "http://localhost:8080/user/",
			  type: "POST",
			  contentType: "application/json",
			  data: JSON.stringify(signupData),
			  success: function(response) {
				alert("Signup successful!");
				window.location.href = "../index.html";
			  },
			  error: function(xhr) {
				alert("Signup failed: " + xhr.responseText);
			  }
			});
		  }
		});
	  });
	  
	//-------------------------------login--------------------------------------------	

	//login
	$(document).ready(function() {
		$("form.login").validate({
			errorElement: 'p',
			errorClass: 'red',
			errorElement: "span",
			errorClass: "error-text",
			rules: {
				username: {
					required: true
				},
				password: {
					required: true,
					minlength: 6
				}
			},
			messages: {
				username: "* Username is required",
				password: {
					required: "* Password is required",
					minlength: "* Password must be at least 6 characters"
				}
			},
			highlight: function(element) {
				$(element).addClass("error");
			},
			unhighlight: function(element) {
				$(element).removeClass("error");
			},
			errorPlacement: function(error, element) {
				error.insertAfter(element);
			},
			submitHandler: function(form) {
				const loginData = {
					userName: $("#username").val(),
					userPassword: $("#password").val()
				};

				$.ajax({
					url: "http://localhost:8080/api/Users_master/login",
					type: "POST",
					contentType: "application/json",
					data: JSON.stringify(loginData),
					success: function(response) {

						console.log("Login Response:", response);

          				const firstName = response.firstName || "";
          				const lastName = response.lastName || "";
          				const fullName = (firstName + " " + lastName).trim();
						localStorage.setItem("userId", response.userId);
						localStorage.setItem("firstName", response.firstName);
						localStorage.setItem("lastName", response.lastName);
						localStorage.setItem("userPhoneNumber", response.userPhoneNumber);
						localStorage.setItem("userEmail", response.userEmail);
						localStorage.setItem("userName", response.userName);
						localStorage.setItem("userPassword", loginData.userPassword); // password from input
						

					
						alert("Login successful!");
						window.location.href = "./HTML/dashboard.html";
					},
					error: function(xhr, status, error) {
						console.log("Error Status:", status);
						console.log("Error:", error);
						console.log("Full Response:", xhr.responseText);
						alert("Invalid username or password");
					}
				});
			}
		});
	});
	

