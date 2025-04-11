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
  
    $(document).on("click", ".view-user", function () {
      const userId = $(this).closest('tr').data('user-id');
      localStorage.setItem('selectedUserId', userId);
      window.location.href = 'viewdetails.html';
    });
  });
  
  function editUser(id) {
    alert("Edit user with ID: " + id);
  }
  