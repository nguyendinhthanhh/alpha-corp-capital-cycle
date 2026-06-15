import { useState } from 'react';
import { BookOpen, Bookmark, ChevronRight, Hash } from 'lucide-react';
import { theoryTopics } from '../data/caseData';
import './KnowledgeHub.css';

const KnowledgeHub = () => {
  const [activeTopic, setActiveTopic] = useState(theoryTopics[0]);

  return (
    <div className="knowledge-page">
      <div className="container">
        <header className="page-header text-center">
          <span className="page-eyebrow">Học thuật & Lý luận</span>
          <h1 className="page-title">Từ điển khái niệm MLN122</h1>
          <p className="page-subtitle">
            Hệ thống hóa các khái niệm cốt lõi trong Tuần hoàn và Chu chuyển tư bản, được đối chiếu trực tiếp với tình huống của Alpha Corp.
          </p>
        </header>

        <div className="knowledge-workspace">
          {/* Sidebar */}
          <aside className="knowledge-sidebar">
            <div className="sidebar-header">
              <BookOpen size={20} className="mr-2 text-teal" />
              <span>Danh mục khái niệm</span>
            </div>
            <div className="topic-list">
              {theoryTopics.map((topic) => (
                <button
                  key={topic.title}
                  type="button"
                  className={`topic-btn ${activeTopic.title === topic.title ? 'active' : ''}`}
                  onClick={() => setActiveTopic(topic)}
                >
                  <span className="topic-name">{topic.title}</span>
                  <ChevronRight size={16} className="topic-icon" />
                </button>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <main className="knowledge-content">
            <article className="concept-card">
              <div className="concept-header">
                <div className="concept-meta">
                  <Bookmark size={16} className="text-gold mr-2" />
                  <span>Trích dẫn từ: {activeTopic.source}</span>
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
                    <div className="content-box">
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
            </article>
          </main>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeHub;
