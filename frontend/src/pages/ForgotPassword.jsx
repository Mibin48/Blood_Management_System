import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, RefreshCw } from 'lucide-react';
import AuthLayout from '../auth/AuthLayout';
import AuthInput from '../auth/AuthInput';
import AuthButton from '../auth/AuthButton';
import { useEffect } from 'react';

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay },
});

function MailAnimation() {
    return (
        <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', delay: 0.1 }}
            style={{
                width: 90, height: 90, borderRadius: '50%',
                background: 'rgba(217,0,37,0.1)', border: '1px solid rgba(217,0,37,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 28px',
            }}
        >
            <Mail size={40} color="var(--red)" />
        </motion.div>
    );
}

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        if (!sent) return;
        const timer = setInterval(() => {
            setCountdown(c => {
                if (c <= 1) { setCanResend(true); clearInterval(timer); return 0; }
                return c - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [sent]);

    const handleSend = () => {
        if (!email) return;
        setLoading(true);
        setTimeout(() => { setLoading(false); setSent(true); }, 1500);
    };

    const handleResend = () => {
        setCanResend(false);
        setCountdown(60);
        // restart timer
        setSent(false);
        setTimeout(() => setSent(true), 50);
    };

    return (
        <AuthLayout
            tagline={['RESET', 'YOUR', 'ACCESS']}
            subtitle="We'll send a secure reset link to your registered email"
            backTo="/login"
            backLabel="Back to Login"
        >
            <AnimatePresence mode="wait">
                {!sent ? (
                    <motion.div
                        key="input-form"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.35 }}
                    >
                        <motion.div {...fadeUp(0)} style={{ marginBottom: 36 }}>
                            <h1 style={{ fontFamily: 'var(--font-sub)', fontWeight: 800, fontSize: 32, marginBottom: 8 }}>Forgot Password</h1>
                            <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, color: 'var(--text2)', fontSize: 15 }}>Enter your registered email address</p>
                        </motion.div>

                        <motion.div {...fadeUp(0.1)}>
                            <AuthInput
                                label="REGISTERED EMAIL" type="email"
                                placeholder="you@hospital.kerala.gov.in"
                                value={email} onChange={e => setEmail(e.target.value)}
                                icon={Mail} required
                            />
                        </motion.div>

                        <motion.div {...fadeUp(0.15)} style={{ marginBottom: 20 }}>
                            <AuthButton variant="primary" fullWidth loading={loading} onClick={handleSend}>
                                Send Reset Link →
                            </AuthButton>
                        </motion.div>

                        <motion.div {...fadeUp(0.2)} style={{ textAlign: 'center' }}>
                            <Link to="/login" style={{
                                fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text2)',
                                textDecoration: 'none', transition: 'color 0.2s',
                            }}
                                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                                onMouseLeave={e => e.currentTarget.style.color = 'var(--text2)'}
                            >← Back to Login</Link>
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="sent-state"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.35 }}
                        style={{ textAlign: 'center' }}
                    >
                        <MailAnimation />

                        <motion.div {...fadeUp(0.15)}>
                            <h2 style={{ fontFamily: 'var(--font-sub)', fontWeight: 800, fontSize: 28, marginBottom: 16 }}>Check Your Email</h2>
                            <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, color: 'var(--text2)', fontSize: 15, lineHeight: 1.7, maxWidth: 360, margin: '0 auto 8px' }}>
                                A password reset link has been sent to
                            </p>
                            <p style={{ fontFamily: 'var(--font-sub)', fontWeight: 600, fontSize: 16, color: '#fff', marginBottom: 8 }}>{email}</p>
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text3)', marginBottom: 36 }}>Link expires in 30 minutes</p>

                            {canResend ? (
                                <AuthButton variant="ghost" fullWidth icon={RefreshCw} onClick={handleResend}>
                                    Resend Email
                                </AuthButton>
                            ) : (
                                <div style={{
                                    padding: '14px 24px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                                }}>
                                    <RefreshCw size={15} color="var(--text3)" />
                                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text3)' }}>Resend in </span>
                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--red)' }}>
                                        0:{countdown.toString().padStart(2, '0')}
                                    </span>
                                </div>
                            )}

                            <div style={{ marginTop: 24 }}>
                                <Link to="/login" style={{
                                    fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text2)', textDecoration: 'none',
                                }}>← Back to Login</Link>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </AuthLayout>
    );
}
