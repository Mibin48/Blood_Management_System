import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Download } from 'lucide-react';
import DonorLayout from '../../components/donor/DonorLayout';
import { EligibilityBadge } from '../../components/donor/DonorSidebar';
import { mockDonor, mockDonations } from '../../data/mockData';

const initials = mockDonor.name.split(' ').map(n => n[0]).join('');
const GENDERS = ['Male', 'Female', 'Other', 'Prefer not to say'];
const DISTRICTS = ['Ernakulam', 'Thiruvananthapuram', 'Thrissur', 'Kozhikode', 'Kannur', 'Alappuzha', 'Koottayam', 'Idukki', 'Malappuram', 'Palakkad', 'Pathanamthitta', 'Kasaragod', 'Wayanad', 'Kollam'];
const TABS = ['Personal Details', 'Account Settings'];

const NOTIFY_ROWS = [
    { key: 'donation', label: 'Donation Reminders', sub: 'Remind me before eligibility date', default: true },
    { key: 'eligibility', label: 'Eligibility Notifications', sub: 'Alert when I become eligible', default: true },
    { key: 'camps', label: 'Nearby Camp Alerts', sub: 'Notify about donation camps nearby', default: true },
    { key: 'whatsapp', label: 'WhatsApp Notifications', sub: 'Messages via WhatsApp', default: false },
    { key: 'sms', label: 'SMS Alerts', sub: 'Text message notifications', default: true },
];

function Toggle({ on, onChange }) {
    return (
        <div
            onClick={() => onChange(!on)}
            style={{
                width: 40, height: 22, borderRadius: 11, cursor: 'pointer',
                background: on ? 'var(--red)' : 'rgba(255,255,255,0.12)',
                position: 'relative', transition: 'background 0.3s', flexShrink: 0,
            }}
        >
            <div style={{
                position: 'absolute', top: 3, left: on ? 21 : 3,
                width: 16, height: 16, borderRadius: '50%', background: '#fff',
                transition: 'left 0.3s', boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
            }} />
        </div>
    );
}

export default function DonorProfile() {
    const [tab, setTab] = useState(0);
    const [name, setName] = useState(mockDonor.name);
    const [age, setAge] = useState(mockDonor.age);
    const [gender, setGender] = useState(mockDonor.gender);
    const [bg, setBg] = useState(mockDonor.blood_group);
    const [phone, setPhone] = useState(mockDonor.phone);
    const [city, setCity] = useState(mockDonor.city);
    const [saved, setSaved] = useState(false);
    const [notifs, setNotifs] = useState(Object.fromEntries(NOTIFY_ROWS.map(r => [r.key, r.default])));

    const totalMl = mockDonations.reduce((s, d) => s + d.quantity_ml, 0);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    const inputStyle = {
        width: '100%', background: '#0A0A12', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 10, padding: '12px 14px', fontFamily: 'var(--font-body)', fontSize: 14,
        color: '#fff', outline: 'none', boxSizing: 'border-box', marginBottom: 16,
    };
    const labelStyle = {
        display: 'block', fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)',
        textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8,
    };

    return (
        <DonorLayout title="My Profile" page="PROFILE">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                {/* Profile Header */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    style={{
                        background: 'linear-gradient(135deg,#0F0F17 0%,#1A0A0F 100%)',
                        border: '1px solid rgba(217,0,37,0.2)', borderRadius: 20, padding: 36,
                        display: 'flex', alignItems: 'center', gap: 28,
                    }}>
                    <div style={{
                        width: 80, height: 80, borderRadius: '50%',
                        background: 'radial-gradient(circle, #D90025, #8B0010)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'var(--font-display)', fontSize: 32, color: '#fff',
                        border: '3px solid rgba(217,0,37,0.5)',
                        boxShadow: '0 0 30px rgba(217,0,37,0.2)',
                        flexShrink: 0, letterSpacing: 2,
                    }}>
                        {initials}
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, color: '#fff', lineHeight: 1, marginBottom: 10 }}>
                            {mockDonor.name}
                        </div>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                            <span style={{ background: 'rgba(217,0,37,0.1)', border: '1px solid rgba(217,0,37,0.3)', borderRadius: 100, padding: '3px 12px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--red)' }}>
                                {mockDonor.blood_group}
                            </span>
                            <EligibilityBadge status={mockDonor.status} />
                            <span style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 100, padding: '3px 12px', fontFamily: 'var(--font-mono)', fontSize: 10, color: '#f59e0b' }}>
                                SILVER DONOR
                            </span>
                        </div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', marginTop: 10 }}>
                            ID: {mockDonor.donor_id} · Member since {new Date(mockDonor.member_since).getFullYear()} · {mockDonor.city}, Kerala
                        </div>
                    </div>
                    <button style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 18px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)', flexShrink: 0, transition: 'all 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = '#fff'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'var(--text2)'; }}>
                        <Edit2 size={14} /> Edit Profile
                    </button>
                </motion.div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    {TABS.map((t, i) => (
                        <button key={t} onClick={() => setTab(i)} style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            fontFamily: 'var(--font-sub)', fontWeight: 600, fontSize: 14,
                            color: tab === i ? '#fff' : 'var(--text3)',
                            padding: '12px 20px',
                            borderBottom: tab === i ? '2px solid var(--red)' : '2px solid transparent',
                            marginBottom: -1, transition: 'all 0.2s',
                        }}>{t}</button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {tab === 0 ? (
                        <motion.div key="personal" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                                {/* Personal Info Form */}
                                <div style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28 }}>
                                    <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: 6 }}>Personal Information</div>
                                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text3)', marginBottom: 24 }}>Fields linked to Donor profile</div>

                                    <label style={labelStyle}>FULL NAME</label>
                                    <input value={name} onChange={e => setName(e.target.value)} style={inputStyle} />

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                        <div>
                                            <label style={labelStyle}>AGE</label>
                                            <input type="number" value={age} onChange={e => setAge(e.target.value)} style={inputStyle} />
                                        </div>
                                        <div>
                                            <label style={labelStyle}>GENDER</label>
                                            <select value={gender} onChange={e => setGender(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                                                {GENDERS.map(g => <option key={g} value={g} style={{ background: '#0A0A12' }}>{g}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <label style={labelStyle}>BLOOD GROUP</label>
                                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                                        {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(b => (
                                            <button key={b} onClick={() => setBg(b)} style={{
                                                padding: '6px 12px', borderRadius: 8, cursor: 'pointer',
                                                background: bg === b ? 'var(--red)' : 'rgba(255,255,255,0.05)',
                                                border: `1px solid ${bg === b ? 'var(--red)' : 'rgba(255,255,255,0.08)'}`,
                                                fontFamily: 'var(--font-mono)', fontSize: 11, color: bg === b ? '#fff' : 'var(--text2)',
                                            }}>{b}</button>
                                        ))}
                                    </div>

                                    <label style={labelStyle}>PHONE NUMBER</label>
                                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} style={inputStyle} />

                                    <label style={labelStyle}>CITY / DISTRICT</label>
                                    <select value={city} onChange={e => setCity(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                                        {DISTRICTS.map(d => <option key={d} value={d} style={{ background: '#0A0A12' }}>{d}</option>)}
                                    </select>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 8 }}>
                                        <button onClick={handleSave} style={{
                                            background: saved ? 'rgba(34,197,94,0.2)' : 'var(--red)', border: 'none', borderRadius: 10,
                                            padding: '12px 24px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600,
                                            color: saved ? '#22c55e' : '#fff', transition: 'all 0.25s',
                                        }}>
                                            {saved ? '✓ Saved' : 'Save Changes'}
                                        </button>
                                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)' }}>Last updated: 15 Jan 2025</span>
                                    </div>
                                </div>

                                {/* Summary */}
                                <div style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28 }}>
                                    <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: 20 }}>Donor Summary</div>
                                    {[
                                        { label: 'DONOR ID', val: <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>{mockDonor.donor_id}</span> },
                                        { label: 'BLOOD GROUP', val: <span style={{ background: 'rgba(217,0,37,0.1)', border: '1px solid rgba(217,0,37,0.25)', borderRadius: 100, padding: '2px 10px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--red)' }}>{mockDonor.blood_group}</span> },
                                        { label: 'TOTAL DONATIONS', val: mockDonor.total_donations },
                                        { label: 'TOTAL VOLUME', val: `${totalMl} ml` },
                                        { label: 'LAST DONATION', val: new Date(mockDonor.last_donation_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) },
                                        { label: 'NEXT ELIGIBLE', val: new Date(mockDonor.next_eligible).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) },
                                        { label: 'MEMBER SINCE', val: new Date(mockDonor.member_since).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) },
                                        { label: 'STATUS', val: <EligibilityBadge status={mockDonor.status} small /> },
                                    ].map(({ label, val }) => (
                                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</span>
                                            <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#fff' }}>{val}</span>
                                        </div>
                                    ))}
                                    <button style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '11px 20px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)', marginTop: 20, width: '100%', justifyContent: 'center', transition: 'all 0.2s' }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = '#fff'; }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'var(--text2)'; }}>
                                        <Download size={14} /> Download Donor Card
                                    </button>
                                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text3)', textAlign: 'center', marginTop: 8 }}>PDF certificate of donation</div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div key="settings" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                            <div style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28 }}>
                                {/* Security */}
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>Security</div>
                                {[
                                    { label: 'Password', sub: 'Last changed 3 months ago', action: 'Change' },
                                    { label: 'Phone Verification', sub: `Verified: ${mockDonor.phone}`, action: null, badge: 'Verified' },
                                ].map(({ label, sub, action, badge }) => (
                                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                                        <div>
                                            <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 600, fontSize: 15, color: '#fff', marginBottom: 3 }}>{label}</div>
                                            <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text3)' }}>{sub}</div>
                                        </div>
                                        {action && (
                                            <button style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '7px 16px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text2)' }}>{action}</button>
                                        )}
                                        {badge && (
                                            <span style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 100, padding: '3px 12px', fontFamily: 'var(--font-mono)', fontSize: 10, color: '#22c55e' }}>{badge}</span>
                                        )}
                                    </div>
                                ))}

                                {/* Notifications */}
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 28, marginBottom: 16 }}>Notifications</div>
                                {NOTIFY_ROWS.map(({ key, label, sub }) => (
                                    <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                                        <div>
                                            <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 600, fontSize: 15, color: '#fff', marginBottom: 3 }}>{label}</div>
                                            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text3)' }}>{sub}</div>
                                        </div>
                                        <Toggle on={notifs[key]} onChange={v => setNotifs(p => ({ ...p, [key]: v }))} />
                                    </div>
                                ))}

                                {/* Danger Zone */}
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 28, marginBottom: 16 }}>Danger Zone</div>
                                <button style={{ background: 'rgba(217,0,37,0.08)', border: '1px solid rgba(217,0,37,0.25)', borderRadius: 10, padding: '12px 24px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--red)', transition: 'all 0.2s' }}
                                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(217,0,37,0.15)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(217,0,37,0.08)'; }}>
                                    Deactivate Account
                                </button>
                                <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text3)', marginTop: 8 }}>Your donation history will be preserved.</div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </DonorLayout>
    );
}
