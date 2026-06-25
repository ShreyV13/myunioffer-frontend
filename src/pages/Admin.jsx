import React, { useState, useEffect, useCallback } from 'react';

const ADMIN_PASSWORD = 'shreyunioffer2024';
const API_URL = import.meta.env.VITE_API_URL;

const bg = '#0f0f12';
const card = 'rgba(255,255,255,0.04)';
const border = 'rgba(255,255,255,0.07)';
const coral = '#f96a50';
const muted = 'rgba(255,255,255,0.35)';
const text = '#fff';

function Card({ children, style }) {
  return (
    <div style={{ background: card, border: `1px solid ${border}`, borderRadius: '0.9rem', padding: '1.5rem', ...style }}>
      {children}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', color: muted, textTransform: 'uppercase', marginBottom: '1rem', marginTop: 0 }}>
      {children}
    </h2>
  );
}

function Stat({ label, value, accent }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
      <div style={{ fontSize: '0.75rem', color: muted }}>{label}</div>
      <div style={{ fontSize: '1.6rem', fontWeight: 800, color: accent || text, lineHeight: 1 }}>{value}</div>
    </div>
  );
}

function Row({ label, value, highlight }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.55rem 0', borderBottom: `1px solid ${border}` }}>
      <span style={{ fontSize: '0.82rem', color: muted }}>{label}</span>
      <span style={{ fontSize: '0.82rem', fontWeight: 600, color: highlight ? coral : text }}>{value}</span>
    </div>
  );
}

const RANGES = [
  { label: 'Last 24h', key: '24h' },
  { label: 'Last 7 days', key: '7d' },
  { label: 'Last 30 days', key: '30d' },
  { label: 'All time', key: 'all' },
];

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [pwError, setPwError] = useState('');
  const [rangeIdx, setRangeIdx] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  function handleLogin(e) {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) { setAuthed(true); } else { setPwError('Wrong password.'); }
  }

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/admin/stats`, {
        headers: { 'X-Admin-Password': ADMIN_PASSWORD }
      });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      setData(await res.json());
    } catch (e) {
      setError('Failed to load: ' + e.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => { if (authed) fetchData(); }, [authed, fetchData]);

  if (!authed) {
    return (
      <div style={{ background: bg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ width: 340 }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ width: 44, height: 44, background: `linear-gradient(135deg, ${coral}, #e74d32)`, borderRadius: '0.7rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.2rem' }}>🔒</span>
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: text }}>Admin</div>
            <div style={{ fontSize: '0.8rem', color: muted, marginTop: '0.3rem' }}>myunioffer ai</div>
          </div>
          <Card>
            <form onSubmit={handleLogin}>
              <input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="Password" autoFocus
                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.6rem', background: 'rgba(255,255,255,0.05)', border: `1px solid ${border}`, color: text, fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box', marginBottom: '0.8rem' }} />
              {pwError && <div style={{ color: '#f87171', fontSize: '0.78rem', marginBottom: '0.8rem' }}>{pwError}</div>}
              <button type="submit" style={{ width: '100%', padding: '0.75rem', background: `linear-gradient(135deg, ${coral}, #e74d32)`, border: 'none', borderRadius: '0.6rem', color: '#fff', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}>
                Enter
              </button>
            </form>
          </Card>
        </div>
      </div>
    );
  }

  const range = RANGES[rangeIdx].key;

  return (
    <div style={{ background: bg, minHeight: '100vh', fontFamily: "'DM Sans', sans-serif", color: text, padding: '2rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>Admin Dashboard</div>
            <div style={{ fontSize: '0.78rem', color: muted, marginTop: '0.2rem' }}>myunioffer ai</div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {RANGES.map((r, i) => (
              <button key={r.key} onClick={() => setRangeIdx(i)} style={{ padding: '0.45rem 0.9rem', borderRadius: '0.5rem', border: `1px solid ${i === rangeIdx ? coral : border}`, background: i === rangeIdx ? 'rgba(249,106,80,0.15)' : 'transparent', color: i === rangeIdx ? coral : muted, fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}>
                {r.label}
              </button>
            ))}
            <button onClick={fetchData} disabled={loading} style={{ padding: '0.45rem 0.9rem', borderRadius: '0.5rem', border: `1px solid ${border}`, background: 'transparent', color: muted, fontSize: '0.78rem', cursor: 'pointer' }}>
              {loading ? '...' : '↻ Refresh'}
            </button>
          </div>
        </div>

        {error && <div style={{ padding: '1rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '0.7rem', color: '#f87171', fontSize: '0.85rem', marginBottom: '1.5rem' }}>{error}</div>}
        {loading && !data && <div style={{ textAlign: 'center', padding: '4rem', color: muted }}>Loading...</div>}

        {data && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            <Card>
              <SectionTitle>User Growth</SectionTitle>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <Stat label="Total users" value={data.total_users} />
                <Stat label={`New signups (${RANGES[rangeIdx].label.toLowerCase()})`} value={data.new_signups[range]} accent={coral} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: muted, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>By UTM source</div>
                  {Object.entries(data.by_source).map(([k, v]) => <Row key={k} label={k} value={v} />)}
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: muted, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>How did you hear about us</div>
                  {Object.entries(data.by_hear).map(([k, v]) => <Row key={k} label={k} value={v} />)}
                </div>
              </div>
            </Card>

            <Card>
              <SectionTitle>Activation</SectionTitle>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.5rem' }}>
                <Stat label="Sent at least 1 message" value={data.activated} />
                <Stat label="Signed up, never used" value={data.never_used} />
                <Stat label="Activation rate" value={`${data.activation_rate}%`} accent={data.activation_rate > 50 ? '#4ade80' : coral} />
                <Stat label="Avg messages per active user" value={data.avg_messages} />
              </div>
            </Card>

            <Card>
              <SectionTitle>Message Limits</SectionTitle>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.5rem' }}>
                <Stat label="Hit 9-msg limit" value={data.hit_limit} />
                <Stat label="Returned within 48h" value={data.returned} />
                <Stat label="Return rate" value={`${data.return_rate}%`} accent={data.return_rate > 50 ? '#4ade80' : coral} />
                <Stat label="Never came back" value={data.never_returned} />
              </div>
            </Card>

            <Card>
              <SectionTitle>Conversion</SectionTitle>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <Stat label="Free users" value={data.total_free} />
                <Stat label="Paid users" value={data.paid_count} accent={coral} />
                <Stat label="Conversion rate" value={`${data.conversion_rate}%`} />
              </div>
              <div style={{ fontSize: '0.72rem', color: muted, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>By source</div>
              {Object.entries(data.conv_by_source).sort((a, b) => b[1].signups - a[1].signups).map(([k, v]) => (
                <Row key={k} label={k} value={`${v.paid}/${v.signups} (${v.signups > 0 ? Math.round(v.paid / v.signups * 100) : 0}%)`} highlight={v.paid > 0} />
              ))}
            </Card>

            <Card>
              <SectionTitle>Retention</SectionTitle>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.5rem' }}>
                <Stat label="Weekly active (WAU)" value={data.wau} />
                <Stat label="Monthly active (MAU)" value={data.mau} />
                <Stat label="Inactive 7+ days" value={data.inactive_7} />
                <Stat label="Likely churned (14+ days)" value={data.churned_14} />
              </div>
            </Card>

            <Card>
              <SectionTitle>Sales Rep Tracking</SectionTitle>
              {Object.keys(data.rep_data).length === 0 ? (
                <div style={{ color: muted, fontSize: '0.82rem' }}>No rep UTM sources yet. Format: myunioffer.com/?utm_source=tiktok_pavan</div>
              ) : (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    {['Source', 'Signups', 'Paid', 'Commission'].map(h => (
                      <div key={h} style={{ fontSize: '0.7rem', color: muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</div>
                    ))}
                  </div>
                  {Object.entries(data.rep_data).map(([source, d]) => (
                    <div key={source} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', padding: '0.6rem 0', borderBottom: `1px solid ${border}`, alignItems: 'center' }}>
                      <div style={{ fontSize: '0.82rem', color: coral, fontWeight: 600 }}>{source}</div>
                      <div style={{ fontSize: '0.82rem' }}>{d.signups}</div>
                      <div style={{ fontSize: '0.82rem' }}>{d.paid}</div>
                      <div style={{ fontSize: '0.82rem', color: '#4ade80', fontWeight: 600 }}>£{d.commission}</div>
                    </div>
                  ))}
                  <div style={{ fontSize: '0.72rem', color: muted, marginTop: '0.8rem' }}>£2.50 per paid + £0.50 per free signup</div>
                </>
              )}
            </Card>

          </div>
        )}
      </div>
    </div>
  );
}
