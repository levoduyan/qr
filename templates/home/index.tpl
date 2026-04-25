<div class="container">
    <!-- Left Section -->
    <div class="left-section">
        <div class="header">
            <button class="btn-text">≡ Văn bản</button>
            {* <div class="nav-items">
                <div class="nav-item">🔗 Đường dẫn</div>
                <div class="nav-item">⋯ Khác <span class="dropdown-icon">▼</span></div>
            </div> *}
        </div>

        <div class="input-group">
            <textarea placeholder="Nhập nội dung để tạo QR code..." id="data_qr"></textarea>
        </div>

        <div class="qr-count">Số QR: <span id="qr_count">0</span></div>

        <div class="checkbox-group">
            <div class="checkbox-item">
                <input type="checkbox" id="display_text">
                <label for="display_text">Hiển thị chữ kèm mã QR</label>
            </div>
            {* <div class="checkbox-item">
                <input type="checkbox" id="create_more">
                <label for="create_more">Tạo nhiều QR (mỗi dòng là một QR) </label>
            </div> *}
        </div>

        <button class="btn-create">⊞ Tạo QR code</button>
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