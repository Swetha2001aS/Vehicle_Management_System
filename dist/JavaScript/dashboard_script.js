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


   // Load view_all_user.html inside #mainContent
   $('#viewUserBtn').click(function () {
    $('#mainContent').load('./view_all_user.html');
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
  
    // Home section default visible
    $("#profileSection").hide();
  
    // Profile click

   // Show Profile Section
  $('#profileLink').on('click', function (e) {
    e.preventDefault();
    $('.nav-link').removeClass('active');
    $(this).addClass('active');

    $('.home-section').hide();     // Hide home buttons
    $('#profileSection').show();  // Show profile


    //---------------------------------
    });

    //section controll
    $('#homeLink').on('click', function (e) {
        e.preventDefault();
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
    
        $('.home-section').show();     // Show home buttons
        $('#profileSection').hide();  // Hide profile
      });

});
$(document).ready(function () {
  $("#profileUserId").text(localStorage.getItem("userId") || "Not Available");
  $("#profileFirstName").text(localStorage.getItem("firstName") || "Not Available");
  $("#profileLastName").text(localStorage.getItem("lastName") || "Not Available");
  $("#profileEmail").text(localStorage.getItem("userEmail") || "Not Available");
  $("#profilePhone").text(localStorage.getItem("userPhoneNumber") || "Not Available");


  let addressList = [];
  try {
    addressList = JSON.parse(localStorage.getItem("address")) || [];
    console.log("Parsed Address List from localStorage:", addressList);
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


//-------------username _ top right ------------------
document.addEventListener("DOMContentLoaded", function () {
  $("#homeLink").click(function (e) {
    e.preventDefault();
    $("#mainContent").html("<h2>Welcome to Dashboard</h2>");
  });

  $("#profileLink").click(function (e) {
    e.preventDefault();
    $("#mainContent").html($("#profileSection").html());
  });

  $(".action-btn").click(function (e) {
    if ($(this).text().includes("View User List")) {
      e.preventDefault();
      $("#mainContent").load("./view_all_user.html");
    }
  });
});


























  