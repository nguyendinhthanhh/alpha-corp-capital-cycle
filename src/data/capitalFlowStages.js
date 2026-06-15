export const capitalForms = [
  {
    id: 'tien-te',
    name: 'Tư bản Tiền tệ (T)',
    color: 'teal',
    desc: 'Lượng tiền dùng để mua vật tư và thuê lao động.',
    role: 'Khởi động chu kỳ, chuyển đổi giá trị trừu tượng thành các yếu tố sản xuất thực tế.'
  },
  {
    id: 'san-xuat',
    name: 'Tư bản Sản xuất (SX)',
    color: 'navy',
    desc: 'Tồn tại dưới dạng máy móc đang chạy và công nhân đang làm việc.',
    role: 'Sản xuất ra giá trị mới và giá trị thặng dư thông qua việc tiêu dùng sức lao động.'
  },
  {
    id: 'hang-hoa',
    name: 'Tư bản Hàng hóa (H\')',
    color: 'gold',
    desc: 'Sản phẩm đã hình thành (tòa tháp phần thô).',
    role: 'Chứa đựng giá trị thặng dư, chờ được đem ra thị trường để thực hiện giá trị (bán lấy tiền).'
  }
];

export const spaceTimeConditions = {
  space: {
    title: 'Điều kiện Không gian',
    desc: 'Tổng tư bản phải chia thành 3 phần, đồng thời tồn tại ở 3 hình thái (Tiền, Sản xuất, Hàng hóa). Nếu 100% vốn chôn vào hàng hóa, doanh nghiệp không còn tiền dự phòng.',
  },
  time: {
    title: 'Điều kiện Thời gian',
    desc: 'Các giai đoạn phải nối tiếp nhau liên tục: T -> H, H -> SX, SX -> H\', H\' -> T\'. Sự đứt gãy tại H\' -> T\' làm ngưng trệ toàn bộ chuỗi thời gian.',
  }
};
