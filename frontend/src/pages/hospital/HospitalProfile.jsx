import { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Download, Building2 } from 'lucide-react';
import HospitalLayout from '../../components/hospital/HospitalLayout';
import { mockHospital, mockBloodRequests, mockPatients, mockHospitalBanks } from '../../data/hospitalMockData';

const TABS = ['Hospital Details', 'Account Settings'];
const ALL_DEPTS = ['Emergency', 'Surgery', 'Oncology', 'Maternity', 'ICU', 'Radiology', 'Cardiology', 'Pediatrics'];

function Toggle({ on, onChange }) {
    return (
        <div onClick={() => onChange(!on)} style={{ width: 44, height: 24, borderRadius: 12, background: on ? 'var(--red)' : 'rgba(255,255,255,0.1)', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }} >
            <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, left: on ? 23 : 3, transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
        </div>
    );
}

function InfoRow({ label, value }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#fff' }}>{value}</span>
        </div>
    );
}

export default function HospitalProfile() {
    const [tab, setTab] = useState(0);
    const [editing, setEditing] = useState(false);
    const [saved, setSaved] = useState(false);
    const [name, setName] = useState(mockHospital.hospital_name);
    const [city, setCity] = useState(mockHospital.city);
    const [contact, setContact] = useState(mockHospital.contact_number);
    const [beds, setBeds] = useState(mockHospital.beds);
    const [depts, setDepts] = useState([...mockHospital.departments]);
    const [notifs, setNotifs] = useState({ emergency: true, updates: true, payments: true, stock: true, whatsapp: false });
    const fulfillRate = Math.round((mockBloodRequests.filter(r => r.status === 'Fulfilled').length / mockBloodRequests.length) * 100);

    const iS = { width: '100%', background: '#0A0A12', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '11px 14px', fontFamily: 'var(--font-body)', fontSize: 14, color: '#fff', outline: 'none', boxSizing: 'border-box', marginTop: 8 };
    const lS = { display: 'block', fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 18, marginBottom: 4 };

    const handleSave = () => { setSaved(true); setEditing(false); setTimeout(() => setSaved(false), 2500); };

    return (
        <HospitalLayout title="Profile" page="PROFILE">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    style={{ background: 'linear-gradient(135deg,rgba(217,0,37,0.08) 0%,rgba(255,255,255,0.02) 100%)', border: '1px solid rgba(217,0,37,0.2)', borderRadius: 20, padding: '36px 40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
                        <div style={{ width: 80, height: 80, borderRadius: 20, background: 'rgba(217,0,37,0.1)', border: '1px solid rgba(217,0,37,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Building2 size={36} color="var(--red)" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, color: '#fff', lineHeight: 1, letterSpacing: '0.02em' }}>{name}</div>
                            <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                                <span style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 100, padding: '3px 10px', fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)' }}>HOSPITAL</span>
                                <span style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 100, padding: '3px 10px', fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)' }}>{city}</span>
                            </div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', marginTop: 8 }}>ID: {mockHospital.hospital_id} · {beds} Beds · Kerala</div>
                        </div>
                        <button onClick={() => setEditing(true)} style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'none', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '10px 18px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text2)' }}>
                            <Edit2 size={14} /> Edit Profile
                        </button>
                    </div>
                </motion.div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    {TABS.map((t, i) => (
                        <button key={t} onClick={() => setTab(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '12px 24px', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: tab === i ? 600 : 400, color: tab === i ? '#fff' : 'var(--text3)', borderBottom: `2px solid ${tab === i ? 'var(--red)' : 'transparent'}`, transition: 'all 0.2s' }}>{t}</button>
                    ))}
                </div>

                {tab === 0 && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                        {/* Edit form */}
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28 }}>
                            <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: 4 }}>Hospital Information</div>
                            {saved && <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 8, padding: '8px 14px', fontFamily: 'var(--font-mono)', fontSize: 11, color: '#22c55e', marginTop: 10 }}>✓ Changes saved successfully</div>}
                            <label style={lS}>HOSPITAL NAME</label>
                            <input value={name} onChange={e => setName(e.target.value)} disabled={!editing} style={{ ...iS, opacity: editing ? 1 : 0.6 }} />
                            <label style={lS}>CITY / DISTRICT</label>
                            <input value={city} onChange={e => setCity(e.target.value)} disabled={!editing} style={{ ...iS, opacity: editing ? 1 : 0.6 }} />
                            <label style={lS}>CONTACT NUMBER</label>
                            <input value={contact} onChange={e => setContact(e.target.value)} disabled={!editing} style={{ ...iS, opacity: editing ? 1 : 0.6 }} />
                            <label style={lS}>NUMBER OF BEDS</label>
                            <input type="number" value={beds} onChange={e => setBeds(e.target.value)} disabled={!editing} style={{ ...iS, opacity: editing ? 1 : 0.6 }} />
                            <label style={lS}>DEPARTMENTS</label>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                                {depts.map(d => (
                                    <span key={d} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 100, padding: '4px 12px', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text2)' }}>
                                        {d}
                                        {editing && <button onClick={() => setDepts(depts.filter(x => x !== d))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text3)', fontSize: 14, lineHeight: 1, padding: 0 }}>×</button>}
                                    </span>
                                ))}
                                {editing && ALL_DEPTS.filter(d => !depts.includes(d)).map(d => (
                                    <button key={d} onClick={() => setDepts([...depts, d])} style={{ background: 'none', border: '1px dashed rgba(255,255,255,0.15)', borderRadius: 100, padding: '4px 12px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text3)' }}>+ {d}</button>
                                ))}
                            </div>
                            {editing && <button onClick={handleSave} style={{ marginTop: 20, background: 'var(--red)', border: 'none', borderRadius: 10, padding: '12px 24px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: '#fff' }}>Save Changes</button>}
                        </motion.div>
                        {/* Summary */}
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.07 }} style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28 }}>
                            <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: 16 }}>Hospital Summary</div>
                            <InfoRow label="Hospital ID" value={mockHospital.hospital_id} />
                            <InfoRow label="City" value={city} />
                            <InfoRow label="Contact" value={contact} />
                            <InfoRow label="Beds" value={String(beds)} />
                            <InfoRow label="Active Patients" value={String(mockPatients.length)} />
                            <InfoRow label="Total Requests" value={String(mockBloodRequests.length)} />
                            <InfoRow label="Fulfillment Rate" value={fulfillRate + '%'} />
                            <InfoRow label="Member Since" value="2024" />
                            <button style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 7, background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 18px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text2)' }}>
                                <Download size={14} /> Download Hospital Report
                            </button>
                        </motion.div>
                    </div>
                )}

                {tab === 1 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {/* Security */}
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28 }}>
                            <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: 20 }}>Security</div>
                            {[['Change Password', 'Last changed 3 months ago'], ['Phone Verification', 'Verified · +91 471 234 5678']].map(([label, sub]) => (
                                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                    <div><div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#fff' }}>{label}</div><div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', marginTop: 2 }}>{sub}</div></div>
                                    <button style={{ background: 'none', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text2)' }}>Manage</button>
                                </div>
                            ))}
                        </motion.div>
                        {/* Notifications */}
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28 }}>
                            <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: 20 }}>Notifications</div>
                            {[['emergency', 'Emergency Request Alerts', 'Immediate notifications for emergency blood requests'], ['updates', 'Request Status Updates', 'Updates when request status changes'], ['payments', 'Payment Reminders', 'Reminders for pending payments'], ['stock', 'Blood Bank Stock Alerts', 'Alerts when partner bank stock is critical'], ['whatsapp', 'WhatsApp Notifications', 'Notifications via WhatsApp']].map(([key, label, sub]) => (
                                <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                    <div><div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#fff' }}>{label}</div><div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', marginTop: 2 }}>{sub}</div></div>
                                    <Toggle on={notifs[key]} onChange={v => setNotifs(n => ({ ...n, [key]: v }))} />
                                </div>
                            ))}
                        </motion.div>
                        {/* Connected Banks */}
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28 }}>
                            <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: 20 }}>Connected Blood Banks</div>
                            {mockHospitalBanks.map(bank => (
                                <div key={bank.bank_id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                    <div><div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#fff' }}>{bank.bank_name}</div><div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', marginTop: 2 }}>{bank.city} · {bank.distance_km} km</div></div>
                                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                        <span style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 100, padding: '2px 8px', fontFamily: 'var(--font-mono)', fontSize: 9, color: '#22c55e' }}>CONNECTED</span>
                                        <button style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '5px 12px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text3)' }}>Disconnect</button>
                                    </div>
                                </div>
                            ))}
                            <button style={{ marginTop: 12, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--red)', padding: 0 }}>+ Add Blood Bank</button>
                        </motion.div>
                        {/* Danger zone */}
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} style={{ background: 'rgba(217,0,37,0.04)', border: '1px solid rgba(217,0,37,0.2)', borderRadius: 20, padding: 28 }}>
                            <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 18, color: 'var(--red)', marginBottom: 8 }}>Danger Zone</div>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text3)', marginBottom: 20 }}>Irreversible actions. Proceed with caution.</div>
                            <button style={{ background: 'rgba(217,0,37,0.1)', border: '1px solid rgba(217,0,37,0.3)', borderRadius: 10, padding: '11px 20px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: 'var(--red)' }}>Deactivate Account</button>
                        </motion.div>
                    </div>
                )}
            </div>
        </HospitalLayout>
    );
}
