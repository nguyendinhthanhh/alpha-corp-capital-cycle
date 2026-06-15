export const scenarios = [
  {
    id: 'normal',
    name: 'Thị trường Bình thường',
    demand: 80, // Sức mua 80%
    interestRate: 8, // Lãi suất 8%
    circulationTime: 'Ngắn', // Thời gian bán nhanh
    description: 'Thanh khoản ổn định, dòng tiền thu về từ khách hàng giúp thanh toán nợ và duy trì chu kỳ tái sản xuất.'
  },
  {
    id: 'credit-tightening',
    name: 'Siết Tín dụng',
    demand: 40,
    interestRate: 10,
    circulationTime: 'Kéo dài',
    description: 'Khách hàng khó vay tiền mua nhà, sức mua giảm sút. Doanh nghiệp kẹt vốn trong hàng hóa.'
  },
  {
    id: 'crisis',
    name: 'Khủng hoảng Tổng hợp',
    demand: 15,
    interestRate: 14,
    circulationTime: 'Đóng băng',
    description: 'Lãi suất cao cắt đứt dòng máu của cả người mua lẫn người bán. Thanh khoản đóng băng hoàn toàn.'
  }
];
