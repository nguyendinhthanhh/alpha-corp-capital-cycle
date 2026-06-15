# 07. Functional Requirements

## Tính năng bắt buộc (Must Have)
1. **Story Mode (Hồ sơ điều tra)**: Cuộn trang để đọc câu chuyện chia làm 8 chương. Có component Sticky Capital Flow bám theo.
2. **Capital Flow Component**: Hiển thị công thức `T-H-SX-H'-T'`, thay đổi trạng thái tương ứng với chương đang đọc (kích hoạt khủng hoảng ở chương 6).
3. **Simulators (Mô phỏng Phân bổ vốn)**: Cho phép người dùng chỉnh 3 thanh trượt (Dự phòng, Tư liệu sản xuất, Quỹ lương) sao cho tổng = 100%. Bấm chạy để ra kết quả dựa trên logic.
4. **Knowledge Hub (Tàng thư lý luận)**: Danh sách định nghĩa thuật ngữ, có thể là danh sách cuộn tĩnh, không cần chức năng tìm kiếm phức tạp.
5. **Quiz (Kiểm tra)**: Trắc nghiệm 15 câu. Câu hỏi hiển thị từng câu một. Chấm điểm trực tiếp, trả lời xong báo đúng/sai và hiện phần giải thích ngay dưới câu hỏi. Cuối cùng báo tổng điểm.
6. **Appendix (Phụ lục)**: Hiển thị bảng AI Usage và cam kết liêm chính học thuật.

## Yêu cầu Phi chức năng (Non-functional)
- **Responsive**: Giao diện hoạt động tốt trên Mobile, Tablet, và Màn hình trình chiếu (Desktop 1366px - 1920px).
- **Không Backend**: Website tĩnh hoàn toàn. Toàn bộ logic Simulator và Quiz chạy bằng React State ở Frontend. Nếu refresh trang, dữ liệu sẽ reset. (Chấp nhận được vì đây là công cụ thuyết trình).
- **Accessibility**: Tương phản màu sắc đảm bảo dễ đọc. Hỗ trợ phím Tab để điều hướng cơ bản. Tôn trọng `prefers-reduced-motion`.

## Quy tắc của Simulator
- Đây **CHỈ LÀ** mô hình giáo dục để minh họa điều kiện "về không gian" của tuần hoàn tư bản. Nó không phải công cụ tư vấn tài chính thực tế.
- Nếu dùng chỉ số minh họa, phải có ghi chú rõ ràng: "Đây là mô phỏng đơn giản hóa để giải thích lý luận".
- Kết quả trả về (Phá sản/Sống sót...) phải được giải thích bằng các thuật ngữ Mác-Lênin (ví dụ: "Tư bản không sinh lời hiệu quả vì p' thấp").

## Quy tắc của Quiz
- Câu hỏi chỉ được lấy từ nội dung đã học (Session 8, 10, 11, 13) và những gì đã xuất hiện trên website.
- Không có nút bỏ qua (Skip) nếu chưa chọn đáp án.
- Câu hỏi phải trộn đủ 3 mức độ: Nhận biết, Phân tích, Vận dụng.

---
*Tài liệu liên quan: 01-PROJECT-BRIEF.md*
*Trạng thái: Draft*
*Ngày cập nhật gần nhất: Ngày khởi tạo*
