import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/* ─── FadeUp wrapper ───────────────────────────────────────── */
export function FadeUp({ children, delay = 0, className = '', style = {} }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-50px' });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
            style={style}
        >
            {children}
        </motion.div>
    );
}

/* ─── Animated counter ─────────────────────────────────────── */
export function Counter({ to, suffix = '', decimals = 0 }) {
    const [val, setVal] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    useEffect(() => {
        if (!inView) return;
        const dur = 2200;
        const start = performance.now();
        const tick = now => {
            const p = Math.min((now - start) / dur, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setVal(parseFloat((to * ease).toFixed(decimals)));
            if (p < 1) requestAnimationFrame(tick);
            else setVal(to);
        };
        requestAnimationFrame(tick);
    }, [inView, to, decimals]);
    return <span ref={ref}>{val.toFixed(decimals)}{suffix}</span>;
}

/* ─── Mono label tag ───────────────────────────────────────── */
export function MonoLabel({ children, style = {} }) {
    return (
        <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: 'var(--red)',
            marginBottom: 16, ...style,
        }}>
            {children}
        </div>
    );
}

/* ─── Section hero headline (Bebas Neue) ───────────────────── */
export function HeroHeadline({ lines = [], size = 'clamp(64px,9vw,108px)' }) {
    // lines: array of { text, variant: 'solid'|'outline'|'red' }
    return (
        <h1 style={{
            fontFamily: 'var(--font-head)', fontSize: size,
            lineHeight: 0.92, letterSpacing: '0.02em',
        }}>
            {lines.map(({ text, variant = 'solid' }, i) => (
                <span key={i} style={{
                    display: 'block',
                    color: variant === 'outline' ? 'transparent'
                        : variant === 'red' ? 'var(--red)'
                            : '#fff',
                    WebkitTextStroke: variant === 'outline' ? '2px var(--red)' : 'none',
                }}>
                    {text}
                </span>
            ))}
        </h1>
    );
}

/* ─── Red CTA Banner (reusable across pages) ───────────────── */
export function CTABanner({ headline, subtext, btn1 = 'Get Started', btn2 = 'Book a Demo' }) {
    return (
        <section style={{ padding: '0 5% var(--section-pad)', background: 'var(--bg)' }}>
            <div style={{ maxWidth: 1400, margin: '0 auto' }}>
                <FadeUp>
                    <div style={{
                        borderRadius: 24, position: 'relative', overflow: 'hidden',
                        padding: 'clamp(64px,10vw,120px) 5%',
                        background: 'linear-gradient(135deg,#120006 0%,#1f0009 50%,#120006 100%)',
                        border: '1px solid rgba(217,0,37,0.2)',
                    }}>
                        <div style={{
                            position: 'absolute', inset: 0, pointerEvents: 'none',
                            background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(217,0,37,0.12) 0%, transparent 70%)',
                        }} />
                        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
                            <h2 style={{
                                fontFamily: 'var(--font-head)', fontSize: 'clamp(52px,8vw,96px)',
                                letterSpacing: '0.04em', lineHeight: 0.9, marginBottom: 24,
                            }}>
                                {headline}
                            </h2>
                            <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 17, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, marginBottom: 40 }}>
                                {subtext}
                            </p>
                            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                                <button className="btn-primary">{btn1}</button>
                                <button className="btn-ghost">{btn2}</button>
                            </div>
                        </div>
                    </div>
                </FadeUp>
            </div>
        </section>
    );
}

/* ─── Compliance badge ─────────────────────────────────────── */
export function ComplianceBadge({ icon, title, subtitle }) {
    return (
        <div className="hema-card" style={{ padding: '28px 24px' }}>
            <div style={{ fontSize: 24, marginBottom: 12 }}>{icon}</div>
            <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{title}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{subtitle}</div>
        </div>
    );
}

/* ─── Custom cursor ────────────────────────────────────────── */
export function CustomCursor() {
    const dot = useRef(null);
    const ring = useRef(null);
    useEffect(() => {
        const move = e => {
            if (dot.current) { dot.current.style.left = e.clientX + 'px'; dot.current.style.top = e.clientY + 'px'; }
            if (ring.current) { ring.current.style.left = e.clientX + 'px'; ring.current.style.top = e.clientY + 'px'; }
        };
        window.addEventListener('mousemove', move);
        return () => window.removeEventListener('mousemove', move);
    }, []);
    return (
        <>
            <div ref={dot} className="cursor-dot" />
            <div ref={ring} className="cursor-ring" />
        </>
    );
}
