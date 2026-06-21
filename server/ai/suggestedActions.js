const routeActions = {
  '/': [
    { id: 'explain', label: 'Giai thich don gian' },
    { id: 'summarize', label: 'Tom tat nhanh' },
    { id: 'debate-prep', label: 'Cau hoi phan bien' },
  ],
  '/capital-lab': [
    { id: 'analyze-stage', label: 'Giai thich chang hien tai' },
    { id: 'explain', label: 'Vi sao dong von dung?' },
    { id: 'it-analogy', label: 'Giai thich kieu IT' },
  ],
  '/simulators': [
    { id: 'analyze-simulation', label: 'Phan tich quyet dinh' },
    { id: 'summarize', label: 'Tom tat trang thai' },
    { id: 'explain', label: 'Can dieu chinh gi?' },
  ],
  '/quiz': [
    { id: 'quiz-hint', label: 'Cho mot goi y' },
    { id: 'quiz-explanation', label: 'Giai thich dap an' },
    { id: 'it-analogy', label: 'Theo cach IT' },
  ],
  '/story': [
    { id: 'summarize', label: 'Tom tat chuong' },
    { id: 'explain', label: 'Giai thich chuong' },
    { id: 'debate-prep', label: 'Cau hoi phan bien' },
  ],
};

export function getSuggestedActions(route) {
  return routeActions[route] || routeActions['/'];
}
