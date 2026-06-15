# GitHub Copilot Instructions

Dự án: **Alpha Corp Capital Cycle** (Môn MLN122 - Kinh tế chính trị Mác-Lênin).
Mục tiêu: Chuyển hóa lý luận tuần hoàn tư bản thành trải nghiệm học tập và kể chuyện tương tác.

## Kiến trúc mong muốn
- Vite + React + Vanilla CSS.
- Component tách biệt, dễ bảo trì, không viết component nguyên khối (monolithic).
- Chạy tĩnh hoàn toàn ở frontend, không có backend/database.

## Quy tắc Học thuật (Tuyệt đối tuân thủ)
- **Công thức cốt lõi**: `T – H … SX … H’ – T’`. Không thay đổi.
- **Tình huống**: Alpha Corp vay 10.000 tỷ, xây xong phần thô 3 tòa tháp, gặp khủng hoảng đóng băng.
- **Điểm tắc nghẽn**: `H’ → T’` (Hàng hóa không chuyển thành tiền).
- Không tự bịa số liệu, nguồn. Không giả định Session 12 (đang thiếu). Session 13 hợp lệ.

## Quy tắc UI & Animation
- **Phong cách**: Premium Dark Academic Interactive Storytelling.
- **Cấm**: Giao diện giống SaaS, Admin dashboard, Claude editorial, AI template. Không dùng glassmorphism thừa, không count-up vô nghĩa.
- **Animation**: Phục vụ việc giải thích kiến thức (ví dụ: mô phỏng dòng vốn). Tôn trọng `prefers-reduced-motion`.

## Phạm vi không được làm
- Không thêm login, backend, chatbot AI thật, thanh toán.
- Không tự ý thay đổi thuật ngữ Mác-Lênin.

## Quy trình
1. Luôn đọc các tài liệu trong `docs/` trước khi đề xuất code.
2. Không tự bịa nội dung hoặc số liệu.
3. Cập nhật `docs/11-DECISION-LOG.md` khi có thay đổi kiến trúc/tính năng lớn.
