import { FileText, Cpu } from 'lucide-react';
import { useEffect } from 'react';
import { aiUsageRows, appendixSources } from '../data/caseData';
import SectionHeader from '../components/shared/SectionHeader';
import { useAI } from '../ai/useAI';
import { buildAIContext } from '../ai/buildAIContext';
import './Appendix.css';

const Appendix = () => {
  const { setPageContext } = useAI();

  useEffect(() => {
    setPageContext(
      buildAIContext({
        route: '/appendix',
        appState: {
          pageName: 'Nguon & AI',
          sourceLabels: ['AI Capital Tutor'],
          relevantConceptIds: ['capital-circuit', 'liquidity', 'profit'],
        },
      }),
    );
  }, [setPageContext]);

  return (
    <div className="appendix-page">
      <div className="container">
        <SectionHeader
          eyebrow="Minh bạch & Đóng góp"
          title="Nguồn học thuật & Sử dụng AI"
          subtitle="Hồ sơ minh bạch hóa nguồn dữ liệu, phạm vi sử dụng Trí tuệ nhân tạo và đóng góp của các thành viên trong dự án."
        />

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
            <FileText size={20} className="text-gold mr-2" />
            <h2>Nguồn Tài liệu</h2>
          </div>
          <ul className="source-list">
            {appendixSources.map((source, index) => (
              <li key={index}>{source}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Appendix;
