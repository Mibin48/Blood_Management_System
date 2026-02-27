import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AdminLayout from '../../components/admin/AdminLayout';
import BloodGroupBadge from '../../components/hospital/BloodGroupBadge';
import { mockAllDonations, mockSystemTrendData } from '../../data/adminMockData';

function fmt(d) { return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }); }
function initials(n) { return n.split(' ').slice(0, 2).map(w => w[0]).join(''); }
function ChartTip({ active, payload, label }) {
    if (!active || !payload?.length) return null;
    return (<div style={{ background: '#161622', border: '1px solid rgba(217,0,37,0.3)', borderRadius: 8, padding: '10px 14px' }}><div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', marginBottom: 4 }}>{label}</div>{payload.map(p => <div key={p.dataKey} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: p.color, marginBottom: 2 }}>{p.name}: {p.value}</div>)}</div>);
}

export default function AdminDonations() {
    const total = mockAllDonations.reduce((s, d) => s + d.quantity_ml, 0);
    return (
        <AdminLayout title="Donations" page="DONATIONS">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
                    {[{ l: 'TOTAL DONATIONS', v: '9,840' }, { l: 'TOTAL VOLUME', v: '44.28L', c: '#22c55e' }, { l: 'THIS MONTH', v: '140' }, { l: 'UNIQUE DONORS', v: '4,200', c: '#3b82f6' }].map(({ l, v, c }, i) => (
                        <motion.div key={l} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                            style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 24 }}>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>{l}</div>
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, color: c || '#fff', lineHeight: 1 }}>{v}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Chart */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28 }}>
                    <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: 20 }}>Monthly Donations</div>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={mockSystemTrendData} barSize={28}>
                            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" />
                            <XAxis dataKey="month" tick={{ fontFamily: 'var(--font-mono)', fontSize: 10, fill: 'var(--text3)' }} axisLine={false} tickLine={false} />
                            <Tooltip content={<ChartTip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                            <Bar dataKey="donations" name="Donations" fill="#D90025" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Table */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 70px 60px 1fr 90px 80px', gap: 10, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                        {['ID', 'DONOR', 'BLOOD', 'QTY', 'BLOOD BANK', 'DATE', 'CHECK'].map(h => <div key={h} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', letterSpacing: '0.08em' }}>{h}</div>)}
                    </div>
                    {mockAllDonations.map(d => (
                        <div key={d.donation_id} style={{ display: 'grid', gridTemplateColumns: '100px 1fr 70px 60px 1fr 90px 80px', gap: 10, alignItems: 'center', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#fff' }}>{d.donation_id.replace('DON-2024-', '')}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(217,0,37,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 12, color: 'var(--red)', flexShrink: 0 }}>{initials(d.donor_name)}</div>
                                <div><div style={{ fontFamily: 'var(--font-sub)', fontWeight: 600, fontSize: 13, color: '#fff' }}>{d.donor_name}</div><div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)' }}>{d.donor_id}</div></div>
                            </div>
                            <BloodGroupBadge group={d.blood_group} small />
                            <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 600, fontSize: 13, color: '#fff' }}>{d.quantity_ml}ml</div>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text3)' }}>{d.bank_name}</div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text3)' }}>{fmt(d.donation_date)}</div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#22c55e' }}>{d.check_id}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </AdminLayout>
    );
}
