import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    BarChart, Bar, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import {
    Droplets, HeartHandshake, Activity, Award,
    Calendar, CheckCircle, AlertCircle, Building2, MapPin, Users,
} from 'lucide-react';
import DonorLayout from '../../components/donor/DonorLayout';
import { EligibilityBadge } from '../../components/donor/DonorSidebar';
import {
    mockDonor, mockDonations, mockHealthChecks,
    mockDonationChartData, mockBloodBanks, mockCamps,
} from '../../data/mockData';

/* ─── Helpers ─────────────────────────────────────────────── */
function fmt(dateStr, { short } = {}) {
    const d = new Date(dateStr);
    return short
        ? d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })
        : d.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
}

/* ─── Stat Card ───────────────────────────────────────────── */
function StatCard({ icon: Icon, label, value, sub, children, delay = 0 }) {
    const [count, setCount] = useState(0);
    const numVal = parseFloat(String(value).replace(/[^0-9.]/g, ''));
    const suffix = String(value).replace(/[0-9.]/g, '');

    useEffect(() => {
        let start = 0;
        const step = numVal / 40;
        const timer = setInterval(() => {
            start += step;
            if (start >= numVal) { setCount(numVal); clearInterval(timer); }
            else setCount(start);
        }, 37);
        return () => clearInterval(timer);
    }, [numVal]);

    const display = Number.isInteger(numVal)
        ? Math.round(count) + suffix
        : count.toFixed(2) + suffix;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -4, borderColor: 'rgba(217,0,37,0.3)' }}
            style={{
                background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 16, padding: 24, transition: 'all 0.2s',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                <div style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: 'rgba(217,0,37,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    <Icon size={20} color="var(--red)" />
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                    {label}
                </span>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 52, color: '#fff', lineHeight: 1, marginBottom: 6 }}>
                {display}
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text3)' }}>{sub}</div>
            {children}
        </motion.div>
    );
}

/* ─── Custom bar tooltip ──────────────────────────────────── */
function ChartTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;
    return (
        <div style={{ background: '#161622', border: '1px solid rgba(217,0,37,0.3)', borderRadius: 8, padding: '10px 14px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text3)', marginBottom: 4 }}>{label}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#fff' }}>
                {payload[0].value} ml donated
            </div>
        </div>
    );
}

/* ─── Main Dashboard ─────────────────────────────────────── */
export default function DonorDashboard() {
    const navigate = useNavigate();
    const firstName = mockDonor.name.split(' ')[0];
    const latestCheck = mockHealthChecks[0];
    const recentDonations = mockDonations.slice(0, 3);
    const totalMl = mockDonations.reduce((s, d) => s + d.quantity_ml, 0);

    return (
        <DonorLayout title="Dashboard">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                {/* ── ROW 1 Welcome Banner ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        background: 'linear-gradient(135deg,#0F0F17 0%,#1A0A0F 100%)',
                        border: '1px solid rgba(217,0,37,0.2)',
                        borderRadius: 20, padding: '32px 40px',
                        position: 'relative', overflow: 'hidden',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    }}
                >
                    <div style={{
                        position: 'absolute', right: 32, top: '50%', transform: 'translateY(-50%)',
                        fontFamily: 'var(--font-display)', fontSize: 200, color: 'rgba(217,0,37,0.06)',
                        lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
                    }}>
                        {mockDonor.blood_group}
                    </div>
                    <div style={{ position: 'relative' }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--red)', letterSpacing: '0.1em', marginBottom: 8, textTransform: 'uppercase' }}>
                            ◈ WELCOME BACK
                        </div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, color: '#fff', lineHeight: 1, marginBottom: 12 }}>
                            Good Morning, {firstName}.
                        </div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: '#22c55e' }}>
                            🟢 You are eligible to donate today!
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12, position: 'relative' }}>
                        <button
                            onClick={() => navigate('/donor/schedule')}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 8,
                                background: 'var(--red)', color: '#fff', border: 'none', cursor: 'pointer',
                                padding: '13px 24px', borderRadius: 10, fontSize: 14, fontWeight: 600,
                                fontFamily: 'var(--font-body)',
                                boxShadow: '0 4px 20px rgba(217,0,37,0.4)', transition: 'all 0.2s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 28px rgba(217,0,37,0.55)'}
                            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(217,0,37,0.4)'}
                        >
                            <Calendar size={16} /> Schedule Now
                        </button>
                    </div>
                </motion.div>

                {/* ── ROW 2 KPI Cards ── */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
                    <StatCard icon={Droplets} label="Total Donations" value={`${mockDonor.total_donations}`} sub="Since March 2022" delay={0.05}>
                        <div style={{ marginTop: 10, fontFamily: 'var(--font-mono)', fontSize: 10, color: '#22c55e' }}>↑ +2 this year</div>
                    </StatCard>
                    <StatCard icon={HeartHandshake} label="Lives Impacted" value={`${mockDonor.lives_saved}`} sub="Each donation saves 3 lives" delay={0.1}>
                        <div style={{ marginTop: 10, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)' }}>Est. calculation</div>
                    </StatCard>
                    <StatCard icon={Activity} label="Blood Donated" value={`${(totalMl / 1000).toFixed(2)}L`} sub="Total millilitres" delay={0.15}>
                        <div style={{ marginTop: 10 }}>
                            <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: `${(totalMl / 5000) * 100}%`, background: 'var(--red)', borderRadius: 2 }} />
                            </div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', marginTop: 4 }}>
                                {totalMl} / 5,000 ml to next badge
                            </div>
                        </div>
                    </StatCard>
                    <StatCard icon={Award} label="Member Since" value="2022" sub="3 years active" delay={0.2}>
                        <div style={{ marginTop: 10, display: 'inline-block', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 100, padding: '2px 10px', fontFamily: 'var(--font-mono)', fontSize: 9, color: '#f59e0b', letterSpacing: '0.08em' }}>
                            SILVER DONOR
                        </div>
                    </StatCard>
                </div>

                {/* ── ROW 3 Chart + Next Eligible ── */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
                    {/* Chart */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}
                        style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                            <div>
                                <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: 4 }}>Donation History</div>
                                <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text3)' }}>Blood donated per month (ml)</div>
                            </div>
                            <div style={{ display: 'flex', gap: 8 }}>
                                {['2024', '2023'].map((yr, i) => (
                                    <button key={yr} style={{
                                        background: 'none', border: 'none', cursor: 'pointer',
                                        fontFamily: 'var(--font-mono)', fontSize: 12,
                                        color: i === 0 ? 'var(--red)' : 'var(--text3)', padding: '4px 10px',
                                        borderBottom: i === 0 ? '2px solid var(--red)' : '2px solid transparent',
                                    }}>{yr}</button>
                                ))}
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={mockDonationChartData} barSize={22}>
                                <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" />
                                <XAxis dataKey="month" tick={{ fontFamily: 'var(--font-mono)', fontSize: 10, fill: 'var(--text3)' }} axisLine={false} tickLine={false} />
                                <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                                <Bar dataKey="ml" radius={[4, 4, 0, 0]} isAnimationActive animationDuration={800} animationEasing="ease-out">
                                    {mockDonationChartData.map((entry, index) => (
                                        <Cell key={index} fill={entry.ml > 0 ? '#D90025' : 'rgba(217,0,37,0.12)'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                        <div style={{ display: 'flex', gap: 32, marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                            {[
                                { label: 'Donations', val: `${mockDonor.total_donations}` },
                                { label: 'Total Volume', val: `${totalMl}ml` },
                                { label: 'Avg / Session', val: `${Math.round(totalMl / mockDonor.total_donations)}ml` },
                            ].map(({ label, val }) => (
                                <div key={label}>
                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>{label}</div>
                                    <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 600, fontSize: 15, color: '#fff' }}>{val}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Next Eligible Card */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
                        style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>NEXT DONATION</div>
                        <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 18, color: '#fff', marginTop: 4, marginBottom: 24 }}>Eligibility Status</div>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                            <div style={{
                                width: 128, height: 128, borderRadius: '50%',
                                border: '4px solid #22c55e',
                                boxShadow: '0 0 30px rgba(34,197,94,0.3)',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, color: '#22c55e', lineHeight: 1 }}>NOW</div>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', marginTop: 4 }}>ELIGIBLE</div>
                            </div>
                        </div>
                        <div style={{ textAlign: 'center', marginBottom: 'auto' }}>
                            <EligibilityBadge status={mockDonor.status} />
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text3)', marginTop: 10 }}>
                                You can donate today. Book a slot.
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/donor/schedule')}
                            style={{
                                width: '100%', background: 'var(--red)', color: '#fff',
                                border: 'none', cursor: 'pointer', padding: '13px 0',
                                borderRadius: 10, fontFamily: 'var(--font-body)', fontSize: 14,
                                fontWeight: 600, marginTop: 24, transition: 'opacity 0.2s',
                            }}
                        >
                            Schedule Donation →
                        </button>
                    </motion.div>
                </div>

                {/* ── ROW 4 Recent Donations + Health Summary ── */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    {/* Recent Donations */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}
                        style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                            <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 18, color: '#fff' }}>Recent Donations</div>
                            <button onClick={() => navigate('/donor/donations')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--red)' }}>
                                View All →
                            </button>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr', gap: 8, marginBottom: 10 }}>
                            {['DATE', 'BLOOD BANK', 'QTY', 'STATUS'].map(h => (
                                <div key={h} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h}</div>
                            ))}
                        </div>
                        {recentDonations.map((d, i) => (
                            <div key={d.donation_id} style={{
                                display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr', gap: 8, alignItems: 'center',
                                padding: '14px 0', borderBottom: i < recentDonations.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                            }}>
                                <div>
                                    <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 600, fontSize: 13, color: '#fff' }}>{fmt(d.donation_date, { short: true })}</div>
                                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text3)' }}>{new Date(d.donation_date).getFullYear()}</div>
                                </div>
                                <div>
                                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.bank_name.split(',')[0]}</div>
                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)' }}>{d.bank_name.split(',')[1]?.trim() || 'Kerala'}</div>
                                </div>
                                <div>
                                    <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 600, fontSize: 13, color: '#fff' }}>{d.quantity_ml} ml</div>
                                    <div style={{ display: 'inline-block', background: 'rgba(217,0,37,0.1)', border: '1px solid rgba(217,0,37,0.3)', borderRadius: 100, padding: '1px 6px', fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--red)', marginTop: 3 }}>{mockDonor.blood_group}</div>
                                </div>
                                <div>
                                    <span style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 100, padding: '3px 10px', fontFamily: 'var(--font-mono)', fontSize: 9, color: '#22c55e' }}>Completed</span>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Health Summary */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
                        style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                            <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 18, color: '#fff' }}>Last Health Check</div>
                            <button onClick={() => navigate('/donor/health-check')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--red)' }}>
                                View History →
                            </button>
                        </div>
                        <div style={{ marginBottom: 20 }}>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>CHECK DATE</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 15, color: '#fff' }}>{fmt(latestCheck.check_date)}</div>
                                <EligibilityBadge status={latestCheck.eligibility_status} small />
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                            {[
                                { label: 'WEIGHT', value: latestCheck.weight, unit: 'kg', ok: true },
                                { label: 'HEMOGLOBIN', value: latestCheck.hemoglobin, unit: 'g/dL', ok: true },
                                { label: 'BLOOD PRESS', value: latestCheck.blood_pressure, unit: 'mmHg', ok: true },
                                { label: 'ELIGIBILITY', value: latestCheck.eligibility_status, unit: '', ok: latestCheck.eligibility_status === 'Eligible' },
                            ].map(({ label, value, unit, ok }) => (
                                <div key={label} style={{ background: '#0A0A12', borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</div>
                                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, justifyContent: 'space-between' }}>
                                        <div>
                                            <span style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: '#fff' }}>{value}</span>
                                            {unit && <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text3)', marginLeft: 4 }}>{unit}</span>}
                                        </div>
                                        {ok ? <CheckCircle size={14} color="#22c55e" /> : <AlertCircle size={14} color="#f59e0b" />}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => navigate('/donor/health-check')}
                            style={{
                                width: '100%', marginTop: 16, background: 'none',
                                border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text2)',
                                cursor: 'pointer', padding: '11px 0', borderRadius: 10,
                                fontFamily: 'var(--font-body)', fontSize: 14, transition: 'all 0.2s',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = '#fff'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'var(--text2)'; }}
                        >
                            Schedule Check-up
                        </button>
                    </motion.div>
                </div>

                {/* ── ROW 5 Blood Banks + Camps ── */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    {/* Nearby Blood Banks */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.45 }}
                        style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                            <div>
                                <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: 6 }}>Nearby Blood Banks</div>
                                <span style={{ background: 'none', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 100, padding: '2px 10px', fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)' }}>Ernakulam</span>
                            </div>
                            <button onClick={() => navigate('/donor/find-bank')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--red)' }}>View All →</button>
                        </div>
                        {mockBloodBanks.slice(0, 3).map((bank, i) => (
                            <div key={bank.bank_id} style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                padding: '14px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(217,0,37,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Building2 size={16} color="var(--red)" />
                                    </div>
                                    <div>
                                        <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 600, fontSize: 14, color: '#fff' }}>{bank.bank_name}</div>
                                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)' }}>{bank.city} · {bank.distance_km} km</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                                    <span style={{
                                        background: bank.open ? 'rgba(34,197,94,0.1)' : 'rgba(217,0,37,0.1)',
                                        border: `1px solid ${bank.open ? 'rgba(34,197,94,0.25)' : 'rgba(217,0,37,0.25)'}`,
                                        borderRadius: 100, padding: '2px 8px',
                                        fontFamily: 'var(--font-mono)', fontSize: 9,
                                        color: bank.open ? '#22c55e' : 'var(--red)',
                                    }}>{bank.open ? 'OPEN' : 'CLOSED'}</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                        <div style={{
                                            width: 7, height: 7, borderRadius: '50%',
                                            background: bank.stock_status === 'Adequate' ? '#22c55e' : bank.stock_status === 'Low' ? '#f59e0b' : 'var(--red)',
                                            animation: bank.stock_status === 'Critical' ? 'pulse 1.5s ease-in-out infinite' : 'none',
                                        }} />
                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)' }}>{bank.stock_status}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Upcoming Camps */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}
                        style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                            <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 18, color: '#fff' }}>Upcoming Camps</div>
                            <button onClick={() => navigate('/donor/schedule')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--red)' }}>Register →</button>
                        </div>
                        {mockCamps.map((camp, i) => {
                            const pct = Math.round((camp.booked / camp.slots) * 100);
                            return (
                                <div key={camp.camp_id} style={{ padding: '14px 0', borderBottom: i < mockCamps.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                                        <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 600, fontSize: 14, color: '#fff', flex: 1, marginRight: 12 }}>{camp.name}</div>
                                        <span style={{ background: 'rgba(217,0,37,0.1)', border: '1px solid rgba(217,0,37,0.3)', borderRadius: 100, padding: '2px 8px', fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--red)', whiteSpace: 'nowrap' }}>
                                            {fmt(camp.date, { short: true })}
                                        </span>
                                    </div>
                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                                        <MapPin size={10} /> {camp.location}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <div style={{ flex: 1, height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                                            <div style={{ height: '100%', width: `${pct}%`, background: pct > 80 ? 'var(--red)' : pct > 50 ? '#f59e0b' : '#22c55e', borderRadius: 2 }} />
                                        </div>
                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', whiteSpace: 'nowrap' }}>
                                            {camp.slots - camp.booked} slots left
                                        </span>
                                        <button style={{ background: 'none', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 6, padding: '3px 10px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text2)' }}>Register</button>
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </DonorLayout>
    );
}
