const StickyCapitalFlow = ({ currentChapter }) => {
  // Logic hiển thị trạng thái dựa trên chương
  // Ch. 1: Khoản vay (T)
  // Ch. 2: T -> H
  // Ch. 3: Quá trình sản xuất (SX)
  // Ch. 4: Tòa tháp (H')
  // Ch. 5-7: Đóng băng H' ╳ T'
  
  const getOpacity = (stage) => {
    switch (stage) {
      case 'T': return currentChapter >= 1 ? 1 : 0.2;
      case 'H': return currentChapter >= 2 ? 1 : 0.2;
      case 'SX': return currentChapter >= 3 ? 1 : 0.2;
      case 'H_prime': return currentChapter >= 4 ? 1 : 0.2;
      case 'T_prime': return currentChapter >= 8 ? 1 : 0.2; // Chỉ T' về khi giải quyết xong
      default: return 0.2;
    }
  };

  const isCrisis = currentChapter >= 5 && currentChapter <= 7;

  return (
    <div style={{ position: 'sticky', top: '100px', padding: 'var(--spacing-md)', borderLeft: '1px solid var(--color-border)' }}>
      <div className="label-tag mb-lg">DÒNG TUẦN HOÀN TƯ BẢN</div>
      
      <div className="flex-col gap-md text-serif" style={{ fontSize: '1.5rem' }}>
        <div style={{ opacity: getOpacity('T'), transition: 'opacity 0.5s' }}>
          T <span className="text-muted text-sans" style={{ fontSize: '0.9rem', display: 'block' }}>Tư bản tiền tệ</span>
        </div>
        
        <div style={{ opacity: getOpacity('H'), transition: 'opacity 0.5s', paddingLeft: '1rem', borderLeft: '2px solid var(--color-border)' }}>
          &darr;
          <div className="mt-xs">H <span className="text-muted text-sans" style={{ fontSize: '0.9rem', display: 'block' }}>Hàng hóa (c, v)</span></div>
        </div>

        <div style={{ opacity: getOpacity('SX'), transition: 'opacity 0.5s', paddingLeft: '1rem', borderLeft: '2px dotted var(--color-border)' }}>
          &darr;
          <div className="mt-xs">SX <span className="text-muted text-sans" style={{ fontSize: '0.9rem', display: 'block' }}>Sản xuất</span></div>
        </div>

        <div style={{ 
          opacity: getOpacity('H_prime'), 
          transition: 'all 0.5s', 
          paddingLeft: '1rem', 
          borderLeft: `2px solid ${isCrisis ? 'var(--color-danger)' : 'var(--color-border)'}` 
        }}>
          &darr;
          <div className="mt-xs">
            <span style={{ color: isCrisis ? 'var(--color-danger)' : 'var(--color-gold)', fontWeight: isCrisis ? 600 : 400 }}>H'</span> 
            <span className="text-muted text-sans" style={{ fontSize: '0.9rem', display: 'block' }}>Tư bản hàng hóa</span>
          </div>
        </div>

        <div style={{ opacity: isCrisis ? 1 : getOpacity('T_prime'), transition: 'opacity 0.5s' }}>
          {isCrisis ? (
            <div className="text-danger mt-sm mb-xs" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>&times; Đứt gãy thanh khoản</div>
          ) : (
            <div className="mt-sm">&darr;</div>
          )}
          <div className="mt-xs" style={{ opacity: getOpacity('T_prime') }}>T' <span className="text-muted text-sans" style={{ fontSize: '0.9rem', display: 'block' }}>Tiền thu về</span></div>
        </div>
      </div>

      {isCrisis && (
        <div className="mt-lg p-sm" style={{ backgroundColor: 'rgba(180, 35, 24, 0.05)', border: '1px solid rgba(180, 35, 24, 0.2)', fontSize: '0.85rem' }}>
          <strong className="text-danger">CẢNH BÁO:</strong> Giá trị hàng hóa chưa được thực hiện. Tư bản tiền tệ không quay trở lại. Chu kỳ tái sản xuất bị ngưng trệ.
        </div>
      )}
    </div>
  );
};

export default StickyCapitalFlow;
