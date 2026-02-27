import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download } from 'lucide-react';
import BloodBankLayout from '../../components/bloodbank/BloodBankLayout';
import StockCard from '../../components/bloodbank/StockCard';
import StockUpdateModal from '../../components/bloodbank/StockUpdateModal';
import { mockBloodStock, mockStockAuditLog } from '../../data/bloodBankMockData';

const STOCK_ORDER = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];
const sortedStock = STOCK_ORDER.map(g => mockBloodStock.find(s => s.blood_group === g)).filter(Boolean);
const totalUnits = sortedStock.reduce((s, b) => s + b.available_units, 0);
const criticalTypes = sortedStock.filter(s => (s.available_units / s.capacity) <= 0.3);
const lowTypes = sortedStock.filter(s => { const p = s.available_units / s.capacity; return p > 0.3 && p <= 0.6; });
const healthyTypes = sortedStock.filter(s => (s.available_units / s.capacity) > 0.6);

export default function BloodBankInventory() {
    const [showModal, setShowModal] = useState(false);
    return (
        <BloodBankLayout title="Inventory" page="INVENTORY">
            <AnimatePresence>{showModal && <StockUpdateModal onClose={() => setShowModal(false)} />}</AnimatePresence>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
                    {[{ label: 'TOTAL UNITS', val: String(totalUnits), color: '#fff' }, { label: 'CRITICAL TYPES', val: String(criticalTypes.length), color: 'var(--red)' }, { label: 'LOW STOCK TYPES', val: String(lowTypes.length), color: '#f59e0b' }, { label: 'HEALTHY TYPES', val: String(healthyTypes.length), color: '#22c55e' }].map(({ label, val, color }, i) => (
                        <motion.div key={label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.07 }}
                            style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 24 }}>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 14 }}>{label}</div>
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: 52, color, lineHeight: 1 }}>{val}</div>
                        </motion.div>
                    ))}
                </div>
                {/* Stock Grid */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                    style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                        <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 20, color: '#fff' }}>Blood Stock Management</div>
                        <button onClick={() => setShowModal(true)} style={{ background: 'var(--red)', border: 'none', cursor: 'pointer', borderRadius: 10, padding: '10px 18px', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: '#fff', boxShadow: '0 2px 12px rgba(217,0,37,0.3)' }}>＋ Update Stock</button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
                        {sortedStock.map(s => <StockCard key={s.stock_id} stock={s} />)}
                    </div>
                </motion.div>
                {/* Audit Log */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    style={{ background: '#0F0F17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: 28 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 18, color: '#fff' }}>Stock Update History</div>
                        <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text2)' }}>
                            <Download size={13} /> Export
                        </button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px 80px 80px 90px 1fr', gap: 12, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                        {['DATE', 'BLOOD GRP', 'PREVIOUS', 'NEW STOCK', 'CHANGE', 'UPDATED BY'].map(h => (
                            <div key={h} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</div>
                        ))}
                    </div>
                    {mockStockAuditLog.map((log, i) => (
                        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 90px 80px 80px 90px 1fr', gap: 12, alignItems: 'center', padding: '14px 0', borderBottom: i < mockStockAuditLog.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', transition: 'background 0.15s' }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text3)' }}>{log.date}</div>
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: '#fff' }}>{log.blood_group}</div>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text2)' }}>{log.prev}</div>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#fff', fontWeight: 600 }}>{log.curr}</div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: log.change > 0 ? '#22c55e' : 'var(--red)' }}>{log.change > 0 ? '+' : ''}{log.change} units</div>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text2)' }}>{log.by}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </BloodBankLayout>
    );
}
