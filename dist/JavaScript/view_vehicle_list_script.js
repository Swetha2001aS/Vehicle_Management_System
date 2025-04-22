document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:8080/vehicles/all')
      .then(res => res.json())
      .then(data => displayVehicles(data))
      .catch(err => console.error('Error fetching vehicle list:', err));
  });
  
  function displayVehicles(vehicles) {
    const container = document.getElementById('vehicleContainer');
    container.innerHTML = '';
  
    vehicles.forEach(vehicle => {
      const card = document.createElement('div');
      card.className = 'vehicle-card';
  
      const image = document.createElement('img');
      image.className = 'vehicle-image';
      image.src = `http://localhost:8080/vehicles/${vehicle.id}/image`;
      image.alt = vehicle.name || 'Vehicle';
  
      const info = document.createElement('div');
      info.className = 'vehicle-info';
  
      const title = document.createElement('div');
      title.className = 'vehicle-title';
      title.textContent = vehicle.name || 'Unnamed Vehicle';
  
      const details = document.createElement('div');
      details.className = 'vehicle-details';
      details.innerHTML = `
        Type: ${vehicle.type || 'N/A'}<br>
        Model: ${vehicle.model || 'N/A'}<br>
        Year: ${vehicle.year || 'N/A'}
      `;
  
      info.appendChild(title);
      info.appendChild(details);
      card.appendChild(image);
      card.appendChild(info);
      container.appendChild(card);
    });
  }
  