import './GlobalBackground.css';

const GlobalBackground = () => {
  return (
    <div className="global-bg" aria-hidden="true">
      <div className="mesh-gradient">
        <div className="mesh-blob mesh-blob-1"></div>
        <div className="mesh-blob mesh-blob-2"></div>
        <div className="mesh-blob mesh-blob-3"></div>
      </div>
      <div className="bg-grid"></div>
      <div className="bg-noise"></div>
    </div>
  );
};

export default GlobalBackground;
