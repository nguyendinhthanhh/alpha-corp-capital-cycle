import { sendTutorRequest } from '../ai/tutorClient.js';

function formatOptions(options = []) {
  return options.map((item) => `${item.id}. ${item.text || item.label}`).join('\n');
}

export function buildQuizAIMessage({
  question,
  selectedAnswer,
  attemptCount = 1,
  currentMastery = 0,
  action = 'quiz-hint',
  includeCorrectAnswer = false,
}) {
  const answerLine = includeCorrectAnswer
    ? `Đáp án đúng đã xác minh: ${JSON.stringify(question.correctAnswer)}`
    : 'Không được tiết lộ đáp án đúng trực tiếp trong phản hồi này.';

  return [
    `Hành động: ${action}`,
    `Question ID: ${question.id}`,
    `Câu hỏi: ${question.prompt}`,
    question.options?.length ? `Lựa chọn:\n${formatOptions(question.options)}` : '',
    `Người học đã chọn: ${selectedAnswer || 'chưa chọn'}`,
    `Số lần thử: ${attemptCount}`,
    `Concept IDs: ${question.conceptIds.join(', ')}`,
    `Độ khó: ${question.difficulty}`,
    `Current mastery: ${currentMastery}`,
    answerLine,
    'Chỉ dùng dữ liệu đã kiểm chứng trong project. Nếu đang ở chế độ gợi ý, chỉ cho hướng suy nghĩ hoặc điểm cần phân biệt.',
  ]
    .filter(Boolean)
    .join('\n');
}

export async function runLearningAI({ route, pageContext, prompt, action, signal }) {
  return sendTutorRequest({
    messages: [{ role: 'user', content: prompt }],
    pageContext: {
      ...pageContext,
      route,
    },
    action,
    signal,
  });
}
