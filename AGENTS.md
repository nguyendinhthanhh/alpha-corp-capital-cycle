# Hướng dẫn dành cho AI (AGENTS.md)

Tài liệu này là hướng dẫn BẮT BUỘC dành cho mọi AI coding agent làm việc với repository này. Bạn phải đọc kỹ và tuân thủ tuyệt đối các quy tắc dưới đây trước khi đề xuất bất kỳ thay đổi nào.

## Project Identity
* **Tên dự án**: Alpha Corp Capital Cycle.
* **Môn học**: MLN122 – Kinh tế chính trị Mác – Lênin.
* **Hình thức**: Sản phẩm sáng tạo và thuyết trình.
* **Sản phẩm**: Website học tập và kể chuyện tương tác.
* **Tình huống trung tâm**: Khủng hoảng dòng vốn của Alpha Corp.
* **Mục tiêu**: Chuyển hóa lý luận về tuần hoàn tư bản thành trải nghiệm học tập trực quan, dễ hiểu và có tương tác.

## Non-negotiable Rules (Nguyên tắc không thỏa hiệp)
1. **Tuyệt đối không làm sai kiến thức MLN122**.
2. Không được tự bịa số liệu, ví dụ hoặc nguồn tham khảo.
3. **Session 12 đang thiếu và chưa được cung cấp.** Không được tự giả định nội dung của Session 12.
4. **Session 13 hợp lệ và vẫn được sử dụng.**
5. **Không thay đổi công thức trung tâm**: `T – H … SX … H’ – T’`.
6. Khoản tiền 10.000 tỷ đồng là **vốn vay**, KHÔNG PHẢI tài sản sở hữu sẵn có của Alpha Corp.
7. Ba tòa tháp **mới hoàn thành phần thô**. Không diễn đạt là sản phẩm hoàn chỉnh đã sẵn sàng giao nhà.
8. Diễn đạt cẩn thận: Vốn bị đóng băng trong bất động sản, công trình dở dang và sản phẩm chưa thể thực hiện giá trị trên thị trường.
9. **Điểm tắc nghẽn trọng tâm là H’ không chuyển thành T’**.
10. Không hy sinh độ chính xác học thuật để tạo hiệu ứng UI/UX.
11. Không thêm backend, login, chatbot AI thật hoặc hệ thống không cần thiết.
12. Không tạo giao diện giống SaaS landing page, admin dashboard, Claude editorial hoặc AI template.
13. Không viết toàn bộ trang trong một component lớn (monolithic component).
14. Không hard-code nội dung học thuật rải rác ở nhiều nơi gây khó kiểm soát.
15. Không sửa một phần làm ảnh hưởng đến quiz, simulation hoặc luồng của trang khác.
16. Mọi quyết định thay đổi lớn phải được cập nhật vào `docs/11-DECISION-LOG.md`.

## Required Workflow
Trước mỗi thay đổi lớn, AI phải thực hiện đúng luồng sau:
1. Đọc `AGENTS.md`.
2. Đọc các file trong thư mục `docs/`.
3. Xác định yêu cầu đang tác động đến tài liệu nào.
4. Kiểm tra nội dung học thuật liên quan.
5. Tạo kế hoạch thay đổi (Implementation Plan).
6. Xin xác nhận của người dùng. Chỉ sau khi được duyệt mới tiến hành chỉnh sửa code.
7. Chạy lint, type-check và build.
8. Kiểm tra responsive và accessibility.
9. Cập nhật decision log (`docs/11-DECISION-LOG.md`) nếu có quyết định/thay đổi mới.

## Source Priority
Khi có xung đột về nội dung, ưu tiên theo thứ tự sau:
1. Rubric và yêu cầu chính thức của assignment.
2. Slide giảng viên đã được người dùng cung cấp.
3. Giáo trình Kinh tế chính trị Mác – Lênin.
4. Văn bản hoặc nguồn chính thống đã kiểm chứng.
5. Nội dung do sinh viên biên soạn.
6. Đề xuất từ AI.

> **Cảnh báo**: AI không được coi suy luận của mình là nguồn chính thức. Mọi thứ do AI sinh ra phải dựa trên các nguồn ưu tiên cao hơn.

---
*Trạng thái: Approved*
*Cập nhật lần cuối: Ngày khởi tạo*
