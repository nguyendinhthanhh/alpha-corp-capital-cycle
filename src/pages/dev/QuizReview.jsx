import { useState } from 'react';
import { questionBank } from '../../learning/questionBank';

const REQUIRED_CHECKS = [
  { id: 'c1', label: 'Tôi đã mở đúng file nguồn.' },
  { id: 'c2', label: 'Tôi đã kiểm tra đúng slide.' },
  { id: 'c3', label: 'Đoạn trích thật sự tồn tại.' },
  { id: 'c4', label: 'Đáp án đúng được nguồn hỗ trợ.' },
  { id: 'c5', label: 'Không có phương án sai nào cũng đúng.' },
  { id: 'c6', label: 'Phần giải thích không vượt quá nguồn.' },
  { id: 'c7', label: 'Câu không bịa dữ kiện Alpha Corp.' },
];

export default function QuizReview() {
  const [questions, setQuestions] = useState(questionBank);
  const [filterStatus, setFilterStatus] = useState('all');
  const [loadingId, setLoadingId] = useState(null);

  // Store review state per question
  const [reviewState, setReviewState] = useState({});

  const handleCheck = (qId, checkId) => {
    setReviewState(prev => {
      const qState = prev[qId] || { checks: {}, reviewer: '', note: '' };
      return {
        ...prev,
        [qId]: {
          ...qState,
          checks: { ...qState.checks, [checkId]: !qState.checks[checkId] }
        }
      };
    });
  };

  const handleInput = (qId, field, value) => {
    setReviewState(prev => {
      const qState = prev[qId] || { checks: {}, reviewer: '', note: '' };
      return { ...prev, [qId]: { ...qState, [field]: value } };
    });
  };

  const updateStatus = async (id, status) => {
    const qState = reviewState[id] || {};
    
    setLoadingId(id);
    try {
      // Use existing endpoint, in a real app we'd pass reviewer/note too
      const res = await fetch('http://localhost:5173/api/dev/verify-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status, reviewer: qState.reviewer, note: qState.note })
      });
      if (res.ok) {
        setQuestions(prev => prev.map(q => q.id === id ? { ...q, verificationStatus: status } : q));
        alert(`Successfully marked as ${status}`);
      } else {
        alert('Failed to update status on server');
      }
    } catch (e) {
      alert('Error updating status: ' + e.message);
    } finally {
      setLoadingId(null);
    }
  };

  const filtered = questions.filter(q => {
    if (filterStatus === 'needs-review' && q.verificationStatus !== 'needs-review') return false;
    if (filterStatus === 'verified' && q.verificationStatus !== 'verified') return false;
    if (filterStatus === 'rejected' && q.verificationStatus !== 'rejected') return false;
    
    if (filterStatus === 'batch-01') return q.evidence?.excerptFoundInSource === true;
    if (filterStatus === 'exact-match') return q.evidence?.excerptFoundInSource === true;
    if (filterStatus === 'high-priority') return (q.evidence?.confidence === 'high' || q.evidence?.confidence === 'medium');
    if (filterStatus === 'alpha-corp') return q.origin === 'alpha-corp-application';
    if (filterStatus === 'needs-source-fix') return q.evidence?.recommendedDecision === 'needs-source-fix';

    return true;
  });

  return (
    <div style={{ padding: '2rem', background: '#0a0a0a', color: '#eee', minHeight: '100vh', fontFamily: 'system-ui' }}>
      <h1>Dev-Only: Quiz Evidence Review</h1>
      
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ padding: '0.5rem', background: '#222', color: '#fff', border: '1px solid #444' }}>
          <option value="all">All Questions</option>
          <option value="batch-01">Review Batch 01 (Exact Matches)</option>
          <option value="exact-match">Exact source match</option>
          <option value="high-priority">High priority</option>
          <option value="alpha-corp">Alpha Corp</option>
          <option value="needs-source-fix">Needs source fix</option>
          <option value="needs-review">Status: Needs Review</option>
          <option value="verified">Status: Verified</option>
          <option value="rejected">Status: Rejected</option>
        </select>
        <span>Total: {filtered.length} questions</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {filtered.map(q => {
          const state = reviewState[q.id] || { checks: {}, reviewer: '', note: '' };
          const allChecked = REQUIRED_CHECKS.every(c => state.checks[c.id]);
          const canVerify = allChecked && q.evidence?.confidence !== 'low' && q.evidence?.excerptFoundInSource !== false;

          return (
            <div key={q.id} style={{ border: '1px solid #444', borderRadius: '8px', background: '#111', overflow: 'hidden' }}>
              {/* Header */}
              <div style={{ background: '#222', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ 
                    display: 'inline-block', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', marginRight: '1rem',
                    background: q.verificationStatus === 'verified' ? 'green' : q.verificationStatus === 'rejected' ? 'red' : 'orange',
                    color: q.verificationStatus === 'needs-review' ? 'black' : 'white'
                  }}>
                    {q.verificationStatus}
                  </span>
                  <strong>{q.id}</strong> | Type: {q.type} | Origin: {q.origin}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    disabled={loadingId === q.id || !canVerify}
                    onClick={() => updateStatus(q.id, 'verified')}
                    style={{ background: canVerify ? 'green' : '#333', color: 'white', border: 'none', padding: '0.5rem 1rem', cursor: canVerify ? 'pointer' : 'not-allowed', borderRadius: '4px' }}
                    title={!canVerify ? "Must check all boxes and have valid evidence" : ""}
                  >
                    Verify
                  </button>
                  <button 
                    disabled={loadingId === q.id}
                    onClick={() => updateStatus(q.id, 'rejected')}
                    style={{ background: '#a00', color: 'white', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer', borderRadius: '4px' }}
                  >
                    Reject
                  </button>
                </div>
              </div>

              {/* 2-Column Body */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', padding: '1.5rem' }}>
                {/* LEFT: Question */}
                <div>
                  <h3 style={{ margin: '0 0 1rem 0', color: '#fff' }}>Prompt</h3>
                  <div style={{ background: '#1a1a1a', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem' }}>
                    {q.prompt}
                  </div>
                  
                  <h4 style={{ color: '#aaa', marginBottom: '0.5rem' }}>Options (Correct: {q.correctAnswer.toUpperCase()})</h4>
                  {q.options?.map(opt => (
                    <div key={opt.id} style={{ padding: '0.5rem', border: '1px solid #333', marginBottom: '0.5rem', background: opt.isCorrect ? 'rgba(0,255,0,0.1)' : 'transparent' }}>
                      <strong>{opt.id.toUpperCase()}:</strong> {opt.text}
                      {!opt.isCorrect && opt.wrongReason && <div style={{ fontSize: '0.85rem', color: '#a66', marginTop: '0.25rem' }}>Reason: {opt.wrongReason}</div>}
                    </div>
                  ))}

                  <h4 style={{ color: '#aaa', margin: '1.5rem 0 0.5rem 0' }}>Explanation</h4>
                  <div style={{ background: '#1a1a1a', padding: '1rem', borderRadius: '4px', fontSize: '0.9rem' }}>
                    {q.explanation}
                  </div>
                </div>

                {/* RIGHT: Evidence */}
                <div style={{ borderLeft: '1px solid #333', paddingLeft: '2rem' }}>
                  <h3 style={{ margin: '0 0 1rem 0', color: '#fff' }}>Bằng Chứng (Evidence)</h3>
                  
                  {/* Status Badges */}
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                    {q.evidence?.excerptFoundInSource ? (
                      <span style={{ background: 'rgba(0,255,0,0.2)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', color: '#4f4' }}>Exact match found</span>
                    ) : (
                      <span style={{ background: 'rgba(255,0,0,0.2)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', color: '#f44' }}>Excerpt not found</span>
                    )}
                    {q.evidence?.alphaCorpFactsSupported === false && (
                      <span style={{ background: 'rgba(255,165,0,0.2)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', color: 'orange' }}>Alpha Corp evidence missing/invalid</span>
                    )}
                    <span style={{ border: '1px solid #555', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>
                      Confidence: {q.evidence?.confidence?.toUpperCase()}
                    </span>
                  </div>

                  <div style={{ background: '#1a1a1a', padding: '1rem', borderRadius: '4px', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    <div style={{ marginBottom: '0.5rem' }}><strong>File:</strong> {q.evidence?.sourceFileName}</div>
                    <div style={{ marginBottom: '0.5rem' }}><strong>Session:</strong> {q.evidence?.sessionOrSlot}</div>
                    <div style={{ marginBottom: '0.5rem' }}><strong>Slide:</strong> {q.evidence?.slideNumber}</div>
                    <hr style={{ borderColor: '#333', margin: '1rem 0' }}/>
                    <strong>Exact Source Excerpt:</strong>
                    <blockquote style={{ borderLeft: '3px solid #666', margin: '0.5rem 0 0 0', paddingLeft: '1rem', color: '#ccc' }}>
                      {q.evidence?.exactSourceExcerpt || q.evidence?.normalizedSourceExcerpt || 'Không có.'}
                    </blockquote>
                  </div>

                  {q.evidence?.issues?.length > 0 && (
                    <div style={{ background: 'rgba(255,0,0,0.1)', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem', color: '#f66' }}>
                      <strong>Issues detected:</strong>
                      <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem' }}>
                        {q.evidence.issues.map((issue, i) => <li key={i}>{issue}</li>)}
                      </ul>
                    </div>
                  )}

                  <div style={{ background: '#222', padding: '1.5rem', borderRadius: '8px' }}>
                    <h4 style={{ margin: '0 0 1rem 0' }}>Checklist Bắt Buộc Trước Khi Verify</h4>
                    {REQUIRED_CHECKS.map(c => (
                      <label key={c.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem', cursor: 'pointer' }}>
                        <input type="checkbox" checked={state.checks[c.id] || false} onChange={() => handleCheck(q.id, c.id)} style={{ marginTop: '0.25rem' }} />
                        <span style={{ fontSize: '0.9rem', color: state.checks[c.id] ? '#888' : '#eee', textDecoration: state.checks[c.id] ? 'line-through' : 'none' }}>
                          {c.label}
                        </span>
                      </label>
                    ))}

                    <div style={{ marginTop: '1.5rem' }}>
                      <input 
                        type="text" 
                        placeholder="Reviewed by (Tên bạn)" 
                        value={state.reviewer}
                        onChange={e => handleInput(q.id, 'reviewer', e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem', background: '#000', border: '1px solid #444', color: '#fff' }}
                      />
                      <textarea 
                        placeholder="Review notes..." 
                        value={state.note}
                        onChange={e => handleInput(q.id, 'note', e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', background: '#000', border: '1px solid #444', color: '#fff', resize: 'vertical', minHeight: '60px' }}
                      />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
