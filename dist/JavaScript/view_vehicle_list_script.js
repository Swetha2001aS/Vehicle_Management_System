$(document).ready(function () {
  $.ajax({
    url: 'http://localhost:8080/vehicles/all',
    method: 'GET',
    success: function (vehicles) {
      displayVehicles(vehicles);
      $('#vehicleContainer').fadeIn(); // Show container after loading
    },
    error: function (xhr, status, error) {
      console.log("---", xhr.responseText);
      console.error('Error fetching vehicle list:', error);
      $('#vehicleContainer').text('Failed to load vehicles.').show();
    }
  });

  function displayVehicles(vehicles) {
    const $container = $('#vehicleContainer');
    $container.empty();

    vehicles.forEach(vehicle => {
      const $card = $('<div>', { class: 'vehicle-card' }).css('opacity', 0);

      const $image = $('<img>', {
        class: 'vehicle-image',
        src: `http://localhost:8080/vehicles/${vehicle.id}/image`,
        alt: vehicle.name || 'Vehicle'
      }).on('error', function () {
        $(this).attr('src', 'https://img.icons8.com/color/270x180/car--v1.png');
      });

      const $info = $('<div>', { class: 'vehicle-info' });
      const $title = $('<div>', { class: 'vehicle-title', text: vehicle.name || 'Unnamed Vehicle' });
      const $details = $('<div>', {
        class: 'vehicle-details',
        html: `
          Brand: ${vehicle.brand || 'N/A'}<br>
          Model: ${vehicle.model || 'N/A'}<br>
          Price: ₹${vehicle.price || 'N/A'}<br>
         
        `
      });

      const $button = $('<button>', {
        class: 'book-btn',
        text: 'VIEW DETAILS',
        click: function () {
          window.location.href = `book_vehicle.html?vehicleId=${vehicle.id}`;
        }
      });

      $info.append($title, $details);
      $card.append($image, $info, $button);
      $container.append($card);
      $card.animate({ opacity: 1 }, 500); // Smooth fade-in
    });
  }
});



// upload to databse
$("#sendQueryBtn").on("click", function (e) {
  e.preventDefault();

  const vehicleId = getVehicleIdFromURL(); // Function to extract vehicleId from URL
  const userId = localStorage.getItem("userId");

  if (!vehicleId || !userId) {
    alert("Missing vehicle ID or user ID.");
    return;
  }

  const mappingData = {
    vehicle: { id: vehicleId },
    user: { id: userId }
  };

  const bookingData = {
    vehicle: { id: vehicleId },
    user: { id: userId },
    status: "Pending" // Or any default status you want
  };

  // Post to Mapping Table
  $.ajax({
    url: "http://localhost:8080/api/mappings/",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(mappingData),
    success: function () {
      console.log("Mapping added.");

      // Now post to Booking Table
      $.ajax({
        url: "http://localhost:8080/api/bookings/",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(bookingData),
        success: function () {
          alert("Query submitted successfully!");
        },
        error: function (xhr) {
          console.error("Booking failed:", xhr.responseText);
          alert("Booking failed.");
        }
      });
    },
    error: function (xhr) {
      console.error("Mapping failed:", xhr.responseText);
      alert("Mapping failed.");
    }
  });

  function getVehicleIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("vehicleId");
  }
});

