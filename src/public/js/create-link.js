$(document).ready(function () {
    $('#qr').hide()
    setTimeout(function () {
        $('#loadingOverlay').hide()
    }, 500);

    $("#linkForm").on("submit", function (e) {
        e.preventDefault();

        $('#qr').hide()
        $('#loadingOverlay').show()

        const link_url = $("#link_url").val();

        setTimeout(() => {
            $.ajax({
                url: "/quick-response/test",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify({ link_url }),
                success: function (data) {
                    if (data.success) {
                        $("#qr").attr("src", data.data.image);
                        $("#qr").attr("link", data.data.url);
                        $('#qr').hide().fadeIn(800);
                    }
                    else {
                        alert("Tạo link thất bại!");
                    }
                },
                error: function () {
                    alert("Có lỗi xảy ra!");
                },
                complete: function () {
                    $('#loadingOverlay').hide()
                }
            });
        }, 1000);
    });

    $('#qr').on('click', function () {
        window.location.href = $('#qr').attr("link");
    })
});