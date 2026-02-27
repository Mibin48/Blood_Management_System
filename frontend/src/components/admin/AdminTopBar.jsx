import { useLocation } from 'react-router-dom';
import { Shield, Bell, UserPlus } from 'lucide-react';

export default function AdminTopBar({ title, page }) {
    const location = useLocation();
    const isUsersPage = location.pathname === '/admin/users';
    const dateStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

    return (
        <div style={{
            position: 'fixed', top: 0, left: 240, right: 0, height: 64,
            background: 'rgba(7,7,11,0.85)', backdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 32px', zIndex: 30,
        }}>
            {/* Left */}
            <div>
                <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 700, fontSize: 20, color: '#fff' }}>{title || 'Dashboard'}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text3)', letterSpacing: '0.08em', marginTop: 2 }}>
                    HEM∆ › ADMIN › {(page || title || 'DASHBOARD').toUpperCase()}
                </div>
            </div>

            {/* Right */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                {/* System Health */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', animation: 'pulse 2s ease-in-out infinite' }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#22c55e' }}>SYSTEM HEALTHY</span>
                </div>

                {isUsersPage && (
                    <button style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        background: 'var(--red)', border: 'none', borderRadius: 8,
                        padding: '7px 14px', cursor: 'pointer',
                        fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: '#fff',
                    }}>
                        <UserPlus size={14} /> Create Admin
                    </button>
                )}

                <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.08)' }} />

                {/* Bell */}
                <div style={{ position: 'relative', cursor: 'pointer' }}>
                    <Bell size={18} color="var(--text2)" />
                    <span style={{ position: 'absolute', top: -4, right: -6, width: 16, height: 16, borderRadius: '50%', background: 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 8, color: '#fff', fontWeight: 700, border: '2px solid #07070B' }}>5</span>
                </div>

                <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.08)' }} />

                {/* Date */}
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text3)' }}>{dateStr}</span>

                <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.08)' }} />

                {/* Avatar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#D90025,#8B0010)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Shield size={14} color="#fff" />
                    </div>
                    <div>
                        <div style={{ fontFamily: 'var(--font-sub)', fontWeight: 600, fontSize: 13, color: '#fff', display: 'flex', alignItems: 'center', gap: 4 }}>
                            Admin Kerala <Shield size={10} color="var(--red)" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
