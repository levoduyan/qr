<div class="container">
    <!-- Left Section -->
    <div class="left-section">
        <div class="header">
            <div class="tab-buttons">
                <button class="tab-btn active" data-tab="batch">QR Hàng Loạt</button>
                <button class="tab-btn" data-tab="single">QR Lẻ</button>
                <button class="tab-btn" data-tab="barcode-batch">BarCode Hàng Loạt</button>
                <button class="tab-btn" data-tab="barcode-single">BarCode Lẻ</button>
            </div>
        </div>

        <div class="tab-content active" id="batch">
            <div class="input-group">
                <textarea placeholder="Nhập mỗi dòng là một nội dung QR..." id="data_qr_batch"></textarea>
            </div>

            <div class="qr-count"><i class="fa-solid fa-list"></i> Số QR: <span id="qr_count">0</span></div>

            <div class="button-group">
                <button class="btn-create"><i class="fa-solid fa-qrcode"></i> Tạo QR code</button>
                <button class="btn-reset" type="button"><i class="fa-solid fa-arrows-rotate"></i> Làm mới</button>
            </div>
        </div>

        <div class="tab-content" id="single">
            <div class="input-group">
                <textarea placeholder="Nhập nội dung để tạo QR code..." id="data_qr_single"></textarea>
            </div>
        </div>

        <div class="tab-content " id="barcode-batch">
            <div class="input-group">
                <textarea placeholder="Nhập mỗi dòng là một nội dung BarCode..." id="data_barcode_batch"></textarea>
            </div>

            <div class="barcode-count"><i class="fa-solid fa-list"></i> Số BarCode: <span id="barcode_count">0</span></div>

            <div class="button-group">
                <button class="btn-create-barcode"><i class="fa-solid fa-qrcode"></i> Tạo BarCode</button>
                <button class="btn-reset-barcode" type="button"><i class="fa-solid fa-arrows-rotate"></i> Làm mới</button>
            </div>
        </div>

        <div class="tab-content" id="barcode-single">
            <div class="input-group">
                <textarea placeholder="Nhập nội dung để tạo BarCode..." id="data_barcode_single"></textarea>
            </div>
        </div>

    </div>

    <!-- Right Section -->
    <div class="right-section">
        <div class="tab-content active" id="qrCode">
            <div class="qr-container">
                <div class="qr-item">
                    <div class="qr-code">
                        <div class="qr-placeholder qr-default">
                            <img src="{$domain}/public/images/QR_defaut.png" alt="QR Placeholder">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="tab-content " id="barCode">
            <div class="barcode-container">
                <div class="barcode-item">
                    <div class="barcode-code">
                        <div class="barcode-placeholder qr-default">
                            <img src="{$domain}/public/images/barcode-defaut.png" alt="BarCode Placeholder">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="{$domain}/public/js/ajax/home.js?{$version}"></script>