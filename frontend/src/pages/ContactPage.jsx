import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FadeUp, MonoLabel } from '../components/UI';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

const roles = ['Medical Officer', 'Hospital Administrator', 'Blood Bank Director', 'IT Manager', 'Government Official', 'Other'];
const interests = ['Request a Demo', 'Pricing Information', 'Technical Integration', 'Partnership', 'Press / Media', 'Support'];

const districts = [
    'Thiruvananthapuram', 'Kollam', 'Pathanamthitta', 'Alappuzha', 'Kottayam',
    'Idukki', 'Ernakulam', 'Thrissur', 'Palakkad', 'Malappuram',
    'Kozhikode', 'Wayanad', 'Kannur', 'Kasaragod',
];

const faqItems = [
    { q: 'How quickly can HEM∆ be deployed at our hospital?', a: 'Basic deployment takes 2–3 hours. Full data migration, training, and go-live is typically completed within 3–5 business days.' },
    { q: 'Do you offer on-site training in Malayalam?', a: 'Yes. Our Kerala-based team delivers on-site training in both English and Malayalam for clinical and administrative staff.' },
    { q: 'Is there a government procurement option?', a: 'Yes. HEM∆ is available through GEM (Government e-Marketplace) and supports Kerala Government procurement frameworks.' },
    { q: 'Can we migrate data from our existing system?', a: 'Yes. We provide free data migration support for CSV, Excel, and most major blood bank management systems.' },
    { q: 'What support do you offer after onboarding?', a: 'All plans include email support. Hospital and Enterprise plans include 24/7 priority support and a dedicated account manager.' },
];

const inputStyle = {
    width: '100%', background: 'var(--bg)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 10, padding: '14px 16px',
    fontFamily: 'var(--font-body)', fontSize: 14, color: '#fff', outline: 'none',
    transition: 'border-color 0.2s',
};

function Field({ label, type = 'text', placeholder, required, children }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {label}{required && ' *'}
            </label>
            {children || (
                <input type={type} placeholder={placeholder || label}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'var(--red)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
            )}
        </div>
    );
}

function FAQItem({ q, a }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="hema-card" style={{ padding: '20px 24px', cursor: 'pointer' }} onClick={() => setOpen(o => !o)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 600, fontSize: 15 }}>{q}</div>
                <div style={{ color: 'var(--red)', flexShrink: 0 }}>{open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</div>
            </div>
            <AnimatePresence>
                {open && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} style={{ overflow: 'hidden' }}>
                        <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 14, color: 'var(--text2)', lineHeight: 1.75, marginTop: 12 }}>{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);
    const [checked, setChecked] = useState([]);
    const [hoveredDistrict, setHoveredDistrict] = useState(null);

    const toggleInterest = i => setChecked(c => c.includes(i) ? c.filter(x => x !== i) : [...c, i]);

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
            <Navbar />
            <div className="noise-overlay" />

            {/* HERO */}
            <section className="grid-bg" style={{ padding: '140px 5% 80px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} className="red-glow-l" />
                <FadeUp>
                    <MonoLabel>GET IN TOUCH</MonoLabel>
                    <h1 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(64px,10vw,96px)', lineHeight: 0.9, letterSpacing: '0.03em', marginBottom: 24 }}>
                        LET'S TALK<span style={{ color: 'var(--red)' }}>.</span>
                    </h1>
                    <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 17, color: 'var(--text2)', maxWidth: 500, lineHeight: 1.75 }}>
                        Whether you're a hospital administrator, blood bank director, or Kerala Health Department official — our team is ready to help you get started.
                    </p>
                </FadeUp>
            </section>

            {/* MAIN SECTION */}
            <section style={{ padding: '80px 5% var(--section-pad)' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '55fr 45fr', gap: 60, alignItems: 'start' }} className="responsive-grid">

                    {/* FORM */}
                    <FadeUp>
                        <div className="hema-card" style={{ padding: '48px 40px', borderRadius: 20 }}>
                            {!submitted ? (
                                <>
                                    <h2 style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 28, marginBottom: 32 }}>Send us a Message</h2>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                            <Field label="Full Name" required />
                                            <Field label="Email Address" type="email" required />
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                            <Field label="Phone Number" type="tel" />
                                            <Field label="Organization" required />
                                        </div>
                                        <Field label="Your Role">
                                            <select style={{ ...inputStyle }}
                                                onFocus={e => e.target.style.borderColor = 'var(--red)'}
                                                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                            >
                                                <option value="" style={{ background: 'var(--bg)' }}>Select your role</option>
                                                {roles.map(r => <option key={r} value={r} style={{ background: 'var(--bg)' }}>{r}</option>)}
                                            </select>
                                        </Field>
                                        <Field label="I'm interested in">
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 4 }}>
                                                {interests.map(i => (
                                                    <label key={i} style={{
                                                        display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
                                                        fontFamily: 'var(--font-body)', fontSize: 13, color: checked.includes(i) ? '#fff' : 'var(--text2)',
                                                        background: checked.includes(i) ? 'rgba(217,0,37,0.12)' : 'var(--bg)',
                                                        border: `1px solid ${checked.includes(i) ? 'rgba(217,0,37,0.35)' : 'rgba(255,255,255,0.08)'}`,
                                                        borderRadius: 8, padding: '8px 14px', transition: 'all 0.2s',
                                                    }}>
                                                        <input type="checkbox" checked={checked.includes(i)} onChange={() => toggleInterest(i)} style={{ display: 'none' }} />
                                                        {checked.includes(i) && <span style={{ color: 'var(--red)', fontSize: 12 }}>◈</span>}
                                                        {i}
                                                    </label>
                                                ))}
                                            </div>
                                        </Field>
                                        <Field label="Message" required>
                                            <textarea rows={5} placeholder="Tell us about your facility and how we can help..."
                                                style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }}
                                                onFocus={e => e.target.style.borderColor = 'var(--red)'}
                                                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                            />
                                        </Field>
                                        <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 16, padding: '16px' }} onClick={() => setSubmitted(true)}>
                                            Send Message →
                                        </button>
                                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', textAlign: 'center' }}>
                                            ◈ We respond within 4 business hours · Data encrypted
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                    <CheckCircle size={56} color="#22c55e" style={{ marginBottom: 24 }} />
                                    <h3 style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 28, marginBottom: 12 }}>Message Received!</h3>
                                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--text2)', marginBottom: 16 }}>
                                        Our Kerala team will get back to you within 4 hours.
                                    </p>
                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text3)' }}>
                                        Reference: #HEM-2025-{Math.floor(Math.random() * 9000 + 1000)}
                                    </div>
                                </div>
                            )}
                        </div>
                    </FadeUp>

                    {/* INFO */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        {/* Office */}
                        <FadeUp>
                            <div className="hema-card" style={{ padding: '28px 24px' }}>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>HEADQUARTERS</div>
                                <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
                                    <MapPin size={16} color="var(--red)" style={{ flexShrink: 0, marginTop: 2 }} />
                                    <div>
                                        <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 600, fontSize: 18, marginBottom: 6 }}>Thiruvananthapuram, Kerala</div>
                                        <div style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 14, color: 'var(--text2)', lineHeight: 1.7 }}>
                                            HEM∆ Technologies Pvt. Ltd.<br />Technopark Campus, Phase III<br />Thiruvananthapuram — 695581
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeUp>
                        {/* Contact */}
                        <FadeUp delay={0.1}>
                            <div className="hema-card" style={{ padding: '28px 24px' }}>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>REACH US</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    {[
                                        { Icon: Phone, primary: '+91 471 XXX XXXX', secondary: 'Mon–Sat · 9am–6pm IST' },
                                        { Icon: Mail, primary: 'hello@hema.health', secondary: 'Replies within 4 hours' },
                                    ].map(({ Icon, primary, secondary }) => (
                                        <div key={primary} style={{ display: 'flex', gap: 12 }}>
                                            <Icon size={16} color="var(--red)" style={{ flexShrink: 0, marginTop: 2 }} />
                                            <div>
                                                <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 600, fontSize: 16 }}>{primary}</div>
                                                <div style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 13, color: 'var(--text2)' }}>{secondary}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FadeUp>
                        {/* Emergency */}
                        <FadeUp delay={0.15}>
                            <div style={{
                                padding: '24px', borderRadius: 16,
                                background: 'rgba(217,0,37,0.06)', border: '1px solid rgba(217,0,37,0.25)',
                            }}>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>24/7 EMERGENCY LINE</div>
                                <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 800, fontSize: 24, color: 'var(--red)', marginBottom: 6 }}>1800-XXX-BLOOD</div>
                                <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text2)' }}>For critical blood supply emergencies only</div>
                            </div>
                        </FadeUp>
                        {/* Districts */}
                        <FadeUp delay={0.2}>
                            <div className="hema-card" style={{ padding: '28px 24px' }}>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>DISTRICT OFFICES</div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                    {districts.map(d => (
                                        <span key={d} onMouseEnter={() => setHoveredDistrict(d)} onMouseLeave={() => setHoveredDistrict(null)} style={{
                                            fontFamily: 'var(--font-mono)', fontSize: 10, padding: '5px 12px', borderRadius: 100,
                                            background: 'var(--bg)', cursor: 'default',
                                            border: hoveredDistrict === d ? '1px solid var(--red)' : '1px solid var(--border)',
                                            color: hoveredDistrict === d ? '#fff' : 'var(--text3)',
                                            transition: 'all 0.2s', textTransform: 'uppercase', letterSpacing: '0.06em',
                                        }}>{d}</span>
                                    ))}
                                </div>
                            </div>
                        </FadeUp>
                    </div>
                </div>
            </section>

            {/* KERALA MAP SECTION */}
            <section style={{ padding: 'var(--section-pad) 5%', background: 'var(--bg2)', textAlign: 'center' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <FadeUp>
                        <MonoLabel>OUR NETWORK</MonoLabel>
                        <h2 style={{ fontFamily: 'var(--font-sub)', fontWeight: 800, fontSize: 'clamp(28px,4vw,44px)', marginBottom: 48 }}>Covering All of Kerala</h2>
                    </FadeUp>
                    <FadeUp delay={0.1}>
                        <div className="hema-card" style={{ padding: 48, borderRadius: 24, position: 'relative', overflow: 'hidden', minHeight: 420, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div className="scan-line" />
                            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
                                <img src="/kerala-map.png" alt="Kerala HEM∆ Network" style={{ maxHeight: 380, width: 'auto', opacity: 0.85, filter: 'brightness(1.1)' }}
                                    onError={e => { e.target.style.display = 'none'; }} />
                                {/* District dots overlay */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginTop: 20, maxWidth: 600 }}>
                                    {districts.slice(0, 8).map(d => (
                                        <div key={d} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--red)', display: 'inline-block', flexShrink: 0 }} />
                                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)' }}>{d}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </FadeUp>
                    <div style={{ display: 'flex', gap: 32, justifyContent: 'center', marginTop: 32, flexWrap: 'wrap' }}>
                        {[
                            { sym: '◉', label: 'District Office' },
                            { sym: '★', label: 'Headquarters' },
                            { sym: '━', label: 'Network Connection' },
                        ].map(({ sym, label }) => (
                            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)' }}>
                                <span style={{ color: 'var(--red)' }}>{sym}</span> {label}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ STRIP */}
            <section style={{ padding: 'var(--section-pad) 5%', background: '#0A0A12' }}>
                <div style={{ maxWidth: 760, margin: '0 auto' }}>
                    <FadeUp>
                        <h2 style={{ fontFamily: 'var(--font-sub)', fontWeight: 800, fontSize: 'clamp(26px,4vw,40px)', textAlign: 'center', marginBottom: 48 }}>Quick Answers</h2>
                    </FadeUp>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {faqItems.map(f => <FAQItem key={f.q} {...f} />)}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: 'var(--section-pad) 5%', background: 'var(--bg)', textAlign: 'center' }}>
                <FadeUp>
                    <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(52px,8vw,80px)', letterSpacing: '0.03em', marginBottom: 20 }}>READY TO GET STARTED?</h2>
                    <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 17, color: 'var(--text2)', marginBottom: 36 }}>
                        Or skip the form — book a 30-minute live demo directly.
                    </p>
                    <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button className="btn-primary">Book a Demo</button>
                        <button className="btn-ghost">View Pricing</button>
                    </div>
                </FadeUp>
            </section>

            <Footer />
        </div>
    );
}
