import { motion } from 'framer-motion';
import AdminLayout from '../../components/admin/AdminLayout';
import BloodGroupBadge from '../../components/hospital/BloodGroupBadge';
import { mockAllIssues } from '../../data/adminMockData';

function fmt(d) { return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }); }

export default function AdminIssues() {
    return (
        <AdminLayout title="Blood Issues" page="ISSUES">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
                    {[{ l: 'TOTAL ISSUES', v: '8,102' }, { l: 'UNITS ISSUED', v: '18,420', c: '#22c55e' }, { l: 'THIS MONTH', v: '62' }, { l: 'AVG ISSUE TIME', v: '6.4m', c: '#22c55e' }].map(({ l, v, c }, i) => (
                        <motion.div key={l} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                            style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 24 }}>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>{l}</div>
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, color: c || '#fff', lineHeight: 1 }}>{v}</div>
                        </motion.div>
                    ))}
                </div>

                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '90px 90px 1fr 1fr 70px 50px 90px', gap: 10, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                        {['ISSUE ID', 'REQUEST', 'HOSPITAL', 'BLOOD BANK', 'BLOOD', 'UNITS', 'DATE'].map(h => <div key={h} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', letterSpacing: '0.08em' }}>{h}</div>)}
                    </div>
                    {mockAllIssues.map(iss => (
                        <div key={iss.issue_id} style={{ display: 'grid', gridTemplateColumns: '90px 90px 1fr 1fr 70px 50px 90px', gap: 10, alignItems: 'center', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#fff' }}>{iss.issue_id}</div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--red)' }}>{iss.request_id.replace('REQ-2025-', '')}</div>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#fff' }}>{iss.hospital_name}</div>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text3)' }}>{iss.bank_name}</div>
                            <BloodGroupBadge group={iss.blood_group} small />
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: '#fff' }}>{iss.units_issued}</div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text3)' }}>{fmt(iss.issue_date)}</div>
                        </div>
                    ))}

                    {/* Traceability visual */}
                    <div style={{ marginTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24 }}>
                        <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 16, color: '#fff', marginBottom: 16 }}>Issue Traceability — {mockAllIssues[0].issue_id}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                            {['Donor', 'Donation', 'Stock', 'Request', 'Issue', 'Payment'].map((step, i) => (
                                <div key={step} style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: i <= 4 ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.06)', border: `2px solid ${i <= 4 ? 'rgba(34,197,94,0.4)' : 'rgba(255,255,255,0.1)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 10, color: i <= 4 ? '#22c55e' : 'var(--text3)' }}>{i + 1}</div>
                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: i <= 4 ? '#22c55e' : 'var(--text3)' }}>{step}</span>
                                    </div>
                                    {i < 5 && <div style={{ width: 36, height: 2, background: i < 4 ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.08)', marginBottom: 16 }} />}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </AdminLayout>
    );
}
