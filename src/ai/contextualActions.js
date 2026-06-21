const contexts = {
  '/': [
    { id: 'explain-simple', label: 'Giai thich don gian', prompt: 'Giai thich phan nay theo cach ngan gon, de hieu.' },
    { id: 'alpha-example', label: 'Vi du Alpha Corp', prompt: 'Cho vi du Alpha Corp de minh hoa khong gian nay.' },
    { id: 'compare-concepts', label: 'So sanh khai niem', prompt: 'So sanh cac khai niem lien quan dang xuat hien o day.' },
    { id: 'ask-back', label: 'Hoi lai toi', prompt: 'Dat lai mot cau hoi kiem tra nhanh de toi tu tra loi.' },
  ],
  '/capital-lab': [
    { id: 'chapter-meaning', label: 'Chang nay co y nghia gi?', prompt: 'Giai thich y nghia cua chap Capital Lab hien tai.' },
    { id: 'flow-stall', label: 'Vi sao dong von dung?', prompt: 'Phan tich ly do dong von dang dung hoac bi nghen.' },
    { id: 'it-analogy', label: 'Giai thich kieu IT', prompt: 'Giai thich chap nay bang phep so sanh cua sinh vien IT.' },
    { id: 'next-step', label: 'Tiep theo se gi?', prompt: 'Du doan chapter hoac he qua tiep theo dua tren context hien tai.' },
  ],
  '/simulators': [
    { id: 'analyze-decision', label: 'Phan tich quyet dinh', prompt: 'Phan tich quyet dinh phan bo von hien tai cua toi.' },
    { id: 'condition-gap', label: 'Toi thieu dieu kien nao?', prompt: 'Chi ra toi dang vi pham dieu kien khong gian hay thoi gian nao.' },
    { id: 'improve-liquidity', label: 'Cai thien thanh khoan', prompt: 'Goi y cach cai thien thanh khoan theo mo hinh hoc thuat.' },
    { id: 'compare-scenario', label: 'So sanh kich ban', prompt: 'So sanh trang thai nay voi kich ban truoc do.' },
  ],
  '/quiz': [
    { id: 'quiz-hint', label: 'Cho mot goi y', prompt: 'Cho toi mot goi y cho cau quiz hien tai ma chua lo dap an.' },
    { id: 'quiz-explain', label: 'Giai thich dap an', prompt: 'Giai thich vi sao dap an dung va vi sao cac lua chon khac sai.' },
    { id: 'quiz-it', label: 'Theo kieu IT', prompt: 'Giai thich cau quiz bang vi du cua sinh vien IT.' },
    { id: 'quiz-new', label: 'Tao cau tuong tu', prompt: 'Tao mot cau hoi tuong tu de toi luyen them.' },
  ],
  '/story': [
    { id: 'summarize-chapter', label: 'Tom tat chuong', prompt: 'Tom tat chuong dang xem trong 3 y.' },
    { id: 'explain-chapter', label: 'Giai thich chuong', prompt: 'Giai thich chuong dang xem bang ngon ngu don gian.' },
    { id: 'alpha-link', label: 'Lien he Alpha Corp', prompt: 'Lien he chuong nay voi tinh huong Alpha Corp.' },
    { id: 'debate-question', label: 'Cau hoi phan bien', prompt: 'Dat mot cau hoi phan bien de toi suy nghi sau hon.' },
  ],
  '/appendix': [
    { id: 'ai-use', label: 'AI dung de lam gi?', prompt: 'Giai thich AI Capital Tutor duoc dung de lam gi trong du an nay.' },
    { id: 'context-sent', label: 'Context dang gui gi?', prompt: 'Noi ro AI nhan nhung context nao va khong nhan nhung gi.' },
    { id: 'fallback', label: 'Co che fallback', prompt: 'Giai thich co che fallback rule-based cua AI.' },
    { id: 'verification', label: 'Nguon kiem chung', prompt: 'Mo ta cach AI va nhom kiem chung noi dung hoc thuat.' },
  ],
};

export function getContextualActions(pageContext = {}) {
  return contexts[pageContext.route || '/'] || contexts['/'];
}
