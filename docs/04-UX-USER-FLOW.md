# 04. UX User Flow

## Kịch bản luồng thao tác

### Bước 1: Tiếp cận (Landing Page)
- **Người dùng thấy gì**: Tiêu đề lớn "10.000 tỷ đồng đã đi đâu?", bảng hồ sơ vụ việc bên phải, công thức `T → H → SX → H' ╳ T'` dưới đáy.
- **Người dùng làm gì**: Đọc thông tin lướt qua, nhận diện đây là một "kỳ án kinh tế". Bấm nút "Mở hồ sơ điều tra".
- **Hệ thống phản hồi**: Chuyển hướng nhanh (không tải lại trang) sang trang Dòng Vốn.
- **Hành vi Mobile**: Bảng hồ sơ vụ việc sẽ đẩy xuống dưới tiêu đề.

### Bước 2: Theo dõi hành trình (Story Mode - Scroll-telling)
- **Người dùng thấy gì**: Nội dung văn bản chia làm 8 chương. Bên phải là thanh "Dòng tuần hoàn tư bản" (Sticky Capital Flow).
- **Người dùng làm gì**: Cuộn chuột từ từ xuống dưới.
- **Hệ thống phản hồi**:
  - Khi cuộn tới Chương 1, chữ `T` bên thanh bên phải sáng lên.
  - Khi cuộn tới Chương 4 (Xây xong phần thô), chữ `H'` sáng lên.
  - Khi cuộn tới Chương 5, 6 (Khủng hoảng), thanh bên phải hiện nút thắt đỏ ở đoạn `H' -> T'`.
- **Kiến thức học được**: Sự chuyển hóa kế tiếp nhau của 3 hình thái tư bản theo không gian và thời gian.

### Bước 3: Đóng vai nhà điều hành (Simulators)
- **Người dùng thấy gì**: Giao diện với 3 thanh trượt (Slider) để chia 100% tỷ lệ vốn.
- **Người dùng làm gì**: Thay đổi tỷ lệ Dự phòng, TLSX, Quỹ lương sao cho tổng bằng 100%. Nhấn "Chạy mô phỏng".
- **Hệ thống phản hồi**: Đưa ra kết luận (Phá sản/Đình công/Sống sót/Ổn định) kèm giải thích.
- **Kiến thức học được**: Cần phải phân chia tổng tư bản để nó đồng thời tồn tại ở cả 3 hình thái (Tiền tệ để dự phòng, Sản xuất để tạo ra hàng, Hàng hóa để bán).

### Bước 4: Củng cố khái niệm (Knowledge Hub)
- **Người dùng thấy gì**: Danh sách các định nghĩa chuẩn xác theo từ điển.
- **Người dùng làm gì**: Đọc để nhớ chính xác cách viết bài thi tự luận.
- **Trạng thái lỗi/Empty state**: Không có.

### Bước 5: Kiểm tra (Quiz)
- **Người dùng thấy gì**: Từng câu hỏi hiện ra với các đáp án dạng checkbox.
- **Người dùng làm gì**: Chọn đáp án.
- **Hệ thống phản hồi**:
  - Đúng: Ô đổi màu xanh (`--success-green`), hiện dấu tick, giải thích vì sao đúng. Nút "Câu tiếp theo" hiện ra.
  - Sai: Ô đổi màu đỏ (`--crisis-red`), hiện dấu x, giải thích vì sao sai.
- **Hành vi Mobile**: Checkbox chạm dễ dàng, padding nút bấm đủ rộng (min 44px).

### Bước 6: Minh bạch học thuật (Appendix)
- **Người dùng thấy gì**: Bảng thống kê cách nhóm đã dùng ChatGPT và Copilot.
- **Người dùng làm gì**: Đọc để hiểu tính liêm chính của nhóm.

---
*Tài liệu liên quan: 03-CONTENT-ARCHITECTURE.md*
*Trạng thái: Draft*
*Ngày cập nhật gần nhất: Ngày khởi tạo*
