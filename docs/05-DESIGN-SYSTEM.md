# 05. Design System

## Design Direction
**"Premium Dark Academic Interactive Storytelling"**
> *Lưu ý*: Design Token bên dưới phản ánh cấu trúc Premium Dark Academic đã được chốt ở Decision Log. Nền tổng thể sẽ tối ưu cho đọc (editorial), nhưng phải toát lên vẻ nghiêm túc, học thuật của một "tài liệu điều tra".

**Không được giống**:
- SaaS landing page (màu sắc kẹo ngọt, bo góc tròn xoe).
- Admin dashboard (dày đặc icon menu, sidebar).
- Claude editorial (quá giống giao diện chat của AI).
- Template AI sinh tự động.

## Typography
- **Heading**: `Sora` (Không chân, hiện đại, sắc nét) - cho các tựa đề chính.
- **Body**: `Be Vietnam Pro` (hoặc `Inter`) - Dễ đọc, hỗ trợ tiếng Việt tuyệt đối.
- **Formula/Data**: `JetBrains Mono` - Cho công thức `T-H-T'`, số liệu tỷ lệ phần trăm.

**Quy tắc**:
- Base size: `16px`.
- Line-height body: `1.7`.
- Không giới hạn line-length quá 75 ký tự để tránh mỏi mắt.

## Color Tokens

| Token | Giá trị (Hex) | Mục đích |
|---|---|---|
| `--background-primary` | `#0D1117` | Nền chính của website (Dark mode chủ đạo). |
| `--background-secondary` | `#161B22` | Nền của các panel, bảng hồ sơ nổi. |
| `--surface` | `#21262D` | Nền của các thành phần có thể tương tác (card con, slider track). |
| `--text-primary` | `#F0F6FC` | Chữ văn bản chính, dễ đọc trên nền tối. |
| `--text-secondary` | `#8B949E` | Chữ chú thích, ghi chú biên, mô tả ngắn. |
| `--accent-blue` | `#58A6FF` | Liên kết, button primary, điểm nhấn dữ liệu. |
| `--capital-gold` | `#D2A8FF` hoặc `#E3B341` | Màu cho các yếu tố Vốn, Tư bản (T, H, SX). |
| `--crisis-red` | `#F85149` | Cảnh báo khủng hoảng, điểm tắc nghẽn H' -> T', nợ nần. |
| `--success-green` | `#3FB950` | Trạng thái an toàn, quiz trả lời đúng. |
| `--border-subtle` | `#30363D` | Đường kẻ phân tách các chương, viền panel. |

## Layout Rules
- **Max width**: `1200px` (cho container chính).
- **Grid**: Sử dụng grid 12 cột, nhưng ưu tiên chia layout bất đối xứng (ví dụ 8-4 hoặc 7-5) để ra chất editorial.
- **Màn hình trình chiếu**: Tối ưu hiển thị không bị vỡ trên độ phân giải `1366x768` (Projector chuẩn cũ) và `1920x1080`.

## Components Rules
- **Border-radius**: Tối đa `4px` đến `8px`. Không dùng góc tròn `999px` (trừ nút dạng pill thật nhỏ).
- **Shadow**: Sử dụng rất ít shadow, ưu tiên dùng `border-subtle` để phân tách mảng khối. Cấm dùng shadow màu neon (glow).
- **Navigation**: Chỉ có chữ, KHÔNG icon.
- **Timeline/Flow**: Dùng đường thẳng đứng `1px`, đánh dấu bằng text mono `[01]`, `[02]`. Không dùng các hình tròn to sặc sỡ.

## Anti-patterns (Những lỗi cấm kỵ)
- Card bo tròn tràn lan.
- Bơm gradient tím/xanh bão hòa cao kiểu "Web3/AI startup".
- Quá nhiều box (bỏ nội dung vào box khi không cần thiết, cứ để chữ nổi trên nền).
- Icon cho mọi menu (home icon, book icon... -> xóa hết).
- Khoảng trống không có mục đích (cần có nhịp điệu: hẹp giữa tiêu đề và đoạn văn, rộng giữa các chương).

---
*Tài liệu liên quan: 11-DECISION-LOG.md*
*Trạng thái: Draft*
*Ngày cập nhật gần nhất: Ngày khởi tạo*
