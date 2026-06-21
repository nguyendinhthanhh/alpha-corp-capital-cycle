import { storyChapters as storyModeChapters, timelineSteps } from './caseData';

const chapterByNumber = new Map(storyModeChapters.map((chapter) => [chapter.number, chapter]));

const getChapter = (number) => chapterByNumber.get(number);

const combineField = (numbers, field) =>
  numbers
    .map((number) => getChapter(number)?.[field])
    .filter(Boolean)
    .join(' ');

export { storyModeChapters };

export const capitalJourneyFlowNodes = [
  {
    key: 'T',
    title: 'Tư bản tiền tệ',
    detail: 'Khoản vay dùng để khởi động dự án.',
  },
  {
    key: 'H',
    title: 'Tư liệu sản xuất và sức lao động',
    detail: 'Đất, máy móc, vật liệu, nhân công.',
  },
  {
    key: 'SX',
    title: 'Quá trình sản xuất',
    detail: 'Công trường tạo ra giá trị mới.',
  },
  {
    key: "H'",
    title: 'Tư bản hàng hóa',
    detail: 'Phần thô chứa giá trị chờ thực hiện.',
  },
  {
    key: "T'",
    title: 'Tiền thu về sau tiêu thụ',
    detail: 'Chỉ xuất hiện khi hàng hóa bán được.',
  },
];

const journeyStateLabels = [
  'Tư bản tiền tệ',
  'Tư bản tiền tệ chuyển sang đầu vào',
  'Tư bản sản xuất',
  'Tư bản sản xuất',
  'Tư bản hàng hóa',
  'Tư bản hàng hóa bị neo lại',
  "Điểm nghẽn H' → T'",
  "T' không hình thành",
];

const journeyTransitionLabels = [
  'Điều kiện để chuyển sang chặng tiếp',
  'Điều kiện để chuyển sang chặng tiếp',
  'Điều kiện để chuyển sang chặng tiếp',
  'Điều kiện để chuyển sang chặng tiếp',
  'Điều kiện để chuyển sang chặng tiếp',
  'Điều kiện để chuyển sang chặng tiếp',
  'Điều kiện khôi phục chu kỳ',
  'Điều kiện khôi phục chu kỳ',
];

const journeyTransitionConditions = [
  'Mua tư liệu sản xuất và sức lao động.',
  'Gom đủ đất, máy móc, vật liệu và nhân công.',
  'Đưa các yếu tố vào quá trình sản xuất.',
  'Hoàn thành phần thô để tạo H\'.',
  'Đưa hàng hóa ra thị trường.',
  'Tìm được người mua và hoàn tất giao dịch.',
  'Khôi phục khả năng tiêu thụ để hình thành T\'.',
  'Cần có dòng tiền quay lại để bắt đầu chu kỳ mới.',
];

const journeyFlowIndexes = [0, 1, 2, 2, 3, 3, 3, 4];

export const capitalJourneySteps = [
  {
    id: 1,
    sourceChapterNumbers: ['01'],
    title: getChapter('01').title,
    concept: 'T',
    desc: getChapter('01').summary,
    theory: getChapter('01').theory,
    flowIndex: journeyFlowIndexes[0],
    stateLabel: journeyStateLabels[0],
    takeaway: timelineSteps[0].note,
    transitionLabel: journeyTransitionLabels[0],
    transitionCondition: journeyTransitionConditions[0],
  },
  {
    id: 2,
    sourceChapterNumbers: ['02'],
    title: getChapter('02').title,
    concept: 'T → H',
    desc: getChapter('02').summary,
    theory: getChapter('02').theory,
    flowIndex: journeyFlowIndexes[1],
    stateLabel: journeyStateLabels[1],
    takeaway: timelineSteps[1].note,
    transitionLabel: journeyTransitionLabels[1],
    transitionCondition: journeyTransitionConditions[1],
  },
  {
    id: 3,
    sourceChapterNumbers: ['03'],
    title: getChapter('03').title,
    concept: 'H',
    desc: getChapter('03').summary,
    theory: getChapter('03').theory,
    flowIndex: journeyFlowIndexes[2],
    stateLabel: journeyStateLabels[2],
    takeaway: timelineSteps[2].note,
    transitionLabel: journeyTransitionLabels[2],
    transitionCondition: journeyTransitionConditions[2],
  },
  {
    id: 4,
    sourceChapterNumbers: ['04'],
    title: getChapter('04').title,
    concept: 'SX',
    desc: getChapter('04').summary,
    theory: getChapter('04').theory,
    flowIndex: journeyFlowIndexes[3],
    stateLabel: journeyStateLabels[3],
    takeaway: timelineSteps[3].note,
    transitionLabel: journeyTransitionLabels[3],
    transitionCondition: journeyTransitionConditions[3],
  },
  {
    id: 5,
    sourceChapterNumbers: ['05'],
    title: getChapter('05').title,
    concept: "H'",
    desc: getChapter('05').summary,
    theory: getChapter('05').theory,
    flowIndex: journeyFlowIndexes[4],
    stateLabel: journeyStateLabels[4],
    takeaway: timelineSteps[4].note,
    transitionLabel: journeyTransitionLabels[4],
    transitionCondition: journeyTransitionConditions[4],
  },
  {
    id: 6,
    sourceChapterNumbers: ['06', '07', '08'],
    title: 'Điều kiện lưu thông xấu đi',
    concept: 'Lưu thông',
    desc: combineField(['06', '07', '08'], 'summary'),
    theory: combineField(['06', '07', '08'], 'theory'),
    flowIndex: journeyFlowIndexes[5],
    stateLabel: journeyStateLabels[5],
    takeaway: timelineSteps[5].note,
    transitionLabel: journeyTransitionLabels[5],
    transitionCondition: journeyTransitionConditions[5],
  },
  {
    id: 7,
    sourceChapterNumbers: ['09'],
    title: getChapter('09').title,
    concept: "H' → T'",
    desc: getChapter('09').summary,
    theory: getChapter('09').theory,
    flowIndex: journeyFlowIndexes[6],
    stateLabel: journeyStateLabels[6],
    takeaway: timelineSteps[6].note,
    transitionLabel: journeyTransitionLabels[6],
    transitionCondition: journeyTransitionConditions[6],
  },
  {
    id: 8,
    sourceChapterNumbers: ['10', '11', '12'],
    title: 'Chu kỳ tái sản xuất bị gián đoạn',
    concept: "T' không hình thành",
    desc: combineField(['10', '11', '12'], 'summary'),
    theory: combineField(['10', '11', '12'], 'theory'),
    flowIndex: journeyFlowIndexes[7],
    stateLabel: journeyStateLabels[7],
    takeaway: timelineSteps[7].note,
    transitionLabel: journeyTransitionLabels[7],
    transitionCondition: journeyTransitionConditions[7],
  },
];
