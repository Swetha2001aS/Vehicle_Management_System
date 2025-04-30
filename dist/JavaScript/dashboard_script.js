// -----------------------ADMIN DASHBOARD--------------------------------

$(document).ready(function () {

  // Sidebar hover effect
  $("#sidebar").hover(
    function () { $(this).addClass("expanded"); },
    function () { $(this).removeClass("expanded"); }
  );

  // Sidebar hover via mouseenter/mouseleave (repeated logic removed)
  const sidebar = $('#sidebar');
  sidebar.on('mouseenter', function () { $(this).addClass('expanded'); });
  sidebar.on('mouseleave', function () { $(this).removeClass('expanded'); });

  // Active menu highlight
  $(".sidebar .nav-link").on("click", function () {
    $(".sidebar .nav-link").removeClass("active");
    $(this).addClass("active");
  });

  // Set welcome message using user's first name
  const userFirstName = localStorage.getItem("firstName") || "User";
  $("#welcomeUser").text(`Welcome, ${userFirstName}`);

  // Logout
  $("#logoutLink").click(function (e) {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "../index.html";
  });

  // View All Users
  $('#viewUserBtn, .action-btn:contains("View User List")').click(function (e) {
    e.preventDefault();
    $('#mainContent').load('./view_all_user.html').show();
    $('#profileSection, .about-section, #vehicleViewContainer, #deliveredBookingsContainer').hide();
  });

  // User Role
  $('.action-btn:contains("User Role")').click(function (e) {
    e.preventDefault();
    $('#mainContent').load('./user_role.html').show();
    $('#profileSection, .about-section, #vehicleViewContainer, #deliveredBookingsContainer').hide();
  });

  // Add Vehicle
  $('.action-btn:contains("Add Vehicles")').click(function (e) {
    e.preventDefault();
    $('#mainContent').load('../HTML/add_vehicle.html').show();
    $('#profileSection, .about-section, #vehicleViewContainer, #deliveredBookingsContainer').hide();
  });

  // Home Link
  $('#homeLink').on('click', function (e) {
    window.location.href = "./dashboard.html";
  });

  // Profile Link
  $('#profileLink').on('click', function (e) {
    e.preventDefault();
    $('.nav-link').removeClass('active');
    $(this).addClass('active');
    $('#mainContent, .about-section, #vehicleViewContainer, #deliveredBookingsContainer').hide();
    $('#profileSection').show();
  });

  // Vehicle Link
  $('#vehicleLink').on('click', function (e) {
    e.preventDefault();
    $('.nav-link').removeClass('active');
    $(this).addClass('active');
    $('#mainContent, .about-section, #profileSection, #deliveredBookingsContainer').hide();
    $('#vehicleViewContainer').show().load('./view_vehicle_list.html');
  });

  // Delivered Bookings Link
  $('#deliveredBookingsLink').on('click', function (e) {
    e.preventDefault();
    $('.nav-link').removeClass('active');
    $(this).addClass('active');
    $('#mainContent, .about-section, #profileSection, #vehicleViewContainer').hide();
    $('#deliveredBookingsContainer').show().load('./view_delivered_bookings.html');
  });

  // About Section
  $('.nav-link:contains("About")').on('click', function (e) {
    e.preventDefault();
    $('.nav-link').removeClass('active');
    $(this).addClass('active');
    $('#mainContent, #profileSection, #vehicleViewContainer, #deliveredBookingsContainer').hide();
    $('.about-section').show();
  });

  // Initial Section Display
  $('#mainContent').show();
  $('#profileSection, .about-section, #vehicleViewContainer, #deliveredBookingsContainer').hide();

  // Profile Details
  $("#profileUserId").text(localStorage.getItem("userId") || "Not Available");
  $("#profileFirstName").text(localStorage.getItem("firstName") || "Not Available");
  $("#profileLastName").text(localStorage.getItem("lastName") || "Not Available");
  $("#profileEmail").text(localStorage.getItem("userEmail") || "Not Available");
  $("#profilePhone").text(localStorage.getItem("userPhoneNumber") || "Not Available");

  // User Address
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

  // Upload Image Page Load
  $('a[href="../HTML/upload_image.html"]').on('click', function (e) {
    e.preventDefault();
    $('.nav-link').removeClass('active');
    $('#mainContent').load('../HTML/upload_image.html');
  });

  // Display Profile Picture
  var userId = localStorage.getItem("userId");
  if (userId) {
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
        console.log("Profile image not found. Using default icon.");
      }
    });
  }

  // ------------------ Dashboard Charts --------------------
  const ctx1 = document.getElementById('vehicleChart');
  new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: ['Car A', 'Car B', 'Car C', 'Car D'],
      datasets: [{
        label: 'No. of Bookings',
        data: [12, 19, 3, 5],
        backgroundColor: '#006a71'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  const ctx2 = document.getElementById('revenueChart');
  new Chart(ctx2, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [{
        label: 'Revenue (in Rs.)',
        data: [5000, 7000, 4000, 9000, 11000],
        fill: false,
        borderColor: '#006a71',
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    }
  });

  // ------------------ Registered User Count --------------------
fetch("http://localhost:8080/user/all")
.then(response => response.json())
.then(data => {
  document.getElementById("userCount").textContent = data.length;
})
.catch(error => {
  console.error("Error fetching user count:", error);
  document.getElementById("userCount").textContent = "Error";
});

// ------------------ Vehicle Count --------------------
$.ajax({
url: "http://localhost:8080/vehicles/all",
method: "GET",
success: function (data) {
  $('#vehicleCount').text(data.length); // Make sure you have an element with id="vehicleCount"
},
error: function () {
  console.error("Failed to fetch vehicle data.");
  $('#vehicleCount').text("Error");
}
});

// ------------------ Active Booking Count --------------------
$(document).ready(function () {
$.get("http://localhost:8080/api/mappings/all", function (data) {
  const deliveredCount = data.filter(item => item.mappingMode === "DELIVERED").length;
  $('#bookingCount').text(deliveredCount); // Element with id="bookingCount"
}).fail(function () {
  console.error("Failed to fetch booking data.");
  $('#bookingCount').text("Error");
});
});



});
