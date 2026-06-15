# 06. Motion & Interaction

## Nguyên tắc
- Animation **phải giúp người học hiểu kiến thức**, không được dùng để trang trí (như bóng bay, sao lấp lánh).
- Tuyệt đối tuân thủ `prefers-reduced-motion` của hệ điều hành.
- Phải mượt mà, không làm chậm quá trình thuyết trình trên máy tính cấu hình yếu.

## Animation bắt buộc
1. **Dòng vốn di chuyển (Capital Flow)**:
   - Các chữ `T`, `H`, `SX`, `H'`, `T'` sáng lên (thay đổi opacity từ 0.2 lên 1) tuần tự khi người dùng cuộn qua các chương tương ứng.
2. **Khủng hoảng đứt gãy**:
   - Khi cuộn đến chương 5, 6: Mũi tên giữa `H'` và `T'` chuyển thành dấu `X` hoặc gạch ngang màu `--crisis-red`.
   - `T'` (Tiền thu về) bị khóa (mờ đi hoặc có icon ổ khóa).
   - Xuất hiện Alert thông báo nhấp nháy 1 lần để thu hút sự chú ý.
3. **Tiến trình Timeline**:
   - Một thanh Progress Bar mảnh (1-2px) trên đỉnh hoặc cạnh trái màn hình chạy theo phần trăm cuộn của trang Story.

## Motion Tokens
- **Duration**: Nhanh (150ms) cho hover, Vừa (300ms) cho page transition/fade, Chậm (500ms) cho thay đổi trạng thái Capital Flow.
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` (chuẩn Material/Editorial mượt).
- **Page transition**: Fade-in nhẹ nhàng, không trượt (slide) gây chóng mặt.

## Những gì không được dùng
- Blob (các hình khối vô định hình) lơ lửng chuyển động làm nền.
- Parallax quá mạnh (nền và chữ trượt với tốc độ chênh lệch lớn gây khó chịu).
- Hiệu ứng Glow (phát sáng) nhấp nháy liên tục.
- Count-up (số chạy từ 0 đến 10.000) nếu không có ý nghĩa nhấn mạnh thời gian. (Vì 10.000 tỷ là vốn vay ngay từ đầu, không phải vốn tích lũy dần).
- Fade-in đồng loạt khi cuộn (scroll-reveal quá đà khiến người dùng phải đợi chữ hiện ra mới đọc được).

---
*Tài liệu liên quan: 04-UX-USER-FLOW.md*
*Trạng thái: Draft*
*Ngày cập nhật gần nhất: Ngày khởi tạo*
