function goBack() {
  window.location.href = "view_all_user.html";
}

$(document).ready(function () {
  const countryData = {
    "USA": {
      "California": ["Los Angeles", "San Francisco", "San Diego"],
      "New York": ["Manhattan", "Brooklyn", "Queens"],
      "Texas": ["Houston", "Dallas", "Austin"]
    },
    "IND": {
      "Kerala": ["Thiruvananthapuram", "Kollam", "Pathanamthitta", "Alappuzha",
        "Kottayam", "Idukki", "Ernakulam", "Thrissur",
        "Palakkad", "Malappuram", "Kozhikode", "Wayanad",
        "Kannur", "Kasaragod"],
      "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
      "Karnataka": ["Bangalore", "Mysore", "Hubli"],
      "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"]
    },
    "UK": {
      "England": ["London", "Manchester", "Birmingham"],
      "Scotland": ["Edinburgh", "Glasgow", "Aberdeen"],
      "Wales": ["Cardiff", "Swansea", "Newport"]
    },
    "CAN": {
      "Ontario": ["Toronto", "Ottawa", "Mississauga"],
      "Quebec": ["Montreal", "Quebec City", "Laval"],
      "British Columbia": ["Vancouver", "Victoria", "Surrey"]
    },
    "AUS": {
      "New South Wales": ["Sydney", "Newcastle", "Wollongong"],
      "Victoria": ["Melbourne", "Geelong", "Ballarat"],
      "Queensland": ["Brisbane", "Gold Coast", "Cairns"]
    }
  };

  function resetAddressSection($section) {
    $section.find('.country-select').prop('selectedIndex', 0);
    $section.find('.state-select').html('<option disabled selected>Select Country First</option>').prop('disabled', true);
    $section.find('.district-select').html('<option disabled selected>Select State First</option>').prop('disabled', true);
    $section.find('input[type="text"]').val('');
  }

  function initAddressSection($section) {
    const $countrySelect = $section.find('.country-select');
    const $stateSelect = $section.find('.state-select');
    const $districtSelect = $section.find('.district-select');

    $countrySelect.off().on('change', function () {
      const country = $(this).val();
      if (country && countryData[country]) {
        $stateSelect.prop('disabled', false).html('<option disabled selected>Select State</option>');
        $.each(countryData[country], function (state) {
          $stateSelect.append($('<option>', { value: state, text: state }));
        });
        $districtSelect.html('<option disabled selected>Select State First</option>').prop('disabled', true);
      } else {
        $stateSelect.html('<option disabled selected>Select Country First</option>').prop('disabled', true);
      }
    });

    $stateSelect.off().on('change', function () {
      const country = $countrySelect.val();
      const state = $(this).val();
      if (country && state && countryData[country]?.[state]) {
        $districtSelect.prop('disabled', false).html('<option disabled selected>Select District</option>');
        $.each(countryData[country][state], function (i, district) {
          $districtSelect.append($('<option>', { value: district, text: district }));
        });
      } else {
        $districtSelect.html('<option disabled selected>Select State First</option>').prop('disabled', true);
      }
    });
  }

  $('.address-section').each(function () {
    initAddressSection($(this));
  });

  $('.add-address-btn').on('click', function () {
    const $addressContainer = $('.address-container');
    const $newSection = $('.address-section').first().clone();
    resetAddressSection($newSection);
    $addressContainer.append($newSection);
    initAddressSection($newSection);
  });

  $('.address-container').on('click', '.remove-address-btn', function () {
    const $section = $(this).closest('.address-section');
    const addressId = $section.attr('data-address-id');
    if ($('.address-section').length > 1) {
      if (addressId) {
        $.ajax({
          url: `http://localhost:8080/addressess/${addressId}`,
          type: 'DELETE',
          success: function () {
            $section.remove();
          },
          error: function () {
            alert('Failed to delete address from database.');
          }
        });
      } else {
        $section.remove();
      }
    }
  });

  $('.address-section .form-group select').on('change', function () {
    $(this).toggleClass('has-value', !!$(this).val());
  });

  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('userId');

  $.ajax({
    url: `http://localhost:8080/user/${userId}`,
    type: 'GET',
    success: function (data) {
      localStorage.setItem("userId", data.userId);
      $('#firstname').val(data.firstName);
      $('#lastname').val(data.lastName);
      $('#phone').val(data.userPhoneNumber);
      $('#register-username').val(data.usermasterdto?.userName || "");
      $('#email').val(data.userEmail);
      $('#register-password').val(data.usermasterdto?.userPassword || "");
      $('#confirm_password').val(data.usermasterdto?.userPassword || "");

      if (data.address && data.address.length > 0) {
        const $addressContainer = $('.address-container');
        const $template = $('.address-section').first().clone();
        $addressContainer.empty();

        data.address.forEach((address) => {
          const $section = $template.clone();
          $section.attr('data-address-id', address.id);
          initAddressSection($section);

          $section.find('.country-select').val(address.nation).trigger('change');

          setTimeout(() => {
            $section.find('.state-select').val(address.state).trigger('change');
            setTimeout(() => {
              $section.find('.district-select').val(address.district);
            }, 100);
          }, 100);

          $section.find('#pincode').val(address.pincode);
          $addressContainer.append($section);
        });
      }
    },
    error: function () {
      alert("Failed to fetch user details.");
    }
  });

  $('#toggle-password').click(function () {
    const field = $('#register-password');
    const type = field.attr('type') === 'password' ? 'text' : 'password';
    field.attr('type', type);
    $(this).toggleClass('fa-eye fa-eye-slash');
  });

  $('#toggle-confirm-password').click(function () {
    const field = $('#confirm_password');
    const type = field.attr('type') === 'password' ? 'text' : 'password';
    field.attr('type', type);
    $(this).toggleClass('fa-eye fa-eye-slash');
  });

  $(document).on('click', '#save-btn1', function () {
    const userDto = {
      userId: userId,
      firstName: $('#firstname').val(),
      lastName: $('#lastname').val(),
      userPhoneNumber: $('#phone').val(),
      userEmail: $('#email').val(),
      usermasterdto: {
        userName: $('#register-username').val(),
        userPassword: $('#register-password').val()
      },
      address: []
    };

    $('.address-section').each(function () {
      const $section = $(this);
      const addressId = $section.attr('data-address-id');
      const address = {
        id: addressId || null,
        nation: $section.find('.country-select').val(),
        state: $section.find('.state-select').val(),
        district: $section.find('.district-select').val(),
        pincode: $section.find('#pincode').val()
      };
      console.log(address);
      userDto.address.push(address);
    });

    $.ajax({
      url: 'http://localhost:8080/user/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(userDto),
      success: function () {
        alert("User updated successfully!");
        window.location.href = "view_all_user.html";
      }
    });
  });
});
