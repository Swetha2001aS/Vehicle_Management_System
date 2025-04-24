$(document).ready(function () {
    // Preview selected image
    $('#imageInput').on('change', function (event) {
        var file = event.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function () {
                $('#imagePreview').html('<img src="' + reader.result + '" />');
                $('#imagePreview').show();
            };
            reader.readAsDataURL(file);
        }
    });

    // Upload selected image
    $('#uploadBtn').on('click', function () {
        var file = $('#imageInput')[0].files[0];
        if (!file) {
            alert("Please select an image before saving.");
            return;
        }

        var userId = localStorage.getItem("userId"); // ✅ get from localStorage
        if (!userId) {
            alert("User ID not found. Please login again.");
            return;
        }

        var formData = new FormData();
        formData.append('image', file);

        $.ajax({
            url: 'http://localhost:8080/user/' + userId + '/uploadImage',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                alert("Image uploaded successfully!");
                console.log(response);

                // Replace the default user icon with the uploaded image
                $('#userIcon').hide();
                $('#profileImage').attr('src', response).show();

                // ✅ Go back to previous screen
                window.history.back();
            },
            error: function (xhr, status, error) {
                alert("Error uploading image. Please try again.");
                $('#uploadBtn').text('Save').prop('disabled', false);
            }
        });
    });
});



// -----------back btn ------------
$(document).ready(function () {
    // Back button functionality (go back to the previous page)
    $('#backBtn').on('click', function () {
        window.history.back();  // Goes back to the previous page
    });
});


