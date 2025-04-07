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
						text: district
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




$(document).ready(function () {
    $(".toggle").on("click", function () {
        $(".container").stop().addClass("active");
    });

    $(".close").on("click", function () {
        $(".container").stop().removeClass("active");
    });

    // FORM VALIDATION
    $("#registrationForm").validate({
        rules: {
            firstname: "required",
            lastname: "required",
            phone: {
                required: true,
                digits: true,
                minlength: 10,
                maxlength: 10
            },
            country: "required",
            pincode: {
                required: true,
                digits: true,
                minlength: 6,
                maxlength: 6
            },
            role: "required",
            email: {
                required: true,
                email: true
            },
            username: {
                required: true,
                minlength: 3
            },
            password: {
                required: true,
                minlength: 6
            },
            confirm_password: {
                required: true,
                equalTo: "#password" // Ensure your password field has id="password"
            }
        },
        messages: {
            firstname: "Please enter your first name",
            lastname: "Please enter your last name",
            phone: {
                required: "Please enter your phone number",
                digits: "Only numbers are allowed",
                minlength: "Phone number must be 10 digits",
                maxlength: "Phone number must be 10 digits"
            },
            country: "Please select your country",
            pincode: {
                required: "Please enter your pincode",
                digits: "Only numbers are allowed",
                minlength: "Pincode must be 6 digits",
                maxlength: "Pincode must be 6 digits"
            },
            role: "Please select a user role",
            email: {
                required: "Please enter your email",
                email: "Enter a valid email address"
            },
            username: {
                required: "Please enter a username",
                minlength: "Username must be at least 3 characters long"
            },
            password: {
                required: "Please provide a password",
                minlength: "Password must be at least 6 characters long"
            },
            confirm_password: {
                required: "Please confirm your password",
                equalTo: "Passwords do not match"
            }
        }
    });

    // Prevent default form submission and check validation
    $("#registrationForm").submit(function (event) {
        event.preventDefault(); // Prevents form submission
        if ($(this).valid()) {
            console.log("Form submitted!");
            this.submit(); // Uncomment this to allow actual submission
        }
    });
});

