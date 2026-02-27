import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Clock, Building2, Users, X, Check } from 'lucide-react';
import DonorLayout from '../../components/donor/DonorLayout';
import { EligibilityBadge } from '../../components/donor/DonorSidebar';
import { mockDonor, mockBloodBanks, mockCamps } from '../../data/mockData';

function fmt(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

const TIME_SLOTS = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];

function BookingModal({ bank, onClose }) {
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [done, setDone] = useState(false);

    const today = new Date();
    const days = Array.from({ length: 14 }, (_, i) => {
        const d = new Date(today);
        d.setDate(d.getDate() + i);
        return d;
    });

    const handleConfirm = () => {
        if (date && time) setDone(true);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
            onClick={e => { if (e.target === e.currentTarget) onClose(); }}
        >
            <motion.div
                initial={{ scale: 0.92, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.92, opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ background: '#0F0F17', border: '1px solid rgba(217,0,37,0.2)', borderRadius: 20, padding: 40, width: '100%', maxWidth: 480, position: 'relative' }}
            >
                <button onClick={onClose} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', cursor: 'pointer' }}>
                    <X size={20} color="var(--text3)" />
                </button>

                {done ? (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '20px 0' }}>
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}
                            style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                            <Check size={32} color="#22c55e" />
                        </motion.div>
                        <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 800, fontSize: 24, color: '#fff', marginBottom: 8 }}>Appointment Booked!</div>
                        <div style={{ fontFamily: 'var(--font-body)', color: 'var(--text2)', marginBottom: 16 }}>{bank?.bank_name}</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--red)', marginBottom: 28 }}>
                            {date?.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })} · {time}
                        </div>
                        <button onClick={onClose} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '10px 24px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)' }}>
                            Close
                        </button>
                    </motion.div>
                ) : (
                    <>
                        <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 24, color: '#fff', marginBottom: 6 }}>Book Donation Slot</div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text3)', marginBottom: 28 }}>{bank?.bank_name}</div>

                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>SELECT DATE</div>
                        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 24, paddingBottom: 4 }}>
                            {days.map((d, i) => (
                                <button key={i} onClick={() => setDate(d)} style={{
                                    flexShrink: 0, width: 52, padding: '10px 0', borderRadius: 10, cursor: 'pointer',
                                    background: date?.toDateString() === d.toDateString() ? 'var(--red)' : 'rgba(255,255,255,0.04)',
                                    border: `1px solid ${date?.toDateString() === d.toDateString() ? 'var(--red)' : 'rgba(255,255,255,0.08)'}`,
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                                }}>
                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: date?.toDateString() === d.toDateString() ? '#fff' : 'var(--text3)' }}>
                                        {d.toLocaleDateString('en-IN', { weekday: 'short' }).toUpperCase()}
                                    </span>
                                    <span style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 15, color: date?.toDateString() === d.toDateString() ? '#fff' : 'var(--text2)' }}>
                                        {d.getDate()}
                                    </span>
                                </button>
                            ))}
                        </div>

                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>SELECT TIME</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
                            {TIME_SLOTS.map(t => (
                                <button key={t} onClick={() => setTime(t)} style={{
                                    padding: '8px 14px', borderRadius: 8, cursor: 'pointer',
                                    background: time === t ? 'var(--red)' : 'rgba(255,255,255,0.04)',
                                    border: `1px solid ${time === t ? 'var(--red)' : 'rgba(255,255,255,0.08)'}`,
                                    fontFamily: 'var(--font-mono)', fontSize: 12,
                                    color: time === t ? '#fff' : 'var(--text2)',
                                }}>
                                    {t}
                                </button>
                            ))}
                        </div>

                        <div style={{ display: 'flex', gap: 12 }}>
                            <button onClick={onClose} style={{ flex: 1, background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '12px 0', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text2)' }}>Cancel</button>
                            <button onClick={handleConfirm} disabled={!date || !time} style={{
                                flex: 2, background: date && time ? 'var(--red)' : 'rgba(255,255,255,0.06)',
                                border: 'none', borderRadius: 10, padding: '12px 0', cursor: 'pointer',
                                fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: date && time ? '#fff' : 'var(--text3)',
                            }}>Confirm Booking</button>
                        </div>
                    </>
                )}
            </motion.div>
        </motion.div>
    );
}

export default function DonorSchedule() {
    const [tab, setTab] = useState('bank');
    const [bookingBank, setBookingBank] = useState(null);

    return (
        <DonorLayout title="Schedule Donation" page="SCHEDULE">
            <AnimatePresence>
                {bookingBank && <BookingModal bank={bookingBank} onClose={() => setBookingBank(null)} />}
            </AnimatePresence>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {/* Eligibility Banner */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 16, padding: '20px 28px', display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
                    <div>
                        <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 16, color: '#22c55e', marginBottom: 4 }}>
                            ✓ You are eligible to donate today
                        </div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text3)' }}>
                            Book a slot at any nearby blood bank or upcoming camp below.
                        </div>
                    </div>
                </motion.div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    {[{ id: 'bank', label: 'Book at Blood Bank' }, { id: 'camps', label: 'Upcoming Camps' }].map(t => (
                        <button key={t.id} onClick={() => setTab(t.id)} style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            fontFamily: 'var(--font-sub)', fontWeight: 600, fontSize: 14,
                            color: tab === t.id ? '#fff' : 'var(--text3)',
                            padding: '12px 20px',
                            borderBottom: tab === t.id ? '2px solid var(--red)' : '2px solid transparent',
                            marginBottom: -1, transition: 'all 0.2s',
                        }}>
                            {t.label}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {tab === 'bank' ? (
                        <motion.div key="banks" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                {mockBloodBanks.map(bank => (
                                    <motion.div key={bank.bank_id}
                                        whileHover={{ borderColor: 'rgba(217,0,37,0.35)', boxShadow: '0 0 20px rgba(217,0,37,0.08)' }}
                                        style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column', gap: 14, transition: 'all 0.2s' }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 18, color: '#fff' }}>{bank.bank_name}</div>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                                                <span style={{ background: bank.open ? 'rgba(34,197,94,0.1)' : 'rgba(217,0,37,0.1)', border: `1px solid ${bank.open ? 'rgba(34,197,94,0.25)' : 'rgba(217,0,37,0.25)'}`, borderRadius: 100, padding: '2px 8px', fontFamily: 'var(--font-mono)', fontSize: 9, color: bank.open ? '#22c55e' : 'var(--red)' }}>
                                                    {bank.open ? 'OPEN' : 'CLOSED'}
                                                </span>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: bank.stock_status === 'Adequate' ? '#22c55e' : bank.stock_status === 'Low' ? '#f59e0b' : '#ef4444', animation: bank.stock_status === 'Critical' ? 'pulse 1.5s ease-in-out infinite' : 'none' }} />
                                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)' }}>{bank.stock_status}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text2)' }}>
                                                <MapPin size={13} color="var(--text3)" /> {bank.city} · {bank.distance_km} km away
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text2)' }}>
                                                <Phone size={13} color="var(--text3)" /> {bank.contact_number}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text2)' }}>
                                                <Clock size={13} color="var(--text3)" /> Mon–Sat: 8am–6pm
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => bank.open && setBookingBank(bank)}
                                            disabled={!bank.open}
                                            style={{
                                                width: '100%', background: bank.open ? 'var(--red)' : 'rgba(255,255,255,0.05)',
                                                border: 'none', borderRadius: 10, padding: '12px 0', cursor: bank.open ? 'pointer' : 'not-allowed',
                                                fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600,
                                                color: bank.open ? '#fff' : 'var(--text3)', marginTop: 4,
                                            }}>
                                            {bank.open ? 'Book Appointment' : 'Currently Closed'}
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div key="camps" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                {mockCamps.map(camp => {
                                    const pct = Math.round((camp.booked / camp.slots) * 100);
                                    return (
                                        <motion.div key={camp.camp_id}
                                            whileHover={{ borderColor: 'rgba(217,0,37,0.3)' }}
                                            style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 24, transition: 'all 0.2s' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                                                <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 18, color: '#fff' }}>{camp.name}</div>
                                                <span style={{ background: 'rgba(217,0,37,0.1)', border: '1px solid rgba(217,0,37,0.3)', borderRadius: 100, padding: '4px 12px', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--red)', whiteSpace: 'nowrap', marginLeft: 12 }}>
                                                    {fmt(camp.date)}
                                                </span>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text2)' }}>
                                                    <MapPin size={13} color="var(--text3)" /> {camp.location}
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text2)' }}>
                                                    <Building2 size={13} color="var(--text3)" /> {camp.bank_name}
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text2)' }}>
                                                    <Users size={13} color="var(--text3)" /> {camp.booked} / {camp.slots} registered
                                                </div>
                                            </div>
                                            <div style={{ marginBottom: 16 }}>
                                                <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.06)', overflow: 'hidden', marginBottom: 6 }}>
                                                    <div style={{ height: '100%', width: `${pct}%`, background: pct > 80 ? 'var(--red)' : pct > 50 ? '#f59e0b' : '#22c55e', borderRadius: 3, transition: 'width 0.8s ease' }} />
                                                </div>
                                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)' }}>{camp.slots - camp.booked} slots remaining</div>
                                            </div>
                                            <button onClick={() => setBookingBank({ bank_name: camp.name + ' Camp', ...camp })} style={{ background: 'var(--red)', border: 'none', borderRadius: 10, padding: '12px 0', width: '100%', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: '#fff' }}>
                                                Register for Camp →
                                            </button>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </DonorLayout>
    );
}
