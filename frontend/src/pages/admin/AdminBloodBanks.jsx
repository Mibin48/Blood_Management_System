import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import StatusBadge from '../../components/hospital/StatusBadge';
import { mockAllBloodBanks } from '../../data/adminMockData';

export default function AdminBloodBanks() {
    const [search, setSearch] = useState('');
    const [expanded, setExpanded] = useState(null);

    const filtered = mockAllBloodBanks.filter(b => !search || b.bank_name.toLowerCase().includes(search.toLowerCase()) || b.city.toLowerCase().includes(search.toLowerCase()));
    const active = mockAllBloodBanks.filter(b => b.status === 'Active').length;
    const pending = mockAllBloodBanks.filter(b => b.status === 'Pending').length;
    const totalU = mockAllBloodBanks.reduce((s, b) => s + b.total_units, 0);

    return (
        <AdminLayout title="Blood Banks" page="BLOOD BANKS">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
                    {[{ l: 'TOTAL BANKS', v: '87' }, { l: 'ACTIVE', v: String(active), c: '#22c55e' }, { l: 'PENDING', v: String(pending), c: '#f59e0b' }, { l: 'TOTAL UNITS', v: totalU.toLocaleString(), c: 'var(--red)' }].map(({ l, v, c }, i) => (
                        <motion.div key={l} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                            style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 24 }}>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>{l}</div>
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, color: c || '#fff', lineHeight: 1 }}>{v}</div>
                        </motion.div>
                    ))}
                </div>

                <div style={{ position: 'relative' }}>
                    <Search size={14} color="var(--text3)" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search bank name, city..." style={{ width: '100%', background: '#0F0F17', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '9px 12px 9px 38px', fontFamily: 'var(--font-body)', fontSize: 13, color: '#fff', outline: 'none', boxSizing: 'border-box' }} />
                </div>

                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr 120px 140px 80px 90px 70px 80px 28px', gap: 10, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                        {['ID', 'NAME', 'CITY', 'NACO', 'CAPACITY', 'UNITS', 'DONAT.', 'STATUS', ''].map(h => <div key={h} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', letterSpacing: '0.08em' }}>{h}</div>)}
                    </div>
                    {filtered.map(b => {
                        const pct = Math.round((b.total_units / b.storage_capacity) * 100);
                        return (
                            <div key={b.bank_id}>
                                <div onClick={() => setExpanded(expanded === b.bank_id ? null : b.bank_id)}
                                    style={{ display: 'grid', gridTemplateColumns: '70px 1fr 120px 140px 80px 90px 70px 80px 28px', gap: 10, alignItems: 'center', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.03)', cursor: 'pointer', transition: 'background 0.15s' }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#fff' }}>{b.bank_id}</div>
                                    <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 600, fontSize: 14, color: '#fff' }}>{b.bank_name}</div>
                                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text3)' }}>{b.city}</div>
                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)' }}>{b.naco_number}</div>
                                    <div>
                                        <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text3)', marginBottom: 3 }}>{b.total_units}/{b.storage_capacity}</div>
                                        <div style={{ height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                                            <div style={{ height: '100%', width: `${pct}%`, background: pct > 60 ? '#22c55e' : pct > 30 ? '#f59e0b' : 'var(--red)', borderRadius: 2 }} />
                                        </div>
                                    </div>
                                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: '#fff' }}>{b.total_units}</div>
                                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: '#fff' }}>{b.total_donations}</div>
                                    <StatusBadge status={b.status} />
                                    {expanded === b.bank_id ? <ChevronUp size={13} color="var(--text3)" /> : <ChevronDown size={13} color="var(--text3)" />}
                                </div>
                                {expanded === b.bank_id && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} style={{ overflow: 'hidden' }}>
                                        <div style={{ background: 'rgba(217,0,37,0.03)', borderLeft: '3px solid rgba(217,0,37,0.4)', padding: '16px 20px', marginBottom: 4, display: 'flex', gap: 24, alignItems: 'center' }}>
                                            <div><div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)' }}>CONTACT</div><div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#fff' }}>{b.contact_number}</div></div>
                                            <div><div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)' }}>NACO</div><div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#fff' }}>{b.naco_number}</div></div>
                                            <div><div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)' }}>CAPACITY</div><div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#fff' }}>{pct}% ({b.total_units}/{b.storage_capacity})</div></div>
                                            <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                                                <button style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text2)' }}>View</button>
                                                <button style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text2)' }}>Edit</button>
                                                {b.status === 'Pending' && <button style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 12, color: '#22c55e' }}>Approve</button>}
                                                <button style={{ background: 'rgba(217,0,37,0.1)', border: '1px solid rgba(217,0,37,0.3)', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--red)' }}>Suspend</button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </AdminLayout>
    );
}
