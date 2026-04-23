import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar.jsx';
import { Footer } from '../components/layout/Footer.jsx';
import { DashboardLayout } from '../components/layout/DashboardLayout.jsx';
import { ProtectedRoute } from '../components/common/ProtectedRoute.jsx';
import { Home } from '../pages/public/Home.jsx';
import { Login } from '../pages/public/Login.jsx';
import { Register } from '../pages/public/Register.jsx';
import { NotFound } from '../pages/public/NotFound.jsx';
import { Dashboard } from '../pages/dashboard/Dashboard.jsx';
import { Profile } from '../pages/dashboard/Profile.jsx';
import { BrowseSkills } from '../pages/dashboard/BrowseSkills.jsx';
import { Matches } from '../pages/dashboard/Matches.jsx';
import { SwapRequests } from '../pages/dashboard/SwapRequests.jsx';
import { Messages } from '../pages/dashboard/Messages.jsx';
import { Reviews } from '../pages/dashboard/Reviews.jsx';
import { ProgressTracking } from '../pages/dashboard/ProgressTracking.jsx';

function PublicShell() {
  const location = useLocation();
  return (
    <div className="app-shell marketing-theme">
      <Navbar />
      <main
        id="main-content"
        key={location.pathname}
        className="page-transition-inner page-transition-inner--public page-shell page-shell--public"
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicShell />}>
        <Route path="/" element={<Home />} />
        <Route path="features" element={<Navigate to="/#features" replace />} />
        <Route path="about" element={<Navigate to="/#about" replace />} />
        <Route path="contact" element={<Navigate to="/#contact" replace />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="browse" element={<BrowseSkills />} />
        <Route path="matches" element={<Matches />} />
        <Route path="swaps" element={<SwapRequests />} />
        <Route path="messages" element={<Messages />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="progress" element={<ProgressTracking />} />
      </Route>

      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
