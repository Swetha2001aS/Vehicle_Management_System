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
          Fuel: ${vehicle.fuelType || 'N/A'}<br>
          Transmission: ${vehicle.transmissionType || 'N/A'}<br>
          City: ${vehicle.city || 'N/A'}<br>
          Dealer: ${vehicle.dealership || 'N/A'}<br>
          <em>${vehicle.description || ''}</em>
        `
      });

      const $button = $('<button>', {
        class: 'book-btn',
        text: 'Book Now',
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
