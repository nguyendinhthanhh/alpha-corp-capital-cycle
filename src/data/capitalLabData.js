// Capital Lab Data - Nội dung học thuật cho trải nghiệm MISSION: UNLOCK THE CAPITAL FLOW

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
    nodeType: 'currency',    // đồng xu nhiều lớp
    type: 'source'
  },
  {
    id: 'H',
    key: 'H',
    title: 'Tư liệu sản xuất & Sức lao động',
    shortTitle: 'Đầu vào',
    description: 'Đất, máy móc, vật liệu, nhân công',
    detail: 'Tư bản tiền tệ chuyển thành các yếu tố sản xuất thực tế.',
    position: [-4, 0.5, -1],
    color: '#68cdd8',
    nodeType: 'inputs',      // cụm 4 khối nhỏ
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
    nodeType: 'production',  // platform + crane
    type: 'production'
  },
  {
    id: 'HP',
    key: "H'",
    title: 'Tư bản hàng hóa',
    shortTitle: 'Hàng hóa',
    description: 'Ba tòa tháp phần thô',
    detail: 'Chứa đựng giá trị thặng dư, chờ được đem ra thị trường để thực hiện giá trị.',
    position: [5, 0.5, -1],
    color: '#c2a558',
    nodeType: 'commodity',   // ba tòa tháp (dùng BuildingCluster)
    type: 'commodity'
  },
  {
    id: 'TP',
    key: "T'",
    title: 'Tiền thu về sau tiêu thụ',
    shortTitle: 'Thanh khoản',
    description: 'Dòng tiền quay về',
    detail: 'Chỉ xuất hiện khi hàng hóa bán được. Điều kiện khởi động chu kỳ mới.',
    position: [9, 0.5, 2],
    color: '#6ecd9a',
    nodeType: 'gateway',     // vòng cổng thanh khoản
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

// 6 Missions thay vì 9 chặng
export const labMissions = [
  {
    id: 'source',
    number: 1,
    title: 'Nguồn vốn ban đầu',
    eyebrow: 'NHIỆM VỤ 1 / 6',
    symbol: 'T',
    formulaHighlight: 'T',
    description: 'Alpha Corp vay ngân hàng 10.000 tỷ đồng. Đây là vốn vay, không phải tài sản có sẵn.',
    theory: 'T là tư bản tiền tệ — hình thái mở đầu của chu kỳ tuần hoàn tư bản.',
    takeaway: 'Chu kỳ bắt đầu bằng tiền, không phải bằng tài sản.',
    interaction: 'Nhấn vào nguồn vốn để xem phân tích chi tiết.',
    focusNode: 'T',
    cameraPosition: [-8, 3, 8],
    cameraTarget: [-8, 0.5, 2],
    visibleNodes: ['T']
  },
  {
    id: 'inputs',
    number: 2,
    title: 'Phân bổ đầu vào sản xuất',
    eyebrow: 'NHIỆM VỤ 2 / 6',
    symbol: 'H',
    formulaHighlight: 'H',
    description: 'Tiền chuyển thành đất, máy móc, vật liệu và sức lao động.',
    theory: 'Giai đoạn T → H: tư bản tiền tệ chuyển đổi thành các yếu tố sản xuất thực tế.',
    takeaway: 'Vốn vay phải chuyển thành đầu vào cụ thể.',
    interaction: 'Nhấn vào từng nhóm đầu vào để xem 10.000 tỷ được phân bổ thế nào.',
    focusNode: 'H',
    cameraPosition: [-2, 7, 10],
    cameraTarget: [-4, 0, 0],
    visibleNodes: ['T', 'H']
  },
  {
    id: 'production',
    number: 3,
    title: 'Xây dựng tòa tháp',
    eyebrow: 'NHIỆM VỤ 3 / 6',
    symbol: 'SX',
    formulaHighlight: 'SX',
    description: 'Công trường hoạt động. Máy móc và lao động tạo ra giá trị mới — ba tòa tháp phần thô.',
    theory: 'Sản xuất tạo ra giá trị thặng dư thông qua việc tiêu dùng sức lao động.',
    takeaway: 'Giá trị mới được tạo ra trong quá trình lao động, kết tinh trong hàng hóa.',
    interaction: 'Quan sát quá trình xây dựng và sự hình thành của H\'.',
    focusNode: 'SX',
    cameraPosition: [2, 5, 10],
    cameraTarget: [2, 1, 0],
    visibleNodes: ['T', 'H', 'SX', 'HP']
  },
  {
    id: 'commodity',
    number: 4,
    title: 'Ba tòa tháp & cổng thanh khoản',
    eyebrow: 'NHIỆM VỤ 4 / 6',
    symbol: "H'",
    formulaHighlight: 'HP',
    description: 'Ba tòa tháp phần thô đã hoàn thành. Giá trị đang nằm trong công trình, chờ tiêu thụ để trở thành T\'.',
    theory: 'H\' chứa giá trị thặng dư nhưng chưa thực hiện. Vốn bị neo lại trong hàng hóa.',
    takeaway: 'Có tài sản không có nghĩa là có thanh khoản. H\' → T\' là khâu then chốt.',
    interaction: 'Nhấn vào tòa tháp để xem giá trị bị khóa. Quan sát cổng T\'.',
    focusNode: 'HP',
    cameraPosition: [6, 5, 12],
    cameraTarget: [6, 1, 0],
    visibleNodes: ['T', 'H', 'SX', 'HP', 'TP']
  },
  {
    id: 'crisis',
    number: 5,
    title: 'Đóng băng dòng vốn',
    eyebrow: 'NHIỆM VỤ 5 / 6',
    symbol: '╳',
    formulaHighlight: 'crisis',
    description: 'Tín dụng bị siết. Lãi suất tăng. Sức mua giảm. H\' không bán được. Dòng vốn đóng băng.',
    theory: 'Chu kỳ tái sản xuất bị gián đoạn. Doanh nghiệp không thể trả nợ và khởi động lại.',
    takeaway: 'Đây là lý do cơ bản của khủng hoảng thanh khoản bất động sản.',
    interaction: 'Nhấn "Kích hoạt cú sốc thị trường" để quan sát dòng vốn đóng băng.',
    focusNode: 'TP',
    cameraPosition: [7, 4, 10],
    cameraTarget: [7, 1, 1],
    visibleNodes: ['T', 'H', 'SX', 'HP', 'TP']
  },
  {
    id: 'recovery',
    number: 6,
    title: 'Giải phóng dòng vốn',
    eyebrow: 'NHIỆM VỤ 6 / 6',
    symbol: '↻',
    formulaHighlight: 'recovery',
    description: 'Điều chỉnh dự phòng tiền tệ, vốn trong hàng hóa và khả năng tiêu thụ để nối lại H\' → T\'.',
    theory: 'Khôi phục thanh khoản để chu kỳ có thể tiếp tục hoạt động.',
    takeaway: 'Tuần hoàn chỉ được duy trì khi các hình thái cùng tồn tại và liên tục chuyển hóa.',
    interaction: 'Điều chỉnh 3 thông số để khôi phục dòng vốn.',
    focusNode: 'TP',
    cameraPosition: [0, 10, 18],
    cameraTarget: [0, 1, 0],
    visibleNodes: ['T', 'H', 'SX', 'HP', 'TP']
  }
];

// Keep backward compat alias
export const labChapters = labMissions;

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
    [4, 0, -2],
    [6, 0, 0],
    [5, 0, 2]
  ],
  heights: [4.5, 5.2, 4.8],
  labels: ['Tòa A', 'Tòa B', 'Tòa C']
};
