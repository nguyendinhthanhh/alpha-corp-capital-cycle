const contexts = {
  '/': [
    { id: 'simplify', label: 'Giai thich don gian', prompt: 'Giai thich phan nay theo cach ngan gon, de hieu.' },
    { id: 'explain', label: 'Vi du Alpha Corp', prompt: 'Cho vi du Alpha Corp de minh hoa phan nay.' },
    { id: 'summarize', label: 'Tom tat nhanh', prompt: 'Tom tat nhanh phan dang xem trong 3 y.' },
    { id: 'debate-prep', label: 'Hoi phan bien', prompt: 'Dat mot cau hoi phan bien de toi tu tra loi.' },
  ],
  '/capital-lab': [
    { id: 'analyze-stage', label: 'Chang nay co y nghia gi?', prompt: 'Giai thich y nghia cua chang Capital Lab hien tai.' },
    { id: 'explain', label: 'Vi sao dong von dung?', prompt: 'Phan tich ly do dong von dang dung hoac bi nghen.' },
    { id: 'it-analogy', label: 'Giai thich kieu IT', prompt: 'Giai thich chang nay bang phep so sanh cua sinh vien IT.' },
    { id: 'summarize', label: 'Tiep theo se gi?', prompt: 'Tom tat he qua tiep theo dua tren context hien tai.' },
  ],
  '/simulators': [
    { id: 'analyze-simulation', label: 'Phan tich quyet dinh', prompt: 'Phan tich quyet dinh phan bo von hien tai cua toi.' },
    { id: 'explain', label: 'Toi thieu dieu kien nao?', prompt: 'Chi ra toi dang vi pham dieu kien khong gian hay thoi gian nao.' },
    { id: 'summarize', label: 'Cai thien thanh khoan', prompt: 'Tom tat can dieu chinh gi de cai thien thanh khoan.' },
    { id: 'analyze-simulation', label: 'So sanh kich ban', prompt: 'So sanh trang thai nay voi kich ban truoc do.' },
  ],
  '/quiz': [
    { id: 'quiz-hint', label: 'Cho mot goi y', prompt: 'Cho toi mot goi y cho cau quiz hien tai ma chua lo dap an.' },
    { id: 'quiz-explanation', label: 'Giai thich dap an', prompt: 'Giai thich vi sao dap an dung va vi sao cac lua chon khac sai.' },
    { id: 'it-analogy', label: 'Theo kieu IT', prompt: 'Giai thich cau quiz bang vi du cua sinh vien IT.' },
    { id: 'evaluate-answer', label: 'Danh gia cau tra loi', prompt: 'Danh gia cach toi dang hieu cau hoi nay va chi ra cho con thieu.' },
  ],
  '/story': [
    { id: 'summarize', label: 'Tom tat chuong', prompt: 'Tom tat chuong dang xem trong 3 y.' },
    { id: 'explain', label: 'Giai thich chuong', prompt: 'Giai thich chuong dang xem bang ngon ngu don gian.' },
    { id: 'explain', label: 'Lien he Alpha Corp', prompt: 'Lien he chuong nay voi tinh huong Alpha Corp.' },
    { id: 'debate-prep', label: 'Cau hoi phan bien', prompt: 'Dat mot cau hoi phan bien de toi suy nghi sau hon.' },
  ],
  '/appendix': [
    { id: 'explain', label: 'AI dung de lam gi?', prompt: 'Giai thich AI Capital Tutor duoc dung de lam gi trong du an nay.' },
    { id: 'summarize', label: 'Context dang gui gi?', prompt: 'Tom tat AI nhan nhung context nao va khong nhan nhung gi.' },
    { id: 'explain', label: 'Co che fallback', prompt: 'Giai thich co che fallback cua AI Capital Tutor.' },
    { id: 'explain', label: 'Nguon kiem chung', prompt: 'Mo ta cach AI va nhom kiem chung noi dung hoc thuat.' },
  ],
};

export function getContextualActions(pageContext = {}) {
  return contexts[pageContext.route || '/'] || contexts['/'];
}
