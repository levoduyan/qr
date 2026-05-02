var thisPage = {};
$( function ()
{

} );

// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const tabName = this.getAttribute('data-tab');
        
        // Remove active class from all tabs and contents
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and its content
        this.classList.add('active');
        document.getElementById(tabName).classList.add('active');
        
        if(tabName==="barcode-batch" || tabName==="barcode-single"){
            emtyFormBarCode();
            document.getElementById('barCode').classList.add('active');
            document.getElementById('qrCode').classList.remove('active');
        }else{
            emtyForm();
            document.getElementById('qrCode').classList.add('active');
            document.getElementById('barCode').classList.remove('active');
        }
    });
});

// qr single creation
let timeout = null;
document.getElementById("data_qr_single").addEventListener("input", function() {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
        crateQRSingle();
    }, 1000); // debounce
});

function crateQRSingle() {
    const data_qr_single = document.getElementById('data_qr_single').value;
    if (data_qr_single.trim()) {
        var data = new FormData();
        data.append('data_qr', data_qr_single);
        data.append('is_batch', 0);
        _doAjax('POST', data, 'qr', 'create', true, function(res){
            const qrList = Array.isArray(res?.data) ? res.data : (res?.data?.qr_list || []);
            var html = '';
            if (qrList.length > 0) {
                qrList.forEach(item => {
                    html += `<div class="qr-item">
                                <div class="qr-code">
                                    <div class="qr-placeholder">
                                        <img src="${domain}/temp/${item.file}">
                                    </div>
                                </div>
                            </div>`;
                });
                $('.qr-container').html(html);
                $('#qr_count').html(qrList.length);
            } else {
                html = `<div class="qr-item">
                            <div class="qr-code">
                                <div class="qr-placeholder qr-default">
                                    <img src="${domain}/public/images/QR_defaut.png" alt="QR Placeholder">
                                </div>
                            </div>
                        </div>`;
                $('.qr-container').html(html);
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
                    title: "Không thể tạo mã QR. Vui lòng kiểm tra lại dữ liệu đầu vào!"
                });

            }
        });
    }else{
        var html = `<div class="qr-item">
                <div class="qr-code">
                    <div class="qr-placeholder qr-default">
                        <img src="${domain}/public/images/QR_defaut.png" alt="QR Placeholder">
                    </div>
                </div>
            </div>`;
        $('.qr-container').html(html);
    }
};

// Reset QR batch
$(document).on("click", ".btn-create", function(){
    const data_qr_batch = document.getElementById('data_qr_batch').value;
    if (data_qr_batch.trim()) {
        var data = new FormData();
        data.append('data_qr', data_qr_batch);
        data.append('is_batch', 1);
        _doAjax('POST', data, 'qr', 'create', true, function(res){
            const qrList = Array.isArray(res?.data) ? res.data : (res?.data?.qr_list || []);

            if (qrList.length > 0) {
                var html = '';
                qrList.forEach(item => {
                    html += `<div class="qr-item">
                                <div class="qr-code">
                                    <div class="qr-placeholder">
                                        <img src="${domain}/temp/${item.file}">
                                    </div>
                                </div>
                                <div class="qr-text">${item.text}</div>
                            </div>`;
                });
                $('.qr-container').html(html);
                $('#qr_count').html(qrList.length);
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

// Reset BarCode batch
$(document).on("click", ".btn-create-barcode", function(){
    const data_barcode_batch = document.getElementById('data_barcode_batch').value;
    if (data_barcode_batch.trim()) {
        var data = new FormData();
        data.append('data_barcode', data_barcode_batch);
        data.append('is_batch', 1);
        _doAjax('POST', data, 'qr', 'create_barcode', true, function(res){
            const barcodeList = Array.isArray(res?.data) ? res.data : (res?.data?.barcode_list || []);

            if (barcodeList.length > 0) {
                var html = '';
                barcodeList.forEach(item => {
                    html += `<div class="barcode-item">
                                <div class="barcode-code">
                                    <div class="barcode-placeholder">
                                        <img src="${domain}/temp/${item.file}">
                                    </div>
                                </div>
                                <div class="barcode-text">${item.text}</div>
                            </div>`;
                });
                $('.barcode-container').html(html);
                $('#barcode_count').html(barcodeList.length);
            } else {
                $('.barcode-container').html('<p>Không thể tạo mã BarCode. Vui lòng kiểm tra lại dữ liệu đầu vào.</p>');
                document.querySelector('.barcode-count').classList.add('hidden');
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

// barcode single creation
let timeout_barcode = null;
document.getElementById("data_barcode_single").addEventListener("input", function() {
    clearTimeout(timeout_barcode);

    timeout_barcode = setTimeout(() => {
        crateBarCodeSingle();
    }, 1000); // debounce
});

function crateBarCodeSingle() {
    const data_barcode_single = document.getElementById('data_barcode_single').value;
    if (data_barcode_single.trim()) {
        var data = new FormData();
        data.append('data_barcode', data_barcode_single);
        data.append('is_batch', 0);
        _doAjax('POST', data, 'qr', 'create_barcode', true, function(res){
            const barcodeList = Array.isArray(res?.data) ? res.data : (res?.data?.barcode_list || []);
            var html = '';
            if (barcodeList.length > 0) {
                barcodeList.forEach(item => {
                    html += `<div class="barcode-item">
                                <div class="barcode-code">
                                    <div class="barcode-placeholder">
                                        <img src="${domain}/temp/${item.file}">
                                    </div>
                                </div>
                            </div>`;
                });
                $('.barcode-container').html(html);
            } else {
                html = `<div class="barcode-item">
                            <div class="barcode-code">
                                <div class="barcode-placeholder barcode-default">
                                    <img src="${domain}/public/images/barcode-defaut.png" alt="BarCode Placeholder">
                                </div>
                            </div>
                        </div>`;
                $('.barcode-container').html(html);
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
                    title: "Không thể tạo mã BarCode. Vui lòng kiểm tra lại dữ liệu đầu vào!"
                });

            }
        });
    }else{
        var html = `<div class="barcode-item">
                <div class="barcode-code">
                    <div class="barcode-placeholder barcode-default">
                        <img src="${domain}/public/images/barcode-defaut.png" alt="BarCode Placeholder">
                    </div>
                </div>
            </div>`;
        $('.barcode-container').html(html);
    }
};

$(document).on("click", ".btn-reset", function(){
    emtyForm();
});

$(document).on("click", ".btn-reset-barcode", function(){
    emtyFormBarCode();
});

function emtyForm() {
    document.getElementById('data_qr_single').value = '';
    document.getElementById('data_qr_batch').value = '';
    $('.qr-container').html(`<div class="qr-item">
                <div class="qr-code">
                    <div class="qr-placeholder qr-default">
                        <img src="${domain}/public/images/QR_defaut.png" alt="QR Placeholder">
                    </div>
                </div>
            </div>`);
    $('#qr_count').html(0);
}

function emtyFormBarCode() {
//    document.getElementById('data_barcode_single').value = '';
    document.getElementById('data_barcode_batch').value = '';
    $('.barcode-container').html(`<div class="barcode-item">
                <div class="barcode-code">
                    <div class="barcode-placeholder barcode-default">
                        <img src="${domain}/public/images/barcode-defaut.png" alt="BarCode Placeholder">
                    </div>
                </div>
            </div>`);
    $('#barcode_count').html(0);
}
