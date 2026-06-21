import { useLocation, useNavigate } from 'react-router-dom';
import {
  PENDING_HOME_SECTION_STORAGE_KEY,
  scrollToPageTop,
  scrollToSectionById,
} from '../../utils/motion';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  const handleJump = (path) => {
    if (path === '/') {
      if (location.pathname === '/') {
        scrollToPageTop();
        window.history.replaceState(window.history.state, '', '/');
      } else {
        navigate('/');
      }
      return;
    }

    if (!path.startsWith('/#')) {
      navigate(path);
      return;
    }

    const id = path.replace('/#', '');
    if (location.pathname !== '/') {
      window.sessionStorage.setItem(PENDING_HOME_SECTION_STORAGE_KEY, id);
      navigate(path);
      return;
    }

    scrollToSectionById(id);
    window.history.replaceState(window.history.state, '', `/#${id}`);
  };

  return (
    <footer className="app-footer">
      <div className="container">
        <div className="footer-grid grid-12">
          <div className="footer-brand">
            <h3 className="footer-logo">AlphaCorp</h3>
            <p className="footer-course">MLN122 - Kinh tế chính trị Mác - Lênin</p>
            <p className="footer-description">
              Hệ sơ mô phỏng phục vụ học tập về tuần hoàn và chu chuyển tư bản. Dự án chuyển hóa lý luận thành trải nghiệm học tập trực quan.
            </p>
          </div>

          <div className="footer-links">
            <h4 className="footer-heading">Nội dung</h4>
            <ul>
              <li><button type="button" onClick={() => handleJump('/')}>Tổng quan vụ việc</button></li>
              <li><button type="button" onClick={() => handleJump('/#capital-journey')}>Hành trình vốn</button></li>
              <li><button type="button" onClick={() => handleJump('/#crisis')}>Khủng hoảng thanh khoản</button></li>
              <li><button type="button" onClick={() => handleJump('/simulators')}>Mô phỏng dòng tiền</button></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4 className="footer-heading">Minh bạch</h4>
            <ul>
              <li><button type="button" onClick={() => handleJump('/appendix')}>Nguồn học thuật</button></li>
              <li><button type="button" onClick={() => handleJump('/appendix')}>Nhật ký AI Usage</button></li>
              <li><button type="button" onClick={() => handleJump('/appendix')}>Nhóm thực hiện</button></li>
            </ul>
          </div>

          <div className="footer-integrity">
            <h4 className="footer-heading">Cam kết học thuật</h4>
            <p className="integrity-text">
              Sản phẩm tuân thủ liêm chính học tập. Các chỉ số mô phỏng được dùng cho mục đích giáo dục, minh họa nguyên lý kinh tế học Mác - Lênin, không phải dữ liệu tài chính thực tế hay lời khuyên đầu tư.
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
