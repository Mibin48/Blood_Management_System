import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';
import { CheckCircle, AlertCircle } from 'lucide-react';
import DonorLayout from '../../components/donor/DonorLayout';
import { EligibilityBadge } from '../../components/donor/DonorSidebar';
import { mockHealthChecks } from '../../data/mockData';

function fmt(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
}

const trendData = [...mockHealthChecks].reverse().map(h => ({
    date: new Date(h.check_date).toLocaleDateString('en-IN', { month: 'short', year: '2-digit' }),
    hemoglobin: h.hemoglobin,
}));

function ChartTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;
    return (
        <div style={{ background: '#161622', border: '1px solid rgba(217,0,37,0.3)', borderRadius: 8, padding: '10px 14px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', marginBottom: 2 }}>{label}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#fff' }}>{payload[0].value} g/dL</div>
        </div>
    );
}

export default function DonorHealthCheck() {
    const latest = mockHealthChecks[0];

    const metrics = [
        { label: 'WEIGHT', value: latest.weight, unit: 'kg', ok: latest.weight >= 50 },
        { label: 'HEMOGLOBIN', value: latest.hemoglobin, unit: 'g/dL', ok: latest.hemoglobin >= 12 && latest.hemoglobin <= 17 },
        { label: 'BLOOD PRESSURE', value: latest.blood_pressure, unit: 'mmHg', ok: true },
        { label: 'ELIGIBILITY', value: latest.eligibility_status, unit: '', ok: latest.eligibility_status === 'Eligible' },
    ];

    return (
        <DonorLayout title="Health Checks" page="HEALTH-CHECK">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                {/* Latest Check Highlight */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
                    style={{
                        background: 'linear-gradient(135deg,#0F0F17 0%,#1A0A0F 100%)',
                        border: '1px solid rgba(217,0,37,0.2)', borderRadius: 20, padding: 36,
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
                        <div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>LATEST HEALTH CHECK</div>
                            <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 24, color: '#fff', marginBottom: 10 }}>
                                {fmt(latest.check_date)}
                            </div>
                            <EligibilityBadge status={latest.eligibility_status} />
                        </div>
                        <span style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '6px 14px', fontFamily: 'var(--font-mono)', fontSize: 11, color: '#fff' }}>
                            #{latest.check_id}
                        </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
                        {metrics.map(({ label, value, unit, ok }) => (
                            <div key={label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 20 }}>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>{label}</div>
                                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                                    <div>
                                        <span style={{ fontFamily: 'var(--font-display)', fontSize: 48, color: '#fff', lineHeight: 1 }}>{value}</span>
                                        {unit && <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text3)', marginLeft: 6 }}>{unit}</span>}
                                    </div>
                                    {ok ? <CheckCircle size={18} color="#22c55e" /> : <AlertCircle size={18} color="#f59e0b" />}
                                </div>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: ok ? '#22c55e' : '#f59e0b', marginTop: 6 }}>
                                    {ok ? '✓ Normal' : '⚠ Check required'}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* History Table */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.15 }}
                    style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28 }}
                >
                    <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 20, color: '#fff', marginBottom: 20 }}>Check History</div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 110px 120px 1fr 1fr', gap: 12, marginBottom: 10 }}>
                        {['CHECK DATE', 'WEIGHT', 'HEMOGLOBIN', 'BLOOD PRESS', 'ELIGIBILITY', 'DONATION'].map(h => (
                            <div key={h} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h}</div>
                        ))}
                    </div>

                    {mockHealthChecks.map((hc, i) => (
                        <div key={hc.check_id} style={{
                            display: 'grid', gridTemplateColumns: '1fr 80px 110px 120px 1fr 1fr',
                            gap: 12, alignItems: 'center', padding: '16px 0',
                            borderBottom: i < mockHealthChecks.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                            transition: 'background 0.15s',
                        }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                            <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 600, fontSize: 14, color: '#fff' }}>{fmt(hc.check_date)}</div>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#fff' }}>
                                {hc.weight} kg
                                {hc.weight >= 50 ? <CheckCircle size={12} color="#22c55e" style={{ marginLeft: 5 }} /> : <AlertCircle size={12} color="#f59e0b" style={{ marginLeft: 5 }} />}
                            </div>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#fff', display: 'flex', alignItems: 'center', gap: 5 }}>
                                {hc.hemoglobin} g/dL
                                {hc.hemoglobin >= 12 ? <CheckCircle size={12} color="#22c55e" /> : <AlertCircle size={12} color="#f59e0b" />}
                            </div>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#fff' }}>{hc.blood_pressure} mmHg</div>
                            <EligibilityBadge status={hc.eligibility_status} small />
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text3)' }}>—</span>
                        </div>
                    ))}
                </motion.div>

                {/* Hemoglobin Trend Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.25 }}
                    style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28 }}
                >
                    <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: 20 }}>Hemoglobin Trend</div>
                    <ResponsiveContainer width="100%" height={180}>
                        <LineChart data={trendData}>
                            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" />
                            <XAxis dataKey="date" tick={{ fontFamily: 'var(--font-mono)', fontSize: 10, fill: 'var(--text3)' }} axisLine={false} tickLine={false} />
                            <YAxis domain={[10, 18]} tick={{ fontFamily: 'var(--font-mono)', fontSize: 10, fill: 'var(--text3)' }} axisLine={false} tickLine={false} />
                            <Tooltip content={({ active, payload, label }) => {
                                if (!active || !payload?.length) return null;
                                return (
                                    <div style={{ background: '#161622', border: '1px solid rgba(217,0,37,0.3)', borderRadius: 8, padding: '10px 14px' }}>
                                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', marginBottom: 2 }}>{label}</div>
                                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#fff' }}>{payload[0].value} g/dL</div>
                                    </div>
                                );
                            }} cursor={{ stroke: 'rgba(255,255,255,0.06)' }} />
                            <ReferenceLine y={12} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: 'Min 12', fill: '#f59e0b', fontFamily: 'var(--font-mono)', fontSize: 9 }} />
                            <ReferenceLine y={17} stroke="#ef4444" strokeDasharray="4 4" label={{ value: 'Max 17', fill: '#ef4444', fontFamily: 'var(--font-mono)', fontSize: 9 }} />
                            <Line type="monotone" dataKey="hemoglobin" stroke="#D90025" strokeWidth={2}
                                dot={{ fill: '#D90025', r: 4 }}
                                isAnimationActive animationDuration={800} animationEasing="ease-out" />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>
        </DonorLayout>
    );
}
