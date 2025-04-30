// -----------------------MANAGER DASHBOARD------------------------------
$(document).ready(function () {
    let currentData = {};

    fetchEnquiries();

    function fetchEnquiries() {
        $.get("http://localhost:8080/api/mappings/all", function (mappingData) {
            const filteredMappings = mappingData.filter(
                m => m.mappingMode === "DELIVERED" && m.mappingStatus === "A"
            );

            const tableBody = $('#enquiryTableBody');
            tableBody.empty();

            const fetchDetails = filteredMappings.map(mapping =>
                $.get(`http://localhost:8080/api/bookings/details/${mapping.mappingModeId}`)
                    .then(bookingDetails => ({ mapping, booking: bookingDetails[0] }))
            );

            Promise.all(fetchDetails).then(dataList => {
                dataList.forEach(({ mapping, booking }) => {
                    const row = `
                        <tr>
                            <td>${booking?.userdto?.firstName || 'N/A'}</td>
                            <td>${booking?.userdto?.userEmail || 'N/A'}</td>
                            <td>${booking?.vehicle?.brand || 'N/A'}</td>
                            <td>${booking?.vehicle?.model || 'N/A'}</td>
                            // <td>${mapping.mappingDate || 'N/A'}</td>
                            <td>
                                <button class="convert-btn"
                                    data-mappingid="${mapping.mappingId}"
                                    data-modeid="${mapping.mappingModeId}"
                                    data-userid="${booking.userdto?.userId}"
                                    data-vehicleid="${booking.vehicle?.id}"
                                    // data-mappingdate="${mapping.mappingDate}">
                                    Convert
                                </button>
                            </td>
                        </tr>
                    `;
                    tableBody.append(row);
                });
            });
        });
    }

    // $('#enquiryTableBody').on('click', '.convert-btn', function () {
    //     currentData = {
    //         mappingId: $(this).data('mappingid'),
    //         userId: $(this).data('userid'),
    //         vehicleId: $(this).data('vehicleid'),
    //         mappingModeId: $(this).data('modeid'),
    //         mappingDate: $(this).data('mappingdate'),
    //         amount: localStorage.getItem("vehiclePrice") || "0"
    //     };

    //     $('#amount').val(currentData.amount);
    //     $('#estimateDate').val('');
    //     $('#paymentStatus').val('Pending');
    //     $('#popupForm').show();
    // });

    // $('#submitBooking').click(function () {
    //     const estimatedDeliveryDate = $('#estimateDate').val();
    //     const paymentStatus = $('#paymentStatus').val();
    //     const amount = $('#amount').val();

    //     if (!estimatedDeliveryDate || !paymentStatus || !amount) {
    //         alert("Please fill all fields.");
    //         return;
    //     }

    //     const postData = {
    //         ...currentData,
    //         estimatedDeliveryDate,
    //         paymentStatus,
    //         amount
    //     };

    //     $.ajax({
    //         url: "http://localhost:8080/api/mappings/booking/manger",
    //         type: "POST",
    //         contentType: "application/json",
    //         data: JSON.stringify(postData),
    //         success: function () {
    //             const bookingUpdate = {
    //                 bookingId: currentData.mappingModeId,
    //                 estimatedDeliveryDate,
    //                 paymentStatus,
    //                 status: "C"
    //             };

    //             $.ajax({
    //                 url: "http://localhost:8080/api/bookings/",
    //                 type: "POST",
    //                 contentType: "application/json",
    //                 data: JSON.stringify(bookingUpdate),
    //                 success: function () {
    //                     alert("✅ Successfully converted and updated booking!");
    //                     $('#popupForm').hide();
    //                     fetchEnquiries();
    //                 },
    //                 error: () => alert("✅ Converted, but failed to update booking table.")
    //             });
    //         },
    //         error: () => alert("❌ Failed to convert enquiry. Please try again.")
    //     });
    // });
});

// -----------------VIEW BOOKINGS--------------------
function handleViewBookingsClick() {
    $.get("http://localhost:8080/api/bookings/", function (bookings) {
        const rows = bookings.map(booking => `
            <tr>
                <td>${booking.userdto?.firstName || 'N/A'}</td>
                <td>${booking.userdto?.userEmail || 'N/A'}</td>
                <td>${booking.vehicle?.brand || 'N/A'} ${booking.vehicle?.model || ''}</td>
                <td>${booking.estimatedDeliveryDate || 'N/A'}</td>
                <td>${booking.paymentStatus || 'N/A'}</td>
                <td>${booking.status || 'N/A'}</td>
            </tr>
        `).join('');

        const table = `
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
                <tbody>${rows}</tbody>
            </table>
        `;

        $('#bookingContainer').html(table);
    });
}
