import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Phone, Building2 } from 'lucide-react';
import DonorLayout from '../../components/donor/DonorLayout';
import { mockBloodBanks } from '../../data/mockData';

const KERALA_DISTRICTS = ['All Districts', 'Thiruvananthapuram', 'Kollam', 'Pathanamthitta', 'Alappuzha', 'Kottayam', 'Idukki', 'Ernakulam', 'Thrissur', 'Palakkad', 'Malappuram', 'Kozhikode', 'Wayanad', 'Kannur', 'Kasaragod'];

// Approximate SVG coordinate positions for districts (% of viewBox)
const DISTRICT_COORDS = {
    'Thiruvananthapuram': { x: 25, y: 88 },
    'Kollam': { x: 24, y: 80 },
    'Pathanamthitta': { x: 32, y: 74 },
    'Alappuzha': { x: 20, y: 70 },
    'Kottayam': { x: 28, y: 64 },
    'Idukki': { x: 40, y: 62 },
    'Ernakulam': { x: 22, y: 57 },
    'Thrissur': { x: 25, y: 48 },
    'Palakkad': { x: 38, y: 40 },
    'Malappuram': { x: 30, y: 32 },
    'Kozhikode': { x: 22, y: 24 },
    'Wayanad': { x: 42, y: 22 },
    'Kannur': { x: 25, y: 14 },
    'Kasaragod': { x: 22, y: 6 },
};

const BANK_CITY_COORDS = {
    'Thiruvananthapuram': DISTRICT_COORDS['Thiruvananthapuram'],
    'Ernakulam': DISTRICT_COORDS['Ernakulam'],
    'Kozhikode': DISTRICT_COORDS['Kozhikode'],
};

export default function DonorFindBank() {
    const [search, setSearch] = useState('');
    const [district, setDistrict] = useState('All Districts');
    const [openOnly, setOpenOnly] = useState(false);
    const [hoveredBank, setHoveredBank] = useState(null);

    const filtered = mockBloodBanks.filter(b => {
        const matchSearch = b.bank_name.toLowerCase().includes(search.toLowerCase()) || b.city.toLowerCase().includes(search.toLowerCase());
        const matchDist = district === 'All Districts' || b.city === district;
        const matchOpen = !openOnly || b.open;
        return matchSearch && matchDist && matchOpen;
    });

    const stockColor = s => s === 'Adequate' ? '#22c55e' : s === 'Low' ? '#f59e0b' : '#D90025';

    return (
        <DonorLayout title="Find Blood Bank" page="FIND-BANK">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                {/* Search + Filters */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ flex: 1, position: 'relative' }}>
                        <Search size={16} color="var(--text3)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                            value={search} onChange={e => setSearch(e.target.value)}
                            placeholder="Search blood banks..."
                            style={{
                                width: '100%', background: '#0F0F17', border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: 10, padding: '11px 14px 11px 42px',
                                fontFamily: 'var(--font-body)', fontSize: 14, color: '#fff', outline: 'none',
                                boxSizing: 'border-box',
                            }}
                        />
                    </div>
                    <select
                        value={district} onChange={e => setDistrict(e.target.value)}
                        style={{
                            width: 200, background: '#0F0F17', border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 10, padding: '11px 14px', fontFamily: 'var(--font-body)',
                            fontSize: 14, color: '#fff', outline: 'none', cursor: 'pointer',
                        }}
                    >
                        {KERALA_DISTRICTS.map(d => <option key={d} value={d} style={{ background: '#0F0F17' }}>{d}</option>)}
                    </select>
                    <button
                        onClick={() => setOpenOnly(v => !v)}
                        style={{
                            background: openOnly ? 'var(--red)' : 'none',
                            border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10,
                            padding: '11px 18px', cursor: 'pointer',
                            fontFamily: 'var(--font-mono)', fontSize: 11, color: openOnly ? '#fff' : 'var(--text2)',
                            transition: 'all 0.2s', whiteSpace: 'nowrap',
                        }}
                    >
                        Open Now
                    </button>
                </motion.div>

                {/* Kerala Map */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, overflow: 'hidden' }}>
                    <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 16, color: '#fff' }}>Kerala Blood Bank Network</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--red)', animation: 'pulse 2s infinite' }} />
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--red)' }}>LIVE</span>
                        </div>
                    </div>
                    <div style={{ position: 'relative', background: '#0A0A12', padding: 24, display: 'flex', justifyContent: 'center', minHeight: 400 }}>
                        <img src="/kerala-map.png" alt="Kerala Map" style={{ height: 400, width: 'auto', objectFit: 'contain', opacity: 0.8, filter: 'brightness(0.9) contrast(1.1) sepia(0.3)' }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 30%, #0A0A12 100%)', pointerEvents: 'none' }} />
                    </div>      {/* Legend */}
                    <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginTop: 8 }}>
                        {[['Adequate', '#22c55e'], ['Low Stock', '#f59e0b'], ['Critical', '#D90025']].map(([label, color]) => (
                            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)' }}>{label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Blood Bank List */}
                <div>
                    <div style={{ marginBottom: 16 }}>
                        <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: 4 }}>
                            {filtered.length} Blood Banks Found
                        </div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)' }}>
                            Filtered by: {district}{openOnly ? ' · Open Now' : ''}
                        </div>
                    </div>

                    {filtered.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '48px 0', background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20 }}>
                            <MapPin size={48} color="var(--text3)" style={{ margin: '0 auto 16px', display: 'block' }} />
                            <div style={{ fontFamily: 'var(--font-body)', color: 'var(--text3)' }}>No blood banks found. Try adjusting filters.</div>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            {filtered.map((bank, i) => (
                                <motion.div key={bank.bank_id}
                                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: i * 0.07 }}
                                    whileHover={{ borderColor: 'rgba(217,0,37,0.35)', boxShadow: '0 0 20px rgba(217,0,37,0.08)' }}
                                    style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 24, transition: 'all 0.2s' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                                        <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 18, color: '#fff' }}>{bank.bank_name}</div>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                                            <span style={{ background: bank.open ? 'rgba(34,197,94,0.1)' : 'rgba(217,0,37,0.1)', border: `1px solid ${bank.open ? 'rgba(34,197,94,0.25)' : 'rgba(217,0,37,0.25)'}`, borderRadius: 100, padding: '2px 8px', fontFamily: 'var(--font-mono)', fontSize: 9, color: bank.open ? '#22c55e' : 'var(--red)' }}>
                                                {bank.open ? 'OPEN' : 'CLOSED'}
                                            </span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                                <div style={{ width: 7, height: 7, borderRadius: '50%', background: stockColor(bank.stock_status) }} />
                                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)' }}>{bank.stock_status}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text2)' }}>
                                            <MapPin size={13} color="var(--text3)" /> {bank.city} · {bank.distance_km} km away
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text2)' }}>
                                            <Phone size={13} color="var(--text3)" /> {bank.contact_number}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </DonorLayout>
    );
}
