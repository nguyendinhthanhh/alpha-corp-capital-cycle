import { ShieldCheck, FileText, Cpu, Users } from 'lucide-react';
import { aiUsageRows, appendixSources, groupContributions, promptSamples } from '../data/caseData';
import SectionHeader from '../components/shared/SectionHeader';
import './Appendix.css';

const Appendix = () => {
  return (
    <div className="appendix-page">
      <div className="container">
        <SectionHeader
          eyebrow="Minh bạch & Đóng góp"
          title="Nguồn học thuật & Sử dụng AI"
          subtitle="Hồ sơ minh bạch hóa nguồn dữ liệu, phạm vi sử dụng Trí tuệ nhân tạo và đóng góp của các thành viên trong dự án."
        />

        <div className="integrity-banner">
          <ShieldCheck size={32} className="banner-icon" />
          <div className="banner-content">
            <h3>Cam kết Liêm chính Học thuật</h3>
            <p>Trí tuệ nhân tạo được sử dụng với vai trò hỗ trợ tổng hợp thông tin, thiết kế giao diện và lập trình. Toàn bộ nội dung học thuật, kiểm chứng nguồn và quyết định cuối cùng đều do nhóm thực hiện và chịu trách nhiệm 100%.</p>
          </div>
        </div>

        <div className="appendix-workspace">
          <div className="appendix-main">
            <section className="appendix-section">
              <div className="section-title-bar">
                <Cpu size={20} className="text-teal mr-2" />
                <h2>Nhật ký sử dụng AI (AI Usage Log)</h2>
              </div>
              
              <div className="ai-usage-table-wrapper">
                <table className="ai-usage-table">
                  <thead>
                    <tr>
                      <th>Ngày & Công cụ</th>
                      <th>Mục đích & Prompt</th>
                      <th>Đầu ra AI</th>
                      <th>Nhóm chỉnh sửa & Nguồn</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aiUsageRows.map((row) => (
                      <tr key={`${row.date}-${row.tool}`}>
                        <td className="col-tool">
                          <strong>{row.tool}</strong>
                          <span className="date-stamp">{row.date}</span>
                          <span className="owner-badge">{row.owner}</span>
                        </td>
                        <td className="col-prompt">
                          <span className="info-label">Mục đích:</span> {row.purpose}
                          <div className="prompt-text">
                            <span className="info-label">Prompt:</span>
                            <br />"{row.prompt}"
                          </div>
                        </td>
                        <td className="col-output">
                          <p>{row.output}</p>
                        </td>
                        <td className="col-revision">
                          <p className="revision-text">{row.revision}</p>
                          <div className="source-tag">
                            <span className="info-label">Nguồn:</span> {row.source}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="appendix-section mt-5">
              <div className="section-title-bar">
                <Users size={20} className="text-teal mr-2" />
                <h2>Đóng góp của nhóm</h2>
              </div>
              <div className="contributions-grid">
                {groupContributions.map((item) => (
                  <div key={item.role} className="contribution-card">
                    <div className="role-badge">{item.role}</div>
                    <p>{item.detail}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="appendix-sidebar">
            <div className="sidebar-card">
              <div className="card-title-bar">
                <FileText size={18} className="text-gold mr-2" />
                <h3>Nguồn Tài liệu</h3>
              </div>
              <ul className="source-list">
                {appendixSources.map((source, index) => (
                  <li key={index}>{source}</li>
                ))}
              </ul>
            </div>

            <div className="sidebar-card mt-4">
              <div className="card-title-bar">
                <Cpu size={18} className="text-navy mr-2" />
                <h3>Prompt Tiêu biểu</h3>
              </div>
              <ul className="prompt-list">
                {promptSamples.map((sample, index) => (
                  <li key={index} className="prompt-sample-item">
                    <span>&gt;</span> {sample}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Appendix;
