import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FadeUp as FadeUpUI, Counter as CounterUI } from '../components/UI';
import {
  Droplets, LayoutDashboard, BarChart2, Package,
  CalendarDays, ClipboardCheck, Plug, Radio,
  Zap, Rocket, Bell, Bot, Users, Twitter,
  Linkedin, Github, Play, ChevronRight
} from 'lucide-react';

/* ─── Reusable fade-up wrapper ─────────────────────────────────── */
function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated counter ─────────────────────────────────────────── */
function Counter({ to, suffix = '', decimals = 0 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const dur = 2000;
    const start = performance.now();
    const tick = (now) => {
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

/* ─── Kerala Map ────────────────────────────────────────────────── */
function KeralaMap() {
  return (
    <div className="relative rounded-2xl overflow-hidden flex items-center justify-center" style={{
      background: 'var(--card2)',
      border: '1px solid var(--border)',
      padding: 'clamp(20px, 4vw, 30px)',
      height: 'clamp(400px, 80vh, 600px)',
      width: '100%'
    }}>
      {/* Vertical Scan line */}
      <div className="scan-line" style={{
        animationDuration: '6s',
        background: 'linear-gradient(90deg, transparent, rgba(232,25,44,0.3), transparent)'
      }} />

      <div className="relative h-full flex items-center justify-center">
        <img
          src="/kerala-map.png"
          alt="Kerala Blood Network"
          style={{ height: '100%', width: 'auto', opacity: 0.8, filter: 'brightness(1.2)' }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentNode.innerHTML += '<div style="color:var(--text3);font-size:14px">Map Image (kerala-map.png) not found in public folder</div>';
          }}
        />

        {/* Animated dots on Kerala districts - Aligned to map geometry */}
        <div className="map-dot" style={{ top: '10%', left: '15%' }} />
        <div className="map-dot" style={{ top: '28%', left: '38%', animationDelay: '0.5s' }} />
        <div className="map-dot" style={{ top: '50%', left: '55%', animationDelay: '1.2s' }} />
        <div className="map-dot" style={{ top: '72%', left: '68%', animationDelay: '0.8s' }} />
        <div className="map-dot" style={{ top: '92%', left: '88%', animationDelay: '1.5s' }} />

        {/* Pulse rings for high-activity nodes */}
        <div className="pulse-ring" style={{ top: 'calc(10% - 8px)', left: 'calc(15% - 8px)', width: 16, height: 16 }} />
        <div className="pulse-ring" style={{ top: 'calc(50% - 8px)', left: 'calc(55% - 8px)', width: 16, height: 16, animationDelay: '1.2s' }} />
        <div className="pulse-ring" style={{ top: 'calc(92% - 8px)', left: 'calc(88% - 8px)', width: 16, height: 16, animationDelay: '1.5s' }} />
      </div>

      {/* Stat badge */}
      <div style={{
        position: 'absolute', bottom: 20, right: 20,
        background: 'rgba(10,10,11,0.92)', border: '1px solid var(--border)',
        borderRadius: 12, padding: '12px 20px',
        display: 'flex', alignItems: 'center', gap: 12,
        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
        zIndex: 10
      }}>
        <div className="map-stat-dot" />
        <div>
          <div style={{ fontSize: 24, fontWeight: 800 }}>99.5%</div>
          <div style={{ fontSize: 12, color: 'var(--text3)' }}>State-wide Uptime</div>
        </div>
      </div>
    </div>
  );
}


/* ─── Hero Section ───────────────────────────────────────────────── */
function HeroSection() {
  const navigate = useNavigate();
  return (
    <section id="hero" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      padding: '140px 5% 100px', position: 'relative', overflow: 'hidden'
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 60% at 10% 60%, rgba(232,25,44,0.12) 0%, transparent 70%), radial-gradient(ellipse 40% 50% at 90% 30%, rgba(232,25,44,0.06) 0%, transparent 70%)'
      }} />

      <div className="responsive-grid" style={{ maxWidth: 1440, margin: '0 auto', width: '100%', alignItems: 'center' }}>
        {/* Left */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(232,25,44,0.12)', border: '1px solid rgba(232,25,44,0.3)',
              padding: '6px 14px', borderRadius: 100, fontSize: 12.5, fontWeight: 600,
              color: '#f87171', letterSpacing: '0.8px', marginBottom: 32
            }}
          >
            <div className="hero-badge-dot" />
            NEXT-GEN BLOOD MANAGEMENT
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: 'clamp(52px, 6.5vw, 88px)', fontWeight: 900, lineHeight: 1, letterSpacing: '-3px' }}
          >
            <span style={{ display: 'block' }}>Every Drop.</span>
            <span style={{ display: 'block' }}>Tracked.</span>
            <span style={{ display: 'block' }}>Stored.</span>
            <span style={{ display: 'block', color: 'var(--red)' }}>Delivered.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ marginTop: 28, color: 'var(--text2)', fontSize: 17, lineHeight: 1.8, maxWidth: 480 }}
          >
            Experience the future of blood management with real-time tracking, predictive AI inventory, and seamless compliance-edge.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ marginTop: 34, display: 'flex', alignItems: 'center', gap: 14 }}
          >
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 8px 28px rgba(232,25,44,0.5)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/register')}
              style={{
                background: 'var(--red)', color: '#fff', border: 'none',
                fontSize: 15, fontWeight: 600, cursor: 'pointer', padding: '14px 28px',
                borderRadius: 10, fontFamily: 'inherit',
                boxShadow: '0 4px 20px rgba(232,25,44,0.4)'
              }}
            >
              Get Started Free
            </motion.button>
            <button
              style={{ background: 'none', color: 'var(--text2)', border: 'none', fontSize: 13.5, fontWeight: 500, cursor: 'pointer', padding: '11px 18px', borderRadius: 8, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 7 }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text2)'}
            >
              <div style={{ width: 28, height: 28, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Play size={10} fill="white" color="white" style={{ marginLeft: 2 }} />
              </div>
              Watch Video
            </button>
          </motion.div>
        </div>

        {/* Right – Kerala Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <KeralaMap />
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Trusted By ────────────────────────────────────────────────── */
function TrustedBy() {
  const logos = [
    { icon: '⚡', name: 'RapidResponse' },
    { icon: '💉', name: 'VitalBlood' },
    { icon: '🔗', name: 'LifeLink' },
    { icon: '🏙️', name: 'City General' },
    { icon: '❤️', name: 'HeartInstitute' },
  ];
  return (
    <div style={{ padding: '50px 60px', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <p style={{ textAlign: 'center', fontSize: 13, fontWeight: 600, color: 'var(--text3)', letterSpacing: '1.8px', textTransform: 'uppercase', marginBottom: 24 }}>
          Trusted by leading healthcare suppliers
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
          {logos.map(({ icon, name }) => (
            <motion.div
              key={name}
              whileHover={{ opacity: 1 }}
              style={{ fontSize: 13, fontWeight: 700, color: 'var(--text3)', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: 6, opacity: 0.6, cursor: 'default' }}
            >
              <span style={{ fontSize: 16 }}>{icon}</span> {name}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Crisis Section ────────────────────────────────────────────── */
function CrisisSection() {
  const problems = [
    {
      icon: '🧪',
      title: 'Expired Inventory',
      desc: 'Hospitals regularly discard usable units before they expire. Ensure 100% utilization before a single unit is wasted.'
    },
    {
      icon: '📋',
      title: 'Manual Compliance',
      desc: 'Manually tracking regulatory and safety checks. Ensure 100% FHR compliance without the paperwork.'
    },
    {
      icon: '🔗',
      title: 'Disconnected Supply Chains',
      desc: "Left-hand doesn't know what the right hand holds. Create a single source of truth for all blood units."
    },
  ];

  return (
    <section id="crisis" style={{ padding: 'clamp(80px, 12vw, 140px) 5%', background: 'var(--bg)' }}>
      <div className="responsive-grid" style={{ maxWidth: 1440, margin: '0 auto', alignItems: 'start' }}>
        {/* Left */}
        <FadeUp>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--red)', letterSpacing: '1.8px', textTransform: 'uppercase', marginBottom: 20 }}>The Problem</div>
          <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-1.5px' }}>
            The Blood Supply Chain Crisis
          </h2>
          <p style={{ marginTop: 22, fontSize: 17, color: 'var(--text2)', lineHeight: 1.8 }}>
            Fragmented systems and manual management lead to critical failures in healthcare. HEMA solves the supply gap with end-to-end visibility.
          </p>
          <div style={{ marginTop: 40, background: 'var(--card2)', border: '1px solid var(--border)', borderRadius: 16, padding: 32 }}>
            <div style={{ fontSize: 84, fontWeight: 900, letterSpacing: '-4px', color: 'var(--red)', lineHeight: 1 }}>1 in 3</div>
            <div style={{ marginTop: 14, fontSize: 15, color: 'var(--text2)', lineHeight: 1.8 }}>
              Blood banks expires before it can save a life. Manual tracking, disconnected systems, and zero visibility are killing patients — silently.
            </div>
          </div>
        </FadeUp>

        {/* Right */}
        <FadeUp delay={0.15} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {problems.map(({ icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -2, borderColor: 'rgba(232,25,44,0.3)' }}
                style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, padding: '22px 24px' }}
              >
                <div style={{ width: 44, height: 44, background: 'var(--red-dim)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, fontSize: 22 }}>{icon}</div>
                <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{title}</div>
                <div style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.75 }}>{desc}</div>
              </motion.div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── Stats Bar ─────────────────────────────────────────────────── */
function StatsBar() {
  const stats = [
    { value: 4.2, suffix: 'M+', decimals: 1, label: 'Units tracked annually' },
    { value: 340, suffix: '+', decimals: 0, label: 'Partner hospitals' },
    { value: 99.98, suffix: '%', decimals: 2, label: 'Accuracy rate' },
    { value: null, label: 'Response time', raw: '<2min' },
  ];

  return (
    <div id="stats" style={{ padding: '80px 5%', background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="stats-grid" style={{ maxWidth: 1440, margin: '0 auto' }}>
        {stats.map(({ value, suffix, decimals, label, raw }, i) => (
          <FadeUp key={label} delay={i * 0.1}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: 'clamp(38px,5vw,56px)', fontWeight: 900, letterSpacing: '-3px',
                background: 'linear-gradient(135deg,#fff 40%, var(--red))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
              }}>
                {raw ? raw : <Counter to={value} suffix={suffix} decimals={decimals} />}
              </div>
              <div style={{ fontSize: 14, color: 'var(--text3)', marginTop: 10, fontWeight: 500 }}>{label}</div>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  );
}

/* ─── Features Section ──────────────────────────────────────────── */
function FeaturesSection() {
  const features = [
    {
      icon: <Droplets size={20} color="var(--red)" />,
      label: 'Live Data',
      title: 'Real-Time Inventory',
      desc: 'Track every unit with our RFID-enabled system. Real-time alerts, temperature monitoring, and automated expiry notifications keep you always prepared.',
      bg: 'linear-gradient(135deg,#1a0305,#2d0507)',
      emoji: '📊'
    },
    {
      icon: <Users size={20} color="var(--red)" />,
      label: 'Donors',
      title: 'Donor Management',
      desc: "Build a loyal donor community with simplified intake processes and intelligent donor recall — matched to your hospital's DNA results.",
      bg: 'linear-gradient(135deg,#0a1a2d,#0d2540)',
      emoji: '👤'
    },
    {
      icon: <Bell size={20} color="var(--red)" />,
      label: 'Alerts',
      title: 'Expiry Alerts',
      desc: 'Smart automated alerts prevent wastage. Our system proactively notifies when inventory levels drop critically or when units are nearing expiry dates.',
      bg: null
    },
    {
      icon: <Bot size={20} color="var(--red)" />,
      label: 'AI Powered',
      title: 'AI-Demand Forecasting',
      desc: 'Predict demand surges before they happen. Our AI analyzes historical data, seasonal trends, and local events to optimize your blood inventory automatically.',
      bg: null
    },
  ];

  return (
    <section id="features" style={{ padding: 'clamp(80px, 12vw, 140px) 5%', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <FadeUp>
          <div style={{ textAlign: 'center', marginBottom: 70 }}>
            <h2 style={{ fontSize: 'clamp(32px, 5.5vw, 64px)', fontWeight: 850, letterSpacing: '-2.5px', marginBottom: 18 }}>
              Complete Blood Management
            </h2>
            <p style={{ fontSize: 'clamp(16px, 1.8vw, 19px)', color: 'var(--text2)', maxWidth: 720, margin: '0 auto', lineHeight: 1.8 }}>
              Everything you need to manage the lifecycle of blood products from donation to transfusion in one unified platform.
            </p>
          </div>
        </FadeUp>

        <div className="features-grid" style={{ gap: 24 }}>
          {features.map(({ icon, label, title, desc, bg, emoji }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              style={{
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 16, padding: 28, position: 'relative', overflow: 'hidden',
                cursor: 'default'
              }}
            >
              {/* Top red highlight on hover handled via whileHover in real app */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{ width: 44, height: 44, background: 'var(--red-dim)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {icon}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--red)', letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: 6 }}>{label}</div>
                  <div style={{ fontSize: 20, fontWeight: 700 }}>{title}</div>
                </div>
              </div>
              <p style={{ marginTop: 18, fontSize: 15, color: 'var(--text2)', lineHeight: 1.8 }}>{desc}</p>
              {bg && (
                <div style={{ marginTop: 18, borderRadius: 10, overflow: 'hidden', height: 140, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)', fontSize: 36 }}>
                  {emoji}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── How It Works ──────────────────────────────────────────────── */
function HowSection() {
  const steps = [
    { num: '01', icon: <Plug size={18} color="var(--red)" />, title: 'Connect', desc: 'Integrate HEMA with your existing hospital management system, lab, and donation centres in minutes.' },
    { num: '02', icon: <Radio size={18} color="var(--red)" />, title: 'Track', desc: 'Every unit is tagged and tracked in real time. Monitor location, temperature, expiry, and status at a glance.' },
    { num: '03', icon: <Zap size={18} color="var(--red)" />, title: 'Optimize', desc: 'AI-powered analytics continuously optimize your supply to eliminate shortages and reduce waste dramatically.' },
    { num: '04', icon: <Rocket size={18} color="var(--red)" />, title: 'Deliver', desc: 'Ensure the right blood reaches the right patient at the right time. Every single time. Flawlessly and automatically.' },
  ];

  return (
    <section id="how-it-works" style={{ padding: 'clamp(80px, 12vw, 140px) 5%', background: 'var(--bg2)' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <FadeUp>
          <div style={{ textAlign: 'center', marginBottom: 70 }}>
            <h2 style={{ fontSize: 'clamp(32px, 5.5vw, 64px)', fontWeight: 850, letterSpacing: '-2.5px' }}>How HEMA Works</h2>
          </div>
        </FadeUp>
        <div className="how-grid" style={{ gap: 24 }}>
          {steps.map(({ num, icon, title, desc }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              whileHover={{ y: -4, borderColor: 'rgba(232,25,44,0.35)' }}
              style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 14, padding: '28px 22px', position: 'relative' }}
            >
              <div style={{ fontSize: 56, fontWeight: 900, letterSpacing: '-3px', color: 'rgba(232,25,44,0.2)', lineHeight: 1, marginBottom: 20 }}>{num}</div>
              <div style={{ width: 44, height: 44, background: 'var(--red-dim)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>{icon}</div>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{title}</div>
              <div style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.75 }}>{desc}</div>
              {i < 3 && (
                <div style={{ position: 'absolute', top: '50%', right: -13, width: 26, height: 2, background: 'linear-gradient(90deg, rgba(232,25,44,0.4), transparent)', zIndex: 1 }} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Section ───────────────────────────────────────────────── */
function CTASection() {
  const navigate = useNavigate();
  return (
    <section id="cta" style={{ padding: '0 5% clamp(80px, 12vw, 140px)' }}>
      <FadeUp>
        <div style={{ maxWidth: 1440, margin: '0 auto', borderRadius: 32, background: 'linear-gradient(135deg,#1a0305 0%,#2d0507 40%,#1a0305 100%)', border: '1px solid rgba(232,25,44,0.25)', position: 'relative', overflow: 'hidden', padding: 'clamp(60px, 10vw, 120px) 24px' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(232,25,44,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: 840, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
            <h2 style={{ fontSize: 'clamp(32px, 5.5vw, 72px)', fontWeight: 900, letterSpacing: '-3px', lineHeight: 1, marginBottom: 28 }}>
              Ready to save more lives?
            </h2>
            <p style={{ fontSize: 'clamp(16px, 1.8vw, 19px)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, marginBottom: 48 }}>
              Join 340+ hospitals already using HEMA to transform the way blood is safely and efficiently managed.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
              <motion.button
                whileHover={{ scale: 1.04, backgroundColor: '#f0f0f0' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/register')}
                style={{ background: '#fff', color: '#111', border: 'none', fontSize: 16, fontWeight: 700, cursor: 'pointer', padding: '16px 36px', borderRadius: 12, fontFamily: 'inherit' }}
              >
                Get Started Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04, borderColor: 'rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.08)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/contact')}
                style={{ background: 'none', color: '#fff', border: '1.5px solid rgba(255,255,255,0.25)', fontSize: 16, fontWeight: 600, cursor: 'pointer', padding: '16px 36px', borderRadius: 12, fontFamily: 'inherit' }}
              >
                Book a Demo
              </motion.button>
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}



/* ─── Main Page Export ──────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', overflowX: 'hidden' }}>
      <div className="noise-overlay" />
      <Navbar />
      <HeroSection />
      <TrustedBy />
      <CrisisSection />
      <StatsBar />
      <FeaturesSection />
      <HowSection />
      <CTASection />
      <Footer />
    </div>
  );
}
