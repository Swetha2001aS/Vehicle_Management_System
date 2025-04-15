
//All USER VIEW PAGE

$(document).ready(function () {
    $.ajax({
      url: "http://localhost:8080/user/all",
      method: "GET",
      contentType: "application/json",
      success: function (data) {
        const tbody = $("#userTable tbody");
        tbody.empty();
  
        if (data.length === 0) {
          tbody.append("<tr><td colspan='6'>No users found.</td></tr>");
        } else {
          data.forEach(function (user) {
            const row = `
  <tr data-user-id="${user.userId}">
    <td>${user.userId}</td>
    <td>${user.firstName}</td>
    <td>${user.lastName}</td>
    <td>${user.userEmail}</td>
    <td>${user.userPhoneNumber}</td>
    <td>
      <i class="fa fa-eye view-user" title="View" style="cursor:pointer;"></i>
      <i class="fas fa-edit action-icon" title="Edit" onclick="editUser(${user.userId})"></i>
      <i class="fas fa-trash-alt delete-btn action-icon" title="Delete" data-user-id="${user.userId}"></i>
    </td>
  </tr>`;

            tbody.append(row);
          });
        }
      },
      error: function () {
        alert("Error fetching users.");
      }
    });
  

    //delete
    $(document).on("click", ".delete-btn", function () {
      const userId = $(this).data("user-id");
      if (confirm("Are you sure you want to delete this user?")) {
        $.ajax({
          url: `http://localhost:8080/user/${userId}`,
          type: "DELETE",
          success: function () {
            alert("User deleted!");
            $(`tr[data-user-id='${userId}']`).remove();
          },
          error: function () {
            alert("Failed to delete user.");
          }
        });
      }
    });
  

    // //view
    // $(document).on("click", ".view-user", function () {
    //   const userId = $(this).closest('tr').data('user-id');
    //   localStorage.setItem('selectedUserId', userId);
    //   window.location.href = 'view_particular_user.html';
    // });
  });
  
  function editUser(id) {
    alert("Edit user with ID: " + id);
  }


  $(document).on("click", ".view-user", function () {
    const userId = $(this).closest('tr').data('user-id');
  
    // Get user data from the same row
    const row = $(this).closest('tr');
    const firstName = row.find("td:eq(1)").text();
    const lastName = row.find("td:eq(2)").text();
    const email = row.find("td:eq(3)").text();
    const phone = row.find("td:eq(4)").text();
  
    // Fill popup data
    $("#popupUserId").text(userId);
    $("#popupFirstName").text(firstName);
    $("#popupLastName").text(lastName);
    $("#popupEmail").text(email);
    $("#popupPhone").text(phone);
  
// Fetch address from backend
$(document).on("click", ".view-user", function () {
  const userId = $(this).closest('tr').data('user-id');
  const row = $(this).closest('tr');

  $("#popupUserId").text(userId);
  $("#popupFirstName").text(row.find("td:eq(1)").text());
  $("#popupLastName").text(row.find("td:eq(2)").text());
  $("#popupEmail").text(row.find("td:eq(3)").text());
  $("#popupPhone").text(row.find("td:eq(4)").text());

  // Fetch address from backend
  $.ajax({
    url: `http://localhost:8080/user/${userId}`,  // ✅ change to /user/{userId}
    method: 'GET',
    success: function (user) {
      // Set user details
      $("#popupUserId").text(user.userId);
      $("#popupFirstName").text(user.firstName);
      $("#popupLastName").text(user.lastName);
      $("#popupEmail").text(user.userEmail);
      $("#popupPhone").text(user.userPhoneNumber);
  
      // Show addresses
      const addresses = user.address;
      let addressHtml = "";
      if (!addresses || addresses.length === 0) {
        addressHtml = "<p>No addresses found.</p>";
      } else {
        addressHtml = addresses.map((addr, index) => `
          <div class="address-item">
            <strong>Address ${index + 1}</strong>
            <p>Nation: ${addr.nation || '-'}</p>
            <p>State: ${addr.state || '-'}</p>
            <p>District: ${addr.district || '-'}</p>
            <p>Pincode: ${addr.pincode || '-'}</p>
          </div>
        `).join("");
      }
      $("#addressList").html(addressHtml);
      $("#userPopupOverlay").css("display", "flex");
    },
    error: function () {
      $("#addressList").html("<p>Error loading user data.</p>");
    }
  });
  
  });
  $(document).on("click", "#closePopup", function () {
    $("#userPopupOverlay").css("display", "none");
    $("body").css("overflow", "hidden"); // disable scroll

  });
});
