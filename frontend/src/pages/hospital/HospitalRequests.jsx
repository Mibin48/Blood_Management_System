import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Droplets, ChevronDown, ChevronUp, X, Check } from 'lucide-react';
import HospitalLayout from '../../components/hospital/HospitalLayout';
import PriorityBadge from '../../components/hospital/PriorityBadge';
import StatusBadge from '../../components/hospital/StatusBadge';
import BloodGroupBadge from '../../components/hospital/BloodGroupBadge';
import { mockBloodRequests, mockPatients, mockBloodIssues, mockPayments, mockHospitalBanks } from '../../data/hospitalMockData';

const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
const WARDS = ['Emergency', 'Surgery', 'Oncology', 'Maternity', 'ICU'];
function fmt(d) { return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }); }

function NewRequestModal({ onClose }) {
    const [patientId, setPatientId] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [units, setUnits] = useState(1);
    const [bankId, setBankId] = useState('BNK-001');
    const [priority, setPriority] = useState('Routine');
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const selectedPatient = mockPatients.find(p => p.patient_id === patientId);
    const handleSubmit = () => { setLoading(true); setTimeout(() => { setLoading(false); setDone(true); }, 1500); };
    const iS = { width: '100%', background: '#0A0A12', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '11px 14px', fontFamily: 'var(--font-body)', fontSize: 14, color: '#fff', outline: 'none', boxSizing: 'border-box' };
    const lS = { display: 'block', fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8, marginTop: 16 };
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
            onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
            <motion.div initial={{ scale: 0.93, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.93, opacity: 0 }}
                style={{ background: '#0F0F17', border: '1px solid rgba(217,0,37,0.2)', borderRadius: 20, padding: 40, width: '100%', maxWidth: 500, maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
                <button onClick={onClose} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} color="var(--text3)" /></button>
                {done ? (
                    <div style={{ textAlign: 'center', padding: '32px 0' }}>
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}
                            style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                            <Check size={28} color="#22c55e" />
                        </motion.div>
                        <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 800, fontSize: 22, color: '#fff', marginBottom: 8 }}>Request Submitted!</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--red)', marginBottom: 24 }}>REQ-2025-006 created</div>
                        <button onClick={onClose} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '10px 28px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)' }}>Close</button>
                    </div>
                ) : (
                    <>
                        <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 24, color: '#fff', marginBottom: 6 }}>New Blood Request</div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text3)' }}>Fill in details to submit a request.</div>
                        <label style={lS}>PATIENT</label>
                        <select value={patientId} onChange={e => { setPatientId(e.target.value); const p = mockPatients.find(x => x.patient_id === e.target.value); if (p) setBloodGroup(p.blood_group); }} style={{ ...iS, cursor: 'pointer' }}>
                            <option value="" style={{ background: '#0F0F17' }}>Select patient...</option>
                            {mockPatients.map(p => <option key={p.patient_id} value={p.patient_id} style={{ background: '#0F0F17' }}>{p.name} · {p.blood_group} · {p.ward}</option>)}
                        </select>
                        {selectedPatient && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                                style={{ background: '#0A0A12', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: 14, marginTop: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                                {[['Name', selectedPatient.name], ['Age', selectedPatient.age + ' yrs'], ['Gender', selectedPatient.gender], ['Ward', selectedPatient.ward]].map(([l, v]) => (
                                    <div key={l}><div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', marginBottom: 2 }}>{l}</div><div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#fff' }}>{v}</div></div>
                                ))}
                            </motion.div>
                        )}
                        <label style={lS}>BLOOD GROUP</label>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {BLOOD_TYPES.map(b => <button key={b} onClick={() => setBloodGroup(b)} style={{ padding: '6px 12px', borderRadius: 8, cursor: 'pointer', background: bloodGroup === b ? 'var(--red)' : 'rgba(255,255,255,0.05)', border: `1px solid ${bloodGroup === b ? 'var(--red)' : 'rgba(255,255,255,0.1)'}`, fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 12, color: '#fff' }}>{b}</button>)}
                        </div>
                        <label style={lS}>UNITS REQUIRED</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <button onClick={() => setUnits(u => Math.max(1, u - 1))} style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, cursor: 'pointer', color: '#fff', fontSize: 18 }}>−</button>
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: '#fff', minWidth: 32, textAlign: 'center' }}>{units}</div>
                            <button onClick={() => setUnits(u => Math.min(10, u + 1))} style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, cursor: 'pointer', color: '#fff', fontSize: 18 }}>+</button>
                        </div>
                        <label style={lS}>BLOOD BANK</label>
                        {mockHospitalBanks.map(bank => (
                            <div key={bank.bank_id} onClick={() => setBankId(bank.bank_id)}
                                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderRadius: 10, marginBottom: 6, cursor: 'pointer', background: bankId === bank.bank_id ? 'rgba(217,0,37,0.08)' : 'rgba(255,255,255,0.03)', border: `1px solid ${bankId === bank.bank_id ? 'rgba(217,0,37,0.3)' : 'rgba(255,255,255,0.08)'}`, transition: 'all 0.15s' }}>
                                <div>
                                    <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 600, fontSize: 13, color: '#fff' }}>{bank.bank_name}</div>
                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)' }}>{bank.city} · {bank.distance_km} km</div>
                                </div>
                                {bloodGroup && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#22c55e' }}>{bank.stock[bloodGroup] || 0} avail.</div>}
                            </div>
                        ))}
                        <label style={lS}>PRIORITY</label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 16 }}>
                            {['Emergency', 'Urgent', 'Routine'].map(p => (
                                <div key={p} onClick={() => setPriority(p)} style={{ padding: '12px', borderRadius: 12, cursor: 'pointer', textAlign: 'center', background: priority === p ? 'rgba(217,0,37,0.08)' : 'rgba(255,255,255,0.03)', border: `1px solid ${priority === p ? 'rgba(217,0,37,0.35)' : 'rgba(255,255,255,0.08)'}`, transition: 'all 0.15s' }}>
                                    <PriorityBadge priority={p} />
                                </div>
                            ))}
                        </div>
                        {priority === 'Emergency' && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--red)', marginBottom: 14 }}>⚠ Notifies blood bank immediately</div>}
                        <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Clinical notes (optional)..." rows={2}
                            style={{ width: '100%', background: '#0A0A12', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '11px 14px', fontFamily: 'var(--font-body)', fontSize: 13, color: '#fff', outline: 'none', resize: 'none', boxSizing: 'border-box', marginBottom: 24 }} />
                        <div style={{ display: 'flex', gap: 12 }}>
                            <button onClick={onClose} style={{ flex: 1, background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '12px 0', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)' }}>Cancel</button>
                            <button onClick={handleSubmit} disabled={loading} style={{ flex: 2, background: 'var(--red)', border: 'none', borderRadius: 10, padding: '12px 0', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: '#fff', opacity: loading ? 0.7 : 1 }}>
                                {loading ? 'Submitting...' : 'Submit Request →'}
                            </button>
                        </div>
                    </>
                )}
            </motion.div>
        </motion.div>
    );
}

function RequestRow({ req }) {
    const [open, setOpen] = useState(false);
    const issue = mockBloodIssues.find(i => i.request_id === req.request_id);
    const patient = mockPatients.find(p => p.patient_id === req.patient_id);
    return (
        <>
            <div onClick={() => setOpen(v => !v)}
                style={{ display: 'grid', gridTemplateColumns: '110px 1fr 90px 55px 1fr 110px 120px 80px 28px', gap: 10, alignItems: 'center', padding: '15px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <div><div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#fff' }}>{req.request_id}</div><div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', marginTop: 2 }}>{new Date(req.request_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</div></div>
                <div><div style={{ fontFamily: 'var(--font-sub)', fontWeight: 600, fontSize: 14, color: '#fff' }}>{req.patient_name}</div><div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)' }}>{req.ward}</div></div>
                <BloodGroupBadge group={req.blood_group} small />
                <div><div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: '#fff', lineHeight: 1 }}>{req.units_required}</div><div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--text3)' }}>UNITS</div></div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{req.bank_name}</div>
                <PriorityBadge priority={req.priority} />
                <StatusBadge status={req.status} />
                <div>{req.priority === 'Emergency' && req.status === 'Pending' ? <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--red)', animation: 'pulse 1.2s infinite' }}>URGENT</span> : req.status === 'Fulfilled' ? <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text3)' }}>View</span> : <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text3)' }}>Track</span>}</div>
                <div>{open ? <ChevronUp size={13} color="var(--text3)" /> : <ChevronDown size={13} color="var(--text3)" />}</div>
            </div>
            <AnimatePresence>
                {open && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }} style={{ overflow: 'hidden' }}>
                        <div style={{ background: 'rgba(217,0,37,0.03)', borderLeft: '3px solid rgba(217,0,37,0.4)', paddingLeft: 20, paddingBottom: 20, paddingTop: 16, marginBottom: 4 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                                <div>
                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>PATIENT DETAILS</div>
                                    {patient && [['Age', patient.age + ' yrs'], ['Gender', patient.gender], ['Ward', patient.ward], ['Blood Group', patient.blood_group]].map(([l, v]) => (
                                        <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)' }}>{l}</span>
                                            <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#fff' }}>{v}</span>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>BLOOD ISSUE</div>
                                    {issue ? [['Issue ID', issue.issue_id], ['Date', fmt(issue.issue_date)], ['Units', issue.units_issued]].map(([l, v]) => (
                                        <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)' }}>{l}</span>
                                            <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#fff' }}>{v}</span>
                                        </div>
                                    )) : <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text3)' }}>Not yet issued</div>}
                                </div>
                                <div>
                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>TIMELINE</div>
                                    {[{ label: 'Requested', done: true, date: req.request_date }, { label: 'Processing', done: req.status !== 'Pending', date: req.status !== 'Pending' ? req.request_date : null }, { label: 'Fulfilled', done: !!issue, date: issue?.issue_date || null }].map(step => (
                                        <div key={step.label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: step.done ? '#22c55e' : 'rgba(255,255,255,0.15)', flexShrink: 0 }} />
                                            <div><div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: step.done ? '#fff' : 'var(--text3)' }}>{step.label}</div>{step.date && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)' }}>{fmt(step.date)}</div>}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

const STAT_TABS = ['All', 'Pending', 'Processing', 'Fulfilled', 'Cancelled'];
const PRIO_TABS = ['All', 'Emergency', 'Urgent', 'Routine'];

export default function HospitalRequests() {
    const [statusFilter, setStatusFilter] = useState('All');
    const [prioFilter, setPrioFilter] = useState('All');
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);

    const filtered = mockBloodRequests.filter(r => {
        const ms = statusFilter === 'All' || r.status === statusFilter;
        const mp = prioFilter === 'All' || r.priority === prioFilter;
        const mq = r.request_id.toLowerCase().includes(search.toLowerCase()) || r.patient_name.toLowerCase().includes(search.toLowerCase());
        return ms && mp && mq;
    });
    const counts = {};
    mockBloodRequests.forEach(r => { counts[r.status] = (counts[r.status] || 0) + 1; });
    const ePending = mockBloodRequests.filter(r => r.priority === 'Emergency' && r.status === 'Pending').length;

    return (
        <HospitalLayout title="Blood Requests" page="REQUESTS">
            <AnimatePresence>{showModal && <NewRequestModal onClose={() => setShowModal(false)} />}</AnimatePresence>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
                    {[{ label: 'TOTAL REQUESTS', val: mockBloodRequests.length, color: '#fff' }, { label: 'FULFILLED', val: counts.Fulfilled || 0, color: '#22c55e' }, { label: 'PENDING', val: (counts.Pending || 0) + (counts.Processing || 0), color: '#f59e0b' }, { label: 'EMERGENCY ACTIVE', val: ePending, color: 'var(--red)' }].map(({ label, val, color }, i) => (
                        <motion.div key={label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.07 }}
                            style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 24 }}>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>{label}</div>
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: 52, color, lineHeight: 1 }}>{val}</div>
                        </motion.div>
                    ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 20, color: '#fff' }}>All Blood Requests</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', marginTop: 3 }}>{mockBloodRequests.length} total · {counts.Pending || 0} pending · {counts.Fulfilled || 0} fulfilled</div>
                    </div>
                    <button onClick={() => setShowModal(true)} style={{ background: 'var(--red)', border: 'none', cursor: 'pointer', borderRadius: 10, padding: '11px 20px', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: '#fff', boxShadow: '0 2px 12px rgba(217,0,37,0.35)' }}>＋ New Request</button>
                </div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {STAT_TABS.map(t => <button key={t} onClick={() => setStatusFilter(t)} style={{ background: statusFilter === t ? 'var(--red)' : 'rgba(255,255,255,0.05)', border: `1px solid ${statusFilter === t ? 'var(--red)' : 'rgba(255,255,255,0.1)'}`, borderRadius: 100, padding: '5px 12px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 11, color: statusFilter === t ? '#fff' : 'var(--text2)' }}>{t}{counts[t] ? ' (' + counts[t] + ')' : ''}</button>)}
                    </div>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {PRIO_TABS.map(t => <button key={t} onClick={() => setPrioFilter(t)} style={{ background: prioFilter === t ? 'rgba(217,0,37,0.15)' : 'rgba(255,255,255,0.03)', border: `1px solid ${prioFilter === t ? 'rgba(217,0,37,0.35)' : 'rgba(255,255,255,0.08)'}`, borderRadius: 100, padding: '5px 12px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 11, color: prioFilter === t ? 'var(--red)' : 'var(--text3)' }}>{t}</button>)}
                    </div>
                    <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
                        <Search size={14} color="var(--text3)" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search patient, request ID..."
                            style={{ width: '100%', background: '#0F0F17', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '9px 12px 9px 38px', fontFamily: 'var(--font-body)', fontSize: 13, color: '#fff', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                </div>
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
                    style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr 90px 55px 1fr 110px 120px 80px 28px', gap: 10, padding: '0 0 10px', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: 4 }}>
                        {['REQUEST ID', 'PATIENT', 'BLOOD GRP', 'UNITS', 'BANK', 'PRIORITY', 'STATUS', 'ACTION', ''].map(h => (
                            <div key={h} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</div>
                        ))}
                    </div>
                    {filtered.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '48px 0' }}>
                            <Droplets size={48} color="var(--text3)" style={{ margin: '0 auto 16px', display: 'block' }} />
                            <div style={{ fontFamily: 'var(--font-body)', color: 'var(--text3)' }}>No requests found. Adjust filters or create a new request.</div>
                        </div>
                    ) : filtered.map(req => <RequestRow key={req.request_id} req={req} />)}
                </motion.div>
            </div>
        </HospitalLayout>
    );
}
