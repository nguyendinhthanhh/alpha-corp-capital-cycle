import './Legend.css';

export const Legend = ({ state }) => {
  const items = [
    { color: '#68cdd8', label: 'Dòng vốn', type: 'normal' },
    { color: '#6ecd9a', label: 'Hoạt động bình thường', type: 'normal' },
    { color: '#ff6e5c', label: 'Điểm đứt gãy', type: 'crisis' },
    { color: '#7a8a9f', label: 'Bị khóa', type: 'crisis' }
  ];

  const visibleItems = items.filter(item => {
    if (state === 'crisis' || state === 'recovery') return true;
    return item.type === 'normal';
  });

  return (
    <div className="legend">
      <div className="legend-title">Chú thích</div>
      <div className="legend-items">
        {visibleItems.map((item, index) => (
          <div key={index} className="legend-item">
            <div 
              className="legend-color" 
              style={{ background: item.color }}
            />
            <span className="legend-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
