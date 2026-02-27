import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FadeUp, MonoLabel } from '../components/UI';
import { Search, ArrowRight } from 'lucide-react';

const CATEGORIES = ['All', 'Blood Banking', 'Compliance', 'Technology', 'Kerala Health', 'Case Studies', 'Guides'];

const catColors = {
    'Blood Banking': { bg: 'rgba(217,0,37,0.15)', color: 'var(--red)', border: 'rgba(217,0,37,0.3)' },
    'Compliance': { bg: 'rgba(245,158,11,0.12)', color: '#f59e0b', border: 'rgba(245,158,11,0.3)' },
    'Technology': { bg: 'rgba(59,130,246,0.12)', color: '#3b82f6', border: 'rgba(59,130,246,0.3)' },
    'Kerala Health': { bg: 'rgba(34,197,94,0.12)', color: '#22c55e', border: 'rgba(34,197,94,0.3)' },
    'Case Studies': { bg: 'rgba(217,0,37,0.08)', color: 'var(--red)', border: 'rgba(217,0,37,0.2)' },
    'Guides': { bg: 'rgba(168,85,247,0.12)', color: '#a855f7', border: 'rgba(168,85,247,0.3)' },
};

const posts = [
    { title: "The O-Negative Crisis: Kerala's Hidden Emergency", cat: 'Blood Banking', date: 'Jan 12, 2025', read: '6 min', excerpt: 'Why O-negative is always the scarcest blood type in Kerala and how HEM∆ tracks demand spikes before they turn critical.' },
    { title: 'Understanding NACO Blood Bank Compliance in 2025', cat: 'Compliance', date: 'Jan 8, 2025', read: '12 min', excerpt: 'A complete breakdown of the new NACO guidelines and what they mean for every blood bank operating in India.' },
    { title: 'AI Demand Forecasting in Blood Banking: A Practical Guide', cat: 'Technology', date: 'Jan 5, 2025', read: '9 min', excerpt: 'How machine learning models trained on Kerala district data predict shortages weeks before they happen.' },
    { title: 'Monsoon Season & Blood Shortages: How to Prepare', cat: 'Kerala Health', date: 'Dec 28, 2024', read: '7 min', excerpt: 'Monsoon brings floods and accidents — and blood demand surges. Here\'s how to stock correctly every June.' },
    { title: "From Paper to Digital: A Medical Officer's Transition Guide", cat: 'Guides', date: 'Dec 20, 2024', read: '11 min', excerpt: 'Step-by-step guidance for blood bank teams switching from paper registers to a digital management platform.' },
    { title: 'RFID Tracking in Blood Banks: Implementation Checklist', cat: 'Technology', date: 'Dec 15, 2024', read: '8 min', excerpt: 'Everything your IT team needs to deploy RFID tracking across a multi-facility blood bank network.' },
    { title: 'District Hospital Thrissur: A 90-Day HEM∆ Review', cat: 'Case Studies', date: 'Dec 10, 2024', read: '10 min', excerpt: 'How a mid-size district hospital cut emergency response time by 74% after deploying HEM∆ in 2024.' },
    { title: 'Blood Type Shortage Patterns in Kerala: 3-Year Analysis', cat: 'Blood Banking', date: 'Dec 5, 2024', read: '14 min', excerpt: 'Data from 340+ facilities reveals predictable patterns in O-negative and AB-negative supply across all 14 districts.' },
    { title: 'The Complete Guide to Blood Bank Staff Training', cat: 'Guides', date: 'Nov 28, 2024', read: '16 min', excerpt: 'How to train clinical and administrative staff to get the most from a modern blood management platform.' },
];

function CatBadge({ cat }) {
    const s = catColors[cat] || catColors['Blood Banking'];
    return (
        <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 9, padding: '4px 10px', borderRadius: 100,
            background: s.bg, color: s.color, border: `1px solid ${s.border}`,
            textTransform: 'uppercase', letterSpacing: '0.08em', display: 'inline-block',
        }}>{cat}</span>
    );
}

function PostCard({ post }) {
    return (
        <div className="hema-card" style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 14, cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.querySelector('.arrow')?.style && (e.currentTarget.querySelector('.arrow').style.opacity = 1)}
            onMouseLeave={e => e.currentTarget.querySelector('.arrow')?.style && (e.currentTarget.querySelector('.arrow').style.opacity = 0)}
        >
            <CatBadge cat={post.cat} />
            <h3 style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 18, lineHeight: 1.35 }}>{post.title}</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 14, color: 'var(--text2)', lineHeight: 1.7, flex: 1 }}>{post.excerpt}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)' }}>{post.date} · {post.read} read</div>
                <ArrowRight className="arrow" size={16} color="var(--red)" style={{ opacity: 0, transition: 'opacity 0.2s' }} />
            </div>
        </div>
    );
}

export default function BlogPage() {
    const [activeCat, setActiveCat] = useState('All');
    const [search, setSearch] = useState('');

    const filtered = posts.filter(p =>
        (activeCat === 'All' || p.cat === activeCat) &&
        (search === '' || p.title.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
            <Navbar />
            <div className="noise-overlay" />

            {/* HERO */}
            <section className="grid-bg" style={{ padding: '140px 5% 80px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} className="red-glow-tl" />
                <div style={{ maxWidth: 900 }}>
                    <FadeUp><MonoLabel>KNOWLEDGE BASE · HEMA INSIGHTS</MonoLabel></FadeUp>
                    <FadeUp delay={0.1}>
                        <h1 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(52px,9vw,88px)', lineHeight: 0.9, letterSpacing: '0.02em', marginBottom: 24 }}>
                            <span style={{ display: 'block', color: '#fff' }}>INSIGHTS FOR</span>
                            <span style={{ display: 'block', color: 'transparent', WebkitTextStroke: '2px rgba(255,255,255,0.5)' }}>HEALTHCARE</span>
                            <span style={{ display: 'block', color: 'var(--red)' }}>LEADERS.</span>
                        </h1>
                    </FadeUp>
                    <FadeUp delay={0.2}>
                        <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 17, color: 'var(--text2)', maxWidth: 580, lineHeight: 1.75, marginBottom: 36 }}>
                            Research, case studies, and practical guides for blood bank managers, medical officers, and hospital administrators across Kerala.
                        </p>
                        {/* Search */}
                        <div style={{ position: 'relative', maxWidth: 640 }}>
                            <Search size={16} color="var(--text3)" style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                            <input
                                value={search} onChange={e => setSearch(e.target.value)}
                                placeholder="Search articles, case studies, guides..."
                                style={{
                                    width: '100%', background: 'var(--card)', border: '1px solid var(--border)',
                                    borderRadius: 12, padding: '16px 20px 16px 46px',
                                    fontFamily: 'var(--font-body)', fontSize: 15, color: '#fff',
                                    outline: 'none', transition: 'border-color 0.2s',
                                }}
                                onFocus={e => e.target.style.borderColor = 'var(--red)'}
                                onBlur={e => e.target.style.borderColor = 'var(--border)'}
                            />
                        </div>
                    </FadeUp>
                </div>
            </section>

            {/* CATEGORY TABS */}
            <section style={{ padding: '0 5% 60px' }}>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {CATEGORIES.map(cat => (
                        <button key={cat} onClick={() => setActiveCat(cat)} style={{
                            fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 13,
                            padding: '8px 18px', borderRadius: 100, cursor: 'pointer', border: 'none',
                            background: activeCat === cat ? 'var(--red)' : 'var(--card)',
                            color: activeCat === cat ? '#fff' : 'var(--text2)',
                            transition: 'all 0.2s',
                        }}>
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* FEATURED POST */}
            <section style={{ padding: '0 5% 80px' }}>
                <FadeUp>
                    <div className="hema-card" style={{ display: 'grid', gridTemplateColumns: '55fr 45fr', gap: 48, padding: '48px', borderRadius: 24, overflow: 'hidden' }}>
                        <div>
                            <CatBadge cat="Case Studies" />
                            <h2 style={{ fontFamily: 'var(--font-sub)', fontWeight: 800, fontSize: 'clamp(24px,3.5vw,36px)', lineHeight: 1.25, margin: '20px 0 16px' }}>
                                How Ernakulam District Reduced Blood Wastage by 67% in 90 Days
                            </h2>
                            <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 16, color: 'var(--text2)', lineHeight: 1.75, marginBottom: 24 }}>
                                A deep dive into how three Ernakulam hospitals deployed HEM∆ and transformed their blood inventory management in just three months.
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--bg2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-sub)', fontWeight: 800, fontSize: 13 }}>AK</div>
                                <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text2)' }}>Dr. Anitha Krishnan · Jan 15, 2025 · 8 min read</span>
                            </div>
                            <a href="#" style={{ color: 'var(--red)', fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 15 }}>Read Case Study →</a>
                        </div>
                        <div style={{ background: 'var(--bg2)', borderRadius: 16, padding: '40px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 16 }}>
                            <div style={{ fontFamily: 'var(--font-head)', fontSize: 72, color: 'var(--red)', lineHeight: 0.9 }}>67%</div>
                            <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 600, fontSize: 17, color: '#fff' }}>Reduction in Blood Wastage</div>
                            <div style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 14, color: 'var(--text2)' }}>Ernakulam District · 90 Days</div>
                        </div>
                    </div>
                </FadeUp>
            </section>

            {/* POST GRID */}
            <section style={{ padding: '0 5% var(--section-pad)' }}>
                <div style={{ maxWidth: 1400, margin: '0 auto' }}>
                    {filtered.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text3)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
                            No articles found. Try a different search or category.
                        </div>
                    ) : (
                        <div className="blog-grid">
                            {filtered.map((post, i) => (
                                <FadeUp key={post.title} delay={i * 0.06}>
                                    <PostCard post={post} />
                                </FadeUp>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* NEWSLETTER */}
            <section style={{ padding: '80px 5%', background: '#0A0A12', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
                <FadeUp>
                    <h2 style={{ fontFamily: 'var(--font-sub)', fontWeight: 800, fontSize: 'clamp(24px,4vw,36px)', marginBottom: 12 }}>Stay Ahead of Healthcare</h2>
                    <p style={{ fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 16, color: 'var(--text2)', marginBottom: 32 }}>
                        Weekly insights on blood banking, Kerala health policy, and HEM∆ platform updates. No spam.
                    </p>
                    <div style={{ display: 'flex', gap: 0, maxWidth: 520, margin: '0 auto', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)' }}>
                        <input placeholder="your@hospital.com" style={{
                            flex: 1, background: 'var(--card)', border: 'none', padding: '16px 20px',
                            fontFamily: 'var(--font-body)', fontSize: 15, color: '#fff', outline: 'none',
                        }} />
                        <button className="btn-primary" style={{ borderRadius: 0, padding: '16px 24px' }}>Subscribe →</button>
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', marginTop: 20 }}>
                        ◈ 2,400+ healthcare professionals subscribed · Unsubscribe anytime
                    </div>
                </FadeUp>
            </section>

            <Footer />
        </div>
    );
}
