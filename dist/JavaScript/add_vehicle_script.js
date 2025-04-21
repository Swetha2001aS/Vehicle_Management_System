$('#vehicleForm').validate({
    rules: {
      brand: { required: true },
      model: { required: true },
      price: { required: true, number: true, min: 1 },
      fuelType: { required: true },
      transmissionType: { required: true },
      dealership: { required: true },
      city: { required: true },
      description: { required: true, minlength: 10 },
      image: {
        required: true,
        extension: "jpg|jpeg|png|gif"
      }
    },
    messages: {
      brand: "Enter vehicle brand",
      model: "Enter vehicle model",
      price: "Enter a valid price",
      fuelType: "Specify fuel type",
      transmissionType: "Specify transmission type",
      dealership: "Enter dealership name",
      city: "Enter city name",
      description: "Provide a short description (min 10 chars)",
      image: "Upload a valid image file"
    },
    errorElement: "label",
    errorClass: "error",
    submitHandler: function (form) {
      let formData = new FormData(form);
      $.ajax({
        url: 'http://localhost:8080/vehicles/addVehicle',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (vehicleId) {
          alert('Vehicle added successfully! ID: ' + vehicleId);
          $('#vehicleForm')[0].reset();
        },
        error: function () {
          alert('Failed to add vehicle. Please try again.');
        }
      });
    }
  });
  