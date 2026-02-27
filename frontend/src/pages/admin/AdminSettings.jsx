import { useState } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '../../components/admin/AdminLayout';

function Toggle({ on, onToggle }) {
    return (
        <div onClick={onToggle} style={{ width: 40, height: 22, borderRadius: 11, background: on ? 'var(--red)' : 'rgba(255,255,255,0.12)', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
            <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, left: on ? 21 : 3, transition: 'left 0.2s' }} />
        </div>
    );
}

const TABS = ['System', 'Notifications', 'Security', 'Integrations'];
const iS = { width: '100%', background: '#0A0A12', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '11px 14px', fontFamily: 'var(--font-body)', fontSize: 14, color: '#fff', outline: 'none', boxSizing: 'border-box' };

export default function AdminSettings() {
    const [tab, setTab] = useState('System');
    const [notifs, setNotifs] = useState({
        emergency: true, critical: true, registration: true, daily: true,
        weekly: false, audit: true, payment: true, whatsapp: false,
    });
    const toggle = key => setNotifs(n => ({ ...n, [key]: !n[key] }));

    const INTEGRATIONS = [
        { name: 'Kerala Health Portal', connected: true }, { name: 'NACO System', connected: true },
        { name: 'SMS Gateway (MSG91)', connected: true }, { name: 'WhatsApp Business API', connected: false },
        { name: 'HL7/FHIR API', connected: true }, { name: 'RFID Scanner System', connected: true },
        { name: 'Payment Gateway', connected: true }, { name: 'Google Analytics', connected: false },
    ];

    return (
        <AdminLayout title="Settings" page="SETTINGS">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {/* Tabs */}
                <div style={{ display: 'flex', gap: 4 }}>
                    {TABS.map(t => (
                        <button key={t} onClick={() => setTab(t)} style={{ background: tab === t ? 'var(--red)' : 'rgba(255,255,255,0.05)', border: `1px solid ${tab === t ? 'var(--red)' : 'rgba(255,255,255,0.1)'}`, borderRadius: 100, padding: '7px 20px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 13, color: tab === t ? '#fff' : 'var(--text2)' }}>{t}</button>
                    ))}
                </div>

                {/* System Tab */}
                {tab === 'System' && (
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                        style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 32 }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>GENERAL</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
                            {[['System Name', 'HEM∆'], ['State', 'Kerala'], ['Support Email', 'support@hema.health'], ['Emergency Hotline', '+91 800 123 4567']].map(([l, v]) => (
                                <div key={l}><div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>{l}</div><input defaultValue={v} style={iS} /></div>
                            ))}
                        </div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>THRESHOLDS</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 32 }}>
                            {[['Low Stock %', '30'], ['Critical %', '15'], ['Cooling Days', '90'], ['Min Hemoglobin', '12.5'], ['Min Weight (kg)', '50'], ['Min Age', '18']].map(([l, v]) => (
                                <div key={l}><div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>{l}</div><input defaultValue={v} type="number" style={iS} /></div>
                            ))}
                        </div>
                        <button style={{ background: 'var(--red)', border: 'none', borderRadius: 10, padding: '12px 32px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: '#fff' }}>Save System Settings</button>
                    </motion.div>
                )}

                {/* Notifications Tab */}
                {tab === 'Notifications' && (
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                        style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 32 }}>
                        {[
                            ['emergency', 'Emergency Request Alerts (SMS)', 'Immediate SMS for emergency blood requests'],
                            ['critical', 'Critical Stock Alerts (all admins)', 'When stock falls below critical threshold'],
                            ['registration', 'New Registration Notifications', 'New hospital/blood bank registration alerts'],
                            ['daily', 'Daily System Summary (email)', 'Daily digest of system activity'],
                            ['weekly', 'Weekly Analytics Report (email)', 'Comprehensive weekly analytics'],
                            ['audit', 'Audit Alert (critical events)', 'Alerts for critical security events'],
                            ['payment', 'Payment Overdue Reminders', 'Reminders for pending payments'],
                            ['whatsapp', 'WhatsApp System Alerts', 'System alerts via WhatsApp'],
                        ].map(([key, label, desc]) => (
                            <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                                <div>
                                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#fff' }}>{label}</div>
                                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>{desc}</div>
                                </div>
                                <Toggle on={notifs[key]} onToggle={() => toggle(key)} />
                            </div>
                        ))}
                        <button style={{ marginTop: 24, background: 'var(--red)', border: 'none', borderRadius: 10, padding: '12px 32px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: '#fff' }}>Save Notification Settings</button>
                    </motion.div>
                )}

                {/* Security Tab */}
                {tab === 'Security' && (
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                        style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 32 }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>AUTHENTICATION</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 32 }}>
                            <div><div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 6 }}>Session Timeout (min)</div><input defaultValue="30" type="number" style={iS} /></div>
                            <div><div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 6 }}>Max Failed Logins</div><input defaultValue="5" type="number" style={iS} /></div>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#fff' }}>Two-Factor Auth</span>
                                    <Toggle on={true} onToggle={() => { }} />
                                </div>
                            </div>
                        </div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>IP ALLOWLIST</div>
                        <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
                            {['192.168.1.0/24', '10.0.0.0/8'].map(ip => (
                                <span key={ip} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#0A0A12', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 100, padding: '5px 12px', fontFamily: 'var(--font-mono)', fontSize: 12, color: '#fff' }}>
                                    {ip} <span style={{ cursor: 'pointer', color: 'var(--red)', fontSize: 14 }}>×</span>
                                </span>
                            ))}
                        </div>
                        <div style={{ display: 'flex', gap: 10 }}>
                            <input placeholder="Add IP address..." style={{ ...iS, flex: 1 }} />
                            <button style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 24px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text2)' }}>Add IP</button>
                        </div>
                    </motion.div>
                )}

                {/* Integrations Tab */}
                {tab === 'Integrations' && (
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            {INTEGRATIONS.map(int => (
                                <div key={int.name} style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 600, fontSize: 15, color: '#fff', marginBottom: 4 }}>{int.name}</div>
                                        <span style={{ background: int.connected ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.05)', border: `1px solid ${int.connected ? 'rgba(34,197,94,0.25)' : 'rgba(255,255,255,0.1)'}`, borderRadius: 100, padding: '2px 10px', fontFamily: 'var(--font-mono)', fontSize: 9, color: int.connected ? '#22c55e' : 'var(--text3)' }}>{int.connected ? 'Connected' : 'Disconnected'}</span>
                                    </div>
                                    <button style={{ background: int.connected ? 'none' : 'var(--red)', border: `1px solid ${int.connected ? 'rgba(255,255,255,0.1)' : 'var(--red)'}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 12, color: int.connected ? 'var(--text2)' : '#fff' }}>
                                        {int.connected ? 'Configure' : 'Connect'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </AdminLayout>
    );
}
