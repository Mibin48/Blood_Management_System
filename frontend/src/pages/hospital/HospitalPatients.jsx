import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, List, Search, X, Check } from 'lucide-react';
import HospitalLayout from '../../components/hospital/HospitalLayout';
import BloodGroupBadge from '../../components/hospital/BloodGroupBadge';
import { mockPatients, mockBloodRequests } from '../../data/hospitalMockData';

const WARDS = ['All', 'Emergency', 'Surgery', 'Oncology', 'Maternity'];
const STATUSES = ['All', 'Critical', 'Stable', 'Admitted'];
const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
const ALL_WARDS = ['Emergency', 'Surgery', 'Oncology', 'Maternity', 'ICU', 'General'];

function avatarBg(bg) { if (bg.startsWith('A')) return 'rgba(99,102,241,0.35)'; if (bg.startsWith('B')) return 'rgba(34,197,94,0.25)'; if (bg.startsWith('O')) return 'rgba(217,0,37,0.25)'; return 'rgba(168,85,247,0.3)'; }
function statusStyle(s) {
    if (s === 'Critical') return { bg: 'rgba(217,0,37,0.1)', border: 'rgba(217,0,37,0.3)', color: 'var(--red)', pulse: true };
    if (s === 'Stable') return { bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.25)', color: '#22c55e', pulse: false };
    return { bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.1)', color: 'var(--text3)', pulse: false };
}
function fmt(d) { return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }); }
function initials(name) { return name.split(' ').slice(0, 2).map(n => n[0]).join(''); }

function AddPatientModal({ onClose }) {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('Male');
    const [bg, setBg] = useState('');
    const [ward, setWard] = useState('Emergency');
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const iS = { width: '100%', background: '#0A0A12', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '11px 14px', fontFamily: 'var(--font-body)', fontSize: 14, color: '#fff', outline: 'none', boxSizing: 'border-box' };
    const lS = { display: 'block', fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8, marginTop: 14 };
    const handleSubmit = () => { setLoading(true); setTimeout(() => { setLoading(false); setDone(true); }, 1500); };
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
            onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
            <motion.div initial={{ scale: 0.93, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.93, opacity: 0 }}
                style={{ background: '#0F0F17', border: '1px solid rgba(217,0,37,0.2)', borderRadius: 20, padding: 40, width: '100%', maxWidth: 460, position: 'relative' }}>
                <button onClick={onClose} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} color="var(--text3)" /></button>
                {done ? (
                    <div style={{ textAlign: 'center', padding: '32px 0' }}>
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}
                            style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                            <Check size={28} color="#22c55e" />
                        </motion.div>
                        <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 800, fontSize: 22, color: '#fff', marginBottom: 8 }}>Patient Added!</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--red)', marginBottom: 24 }}>PAT-2024-006 created</div>
                        <button onClick={onClose} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '10px 28px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)' }}>Close</button>
                    </div>
                ) : (
                    <>
                        <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 24, color: '#fff', marginBottom: 6 }}>Add Patient</div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text3)' }}>Register a new patient to the system.</div>
                        <label style={lS}>PATIENT NAME</label>
                        <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name" style={iS} />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                            <div><label style={lS}>AGE</label><input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Age" style={iS} /></div>
                            <div><label style={lS}>GENDER</label><select value={gender} onChange={e => setGender(e.target.value)} style={{ ...iS, cursor: 'pointer' }}>{['Male', 'Female', 'Other'].map(g => <option key={g} style={{ background: '#0F0F17' }}>{g}</option>)}</select></div>
                        </div>
                        <label style={lS}>BLOOD GROUP</label>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                            {BLOOD_TYPES.map(b => <button key={b} onClick={() => setBg(b)} style={{ padding: '5px 10px', borderRadius: 8, cursor: 'pointer', background: bg === b ? 'var(--red)' : 'rgba(255,255,255,0.05)', border: `1px solid ${bg === b ? 'var(--red)' : 'rgba(255,255,255,0.1)'}`, fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 11, color: '#fff' }}>{b}</button>)}
                        </div>
                        <label style={lS}>WARD</label>
                        <select value={ward} onChange={e => setWard(e.target.value)} style={{ ...iS, cursor: 'pointer' }}>
                            {ALL_WARDS.map(w => <option key={w} style={{ background: '#0F0F17' }}>{w}</option>)}
                        </select>
                        <label style={lS}>ADMITTED ON</label>
                        <input type="date" value={date} onChange={e => setDate(e.target.value)} style={iS} />
                        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                            <button onClick={onClose} style={{ flex: 1, background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '12px 0', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)' }}>Cancel</button>
                            <button onClick={handleSubmit} disabled={loading} style={{ flex: 2, background: 'var(--red)', border: 'none', borderRadius: 10, padding: '12px 0', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: '#fff', opacity: loading ? 0.7 : 1 }}>
                                {loading ? 'Adding...' : 'Add Patient →'}
                            </button>
                        </div>
                    </>
                )}
            </motion.div>
        </motion.div>
    );
}

export default function HospitalPatients() {
    const [view, setView] = useState('grid');
    const [ward, setWard] = useState('All');
    const [status, setStatus] = useState('All');
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);

    const filtered = mockPatients.filter(p => {
        const mw = ward === 'All' || p.ward === ward;
        const ms = status === 'All' || p.status === status;
        const mq = p.name.toLowerCase().includes(search.toLowerCase()) || p.patient_id.toLowerCase().includes(search.toLowerCase());
        return mw && ms && mq;
    });
    const criticalCount = mockPatients.filter(p => p.status === 'Critical').length;

    return (
        <HospitalLayout title="Patients" page="PATIENTS">
            <AnimatePresence>{showModal && <AddPatientModal onClose={() => setShowModal(false)} />}</AnimatePresence>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
                    {[{ label: 'TOTAL PATIENTS', val: mockPatients.length, color: '#fff' }, { label: 'CRITICAL PATIENTS', val: criticalCount, color: 'var(--red)' }, { label: 'BLOOD REQUESTS', val: mockBloodRequests.length, color: '#fff' }].map(({ label, val, color }, i) => (
                        <motion.div key={label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.07 }}
                            style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 24 }}>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>{label}</div>
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: 52, color, lineHeight: 1 }}>{val}</div>
                            {label === 'CRITICAL PATIENTS' && val > 0 && <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--red)', animation: 'pulse 1.2s infinite' }} /><span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--red)' }}>IMMEDIATE ATTENTION</span></div>}
                        </motion.div>
                    ))}
                </div>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 20, color: '#fff' }}>All Patients</div>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <button onClick={() => setView('grid')} style={{ background: view === 'grid' ? 'rgba(217,0,37,0.12)' : 'none', border: `1px solid ${view === 'grid' ? 'rgba(217,0,37,0.3)' : 'rgba(255,255,255,0.1)'}`, borderRadius: 8, padding: '7px', cursor: 'pointer', color: view === 'grid' ? 'var(--red)' : 'var(--text3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><LayoutGrid size={16} /></button>
                        <button onClick={() => setView('table')} style={{ background: view === 'table' ? 'rgba(217,0,37,0.12)' : 'none', border: `1px solid ${view === 'table' ? 'rgba(217,0,37,0.3)' : 'rgba(255,255,255,0.1)'}`, borderRadius: 8, padding: '7px', cursor: 'pointer', color: view === 'table' ? 'var(--red)' : 'var(--text3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><List size={16} /></button>
                        <button onClick={() => setShowModal(true)} style={{ background: 'var(--red)', border: 'none', cursor: 'pointer', borderRadius: 10, padding: '10px 18px', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: '#fff', boxShadow: '0 2px 12px rgba(217,0,37,0.3)' }}>＋ Add Patient</button>
                    </div>
                </div>
                {/* Filters */}
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {WARDS.map(w => <button key={w} onClick={() => setWard(w)} style={{ background: ward === w ? 'var(--red)' : 'rgba(255,255,255,0.05)', border: `1px solid ${ward === w ? 'var(--red)' : 'rgba(255,255,255,0.1)'}`, borderRadius: 100, padding: '5px 12px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 11, color: ward === w ? '#fff' : 'var(--text2)' }}>{w}</button>)}
                    </div>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {STATUSES.map(s => <button key={s} onClick={() => setStatus(s)} style={{ background: status === s ? 'rgba(217,0,37,0.12)' : 'rgba(255,255,255,0.03)', border: `1px solid ${status === s ? 'rgba(217,0,37,0.3)' : 'rgba(255,255,255,0.08)'}`, borderRadius: 100, padding: '5px 12px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 11, color: status === s ? 'var(--red)' : 'var(--text3)' }}>{s}</button>)}
                    </div>
                    <div style={{ flex: 1, minWidth: 180, position: 'relative' }}>
                        <Search size={14} color="var(--text3)" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search patient name or ID..."
                            style={{ width: '100%', background: '#0F0F17', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '9px 12px 9px 38px', fontFamily: 'var(--font-body)', fontSize: 13, color: '#fff', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                </div>
                {/* Grid view */}
                {view === 'grid' ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
                        {filtered.map((p, i) => {
                            const sts = statusStyle(p.status);
                            return (
                                <motion.div key={p.patient_id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: i * 0.06 }}
                                    whileHover={{ borderColor: 'rgba(217,0,37,0.35)', boxShadow: '0 0 20px rgba(217,0,37,0.08)', y: -3 }}
                                    style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 24, transition: 'all 0.2s' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                                        <div style={{ width: 44, height: 44, borderRadius: '50%', background: avatarBg(p.blood_group), display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 16, color: '#fff', letterSpacing: 1 }}>{initials(p.name)}</div>
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: sts.bg, border: `1px solid ${sts.border}`, borderRadius: 100, padding: '2px 8px', fontFamily: 'var(--font-mono)', fontSize: 9, color: sts.color }}>
                                            {sts.pulse && <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--red)', animation: 'pulse 1.2s infinite' }} />}
                                            {p.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 16, color: '#fff', marginBottom: 3 }}>{p.name}</div>
                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', marginBottom: 6 }}>{p.patient_id}</div>
                                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text2)', marginBottom: 14 }}>{p.age} yrs · {p.gender}</div>
                                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
                                        <BloodGroupBadge group={p.blood_group} small />
                                        <span style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 100, padding: '3px 10px', fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)' }}>{p.ward}</span>
                                    </div>
                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', marginBottom: 14 }}>Admitted: {fmt(p.admitted_on)}</div>
                                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--red)', padding: 0 }}>View Requests →</button>
                                </motion.div>
                            );
                        })}
                    </div>
                ) : (
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr 50px 70px 90px 100px 110px 100px 80px', gap: 12, marginBottom: 10, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                            {['#', 'NAME', 'AGE', 'GENDER', 'BLOOD GRP', 'WARD', 'ADMITTED', 'STATUS', 'REQUESTS'].map(h => <div key={h} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</div>)}
                        </div>
                        {filtered.map((p, i) => {
                            const sts = statusStyle(p.status);
                            const reqCount = mockBloodRequests.filter(r => r.patient_id === p.patient_id).length;
                            return (
                                <div key={p.patient_id}
                                    style={{ display: 'grid', gridTemplateColumns: '40px 1fr 50px 70px 90px 100px 110px 100px 80px', gap: 12, alignItems: 'center', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.15s' }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text3)' }}>0{i + 1}</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: avatarBg(p.blood_group), display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 12, color: '#fff', flexShrink: 0 }}>{initials(p.name)}</div>
                                        <div><div style={{ fontFamily: 'var(--font-sub)', fontWeight: 600, fontSize: 14, color: '#fff' }}>{p.name}</div><div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)' }}>{p.patient_id}</div></div>
                                    </div>
                                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#fff' }}>{p.age}</div>
                                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text2)' }}>{p.gender}</div>
                                    <BloodGroupBadge group={p.blood_group} small />
                                    <span style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 100, padding: '3px 10px', fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)' }}>{p.ward}</span>
                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)' }}>{fmt(p.admitted_on)}</div>
                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: sts.bg, border: `1px solid ${sts.border}`, borderRadius: 100, padding: '2px 8px', fontFamily: 'var(--font-mono)', fontSize: 9, color: sts.color }}>
                                        {sts.pulse && <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--red)', animation: 'pulse 1.2s infinite' }} />}
                                        {p.status.toUpperCase()}
                                    </span>
                                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--red)' }}>{reqCount} req →</button>
                                </div>
                            );
                        })}
                    </motion.div>
                )}
            </div>
        </HospitalLayout>
    );
}
