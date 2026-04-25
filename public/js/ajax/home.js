var thisPage = {};
$( function ()
{

} );

$(document).on("click", ".btn-create", function(){
    const data_qr = document.getElementById('data_qr').value;
    const display_text = document.getElementById('display_text').checked;
    // const create_more = document.getElementById('create_more').checked;
    if (data_qr.trim()) {
        var data = new FormData();
        data.append('data_qr', data_qr);
        data.append('display_text', display_text);
        // data.append('create_more', create_more);
        _doAjax('POST', data, 'qr', 'create', true, function(res){
            const qrList = Array.isArray(res?.data) ? res.data : (res?.data?.qr_list || []);

            if (qrList.length > 0) {
                var html = '';
                qrList.forEach(item => {
                    html += `<div class="qr-item">
                                <div class="qr-code">
                                    <div class="qr-placeholder">
                                        <img src="${domain}/${item.file}">
                                    </div>
                                </div>`;
                    if(display_text){
                        html += `<div class="qr-text">${item.text}</div>`;
                    }
                    html += `</div>`;
                });
                $('.qr-container').html(html);
                $('#qr_count').html(qrList.length);
                // if (create_more) {
                //     document.querySelector('.qr-count').classList.remove('hidden');
                // } else {
                //     document.querySelector('.qr-count').classList.add('hidden');
                // }
            } else {
                $('.qr-container').html('<p>Không thể tạo mã QR. Vui lòng kiểm tra lại dữ liệu đầu vào.</p>');
                document.querySelector('.qr-count').classList.add('hidden');
            }
        });
    }else{
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 7200,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
            }
        });
        Toast.fire({
            icon: "error",
            title: "Vui lòng nhập nội dung để tạo mã QR!"
        });
    }
});

// $(document).on("change", "#create_more", function(){
//     const create_more = document.getElementById('create_more').checked;
//     if(create_more){
//         document.querySelector('.qr-count').classList.remove('hidden');
//     }else{
//         document.querySelector('.qr-count').classList.add('hidden');
//     }
// });

// $(document).on("change", "#display_text", function(){
//     const display_text = document.getElementById('display_text').checked;
//     if(display_text){
//         document.querySelectorAll('.qr-text').forEach(item => {
//             item.style.display = 'block';
//         });
//     }else{
//         document.querySelectorAll('.qr-text').forEach(item => {
//             item.style.display = 'none';
//         });
//     }
// });

