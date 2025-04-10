$(document).ready(function () {
    // Sidebar hover effect
    $("#sidebar").hover(
      function () { $(this).addClass("expanded"); },
      function () { $(this).removeClass("expanded"); }
    );
  
    // Show Welcome Name
    const fullName = localStorage.getItem("fullName");
    if (fullName) {
      $("#welcomeUser").text(`Welcome, ${fullName}`);
    } 
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


 // $(document).ready(function () {


 //     const userName = localStorage.getItem("userName");
// const userPassword = localStorage.getItem("userPassword");

// if (userName && userPassword) {
//   const loginData = {
//     userName: userName,
//     userPassword: userPassword
//   };

//   $.ajax({
//     url: "http://localhost:8080/api/Users_master/authenticate",
//     type: "POST",
//     contentType: "application/json",
//     data: JSON.stringify(loginData),
//     success: function (user) {
//       const profileHtml = `
//         <div class="profile-header-wide">
//           <h2>${user.firstName} ${user.lastName}</h2>
//           <p>${user.userEmail}</p>
//         </div>
//         <div class="address-wrapper-wide">
//           ${(user.addresses || []).map(addr => `
//             <div class="address-card-wide">
//               <div><span>Nation:</span> ${addr.nation}</div>
//               <div><span>State:</span> ${addr.state}</div>
//               <div><span>District:</span> ${addr.district}</div>
//               <div><span>Pincode:</span> ${addr.pincode}</div>
//             </div>
//           `).join('')}
//         </div>
//       `;
//       $('#userDetails').html(profileHtml);
//     },
//     error: function () {
//       $('#userDetails').html('<p class="text-danger">Failed to fetch user details.</p>');
//     }
//   });



// } else {
//   $('#userDetails').html('<p class="text-danger">Login credentials not found. Please login again.</p>');
// }

// }); 


    //section controll
    $('#homeLink').on('click', function (e) {
        e.preventDefault();
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
    
        $('.home-section').show();     // Show home buttons
        $('#profileSection').hide();  // Hide profile
      });

// Initialize profile
const userdata = localStorage.getItem("loginData");
const user = JSON.parse(userdata);
console.log("User data:", user);

const name = user?.userFirstName || "User";
const profileLetter = name.charAt(0).toUpperCase();
// $("#profileLetter").text(profileLetter);
// $("#welcomeName").text(name);

// Navigation handlers


  // Set profile data from localStorage
  $("#profileUserId").text(user.userId);
  $("#profileFirstName").text(user.FirstName);
  $("#profileLastName").text(user.LastName);
  $("#profileEmail").text(user.userEmail);
  $("#profilePhone").text(user.userPhoneNumber);

  // Display addresses from localStorage (no API)
  const addressList = user.addressDto || [];
  let addressHtml = "<h4>Addresses:</h4>";

  $.each(addressList, function (index, addr) {
    addressHtml += `<p>${addr.city}, ${addr.district}, ${addr.state || ""}, ${addr.country} - ${addr.pincode}</p>`;
  });

  if (addressList.length === 0) {
    addressHtml += "<p>No addresses found.</p>";
  }

  $("#profileUserAddress").html(addressHtml);
});




























  