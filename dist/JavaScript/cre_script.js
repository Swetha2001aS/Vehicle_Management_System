$(document).ready(function() {
    // Make sure sidebar content is loaded first
    $("#sidebar-placeholder").load("sidebar.html"); // Adjust path as necessary

    // Ensure event handlers are set up after content is loaded


    $("#profileLink").on("click", function(e) {
        e.preventDefault();
        $(".nav-link").removeClass("active");
        $(this).addClass("active");
        $("#profileSection").show().load(".profile.html");
        $("#mainContent, #vehicleViewContainer, .about-section,#banner,#homeSection").hide();
    });

    
});


// -----------------mapping table-------------------------

function handleEnquiryClick() {
    // Redirect to the enquiries page
    window.location.href = "../HTML/cre_view_table.html";
  }
  

  function handleViewBookingsClick() {
    // Redirect to the bookings view page
    window.location.href = "../HTML/cre_viewbookingtable.html";
  }
  




  // jQuery equivalent for handling the click event
  $(document).ready(function() {
    // Bind the click event for the Enquiry button
    $(".action-btn").on("click", function() {
      handleEnquiryClick();
    });

    $(".action-btn2").on("click", function() {
      handleViewBookingsClick();
    });



  });
  