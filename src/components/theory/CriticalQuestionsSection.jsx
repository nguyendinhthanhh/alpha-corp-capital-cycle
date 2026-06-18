import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';
import Section from '../shared/Section';
import Atmosphere from '../shared/Atmosphere';
import SectionHeader from '../shared/SectionHeader';
import './CriticalQuestionsSection.css';

const faqs = [
  {
    id: 'q1',
    question: 'Nếu Alpha Corp vay ngân hàng để trả nợ thì có giải quyết được khủng hoảng?',
    answer: 'Không. Việc vay mới để trả nợ cũ (đảo nợ) chỉ làm tăng tổng số tư bản đi vay, kéo theo lợi tức (z) ngày càng phình to. Bản chất của tuần hoàn tư bản là phải tạo ra giá trị thặng dư trong sản xuất và thực hiện nó trong lưu thông (bán được H\'). Vay nợ không sinh ra giá trị mới, chỉ trì hoãn sự sụp đổ.'
  },
  {
    id: 'q2',
    question: 'Tại sao Alpha Corp không hạ giá bán nhà (H\') để chuyển hóa thành tiền (T\') nhanh hơn?',
    answer: 'Trong khủng hoảng, thanh khoản thị trường đóng băng do siết tín dụng, người mua không vay được tiền nên hạ giá cũng khó bán. Hơn nữa, nếu hạ giá xuống dưới mức chi phí sản xuất (c + v), Alpha Corp sẽ chịu lỗ (p < 0), không đủ tiền trả lại vốn vay ban đầu (T).'
  },
  {
    id: 'q3',
    question: 'Sự cố của Alpha Corp có phải do họ tham lam áp dụng công nghệ mới?',
    answer: 'Áp dụng công nghệ để thu giá trị thặng dư siêu ngạch không sai. Nhưng lỗi nằm ở việc phân bổ "Không gian": họ dồn quá nhiều tư bản tiền tệ (T) vào tư bản cố định (c - máy móc đắt tiền) mà không dự phòng đủ thanh khoản cho rủi ro khi thời gian lưu thông kéo dài.'
  },
  {
    id: 'q4',
    question: 'Nhà nước có vai trò gì trong việc giải cứu các doanh nghiệp như Alpha Corp?',
    answer: 'Nhà nước (thông qua Ngân hàng Trung ương) có thể sử dụng công cụ vĩ mô như nới lỏng tín dụng, hạ lãi suất để khơi thông điểm nghẽn H\' -> T\'. Đây là cách bù đắp cho "khuyết tật của thị trường tự do", ngăn chặn hiệu ứng domino phá vỡ tổng tuần hoàn tư bản xã hội.'
  }
];

const CriticalQuestionsSection = () => {
  const [openId, setOpenId] = useState('q1');

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <Section className="critical-questions-section" id="faq" bgColor="transparent">
        <Atmosphere variant="theory" />
        <SectionHeader
          eyebrow="Chuẩn bị Q&A"
          title="Câu hỏi Phản biện"
          subtitle="Phân tích chuyên sâu dựa trên lý luận Kinh tế chính trị Mác - Lênin để trả lời các vấn đề cốt lõi của tình huống."
        />

        <div className="faq-container">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            
            return (
              <div key={faq.id} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <button 
                  className="faq-question"
                  onClick={() => toggleAccordion(faq.id)}
                  aria-expanded={isOpen}
                >
                  <div className="faq-q-text">
                    <HelpCircle size={20} className="q-icon" />
                    <span>{faq.question}</span>
                  </div>
                  <ChevronDown size={20} className={`chevron-icon ${isOpen ? 'rotated' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      className="faq-answer-wrapper"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="faq-answer">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Section>
  );
};

export default CriticalQuestionsSection;
