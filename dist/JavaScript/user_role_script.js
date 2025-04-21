$(document).ready(function () {
    let roles = [];
  
    // Fetch all roles first
    $.get("http://localhost:8080/sales/user-role", function (data) {
        roles = data;
        console.log(roles);
  
      // After roles are loaded, fetch users
      $.get("http://localhost:8080/user/all", function (users) {
        let tbody = $('#userRoleTable tbody');
        tbody.empty(); // Clear existing rows
  
        users.forEach(user => {
          // Fetch the roleId and roleName from user data
          const userRoleId = user.usermasterdto && user.usermasterdto.userRoleId; // Get the userRoleId
          const currentRole = userRoleId ? roles.find(role => role.userRoleId === userRoleId)?.roleName : 'No Role Assigned'; // Find roleName based on userRoleId
  
          // Construct table rows dynamically
          let row = `
            <tr>
              <td>${user.userId}</td>
              <td>${user.firstName}</td>
              <td id="currentRole-${user.userId}">${currentRole}</td> <!-- Current Role Column -->
              <td>
                <select class="role-select" data-userid="${user.userId}">
                  ${roles.map(role => {
                    // If role matches current roleId, mark it as selected
                    const selected = (role.userRoleId === userRoleId) ? 'selected' : '';
                    return `<option value="${role.userRoleId}" ${selected}>${role.roleName}</option>`;
                  }).join('')}
                </select>
              </td>
              <td><button class="assign-btn" data-userid="${user.userId}">Assign</button></td>
            </tr>
          `;
          tbody.append(row);
        });
      });
    });
  
    // Handle assign button click
    $(document).on('click', '.assign-btn', function () {
      const userId = $(this).data('userid');
      const selectedRoleId = $(this).closest('tr').find('.role-select').val(); // Get the userRoleId
  
      // First, fetch the full user object by ID
      $.get(`http://localhost:8080/user/${userId}`, function (userData) {
        if (!userData.usermasterdto) {
          userData.usermasterdto = {};
        }
  
        // Update userRoleId (save the selected userRoleId)
        userData.usermasterdto.userRoleId = selectedRoleId;
  
        // Populate userDto (if expected by backend)
        userData.usermasterdto.userDto = {
          userId: userData.userId,
          firstName: userData.firstName,
          lastName: userData.lastName,
          userPhoneNumber: userData.userPhoneNumber,
          userEmail: userData.userEmail
        };
  
        // Ensure userId is set in usermasterdto
        userData.usermasterdto.userId = userData.userId;
  
        // POST updated data to the API
        $.ajax({
          url: "http://localhost:8080/api/Users_master/",
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(userData),
          success: function () {
            alert(`Role with ID '${selectedRoleId}' assigned to user ${userId}`);
  
            // After assigning, update the current role column dynamically
            const selectedRole = roles.find(role => role.userRoleId == selectedRoleId);
            $(`#currentRole-${userId}`).text(selectedRole ? selectedRole.roleName : 'No Role Assigned');
          },
          error: function () {
            alert('Failed to assign role');
          }
        });
      });
    });
  });
  