export const debatePrompts = [
  {
    id: 'debate-hprime',
    level: 'basic',
    prompt: 'Vốn của Alpha Corp có hoàn toàn nằm ở H’ khi thị trường đóng băng không? Hãy lập luận ngắn gọn.',
    conceptIds: ['commodity-capital', 'liquidity', 'capital-circuit'],
  },
  {
    id: 'debate-price-cut',
    level: 'analysis',
    prompt: 'Giảm giá nhà có chắc khôi phục được T’ không? Hãy nêu ít nhất hai điều kiện phải xét thêm.',
    conceptIds: ['market', 'liquidity', 'capital-turnover'],
  },
  {
    id: 'debate-credit',
    level: 'analysis',
    prompt: 'Ngân hàng nên nhìn khủng hoảng của Alpha Corp như vấn đề tài sản hay vấn đề thanh khoản? Giải thích.',
    conceptIds: ['liquidity', 'interest', 'market'],
  },
  {
    id: 'debate-space',
    level: 'counterargument',
    prompt: 'Alpha Corp đã vi phạm điều kiện không gian ra sao? Trả lời như đang phản biện một người chỉ nhìn tổng tài sản.',
    conceptIds: ['spatial-condition', 'money-capital', 'commodity-capital'],
  },
  {
    id: 'debate-time',
    level: 'counterargument',
    prompt: 'Điều kiện thời gian bị gián đoạn ở đâu khi công trình vẫn thi công nhưng tiền không quay về?',
    conceptIds: ['temporal-condition', 'circulation-time', 'capital-turnover'],
  },
  {
    id: 'debate-profit-interest',
    level: 'basic',
    prompt: 'Vì sao cần phân biệt lợi nhuận với lợi tức khi phân tích khủng hoảng của Alpha Corp?',
    conceptIds: ['profit', 'interest', 'surplus-value'],
  },
];

