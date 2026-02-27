import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Download } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import PriorityBadge from '../../components/hospital/PriorityBadge';
import StatusBadge from '../../components/hospital/StatusBadge';
import BloodGroupBadge from '../../components/hospital/BloodGroupBadge';
import { mockAllRequests } from '../../data/adminMockData';

function fmt(d) { return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }); }

export default function AdminRequests() {
    const [tab, setTab] = useState('All');
    const [search, setSearch] = useState('');
    const fulfilled = mockAllRequests.filter(r => r.status === 'Fulfilled').length;
    const pending = mockAllRequests.filter(r => r.status === 'Pending').length;
    const rate = ((fulfilled / mockAllRequests.length) * 100).toFixed(1);

    const filtered = mockAllRequests.filter(r => {
        if (tab !== 'All' && r.status !== tab) return false;
        if (search && !r.patient_name.toLowerCase().includes(search.toLowerCase()) && !r.request_id.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
    });

    return (
        <AdminLayout title="Blood Requests" page="REQUESTS">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
                    {[{ l: 'TOTAL', v: '8,420' }, { l: 'PENDING', v: String(pending), c: 'var(--red)' }, { l: 'FULFILLED', v: String(fulfilled), c: '#22c55e' }, { l: 'RATE', v: `${rate}%` }].map(({ l, v, c }, i) => (
                        <motion.div key={l} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                            style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 24 }}>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>{l}</div>
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, color: c || '#fff', lineHeight: 1 }}>{v}</div>
                        </motion.div>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    {['All', 'Pending', 'Fulfilled'].map(t => (
                        <button key={t} onClick={() => setTab(t)} style={{ background: tab === t ? 'var(--red)' : 'rgba(255,255,255,0.05)', border: `1px solid ${tab === t ? 'var(--red)' : 'rgba(255,255,255,0.1)'}`, borderRadius: 100, padding: '5px 14px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 11, color: tab === t ? '#fff' : 'var(--text2)' }}>{t}</button>
                    ))}
                    <div style={{ flex: 1, position: 'relative' }}>
                        <Search size={14} color="var(--text3)" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." style={{ width: '100%', background: '#0F0F17', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '9px 12px 9px 38px', fontFamily: 'var(--font-body)', fontSize: 13, color: '#fff', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text2)' }}><Download size={14} /> Export</button>
                </div>

                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 1fr 100px 70px 50px 90px 90px', gap: 10, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                        {['ID', 'HOSPITAL', 'BLOOD BANK', 'PATIENT', 'BLOOD', 'QTY', 'PRIORITY', 'STATUS'].map(h => <div key={h} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', letterSpacing: '0.08em' }}>{h}</div>)}
                    </div>
                    {filtered.map((r, i) => (
                        <div key={r.request_id} style={{ display: 'grid', gridTemplateColumns: '100px 1fr 1fr 100px 70px 50px 90px 90px', gap: 10, alignItems: 'center', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.03)', borderLeft: r.priority === 'Emergency' && r.status === 'Pending' ? '3px solid #D90025' : '3px solid transparent', paddingLeft: r.priority === 'Emergency' && r.status === 'Pending' ? 10 : 0, background: r.priority === 'Emergency' && r.status === 'Pending' ? 'rgba(217,0,37,0.04)' : 'transparent' }}>
                            <div><div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#fff' }}>{r.request_id.replace('REQ-2025-', '')}</div><div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)' }}>{fmt(r.request_date)}</div></div>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#fff' }}>{r.hospital_name}</div>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text3)' }}>{r.bank_name}</div>
                            <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 600, fontSize: 13, color: '#fff' }}>{r.patient_name}</div>
                            <BloodGroupBadge group={r.blood_group} small />
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: '#fff' }}>{r.units_required}</div>
                            <PriorityBadge priority={r.priority} />
                            <StatusBadge status={r.status} />
                        </div>
                    ))}
                </motion.div>
            </div>
        </AdminLayout>
    );
}
