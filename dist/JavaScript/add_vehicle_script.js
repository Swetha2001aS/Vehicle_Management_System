$(document).ready(function () {
  $('#vehicleForm').validate({
    rules: {
      name: "required",
      brand: "required",
      model: "required",
      price: {
        required: true,
        number: true
      },
      fuelType: "required",
      transmissionType: "required",
      dealership: "required",
      city: "required",
      description: "required"
    },
    messages: {
      name: "Please enter the vehicle name",
      brand: "Please enter the brand",
      model: "Please enter the model",
      price: {
        required: "Please enter the price",
        number: "Enter a valid number"
      },
      fuelType: "Please enter the fuel type",
      transmissionType: "Please enter the transmission type",
      dealership: "Please enter the dealership name",
      city: "Please enter the city",
      description: "Please enter a description"
    },
    submitHandler: function (form) {
      const vehicleData = {
        name: $('input[name="name"]').val(),
        brand: $('input[name="brand"]').val(),
        model: $('input[name="model"]').val(),
        price: parseFloat($('input[name="price"]').val()),
        fuelType: $('input[name="fuelType"]').val(),
        transmissionType: $('input[name="transmissionType"]').val(),
        dealership: $('input[name="dealership"]').val(),
        city: $('input[name="city"]').val(),
        description: $('textarea[name="description"]').val(),
        isDelete: "n",
        createdBy: "admin",
        modifiedBy: "admin"
      };

      $.ajax({
        url: "http://localhost:8080/vehicles",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(vehicleData),
        success: function (vehicleId) {
          const imageFile = $('input[name="image"]')[0].files[0];
          if (imageFile) {
            const formData = new FormData();
            formData.append("image", imageFile);

            $.ajax({
              url: `http://localhost:8080/vehicles/${vehicleId}/uploadImage`,
              type: "POST",
              data: formData,
              processData: false,
              contentType: false,
              success: function () {
                alert("Vehicle and image uploaded successfully!");
                window.location.href = "./dashboard.html";
              },
              error: function () {
                alert("Vehicle added, but image upload failed.");
              }
            });
          } else {
            alert("Vehicle added without image.");
            window.location.href = "./dashboard.html";
          }

          form.reset();
        },
        error: function () {
          alert("Failed to add vehicle.");
        }
      });

      return false;
    }
  });
});
