# Sổ Thu Chi: đưa lên GitHub Pages với tên miền riêng

App gồm các file trong thư mục này. Không cần máy chủ hay cơ sở dữ liệu. Sổ thu chi được lưu ngay trong trình duyệt của mỗi thiết bị, không gửi đi đâu.

```
index.html               ← toàn bộ app
manifest.webmanifest     ← để "Thêm vào màn hình chính" như app thật
sw.js                    ← cho phép mở app khi không có mạng
icons/                   ← biểu tượng app
```

## 1. Đưa code lên GitHub

1. Tạo tài khoản tại github.com nếu chưa có.
2. Bấm **New repository**, đặt tên ví dụ `sothuchi`, chọn **Public**, bấm **Create repository**.
3. Bấm **uploading an existing file**, kéo thả **tất cả** file và thư mục `icons` vào, rồi bấm **Commit changes**.

## 2. Bật GitHub Pages

1. Trong repository, vào **Settings → Pages**.
2. Ở mục **Source**, chọn **Deploy from a branch**, branch `main`, thư mục `/ (root)`, bấm **Save**.
3. Đợi 1–2 phút. App sẽ chạy ở `https://<tên-tài-khoản>.github.io/sothuchi/`.

## 3. Gắn tên miền riêng

Nên dùng tên miền phụ, ví dụ `thuchi.tenmien.com`.

**Ở nơi bạn mua tên miền** (Mắt Bão, PA Việt Nam, Tenten, Cloudflare...), vào phần quản lý DNS và thêm:

| Loại  | Tên (Host) | Giá trị                      |
|-------|------------|------------------------------|
| CNAME | `thuchi`   | `<tên-tài-khoản>.github.io`  |

Giá trị **không** kèm tên repository.

Nếu muốn dùng tên miền chính (`tenmien.com`, không có tiền tố), thêm 4 bản ghi A với Tên là `@`:
`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`

**Trên GitHub:** vào **Settings → Pages → Custom domain**, nhập `thuchi.tenmien.com`, bấm **Save**. Khi kiểm tra DNS xong, tích **Enforce HTTPS**. Bước này có thể mất vài giờ, tối đa 24 giờ.

## 4. Cài lên điện thoại

- **iPhone:** mở trang bằng **Safari**, bấm nút Chia sẻ, chọn **Thêm vào MH chính**.
- **Android:** mở bằng **Chrome**, bấm ⋮ rồi **Cài đặt ứng dụng** (hoặc **Thêm vào màn hình chính**).

Sau lần mở đầu tiên, app dùng được cả khi không có mạng.

## Lưu ý quan trọng về dữ liệu

- Dữ liệu chỉ nằm trên máy đang dùng. Điện thoại và máy tính có hai sổ riêng.
- **Sao lưu mỗi tháng:** vào Cài đặt, bấm **Tải file CSV** và cất file ở Google Drive, iCloud hoặc Zalo "Cloud của tôi".
- **Đổi máy:** trên máy mới, vào Cài đặt, bấm **Nhập từ CSV** và chọn file đã sao lưu. Lưu ý: nhập 2 lần cùng một file sẽ bị trùng khoản.
- Đừng xóa "Dữ liệu trang web" hay "Lịch sử" của Safari/Chrome, vì sẽ mất sổ.
- Trên iPhone, hãy dùng app từ màn hình chính. iOS có thể xóa dữ liệu của trang web mở bằng Safari nếu lâu ngày không mở.
- Nếu đổi tên miền, dữ liệu **không** tự chuyển theo, vì mỗi địa chỉ có kho dữ liệu riêng. Hãy xuất CSV ở địa chỉ cũ rồi nhập ở địa chỉ mới.

## Khi sửa app

Sau khi sửa `index.html`, mở `sw.js` và tăng số phiên bản (`sothuchi-v1` thành `sothuchi-v2`). Nếu không, điện thoại vẫn dùng bản cũ đã lưu. Mỗi lần cập nhật, điện thoại cần mở app 2 lần mới thấy bản mới.
