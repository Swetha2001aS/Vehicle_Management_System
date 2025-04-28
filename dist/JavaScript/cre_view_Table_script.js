$(document).ready(function () {
    fetchEnquiries();  // Correct function name

    function fetchEnquiries() {
        $.get("http://localhost:8080/api/mappings/all", function (mappingData) {
          const tableBody = $('#enquiryTableBody');
          tableBody.empty();  // Clear previous data
  

            console.log("-------",mappingData)

          mappingData.forEach(mapping => {
            if (mapping.mappingMode === "ENQUIRY" && mapping.mappingStatus === "A") {
              const bookingId = mapping.mappingModeId; // Important
              // Now fetch the booking details
              $.get(`http://localhost:8080/api/bookings/details/${bookingId}`, function (bookingDetails) {
                

                console.log("-------booking---------",bookingDetails)


                const user = bookingDetails.user || {};
                const vehicle = bookingDetails.vehicle || {};
                
                const row = `
                  <tr>
                    <td>${user.firstName}</td>
                    <td>${user.userEmail}</td>
                    <td>${vehicle.brand}</td>
                    <td>${vehicle.model }</td>
                    <td>${mapping.mappingDate}</td>
                    <td><button class="convert-btn" data-id="${mapping.mappingId}" data-modeid="${mapping.mappingModeId}">Convert</button></td>
                  </tr>
                `;
                tableBody.append(row);
  
              });
            }
          });
        });
    }
});
