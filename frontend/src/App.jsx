import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Landing pages
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import FeaturesPage from './pages/FeaturesPage';
import PricingPage from './pages/PricingPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';

// Auth pages
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import VerifyOTP from './pages/VerifyOTP';
import PendingApproval from './pages/PendingApproval';

// Donor portal
import DonorDashboard from './pages/donor/DonorDashboard';
import DonorDonations from './pages/donor/DonorDonations';
import DonorHealthCheck from './pages/donor/DonorHealthCheck';
import DonorSchedule from './pages/donor/DonorSchedule';
import DonorFindBank from './pages/donor/DonorFindBank';
import DonorProfile from './pages/donor/DonorProfile';

// Hospital portal
import HospitalDashboard from './pages/hospital/HospitalDashboard';
import HospitalRequests from './pages/hospital/HospitalRequests';
import HospitalPatients from './pages/hospital/HospitalPatients';
import HospitalPayments from './pages/hospital/HospitalPayments';
import HospitalBloodBanks from './pages/hospital/HospitalBloodBanks';
import HospitalProfile from './pages/hospital/HospitalProfile';

// Blood Bank portal
import BloodBankDashboard from './pages/bloodbank/BloodBankDashboard';
import BloodBankInventory from './pages/bloodbank/BloodBankInventory';
import BloodBankDonations from './pages/bloodbank/BloodBankDonations';
import BloodBankDonors from './pages/bloodbank/BloodBankDonors';
import BloodBankHealthChecks from './pages/bloodbank/BloodBankHealthChecks';
import BloodBankRequests from './pages/bloodbank/BloodBankRequests';
import BloodBankIssues from './pages/bloodbank/BloodBankIssues';
import BloodBankPayments from './pages/bloodbank/BloodBankPayments';
import BloodBankProfile from './pages/bloodbank/BloodBankProfile';

// Admin portal
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminNotifications from './pages/admin/AdminNotifications';
import AdminApprovals from './pages/admin/AdminApprovals';
import AdminDonors from './pages/admin/AdminDonors';
import AdminHospitals from './pages/admin/AdminHospitals';
import AdminBloodBanks from './pages/admin/AdminBloodBanks';
import AdminInventory from './pages/admin/AdminInventory';
import AdminRequests from './pages/admin/AdminRequests';
import AdminDonations from './pages/admin/AdminDonations';
import AdminHealthChecks from './pages/admin/AdminHealthChecks';
import AdminIssues from './pages/admin/AdminIssues';
import AdminPayments from './pages/admin/AdminPayments';
import AdminUsers from './pages/admin/AdminUsers';
import AdminReports from './pages/admin/AdminReports';
import AdminAudit from './pages/admin/AdminAudit';
import AdminSettings from './pages/admin/AdminSettings';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Landing */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/features" element={<FeaturesPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/contact" element={<ContactPage />} />

                {/* Auth */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/verify-otp" element={<VerifyOTP />} />
                <Route path="/pending-approval" element={<PendingApproval />} />

                {/* Donor Portal */}
                <Route path="/donor/dashboard" element={<DonorDashboard />} />
                <Route path="/donor/donations" element={<DonorDonations />} />
                <Route path="/donor/health-check" element={<DonorHealthCheck />} />
                <Route path="/donor/schedule" element={<DonorSchedule />} />
                <Route path="/donor/find-bank" element={<DonorFindBank />} />
                <Route path="/donor/profile" element={<DonorProfile />} />
                <Route path="/donor/notifications" element={<DonorDashboard />} />

                {/* Hospital Portal */}
                <Route path="/hospital/dashboard" element={<HospitalDashboard />} />
                <Route path="/hospital/requests" element={<HospitalRequests />} />
                <Route path="/hospital/patients" element={<HospitalPatients />} />
                <Route path="/hospital/payments" element={<HospitalPayments />} />
                <Route path="/hospital/blood-banks" element={<HospitalBloodBanks />} />
                <Route path="/hospital/profile" element={<HospitalProfile />} />
                <Route path="/hospital/notifications" element={<HospitalDashboard />} />

                {/* Blood Bank Portal */}
                <Route path="/bloodbank/dashboard" element={<BloodBankDashboard />} />
                <Route path="/bloodbank/inventory" element={<BloodBankInventory />} />
                <Route path="/bloodbank/donations" element={<BloodBankDonations />} />
                <Route path="/bloodbank/donors" element={<BloodBankDonors />} />
                <Route path="/bloodbank/health-checks" element={<BloodBankHealthChecks />} />
                <Route path="/bloodbank/requests" element={<BloodBankRequests />} />
                <Route path="/bloodbank/issues" element={<BloodBankIssues />} />
                <Route path="/bloodbank/payments" element={<BloodBankPayments />} />
                <Route path="/bloodbank/profile" element={<BloodBankProfile />} />
                <Route path="/bloodbank/notifications" element={<BloodBankDashboard />} />

                {/* Admin Portal */}
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/notifications" element={<AdminNotifications />} />
                <Route path="/admin/approvals" element={<AdminApprovals />} />
                <Route path="/admin/donors" element={<AdminDonors />} />
                <Route path="/admin/hospitals" element={<AdminHospitals />} />
                <Route path="/admin/blood-banks" element={<AdminBloodBanks />} />
                <Route path="/admin/inventory" element={<AdminInventory />} />
                <Route path="/admin/requests" element={<AdminRequests />} />
                <Route path="/admin/donations" element={<AdminDonations />} />
                <Route path="/admin/health-checks" element={<AdminHealthChecks />} />
                <Route path="/admin/issues" element={<AdminIssues />} />
                <Route path="/admin/payments" element={<AdminPayments />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/reports" element={<AdminReports />} />
                <Route path="/admin/audit" element={<AdminAudit />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
            </Routes>
        </BrowserRouter>
    );
}
