export const caseStatus = [
  { label: 'Khoản vay', value: '10.000 tỷ đồng', tone: 'gold' },
  { label: 'Dự án', value: 'Khu đô thị cao cấp ven biển', tone: 'muted' },
  { label: 'Tiến độ', value: '3 tòa tháp hoàn thành phần thô', tone: 'muted' },
  { label: 'Sức mua thị trường', value: 'Giảm mạnh', tone: 'danger' },
  { label: 'Tình trạng hàng hóa', value: 'Không tiêu thụ được', tone: 'danger' },
  { label: 'Thanh khoản', value: 'Nguy cấp', tone: 'danger' },
  { label: 'Điểm tắc nghẽn', value: "H' → T'", tone: 'blue' },
];

export const heroFlowStages = [
  { key: 'T', title: 'Tư bản tiền tệ', detail: 'Khoản vay dùng để khởi động dự án.' },
  { key: 'H', title: 'Tư liệu sản xuất và sức lao động', detail: 'Đất, máy móc, vật liệu, nhân công.' },
  { key: 'SX', title: 'Quá trình sản xuất', detail: 'Công trình thi công ngày đêm để tạo giá trị mới.' },
  { key: "H'", title: 'Ba tòa tháp và giá trị chưa thực hiện', detail: 'Vốn bị neo trong bất động sản và công trình dở dang.' },
  { key: "T'", title: 'Tiền thu về sau tiêu thụ', detail: 'Dòng tiền chỉ hình thành khi hàng hóa được bán.' },
];

export const timelineSteps = [
  { order: '01', title: 'Alpha Corp vay 10.000 tỷ đồng', stage: 'T', note: 'Tư bản bắt đầu dưới hình thái tiền tệ.' },
  { order: '02', title: 'Mua đất, máy móc, vật liệu và thuê nhân công', stage: 'T → H', note: 'Tiền chuyển hóa thành đầu vào sản xuất.' },
  { order: '03', title: 'Thi công phần thô ba tòa tháp', stage: 'SX', note: 'Giá trị mới chỉ được tạo ra trong quá trình sản xuất.' },
  { order: '04', title: 'Tín dụng bị siết chặt', stage: 'Lưu thông', note: 'Điều kiện thị trường bắt đầu gây áp lực lên tiêu thụ.' },
  { order: '05', title: 'Lãi suất tăng', stage: 'Lưu thông', note: 'Chi phí vay và khả năng tiếp cận tín dụng xấu đi.' },
  { order: '06', title: 'Người dân không đủ sức mua', stage: "H'", note: 'Hàng hóa tồn tại nhưng sức mua xã hội suy yếu.' },
  { order: '07', title: 'Bất động sản không bán được', stage: "H' → T'", note: 'Giá trị hàng hóa không được thực hiện trên thị trường.' },
  { order: '08', title: 'Dòng tiền không quay trở lại', stage: "T' bị đình trệ", note: 'Chu kỳ kế tiếp không thể bắt đầu.' },
];

export const flowNodes = [
  {
    id: 'loan',
    label: 'Khoản vay',
    capitalForm: 'Tư bản tiền tệ (T)',
    activity: 'Kích hoạt dự án bằng tín dụng.',
    theory: 'T là hình thái mở đầu của tuần hoàn tư bản.',
    risk: 'Áp lực trả lãi xuất hiện ngay khi vốn được giải ngân.',
  },
  {
    id: 'land',
    label: 'Đất',
    capitalForm: 'Một phần của H',
    activity: 'Khóa vốn vào quỹ đất và pháp lý dự án.',
    theory: 'Đầu vào sản xuất phải được gom đủ để quá trình SX diễn ra.',
    risk: 'Vốn chôn dài hạn, khó chuyển ngược thành tiền mặt nhanh.',
  },
  {
    id: 'machines',
    label: 'Máy móc',
    capitalForm: 'Tư bản bất biến (c)',
    activity: 'Tổ chức năng lực thi công tại công trường.',
    theory: 'Tư bản bất biến chuyển giá trị sang sản phẩm, không tự tạo giá trị mới.',
    risk: 'Khấu hao vẫn diễn ra ngay cả khi tiêu thụ đình trệ.',
  },
  {
    id: 'materials',
    label: 'Vật liệu',
    capitalForm: 'Tư bản bất biến (c)',
    activity: 'Xi măng, sắt thép, hạ tầng phần thô.',
    theory: 'Giá trị vật liệu chỉ được bảo tồn rồi chuyển vào hàng hóa mới.',
    risk: 'Dở dang kéo dài làm đội chi phí bảo quản và bổ sung vốn.',
  },
  {
    id: 'labor',
    label: 'Sức lao động',
    capitalForm: 'Tư bản khả biến (v)',
    activity: 'Trả lương cho kỹ sư và công nhân xây dựng.',
    theory: 'Tư bản khả biến là nguồn gốc tạo ra giá trị mới và giá trị thặng dư.',
    risk: 'Dòng tiền kẹt dẫn tới nợ lương và đình trệ sản xuất.',
  },
  {
    id: 'production',
    label: 'Sản xuất',
    capitalForm: 'SX',
    activity: 'Các đầu vào kết hợp để tạo công trình phần thô.',
    theory: 'SX là giai đoạn quyết định việc sản xuất ra giá trị và giá trị thặng dư.',
    risk: 'Nếu đầu vào hoặc tiền lương đứt đoạn, SX dừng ngay.',
  },
  {
    id: 'towers',
    label: 'Ba tòa tháp phần thô',
    capitalForm: "H'",
    activity: 'Giá trị tích tụ trong bất động sản và công trình dở dang.',
    theory: "H' là tư bản hàng hóa chứa giá trị cần được thực hiện qua lưu thông.",
    risk: 'Tài sản lớn nhưng chưa thể trở thành tiền nếu không bán được.',
  },
  {
    id: 'market',
    label: 'Chờ tiêu thụ',
    capitalForm: "H' trong lưu thông",
    activity: 'Phụ thuộc vào tín dụng, lãi suất và sức mua xã hội.',
    theory: 'Thời gian lưu thông càng kéo dài, chu chuyển vốn càng chậm.',
    risk: 'Thị trường đóng băng làm H’ mắc kẹt trước cửa T’.',
  },
  {
    id: 'freeze',
    label: 'Tắc nghẽn',
    capitalForm: "H' ⇢ T' thất bại",
    activity: 'Giá trị hàng hóa không được thực hiện.',
    theory: 'Điểm nghẽn chính của Alpha Corp nằm ở H’ không chuyển thành T’.',
    risk: 'Không có tiền cho lãi vay, vật liệu mới, lương và chu kỳ kế tiếp.',
  },
];

export const crisisSignals = [
  { label: 'Tín dụng', calm: 'Thông suốt', crisis: 'Bị siết chặt', tone: 'blue' },
  { label: 'Lãi suất', calm: 'Ổn định', crisis: 'Tăng mạnh', tone: 'danger' },
  { label: 'Sức mua', calm: 'Có khả năng hấp thụ', crisis: 'Suy giảm', tone: 'danger' },
  { label: 'Thời gian lưu thông', calm: 'Ngắn', crisis: 'Kéo dài', tone: 'gold' },
  { label: 'Thanh khoản', calm: 'Có vùng đệm', crisis: 'Nguy cấp', tone: 'danger' },
  { label: 'Chu kỳ kế tiếp', calm: 'Có thể tái khởi động', crisis: 'Không thể bắt đầu', tone: 'danger' },
];

export const cascadeActors = [
  {
    id: 'alpha',
    name: 'Alpha Corp',
    impact: 'Không thu hồi được tiền, đứt dòng tiền hoạt động, không mở được chu kỳ mới.',
  },
  {
    id: 'bank',
    name: 'Ngân hàng',
    impact: 'Khoản vay chuyển sang nhóm rủi ro cao, áp lực thu hồi nợ và trích lập tăng lên.',
  },
  {
    id: 'workers',
    name: 'Công nhân',
    impact: 'Nợ lương kéo dài, sức lao động không còn được tái sản xuất bình thường.',
  },
  {
    id: 'suppliers',
    name: 'Nhà cung cấp',
    impact: 'Không bán được vật liệu cho chu kỳ sau, công nợ bị treo, đứt chuỗi cung ứng.',
  },
  {
    id: 'buyers',
    name: 'Người mua nhà',
    impact: 'Khó tiếp cận tín dụng, trì hoãn quyết định mua, làm kéo dài thời gian lưu thông.',
  },
  {
    id: 'state',
    name: 'Nhà nước',
    impact: 'Áp lực ổn định thị trường, việc làm và hệ thống tín dụng tăng lên cùng lúc.',
  },
];

export const theoryTopics = [
  {
    title: 'Tư bản tiền tệ là gì?',
    definition: 'Là hình thái mở đầu của tư bản, thực hiện chức năng mua tư liệu sản xuất và sức lao động.',
    example: 'Khoản vay 10.000 tỷ đồng của Alpha Corp tồn tại ban đầu dưới dạng T.',
    consequence: 'Nếu T bị phân bổ sai hoặc cạn kiệt sớm, dự án không thể đi vào sản xuất.',
    memory: 'Không có T, chu kỳ không thể khởi động.',
  },
  {
    title: 'Tư bản sản xuất là gì?',
    definition: 'Là tư bản nằm trong giai đoạn SX, nơi đầu vào được kết hợp để tạo ra giá trị mới.',
    example: 'Công trường thi công phần thô là nơi vốn vay chuyển hóa thành tư bản sản xuất.',
    consequence: 'SX bị gián đoạn sẽ phá hỏng cả giá trị đang hình thành lẫn chu kỳ tái sản xuất.',
    memory: 'Chỉ trong SX mới tạo ra giá trị mới.',
  },
  {
    title: 'Tư bản hàng hóa là gì?',
    definition: "Là H', tức sản phẩm mang giá trị cũ cộng giá trị mới, đang chờ được thực hiện qua lưu thông.",
    example: 'Ba tòa tháp phần thô chứa phần lớn vốn đã ứng ra, nhưng chưa tạo ra tiền thu về.',
    consequence: "Nếu H' không bán được, giá trị bị treo trong hình thái hàng hóa.",
    memory: "Tài sản lớn chưa chắc đã là tiền, nếu nó vẫn còn ở H'.",
  },
  {
    title: "Vì sao điểm tắc nghẽn nằm ở H' → T'?",
    definition: 'Vì đây là giai đoạn thực hiện giá trị hàng hóa trên thị trường.',
    example: 'Alpha Corp có công trình, nhưng không có giao dịch đủ để chuyển hàng hóa thành tiền.',
    consequence: 'Không có T’, doanh nghiệp mất thanh khoản và không tái khởi động được chu kỳ sau.',
    memory: "Khủng hoảng bùng lên khi H' đứng yên trước cửa T'.",
  },
  {
    title: 'Điều kiện liên tục về mặt không gian',
    definition: 'Các bộ phận tư bản phải cùng tồn tại đồng thời dưới ba hình thái khác nhau.',
    example: 'Một phần vốn còn là tiền dự phòng, một phần đang ở công trường, một phần ở hàng hóa chờ bán.',
    consequence: 'Nếu mọi vốn bị dồn hết vào một khâu, doanh nghiệp dễ mất khả năng xoay xở.',
    memory: 'Tuần hoàn liên tục đòi hỏi vốn phân thân trong không gian.',
  },
  {
    title: 'Điều kiện liên tục về mặt thời gian',
    definition: 'Các giai đoạn phải nối tiếp nhau không đứt quãng.',
    example: 'Sau khi bán hàng hóa, tiền phải quay về đủ nhanh để trả nợ và tái đầu tư.',
    consequence: 'Khoảng dừng quá lâu giữa các giai đoạn làm chu chuyển chậm và dễ phát nổ tài chính.',
    memory: 'Chu kỳ không chỉ cần đủ khâu, mà còn cần đúng nhịp.',
  },
  {
    title: 'Thời gian sản xuất',
    definition: 'Khoảng thời gian vốn nằm trong SX để tạo ra sản phẩm.',
    example: 'Hai năm thi công phần thô khiến vốn neo lâu trong công trường.',
    consequence: 'Dự án càng dài, nhu cầu vốn lưu động và khả năng chịu biến động càng lớn.',
    memory: 'Thời gian sản xuất dài làm vốn chậm quay.',
  },
  {
    title: 'Thời gian lưu thông',
    definition: 'Khoảng thời gian hàng hóa nằm ngoài SX để chờ bán hoặc tiền chờ mua đầu vào mới.',
    example: 'Khi thị trường đóng băng, ba tòa tháp phần thô kéo dài thời gian lưu thông.',
    consequence: 'Vốn không quay lại đúng lúc, kéo theo thiếu tiền mặt và đổ vỡ dây chuyền.',
    memory: 'Lưu thông kéo dài là tín hiệu thanh khoản đang xấu đi.',
  },
  {
    title: 'Chu chuyển tư bản',
    definition: 'Là sự tuần hoàn được lặp đi lặp lại nhiều lần với tốc độ nhất định.',
    example: 'Alpha Corp chỉ sống khỏe nếu tiền bán kỳ trước đủ nuôi kỳ tiếp theo.',
    consequence: 'Chu chuyển chậm làm suy yếu khả năng sinh lời và tăng lệ thuộc vào nợ.',
    memory: 'Sinh lời không chỉ cần giá trị thặng dư, mà còn cần tốc độ quay vòng.',
  },
  {
    title: 'Vì sao nhiều tài sản không đồng nghĩa với thanh khoản?',
    definition: 'Vì tài sản có thể đang bị đóng băng trong hình thái chưa thể bán hoặc khó chuyển thành tiền nhanh.',
    example: 'Ba tòa tháp phần thô là tài sản lớn, nhưng không giúp Alpha Corp trả lãi ngay lập tức.',
    consequence: 'Doanh nghiệp có thể giàu tài sản nhưng vẫn vỡ thanh khoản.',
    memory: 'Thanh khoản đo khả năng quay về tiền, không đo kích thước bảng tài sản.',
  },
];

export const quickQuiz = [
  {
    question: 'Alpha Corp bị mắc kẹt chủ yếu ở hình thái nào?',
    answer: "H' , tức tư bản hàng hóa chưa thể thực hiện giá trị trên thị trường.",
  },
  {
    question: "Vì sao H' chưa thể trở thành T'?",
    answer: 'Vì tín dụng bị siết, lãi suất tăng và sức mua suy giảm, khiến hàng hóa không tiêu thụ được.',
  },
  {
    question: 'Điều kiện nào bảo đảm tuần hoàn tư bản diễn ra liên tục?',
    answer: 'Các bộ phận tư bản phải cùng tồn tại về không gian và các giai đoạn phải nối tiếp liên tục về thời gian.',
  },
];
