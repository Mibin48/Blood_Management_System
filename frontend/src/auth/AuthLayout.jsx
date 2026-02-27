import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Droplets, ArrowLeft } from 'lucide-react';

const stats = [
    { value: '4.2M+', label: 'Units Tracked' },
    { value: '340+', label: 'Hospitals' },
    { value: '14', label: 'Districts' },
];

export default function AuthLayout({
    children,
    tagline = ['HEM∆', 'BLOOD', 'NETWORK'],
    subtitle = 'Kerala blood management platform',
    backTo = '/',
    backLabel = 'Back to home',
}) {
    return (
        <div style={{
            display: 'flex', minHeight: '100vh',
            fontFamily: 'var(--font-body)',
            background: 'var(--bg)',
        }}>
            {/* ── LEFT PANEL ── */}
            <div style={{
                width: '45%', minWidth: 380,
                background: '#0A0A12',
                borderRight: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', flexDirection: 'column',
                padding: '48px 52px',
                position: 'relative', overflow: 'hidden',
                flexShrink: 0,
            }} className="auth-left-panel">

                {/* Grid bg */}
                <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }} />

                {/* Red glow */}
                <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    background: 'radial-gradient(ellipse 80% 60% at 20% 60%, rgba(217,0,37,0.13) 0%, transparent 70%)',
                    animation: 'glowPulse 4s ease infinite',
                }} />

                {/* Noise */}
                <div className="noise-overlay" style={{ opacity: 0.02 }} />

                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative', zIndex: 1 }}>
                    <div style={{
                        width: 38, height: 38, background: 'var(--red)', borderRadius: 10,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                        <Droplets size={19} color="#fff" />
                    </div>
                    <span style={{ fontFamily: 'var(--font-head)', fontSize: 28, letterSpacing: '0.06em' }}>HEM∆</span>
                    <div style={{
                        width: 7, height: 7, borderRadius: '50%', background: 'var(--red)',
                        marginLeft: 4, animation: 'pulse 2s infinite', flexShrink: 0,
                    }} />
                </div>

                {/* Tagline */}
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                    <div>
                        <div style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(52px,5.5vw,80px)', lineHeight: 0.95, letterSpacing: '0.02em', marginBottom: 28 }}>
                            <div style={{ color: '#fff' }}>{tagline[0]}</div>
                            <div style={{ color: 'transparent', WebkitTextStroke: '2px #fff' }}>{tagline[1]}</div>
                            <div style={{ color: 'var(--red)' }}>{tagline[2]}</div>
                        </div>
                        <p style={{
                            fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 15,
                            color: 'var(--text2)', lineHeight: 1.7, maxWidth: 300,
                        }}>{subtitle}</p>
                    </div>
                </div>

                {/* Stats */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, position: 'relative', zIndex: 1 }}>
                    {stats.map(({ value, label }) => (
                        <div key={label} style={{
                            display: 'flex', alignItems: 'center', gap: 16,
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.06)',
                            borderLeft: '3px solid var(--red)',
                            borderRadius: 12, padding: '14px 20px',
                        }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--red)', flexShrink: 0 }} />
                            <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 20, color: 'var(--red)', minWidth: 60 }}>{value}</div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── RIGHT PANEL ── */}
            <div style={{
                flex: 1, background: '#07070B',
                display: 'flex', flexDirection: 'column',
                overflowY: 'auto',
                position: 'relative',
            }}>
                {/* Back nav */}
                <div style={{ padding: '28px 52px 0', flexShrink: 0 }}>
                    <Link to={backTo} style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text2)',
                        textDecoration: 'none', transition: 'color 0.2s',
                    }}
                        onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text2)'}
                    >
                        <ArrowLeft size={15} />
                        {backLabel}
                    </Link>
                </div>

                {/* Form area */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 52px' }}>
                    {children}
                </div>

                {/* Footer */}
                <div style={{ padding: '0 52px 32px', flexShrink: 0, textAlign: 'center' }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', letterSpacing: '0.1em' }}>
                        ◈ 256-BIT ENCRYPTED · HIPAA COMPLIANT · NACO REGISTERED
                    </p>
                </div>
            </div>

            <style>{`
                @keyframes glowPulse {
                    0%, 100% { opacity: 0.7; }
                    50% { opacity: 1; }
                }
                @media (max-width: 1024px) {
                    .auth-left-panel { display: none !important; }
                }
            `}</style>
        </div>
    );
}
