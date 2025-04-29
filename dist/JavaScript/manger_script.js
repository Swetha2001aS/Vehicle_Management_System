$(document).ready(function () {
    fetchEnquiries();

    let currentData = {}; // Global to hold current row's data

    function fetchEnquiries() {
        $.get("http://localhost:8080/api/mappings/all", function (mappingData) {
            const tableBody = $('#enquiryTableBody');
            tableBody.empty();

            mappingData.forEach(mapping => {
                if (mapping.mappingMode === "TEST DRIVE" && mapping.mappingStatus === "A") {
                    const bookingId = mapping.mappingModeId;
                    $.get(`http://localhost:8080/api/bookings/details/${bookingId}`, function (bookingDetails) {
                        const booking = bookingDetails[0];
                        const row = `
                            <tr>
                                <td>${booking.userdto ? booking.userdto.firstName : 'N/A'}</td>
                                <td>${booking.userdto ? booking.userdto.userEmail : 'N/A'}</td>
                                <td>${booking.vehicle ? booking.vehicle.brand : 'N/A'}</td>
                                <td>${booking.vehicle ? booking.vehicle.model : 'N/A'}</td>
                                <td>${mapping.mappingDate || 'N/A'}</td>
                                <td>
                                    <button class="convert-btn"
                                        data-mappingid="${mapping.mappingId}"
                                        data-modeid="${mapping.mappingModeId}"
                                        data-userid="${booking.userdto?.userId}"
                                        data-vehicleid="${booking.vehicle?.id}"
                                        data-mappingdate="${mapping.mappingDate}">
                                        Convert
                                    </button>
                                </td>
                            </tr>
                        `;
                        tableBody.append(row);
                    });
                }
            });
        });
    }

    // Convert Button Click
    $('#enquiryTableBody').on('click', '.convert-btn', function () {
        const mappingId = $(this).data('mappingid');
        const userId = $(this).data('userid');
        const vehicleId = $(this).data('vehicleid');
        const mappingModeId = $(this).data('modeid');
        const mappingDate = $(this).data('mappingdate');

        if (!mappingId || !userId || !vehicleId || !mappingModeId) {
            alert("Missing required data!");
            return;
        }

        const price = localStorage.getItem("vehiclePrice") || "0";

        currentData = {
            mappingId,
            userId,
            vehicleId,
            mappingModeId,
            mappingDate,
            amount: price
        };

        $('#amount').val(price);
        $('#estimateDate').val('');
        $('#paymentStatus').val('Pending');
        $('#popupForm').show();
    });

    // Submit Booking from Popup
    $('#submitBooking').click(function () {
        const estimatedDeliveryDate = $('#estimateDate').val();
        const paymentStatus = $('#paymentStatus').val();
        const amount = $('#amount').val();

        if (!estimatedDeliveryDate || !paymentStatus || !amount) {
            alert("Please fill all fields.");
            return;
        }

        const postData = {
            mappingId: currentData.mappingId,
            userId: currentData.userId,
            vehicleId: currentData.vehicleId,
            mappingModeId: currentData.mappingModeId,
            estimatedDeliveryDate,
            paymentStatus,
            amount
        };

        console.log("Posting to mapping manager:", postData);

        // Step 1: Send to mapping manager
        $.ajax({
            url: "http://localhost:8080/api/mappings/booking/manger",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(postData),
            success: function () {
                // Step 2: Also update booking record
                const bookingUpdate = {
                    bookingId: currentData.mappingModeId,
                    estimatedDeliveryDate,
                    paymentStatus,
                    status: "C" // A to C
                };

                $.ajax({
                    url: "http://localhost:8080/api/bookings/",
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify(bookingUpdate),
                    success: function () {
                        alert("✅ Successfully converted and updated booking!");
                        $('#popupForm').hide();
                        fetchEnquiries();
                    },
                    error: function () {
                        alert("✅ Converted, but failed to update booking table.");
                    }
                });
            },
            error: function () {
                alert("❌ Failed to convert enquiry. Please try again.");
            }
        });
    });
});


// -----------------view booking--------------------
function handleViewBookingsClick() {
  $.get("http://localhost:8080/api/bookings/", function (bookings) {
    console.log("Bookings fetched:", bookings);

    let bookingsTable = `
      <table border="1" style="width:100%; margin-top:20px;">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>Vehicle</th>
            <th>Estimated Delivery</th>
            <th>Payment Status</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
    `;

    bookings.forEach(booking => {
      bookingsTable += `
        <tr>
          <td>${booking.userdto?.firstName || 'N/A'}</td>
          <td>${booking.userdto?.userEmail || 'N/A'}</td>
          <td>${booking.vehicle?.brand || 'N/A'} ${booking.vehicle?.model || ''}</td>
          <td>${booking.estimatedDeliveryDate || 'N/A'}</td>
          <td>${booking.paymentStatus || 'N/A'}</td>
          <td>${booking.status || 'N/A'}</td>
        </tr>
      `;
    });

    bookingsTable += `</tbody></table>`;

    $('#bookingContainer').html(bookingsTable);
  });
}
