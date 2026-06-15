import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <div className="app-shell">
      <Header />
      <main>
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="container footer-shell">
          <div>
            <div className="eyebrow">MLN122</div>
            <strong>Economic Forensics Lab</strong>
          </div>
          <p>
            Hồ sơ mô phỏng phục vụ học tập về tuần hoàn và chu chuyển tư bản. Chỉ số động trên trang
            được dựng cho mục đích giáo dục, không phải dữ liệu thực tế.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
