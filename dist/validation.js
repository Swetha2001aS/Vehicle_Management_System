/*$(document).ready(function () {
    // Login Form Validation
    $("#loginForm").validate({
        rules: {
            username: {
                required: true,
                minlength: 3
            },
            password: {
                required: true,
                minlength: 6
            }
        },
        messages: {
            username: {
                required: "Please enter your username",
                minlength: "Username must be at least 3 characters long"
            },
            password: {
                required: "Please provide a password",
                minlength: "Password must be at least 6 characters long"
            }
        },
        submitHandler: function (form) {
            alert("Login successful!");
            form.submit();
        }
    });

    // Registration Form Validation
    $("#registrationForm").validate({
        rules: {
            firstname: "required",
            lastname: "required",
            phone: {
                required: true,
                digits: true,
                minlength: 10,
                maxlength: 10
            },
            country: "required",
            pincode: {
                required: true,
                digits: true,
                minlength: 6,
                maxlength: 6
            },
            role: "required",
            email: {
                required: true,
                email: true
            },
            username: {
                required: true,
                minlength: 3
            },
            password: {
                required: true,
                minlength: 6
            },
            confirm_password: {
                required: true,
                equalTo: "#register-password"
            }
        },
        messages: {
            firstname: "Please enter your first name",
            lastname: "Please enter your last name",
            phone: {
                required: "Please enter your phone number",
                digits: "Only numbers are allowed",
                minlength: "Phone number must be 10 digits",
                maxlength: "Phone number must be 10 digits"
            },
            country: "Please select your country",
            pincode: {
                required: "Please enter your pincode",
                digits: "Only numbers are allowed",
                minlength: "Pincode must be 6 digits",
                maxlength: "Pincode must be 6 digits"
            },
            role: "Please select a user role",
            email: {
                required: "Please enter your email",
                email: "Enter a valid email address"
            },
            username: {
                required: "Please enter a username",
                minlength: "Username must be at least 3 characters long"
            },
            password: {
                required: "Please provide a password",
                minlength: "Password must be at least 6 characters long"
            },
            confirm_password: {
                required: "Please confirm your password",
                equalTo: "Passwords do not match"
            }
        },
        submitHandler: function (form) {
            alert("Registration successful!");
            form.submit();
        }
    });
});
*/