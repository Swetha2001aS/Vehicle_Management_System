$(document).ready(function () {
    // Load navbar
    $("#navbar-placeholder").load("../HTML/navbar.html", function () {
        // Set welcome message
        const userFirstName = localStorage.getItem("firstName") || "User";
        $("#welcomeUser").text(`Welcome, ${userFirstName}`);

        // Logout functionality
        $("#logoutLink").on("click", function (e) {
            e.preventDefault();
            // Clear user data from localStorage
            localStorage.clear();
            // Redirect to login page
            window.location.href = "../index.html";
        });
    });

    // Load sidebar
    $("#sidebar-placeholder").load("../HTML/sidebar.html", function () {
        // Sidebar hover effect
        $("#sidebar").hover(
            function () {
                $(this).addClass("expanded");
            },
            function () {
                $(this).removeClass("expanded");
            }
        );

        // Navigation link click handlers
        $("#homeLink").on("click", function (e) {
            e.preventDefault();
            $(".nav-link").removeClass("active");
            $(this).addClass("active");
        
            // Show home content
            $("#mainContent").show().load("../HTML/view_vehicle_list.html"); // Keep this for vehicle list
            $("#banner").show(); // Show banner and footer
            $("#profileSection, #vehicleViewContainer, .about-section").hide(); // Hide others
        });

        $("#profileLink").on("click", function (e) {
            e.preventDefault();
            $(".nav-link").removeClass("active");
            $(this).addClass("active");
            $("#profileSection").show().load(".profile.html");
            $("#mainContent, #vehicleViewContainer, .about-section,#banner").hide();
        });

        $("#vehicleLink").on("click", function (e) {
            e.preventDefault();
            $(".nav-link").removeClass("active");
            $(this).addClass("active");
            $("#vehicleViewContainer").show().load("../HTML/view_vehicle_list.html");
            $("#mainContent, #profileSection, .about-section,#banner").hide();
        });

        $("#aboutLink").on("click", function (e) {
            e.preventDefault();
            $(".nav-link").removeClass("active");
            $(this).addClass("active");
            $(".about-section").show().load("about.html");
            $("#mainContent, #profileSection, #vehicleViewContainer,#banner").hide();
        });

        // // Show Profile Section
        // $('#profileLink').on('click', function (e) {
        //     e.preventDefault();
        //     $('.nav-link').removeClass('active');
        //     $(this).addClass('active');
        //     $('#mainContent, .about-section, #vehicleViewContainer,#banner').hide();
        //     $('#profileSection').show();
        // });
// Load default Home Section on page load
// $('#mainContent').show();
// $('#profileSection, .about-section,#vehicleViewContainer').hide();

// Trigger default navigation
$("#homeLink").trigger("click");



  // Fill profile details
  $("#profileUserId").text(localStorage.getItem("userId") || "Not Available");
  $("#profileFirstName").text(localStorage.getItem("firstName") || "Not Available");
  $("#profileLastName").text(localStorage.getItem("lastName") || "Not Available");
  $("#profileEmail").text(localStorage.getItem("userEmail") || "Not Available");
  $("#profilePhone").text(localStorage.getItem("userPhoneNumber") || "Not Available");

  // Load addresses
  let addressList = [];
  try {
    addressList = JSON.parse(localStorage.getItem("addressDto")) || [];
  } catch (e) {
    console.error("Error parsing addressDto from localStorage:", e);
  }

  let addressHtml = "<h4>Addresses:</h4>";
  if (addressList.length === 0) {
    addressHtml += "<p>No addresses found.</p>";
  } else {
    $.each(addressList, function (index, addr) {
      addressHtml += `<p>${addr.nation}, ${addr.state}, ${addr.district}, ${addr.pincode}</p>`;
    });
  }

  $("#profileUserAddress").html(addressHtml);


    });

    // -------------------------------------------------------------------------------------------
    // Profile Section functionality
    // function loadProfileDetails() {
        // var userId = localStorage.getItem("userId");

        // if (!userId) return;

        // // Display Profile Picture
        // $.ajax({
        //     url: "http://localhost:8080/user/" + userId + "/profileImage",
        //     type: "GET",
        //     xhrFields: {
        //         responseType: 'blob'
        //     },
        //     success: function (data) {
        //         var url = URL.createObjectURL(data);
        //         $('#profileImage').attr('src', url).show();
        //         $('#userIcon').hide();
        //     },
        //     error: function () {
        //         console.log("Profile image not found. Using default icon.");
        //     }
        // });


        // Load Addresses
    //     let addressList = [];
    //     try {
    //         addressList = JSON.parse(localStorage.getItem("addressDto")) || [];
    //     } catch (e) {
    //         console.error("Error parsing addressDto from localStorage:", e);
    //     }

    //     let addressHtml = "<h4>Addresses:</h4>";
    //     if (addressList.length === 0) {
    //         addressHtml += "<p>No addresses found.</p>";
    //     } else {
    //         $.each(addressList, function (index, addr) {
    //             addressHtml += `<p>${addr.nation}, ${addr.state}, ${addr.district}, ${addr.pincode}</p>`;
    //         });
    //     }

    //     $("#profileUserAddress").html(addressHtml);
    // }

    // Upload Image functionality
    // $('#uploadImageLink').on('click', function (e) {
    //     e.preventDefault();
    //     $('#mainContent').load('../HTML/upload_image.html');
    // });

    // Dropdown click functionality (Profile Icon Dropdown)
    // $("#userDropdown").on("click", function (e) {
    //     e.stopPropagation();
    //     $(this).find(".dropdown-menu").toggle();
    // });

    // Hide dropdown if clicked outside
    // $(document).on("click", function (e) {
    //     if (!$(e.target).closest('.dropdown').length) {
    //         $(".dropdown-menu").hide();
    //     }
    // });

    // Display user profile image (if available) or default icon
//     var userId = localStorage.getItem("userId");

//     if (userId) {
//             // Fetch profile image for the user
// $.ajax({
//     url: 'http://localhost:8080/user/119/profileImage',
//     type: 'GET',
//     success: function(data) {
//         // If the image is found, set the profile image
//         $('#profileImage').attr('src', data);
//     },
//     error: function() {
//         // If the image is not found (404), use a default image
//         $('#profileImage').attr('src', 'path/to/default-image.png'); // Replace with your default image path
//         console.log('Profile image not found. Using default icon.');
//     }
// });

//     }

    // Logout functionality
    $("#logoutLink").on("click", function (e) {
        e.preventDefault();
        localStorage.clear();
        window.location.href = "../index.html";
    });


});

$(document).ready(function () {
    // Load upload image page into main content area
    $('a[href="../HTML/upload_image.html"]').on('click', function (e) {
      e.preventDefault();
      $('.nav-link').removeClass('active');
      $('#mainContent').load('../HTML/upload_image.html');
    });
  });
  
    // --------display profile pic -------------
    $(document).ready(function () {
      var userId = localStorage.getItem("userId"); // Or get from session if different
  
      if (!userId) return;
  
      $.ajax({
          url: "http://localhost:8080/user/" + userId + "/profileImage",
          type: "GET",
          xhrFields: {
              responseType: 'blob'
          },
          success: function (data) {
              var url = URL.createObjectURL(data);
              $('#profileImage').attr('src', url).show();
              $('#userIcon').hide();
          },
          error: function () {
              // Show default icon if image not found
              console.log("Profile image not found. Using default icon.");
          }
      });
  });
    
