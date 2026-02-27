import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplets, Menu, X, Home, Info, Zap, CreditCard, BookOpen, MessageSquare, LogIn } from 'lucide-react';

const links = [
    { to: '/', label: 'HOME', icon: <Home size={14} /> },
    { to: '/about', label: 'ABOUT', icon: <Info size={14} /> },
    { to: '/features', label: 'FEATURES', icon: <Zap size={14} /> },
    { to: '/pricing', label: 'PRICING', icon: <CreditCard size={14} /> },
    { to: '/blog', label: 'BLOG', icon: <BookOpen size={14} /> },
    { to: '/contact', label: 'CONTACT', icon: <MessageSquare size={14} /> },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', fn);
        return () => window.removeEventListener('scroll', fn);
    }, []);

    useEffect(() => { setOpen(false); }, [location]);

    return (
        <>
            <nav style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0 5%',
                height: scrolled ? 62 : 76,
                background: scrolled ? 'rgba(7,7,11,0.97)' : 'rgba(7,7,11,0.8)',
                backdropFilter: 'blur(20px)',
                borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.07)' : 'transparent'}`,
                transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
            }}>
                {/* Logo */}
                <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
                    <div style={{
                        width: 34, height: 34, background: 'var(--red)', borderRadius: 9,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <Droplets size={17} color="#fff" />
                    </div>
                    <span style={{ fontFamily: 'var(--font-head)', fontSize: 24, letterSpacing: '0.06em', color: '#fff' }}>
                        HEM∆
                    </span>
                </NavLink>

                {/* Desktop Links */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 2 }} className="md:flex hidden">
                    {links.map(({ to, label, icon }) => (
                        <NavLink key={to} to={to} style={({ isActive }) => ({
                            fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 13,
                            padding: '10px 16px', borderRadius: 8, textDecoration: 'none',
                            color: isActive ? '#fff' : 'var(--text2)',
                            transition: 'all 0.2s ease',
                            display: 'flex', alignItems: 'center', gap: 8,
                            position: 'relative'
                        })}
                            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text2)'; e.currentTarget.style.background = 'none'; }}
                        >
                            <span style={{ opacity: 0.7 }}>{icon}</span>
                            {label}
                            {useLocation().pathname === to && (
                                <motion.div layoutId="nav-indicator" style={{
                                    position: 'absolute', bottom: 0, left: '20%', right: '20%', height: 2, background: 'var(--red)'
                                }} />
                            )}
                        </NavLink>
                    ))}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Link to="/login" className="btn-ghost hidden md:flex" style={{ padding: '9px 20px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 7 }}>
                        <LogIn size={14} /> Sign In
                    </Link>
                    <Link to="/register" className="btn-primary" style={{ padding: '9px 20px', fontSize: 13 }}>
                        Get Started
                    </Link>
                    <button
                        className="md:hidden"
                        onClick={() => setOpen(o => !o)}
                        style={{ background: 'none', border: 'none', color: '#fff', padding: 6 }}
                    >
                        {open ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </nav>

            {/* Mobile drawer */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        style={{
                            position: 'fixed', top: scrolled ? 62 : 76, left: 0, right: 0, bottom: 0,
                            background: 'var(--bg)', zIndex: 499,
                            borderTop: '1px solid var(--border)',
                            padding: '24px 5%', display: 'flex', flexDirection: 'column', gap: 8,
                        }}
                    >
                        {links.map(({ to, label, icon }) => (
                            <NavLink key={to} to={to} style={({ isActive }) => ({
                                fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 18,
                                padding: '16px 20px', background: isActive ? 'rgba(217,0,37,0.08)' : 'var(--bg2)',
                                borderRadius: 12, color: isActive ? 'var(--red)' : '#fff',
                                textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 14,
                                borderLeft: isActive ? '3px solid var(--red)' : '3px solid transparent',
                            })}>
                                <span style={{ opacity: 0.8 }}>{icon}</span>
                                {label}
                            </NavLink>
                        ))}
                        <div style={{ marginTop: 'auto', paddingBottom: 40, display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <Link to="/login" className="btn-ghost" style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', gap: 8 }}>
                                <LogIn size={15} /> Sign In
                            </Link>
                            <Link to="/register" className="btn-primary" style={{ justifyContent: 'center' }}>Get Started →</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
