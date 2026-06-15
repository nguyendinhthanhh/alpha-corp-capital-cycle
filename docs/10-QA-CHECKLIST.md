# 10. QA Checklist

> Đây là danh sách kiểm tra bắt buộc trước khi hợp nhất (merge) code mới, trước khi deploy, hoặc trước buổi thuyết trình.

## Academic QA (Chất lượng Học thuật)
- [ ] **Công thức chuẩn**: Kiểm tra trên mọi trang, công thức phải là `T-H...SX...H'-T'`.
- [ ] **Thuật ngữ chuẩn**: Không dùng sai c, v, p, z, m. 
- [ ] **Không bịa dữ liệu**: Các con số ngoài 10.000 tỷ và 3 tòa tháp không được gán ghép tùy tiện.
- [ ] **Tuân thủ nguồn gốc**: Session 12 tuyệt đối không được suy diễn (do đang thiếu). Session 13 hợp lệ.
- [ ] **Đối chiếu nguồn**: Các nội dung mới thêm vào đã được đối chiếu với Giáo trình/Slide chưa?
- [ ] **Mô tả chính xác**: Ba tòa tháp được mô tả đúng là **phần thô**, không phải là sản phẩm hoàn thiện.

## Content QA (Chất lượng Nội dung)
- [ ] Không lặp nội dung giữa trang Lý luận và trang Story.
- [ ] Không có phần nào bị rỗng (empty state) hoặc viết theo kiểu "Lorem ipsum" sơ sài.
- [ ] **Quiz khớp nội dung**: Toàn bộ 15 câu hỏi quiz đều hỏi về kiến thức đã được nhắc đến đâu đó trong website.
- [ ] **Quiz giải thích**: Mỗi câu hỏi đều có phần giải thích đáp án (correct/incorrect) rõ ràng.
- [ ] **Rubric**: Nội dung đã thỏa mãn các tiêu chí (Chiều sâu, Sáng tạo, Tương tác, Liêm chính AI).

## UI QA (Chất lượng Giao diện)
- [ ] **Typography**: Font Newsreader và Be Vietnam Pro hiển thị tiếng Việt mượt mà (không bị lỗi dấu).
- [ ] **Phong cách**: Không giống template AI sinh tự động. Có visual hierarchy (thứ bậc thị giác) rõ ràng.
- [ ] **Gọn gàng**: Không lạm dụng card bo góc, không có text quá nhỏ (<12px).
- [ ] **Khoảng trắng**: Không có khoảng trống vô nghĩa, có nhịp kể chuyện bằng khoảng trắng.

## Interaction QA (Chất lượng Tương tác)
- [ ] **Story Mode**: Cuộn trang thì chương tương ứng phải đổi màu/đổi trạng thái.
- [ ] **Capital Flow**: Sticky menu chạy trơn tru, hiển thị trạng thái đứt gãy đỏ rực khi đến chương 6.
- [ ] **Simulation**: Tính năng chia 100% tỷ lệ chạy đúng logic, nút Run/Reset hoạt động.
- [ ] **Quiz**: Tính điểm chính xác, chọn đáp án xong mới được qua câu.
- [ ] **Motion**: Animation chạy đúng, tôn trọng chế độ Reduced-motion nếu thiết bị yêu cầu.

## Technical QA (Chất lượng Kỹ thuật)
- [ ] **Lỗi biên dịch**: `npm run build` thành công, không có cảnh báo nghiêm trọng.
- [ ] **Console Error**: Mở DevTools (F12) không có lỗi đỏ (như thiếu key prop trong map).
- [ ] **Broken Link**: Các tab menu trên header đều bấm và chuyển trang được.
- [ ] **Responsive**: Giao diện không bị vỡ hoặc ngang màn hình trên điện thoại và trình chiếu (1366x768).
- [ ] **Loading Performance**: Trang web tải dưới 2 giây trên máy nội bộ.

## Presentation QA (Sẵn sàng Thuyết trình)
- [ ] Kiểm tra hiển thị qua máy chiếu thực tế hoặc màn hình 1366x768.
- [ ] Hoạt động Offline/Localhost ổn định (đề phòng phòng học rớt mạng).
- [ ] Có phương án nói thay thế nếu máy tính bị đơ animation giữa chừng.
- [ ] Thời gian click dạo vòng quanh không quá dài, giữ đúng tiến độ bài thuyết trình.

---
*Tài liệu liên quan: 09-PRESENTATION-PLAN.md*
*Trạng thái: Draft*
*Ngày cập nhật gần nhất: Ngày khởi tạo*
