export const verifiedCaseFacts = [
  'Alpha Corp la tinh huong gia dinh trong du an MLN122.',
  'Alpha Corp vay ngan hang 10.000 ty dong.',
  'Day la von vay, khong phai tai san co san.',
  'Von duoc dung cho dat, may moc, vat lieu va suc lao dong.',
  'Ba toa thap moi hoan thanh phan tho.',
  'Thi truong dong bang do tin dung bi siet va lai suat tang.',
  'Diem tac nghen trong tam nam o H\' -> T\'.',
  'Gia tri chua duoc thuc hien duoi hinh thai tien te.',
  'Thoi gian luu thong bi keo dai, tien khong quay ve dung luc.',
  'Co nhieu tai san khong dong nghia voi co thanh khoan.',
];

export function buildCaseContextText() {
  return verifiedCaseFacts.map((fact) => `- ${fact}`).join('\n');
}
