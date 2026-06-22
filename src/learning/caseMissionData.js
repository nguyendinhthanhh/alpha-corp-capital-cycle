export const missionScenarios = [
  {
    id: 'credit-tightening',
    title: 'Tín dụng bị siết',
    description: 'Khả năng vay mới giảm, áp lực duy trì dự phòng tiền tệ tăng lên.',
    effect: { liquidity: -10, continuity: -5, interest: -8 },
  },
  {
    id: 'interest-hike',
    title: 'Lãi suất tăng',
    description: 'Chi phí vốn vay cao hơn, nghĩa vụ lãi đè nặng lên dòng tiền ngắn hạn.',
    effect: { liquidity: -8, continuity: -4, interest: -14 },
  },
  {
    id: 'weak-demand',
    title: 'Sức mua giảm',
    description: 'Thời gian lưu thông kéo dài vì hàng hóa tiêu thụ chậm.',
    effect: { liquidity: -12, continuity: -10, marketability: -14 },
  },
  {
    id: 'circulation-delay',
    title: 'Lưu thông kéo dài',
    description: 'Tốc độ quay về của T’ giảm mạnh, chu kỳ sau đứng trước nguy cơ chậm nhịp.',
    effect: { liquidity: -14, continuity: -15, marketability: -8 },
  },
];

export const missionInterventions = [
  {
    id: 'keep-cash-buffer',
    label: 'Duy trì dự phòng tiền tệ',
    summary: 'Bảo vệ khả năng chi trả nghĩa vụ ngắn hạn.',
    effect: { liquidity: 18, spatial: 10, continuity: 4 },
  },
  {
    id: 'slow-expansion',
    label: 'Giảm tốc độ mở rộng dự án',
    summary: 'Hạn chế tích tụ thêm H’ khi đầu ra chưa chắc chắn.',
    effect: { liquidity: 10, continuity: 8, marketability: 6 },
  },
  {
    id: 'finish-sellable-units',
    label: 'Tập trung hoàn thiện phần có thể tiêu thụ',
    summary: 'Ưu tiên khâu giúp H’ có cơ hội chuyển thành T’.',
    effect: { marketability: 18, continuity: 12, reproduction: 6 },
  },
  {
    id: 'adjust-investment-pace',
    label: 'Điều chỉnh tiến độ đầu tư',
    summary: 'Cân lại nhịp chi vốn so với tốc độ quay về của tiền.',
    effect: { continuity: 15, temporal: 12, liquidity: 4 },
  },
  {
    id: 'protect-wages',
    label: 'Bảo đảm nghĩa vụ tiền lương',
    summary: 'Giữ năng lực tiếp tục SX và tránh đứt chuỗi vận động.',
    effect: { continuity: 10, reproduction: 10, spatial: 4 },
  },
  {
    id: 'restore-sales-channel',
    label: 'Tìm cách khôi phục khả năng tiêu thụ',
    summary: 'Nhắm trực tiếp vào khâu H’ → T’.',
    effect: { marketability: 20, temporal: 10, liquidity: 8 },
  },
];

