// Capital Lab Data - Nội dung học thuật cho trải nghiệm 3D

export const labState = {
  NORMAL: 'normal',
  WARNING: 'warning',
  CRISIS: 'crisis',
  RECOVERY: 'recovery'
};

export const capitalNodes = [
  {
    id: 'T',
    key: 'T',
    title: 'Tư bản tiền tệ',
    shortTitle: 'Tiền tệ',
    description: '10.000 tỷ đồng khoản vay ngân hàng',
    detail: 'Lượng tiền dùng để mua vật tư và thuê lao động. Đây là vốn vay, không phải tài sản có sẵn.',
    position: [-8, 0.5, 2],
    color: '#68cdd8',
    type: 'source'
  },
  {
    id: 'H',
    key: 'H',
    title: 'Tư liệu sản xuất & Sức lao động',
    shortTitle: 'Đầu vào',
    description: 'Đất, máy móc, vật liệu, nhân công',
    detail: 'Tư bản tiền tệ chuyển thành các yếu tố sản xuất thực tế.',
    position: [-4, 0.5, -2],
    color: '#68cdd8',
    type: 'input'
  },
  {
    id: 'SX',
    key: 'SX',
    title: 'Quá trình sản xuất',
    shortTitle: 'Sản xuất',
    description: 'Công trường tạo ra giá trị mới',
    detail: 'Sản xuất ra giá trị mới và giá trị thặng dư thông qua việc tiêu dùng sức lao động.',
    position: [0, 0.5, 0],
    color: '#5a7ea5',
    type: 'production'
  },
  {
    id: 'HP',
    key: "H'",
    title: 'Tư bản hàng hóa',
    shortTitle: 'Hàng hóa',
    description: 'Ba tòa tháp phần thô',
    detail: 'Chứa đựng giá trị thặng dư, chờ được đem ra thị trường để thực hiện giá trị.',
    position: [4, 0.5, -1],
    color: '#c2a558',
    type: 'commodity'
  },
  {
    id: 'TP',
    key: "T'",
    title: 'Tiền thu về sau tiêu thụ',
    shortTitle: 'Thanh khoản',
    description: 'Dòng tiền quay về',
    detail: 'Chỉ xuất hiện khi hàng hóa bán được. Điều kiện khởi động chu kỳ mới.',
    position: [8, 0.5, 2],
    color: '#6ecd9a',
    type: 'return'
  }
];

export const stakeholders = [
  {
    id: 'bank',
    title: 'Ngân hàng',
    role: 'Chủ nợ',
    impact: 'Siết tín dụng khi rủi ro tăng',
    position: [0, 3, -6],
    color: '#68cdd8',
    crisisEffect: 'Yêu cầu trả nợ, tăng lãi suất'
  },
  {
    id: 'workers',
    title: 'Công nhân',
    role: 'Lao động',
    impact: 'Mất việc làm khi dự án dừng',
    position: [-5, 3, -4],
    color: '#ff6e5c',
    crisisEffect: 'Thất nghiệp, mất thu nhập'
  },
  {
    id: 'suppliers',
    title: 'Nhà cung cấp',
    role: 'Đối tác',
    impact: 'Không nhận được thanh toán',
    position: [5, 3, -4],
    color: '#ffb84d',
    crisisEffect: 'Công nợ tăng, phá sản liên kết'
  },
  {
    id: 'buyers',
    title: 'Người mua',
    role: 'Khách hàng',
    impact: 'Giảm khả năng tiếp cận vốn',
    position: [7, 3, 1],
    color: '#a78bfa',
    crisisEffect: 'Không vay được, không mua được'
  },
  {
    id: 'state',
    title: 'Nhà nước',
    role: 'Quản lý',
    impact: 'Thu thuế giảm, rủi ro hệ thống',
    position: [-7, 3, 1],
    color: '#f472b6',
    crisisEffect: 'Phải can thiệp, cứu trợ'
  }
];

export const capitalFlowPath = [
  { from: 'T', to: 'H', label: 'Mua đầu vào' },
  { from: 'H', to: 'SX', label: 'Đưa vào sản xuất' },
  { from: 'SX', to: 'HP', label: 'Tạo hàng hóa' },
  { from: 'HP', to: 'TP', label: 'Tiêu thụ', critical: true },
  { from: 'TP', to: 'T', label: 'Chu kỳ mới', secondary: true }
];

export const labChapters = [
  {
    id: 'intro',
    number: 1,
    title: 'T — Khoản vốn ban đầu',
    eyebrow: 'CHẶNG 1 / 9',
    symbol: 'T',
    description: 'Alpha Corp vay ngân hàng 10.000 tỷ đồng. Đây là vốn vay, không phải tài sản có sẵn.',
    theory: 'T là tư bản tiền tệ — hình thái mở đầu của chu kỳ.',
    takeaway: 'Chu kỳ bắt đầu bằng tiền, không phải bằng tài sản.',
    focusNode: 'T',
    cameraPosition: [-8, 3, 8],
    cameraTarget: [-8, 0.5, 2],
    visibleNodes: ['T']
  },
  {
    id: 'inputs',
    number: 2,
    title: 'H — Đầu vào sản xuất',
    eyebrow: 'CHẶNG 2 / 9',
    symbol: 'H',
    description: 'Tiền chuyển thành đất, máy móc, vật liệu và sức lao động.',
    theory: 'Giai đoạn T → H: tư bản tiền tệ chuyển đổi thành các yếu tố sản xuất thực tế.',
    takeaway: 'Vốn vay phải chuyển thành đầu vào cụ thể.',
    focusNode: 'H',
    cameraPosition: [-4, 4, 6],
    cameraTarget: [-4, 0.5, -2],
    visibleNodes: ['T', 'H']
  },
  {
    id: 'production',
    number: 3,
    title: 'SX — Quá trình sản xuất',
    eyebrow: 'CHẶNG 3 / 9',
    symbol: 'SX',
    description: 'Công trường hoạt động. Máy móc và lao động tạo ra giá trị mới.',
    theory: 'Sản xuất tạo ra giá trị thặng dư thông qua việc tiêu dùng sức lao động.',
    takeaway: 'Giá trị mới được tạo ra trong quá trình lao động.',
    focusNode: 'SX',
    cameraPosition: [0, 6, 10],
    cameraTarget: [0, 0.5, 0],
    visibleNodes: ['T', 'H', 'SX']
  },
  {
    id: 'commodity',
    number: 4,
    title: 'H\' — Ba tòa tháp phần thô',
    eyebrow: 'CHẶNG 4 / 9',
    symbol: 'H\'',
    description: 'Ba tòa tháp phần thô đã hoàn thành, nhưng chưa được tiêu thụ trên thị trường.',
    theory: 'Giá trị đã sản xuất nhưng chưa chuyển thành tiền. Vốn bị neo lại trong hàng hóa.',
    takeaway: 'Có tài sản không có nghĩa là có thanh khoản.',
    focusNode: 'HP',
    cameraPosition: [4, 5, 8],
    cameraTarget: [4, 2, -1],
    visibleNodes: ['T', 'H', 'SX', 'HP']
  },
  {
    id: 'return',
    number: 5,
    title: 'T\' — Tiền thu về sau tiêu thụ',
    eyebrow: 'CHẶNG 5 / 9',
    symbol: 'T\'',
    description: 'Nếu bán được hàng, T\' sẽ xuất hiện. Đây là điều kiện để khởi động chu kỳ mới.',
    theory: 'Chỉ khi H\' được tiêu thụ thì T\' mới hình thành. Nếu không, chu kỳ bị gián đoạn.',
    takeaway: 'Điểm then chốt: H\' → T\' là khâu dễ vỡ nhất.',
    focusNode: 'TP',
    cameraPosition: [8, 4, 10],
    cameraTarget: [8, 0.5, 2],
    visibleNodes: ['T', 'H', 'SX', 'HP', 'TP']
  },
  {
    id: 'shock',
    number: 6,
    title: 'Cú sốc thị trường',
    eyebrow: 'CHẶNG 6 / 9',
    symbol: '⚠',
    description: 'Tín dụng bị siết. Lãi suất tăng. Sức mua giảm. H\' không còn bán được.',
    theory: 'Điều kiện bên ngoài thay đổi đột ngột, làm gián đoạn khả năng tiêu thụ.',
    takeaway: 'Khủng hoảng bắt nguồn từ mất cân bằng bên ngoài chu kỳ.',
    focusNode: 'HP',
    cameraPosition: [4, 6, 12],
    cameraTarget: [4, 1, -1],
    visibleNodes: ['T', 'H', 'SX', 'HP', 'TP']
  },
  {
    id: 'crisis',
    number: 7,
    title: 'Điểm đứt gãy: H\' ╳ T\'',
    eyebrow: 'CHẶNG 7 / 9',
    symbol: '╳',
    description: 'Dòng vốn dừng lại. H\' không chuyển thành T\'. Alpha Corp có tài sản nhưng mất thanh khoản.',
    theory: 'Chu kỳ tái sản xuất bị gián đoạn. Doanh nghiệp không thể trả nợ và khởi động lại hoạt động.',
    takeaway: 'Đây là lý do cơ bản của khủng hoảng thanh khoản.',
    focusNode: 'TP',
    cameraPosition: [6, 5, 12],
    cameraTarget: [6, 1, 0],
    visibleNodes: ['T', 'H', 'SX', 'HP', 'TP']
  },
  {
    id: 'ripple',
    number: 8,
    title: 'Hiệu ứng dây chuyền',
    eyebrow: 'CHẶNG 8 / 9',
    symbol: '⚡',
    description: 'Khủng hoảng lan tỏa: ngân hàng siết nợ, công nhân mất việc, nhà cung cấp không nhận được thanh toán.',
    theory: 'Một điểm đứt gãy tạo hiệu ứng lan tỏa trên toàn hệ thống kinh tế.',
    takeaway: 'Khủng hoảng vi mô có thể trở thành khủng hoảng vĩ mô.',
    focusNode: null,
    cameraPosition: [0, 10, 14],
    cameraTarget: [0, 2, -2],
    visibleNodes: ['T', 'H', 'SX', 'HP', 'TP']
  },
  {
    id: 'recovery',
    number: 9,
    title: 'Khôi phục chu kỳ',
    eyebrow: 'CHẶNG 9 / 9',
    symbol: '↻',
    description: 'Điều chỉnh dự phòng tiền tệ, vốn trong hàng hóa và khả năng tiêu thụ để nối lại H\' → T\'.',
    theory: 'Khôi phục thanh khoản để chu kỳ có thể tiếp tục.',
    takeaway: 'Giải quyết khủng hoảng đòi hỏi can thiệp cả cung và cầu.',
    focusNode: 'TP',
    cameraPosition: [0, 12, 18],
    cameraTarget: [0, 2, 0],
    visibleNodes: ['T', 'H', 'SX', 'HP', 'TP']
  }
];

export const recoveryControls = [
  {
    id: 'cash-reserve',
    label: 'Dự phòng tiền tệ',
    description: 'Tỷ lệ vốn giữ dưới dạng thanh khoản',
    min: 0,
    max: 100,
    optimal: { min: 20, max: 35 },
    unit: '%'
  },
  {
    id: 'capital-in-commodity',
    label: 'Vốn trong hàng hóa',
    description: 'Tỷ lệ vốn bị neo trong H\'',
    min: 0,
    max: 100,
    optimal: { min: 30, max: 50 },
    unit: '%'
  },
  {
    id: 'market-absorption',
    label: 'Khả năng tiêu thụ',
    description: 'Tốc độ thị trường hấp thụ hàng hóa',
    min: 0,
    max: 100,
    optimal: { min: 60, max: 85 },
    unit: '%'
  }
];

export const buildingData = {
  count: 3,
  positions: [
    [3, 0, -2],
    [5, 0, 0],
    [4, 0, 2]
  ],
  heights: [4.5, 5.2, 4.8],
  labels: ['Tòa A', 'Tòa B', 'Tòa C']
};
