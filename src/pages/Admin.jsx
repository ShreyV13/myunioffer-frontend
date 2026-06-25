import React, { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, query, where, orderBy, limit, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';

const ADMIN_PASSWORD = 'shreyunioffer2024';

const bg = '#0f0f12';
const card = 'rgba(255,255,255,0.04)';
const border = 'rgba(255,255,255,0.07)';
const coral = '#f96a50';
const muted = 'rgba(255,255,255,0.35)';
const text = '#fff';

function Card({ children, style }) {
  return (
    <div style={{
      background: card,
      border: `1px solid ${border}`,
      borderRadius: '0.9rem',
      padding: '1.5rem',
      ...style
    }}>
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

function Stat({ label, value, sub, accent }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
      <div style={{ fontSize: '0.75rem', color: muted }}>{label}</div>
      <div style={{ fontSize: '1.6rem', fontWeight: 800, color: accent || text, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: '0.7rem', color: muted }}>{sub}</div>}
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
  { label: 'Last 24h', hours: 24 },
  { label: 'Last 7 days', hours: 24 * 7 },
  { label: 'Last 30 days', hours: 24 * 30 },
  { label: 'All time', hours: null },
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
    if (pw === ADMIN_PASSWORD) {
      setAuthed(true);
    } else {
      setPwError('Wrong password.');
    }
  }

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const rangeHours = RANGES[rangeIdx].hours;
      const cutoff = rangeHours ? new Date(Date.now() - rangeHours * 60 * 60 * 1000) : null;
      const cutoffTs = cutoff ? Timestamp.fromDate(cutoff) : null;

      const usersSnap = await getDocs(collection(db, 'users'));
      const users = [];
      usersSnap.forEach(d => users.push({ id: d.id, ...d.data() }));

      const totalUsers = users.length;

      const newSignups = cutoffTs
        ? users.filter(u => u.createdAt && u.createdAt.toMillis && u.createdAt.toMillis() >= cutoffTs.toMillis())
        : users;

      const bySource = {};
      users.forEach(u => {
        const s = u.acquisitionSource || '(none)';
        bySource[s] = (bySource[s] || 0) + 1;
      });

      const byHear = {};
      users.forEach(u => {
        const s = u.hearAboutUs || '(not answered)';
        byHear[s] = (byHear[s] || 0) + 1;
      });

      let activatedCount = 0;
      let totalMessageCount = 0;
      const userMessageCounts = {};

      const sessionFetches = users.map(async u => {
        const sessSnap = await getDocs(collection(db, 'users', u.id, 'sessions'));
        let msgs = 0;
        sessSnap.forEach(s => {
          const d = s.data();
          if (d.messages && Array.isArray(d.messages)) {
            msgs += Math.floor(d.messages.length / 2);
          }
        });
        userMessageCounts[u.id] = msgs;
        if (msgs > 0) activatedCount++;
        totalMessageCount += msgs;
      });
      await Promise.all(sessionFetches);

      const neverUsed = totalUsers - activatedCount;
      const activationRate = totalUsers > 0 ? ((activatedCount / totalUsers) * 100).toFixed(1) : 0;
      const avgMessages = activatedCount > 0 ? (totalMessageCount / activatedCount).toFixed(1) : 0;

      const freeUsers = users.filter(u => !u.plan || u.plan === 'free');
      let hitLimit = 0;
      let returnedAfterLimit = 0;

      const limitFetches = freeUsers.map(async u => {
        const sessSnap = await getDocs(collection(db, 'users', u.id, 'sessions'));
        let hitLimitInRange = false;
        let latestHitTs = null;
        let returnedAfter = false;

        sessSnap.forEach(s => {
          const d = s.data();
          if (!d.messages || !Array.isArray(d.messages)) return;
          const userMsgs = d.messages.filter(m => m.role === 'user').length;
          if (userMsgs >= 9) {
            const ts = d.updatedAt || d.createdAt;
            if (!cutoffTs || (ts && ts.toMillis && ts.toMillis() >= cutoffTs.toMillis())) {
              hitLimitInRange = true;
              if (!latestHitTs || (ts && ts.toMillis() > latestHitTs)) {
                latestHitTs = ts ? ts.toMillis() : null;
              }
            }
          }
        });

        if (hitLimitInRange) {
          hitLimit++;
          sessSnap.forEach(s => {
            const d = s.data();
            if (!d.messages || !Array.isArray(d.messages)) return;
            const ts = d.updatedAt || d.createdAt;
            if (ts && ts.toMillis && latestHitTs && ts.toMillis() > latestHitTs + 60000) {
              returnedAfter = true;
            }
          });
          if (returnedAfter) returnedAfterLimit++;
        }
      });
      await Promise.all(limitFetches);

      const neverReturnedAfterLimit = hitLimit - returnedAfterLimit;
      const returnRate = hitLimit > 0 ? ((returnedAfterLimit / hitLimit) * 100).toFixed(1) : 0;

      const paidUsers = users.filter(u => u.plan === 'premium');
      const totalFree = totalUsers - paidUsers.length;
      const conversionRate = totalUsers > 0 ? ((paidUsers.length / totalUsers) * 100).toFixed(1) : 0;

      const newPaid = cutoffTs
        ? paidUsers.filter(u => u.createdAt && u.createdAt.toMillis && u.createdAt.toMillis() >= cutoffTs.toMillis())
        : paidUsers;

      const convBySource = {};
      users.forEach(u => {
        const s = u.acquisitionSource || '(none)';
        if (!convBySource[s]) convBySource[s] = { signups: 0, paid: 0 };
        convBySource[s].signups++;
        if (u.plan === 'premium') convBySource[s].paid++;
      });

      const now = Date.now();
      const day7 = now - 7 * 24 * 60 * 60 * 1000;
      const day14 = now - 14 * 24 * 60 * 60 * 1000;
      const day30 = now - 30 * 24 * 60 * 60 * 1000;

      const activeUserIds7 = new Set();
      const activeUserIds30 = new Set();

      const retentionFetches = users.map(async u => {
        const sessSnap = await getDocs(collection(db, 'users', u.id, 'sessions'));
        sessSnap.forEach(s => {
          const d = s.data();
          const ts = d.updatedAt || d.createdAt;
          if (ts && ts.toMillis) {
            if (ts.toMillis() >= day7) activeUserIds7.add(u.id);
            if (ts.toMillis() >= day30) activeUserIds30.add(u.id);
          }
        });
      });
      await Promise.all(retentionFetches);

      const wau = activeUserIds7.size;
      const mau = activeUserIds30.size;

      const inactive7 = users.filter(u => {
        const created = u.createdAt && u.createdAt.toMillis ? u.createdAt.toMillis() : 0;
        return created < day7 && !activeUserIds7.has(u.id);
      }).length;

      const churned14 = users.filter(u => {
        const created = u.createdAt && u.createdAt.toMillis ? u.createdAt.toMillis() : 0;
        return created < day14 && !activeUserIds30.has(u.id);
      }).length;

      const repSources = Object.keys(bySource).filter(s => s.includes('_') && s !== '(none)');
      const repData = {};
      repSources.forEach(s => {
        const repUsers = users.filter(u => u.acquisitionSource === s);
        const repPaid = repUsers.filter(u => u.plan === 'premium');
        repData[s] = {
          signups: repUsers.length,
          paid: repPaid.length,
          commission: (repPaid.length * 2.5 + repUsers.length * 0.5).toFixed(2),
        };
      });

      setData({
        totalUsers,
        newSignups: newSignups.length,
        bySource,
        byHear,
        activatedCount,
        neverUsed,
        activationRate,
        avgMessages,
        hitLimit,
        returnedAfterLimit,
        neverReturnedAfterLimit,
        returnRate,
        totalFree,
        paidCount: paidUsers.length,
        conversionRate,
        newPaid: newPaid.length,
        convBySource,
        wau,
        mau,
        inactive7,
        churned14,
        repData,
      });
    } catch (e) {
      console.error(e);
      setError('Failed to load data: ' + e.message);
    }
    setLoading(false);
  }, [rangeIdx]);

  useEffect(() => {
    if (authed) fetchData();
  }, [authed, fetchData]);

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
              <input
                type="password"
                value={pw}
                onChange={e => setPw(e.target.value)}
                placeholder="Password"
                autoFocus
                style={{ width: '100%', padding: '0.75rem', borderRadius: '0.6rem', background: 'rgba(255,255,255,0.05)', border: `1px solid ${border}`, color: text, fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box', marginBottom: '0.8rem' }}
              />
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
              <button
                key={r.label}
                onClick={() => setRangeIdx(i)}
                style={{
                  padding: '0.45rem 0.9rem',
                  borderRadius: '0.5rem',
                  border: `1px solid ${i === rangeIdx ? coral : border}`,
                  background: i === rangeIdx ? 'rgba(249,106,80,0.15)' : 'transparent',
                  color: i === rangeIdx ? coral : muted,
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {r.label}
              </button>
            ))}
            <button
              onClick={fetchData}
              disabled={loading}
              style={{ padding: '0.45rem 0.9rem', borderRadius: '0.5rem', border: `1px solid ${border}`, background: 'transparent', color: muted, fontSize: '0.78rem', cursor: 'pointer' }}
            >
              {loading ? '...' : '↻ Refresh'}
            </button>
          </div>
        </div>

        {error && (
          <div style={{ padding: '1rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '0.7rem', color: '#f87171', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}

        {loading && !data && (
          <div style={{ textAlign: 'center', padding: '4rem', color: muted }}>Loading...</div>
        )}

        {data && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            <Card>
              <SectionTitle>User Growth</SectionTitle>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <Stat label="Total users" value={data.totalUsers} />
                <Stat label={`New signups (${RANGES[rangeIdx].label.toLowerCase()})`} value={data.newSignups} accent={coral} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: muted, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>By acquisition source (UTM)</div>
                  {Object.entries(data.bySource).sort((a, b) => b[1] - a[1]).map(([k, v]) => (
                    <Row key={k} label={k} value={v} />
                  ))}
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: muted, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>How did you hear about us</div>
                  {Object.entries(data.byHear).sort((a, b) => b[1] - a[1]).map(([k, v]) => (
                    <Row key={k} label={k} value={v} />
                  ))}
                </div>
              </div>
            </Card>

            <Card>
              <SectionTitle>Activation</SectionTitle>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.5rem' }}>
                <Stat label="Sent at least 1 message" value={data.activatedCount} />
                <Stat label="Signed up, never used" value={data.neverUsed} />
                <Stat label="Activation rate" value={`${data.activationRate}%`} accent={parseFloat(data.activationRate) > 50 ? '#4ade80' : coral} />
                <Stat label="Avg messages per active user" value={data.avgMessages} />
              </div>
            </Card>

            <Card>
              <SectionTitle>Message Limits</SectionTitle>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.5rem' }}>
                <Stat label="Free users who hit 9-msg limit" value={data.hitLimit} />
                <Stat label="Returned within 48h" value={data.returnedAfterLimit} />
                <Stat label="Return rate" value={`${data.returnRate}%`} accent={parseFloat(data.returnRate) > 50 ? '#4ade80' : coral} />
                <Stat label="Never came back" value={data.neverReturnedAfterLimit} />
              </div>
            </Card>

            <Card>
              <SectionTitle>Conversion</SectionTitle>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <Stat label="Free users" value={data.totalFree} />
                <Stat label="Paid users" value={data.paidCount} accent={coral} />
                <Stat label="Conversion rate" value={`${data.conversionRate}%`} />
                <Stat label={`New paid (${RANGES[rangeIdx].label.toLowerCase()})`} value={data.newPaid} accent={coral} />
              </div>
              <div style={{ fontSize: '0.72rem', color: muted, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Conversion rate by source</div>
              {Object.entries(data.convBySource).sort((a, b) => b[1].signups - a[1].signups).map(([k, v]) => (
                <Row
                  key={k}
                  label={k}
                  value={`${v.paid}/${v.signups} (${v.signups > 0 ? ((v.paid / v.signups) * 100).toFixed(0) : 0}%)`}
                  highlight={v.paid > 0}
                />
              ))}
            </Card>

            <Card>
              <SectionTitle>Retention</SectionTitle>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.5rem' }}>
                <Stat label="Weekly active users" value={data.wau} />
                <Stat label="Monthly active users" value={data.mau} />
                <Stat label="Inactive 7+ days" value={data.inactive7} />
                <Stat label="Likely churned (14+ days)" value={data.churned14} />
              </div>
            </Card>

            <Card>
              <SectionTitle>Sales Rep Tracking</SectionTitle>
              {Object.keys(data.repData).length === 0 ? (
                <div style={{ color: muted, fontSize: '0.82rem' }}>No rep UTM sources detected yet. Rep links format: myunioffer.com/?utm_source=tiktok_pavan</div>
              ) : (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    {['Source', 'Signups', 'Paid', 'Commission'].map(h => (
                      <div key={h} style={{ fontSize: '0.7rem', color: muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</div>
                    ))}
                  </div>
                  {Object.entries(data.repData).map(([source, d]) => (
                    <div key={source} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', padding: '0.6rem 0', borderBottom: `1px solid ${border}`, alignItems: 'center' }}>
                      <div style={{ fontSize: '0.82rem', color: coral, fontWeight: 600 }}>{source}</div>
                      <div style={{ fontSize: '0.82rem' }}>{d.signups}</div>
                      <div style={{ fontSize: '0.82rem' }}>{d.paid}</div>
                      <div style={{ fontSize: '0.82rem', color: '#4ade80', fontWeight: 600 }}>£{d.commission}</div>
                    </div>
                  ))}
                  <div style={{ fontSize: '0.72rem', color: muted, marginTop: '0.8rem' }}>Commission: £2.50 per paid user + £0.50 per free signup</div>
                </>
              )}
            </Card>

          </div>
        )}
      </div>
    </div>
  );
}
