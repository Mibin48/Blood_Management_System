import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FadeUp, MonoLabel, HeroHeadline, CTABanner } from '../components/UI';
import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';

/* ─── Timeline ─────────────────────────────────────────────── */
const timeline = [
    {
        year: '2022', title: 'THE IDEA', side: 'left',
        body: 'Two doctors from Thiruvananthapuram witnessed a patient die waiting for O-negative blood that existed 3km away, unknown to anyone. HEM∆ was conceived that night.'
    },
    {
        year: 'Early 2023', title: 'FIRST PILOT', side: 'right',
        body: 'Piloted with 3 hospitals in Ernakulam district. Reduced average emergency response time from 52 minutes to 11 minutes in 90 days.'
    },
    {
        year: 'Mid 2023', title: 'KERALA HEALTH DEPT. PARTNERSHIP', side: 'left',
        body: 'Official partnership with Kerala Health Department. HEM∆ integrated into the state\'s health infrastructure roadmap.'
    },
    {
        year: 'Late 2023', title: '100 HOSPITALS', side: 'right',
        body: 'Crossed 100 connected hospitals across 8 districts. First cross-district blood transfer completed in under 20 minutes.'
    },
    {
        year: '2024', title: 'AI FORECASTING LAUNCH', side: 'left',
        body: 'Launched AI demand forecasting engine. Predicted the monsoon O+ shortage 3 weeks in advance for the first time in Kerala.'
    },
    {
        year: '2025', title: 'ALL 14 DISTRICTS', side: 'right',
        body: 'HEM∆ now covers all 14 Kerala districts. 340+ hospitals. 12,000+ registered donors. 4.2M+ units tracked.'
    },
];

const team = [
    { name: 'Dr. Rajesh Kumar', role: 'Chief Medical Officer', location: 'Thiruvananthapuram', bio: '15 years in emergency hematology at KIMS', initials: 'RK' },
    { name: 'Priya Menon', role: 'CTO & Co-Founder', location: 'Kochi', bio: 'Former ISRO engineer, built for healthcare', initials: 'PM' },
    { name: 'Arun Krishnan', role: 'Head of Operations', location: 'Kozhikode', bio: 'Ex-Apollo Hospitals supply chain lead', initials: 'AK' },
    { name: 'Dr. Anitha Nair', role: 'Compliance Director', location: 'Thrissur', bio: 'NACO certified auditor, Kerala Health Dept.', initials: 'AN' },
];

const partners = ['Kerala Health Dept.', 'NACO', 'NHP', 'WHO India', 'KIMS', 'Amrita Hospital'];
const badges = [
    { icon: '🛡️', title: 'ISO 27001', sub: 'Certified' },
    { icon: '🏥', title: 'HIPAA', sub: 'Compliant' },
    { icon: '🩸', title: 'NACO', sub: 'Registered' },
    { icon: '🏛️', title: 'Kerala Govt.', sub: 'Approved' },
];

export default function AboutPage() {
    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
            <Navbar />
            <div className="noise-overlay" />

            {/* ── SECTION 1: HERO ──────────────────────────────── */}
            <section className="grid-bg" style={{
                minHeight: '100vh', display: 'flex', alignItems: 'center',
                padding: '140px 5% 100px', position: 'relative', overflow: 'hidden',
            }}>
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} className="red-glow-l" />
                <div style={{ maxWidth: 1400, margin: '0 auto', width: '100%' }}>
                    <FadeUp>
                        <MonoLabel>◈ ABOUT HEM∆ · KERALA'S BLOOD INTELLIGENCE PLATFORM</MonoLabel>
                    </FadeUp>
                    <FadeUp delay={0.1}>
                        <HeroHeadline size="clamp(72px,9.5vw,108px)" lines={[
                            { text: 'BUILT FOR KERALA.', variant: 'solid' },
                            { text: 'BUILT TO', variant: 'solid' },
                            { text: 'SAVE LIVES.', variant: 'outline' },
                        ]} />
                    </FadeUp>
                    <FadeUp delay={0.2}>
                        <p style={{
                            fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 18,
                            color: 'var(--text2)', maxWidth: 520, lineHeight: 1.75, margin: '28px 0 56px',
                        }}>
                            HEM∆ was born from a simple truth — in Kerala's hospitals, the difference between life and death is often just one missing unit of blood. We built the infrastructure to make sure that never happens.
                        </p>
                    </FadeUp>
                    {/* Floating stat cards */}
                    <FadeUp delay={0.3}>
                        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                            {[
                                { label: 'Founded', value: '2022' },
                                { label: 'Serving', value: '14 Districts' },
                            ].map(({ label, value }) => (
                                <div key={label} style={{
                                    background: 'var(--card)', border: '1px solid var(--border)',
                                    borderLeft: '3px solid var(--red)', borderRadius: 14, padding: '20px 28px',
                                }}>
                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>{label}</div>
                                    <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 28 }}>{value}</div>
                                </div>
                            ))}
                        </div>
                    </FadeUp>
                </div>
            </section>

            {/* ── SECTION 2: MISSION ───────────────────────────── */}
            <section style={{ padding: '100px 5%', background: '#0A0A12', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
                    fontFamily: 'var(--font-head)', fontSize: 'clamp(80px,20vw,240px)',
                    color: 'rgba(255,255,255,0.02)', whiteSpace: 'nowrap', pointerEvents: 'none',
                    letterSpacing: '0.05em',
                }}>MISSION</div>
                <div style={{ maxWidth: 780, margin: '0 auto', position: 'relative' }}>
                    <FadeUp>
                        <MonoLabel style={{ justifyContent: 'center', display: 'flex' }}>OUR PURPOSE</MonoLabel>
                        <blockquote style={{
                            fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 'clamp(28px,4vw,44px)',
                            lineHeight: 1.2, marginBottom: 28,
                        }}>
                            "To ensure no patient in Kerala waits for blood. Ever."
                        </blockquote>
                        <div style={{ width: 80, height: 3, background: 'var(--red)', margin: '0 auto 32px' }} />
                        <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 18, color: 'var(--text2)', lineHeight: 1.8 }}>
                            We believe technology should serve humanity at its most critical moments. HEM∆ connects blood banks, hospitals, and donors across all 14 Kerala districts — creating a single, intelligent network that responds in minutes, not hours.
                        </p>
                    </FadeUp>
                </div>
            </section>

            {/* ── SECTION 3: THE PROBLEM ───────────────────────── */}
            <section style={{ padding: 'var(--section-pad) 5%', background: 'var(--bg)' }}>
                <div style={{ maxWidth: 1400, margin: '0 auto' }} className="responsive-grid">
                    <FadeUp>
                        <MonoLabel>THE KERALA REALITY</MonoLabel>
                        <div style={{ borderLeft: '3px solid var(--red)', paddingLeft: 24 }}>
                            <h2 style={{ fontFamily: 'var(--font-sub)', fontWeight: 800, fontSize: 'clamp(36px,5vw,52px)', lineHeight: 1.15, marginBottom: 20 }}>
                                The Numbers<br />Don't Lie.
                            </h2>
                            <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 16, color: 'var(--text2)', lineHeight: 1.8 }}>
                                Before HEM∆, Kerala's blood supply chain relied on phone calls, paper registers, and disconnected spreadsheets. Critical shortages went undetected until it was too late.
                            </p>
                        </div>
                    </FadeUp>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                        {[
                            { stat: '67%', desc: 'of blood banks in Kerala had no real-time inventory system' },
                            { stat: '₹4.2CR', desc: 'worth of blood units wasted annually due to expiry mismanagement' },
                            { stat: '48 MIN', desc: 'average emergency blood request response time before HEM∆' },
                        ].map(({ stat, desc }, i) => (
                            <FadeUp key={stat} delay={i * 0.12}>
                                <div style={{
                                    background: 'var(--card)', border: '1px solid var(--border)',
                                    borderLeft: '3px solid var(--red)', borderRadius: 14, padding: '24px 28px',
                                }}>
                                    <div style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(48px,8vw,80px)', color: 'var(--red)', lineHeight: 1 }}>{stat}</div>
                                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: '#fff', marginTop: 8 }}>{desc}</p>
                                </div>
                            </FadeUp>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SECTION 4: TIMELINE ──────────────────────────── */}
            <section style={{ padding: 'var(--section-pad) 5%', background: 'var(--bg2)', textAlign: 'center' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                    <FadeUp>
                        <MonoLabel>OUR JOURNEY</MonoLabel>
                        <h2 style={{ fontFamily: 'var(--font-sub)', fontWeight: 800, fontSize: 'clamp(32px,5vw,48px)', marginBottom: 80 }}>
                            How HEM∆ Came to Be
                        </h2>
                    </FadeUp>
                    <div style={{ position: 'relative' }}>
                        {/* axis */}
                        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'rgba(217,0,37,0.25)', transform: 'translateX(-50%)' }} />
                        {timeline.map(({ year, title, side, body }, i) => (
                            <FadeUp key={year} delay={i * 0.08}>
                                <div style={{
                                    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, marginBottom: 52,
                                    textAlign: side === 'left' ? 'right' : 'left',
                                }}>
                                    {side === 'right' && <div />}
                                    <div style={{
                                        background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 14,
                                        padding: '24px 28px', position: 'relative', textAlign: 'left',
                                    }}>
                                        {/* node */}
                                        <div style={{
                                            position: 'absolute', top: 28,
                                            [side === 'left' ? 'right' : 'left']: -38,
                                            width: 14, height: 14, borderRadius: '50%', background: 'var(--red)',
                                            border: '2px solid var(--bg2)',
                                        }} />
                                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--red)', letterSpacing: '0.1em', marginBottom: 6 }}>{year}</div>
                                        <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 16, marginBottom: 10 }}>{title}</div>
                                        <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)', lineHeight: 1.7 }}>{body}</p>
                                    </div>
                                    {side === 'left' && <div />}
                                </div>
                            </FadeUp>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SECTION 5: TEAM ──────────────────────────────── */}
            <section style={{ padding: 'var(--section-pad) 5%', background: 'var(--bg)', textAlign: 'center' }}>
                <div style={{ maxWidth: 1400, margin: '0 auto' }}>
                    <FadeUp>
                        <MonoLabel>THE PEOPLE</MonoLabel>
                        <h2 style={{ fontFamily: 'var(--font-sub)', fontWeight: 800, fontSize: 'clamp(32px,5vw,48px)', marginBottom: 12 }}>Meet the Team</h2>
                        <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 17, color: 'var(--text2)', marginBottom: 64 }}>The minds building Kerala's blood intelligence platform.</p>
                    </FadeUp>
                    <div className="four-col">
                        {team.map(({ name, role, location, bio, initials }, i) => (
                            <FadeUp key={name} delay={i * 0.1}>
                                <div className="hema-card" style={{ padding: '28px 24px', position: 'relative', textAlign: 'left' }}>
                                    <div style={{
                                        width: 64, height: 64, borderRadius: '50%', background: 'var(--bg2)',
                                        border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontFamily: 'var(--font-sub)', fontWeight: 800, fontSize: 20, marginBottom: 16,
                                    }}>{initials}</div>
                                    <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 17, marginBottom: 4 }}>{name}</div>
                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>{role}</div>
                                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text3)', marginBottom: 10 }}>{location}</div>
                                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text2)', fontStyle: 'italic', lineHeight: 1.6 }}>"{bio}"</p>
                                    <a href="#" style={{ position: 'absolute', bottom: 20, right: 20, color: 'var(--text3)', transition: 'color 0.2s' }}
                                        onMouseEnter={e => e.currentTarget.style.color = 'var(--red)'}
                                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text3)'}
                                    >
                                        <Linkedin size={15} />
                                    </a>
                                </div>
                            </FadeUp>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SECTION 6: PARTNERS ──────────────────────────── */}
            <section style={{ padding: 'var(--section-pad) 5%', background: '#0A0A12', textAlign: 'center' }}>
                <div style={{ maxWidth: 1400, margin: '0 auto' }}>
                    <FadeUp>
                        <MonoLabel>CERTIFICATIONS & PARTNERSHIPS</MonoLabel>
                        <h2 style={{ fontFamily: 'var(--font-sub)', fontWeight: 800, fontSize: 'clamp(28px,4.5vw,44px)', marginBottom: 56 }}>Trusted by the System That Matters</h2>
                    </FadeUp>
                    {/* Partner logos */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap', marginBottom: 56 }}>
                        {partners.map(p => (
                            <div key={p} style={{
                                padding: '12px 28px', borderRadius: 10, border: '1px solid var(--border)',
                                fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 14, color: 'var(--text3)',
                                transition: 'all 0.2s',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
                                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text3)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                            >{p}</div>
                        ))}
                    </div>
                    {/* Badges */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20, maxWidth: 800, margin: '0 auto' }} className="four-col">
                        {badges.map(({ icon, title, sub }) => (
                            <FadeUp key={title}>
                                <div className="hema-card" style={{ padding: '24px 20px', textAlign: 'left' }}>
                                    <div style={{ fontSize: 22, marginBottom: 12 }}>{icon}</div>
                                    <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{title}</div>
                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{sub}</div>
                                </div>
                            </FadeUp>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SECTION 7: CTA ───────────────────────────────── */}
            <CTABanner
                headline="WANT TO PARTNER WITH US?"
                subtext="Whether you're a hospital, blood bank, or government body — let's build Kerala's healthiest future together."
                btn1="Get Started"
                btn2="Contact Us"
            />

            <Footer />
        </div>
    );
}
