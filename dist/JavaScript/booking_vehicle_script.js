$(document).ready(function () {
  const vehicleId = new URLSearchParams(window.location.search).get('vehicleId');
  const $vehicleDetailsContainer = $('#vehicleDetails');

  // Fetch logged-in user ID (assuming it's stored in localStorage after login)
  const loggedUserId = localStorage.getItem('userId');  

  if (vehicleId) {
      $.ajax({
          url: `http://localhost:8080/vehicles/${vehicleId}`,
          method: 'GET',
          success: function (data) {
              const vehicleHTML = `
                  <h2>${data.name}</h2>
                  <img src="http://localhost:8080/vehicles/${vehicleId}/image" alt="${data.name}" style="width: 100%; border-radius: 10px; margin-bottom: 20px;">
                  <p><strong>Brand:</strong> ${data.brand}</p>
                  <p><strong>Model:</strong> ${data.model}</p>
                  <p><strong>Fuel Type:</strong> ${data.fuelType}</p>
                  <p><strong>Transmission:</strong> ${data.transmissionType}</p>
                  <p><strong>Price:</strong> ₹${data.price}</p>
                  <p><strong>Dealership:</strong> ${data.dealership}</p>
                  <p><strong>City:</strong> ${data.city}</p>
                  <p><strong>Description:</strong> ${data.description}</p>
              `;
              $vehicleDetailsContainer.html(vehicleHTML);
              localStorage.setItem("vehiclePrice", data.price);
              console.log("Vehicle Price saved in localStorage:", data.price);
              
          },
          error: function () {
              $vehicleDetailsContainer.html('<p class="text-danger">Error loading vehicle details.</p>');
          }
      });
  } else {
      $vehicleDetailsContainer.html('<p class="text-warning">No vehicle ID provided in URL.</p>');
  }

  $('#enquiryBtn').click(function () {
      const enquiryData = {
          bookingId: 0,
          userId: loggedUserId,
          vehicleId: vehicleId,
          enquiryMessage: "I am interested in this vehicle."
      };

      $.ajax({
          url: "http://localhost:8080/api/bookings/",
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify(enquiryData),
          success: function (response) {

     
              alert("✅ Enquiry sent successfully!");
              console.log("Server Response:", response);
          },
          error: function (xhr, status, error) {
              alert("❌ Failed to send enquiry. Please try again.");
              console.error("Error:", error);
          }
      });
  });
});
