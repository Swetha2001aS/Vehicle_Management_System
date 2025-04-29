$(document).ready(function () {
    fetchEnquiries();

    function fetchEnquiries() {
        $.get("http://localhost:8080/api/mappings/all", function (mappingData) {
            const tableBody = $('#enquiryTableBody');
            tableBody.empty();  // Clear previous data

            mappingData.forEach(mapping => {
                if (mapping.mappingMode === "BOOKING CONFIRM" && mapping.mappingStatus === "A") {
                    const bookingId = mapping.mappingModeId;
                    $.get(`http://localhost:8080/api/bookings/details/${bookingId}`, function (bookingDetails) {
                        console.log("-------booking---------", bookingDetails);
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
                                        data-amount="500.0"
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

    // ------------------- Button click handler ------------------
    $('#enquiryTableBody').on('click', '.convert-btn', function () {
        const mappingId = $(this).data('mappingid');
        const userId = $(this).data('userid');
        const vehicleId = $(this).data('vehicleid');
        const mappingModeId = $(this).data('modeid');
        const amount = $(this).data('amount');
        const mappingDate = $(this).data('mappingdate'); // extra if needed

        if (!mappingId || !userId || !vehicleId || !mappingModeId) {
            alert("Missing required data!");
            return;
        }

        const postData = {
            mappingId: mappingId,
            userId: userId,
            vehicleId: vehicleId,
            mappingModeId: mappingModeId,
            estimatedDeliveryDate: mappingDate, // if needed, otherwise remove this
            paymentStatus: "Pending",
            amount: amount
        };

        console.log("----- postData ----->", postData);

        $.ajax({
            url: "http://localhost:8080/api/mappings/delivered/tocre",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(postData),
            success: function () {
                showCustomAlert("✅ Successfully converted to TEST DRIVE!");
                fetchEnquiries();
            },
            error: function () {
                showCustomAlert("❌ Failed to convert enquiry. Please try again.", true);
            }
            
        });
    });
});




// ---------------alert style---------------
function showCustomAlert(message, isError = false) {
    const alertBox = $('#customAlert');
    alertBox.text(message);
    alertBox.removeClass('error');
    if (isError) alertBox.addClass('error');
    alertBox.fadeIn(200);

    setTimeout(() => {
        alertBox.fadeOut(500);
    }, 3000);
}

