# Capital Flow Lab - Hướng dẫn sử dụng

## 🎯 Giới thiệu

Capital Flow Lab là trải nghiệm 3D tương tác giúp bạn hiểu rõ chu kỳ tư bản và cách khủng hoảng thanh khoản xảy ra.

---

## 🚀 Bắt đầu

### Truy cập
Từ trang chủ, click vào **"Capital Lab"** trong menu navigation, hoặc truy cập trực tiếp:
```
http://localhost:5174/capital-lab
```

### Yêu cầu hệ thống
- Trình duyệt hiện đại hỗ trợ WebGL (Chrome, Firefox, Edge, Safari)
- Card đồ họa với driver được cập nhật
- Kết nối internet ổn định

---

## 🎮 Điều khiển

### Desktop
- **Kéo chuột trái:** Xoay camera quanh scene
- **Cuộn chuột:** Zoom in/out
- **Di chuyển chuột:** Parallax nhẹ (chỉ ở hero)
- **Click node:** Xem thông tin chi tiết
- **Cuộn trang:** Di chuyển qua các chapter

### Mobile/Tablet
- **Vuốt một ngón:** Xoay camera
- **Pinch:** Zoom
- **Tap node:** Xem thông tin
- **Cuộn:** Di chuyển chapter

---

## 📚 8 Chương học

### 1. Hero - Chu kỳ tư bản Alpha Corp
**Mô tả:** Overview toàn cảnh khu đô thị với ba tòa tháp và dòng vốn chạy

**Nội dung:** Giới thiệu 10.000 tỷ đồng trong chu kỳ tư bản

**Tương tác:** Quan sát dòng vốn, hover các nodes

---

### 2. Tư bản tiền tệ (T)
**Camera focus:** Node T (màu xanh teal)

**Nội dung:** 
- Khoản vay 10.000 tỷ từ ngân hàng
- Đây là vốn vay, không phải tài sản có sẵn
- Hình thái mở đầu của chu kỳ

**Lý luận MLN122:** "T là tư bản dưới dạng tiền tệ. Không phải tài sản có sẵn, mà là vốn vay cần hoàn trả."

---

### 3. Đầu vào sản xuất (H)
**Camera focus:** Node H

**Nội dung:**
- Tiền chuyển thành đất, máy móc, vật liệu, nhân công
- Giai đoạn T → H

**Lý luận:** "Tư bản tiền tệ chuyển đổi thành các yếu tố sản xuất thực tế."

---

### 4. Sản xuất (SX)
**Camera focus:** Khu xây dựng trung tâm

**Nội dung:**
- Công trường hoạt động
- Tạo ra giá trị mới và giá trị thặng dư

**Lý luận:** "Quá trình lao động sống kết hợp với tư liệu sản xuất tạo ra sản phẩm có giá trị cao hơn."

---

### 5. Tư bản hàng hóa (H')
**Camera focus:** Ba tòa tháp phần thô (màu vàng)

**Nội dung:**
- Ba tòa tháp chứa giá trị chưa được thực hiện
- Vốn đã chuyển vào bất động sản
- Giá trị chưa được thực hiện bằng tiền

**Lý luận:** "Giá trị đã sản xuất nhưng chưa chuyển thành tiền. Vốn bị neo lại trong hàng hóa."

---

### 6. Điểm đứt gãy (H' → T')
**Camera focus:** Connector giữa H' và T'

**Nội dung:**
- Khả năng tiêu thụ suy giảm
- Dòng vốn bị khóa
- **Đây là cao trào của trải nghiệm**

**Lý luận:** "Nếu H' không chuyển thành T', chu kỳ tái sản xuất bị gián đoạn. Doanh nghiệp có tài sản nhưng thiếu thanh khoản."

**Hành động:** Click nút **"Kích hoạt khủng hoảng"**

---

### 7. Hiệu ứng dây chuyền
**Camera:** Lùi ra để thấy 5 stakeholders

**Stakeholders bị ảnh hưởng:**
1. **Ngân hàng** - Siết tín dụng, tăng lãi suất
2. **Công nhân** - Thất nghiệp, mất thu nhập
3. **Nhà cung cấp** - Công nợ tăng, phá sản liên kết
4. **Người mua** - Không vay được, không mua được
5. **Nhà nước** - Thu thuế giảm, phải can thiệp

**Tương tác:** Click từng stakeholder để xem tác động cụ thể

---

### 8. Thách thức khôi phục
**Camera:** Lùi xa nhất, nhìn toàn cảnh

**Challenge:** Điều chỉnh 3 yếu tố để khôi phục chu kỳ

#### 3 Controls:

**1. Dự phòng tiền tệ**
- Tỷ lệ vốn giữ dưới dạng thanh khoản
- **Optimal:** 20-35%
- **Hiện tại (crisis):** 15%

**2. Vốn trong hàng hóa**
- Tỷ lệ vốn bị neo trong H'
- **Optimal:** 30-50%
- **Hiện tại (crisis):** 70%

**3. Khả năng tiêu thụ**
- Tốc độ thị trường hấp thụ hàng hóa
- **Optimal:** 60-85%
- **Hiện tại (crisis):** 30%

#### Cách chơi:
1. Kéo 3 sliders về vùng optimal (màu xanh)
2. Quan sát dòng H' → T' được nối lại
3. T' sáng lên màu xanh
4. Badge "Đã khôi phục" xuất hiện

---

## 🎨 Hiểu các màu sắc

### Nodes
- **Teal (#68cdd8):** Nodes hoạt động bình thường (T, H, SX)
- **Gold (#c2a558):** Hàng hóa (H'), dòng vốn
- **Green (#6ecd9a):** Recovery state (T')
- **Red/Gray (#ff6e5c, #7a8a9f):** Crisis state

### Buildings
- **Gold:** Hoạt động bình thường
- **Gray:** Crisis mode
- **Green tint:** Recovery mode

---

## 💡 Tips & Tricks

### Để có trải nghiệm tốt nhất:

1. **Dành thời gian ở mỗi chapter** - Đọc overlay text và lý luận
2. **Click tất cả nodes** - Mỗi node có thông tin chi tiết
3. **Trigger crisis ít nhất 1 lần** - Xem hiệu ứng lan truyền
4. **Thử recovery challenge** - Hiểu điều kiện khôi phục
5. **Xoay camera tự do** - Khám phá scene từ nhiều góc
6. **Cuộn chậm** - Camera transition mượt hơn

### Shortcuts:
- **Nút "Đặt lại":** Reset về trạng thái bình thường
- **Click chapter dots:** Nhảy nhanh đến chapter
- **Double-click canvas:** Reset camera về default

---

## 🔧 Xử lý sự cố

### Scene không load?
- Kiểm tra WebGL: truy cập `chrome://gpu` (Chrome)
- Cập nhật driver card đồ họa
- Thử trình duyệt khác

### Performance lag?
- Giảm zoom out (càng xa càng nhiều polygon render)
- Đóng các tabs khác
- Tắt extensions trình duyệt
- Giảm kích thước cửa sổ browser

### Canvas đen?
- Refresh trang (F5)
- Clear cache và hard reload (Ctrl + Shift + R)

### Recovery không hoạt động?
- Đảm bảo cả 3 sliders đều trong vùng optimal
- Check badge xuất hiện ở góc phải
- Nếu vẫn không, click "Đặt lại" và thử lại

---

## 📖 Thuật ngữ

- **T (Tư bản tiền tệ):** Money Capital - Dạng tiền
- **H (Hàng hóa đầu vào):** Commodity - Tư liệu sản xuất và sức lao động
- **SX (Sản xuất):** Production - Quá trình tạo giá trị
- **H' (Hàng hóa sản phẩm):** Commodity' - Sản phẩm hoàn thành
- **T' (Tiền thu về):** Money' - Tiền sau bán hàng
- **MLN122:** Mác - Lênin (Kinh tế chính trị Mác - Lênin)
- **Bottleneck:** Điểm nghẽn, điểm tắc
- **Liquidity Crisis:** Khủng hoảng thanh khoản

---

## 🎓 Câu hỏi thường gặp

**Q: Tại sao T' bị khóa khi crisis?**  
A: Vì hàng hóa (H') không bán được, tiền không quay về, chu kỳ bị gián đoạn.

**Q: Tại sao không chỉ tăng giá bán?**  
A: Trong khủng hoảng, người mua cũng thiếu vốn (do ngân hàng siết tín dụng), tăng giá càng khó bán.

**Q: Recovery challenge có giải pháp duy nhất?**  
A: Không. Nhiều tổ hợp giá trị trong optimal ranges đều work. Đây là mô hình giáo dục, không phải tư vấn tài chính thực tế.

**Q: Tại sao có 3 tòa tháp?**  
A: Đại diện cho dự án bất động sản lớn của Alpha Corp trong case study.

**Q: Có thể export scene không?**  
A: Hiện tại chưa support. Feature có thể được thêm trong tương lai.

---

## 📝 Notes học thuật

### Công thức chu kỳ:
```
T - H ... SX ... H' - T'
│   │     │      │    │
│   │     │      │    └─ Tiền thu về
│   │     │      └────── Hàng hóa sản phẩm
│   │     └──────────── Sản xuất
│   └─────────────────── Hàng hóa đầu vào
└──────────────────────── Tiền vốn
```

### Điểm then chốt:
- **Chu kỳ phải liên tục** - Đứt gãy ở bất kỳ đâu đều gây khủng hoảng
- **Thời gian quan trọng** - Càng lâu ở H', rủi ro càng cao
- **Thanh khoản là chìa khóa** - Có tài sản ≠ có tiền
- **Hệ thống liên kết** - Một DN khủng hoảng kéo theo nhiều DN khác

---

**Chúc bạn có trải nghiệm học tập thú vị!** 🎓✨
