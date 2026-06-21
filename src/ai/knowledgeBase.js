import { capitalForms, spaceTimeConditions } from '../data/capitalFlowStages.js';
import { capitalNodes, labMissions } from '../data/capitalLabData.js';

const normalize = (value = '') =>
  String(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const slugify = (value) =>
  normalize(value)
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '');

const unique = (values) => [...new Set(values.filter(Boolean))];

const makeConcept = (concept) => ({
  verification: 'verified',
  commonMistakes: [],
  relatedConceptIds: [],
  sourceLabels: [],
  aliases: [],
  ...concept,
});

const theoryConcepts = [
  makeConcept({
    id: 'capital',
    name: 'Tu ban',
    aliases: ['tu ban', 'capital', 'capital cycle', 'capital flow'],
    definition:
      'Tu ban la gia tri van dong de tu tang them gia tri qua mot chu ky hoat dong. No khong phai mot khoi tai san dung yen.',
    alphaCorpExample:
      'Alpha Corp chi tro thanh tu ban khi dong 10.000 ty duoc dua vao T -> H -> SX -> H\' -> T\'.',
    commonMistakes: ['Nham tu ban voi moi tai san hay moi khoan tien mat nam yen.'],
    relatedConceptIds: ['money-capital', 'capital-circuit', 'capital-turnover'],
    sourceLabels: ['Session 8', 'Case Alpha Corp'],
  }),
  makeConcept({
    id: 'money-capital',
    name: 'Tu ban tien te',
    aliases: ['tu ban tien te', 'money capital', 'money-capital', 'T'],
    definition:
      'Hinh thai mo dau cua chu ky tu ban, trong do gia tri duoi dang tien duoc ung ra de mua cac yeu to san xuat.',
    alphaCorpExample: 'Khoan vay 10.000 ty cua Alpha Corp la diem xuat phat cua toan bo chu ky von.',
    commonMistakes: ['Cho rang tien tu no da la tu ban, ke ca khi chua duoc dua vao van dong san xuat.'],
    relatedConceptIds: ['capital', 'productive-capital', 'capital-circuit'],
    sourceLabels: ['Session 8', 'caseData.storyChapters'],
  }),
  makeConcept({
    id: 'productive-capital',
    name: 'Tu ban san xuat',
    aliases: ['tu ban san xuat', 'productive capital', 'productive-capital', 'SX'],
    definition:
      'Tu ban dang ton tai trong qua trinh san xuat, ket hop tu ban bat bien va tu ban kha bien de tao ra gia tri moi.',
    alphaCorpExample:
      'Khi T da thanh dat, may moc, vat lieu va suc lao dong, no da chuyen thanh tu ban san xuat.',
    commonMistakes: ['Nham san xuat la giai doan phu, trong khi day la noi gia tri thang du duoc tao ra.'],
    relatedConceptIds: ['surplus-value', 'capital-turnover', 'money-capital'],
    sourceLabels: ['Session 8', 'caseData.storyChapters'],
  }),
  makeConcept({
    id: 'commodity-capital',
    name: 'Tu ban hang hoa',
    aliases: ["tu ban hang hoa", 'commodity capital', 'commodity-capital', "H'"],
    definition:
      'Hinh thai hang hoa cua tu ban sau san xuat, chua gia tri da ung truoc cong voi gia tri thang du chua thuc hien.',
    alphaCorpExample: "Ba toa thap phan tho cua Alpha Corp la H', co gia tri nhung van phai ban duoc moi thanh tien.",
    commonMistakes: ["Nham H' voi tien thu ve, hoac xem hang hoa do dang nhu thanh khoan thuc te."],
    relatedConceptIds: ['circulation-time', 'liquidity', 'market'],
    sourceLabels: ['Session 8', 'Capital Lab'],
  }),
  makeConcept({
    id: 'capital-circuit',
    name: 'Tuan hoan tu ban',
    aliases: ['tuan hoan tu ban', 'capital circuit', 'capital-circuit', 'T H SX H T'],
    definition:
      'Su van dong cua tu ban qua cac hinh thai tien te, san xuat va hang hoa de quay lai hinh thai tien voi gia tri lon hon.',
    alphaCorpExample: 'Chuoi T -> H -> SX -> H\' -> T\' la tuan hoan cua Alpha Corp.',
    commonMistakes: ['Xem tu ban nhu mot khoi tai san tinh thay vi mot van dong lien tuc.'],
    relatedConceptIds: ['capital-turnover', 'production-time', 'circulation-time'],
    sourceLabels: ['Session 8', 'caseData.storyChapters'],
  }),
  makeConcept({
    id: 'capital-turnover',
    name: 'Chu chuyen tu ban',
    aliases: ['chu chuyen tu ban', 'capital turnover', 'capital-turnover'],
    definition:
      'Tu ban duoc nhin theo chu ky lap lai va toc do quay vong, nhan manh quang duong va nhip do quay ve T\'.',
    alphaCorpExample: 'Neu T\' khong quay ve dung luc, Alpha Corp khong the khoi dong chu ky ke tiep.',
    commonMistakes: ['Chi nhin vao san xuat ma quen mat toc do luu thong va thoi diem thu tien ve.'],
    relatedConceptIds: ['circulation-time', 'production-time', 'capital-circuit'],
    sourceLabels: ['Session 8', 'caseData.theoryTopics'],
  }),
  makeConcept({
    id: 'production-time',
    name: 'Thoi gian san xuat',
    aliases: ['thoi gian san xuat', 'production time'],
    definition:
      'Khoang thoi gian tu ban nam trong qua trinh san xuat va chua the quay vong thanh tien.',
    alphaCorpExample: 'Thoi gian thi cong phan tho keo dai lam von bi giam trong cong truong lau hon.',
    commonMistakes: ['Dong nhat thoi gian san xuat voi toan bo chu ky von.'],
    relatedConceptIds: ['circulation-time', 'capital-turnover'],
    sourceLabels: ['Giáo trinh', 'Session 8'],
  }),
  makeConcept({
    id: 'circulation-time',
    name: 'Thoi gian luu thong',
    aliases: ['thoi gian luu thong', 'circulation time'],
    definition:
      'Khoang thoi gian hang hoa va tien nam ngoai san xuat de mua dau vao hoac cho tieu thu.',
    alphaCorpExample:
      'Khi thi truong bat dong san dong bang, H\' cho ban lau hon va thoi gian luu thong tang len.',
    commonMistakes: ['Xem luu thong la phu, trong khi no co the lam dut toan bo chu ky von.'],
    relatedConceptIds: ['capital-turnover', 'liquidity', 'market'],
    sourceLabels: ['Giáo trinh', 'Session 8'],
  }),
  makeConcept({
    id: 'spatial-condition',
    name: 'Dieu kien lien tuc ve mat khong gian',
    aliases: ['dieu kien lien tuc ve mat khong gian', 'space condition', 'spatial condition'],
    definition:
      'Tong tu ban phai dong thoi ton tai o cac hinh thai khac nhau: tien te, san xuat va hang hoa.',
    alphaCorpExample:
      'Neu don toan bo von vao hang hoa do dang, doanh nghiep thieu phan tien du phong cho nghia vu ngan han.',
    commonMistakes: ['Tuong rang chi can nhieu tai san la du, trong khi phan bo hinh thai moi quyet dinh kha nang van dong.'],
    relatedConceptIds: ['capital-circuit', 'capital-turnover', 'money-capital'],
    sourceLabels: [spaceTimeConditions.space.title, 'Session 8'],
  }),
  makeConcept({
    id: 'temporal-condition',
    name: 'Dieu kien lien tuc ve mat thoi gian',
    aliases: ['dieu kien lien tuc ve mat thoi gian', 'time condition', 'temporal condition'],
    definition:
      'Cac giai doan cua tuan hoan phai noi tiep nhau lien tuc, khong dut quang o bat ky khau nao.',
    alphaCorpExample:
      'Neu H\' chua ban duoc, T\' khong hinh thanh va chu ky ke tiep dung lai.',
    commonMistakes: ['Chi nhin trang thai hien tai ma bo qua nhip quay vong va do tre thanh khoan.'],
    relatedConceptIds: ['circulation-time', 'capital-turnover', 'market'],
    sourceLabels: [spaceTimeConditions.time.title, 'Session 8'],
  }),
  makeConcept({
    id: 'surplus-value',
    name: 'Gia tri thang du',
    aliases: ['gia tri thang du', 'surplus value', 'surplus-value', 'm'],
    definition:
      'Phan gia tri moi doi ra ngoai gia tri suc lao dong, duoc tao ra trong qua trinh san xuat.',
    alphaCorpExample:
      'Neu cong nhan tao ra gia tri lon hon tien luong ho nhan, phan doi ra la gia tri thang du.',
    commonMistakes: ['Tuong gia tri thang du sinh ra trong khau ban hang, thay vi trong san xuat.'],
    relatedConceptIds: ['productive-capital', 'profit', 'accumulation'],
    sourceLabels: ['Session 8', 'quizQuestions'],
  }),
  makeConcept({
    id: 'accumulation',
    name: 'Tich luy tu ban',
    aliases: ['tich luy tu ban', 'accumulation'],
    definition:
      'Bien mot phan gia tri thang du thanh tu ban moi de mo rong quy mo san xuat.',
    alphaCorpExample:
      'Alpha Corp chi co the mo rong neu H\' quay ve T\' va mot phan T\' duoc giu lai cho dau tu moi.',
    commonMistakes: ['Xem moi doanh thu deu co the tai dau tu ngay, bo qua nghia vu thanh khoan va no vay.',
    ],
    relatedConceptIds: ['reproduction', 'surplus-value', 'capital-turnover'],
    sourceLabels: ['Session 10'],
  }),
  makeConcept({
    id: 'reproduction',
    name: 'Tai san xuat',
    aliases: ['tai san xuat', 'reproduction'],
    definition:
      'Qua trinh san xuat duoc lap lai thuong xuyen de duy tri va phuc hoi chu ky von.',
    alphaCorpExample: 'Neu Alpha Corp khong thu tien ve, tai san xuat don gian cung bi te liet.',
    commonMistakes: ['Coi san xuat nhu mot lan duy nhat thay vi mot chuoi lap lai can von quay vong.'],
    relatedConceptIds: ['capital-turnover', 'accumulation'],
    sourceLabels: ['Session 10'],
  }),
  makeConcept({
    id: 'profit',
    name: 'Loi nhuan',
    aliases: ['loi nhuan', 'profit'],
    definition:
      'Hinh thuc bieu hien ra ngoai cua gia tri thang du khi so sanh voi toan bo tu ban ung truoc.',
    alphaCorpExample:
      'Alpha Corp chi thay loi nhuan khi tien ban hang da quay ve va vuot qua chi phi ung truoc.',
    commonMistakes: ['Dong nhat loi nhuan voi gia tri thang du theo cach truc tiep, bo qua hinh thuc bieu hien.'],
    relatedConceptIds: ['surplus-value', 'interest'],
    sourceLabels: ['Session 11'],
  }),
  makeConcept({
    id: 'interest',
    name: 'Loi tuc',
    aliases: ['loi tuc', 'interest', 'z'],
    definition:
      'Phan loi nhuan ma tu ban di vay phai tra cho tu ban cho vay de co quyen su dung von.',
    alphaCorpExample: 'Du hang hoa chua ban duoc, Alpha Corp van phai tra lai theo han vay.',
    commonMistakes: ['Tuong lai vay chi phat sinh khi doanh nghiep da co tien ve tu ban hang.'],
    relatedConceptIds: ['profit', 'liquidity'],
    sourceLabels: ['Session 11'],
  }),
  makeConcept({
    id: 'market',
    name: 'Thi truong',
    aliases: ['thi truong', 'market'],
    definition:
      'Khong gian trao doi noi gia tri cua hang hoa chi duoc thuc hien neu co suc mua tuong ung.',
    alphaCorpExample: 'Thi truong bat dong san dong bang lam H\' kho chuyen thanh T\'.',
    commonMistakes: ['Xem thi truong nhu noi tu dong hap thu moi hang hoa o moi thoi diem.'],
    relatedConceptIds: ['liquidity', 'circulation-time', 'supply-demand'],
    sourceLabels: ['Case Alpha Corp', 'Session 8'],
  }),
  makeConcept({
    id: 'liquidity',
    name: 'Thanh khoan',
    aliases: ['thanh khoan', 'liquidity'],
    definition:
      'Khả năng biến tài sản thành tiền mặt đúng lúc để đáp ứng nghĩa vụ và tiếp tục chu kỳ.',
    alphaCorpExample:
      'Một tòa tháp còn giá trị nhưng không bán được thì không giúp Alpha Corp trả nợ đến hạn.',
    commonMistakes: ['Đồng nhất tài sản lớn với tiền mặt sẵn có.'],
    relatedConceptIds: ['market', 'circulation-time', 'capital-turnover'],
    sourceLabels: ['Case Alpha Corp', 'Capital Lab'],
  }),
  makeConcept({
    id: 'stakeholder',
    name: 'Chu the thi truong',
    aliases: ['chu the thi truong', 'stakeholder', 'stakeholders'],
    definition:
      'Cac nhom chi phoi va bi chi phoi boi dong von nhu ngan hang, cong nhan, nha cung cap, nguoi mua va nha nuoc.',
    alphaCorpExample:
      'Mot diem nghen o Alpha Corp keo theo tac dong lan truyen den ngan hang, cong nhan va nha cung cap.',
    commonMistakes: ['Chi nhin doanh nghiep trung tam ma bo qua he thong tac nhan xung quanh.'],
    relatedConceptIds: ['market', 'liquidity'],
    sourceLabels: ['Capital Lab', 'caseData.cascadeActors'],
    verification: 'needs_verification',
  }),
];

const missionConcepts = labMissions.map((mission) =>
  makeConcept({
    id: `lab-${mission.id}`,
    name: mission.title,
    aliases: [mission.title, mission.symbol, mission.formulaHighlight],
    definition: mission.theory,
    alphaCorpExample: mission.description,
    commonMistakes: [mission.takeaway],
    relatedConceptIds: unique([
      mission.id === 'source' ? 'money-capital' : null,
      mission.id === 'inputs' ? 'productive-capital' : null,
      mission.id === 'production' ? 'surplus-value' : null,
      mission.id === 'commodity' ? 'commodity-capital' : null,
      mission.id === 'crisis' ? 'circulation-time' : null,
      mission.id === 'recovery' ? 'liquidity' : null,
    ]),
    sourceLabels: ['Capital Lab'],
  }),
);

const formConcepts = capitalForms.map((form) =>
  makeConcept({
    id: `form-${slugify(form.name)}`,
    name: form.name,
    aliases: [form.name, form.id, form.color],
    definition: form.role,
    alphaCorpExample: form.desc,
    commonMistakes: [form.role],
    relatedConceptIds: [],
    sourceLabels: ['capitalFlowStages'],
  }),
);

const nodeConcepts = capitalNodes.map((node) =>
  makeConcept({
    id: `node-${node.id.toLowerCase()}`,
    name: node.title,
    aliases: [node.key, node.shortTitle, node.type, node.nodeType],
    definition: node.detail,
    alphaCorpExample: node.description,
    commonMistakes: [node.detail],
    relatedConceptIds: ['capital-circuit'],
    sourceLabels: ['Capital Lab'],
  }),
);

export const academicConcepts = unique([
  ...theoryConcepts,
  ...missionConcepts,
  ...formConcepts,
  ...nodeConcepts,
]);

export const conceptIndex = new Map(academicConcepts.map((concept) => [concept.id, concept]));

export const getConceptById = (id) => conceptIndex.get(id);

export const conceptSearchTokens = academicConcepts.map((concept) => ({
  ...concept,
  searchIndex: normalize([concept.name, ...concept.aliases, concept.definition, concept.alphaCorpExample].join(' ')),
}));

export { slugify };
