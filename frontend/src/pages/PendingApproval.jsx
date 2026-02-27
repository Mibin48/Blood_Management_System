import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, LogIn, Clock } from 'lucide-react';
import AuthLayout from '../auth/AuthLayout';
import AuthButton from '../auth/AuthButton';

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay },
});

const TIMELINE = [
    {
        icon: '✓', label: 'Application Submitted', desc: 'Application received',
        time: 'Feb 24, 2025 · 09:42 AM', status: 'done', color: '#22c55e',
    },
    {
        icon: '⟳', label: 'Under Review', desc: 'Verifying Kerala Health Dept. credentials',
        time: 'In progress · Est. 24 hours', status: 'active', color: '#f59e0b',
    },
    {
        icon: '○', label: 'Account Activated', desc: 'Access granted to HEM∆ dashboard',
        time: 'Pending', status: 'upcoming', color: 'var(--text3)',
    },
];

export default function PendingApproval() {
    return (
        <AuthLayout
            tagline={['ALMOST', 'THERE,', 'HANG ON.']}
            subtitle="Your application is being reviewed by our team"
            backTo="/login"
            backLabel="Back to Login"
        >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: 20 }}>
                {/* Animated clock icon */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        width: 120, height: 120, borderRadius: '50%',
                        background: 'rgba(217,0,37,0.08)', border: '1px solid rgba(217,0,37,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        marginBottom: 28,
                        boxShadow: '0 0 50px rgba(217,0,37,0.1)',
                    }}
                >
                    <Clock
                        size={56}
                        color="var(--red)"
                        style={{ animation: 'spin 8s linear infinite' }}
                    />
                </motion.div>

                <motion.h2 {...fadeUp(0.1)} style={{ fontFamily: 'var(--font-sub)', fontWeight: 800, fontSize: 28, marginBottom: 12 }}>
                    Application Under Review
                </motion.h2>
                <motion.p {...fadeUp(0.15)} style={{
                    fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 16,
                    color: 'var(--text2)', lineHeight: 1.7, maxWidth: 380, marginBottom: 36,
                }}>
                    Our Kerala Health Department verification team is reviewing your credentials.
                </motion.p>

                {/* Timeline card */}
                <motion.div
                    {...fadeUp(0.2)}
                    style={{
                        width: '100%', maxWidth: 480, background: 'var(--card)',
                        border: '1px solid var(--border)', borderRadius: 16, padding: '28px 28px',
                        marginBottom: 24, textAlign: 'left',
                    }}
                >
                    {TIMELINE.map(({ icon, label, desc, time, status, color }, i) => (
                        <div key={label} style={{ display: 'flex', gap: 16, position: 'relative' }}>
                            {/* Connecting line */}
                            {i < TIMELINE.length - 1 && (
                                <div style={{
                                    position: 'absolute', left: 11, top: 28, bottom: -16,
                                    width: 1, borderLeft: '1px dashed rgba(255,255,255,0.1)',
                                }} />
                            )}
                            {/* Node */}
                            <div style={{
                                width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                                background: status === 'done' ? '#22c55e' : status === 'active' ? '#f59e0b' : 'transparent',
                                border: `2px solid ${color}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 10, fontWeight: 700, color: status !== 'upcoming' ? '#fff' : color,
                                animation: status === 'active' ? 'pulse 2s infinite' : 'none',
                                marginTop: 2,
                            }}>
                                {status === 'done' ? (
                                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                ) : status === 'active' ? (
                                    <span style={{ width: 8, height: 8, borderRadius: '50%', border: '2px solid #fff', borderTopColor: 'transparent', display: 'block', animation: 'spin 0.8s linear infinite' }} />
                                ) : null}
                            </div>
                            {/* Content */}
                            <div style={{ paddingBottom: i < TIMELINE.length - 1 ? 24 : 0 }}>
                                <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 15, color: status !== 'upcoming' ? '#fff' : 'var(--text3)', marginBottom: 4 }}>{label}</div>
                                <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text2)', marginBottom: 4 }}>{desc}</div>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: status === 'active' ? '#f59e0b' : 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{time}</div>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Reference number */}
                <motion.div
                    {...fadeUp(0.25)}
                    style={{
                        width: '100%', maxWidth: 480, background: 'var(--card)',
                        border: '1px solid var(--border)', borderRadius: 12, padding: '18px 24px',
                        marginBottom: 28, textAlign: 'left',
                    }}
                >
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>APPLICATION REFERENCE</div>
                    <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 18, color: 'var(--red)', marginBottom: 4 }}>HEM-2025-KL-00847</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)' }}>Save this for support queries</div>
                </motion.div>

                {/* Buttons */}
                <motion.div {...fadeUp(0.3)} style={{ width: '100%', maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <AuthButton variant="ghost" fullWidth icon={Mail}>Contact Support</AuthButton>
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                        <AuthButton variant="ghost" fullWidth icon={LogIn}>← Back to Login</AuthButton>
                    </Link>
                </motion.div>

                <motion.div {...fadeUp(0.35)} style={{ marginTop: 28 }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)' }}>Expected activation within 24 business hours</p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', marginTop: 4 }}>support@hema.health · +91 471 XXX XXXX</p>
                </motion.div>
            </div>

            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
        </AuthLayout>
    );
}
