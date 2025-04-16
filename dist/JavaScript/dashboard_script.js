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
    $('#profileSection, .about-section').hide();

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

    $('#mainContent, .about-section').hide();
    $('#profileSection').show();
  });

  // Show About Section
  $('.nav-link:contains("About")').on('click', function (e) {
    e.preventDefault();
    $('.nav-link').removeClass('active');
    $(this).addClass('active');

    $('#mainContent, #profileSection').hide();
    $('.about-section').show();
  });

  // Load default Home Section on page load
  $('#mainContent').show();
  $('#profileSection, .about-section').hide();



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
  



});


