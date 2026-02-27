import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Download } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { mockAuditLogs } from '../../data/adminMockData';

const actionBadge = a => {
    const m = { APPROVED: { bg: 'rgba(34,197,94,0.1)', c: '#22c55e', b: 'rgba(34,197,94,0.3)' }, ADDED: { bg: 'rgba(59,130,246,0.1)', c: '#3b82f6', b: 'rgba(59,130,246,0.3)' }, ALERT: { bg: 'rgba(245,158,11,0.1)', c: '#f59e0b', b: 'rgba(245,158,11,0.3)' }, FAILED_LOGIN: { bg: 'rgba(217,0,37,0.1)', c: 'var(--red)', b: 'rgba(217,0,37,0.3)' } };
    const s = m[a] || { bg: 'rgba(255,255,255,0.05)', c: 'var(--text3)', b: 'rgba(255,255,255,0.1)' };
    return <span style={{ background: s.bg, border: `1px solid ${s.b}`, borderRadius: 100, padding: '2px 8px', fontFamily: 'var(--font-mono)', fontSize: 9, color: s.c }}>{a}</span>;
};

export default function AdminAudit() {
    const [sevFilter, setSevFilter] = useState('All');
    const [search, setSearch] = useState('');

    const filtered = mockAuditLogs.filter(l => {
        if (sevFilter !== 'All' && l.severity !== sevFilter) return false;
        if (search && !l.user.toLowerCase().includes(search.toLowerCase()) && !l.detail.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    });

    const criticalLogs = mockAuditLogs.filter(l => l.severity === 'Critical');
    const warningCount = mockAuditLogs.filter(l => l.severity === 'Warning').length;

    return (
        <AdminLayout title="Audit Logs" page="AUDIT">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
                    {[{ l: 'TOTAL LOGS', v: '48,420' }, { l: 'TODAY', v: '124' }, { l: 'WARNINGS', v: String(warningCount), c: '#f59e0b' }, { l: 'CRITICAL', v: String(criticalLogs.length), c: 'var(--red)' }].map(({ l, v, c }, i) => (
                        <motion.div key={l} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                            style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 24 }}>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>{l}</div>
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, color: c || '#fff', lineHeight: 1, animation: c === 'var(--red)' ? 'pulse 2s ease-in-out infinite' : 'none' }}>{v}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Critical Alert */}
                {criticalLogs.length > 0 && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                        style={{ background: 'rgba(217,0,37,0.08)', border: '1px solid rgba(217,0,37,0.3)', borderRadius: 16, padding: '18px 24px' }}>
                        <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 15, color: 'var(--red)', marginBottom: 4 }}>⚠ Critical: {criticalLogs[0].detail} from {criticalLogs[0].ip}</div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text3)' }}>{criticalLogs[0].timestamp} · Possible unauthorized access attempt</div>
                    </motion.div>
                )}

                {/* Filters */}
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    {['All', 'Info', 'Warning', 'Critical'].map(s => (
                        <button key={s} onClick={() => setSevFilter(s)} style={{ background: sevFilter === s ? 'var(--red)' : 'rgba(255,255,255,0.05)', border: `1px solid ${sevFilter === s ? 'var(--red)' : 'rgba(255,255,255,0.1)'}`, borderRadius: 100, padding: '5px 14px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 11, color: sevFilter === s ? '#fff' : 'var(--text2)' }}>{s}</button>
                    ))}
                    <div style={{ flex: 1, position: 'relative' }}>
                        <Search size={14} color="var(--text3)" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search user, details..." style={{ width: '100%', background: '#0F0F17', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '9px 12px 9px 38px', fontFamily: 'var(--font-body)', fontSize: 13, color: '#fff', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text2)' }}><Download size={14} /> Export</button>
                </div>

                {/* Logs */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 20, color: '#fff' }}>System Audit Trail</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text3)' }}>Showing 1–{filtered.length} of 48,420</div>
                    </div>
                    {filtered.map(log => {
                        const isCrit = log.severity === 'Critical';
                        const isWarn = log.severity === 'Warning';
                        return (
                            <motion.div key={log.log_id} initial={{ x: isCrit ? -10 : 0, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }}
                                style={{ display: 'grid', gridTemplateColumns: '120px 1fr 100px 140px 1fr 110px', gap: 12, alignItems: 'center', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', borderLeft: isCrit ? '3px solid #D90025' : isWarn ? '3px solid #f59e0b' : '3px solid transparent', paddingLeft: isCrit || isWarn ? 12 : 0, background: isCrit ? 'rgba(217,0,37,0.04)' : 'transparent' }}
                                onMouseEnter={e => e.currentTarget.style.background = isCrit ? 'rgba(217,0,37,0.06)' : 'rgba(255,255,255,0.02)'}
                                onMouseLeave={e => e.currentTarget.style.background = isCrit ? 'rgba(217,0,37,0.04)' : 'transparent'}>
                                <div>
                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#fff' }}>{log.timestamp.split(' ')[1]}</div>
                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)' }}>{log.timestamp.split(' ')[0]}</div>
                                </div>
                                <div>
                                    <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 600, fontSize: 14, color: '#fff' }}>{log.user}</div>
                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)' }}>{log.role}</div>
                                </div>
                                {actionBadge(log.action)}
                                <div>
                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text3)' }}>{log.entity}</div>
                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#fff' }}>{log.entity_id}</div>
                                </div>
                                <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{log.detail}</div>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)' }}>{log.ip}</div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </AdminLayout>
    );
}
