import { motion } from 'framer-motion';
import BloodBankSidebar from './BloodBankSidebar';
import BloodBankTopBar from './BloodBankTopBar';

export default function BloodBankLayout({ children, title, page }) {
    return (
        <div style={{ minHeight: '100vh', background: '#07070B', display: 'flex' }}>
            <BloodBankSidebar />
            <div style={{ flex: 1, marginLeft: 240, display: 'flex', flexDirection: 'column' }}>
                <BloodBankTopBar title={title} page={page} />
                <motion.main
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{ marginTop: 64, padding: 32, flex: 1, minHeight: 'calc(100vh - 64px)' }}
                >
                    {children}
                </motion.main>
            </div>
        </div>
    );
}
