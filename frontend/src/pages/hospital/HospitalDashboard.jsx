import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import {
    Users, Droplets, CreditCard, TrendingUp, AlertTriangle,
    Building2, ChevronRight,
} from 'lucide-react';
import HospitalLayout from '../../components/hospital/HospitalLayout';
import PriorityBadge from '../../components/hospital/PriorityBadge';
import StatusBadge from '../../components/hospital/StatusBadge';
import BloodGroupBadge from '../../components/hospital/BloodGroupBadge';
import BloodAvailabilityBar from '../../components/hospital/BloodAvailabilityBar';
import {
    mockHospital, mockPatients, mockBloodRequests,
    mockPayments, mockHospitalBanks,
    mockRequestChartData, mockBloodGroupDemand,
} from '../../data/hospitalMockData';

/* ─── KPI StatCard ─────────────────────────────────────────── */
function StatCard({ icon: Icon, label, value, sub, valueColor, children, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay }}
            whileHover={{ y: -4, borderColor: 'rgba(217,0,37,0.3)' }}
            style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 24, transition: 'all 0.2s' }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(217,0,37,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={20} color="var(--red)" />
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{label}</span>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 52, color: valueColor || '#fff', lineHeight: 1, marginBottom: 6 }}>{value}</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text3)' }}>{sub}</div>
            {children}
        </motion.div>
    );
}

/* ─── Chart tooltip ────────────────────────────────────────── */
function ChartTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;
    return (
        <div style={{ background: '#161622', border: '1px solid rgba(217,0,37,0.3)', borderRadius: 8, padding: '10px 14px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text3)', marginBottom: 6 }}>{label}</div>
            {payload.map(p => (
                <div key={p.name} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: p.color, marginBottom: 2 }}>
                    {p.name}: {p.value}{p.name === 'rate' ? '%' : ''}
                </div>
            ))}
        </div>
    );
}

/* ─── Patient avatar color by blood group ─────────────────── */
function avatarColor(bg) {
    if (bg.startsWith('A')) return 'rgba(99,102,241,0.3)';
    if (bg.startsWith('B')) return 'rgba(34,197,94,0.25)';
    if (bg.startsWith('O')) return 'rgba(217,0,37,0.25)';
    return 'rgba(168,85,247,0.25)';
}
function patientStatusStyle(s) {
    if (s === 'Critical') return { bg: 'rgba(217,0,37,0.1)', border: 'rgba(217,0,37,0.3)', color: 'var(--red)', pulse: true };
    if (s === 'Stable') return { bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.25)', color: '#22c55e' };
    return { bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.1)', color: 'var(--text3)' };
}

function fmt(d) { return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }); }

/* ─── Emergency patients ──────────────────────────────────── */
const emergencyRequests = mockBloodRequests.filter(r => r.priority === 'Emergency' && r.status === 'Pending');
const pendingPayments = mockPayments.filter(p => p.payment_status === 'Pending');
const pendingPayAmt = pendingPayments.reduce((s, p) => s + p.amount, 0);
const fulfilledReqs = mockBloodRequests.filter(r => r.status === 'Fulfilled').length;
const fulfillmentRate = Math.round((fulfilledReqs / mockBloodRequests.length) * 100);

/* ─── Dashboard ─────────────────────────────────────────────── */
export default function HospitalDashboard() {
    const navigate = useNavigate();

    const chartData = mockRequestChartData.map(d => ({
        ...d, rate: Math.round((d.fulfilled / d.requests) * 100),
    }));

    const maxDemand = Math.max(...mockBloodGroupDemand.map(d => d.units));

    return (
        <HospitalLayout title="Dashboard">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                {/* ── Emergency Alert Banner ── */}
                {emergencyRequests.length > 0 && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                        style={{
                            background: 'rgba(217,0,37,0.08)', border: '1px solid rgba(217,0,37,0.3)',
                            borderRadius: 16, padding: '20px 28px',
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            animation: 'borderPulse 2s ease-in-out infinite',
                        }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <AlertTriangle size={20} color="var(--red)" style={{ animation: 'bounce 1s infinite' }} />
                            <div>
                                <span style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 16, color: 'var(--red)' }}>
                                    {emergencyRequests.length} Emergency Blood {emergencyRequests.length === 1 ? 'Request' : 'Requests'} Active
                                </span>
                                <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text3)', marginTop: 2 }}>Immediate action required</div>
                            </div>
                        </div>
                        <button onClick={() => navigate('/hospital/requests')}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sub)', fontWeight: 600, fontSize: 14, color: 'var(--red)', display: 'flex', alignItems: 'center', gap: 6 }}>
                            View Requests <ChevronRight size={16} />
                        </button>
                    </motion.div>
                )}

                {/* ── KPI Cards ── */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
                    <StatCard icon={Users} label="Active Patients" value={mockPatients.length} sub="3 wards" delay={0.05}>
                        <div style={{ marginTop: 10, fontFamily: 'var(--font-mono)', fontSize: 10, color: '#22c55e' }}>↑ +2 this week</div>
                    </StatCard>
                    <StatCard icon={Droplets} label="Requests This Month" value={mockBloodRequests.length} sub={`${fulfilledReqs} fulfilled · ${emergencyRequests.length + 1} pending`} delay={0.1}>
                        <div style={{ marginTop: 10, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${(fulfilledReqs / mockBloodRequests.length) * 100}%`, background: '#22c55e', borderRadius: 2 }} />
                        </div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', marginTop: 4 }}>{fulfillmentRate}% fulfilled</div>
                    </StatCard>
                    <StatCard icon={CreditCard} label="Pending Payments" value={`₹${pendingPayAmt.toLocaleString()}`} valueColor="var(--red)" sub={`${pendingPayments.length} invoices pending`} delay={0.15}>
                        <div style={{ marginTop: 10, display: 'inline-block', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 100, padding: '2px 10px', fontFamily: 'var(--font-mono)', fontSize: 9, color: '#f59e0b' }}>Due Today</div>
                    </StatCard>
                    <StatCard icon={TrendingUp} label="Fulfillment Rate" value={`${fulfillmentRate}%`} sub="Last 30 days" delay={0.2}>
                        <div style={{ marginTop: 10, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${fulfillmentRate}%`, background: '#22c55e', borderRadius: 2 }} />
                        </div>
                    </StatCard>
                </div>

                {/* ── Charts Row ── */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
                    {/* Composed Chart */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.25 }}
                        style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                            <div>
                                <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: 4 }}>Blood Request Trends</div>
                                <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text3)' }}>Requests vs fulfillments per month</div>
                            </div>
                            <div style={{ display: 'flex', gap: 4 }}>
                                {['6M', '3M', '1M'].map((p, i) => (
                                    <button key={p} style={{
                                        background: 'none', border: 'none', cursor: 'pointer',
                                        fontFamily: 'var(--font-mono)', fontSize: 11, padding: '4px 10px',
                                        color: i === 0 ? 'var(--red)' : 'var(--text3)',
                                        borderBottom: i === 0 ? '2px solid var(--red)' : '2px solid transparent',
                                    }}>{p}</button>
                                ))}
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height={220}>
                            <ComposedChart data={chartData} barGap={4}>
                                <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" />
                                <XAxis dataKey="month" tick={{ fontFamily: 'var(--font-mono)', fontSize: 10, fill: 'var(--text3)' }} axisLine={false} tickLine={false} />
                                <YAxis yAxisId="left" tick={{ fontFamily: 'var(--font-mono)', fontSize: 10, fill: 'var(--text3)' }} axisLine={false} tickLine={false} />
                                <YAxis yAxisId="right" orientation="right" domain={[0, 100]} tick={{ fontFamily: 'var(--font-mono)', fontSize: 10, fill: 'var(--text3)' }} axisLine={false} tickLine={false} unit="%" />
                                <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                                <Legend iconType="square" wrapperStyle={{ fontFamily: 'var(--font-mono)', fontSize: 10, paddingTop: 16 }} />
                                <Bar yAxisId="left" dataKey="requests" name="Total Requests" fill="rgba(217,0,37,0.3)" radius={[4, 4, 0, 0]} isAnimationActive animationDuration={700} />
                                <Bar yAxisId="left" dataKey="fulfilled" name="Fulfilled" fill="#D90025" radius={[4, 4, 0, 0]} isAnimationActive animationDuration={700} />
                                <Line yAxisId="right" type="monotone" dataKey="rate" name="rate" stroke="#22c55e" strokeWidth={2} dot={false} isAnimationActive animationDuration={800} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </motion.div>

                    {/* Blood Group Demand */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.3 }}
                        style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28 }}>
                        <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: 4 }}>Blood Group Demand</div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text3)', marginBottom: 20 }}>Units requested by type</div>
                        {mockBloodGroupDemand.map(({ group, units }) => (
                            <div key={group} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                                <BloodGroupBadge group={group} small />
                                <div style={{ flex: 1 }}>
                                    <BloodAvailabilityBar units={units} maxUnits={maxDemand} showLabel={false} />
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* ── Active Requests Table ── */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.35 }}
                    style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 18, color: '#fff' }}>Active Blood Requests</div>
                        <div style={{ display: 'flex', gap: 10 }}>
                            <button onClick={() => navigate('/hospital/requests')} style={{ background: 'var(--red)', border: 'none', cursor: 'pointer', borderRadius: 8, padding: '7px 14px', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: '#fff' }}>＋ New Request</button>
                            <button onClick={() => navigate('/hospital/requests')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--red)' }}>View All →</button>
                        </div>
                    </div>

                    {/* Table header */}
                    <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 90px 60px 1fr 100px 110px 90px', gap: 12, padding: '0 0 10px', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: 4 }}>
                        {['REQUEST ID', 'PATIENT', 'BLOOD GRP', 'UNITS', 'BANK', 'PRIORITY', 'STATUS', 'ACTION'].map(h => (
                            <div key={h} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</div>
                        ))}
                    </div>

                    {mockBloodRequests.slice(0, 4).map((req, i) => (
                        <div key={req.request_id}
                            style={{ display: 'grid', gridTemplateColumns: '100px 1fr 90px 60px 1fr 100px 110px 90px', gap: 12, alignItems: 'center', padding: '16px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.04)' : 'none', transition: 'background 0.15s', cursor: 'default' }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                            <div>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#fff' }}>{req.request_id}</div>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', marginTop: 2 }}>{fmt(req.request_date)}</div>
                            </div>
                            <div>
                                <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 600, fontSize: 14, color: '#fff' }}>{req.patient_name}</div>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)' }}>{req.ward}</div>
                            </div>
                            <BloodGroupBadge group={req.blood_group} small />
                            <div>
                                <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: '#fff', lineHeight: 1 }}>{req.units_required}</div>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)' }}>UNITS</div>
                            </div>
                            <div>
                                <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{req.bank_name}</div>
                            </div>
                            <PriorityBadge priority={req.priority} />
                            <StatusBadge status={req.status} />
                            <div>
                                {req.priority === 'Emergency' && req.status === 'Pending' ? (
                                    <button style={{ background: 'var(--red)', border: 'none', borderRadius: 6, padding: '5px 10px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 9, color: '#fff', animation: 'pulse 1.5s infinite' }}>URGENT</button>
                                ) : req.status === 'Pending' || req.status === 'Processing' ? (
                                    <button onClick={() => navigate('/hospital/requests')} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 6, padding: '5px 10px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text2)' }}>Track →</button>
                                ) : (
                                    <button onClick={() => navigate('/hospital/requests')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text3)' }}>View →</button>
                                )}
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* ── Patients + Payments ── */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    {/* Patients */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.4 }}
                        style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                            <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 18, color: '#fff' }}>Active Patients</div>
                            <button onClick={() => navigate('/hospital/patients')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--red)' }}>View All →</button>
                        </div>
                        {mockPatients.slice(0, 4).map(p => {
                            const sts = patientStatusStyle(p.status);
                            const ini = p.name.split(' ').map(n => n[0]).join('');
                            return (
                                <div key={p.patient_id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: avatarColor(p.blood_group), display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 13, color: '#fff', letterSpacing: 1 }}>{ini}</div>
                                        <div>
                                            <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 600, fontSize: 14, color: '#fff' }}>{p.name}</div>
                                            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text3)' }}>{p.age} yrs · {p.gender} · {p.ward}</div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5 }}>
                                        <BloodGroupBadge group={p.blood_group} small />
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: sts.bg, border: `1px solid ${sts.border}`, borderRadius: 100, padding: '2px 8px', fontFamily: 'var(--font-mono)', fontSize: 9, color: sts.color }}>
                                            {sts.pulse && <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--red)', animation: 'pulse 1.2s infinite' }} />}
                                            {p.status.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>

                    {/* Payments */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.45 }}
                        style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 18, color: '#fff' }}>Payment Summary</div>
                            <button onClick={() => navigate('/hospital/payments')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--red)' }}>View All →</button>
                        </div>
                        <div style={{ background: 'rgba(217,0,37,0.06)', border: '1px solid rgba(217,0,37,0.2)', borderRadius: 12, padding: 16, marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', marginBottom: 4 }}>TOTAL THIS MONTH</div>
                                <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: '#fff', lineHeight: 1 }}>₹8,500</div>
                            </div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', textAlign: 'right' }}>2 paid<br />2 pending</div>
                        </div>
                        {mockPayments.slice(0, 3).map((pay, i) => (
                            <div key={pay.payment_id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                                <div>
                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#fff' }}>{pay.payment_id}</div>
                                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text3)' }}>{pay.bank_name}</div>
                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)' }}>{fmt(pay.payment_date)}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 16, color: '#fff', marginBottom: 4 }}>₹{pay.amount.toLocaleString()}</div>
                                    <StatusBadge status={pay.payment_status} />
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* ── Connected Blood Banks ── */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.5 }}
                    style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                        <div>
                            <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: 4 }}>Connected Blood Banks</div>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text3)' }}>Real-time stock from partner banks</div>
                        </div>
                        <button onClick={() => navigate('/hospital/blood-banks')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--red)' }}>Find More →</button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
                        {mockHospitalBanks.map(bank => {
                            const TYPES = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
                            const maxStock = Math.max(...Object.values(bank.stock));
                            return (
                                <div key={bank.bank_id} style={{ background: '#0A0A12', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 20 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                                        <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 15, color: '#fff' }}>{bank.bank_name}</div>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                                            <span style={{ background: bank.open ? 'rgba(34,197,94,0.1)' : 'rgba(217,0,37,0.1)', border: `1px solid ${bank.open ? 'rgba(34,197,94,0.25)' : 'rgba(217,0,37,0.3)'}`, borderRadius: 100, padding: '1px 7px', fontFamily: 'var(--font-mono)', fontSize: 9, color: bank.open ? '#22c55e' : 'var(--red)' }}>{bank.open ? 'OPEN' : 'CLOSED'}</span>
                                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)' }}>{bank.distance_km} km</span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 14 }}>
                                        {TYPES.map(t => (
                                            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                <BloodGroupBadge group={t} small />
                                                <div style={{ flex: 1, height: 3, borderRadius: 1.5, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                                                    <div style={{ height: '100%', width: `${(bank.stock[t] / maxStock) * 100}%`, background: bank.stock[t] / maxStock > 0.6 ? '#22c55e' : bank.stock[t] / maxStock > 0.3 ? '#f59e0b' : '#D90025', borderRadius: 1.5 }} />
                                                </div>
                                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', minWidth: 28, textAlign: 'right' }}>{bank.stock[t]}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={() => navigate('/hospital/requests')} style={{ width: '100%', background: 'var(--red)', border: 'none', borderRadius: 8, padding: '9px 0', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: '#fff' }}>Request Blood</button>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </HospitalLayout>
    );
}
