import { getSuggestedActions } from './suggestedActions.js';

function buildPrimaryExplanation(pageContext, retrievedConcepts) {
  const first = retrievedConcepts[0];

  if (pageContext.route === '/learn/quiz') {
    return `Khong the ket noi mo hinh AI. He thong dang dung phan tich quy tac da duoc kiem chung cho Adaptive Quiz. Huong dung luc nay la quay lai khai niem cua cau hoi, phan biet no voi cac lua chon de gay nham, roi noi no voi tinh huong Alpha Corp.`;
  }

  if (pageContext.route === '/learn/daily') {
    return `Khong the ket noi mo hinh AI. He thong dang hien thi fallback hoc tap cho Daily Challenge. Hay doc cau hoi qua logic H' -> T', thanh khoan, va toc do quay vong cua tu ban truoc khi chot dap an.`;
  }

  if (pageContext.route === '/learn/review') {
    return `Khong the ket noi mo hinh AI. He thong dang hien thi fallback hoc tap cho Review Queue. Day la luc nen quay lai diem nham cu, sua dung khai niem, va noi lai no voi chang Alpha Corp da gay loi.`;
  }

  if (pageContext.route === '/learn/case-mission') {
    return `Khong the ket noi mo hinh AI. He thong dang hien thi fallback hoc tap cho Case Mission. Trong mission nay, can doc ket qua theo can bang giua thanh khoan, kha nang noi tiep chu ky, va muc do von bi dồn vao H'.`;
  }

  if (pageContext.route === '/learn/debate') {
    return `Khong the ket noi mo hinh AI. He thong dang hien thi fallback hoc tap cho Debate Arena. Mot lap luan tot can chi ra khai niem dung, diem doi nghich, va he qua cua no trong case Alpha Corp.`;
  }

  if (pageContext.route === '/learn/progress') {
    return `Khong the ket noi mo hinh AI. He thong dang hien thi fallback hoc tap cho Progress Map. Hay dung chi so nay de xac dinh concept nao can on tiep, khong xem day la danh gia nang luc tuyet doi.`;
  }

  if (pageContext.route === '/learn') {
    return `Khong the ket noi mo hinh AI. He thong dang hien thi rule-based guidance cho learning dashboard. Uu tien hop ly nhat la: review neu dang co cau toi han; neu chua, lam daily challenge hoac adaptive quiz de tao du lieu hoc tap moi.`;
  }

  if (pageContext.route === '/capital-lab') {
    return `Khong the ket noi mo hinh AI. He thong dang hien thi phan tich quy tac da duoc nhom kiem chung cho chang ${pageContext.capitalLab?.chapterTitle || 'Capital Lab hien tai'}. Trong context nay, trong tam van la xac dinh dong von dang nam o dau va vi sao no co the bi nghen truoc khi quay ve T'.`;
  }

  if (pageContext.route === '/simulators') {
    return `Khong the ket noi mo hinh AI. He thong dang hien thi phan tich quy tac da duoc nhom kiem chung. Trang thai mo phong hien tai can duoc doc qua thanh khoan, thoi gian luu thong va kha nang noi tiep chu ky.`;
  }

  if (pageContext.route === '/quiz') {
    return `Khong the ket noi mo hinh AI. He thong dang hien thi phan tich quy tac da duoc nhom kiem chung. Hay bat dau tu khai niem ma cau hoi dang kiem tra, roi noi no voi tinh huong Alpha Corp.`;
  }

  if (pageContext.economicState === 'crisis') {
    return `Khong the ket noi mo hinh AI. He thong dang hien thi phan tich quy tac da duoc nhom kiem chung. O trang thai khung hoang, diem tac nghen trong tam van la H' -> T', tuc gia tri da nam trong hang hoa nhung chua quay ve duoi dang tien.`;
  }

  if (first) {
    return `Khong the ket noi mo hinh AI. He thong dang hien thi phan tich quy tac da duoc nhom kiem chung. Khai niem gan nhat voi cau hoi hien tai la ${first.name}: ${first.simpleExplanation || first.definition}`;
  }

  return 'Khong the ket noi mo hinh AI. He thong dang hien thi phan tich quy tac da duoc nhom kiem chung.';
}

export function buildFallbackResponse({ pageContext, retrievedConcepts, sourceLabels, action }) {
  const first = retrievedConcepts[0];
  const sections = [];

  if (first) {
    sections.push({
      title: 'Khai niem gan nhat',
      content: first.definition,
    });
  }

  if (first?.alphaCorpExample) {
    sections.push({
      title: 'Lien he Alpha Corp',
      content: first.alphaCorpExample,
    });
  }

  if (action === 'it-analogy' && first?.itAnalogy) {
    sections.push({
      title: 'Phep so sanh IT',
      content: `${first.itAnalogy} Day chi la phep so sanh de de hinh dung, khong phai dong nhat hai he thong.`,
    });
  }

  return {
    answer: buildPrimaryExplanation(pageContext, retrievedConcepts),
    sections,
    relatedConcepts: retrievedConcepts.slice(0, 3).map((concept) => ({
      id: concept.id,
      label: concept.name,
    })),
    sourceLabels,
    suggestedActions: getSuggestedActions(pageContext.route),
    fallbackUsed: true,
    demoMode: false,
  };
}

export function buildDemoResponse({ pageContext, retrievedConcepts, sourceLabels }) {
  const first = retrievedConcepts[0];

  return {
    answer: `Che do demo dang bat. Phan hoi nay khong duoc tao truc tiep boi mo hinh AI. ${first ? `Khai niem duoc uu tien la ${first.name}.` : ''}`.trim(),
    sections: first
      ? [
          {
            title: 'Giai thich',
            content: first.definition,
          },
        ]
      : [],
    relatedConcepts: retrievedConcepts.slice(0, 3).map((concept) => ({
      id: concept.id,
      label: concept.name,
    })),
    sourceLabels,
    suggestedActions: getSuggestedActions(pageContext.route),
    fallbackUsed: true,
    demoMode: true,
  };
}
