import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import AuthLayout from '../auth/AuthLayout';
import AuthButton from '../auth/AuthButton';
import OTPInput from '../auth/OTPInput';

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay },
});

export default function VerifyOTP() {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [otpError, setOtpError] = useState(false);
    const [otpSuccess, setOtpSuccess] = useState(false);
    const [countdown, setCountdown] = useState(45);
    const [canResend, setCanResend] = useState(false);
    const [attempts, setAttempts] = useState(3);

    useEffect(() => {
        if (canResend) return;
        const timer = setInterval(() => {
            setCountdown(c => {
                if (c <= 1) { clearInterval(timer); setCanResend(true); return 0; }
                return c - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [canResend]);

    const handleVerify = () => {
        if (otp.length < 6) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            if (otp === '123456') {
                setOtpSuccess(true);
                setOtpError(false);
            } else {
                setOtpError(true);
                setAttempts(a => a - 1);
                setTimeout(() => setOtpError(false), 1000);
            }
        }, 1500);
    };

    const handleResend = () => {
        setCountdown(45);
        setCanResend(false);
        setOtp('');
    };

    return (
        <AuthLayout
            tagline={['VERIFY', 'YOUR', 'IDENTITY']}
            subtitle="OTP sent to your registered phone number"
            backTo="/login"
            backLabel="Back to Login"
        >
            <AnimatePresence mode="wait">
                {otpSuccess ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{ textAlign: 'center', padding: '40px 0' }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', delay: 0.1 }}
                            style={{
                                width: 80, height: 80, borderRadius: '50%',
                                background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                margin: '0 auto 24px',
                            }}
                        >
                            <CheckCircle size={40} color="#22c55e" />
                        </motion.div>
                        <h2 style={{ fontFamily: 'var(--font-sub)', fontWeight: 800, fontSize: 28, marginBottom: 12 }}>Identity Verified!</h2>
                        <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text2)', marginBottom: 8 }}>Redirecting to dashboard...</p>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#22c55e' }}>◈ SESSION AUTHENTICATED</p>
                    </motion.div>
                ) : (
                    <motion.div key="form">
                        <motion.div {...fadeUp(0)} style={{ marginBottom: 36 }}>
                            <h1 style={{ fontFamily: 'var(--font-sub)', fontWeight: 800, fontSize: 30, marginBottom: 8 }}>Enter Verification Code</h1>
                            <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, color: 'var(--text2)', fontSize: 15 }}>We sent a 6-digit code to</p>
                            <p style={{ fontFamily: 'var(--font-sub)', fontWeight: 600, fontSize: 16, color: '#fff', marginTop: 4 }}>+91 98765 XXXXX</p>
                            <button style={{
                                background: 'none', border: 'none', cursor: 'pointer',
                                fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--red)', padding: 0, marginTop: 4,
                            }}>Change number</button>
                        </motion.div>

                        {/* OTP Boxes */}
                        <motion.div {...fadeUp(0.1)} style={{ marginBottom: 24 }}>
                            <OTPInput
                                value={otp}
                                onChange={setOtp}
                                error={otpError}
                                success={otpSuccess}
                            />
                            {otpError && (
                                <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--red)', marginTop: 12 }}>
                                    Invalid OTP. {attempts} attempt{attempts !== 1 ? 's' : ''} remaining.
                                </p>
                            )}
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', marginTop: 8 }}>
                                Hint: try 123456
                            </p>
                        </motion.div>

                        {/* Resend */}
                        <motion.div {...fadeUp(0.15)} style={{ marginBottom: 28 }}>
                            {canResend ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)' }}>Didn't receive it?</span>
                                    <button onClick={handleResend} style={{
                                        background: 'none', border: 'none', cursor: 'pointer',
                                        fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 14, color: 'var(--red)', padding: 0,
                                    }}>Resend OTP</button>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)' }}>Didn't receive it?</span>
                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--red)' }}>
                                        Resend in 0:{countdown.toString().padStart(2, '0')}
                                    </span>
                                </div>
                            )}
                        </motion.div>

                        <motion.div {...fadeUp(0.2)} style={{ marginBottom: 24 }}>
                            <AuthButton
                                variant="primary" fullWidth loading={loading}
                                disabled={otp.length < 6}
                                onClick={handleVerify}
                            >
                                Verify & Continue →
                            </AuthButton>
                        </motion.div>

                        <motion.div {...fadeUp(0.25)} style={{ textAlign: 'center' }}>
                            <Link to="/login" style={{
                                fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text2)',
                                textDecoration: 'none',
                            }}>← Back to Login</Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </AuthLayout>
    );
}
