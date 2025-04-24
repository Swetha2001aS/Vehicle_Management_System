
$(document).ready(function () {
  // Sidebar hover effect
  $("#sidebar").hover(
    function () { $(this).addClass("expanded"); },
    function () { $(this).removeClass("expanded"); }
  );

  // Active menu highlight
  $(".sidebar .nav-link").on("click", function () {
    $(".sidebar .nav-link").removeClass("active");
    $(this).addClass("active");
  });

  // Set welcome message using user's first name from localStorage
  const userFirstName = localStorage.getItem("firstName") || "User";
  $("#welcomeUser").text(`Welcome, ${userFirstName}`);

  // Logout
  $("#logoutLink").click(function (e) {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "../index.html";
  });

  // Handle View All User button
  $('#viewUserBtn, .action-btn:contains("View User List")').click(function (e) {
    e.preventDefault();
    $('#mainContent').load('./view_all_user.html').show();
    $('#profileSection, .about-section,#vehicleViewContainer').hide();

  });

  // Handle User Role button click
$('.action-btn:contains("User Role")').click(function (e) {
  e.preventDefault();
  $('#mainContent').load('./user_role.html').show(); // Load user_role.html
  $('#profileSection, .about-section,#vehicleViewContainer').hide(); // Hide other sections
});


// Handle Add Vehicle button click
$('.action-btn:contains("Add Vehicles")').click(function (e) {
  e.preventDefault();
  $('#mainContent').load('../HTML/add_vehicle.html').show(); // your form page
  $('#profileSection, .about-section,#vehicleViewContainer').hide();
});




  // Show Home Section
  $('#homeLink').on('click', function (e) {
    // e.preventDefault();
    // $('.nav-link').removeClass('active');
    // $(this).addClass('active');

    // $('#profileSection, .about-section').hide();
    // $('.home-section').show();
    window.location.href="./dashboard.html";
  });

  // Show Profile Section
  $('#profileLink').on('click', function (e) {
    e.preventDefault();
    $('.nav-link').removeClass('active');
    $(this).addClass('active');

    $('#mainContent, .about-section,#vehicleViewContainer').hide();
    $('#profileSection').show();
  });

  // Show Vehicle Section
$('#vehicleLink').on('click', function (e) {
  e.preventDefault();
  $('.nav-link').removeClass('active');
  $(this).addClass('active');

  $('#mainContent, .about-section, #profileSection').hide();
  $('#vehicleViewContainer').show().load('./view_vehicle_list.html');
});


  // Show About Section
  $('.nav-link:contains("About")').on('click', function (e) {
    e.preventDefault();
    $('.nav-link').removeClass('active');
    $(this).addClass('active');

    $('#mainContent, #profileSection,#vehicleViewContainer').hide();
    $('.about-section').show();
  });

  // Load default Home Section on page load
  $('#mainContent').show();
  $('#profileSection, .about-section,#vehicleViewContainer').hide();



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



  // ----------------upload image --------------------

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
  

$(document).ready(function () {
  const sidebar = $('#sidebar');

  sidebar.on('mouseenter', function () {
    $(this).addClass('expanded');
  });

  sidebar.on('mouseleave', function () {
    $(this).removeClass('expanded');
  });


});

// ------------------dashboard modify  with chart2--------------------

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


    // -------------Registered Users-------------------

    fetch("http://localhost:8080/user/all")
    .then(response => response.json())
    .then(data => {
      const count = data.length;
      document.getElementById("userCount").textContent = count;
    })
    .catch(error => {
      console.error("Error fetching user count:", error);
      document.getElementById("userCount").textContent = "Error";
    });
});

$(document).ready(function () {
  $.ajax({
    url: "http://localhost:8080/vehicles/all",
    method: "GET",
    success: function (data) {
      $(".stat-card-value").text(data.length);
    },
    error: function () {
      console.error("Failed to fetch vehicle data.");
    }
  });
});