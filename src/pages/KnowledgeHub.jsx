import { useState } from 'react';
import { BookOpen, Bookmark, ChevronRight, Hash, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { academicConcepts } from '../data/academicConcepts';
import SectionHeader from '../components/shared/SectionHeader';
import './KnowledgeHub.css';

const KnowledgeHub = () => {
  const [activeTopic, setActiveTopic] = useState(academicConcepts[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTopics = academicConcepts.filter(topic => 
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    topic.definition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="knowledge-page">
      <div className="container">
        <SectionHeader
          eyebrow="Học thuật & Lý luận"
          title="Từ điển khái niệm MLN122"
          subtitle="Hệ thống hóa 16 khái niệm cốt lõi trong Tuần hoàn, Chu chuyển và Tái sản xuất tư bản, được đối chiếu trực tiếp với tình huống của Alpha Corp."
        />

        <div className="knowledge-workspace">
          {/* Sidebar */}
          <aside className="knowledge-sidebar">
            <div className="sidebar-header">
              <BookOpen size={20} className="mr-2 text-teal" />
              <span>Danh mục (16)</span>
            </div>
            
            <div className="sidebar-search">
              <Search size={16} className="search-icon" />
              <input 
                type="text" 
                placeholder="Tìm kiếm khái niệm..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="topic-list">
              {filteredTopics.length > 0 ? (
                filteredTopics.map((topic) => (
                  <button
                    key={topic.id}
                    type="button"
                    className={`topic-btn ${activeTopic.id === topic.id ? 'active' : ''}`}
                    onClick={() => setActiveTopic(topic)}
                  >
                    <span className="topic-name">{topic.title}</span>
                    <ChevronRight size={16} className="topic-icon" />
                  </button>
                ))
              ) : (
                <div className="empty-search">Không tìm thấy khái niệm phù hợp</div>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <main className="knowledge-content">
            <AnimatePresence mode="wait">
              <motion.article 
                key={activeTopic.id}
                className="concept-card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="concept-header">
                  <div className="concept-meta">
                    <Bookmark size={16} className="text-gold mr-2" />
                    <span>Nguồn: {activeTopic.source}</span>
                  </div>
                  <h2>{activeTopic.title}</h2>
                </div>

                <div className="concept-body">
                  <div className="concept-section definition-section">
                    <h3><Hash size={18} className="mr-2 text-teal" /> Định nghĩa cốt lõi</h3>
                    <div className="content-box">
                      <p>{activeTopic.definition}</p>
                    </div>
                  </div>

                  <div className="concept-grid">
                    <div className="concept-section case-section">
                      <h3>Áp dụng Alpha Corp</h3>
                      <div className="content-box alpha-box">
                        <p>{activeTopic.example}</p>
                      </div>
                    </div>

                    <div className="concept-section consequence-section">
                      <h3>Hệ quả khi đứt gãy</h3>
                      <div className="content-box danger">
                        <p>{activeTopic.consequence}</p>
                      </div>
                    </div>
                  </div>

                  <div className="memory-callout">
                    <span className="callout-label">Ghi nhớ nhanh</span>
                    <p className="callout-text">{activeTopic.memory}</p>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeHub;
