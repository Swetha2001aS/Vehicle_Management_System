
  function goBack() {
    window.location.href = "view_all_user.html";
  }

  $(document).ready(function () {
     //  Get userId from URL instead of localStorage
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('userId');

  if (!userId) {
    alert("User ID not found.");
    window.location.href = "../login.html"; // or any fallback
    return;
  }

    $.ajax({
      url: `http://localhost:8080/user/${userId}`,
      type: 'GET',
      success: function (data) {
        // Personal Info
        $('#firstname').val(data.firstName);
        $('#lastname').val(data.lastName);
        $('#phone').val(data.userPhoneNumber);
  
        // Account Info
        $('#register-username').val(data.usermasterdto?.userName || "");
        $('#email').val(data.userEmail);
        $('#register-password').val(data.usermasterdto?.userPassword || "");
        $('#confirm_password').val(data.usermasterdto?.userPassword || "");
  
        // Address Info
        if (data.address && data.address.length > 0) {
          const address = data.address[0];
          $('#nation').val(address.nation);
          $('#state').val(address.state);
          $('#district').val(address.district);
          $('#pincode').val(address.pincode);
        }
      },
        error: function () {
            alert('Failed to fetch user details.');
        }
    });


// Toggle password visibility
$('#toggle-password').click(function () {
  const field = $('#register-password');
  const type = field.attr('type') === 'password' ? 'text' : 'password';
  field.attr('type', type);
  $(this).toggleClass('fa-eye fa-eye-slash');
});

$('#toggle-confirm-password').click(function () {
  const field = $('#confirm_password');
  const type = field.attr('type') === 'password' ? 'text' : 'password';
  field.attr('type', type);
  $(this).toggleClass('fa-eye fa-eye-slash');
});

});
