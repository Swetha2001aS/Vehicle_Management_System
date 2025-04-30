$(document).ready(function () {
    fetchEnquiries();

    function fetchEnquiries() {
        $.get("http://localhost:8080/api/mappings/all", function (mappingData) {
            const tableBody = $('#enquiryTableBody');
            tableBody.empty(); // Clear previous data
            console.log(localStorage.getItem("estimatedDate"))
            mappingData.forEach(mapping => {
                if (mapping.mappingMode === "BOOKING CONFIRM" && mapping.mappingStatus === "A") {
                    const bookingId = mapping.mappingModeId;
                    $.get(`http://localhost:8080/api/bookings/details/${bookingId}`, function (bookingDetails) {
                        const booking = bookingDetails[0];
                        const price = localStorage.getItem("vehiclePrice") || "0";
                        const row = `
                            <tr>
                                <td>${booking.userdto ? booking.userdto.firstName : 'N/A'}</td>
                                <td>${booking.userdto ? booking.userdto.userEmail : 'N/A'}</td>
                                <td>${booking.vehicle ? booking.vehicle.brand : 'N/A'}</td>
                                <td>${booking.vehicle ? booking.vehicle.model : 'N/A'}</td>
                                <td>${mapping.mappingDate || 'N/A'}</td>
                                <td>${localStorage.getItem("estimatedDate") || 'N/A'}</td> <!-- NEW COLUMN -->

                                <td>
                                    <button class="convert-btn"
                                        data-mappingid="${mapping.mappingId}"
                                        data-modeid="${mapping.mappingModeId}"
                                        data-userid="${booking.userdto?.userId}"
                                        data-vehicleid="${booking.vehicle?.id}"
                                        data-amount="${price}"
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

    // ---------- Convert Button Click ----------
    $('#enquiryTableBody').on('click', '.convert-btn', function () {
        const mappingId = $(this).data('mappingid');
        const userId = $(this).data('userid');
        const vehicleId = $(this).data('vehicleid');
        const mappingModeId = $(this).data('modeid');
        const mappingDate = $(this).data('mappingdate');

        if (!mappingId || !userId || !vehicleId || !mappingModeId) {
            showCustomAlert("❌ Missing required data!", true);
            return;
        }

        const price = localStorage.getItem("vehiclePrice") || "0";

        const postData = {
            mappingId: mappingId,
            userId: userId,
            vehicleId: vehicleId,
            mappingModeId: mappingModeId,
            estimatedDeliveryDate: mappingDate,
            paymentStatus: "Pending",
            amount: price
        };

        console.log("----- postData ----->", postData);

        $.ajax({
            url: "http://localhost:8080/api/mappings/delivered/tocre",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(postData),
            success: function () {
                showCustomAlert("✅ Successfully converted to DELIVERED!");
                fetchEnquiries();
            },
            error: function () {
                showCustomAlert("❌ Failed to convert to delivered. Please try again.", true);
            }
        });
    });
});

// --------------- Custom Styled Alert ---------------
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
