import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FadeUp, MonoLabel, CTABanner } from '../components/UI';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Minus, ChevronDown, ChevronUp } from 'lucide-react';

const plans = [
    {
        id: 'clinic', label: 'CLINIC', monthly: 4999, annual: 3999, popular: false,
        features: [
            { t: '◈ Up to 2 facilities', ok: true },
            { t: '◈ 500 units tracked/month', ok: true },
            { t: '◈ Basic inventory management', ok: true },
            { t: '◈ Donor registration', ok: true },
            { t: '◈ Email support', ok: true },
            { t: '◈ Basic NACO reports', ok: true },
            { t: '◈ 2 user accounts', ok: true },
            { t: '— Emergency dispatch', ok: false },
            { t: '— AI forecasting', ok: false },
            { t: '— Cross-district transfers', ok: false },
            { t: '— API access', ok: false },
        ],
        cta: 'Start Free Trial', ctaStyle: 'ghost',
    },
    {
        id: 'hospital', label: 'HOSPITAL', monthly: 14999, annual: 11999, popular: true,
        features: [
            { t: '◈ Up to 15 facilities', ok: true },
            { t: '◈ 10,000 units tracked/month', ok: true },
            { t: '◈ Advanced inventory management', ok: true },
            { t: '◈ Full donor management', ok: true },
            { t: '◈ Emergency dispatch (< 8 min SLA)', ok: true },
            { t: '◈ Priority support (24/7)', ok: true },
            { t: '◈ Full NACO compliance suite', ok: true },
            { t: '◈ 25 user accounts', ok: true },
            { t: '◈ Cross-district transfers', ok: true },
            { t: '◈ Kerala map integration', ok: true },
            { t: '◈ Basic AI forecasting', ok: true },
            { t: '— Custom integrations', ok: false },
            { t: '— Dedicated CSM', ok: false },
        ],
        cta: 'Get Started', ctaStyle: 'primary',
    },
    {
        id: 'enterprise', label: 'ENTERPRISE', monthly: null, annual: null, popular: false,
        features: [
            { t: '◈ Unlimited facilities', ok: true },
            { t: '◈ Unlimited units tracked', ok: true },
            { t: '◈ Full platform access', ok: true },
            { t: '◈ Advanced AI forecasting', ok: true },
            { t: '◈ Custom compliance reporting', ok: true },
            { t: '◈ Unlimited user accounts', ok: true },
            { t: '◈ Dedicated Customer Success Manager', ok: true },
            { t: '◈ Custom integrations (HL7, FHIR)', ok: true },
            { t: '◈ Multi-district management', ok: true },
            { t: '◈ 99.98% uptime SLA guarantee', ok: true },
            { t: '◈ On-site training & onboarding', ok: true },
            { t: '◈ White-label options available', ok: true },
        ],
        cta: 'Talk to Sales', ctaStyle: 'ghost',
    },
];

const tableRows = [
    {
        section: 'INVENTORY', rows: [
            { feat: 'Real-time tracking', vals: [true, true, true] },
            { feat: 'Units/month', vals: ['500', '10,000', 'Unlimited'] },
            { feat: 'Facilities', vals: ['2', '15', 'Unlimited'] },
            { feat: 'Temperature monitoring', vals: [true, true, true] },
            { feat: 'Expiry alerts', vals: [true, true, true] },
            { feat: 'RFID/QR scanning', vals: [false, true, true] },
        ]
    },
    {
        section: 'DONORS', rows: [
            { feat: 'Registration', vals: [true, true, true] },
            { feat: 'Recall campaigns', vals: [false, true, true] },
            { feat: 'WhatsApp integration', vals: [false, true, true] },
            { feat: 'Malayalam support', vals: [true, true, true] },
        ]
    },
    {
        section: 'COMPLIANCE', rows: [
            { feat: 'Basic NACO reports', vals: [true, true, true] },
            { feat: 'Full compliance suite', vals: [false, true, true] },
            { feat: 'Audit trail', vals: [true, true, true] },
            { feat: 'Custom reports', vals: [false, false, true] },
        ]
    },
    {
        section: 'SUPPORT', rows: [
            { feat: 'Email support', vals: [true, true, true] },
            { feat: 'Priority support 24/7', vals: [false, true, true] },
            { feat: 'Dedicated CSM', vals: [false, false, true] },
            { feat: 'On-site training', vals: [false, false, true] },
        ]
    },
];

const faqs = [
    { q: 'Is HEM∆ NACO compliant?', a: 'Yes. HEM∆ is fully certified with NACO blood bank guidelines and auto-generates all required monthly and quarterly reports.' },
    { q: 'Can we integrate with our existing Hospital Information System?', a: 'HEM∆ supports HL7 and FHIR standards, enabling seamless integration with most major HIS platforms.' },
    { q: 'What happens during a network or internet outage?', a: 'HEM∆ operates with offline-first architecture. Data syncs automatically when connectivity is restored.' },
    { q: 'Is patient and donor data encrypted?', a: 'All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We are ISO 27001 and HIPAA compliant.' },
    { q: 'Do you support Malayalam language?', a: 'Yes. HEM∆ supports both English and Malayalam throughout the platform — forms, notifications, and reports.' },
    { q: 'Is there a free trial?', a: 'Yes. Clinic and Hospital plans come with a 14-day free trial. No credit card required.' },
    { q: 'How long does onboarding take?', a: 'Basic setup takes 2–3 hours. Full data migration and configuration takes 3–5 business days.' },
    { q: 'What is your uptime guarantee?', a: 'Enterprise plans include a 99.98% uptime SLA, backed by multi-region infrastructure.' },
];

function PricingCard({ plan, annual }) {
    const price = annual ? plan.annual : plan.monthly;
    return (
        <motion.div
            whileHover={!plan.popular ? { y: -4 } : {}}
            style={{
                background: plan.popular ? 'var(--card2)' : 'var(--card)',
                border: plan.popular ? '2px solid var(--red)' : '1px solid var(--border)',
                borderRadius: 20, padding: '36px 28px', position: 'relative', overflow: 'hidden',
                boxShadow: plan.popular ? '0 0 60px rgba(217,0,37,0.18)' : 'none',
                display: 'flex', flexDirection: 'column',
            }}
        >
            {plan.popular && (
                <>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(to right, var(--red), transparent)' }} />
                    <div style={{
                        display: 'inline-block', background: 'rgba(217,0,37,0.15)', border: '1px solid rgba(217,0,37,0.3)',
                        borderRadius: 100, padding: '4px 12px',
                        fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--red)',
                        textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16,
                    }}>MOST POPULAR</div>
                </>
            )}
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>
                {plan.label}
            </div>
            <div style={{ marginBottom: 28 }}>
                {price ? (
                    <>
                        <div style={{ fontFamily: 'var(--font-head)', fontSize: 72, color: plan.popular ? 'var(--red)' : '#fff', lineHeight: 0.9, letterSpacing: '0.02em' }}>
                            ₹{price.toLocaleString()}
                        </div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)', marginTop: 8 }}>/month</div>
                        {annual && plan.monthly && (
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#22c55e', marginTop: 4 }}>Save {Math.round((1 - plan.annual / plan.monthly) * 100)}% vs monthly</div>
                        )}
                    </>
                ) : (
                    <>
                        <div style={{ fontFamily: 'var(--font-head)', fontSize: 72, color: '#fff', lineHeight: 0.9, letterSpacing: '0.02em' }}>Custom</div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)', marginTop: 8 }}>Tailored for large networks</div>
                    </>
                )}
            </div>
            <div style={{ flex: 1, marginBottom: 28 }}>
                {plan.features.map(({ t, ok }) => (
                    <div key={t} style={{ display: 'flex', gap: 10, marginBottom: 10, opacity: ok ? 1 : 0.4 }}>
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: ok ? 'var(--text2)' : 'var(--text3)', lineHeight: 1.5 }}>{t}</span>
                    </div>
                ))}
            </div>
            <button
                className={plan.ctaStyle === 'primary' ? 'btn-primary' : 'btn-ghost'}
                style={{ width: '100%', justifyContent: 'center' }}
            >
                {plan.cta}
            </button>
        </motion.div>
    );
}

function FAQItem({ q, a }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="hema-card" style={{ padding: '20px 24px', cursor: 'pointer' }} onClick={() => setOpen(o => !o)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 600, fontSize: 16 }}>{q}</div>
                <div style={{ color: 'var(--red)', flexShrink: 0 }}>{open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</div>
            </div>
            <AnimatePresence>
                {open && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }} style={{ overflow: 'hidden' }}>
                        <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 15, color: 'var(--text2)', lineHeight: 1.75, marginTop: 14 }}>{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function PricingPage() {
    const [annual, setAnnual] = useState(false);

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
            <Navbar />
            <div className="noise-overlay" />

            {/* HERO */}
            <section className="grid-bg" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '140px 5% 80px', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} className="red-glow-c" />
                <div style={{ maxWidth: 800 }}>
                    <FadeUp><MonoLabel style={{ justifyContent: 'center', display: 'flex' }}>TRANSPARENT PRICING</MonoLabel></FadeUp>
                    <FadeUp delay={0.1}>
                        <h1 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(56px,9vw,96px)', lineHeight: 0.9, letterSpacing: '0.03em', marginBottom: 24 }}>
                            <span style={{ display: 'block', color: '#fff' }}>SIMPLE PRICING.</span>
                            <span style={{ display: 'block', color: 'var(--red)' }}>CRITICAL IMPACT.</span>
                        </h1>
                    </FadeUp>
                    <FadeUp delay={0.2}>
                        <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 17, color: 'var(--text2)', lineHeight: 1.75, marginBottom: 40 }}>
                            No hidden fees. No per-unit charges. Just flat pricing that scales with your facility.
                        </p>
                        {/* Toggle */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
                            <span style={{ fontFamily: 'var(--font-sub)', fontWeight: 600, fontSize: 14, color: !annual ? '#fff' : 'var(--text2)' }}>Monthly</span>
                            <button onClick={() => setAnnual(a => !a)} style={{
                                width: 52, height: 28, borderRadius: 100,
                                background: annual ? 'var(--red)' : 'var(--border)',
                                border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.3s',
                            }}>
                                <span style={{
                                    position: 'absolute', top: 4, left: annual ? 26 : 4,
                                    width: 20, height: 20, borderRadius: '50%', background: '#fff',
                                    transition: 'left 0.3s',
                                }} />
                            </button>
                            <span style={{ fontFamily: 'var(--font-sub)', fontWeight: 600, fontSize: 14, color: annual ? '#fff' : 'var(--text2)' }}>
                                Annual
                                <span style={{ marginLeft: 8, background: 'rgba(34,197,94,0.15)', color: '#22c55e', borderRadius: 6, padding: '2px 8px', fontSize: 11, fontFamily: 'var(--font-mono)' }}>Save 20%</span>
                            </span>
                        </div>
                    </FadeUp>
                </div>
            </section>

            {/* PRICING CARDS */}
            <section style={{ padding: '0 5% var(--section-pad)' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }} className="three-col">
                    {plans.map(plan => <PricingCard key={plan.id} plan={plan} annual={annual} />)}
                </div>
            </section>

            {/* COMPARISON TABLE */}
            <section style={{ padding: 'var(--section-pad) 5%', background: 'var(--bg2)' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                    <FadeUp>
                        <h2 style={{ fontFamily: 'var(--font-sub)', fontWeight: 800, fontSize: 'clamp(28px,4vw,44px)', textAlign: 'center', marginBottom: 12 }}>Full Feature Comparison</h2>
                        <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 16, color: 'var(--text2)', textAlign: 'center', marginBottom: 48 }}>See exactly what's included in each plan</p>
                    </FadeUp>
                    {/* Header */}
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 0, background: 'var(--card2)', borderRadius: '12px 12px 0 0', padding: '16px 24px' }}>
                        {['Feature', 'Clinic', 'Hospital', 'Enterprise'].map((h, i) => (
                            <div key={h} style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 14, textAlign: i > 0 ? 'center' : 'left', color: i === 2 ? 'var(--red)' : '#fff' }}>{h}</div>
                        ))}
                    </div>
                    {tableRows.map(({ section, rows }, si) => (
                        <div key={section}>
                            <div style={{ background: 'var(--bg3)', padding: '12px 24px', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{section}</div>
                            {rows.map(({ feat, vals }, ri) => (
                                <div key={feat} style={{
                                    display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 0,
                                    padding: '14px 24px', background: ri % 2 === 0 ? 'var(--card)' : 'rgba(255,255,255,0.01)',
                                    borderLeft: '0px', borderRight: '0px',
                                }}>
                                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)' }}>{feat}</div>
                                    {vals.map((v, vi) => (
                                        <div key={vi} style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: 14, color: vi === 1 ? '#fff' : 'var(--text2)' }}>
                                            {v === true ? <span style={{ color: '#22c55e' }}>✓</span> : v === false ? <span style={{ color: 'var(--text3)' }}>—</span> : v}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ */}
            <section style={{ padding: 'var(--section-pad) 5%', background: 'var(--bg)' }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>
                    <FadeUp>
                        <h2 style={{ fontFamily: 'var(--font-sub)', fontWeight: 800, fontSize: 'clamp(28px,4vw,44px)', textAlign: 'center', marginBottom: 52 }}>Frequently Asked Questions</h2>
                    </FadeUp>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {faqs.map(faq => <FAQItem key={faq.q} {...faq} />)}
                    </div>
                </div>
            </section>

            {/* Trust Badges */}
            <section style={{ padding: '60px 5%', background: '#0A0A12', borderTop: '1px solid var(--border)' }}>
                <div style={{ maxWidth: 800, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }} className="four-col">
                    {[
                        { icon: '🛡️', title: 'ISO 27001', sub: 'Certified' },
                        { icon: '🏥', title: 'HIPAA', sub: 'Compliant' },
                        { icon: '🩸', title: 'NACO', sub: 'Registered' },
                        { icon: '🏛️', title: 'Kerala Govt.', sub: 'Approved' },
                    ].map(({ icon, title, sub }) => (
                        <div key={title} className="hema-card" style={{ padding: '20px', textAlign: 'center' }}>
                            <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
                            <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 15 }}>{title}</div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>{sub}</div>
                        </div>
                    ))}
                </div>
            </section>

            <CTABanner headline="START SAVING LIVES TODAY" subtext="Join 340+ Kerala hospitals. 14-day free trial. No credit card required." btn1="Start Free Trial" btn2="Book a Demo" />
            <Footer />
        </div>
    );
}
