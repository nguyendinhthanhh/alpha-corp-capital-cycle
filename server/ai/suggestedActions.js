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
  '/learn': [
    { id: 'summarize-progress', label: 'Tom tat progress' },
    { id: 'recommend-next-step', label: 'Nen hoc gi tiep?' },
    { id: 'debate-prep', label: 'Cau hoi phan bien' },
  ],
  '/learn/quiz': [
    { id: 'quiz-hint', label: 'Cho mot goi y' },
    { id: 'quiz-explanation', label: 'Vi sao toi sai?' },
    { id: 'similar-question', label: 'Tao cau tuong tu' },
  ],
  '/learn/daily': [
    { id: 'quiz-hint', label: 'Cho mot goi y' },
    { id: 'summarize', label: 'Tom tat challenge' },
    { id: 'it-analogy', label: 'Theo cach IT' },
  ],
  '/learn/review': [
    { id: 'quiz-explanation', label: 'Nhac lai khai niem' },
    { id: 'recommend-next-step', label: 'Nen on gi tiep?' },
    { id: 'it-analogy', label: 'Theo cach IT' },
  ],
  '/learn/case-mission': [
    { id: 'analyze-mission', label: 'Phan tich quyet dinh' },
    { id: 'explain', label: 'Diem mat can bang nam o dau?' },
    { id: 'summarize', label: 'Tom tat trade-off' },
  ],
  '/learn/debate': [
    { id: 'debate-feedback', label: 'Phan bien lap luan' },
    { id: 'summarize', label: 'Tom tat quan diem' },
    { id: 'debate-prep', label: 'Hoi phan bien tiep' },
  ],
  '/learn/progress': [
    { id: 'explain-back', label: 'Danh gia Explain It Back' },
    { id: 'summarize-progress', label: 'Tom tat tien do' },
    { id: 'recommend-next-step', label: 'Nen hoc gi tiep?' },
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
