<div class="container">
    <!-- Left Section -->
    <div class="left-section">
        <div class="header">
            <div class="tab-buttons">
                <button class="tab-btn active" data-tab="batch">QR hàng loạt</button>
                <button class="tab-btn" data-tab="single">QR lẻ</button>
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
    </div>

    <!-- Right Section -->
    <div class="right-section">
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
</div>

<script type="text/javascript" src="{$domain}/public/js/ajax/home.js?{$version}"></script>