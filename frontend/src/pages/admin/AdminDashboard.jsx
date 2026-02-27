import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import {
    Users, Building2, Package, TrendingUp, Heart, Activity,
    CreditCard, MapPin, AlertTriangle, ChevronRight, Check, X, Clock,
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import PriorityBadge from '../../components/hospital/PriorityBadge';
import StatusBadge from '../../components/hospital/StatusBadge';
import BloodGroupBadge from '../../components/hospital/BloodGroupBadge';
import {
    mockSystemStats, mockSystemTrendData, mockDistrictData,
    mockPendingApprovals, mockAllRequests, mockAllPayments, mockAuditLogs,
} from '../../data/adminMockData';

const s = mockSystemStats;
const fulfillRate = ((s.fulfilled_requests / s.total_requests) * 100).toFixed(1);

function ChartTip({ active, payload, label }) {
    if (!active || !payload?.length) return null;
    return (
        <div style={{ background: '#161622', border: '1px solid rgba(217,0,37,0.3)', borderRadius: 8, padding: '10px 14px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', marginBottom: 6 }}>{label}</div>
            {payload.map(p => <div key={p.dataKey} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: p.color, marginBottom: 2 }}>{p.name}: {p.value}</div>)}
        </div>
    );
}

function fmt(d) { return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }); }

/* ── District Map SVG ────────────────────────────────────────── */
const DISTRICT_POSITIONS = {
    'Kasaragod': { x: 22, y: 4 }, 'Kannur': { x: 25, y: 12 },
    'Wayanad': { x: 42, y: 18 }, 'Kozhikode': { x: 22, y: 22 },
    'Malappuram': { x: 30, y: 30 }, 'Palakkad': { x: 40, y: 38 },
    'Thrissur': { x: 25, y: 46 }, 'Ernakulam': { x: 22, y: 55 },
    'Idukki': { x: 40, y: 60 }, 'Kottayam': { x: 28, y: 64 },
    'Alappuzha': { x: 18, y: 70 }, 'Pathanamthitta': { x: 32, y: 74 },
    'Kollam': { x: 24, y: 80 }, 'Thiruvananthapuram': { x: 25, y: 90 },
};

function DistrictMap() {
    return (
        <div style={{ position: 'relative', width: '100%', height: 320, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#0A0A12', borderRadius: 12, overflow: 'hidden' }}>
            <img src="/kerala-map.png" alt="Kerala Map" style={{ height: '90%', width: 'auto', objectFit: 'contain', opacity: 0.8, filter: 'brightness(0.8) contrast(1.2) sepia(0.5) hue-rotate(-30deg)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 30%, #0A0A12 100%)', pointerEvents: 'none' }} />
        </div>
    );
}

/* severity + action helpers */
const sevStyle = sev => sev === 'Critical' ? { bg: 'rgba(217,0,37,0.1)', color: 'var(--red)', border: '2px solid rgba(217,0,37,0.4)' } : sev === 'Warning' ? { bg: 'transparent', color: '#f59e0b', border: '2px solid rgba(245,158,11,0.4)' } : { bg: 'transparent', color: 'var(--text3)', border: '2px solid transparent' };
const actionBadge = a => {
    const m = { APPROVED: { bg: 'rgba(34,197,94,0.1)', c: '#22c55e', b: 'rgba(34,197,94,0.3)' }, ADDED: { bg: 'rgba(59,130,246,0.1)', c: '#3b82f6', b: 'rgba(59,130,246,0.3)' }, ALERT: { bg: 'rgba(245,158,11,0.1)', c: '#f59e0b', b: 'rgba(245,158,11,0.3)' }, FAILED_LOGIN: { bg: 'rgba(217,0,37,0.1)', c: 'var(--red)', b: 'rgba(217,0,37,0.3)' } };
    const s = m[a] || { bg: 'rgba(255,255,255,0.05)', c: 'var(--text3)', b: 'rgba(255,255,255,0.1)' };
    return <span style={{ background: s.bg, border: `1px solid ${s.b}`, borderRadius: 100, padding: '2px 8px', fontFamily: 'var(--font-mono)', fontSize: 9, color: s.c }}>{a}</span>;
};

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [hoveredDistrict, setHoveredDistrict] = useState(null);
    const [approvals, setApprovals] = useState(mockPendingApprovals);
    const [toast, setToast] = useState(null);

    const criticalDistricts = mockDistrictData.filter(d => d.status === 'Critical').length;
    const healthyCount = mockDistrictData.filter(d => d.status === 'Healthy').length;
    const lowCount = mockDistrictData.filter(d => d.status === 'Low').length;

    const showToast = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };
    const handleApprove = id => { setApprovals(a => a.filter(x => x.id !== id)); showToast('Application approved successfully'); };
    const handleReject = id => { setApprovals(a => a.filter(x => x.id !== id)); showToast('Application rejected', 'error'); };

    const pendingCount = approvals.filter(a => a.status === 'Pending').length;

    /* KPI data */
    const kpis = [
        { icon: Users, label: 'TOTAL DONORS', val: s.total_donors.toLocaleString(), sub: 'Across 14 districts', trend: '+240 this month', trendColor: '#22c55e', color: '#3b82f6' },
        { icon: Building2, label: 'HOSPITALS', val: String(s.total_hospitals), sub: `${s.total_blood_banks} blood banks`, trend: '5 pending approval', trendColor: '#f59e0b', color: '#22c55e' },
        { icon: Package, label: 'UNITS IN SYSTEM', val: s.total_units.toLocaleString(), sub: 'Across all banks', trend: `${criticalDistricts} critical districts`, trendColor: 'var(--red)', color: '#D90025' },
        { icon: TrendingUp, label: 'FULFILLMENT RATE', val: `${fulfillRate}%`, sub: `${s.fulfilled_requests.toLocaleString()} / ${s.total_requests.toLocaleString()} requests`, trend: '+1.2% vs last month', trendColor: '#22c55e', color: '#fff' },
    ];
    const kpis2 = [
        { icon: Heart, label: 'TOTAL DONATIONS', val: s.total_donations.toLocaleString(), sub: '44,280 litres total', color: '#D90025' },
        { icon: Activity, label: 'ACTIVE USERS', val: s.active_users.toLocaleString(), sub: 'Online today: 84', color: '#3b82f6' },
        { icon: CreditCard, label: 'TOTAL REVENUE', val: '₹84.2L', sub: 'This financial year', color: '#22c55e' },
        { icon: MapPin, label: 'KERALA DISTRICTS', val: '14/14', sub: 'Full state coverage', trend: `${criticalDistricts} critical`, trendColor: 'var(--red)', color: '#fff' },
    ];

    const iconBg = c => c === '#D90025' ? 'rgba(217,0,37,0.1)' : c === '#3b82f6' ? 'rgba(59,130,246,0.1)' : c === '#22c55e' ? 'rgba(34,197,94,0.1)' : c === '#f59e0b' ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.08)';

    return (
        <AdminLayout title="Dashboard" page="DASHBOARD">
            {/* Toast */}
            <AnimatePresence>
                {toast && (
                    <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 100, opacity: 0 }}
                        style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 999, background: '#161622', border: `1px solid ${toast.type === 'success' ? 'rgba(34,197,94,0.3)' : 'rgba(217,0,37,0.3)'}`, borderRadius: 12, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
                        {toast.type === 'success' ? <Check size={16} color="#22c55e" /> : <X size={16} color="var(--red)" />}
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#fff' }}>{toast.msg}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                {/* Alert Banner */}
                {(pendingCount > 0 || criticalDistricts > 0) && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                        style={{ background: 'rgba(217,0,37,0.08)', border: '1px solid rgba(217,0,37,0.3)', borderRadius: 16, padding: '20px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <AlertTriangle size={20} color="var(--red)" style={{ animation: 'bounce 1s infinite' }} />
                            <div>
                                <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 16, color: 'var(--red)' }}>{pendingCount} Pending Approvals · {criticalDistricts} Critical Districts</div>
                                <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text3)', marginTop: 2 }}>Immediate review required</div>
                            </div>
                        </div>
                        <button onClick={() => navigate('/admin/approvals')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--red)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>Review Now <ChevronRight size={16} /></button>
                    </motion.div>
                )}

                {/* KPI Row 1 */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
                    {kpis.map(({ icon: Icon, label, val, sub, trend, trendColor, color }, i) => (
                        <motion.div key={label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }}
                            whileHover={{ y: -4, borderColor: 'rgba(217,0,37,0.3)' }}
                            style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 24, transition: 'all 0.2s' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                                <div style={{ width: 36, height: 36, borderRadius: '50%', background: iconBg(color), display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon size={16} color={color} /></div>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</div>
                            </div>
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, color: '#fff', lineHeight: 1, marginBottom: 6 }}>{val}</div>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text3)' }}>{sub}</div>
                            {trend && <div style={{ marginTop: 10, fontFamily: 'var(--font-mono)', fontSize: 10, color: trendColor }}>{trend}</div>}
                        </motion.div>
                    ))}
                </div>

                {/* KPI Row 2 */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
                    {kpis2.map(({ icon: Icon, label, val, sub, trend, trendColor, color }, i) => (
                        <motion.div key={label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.32 + i * 0.08 }}
                            whileHover={{ y: -4, borderColor: 'rgba(217,0,37,0.3)' }}
                            style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 24, transition: 'all 0.2s' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                                <div style={{ width: 36, height: 36, borderRadius: '50%', background: iconBg(color), display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon size={16} color={color} /></div>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</div>
                            </div>
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, color: '#fff', lineHeight: 1, marginBottom: 6 }}>{val}</div>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text3)' }}>{sub}</div>
                            {trend && <div style={{ marginTop: 10, fontFamily: 'var(--font-mono)', fontSize: 10, color: trendColor }}>{trend}</div>}
                        </motion.div>
                    ))}
                </div>

                {/* Chart + Map */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
                    {/* System Activity Chart */}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                        style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28 }}>
                        <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: 4 }}>System Activity — Last 6 Months</div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text3)', marginBottom: 20 }}>Donations, requests, and stock units</div>
                        <ResponsiveContainer width="100%" height={240}>
                            <ComposedChart data={mockSystemTrendData}>
                                <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" />
                                <XAxis dataKey="month" tick={{ fontFamily: 'var(--font-mono)', fontSize: 10, fill: 'var(--text3)' }} axisLine={false} tickLine={false} />
                                <YAxis yAxisId="left" tick={{ fontFamily: 'var(--font-mono)', fontSize: 10, fill: 'var(--text3)' }} axisLine={false} tickLine={false} />
                                <YAxis yAxisId="right" orientation="right" tick={{ fontFamily: 'var(--font-mono)', fontSize: 10, fill: 'var(--text3)' }} axisLine={false} tickLine={false} />
                                <Tooltip content={<ChartTip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                                <Legend iconType="square" wrapperStyle={{ fontFamily: 'var(--font-mono)', fontSize: 10, paddingTop: 16 }} />
                                <Bar yAxisId="left" dataKey="units" name="Units" fill="rgba(217,0,37,0.2)" radius={[4, 4, 0, 0]} />
                                <Bar yAxisId="left" dataKey="donations" name="Donations" fill="rgba(34,197,94,0.4)" radius={[4, 4, 0, 0]} />
                                <Line yAxisId="right" type="monotone" dataKey="requests" name="Requests" stroke="#3b82f6" strokeWidth={2} dot={false} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </motion.div>

                    {/* Kerala District Map */}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
                        style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, overflow: 'hidden' }}>
                        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 16, color: '#fff' }}>Kerala Network</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', animation: 'pulse 2s infinite' }} />
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#22c55e' }}>14/14 districts</span>
                            </div>
                        </div>
                        <div style={{ padding: 16, background: '#0A0A12' }}>
                            <DistrictMap />
                            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 8 }}>
                                {[['Healthy', '#22c55e', healthyCount], ['Low', '#f59e0b', lowCount], ['Critical', '#D90025', criticalDistricts]].map(([l, c, n]) => (
                                    <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                        <span style={{ width: 7, height: 7, borderRadius: '50%', background: c }} />
                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)' }}>{n} {l}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Pending Approvals */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                    style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 18, color: '#fff' }}>Pending Approvals</div>
                            <span style={{ background: 'rgba(217,0,37,0.15)', border: '1px solid rgba(217,0,37,0.3)', borderRadius: 100, padding: '2px 10px', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--red)' }}>{pendingCount} PENDING</span>
                        </div>
                        <button onClick={() => navigate('/admin/approvals')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--red)' }}>View All →</button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
                        <AnimatePresence>
                            {approvals.map(a => (
                                <motion.div key={a.id} layout exit={{ scale: 0.9, opacity: 0 }}
                                    style={{ background: '#0A0A12', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 24, borderLeft: a.status === 'Pending' ? '3px solid #D90025' : '3px solid #f59e0b' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                                        <div>
                                            <span style={{ background: a.type === 'Hospital' ? 'rgba(59,130,246,0.1)' : 'rgba(217,0,37,0.1)', border: `1px solid ${a.type === 'Hospital' ? 'rgba(59,130,246,0.3)' : 'rgba(217,0,37,0.3)'}`, borderRadius: 100, padding: '2px 8px', fontFamily: 'var(--font-mono)', fontSize: 9, color: a.type === 'Hospital' ? '#3b82f6' : 'var(--red)' }}>{a.type}</span>
                                            <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 16, color: '#fff', marginTop: 8 }}>{a.org_name}</div>
                                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)' }}>{a.city}, Kerala</div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)' }}>{fmt(a.submitted)}</div>
                                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#fff' }}>{a.ref}</div>
                                        </div>
                                    </div>
                                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text3)', marginBottom: 8 }}>{a.contact}</div>
                                    <StatusBadge status={a.status} />
                                    <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                                        <button onClick={() => handleApprove(a.id)} style={{ flex: 1, background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 8, padding: '8px 0', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: '#22c55e' }}>Approve ✓</button>
                                        <button onClick={() => handleReject(a.id)} style={{ flex: 1, background: 'rgba(217,0,37,0.1)', border: '1px solid rgba(217,0,37,0.3)', borderRadius: 8, padding: '8px 0', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: 'var(--red)' }}>Reject ✗</button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Requests + Payments */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    {/* Recent Requests */}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
                        style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 18, color: '#fff' }}>Recent Requests</div>
                            <button onClick={() => navigate('/admin/requests')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--red)' }}>View All →</button>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr 70px 40px 80px 90px', gap: 8, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                            {['ID', 'HOSPITAL', 'BLOOD', 'QTY', 'PRIORITY', 'STATUS'].map(h => <div key={h} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', letterSpacing: '0.08em' }}>{h}</div>)}
                        </div>
                        {mockAllRequests.map(r => (
                            <div key={r.request_id} style={{ display: 'grid', gridTemplateColumns: '90px 1fr 70px 40px 80px 90px', gap: 8, alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#fff' }}>{r.request_id.replace('REQ-2025-', '')}</div>
                                <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.hospital_name}</div>
                                <BloodGroupBadge group={r.blood_group} small />
                                <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: '#fff' }}>{r.units_required}</div>
                                <PriorityBadge priority={r.priority} />
                                <StatusBadge status={r.status} />
                            </div>
                        ))}
                    </motion.div>

                    {/* Recent Payments */}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                        style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 18, color: '#fff' }}>Recent Payments</div>
                            <button onClick={() => navigate('/admin/payments')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--red)' }}>View All →</button>
                        </div>
                        <div style={{ background: 'rgba(217,0,37,0.06)', border: '1px solid rgba(217,0,37,0.2)', borderRadius: 12, padding: 16, marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', marginBottom: 4 }}>TOTAL THIS MONTH</div>
                                <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: '#fff', lineHeight: 1 }}>₹5,000</div>
                            </div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', textAlign: 'right' }}>2 paid<br />2 pending</div>
                        </div>
                        {mockAllPayments.map((p, i) => (
                            <div key={p.payment_id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < mockAllPayments.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                                <div>
                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#fff' }}>{p.payment_id}</div>
                                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text3)' }}>{p.hospital_name} → {p.bank_name.split(' ')[0]}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 15, color: '#fff' }}>₹{p.amount.toLocaleString()}</div>
                                    <StatusBadge status={p.payment_status} />
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Audit Logs */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}
                    style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 18, color: '#fff' }}>Latest Audit Activity</div>
                        <button onClick={() => navigate('/admin/audit')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--red)' }}>View All →</button>
                    </div>
                    {mockAuditLogs.map(log => {
                        const sv = sevStyle(log.severity);
                        return (
                            <div key={log.log_id} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 100px 140px 1fr 110px', gap: 12, alignItems: 'center', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', borderLeft: sv.border, paddingLeft: sv.border !== '2px solid transparent' ? 12 : 0, background: log.severity === 'Critical' ? 'rgba(217,0,37,0.04)' : 'transparent' }}
                                onMouseEnter={e => e.currentTarget.style.background = log.severity === 'Critical' ? 'rgba(217,0,37,0.06)' : 'rgba(255,255,255,0.02)'}
                                onMouseLeave={e => e.currentTarget.style.background = log.severity === 'Critical' ? 'rgba(217,0,37,0.04)' : 'transparent'}>
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
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </AdminLayout>
    );
}
