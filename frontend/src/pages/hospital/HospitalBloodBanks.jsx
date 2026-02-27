import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Phone } from 'lucide-react';
import HospitalLayout from '../../components/hospital/HospitalLayout';
import BloodGroupBadge from '../../components/hospital/BloodGroupBadge';
import BloodAvailabilityBar from '../../components/hospital/BloodAvailabilityBar';
import { mockHospitalBanks } from '../../data/hospitalMockData';

const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
const DISTRICTS = ['All Districts', 'Thiruvananthapuram', 'Ernakulam', 'Kozhikode', 'Thrissur', 'Kannur'];

// SVG map positions
const BANK_COORDS = { 'Thiruvananthapuram': { x: 25, y: 87 }, 'Ernakulam': { x: 22, y: 58 }, 'Kozhikode': { x: 22, y: 25 } };
const HOSPITAL_COORD = { x: 25, y: 87 };

export default function HospitalBloodBanks() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [district, setDistrict] = useState('All Districts');
    const [bloodType, setBloodType] = useState('');
    const [openOnly, setOpenOnly] = useState(false);
    const [hoveredBank, setHoveredBank] = useState(null);

    const filtered = mockHospitalBanks.filter(b => {
        const mq = b.bank_name.toLowerCase().includes(search.toLowerCase()) || b.city.toLowerCase().includes(search.toLowerCase());
        const md = district === 'All Districts' || b.city === district;
        const mo = !openOnly || b.open;
        const mt = !bloodType || (b.stock[bloodType] > 0);
        return mq && md && mo && mt;
    });

    const stockColor = (units, max) => {
        const pct = units / max;
        return pct > 0.6 ? '#22c55e' : pct > 0.3 ? '#f59e0b' : '#D90025';
    };

    return (
        <HospitalLayout title="Blood Banks" page="BLOOD-BANKS">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {/* Search + filters */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
                        <Search size={16} color="var(--text3)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search blood banks..."
                            style={{ width: '100%', background: '#0F0F17', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '11px 14px 11px 42px', fontFamily: 'var(--font-body)', fontSize: 14, color: '#fff', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <select value={district} onChange={e => setDistrict(e.target.value)}
                        style={{ width: 200, background: '#0F0F17', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '11px 14px', fontFamily: 'var(--font-body)', fontSize: 14, color: '#fff', outline: 'none', cursor: 'pointer' }}>
                        {DISTRICTS.map(d => <option key={d} value={d} style={{ background: '#0F0F17' }}>{d}</option>)}
                    </select>
                    <select value={bloodType} onChange={e => setBloodType(e.target.value)}
                        style={{ width: 140, background: '#0F0F17', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '11px 14px', fontFamily: 'var(--font-body)', fontSize: 14, color: '#fff', outline: 'none', cursor: 'pointer' }}>
                        <option value="" style={{ background: '#0F0F17' }}>Any Blood Type</option>
                        {BLOOD_TYPES.map(t => <option key={t} value={t} style={{ background: '#0F0F17' }}>{t}</option>)}
                    </select>
                    <button onClick={() => setOpenOnly(v => !v)}
                        style={{ background: openOnly ? 'var(--red)' : 'none', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '11px 18px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 11, color: openOnly ? '#fff' : 'var(--text2)', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
                        Open Now
                    </button>
                </motion.div>

                {/* Kerala Map */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, overflow: 'hidden' }}>
                    <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 16, color: '#fff' }}>Kerala Blood Bank Network</div>
                        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                            {[['★ Your Hospital', '#f59e0b'], ['● Adequate', '#22c55e'], ['● Low Stock', '#f59e0b'], ['● Critical', 'var(--red)']].map(([l, c]) => (
                                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ color: c, fontSize: 12 }}>{l.slice(0, 1)}</span><span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)' }}>{l.slice(2)}</span></div>
                            ))}
                        </div>
                    </div>
                    <div style={{ background: '#0A0A12', padding: 24 }}>
                        <svg viewBox="0 0 100 100" style={{ width: '100%', height: 340, display: 'block' }}>
                            <path d="M30 2 L38 5 L45 10 L48 18 L44 24 L46 30 L42 36 L44 43 L40 50 L36 56 L38 62 L34 68 L30 75 L26 82 L20 88 L16 94 L18 98 L24 98 L28 94 L24 90 L22 84 L26 80 L22 74 L26 70 L30 74 L32 79 L30 85 L34 90 L28 96 L32 98 L36 95 L38 88 L34 82 L36 76 L32 70 L34 64 L30 58 L34 52 L38 46 L42 40 L46 34 L48 26 L44 18 L40 12 L34 6 Z"
                                fill="rgba(217,0,37,0.05)" stroke="rgba(217,0,37,0.18)" strokeWidth="0.5" />
                            {/* Hospital star */}
                            <text x={HOSPITAL_COORD.x} y={HOSPITAL_COORD.y} textAnchor="middle" style={{ fontSize: 8, fill: '#f59e0b', fontWeight: 'bold' }}>★</text>
                            {mockHospitalBanks.map(bank => {
                                const coord = BANK_COORDS[bank.city] || { x: 28, y: 50 };
                                const maxStock = Math.max(...Object.values(bank.stock));
                                const avgPct = Object.values(bank.stock).reduce((s, v) => s + v, 0) / (Object.keys(bank.stock).length * maxStock);
                                const dotColor = avgPct > 0.6 ? '#22c55e' : avgPct > 0.3 ? '#f59e0b' : '#D90025';
                                const isHovered = hoveredBank === bank.bank_id;
                                return (
                                    <g key={bank.bank_id} onMouseEnter={() => setHoveredBank(bank.bank_id)} onMouseLeave={() => setHoveredBank(null)} style={{ cursor: 'pointer' }}>
                                        {/* Line from hospital */}
                                        <line x1={HOSPITAL_COORD.x} y1={HOSPITAL_COORD.y - 2} x2={coord.x} y2={coord.y} stroke="rgba(255,255,255,0.12)" strokeWidth="0.4" strokeDasharray="2 2" />
                                        <circle cx={coord.x} cy={coord.y} r={isHovered ? 8 : 6} fill={dotColor} opacity={isHovered ? 1 : 0.85} style={{ transition: 'r 0.2s' }} />
                                        {isHovered && (
                                            <foreignObject x={coord.x + 7} y={coord.y - 22} width="65" height="44">
                                                <div xmlns="http://www.w3.org/1999/xhtml" style={{ background: '#161622', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, padding: '4px 8px' }}>
                                                    <div style={{ fontFamily: 'sans-serif', fontSize: 8, color: '#fff', fontWeight: 600, whiteSpace: 'nowrap' }}>{bank.bank_name}</div>
                                                    <div style={{ fontFamily: 'sans-serif', fontSize: 7, color: dotColor }}>{bank.distance_km} km away</div>
                                                </div>
                                            </foreignObject>
                                        )}
                                    </g>
                                );
                            })}
                        </svg>
                    </div>
                </motion.div>

                {/* Bank cards */}
                <div>
                    <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: 16 }}>
                        {filtered.length} Blood Bank{filtered.length !== 1 ? 's' : ''} Found
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                        {filtered.map((bank, i) => {
                            const maxStock = Math.max(...Object.values(bank.stock));
                            return (
                                <motion.div key={bank.bank_id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: i * 0.08 }}
                                    whileHover={{ y: -3, borderColor: 'rgba(217,0,37,0.35)', boxShadow: '0 0 20px rgba(217,0,37,0.08)' }}
                                    style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28, transition: 'all 0.2s' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                                        <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 18, color: '#fff' }}>{bank.bank_name}</div>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5 }}>
                                            <span style={{ background: bank.open ? 'rgba(34,197,94,0.1)' : 'rgba(217,0,37,0.1)', border: `1px solid ${bank.open ? 'rgba(34,197,94,0.25)' : 'rgba(217,0,37,0.25)'}`, borderRadius: 100, padding: '2px 8px', fontFamily: 'var(--font-mono)', fontSize: 9, color: bank.open ? '#22c55e' : 'var(--red)' }}>{bank.open ? 'OPEN' : 'CLOSED'}</span>
                                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)' }}>{bank.distance_km} km away</span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 20 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text2)' }}><MapPin size={13} color="var(--text3)" />{bank.city}</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text2)' }}><Phone size={13} color="var(--text3)" />{bank.contact_number}</div>
                                    </div>
                                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>BLOOD STOCK</div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
                                        {BLOOD_TYPES.map(t => (
                                            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <BloodGroupBadge group={t} small />
                                                <div style={{ flex: 1, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                                                    <div style={{ height: '100%', width: `${(bank.stock[t] / maxStock) * 100}%`, background: stockColor(bank.stock[t], maxStock), borderRadius: 2 }} />
                                                </div>
                                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', minWidth: 24, textAlign: 'right' }}>{bank.stock[t]}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ display: 'flex', gap: 10 }}>
                                        <button onClick={() => navigate('/hospital/requests')} style={{ flex: 1, background: 'var(--red)', border: 'none', borderRadius: 10, padding: '11px 0', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: '#fff' }}>Request Blood</button>
                                        <button style={{ width: 44, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Phone size={16} color="var(--text2)" />
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </HospitalLayout>
    );
}
