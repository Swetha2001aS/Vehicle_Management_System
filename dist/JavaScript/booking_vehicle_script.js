$(document).ready(function () {
  const vehicleId = new URLSearchParams(window.location.search).get('vehicleId');
  const $vehicleDetailsContainer = $('#vehicleDetails');

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
      },
      error: function () {
        $vehicleDetailsContainer.html('<p class="text-danger">Error loading vehicle details.</p>');
      }
    });
  } else {
    $vehicleDetailsContainer.html('<p class="text-warning">No vehicle ID provided in URL.</p>');
  }

  $('#enquiryBtn').on('click', function () {
    alert('Your enquiry has been sent! Our team will get back to you shortly.');
  });
});
