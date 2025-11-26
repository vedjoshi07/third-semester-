import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  Home, 
  FileText, 
  User, 
  LogOut, 
  FolderOpen, 
  BarChart2, 
  CheckCircle,
  Menu,
  X,
  Settings
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { formatDistanceToNow } from 'date-fns';

const AppShell = ({ children }) => {
  const { 
    user, 
    currentPage, 
    logout, 
    setPage, 
    notifications, 
    clearNotifications,
    markNotificationAsRead,
    getUnreadNotifications
  } = useStore();
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  const unreadNotifications = getUnreadNotifications();

  const handleLogout = () => {
    logout();
  };

  const renderNav = () => {
    if (!user) return null;
    
    const navItems = {
      student: [
        { name: 'Dashboard', page: 'dashboard', icon: <Home className="w-5 h-5" /> },
        { name: 'Log Activity', page: 'logActivity', icon: <FileText className="w-5 h-5" /> },
        { name: 'My Portfolio', page: 'myPortfolio', icon: <FolderOpen className="w-5 h-5" /> },
      ],
      faculty: [
        { name: 'Dashboard', page: 'dashboard', icon: <Home className="w-5 h-5" /> },
        { name: 'Approvals', page: 'approvals', icon: <CheckCircle className="w-5 h-5" /> },
        { name: 'Analytics', page: 'analytics', icon: <BarChart2 className="w-5 h-5" /> },
      ],
      admin: [
        { name: 'Dashboard', page: 'dashboard', icon: <Home className="w-5 h-5" /> },
        { name: 'Analytics', page: 'analytics', icon: <BarChart2 className="w-5 h-5" /> },
        { name: 'Settings', page: 'settings', icon: <Settings className="w-5 h-5" /> },
      ],
    };

    return navItems[user.role]?.map((item) => (
      <motion.button
        key={item.name}
        onClick={() => {
          setPage(item.page);
          setShowMobileMenu(false);
        }}
        className={`flex items-center space-x-2 py-2 px-4 rounded-full transition-all duration-200 ${
          currentPage === item.page 
            ? 'bg-primary-600 text-white shadow-lg' 
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {item.icon}
        <span className="hidden md:inline font-medium">{item.name}</span>
      </motion.button>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2 text-primary-600 font-bold text-xl"
            whileHover={{ scale: 1.05 }}
          >
            <FolderOpen className="w-6 h-6" />
            <span className="text-gradient">EduConnect</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {renderNav()}
          </nav>

          {/* User Actions */}
          {user && (
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <motion.button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-100"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Bell className="w-6 h-6" />
                  {unreadNotifications.length > 0 && (
                    <motion.span 
                      className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      {unreadNotifications.length}
                    </motion.span>
                  )}
                </motion.button>

                {/* Notifications Panel */}
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-12 right-0 w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50 max-h-96 overflow-y-auto"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-lg text-gray-800">Notifications</h3>
                        <button 
                          onClick={() => setShowNotifications(false)} 
                          className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {notifications.length > 0 ? (
                        <div className="space-y-3">
                          {notifications.slice(0, 5).map((notification) => (
                            <motion.div
                              key={notification.id}
                              className={`p-3 rounded-lg border-l-4 ${
                                notification.read 
                                  ? 'bg-gray-50 border-gray-300' 
                                  : 'bg-blue-50 border-blue-400'
                              }`}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              onClick={() => markNotificationAsRead(notification.id)}
                            >
                              <p className="text-sm text-gray-700">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm text-center py-4">No notifications yet.</p>
                      )}
                      
                      {notifications.length > 0 && (
                        <button
                          onClick={() => { clearNotifications(); setShowNotifications(false); }}
                          className="mt-4 w-full text-center text-sm text-primary-600 hover:underline font-medium"
                        >
                          Clear All
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Info */}
              <div className="hidden md:flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-primary-600" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-700">{user.name}</p>
                  <p className="text-gray-500 capitalize">{user.role}</p>
                </div>
              </div>

              {/* Logout */}
              <motion.button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden md:inline font-medium">Logout</span>
              </motion.button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 rounded-full hover:bg-gray-100"
              >
                {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 bg-white"
            >
              <div className="px-4 py-3 space-y-2">
                {renderNav()}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};

export default AppShell;
