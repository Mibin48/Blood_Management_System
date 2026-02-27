import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Droplets, Building2, Download } from 'lucide-react';
import DonorLayout from '../../components/donor/DonorLayout';
import { EligibilityBadge } from '../../components/donor/DonorSidebar';
import { mockDonor, mockDonations } from '../../data/mockData';

function fmt(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

const YEARS = ['All', '2024', '2023', '2022'];

const areaData = mockDonations.map(d => ({
    date: fmt(d.donation_date),
    ml: d.quantity_ml,
})).reverse();

function ChartTooltip({ active, payload }) {
    if (!active || !payload?.length) return null;
    return (
        <div style={{ background: '#161622', border: '1px solid rgba(217,0,37,0.3)', borderRadius: 8, padding: '10px 14px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#fff' }}>{payload[0].value} ml</div>
        </div>
    );
}

export default function DonorDonations() {
    const [activeYear, setActiveYear] = useState('All');
    const totalMl = mockDonations.reduce((s, d) => s + d.quantity_ml, 0);
    const banks = new Set(mockDonations.map(d => d.bank_id)).size;

    const filtered = activeYear === 'All'
        ? mockDonations
        : mockDonations.filter(d => d.donation_date.startsWith(activeYear));

    return (
        <DonorLayout title="My Donations" page="DONATIONS">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
                    {[
                        { icon: Droplets, label: 'TOTAL DONATIONS', val: mockDonor.total_donations },
                        { icon: Droplets, label: 'TOTAL VOLUME', val: `${totalMl} ml` },
                        { icon: Building2, label: 'BANKS VISITED', val: banks },
                    ].map(({ icon: Icon, label, val }, i) => (
                        <motion.div key={label}
                            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }}
                            style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '24px 28px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(217,0,37,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Icon size={18} color="var(--red)" />
                                </div>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{label}</span>
                            </div>
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, color: '#fff', lineHeight: 1 }}>{val}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Donation Table */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
                    style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 20, color: '#fff' }}>All Donations</div>
                        <button style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text2)' }}>
                            <Download size={13} /> Export PDF
                        </button>
                    </div>

                    {/* Year filter */}
                    <div style={{ display: 'flex', gap: 4, marginBottom: 20, borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 16 }}>
                        {YEARS.map(yr => (
                            <button key={yr} onClick={() => setActiveYear(yr)} style={{
                                background: 'none', border: 'none', cursor: 'pointer',
                                fontFamily: 'var(--font-sub)', fontWeight: 600, fontSize: 14,
                                color: activeYear === yr ? 'var(--red)' : 'var(--text3)',
                                borderBottom: activeYear === yr ? '2px solid var(--red)' : '2px solid transparent',
                                padding: '4px 12px',
                            }}>{yr}</button>
                        ))}
                    </div>

                    {/* Table header */}
                    <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr 2fr 80px 80px 100px 100px', gap: 12, padding: '0 0 10px', marginBottom: 4 }}>
                        {['#', 'DATE', 'BLOOD BANK', 'GROUP', 'QTY', 'CHECK', 'STATUS'].map(h => (
                            <div key={h} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h}</div>
                        ))}
                    </div>

                    {filtered.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '48px 0' }}>
                            <Droplets size={48} color="var(--text3)" style={{ margin: '0 auto 16px', display: 'block' }} />
                            <div style={{ fontFamily: 'var(--font-body)', color: 'var(--text3)', marginBottom: 12 }}>No donations for this period.</div>
                        </div>
                    ) : filtered.map((d, i) => (
                        <div key={d.donation_id} style={{
                            display: 'grid', gridTemplateColumns: '40px 1fr 2fr 80px 80px 100px 100px',
                            gap: 12, alignItems: 'center', padding: '16px 0',
                            borderBottom: i < filtered.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                            transition: 'background 0.15s',
                        }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text3)' }}>0{i + 1}</span>
                            <div>
                                <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 600, fontSize: 14, color: '#fff' }}>
                                    {fmt(d.donation_date)}
                                </div>
                            </div>
                            <div>
                                <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#fff' }}>{d.bank_name.split(',')[0]}</div>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)' }}>{d.bank_name.split(',')[1]?.trim() || 'Kerala'}</div>
                            </div>
                            <span style={{ display: 'inline-block', background: 'rgba(217,0,37,0.1)', border: '1px solid rgba(217,0,37,0.3)', borderRadius: 100, padding: '3px 8px', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--red)' }}>{mockDonor.blood_group}</span>
                            <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 600, fontSize: 13, color: '#fff' }}>{d.quantity_ml} ml</div>
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--red)', textAlign: 'left', padding: 0 }}>
                                {d.check_id}
                            </button>
                            <span style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 100, padding: '3px 10px', fontFamily: 'var(--font-mono)', fontSize: 9, color: '#22c55e', display: 'inline-block' }}>Completed</span>
                        </div>
                    ))}
                </motion.div>

                {/* Area Chart */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}
                    style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28 }}>
                    <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: 20 }}>Donation Volume Trend</div>
                    <ResponsiveContainer width="100%" height={160}>
                        <AreaChart data={areaData}>
                            <defs>
                                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#D90025" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#D90025" stopOpacity={0.01} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" />
                            <XAxis dataKey="date" tick={{ fontFamily: 'var(--font-mono)', fontSize: 10, fill: 'var(--text3)' }} axisLine={false} tickLine={false} />
                            <Tooltip content={<ChartTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.06)' }} />
                            <Area type="monotone" dataKey="ml" stroke="#D90025" strokeWidth={2} fill="url(#areaGrad)"
                                isAnimationActive animationDuration={800} animationEasing="ease-out" />
                        </AreaChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>
        </DonorLayout>
    );
}
