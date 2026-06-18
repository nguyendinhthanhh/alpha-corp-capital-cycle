import "./PageLoader.css";

export default function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-live="polite">
      <div className="page-loader__spinner" aria-hidden="true" />
      <p className="page-loader__text">Đang tải...</p>
    </div>
  );
}
