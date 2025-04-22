$(document).ready(function () {
  let roles = [];

  // Fetch all roles first
  $.get("http://localhost:8080/sales/user-role", function (data) {
    roles = data;

    // After roles are loaded, fetch users
    $.get("http://localhost:8080/user/all", function (users) {
      let tbody = $('#userRoleTable tbody');
      tbody.empty(); // Clear existing rows

      users.forEach(user => {
        // Fetch the role and userRoleId properly from userData
        const userRole = user.usermasterdto && user.usermasterdto.userRole || 'No Role Assigned'; // Handle undefined role
        const userRoleId = user.usermasterdto && user.usermasterdto.userRoleId || null; // Handle undefined userRoleId

        // Construct table rows dynamically
        let row = `
          <tr>
            <td>${user.userId}</td>
            <td>${user.firstName}</td>
            <td id="currentRole-${user.userId}">${userRole}</td> <!-- Current Role Column -->
            <td>
              <select class="role-select" data-userid="${user.userId}">
                ${roles.map(role => {
                  // If role matches current role, mark it as selected
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

  $(document).ready(function () {
    let roles = [];
  
    // Fetch all roles first
    $.get("http://localhost:8080/sales/user-role", function (data) {
      roles = data;
  
      // After roles are loaded, fetch users
      $.get("http://localhost:8080/user/all", function (users) {
        let tbody = $('#userRoleTable tbody');
        tbody.empty(); // Clear existing rows
  
        users.forEach(user => {
          const userRole = user.usermasterdto?.userRole;
          const userRoleId = user.usermasterdto?.userRoleId; // Assuming userRoleId is available in user data
  
          let row = `
            <tr>
              <td>${user.userId}</td>
              <td>${user.firstName}</td>
              <td>
                <select class="role-select" data-userid="${user.userId}">
                  ${roles.map(role => {
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
    const selectedRoleName = $(this).closest('tr').find('.role-select').val();
    const selectedRoleId = $(this).closest('tr').find('.role-select option:selected').data('roleid'); // Get the userRoleId

    // First, fetch the full user object by ID
    $.get(`http://localhost:8080/user/${userId}`, function (userData) {
      if (!userData.usermasterdto) {
        userData.usermasterdto = {};
      }

      // Update userRole and userRoleId
      userData.usermasterdto.userRole = selectedRoleName;
      userData.usermasterdto.userRoleId = selectedRoleId; // Save the selected userRoleId

      // Populate userDto (if expected)
      userData.usermasterdto.userDto = {
        userId: userData.userId,
        firstName: userData.firstName,
        lastName: userData.lastName,
        userPhoneNumber: userData.userPhoneNumber,
        userEmail: userData.userEmail
      };

      userData.usermasterdto.userId = userData.userId;

      // POST updated data to the API
      $.ajax({
        url: "http://localhost:8080/api/Users_master/",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(userData),
        success: function () {
          alert(`Role '${selectedRoleName}' assigned to user ${userId}`);
        },
        error: function () {
          alert('Failed to assign role');
        }
      });
    });
  });
});
});