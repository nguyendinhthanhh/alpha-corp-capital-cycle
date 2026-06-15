import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="container">
        <div className="footer-grid grid-12">
          
          <div className="footer-brand">
            <h3 className="footer-logo">AlphaCorp</h3>
            <p className="footer-course">MLN122 – Kinh tế chính trị Mác – Lênin</p>
            <p className="footer-description">
              Hồ sơ mô phỏng phục vụ học tập về tuần hoàn và chu chuyển tư bản. Dự án chuyển hóa lý luận thành trải nghiệm học tập trực quan.
            </p>
          </div>

          <div className="footer-links">
            <h4 className="footer-heading">Nội dung</h4>
            <ul>
              <li><Link to="/">Tổng quan vụ việc</Link></li>
              <li><Link to="/#capital-journey">Hành trình vốn</Link></li>
              <li><Link to="/#crisis">Khủng hoảng thanh khoản</Link></li>
              <li><Link to="/simulators">Mô phỏng dòng tiền</Link></li>
              <li><Link to="/knowledge">Lý luận cốt lõi</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4 className="footer-heading">Minh bạch</h4>
            <ul>
              <li><Link to="/appendix">Nguồn học thuật</Link></li>
              <li><Link to="/appendix">Nhật ký AI Usage</Link></li>
              <li><Link to="/appendix">Nhóm thực hiện</Link></li>
            </ul>
          </div>

          <div className="footer-integrity">
            <h4 className="footer-heading">Cam kết học thuật</h4>
            <p className="integrity-text">
              Sản phẩm tuân thủ liêm chính học thuật. Các chỉ số mô phỏng được dựng cho mục đích giáo dục, minh họa nguyên lý kinh tế học Mác - Lênin, không phải dữ liệu tài chính thực tế hay lời khuyên đầu tư.
            </p>
          </div>

        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Alpha Corp Capital Cycle Study. Đồ án môn học MLN122.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
