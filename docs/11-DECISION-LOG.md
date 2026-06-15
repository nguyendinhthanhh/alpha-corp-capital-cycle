# 11. Decision Log

> Tài liệu này ghi lại mọi quyết định thay đổi quan trọng về mặt định hướng, cấu trúc học thuật, thiết kế và công nghệ của dự án. AI Agent bắt buộc phải tham khảo file này trước khi tiến hành viết code mới.

| Ngày | Quyết định | Lý do | Tài liệu liên quan | Người/AI đề xuất | Trạng thái |
|---|---|---|---|---|---|
| Khởi tạo | Sản phẩm là website tương tác | Đáp ứng yêu cầu sản phẩm sáng tạo MLN122, trực quan hóa lý thuyết thay vì chỉ làm slide tĩnh | PROJECT-BRIEF | Nhóm SV | Approved |
| Khởi tạo | Tình huống trung tâm là Alpha Corp | Một case study BĐS thực tế, vay 10.000 tỷ, xây xong phần thô rồi mắc kẹt giúp sinh viên dễ liên hệ thực tiễn | PROJECT-BRIEF | Nhóm SV | Approved |
| Khởi tạo | Concept không phải fintech dashboard | Tránh cảm giác phần mềm quản lý kỹ thuật, cần mang tính kể chuyện dữ liệu (data storytelling) | DESIGN-SYSTEM | Nhóm SV | Approved |
| Khởi tạo | Không dùng màu "cream editorial" làm chủ đạo cho toàn hệ thống | Lệnh thay đổi mới yêu cầu hướng tới "Premium Dark Academic" thay vì màu sáng cream | DESIGN-SYSTEM | User | Approved |
| Khởi tạo | Hướng thiết kế là Premium Dark Academic Interactive Storytelling | Tôn lên vẻ nghiêm túc, học thuật, có chiều sâu của một "Hồ sơ điều tra kinh tế" | DESIGN-SYSTEM | User | Approved |
| Khởi tạo | Session 12 bị thiếu | Giảng viên chưa cung cấp tài liệu. Để tránh làm sai lệch kiến thức, tuyệt đối không tự bịa | SOURCE-OF-TRUTH | User | Approved |
| Khởi tạo | Session 13 vẫn hợp lệ | Nguồn kiến thức về cạnh tranh và độc quyền vẫn được sử dụng vào bài | SOURCE-OF-TRUTH | User | Approved |
| Khởi tạo | Công thức trung tâm là `T–H…SX…H’–T’` | Đây là lý thuyết trọng tâm của tuần hoàn tư bản (C.Mác) | SOURCE-OF-TRUTH | Giáo trình | Approved |
| Khởi tạo | Ưu tiên UI, Nội dung và Tương tác. Bỏ qua backend | Dự án chỉ là sản phẩm hỗ trợ thuyết trình, không cần lưu trữ dữ liệu người dùng lâu dài | FUNCTIONAL-REQs | Nhóm SV | Approved |
| Khởi tạo | Không thêm chatbot AI thật | Rủi ro AI tạo nội dung ảo (hallucination) ảnh hưởng liêm chính học thuật | AI-USAGE | Nhóm SV | Approved |
| Khởi tạo | AI Usage phải minh bạch | Yêu cầu bắt buộc của môn học. Phải có bảng lưu vết rõ ràng | AI-USAGE | Rubric | Approved |
| 15/06/2026 | Homepage và internal pages được thống nhất theo hệ Premium Dark Academic Interactive Storytelling | Đảm bảo website dùng trực tiếp cho thuyết trình trên lớp, tránh lệch phong cách giữa landing và các route bên trong | DESIGN-SYSTEM, PROJECT-BRIEF | Codex theo brief của user | Approved |
| 15/06/2026 | Quiz được mở rộng thành 15 câu và chỉ dùng kiến thức đã xuất hiện trong website cùng Session 8, 10, 11, 13 | Khớp yêu cầu functional docs và tránh dùng nội dung ngoài source of truth, đặc biệt không suy diễn Session 12 | FUNCTIONAL-REQs, SOURCE-OF-TRUTH | Codex theo docs nội bộ | Approved |
| 15/06/2026 | Story route được nâng thành chapter-based presentation mode với sticky chapter navigation và evidence panel | Phù hợp với presentation plan, giúp nhóm trình bày trực tiếp bằng website thay cho slide tĩnh | PRESENTATION-PLAN, UX-USER-FLOW | Codex theo brief của user | Approved |
| 15/06/2026 | Appendix được mở rộng thành AI usage table, prompt samples, group contribution và nguồn học thuật rõ ràng | Tăng minh bạch AI, phục vụ rubric liêm chính học thuật và phần phản biện cuối buổi thuyết trình | AI-USAGE, QA-CHECKLIST | Codex theo docs nội bộ | Approved |
| 15/06/2026 | Ghi đè quyết định Dark Academic. Thiết kế lại website theo phong cách "Professional Economic Landing Page" (sáng, navy, teal, gold). | Tránh cảm giác dashboard quản trị hay template AI cũ. Phù hợp báo cáo kinh tế chuyên nghiệp. | PROJECT-BRIEF, DESIGN-SYSTEM | User | Approved |

## Mẫu Log mới (dành cho các bản cập nhật sau)
*Copy mẫu này khi cần thêm dòng mới vào bảng:*
`| DD/MM/YYYY | Nội dung quyết định | Giải thích lý do | Tên tài liệu | Tên người đề xuất | Draft/Approved |`
