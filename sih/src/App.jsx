import React from 'react';
import { Toaster } from 'react-hot-toast';
import { useStore } from './store/useStore';
import AppShell from './components/Layout/AppShell';
import LoginPage from './components/Auth/LoginPage';
import StudentDashboard from './components/Dashboard/StudentDashboard';
import FacultyDashboard from './components/Dashboard/FacultyDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import ActivityForm from './components/Activity/ActivityForm';
import PortfolioViewer from './components/Portfolio/PortfolioViewer';
import PortfolioSearch from './components/Portfolio/PortfolioSearch';

function App() {
  const { 
    isAuthenticated, 
    currentPage, 
    portfolioOwner, 
    user 
  } = useStore();

  // Render the correct page based on authentication and current page
  const renderPage = () => {
    if (!isAuthenticated) {
      return <LoginPage />;
    }

    switch (currentPage) {
      case 'dashboard':
        if (user?.role === 'student') {
          return <StudentDashboard />;
        }
        if (user?.role === 'faculty') {
          return <FacultyDashboard />;
        }
        if (user?.role === 'admin') {
          return <AdminDashboard />;
        }
        return <StudentDashboard />; // Default fallback

      case 'logActivity':
        return <ActivityForm />;

      case 'myPortfolio':
        return <PortfolioViewer owner={user} />;

      case 'approvals':
        return <FacultyDashboard />;

      case 'analytics':
        return <AdminDashboard />;

      case 'portfolioViewer':
        if (portfolioOwner) {
          return <PortfolioViewer owner={portfolioOwner} />;
        }
        return <PortfolioSearch />;

      case 'settings':
        return (
          <div className="max-w-2xl mx-auto">
            <div className="card text-center py-12">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Settings</h1>
              <p className="text-gray-600">Settings panel coming soon...</p>
            </div>
          </div>
        );

      default:
        return <StudentDashboard />;
    }
  };

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
      
      {isAuthenticated ? (
        <AppShell>
          {renderPage()}
        </AppShell>
      ) : (
        renderPage()
      )}
    </>
  );
}

export default App;
