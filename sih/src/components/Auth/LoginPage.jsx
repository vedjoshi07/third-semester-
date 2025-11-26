import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Eye, EyeOff, Loader, GraduationCap } from 'lucide-react';
import { useStore, MOCK_DATA } from '../../store/useStore';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const { login } = useStore();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'student'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError('');

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Find user in mock data
      const allUsers = [...MOCK_DATA.students, ...MOCK_DATA.faculty, ...MOCK_DATA.admin];
      const user = allUsers.find(u => 
        u.name.toLowerCase() === formData.username.toLowerCase() && 
        formData.password === '123' // Simple password for demo
      );

      if (user) {
        login(user);
        toast.success(`Welcome back, ${user.name}!`);
      } else {
        setError('Invalid username or password. Try: Alice Johnson, Bob Smith, Dr. Sarah Wilson, or Admin User (password: 123)');
        toast.error('Login failed');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
      toast.error('Login failed');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const demoUsers = [
    { name: 'Alice Johnson', role: 'student', password: '123' },
    { name: 'Bob Smith', role: 'student', password: '123' },
    { name: 'Dr. Sarah Wilson', role: 'faculty', password: '123' },
    { name: 'Admin User', role: 'admin', password: '123' }
  ];

  const fillDemoUser = (user) => {
    setFormData(prev => ({
      ...prev,
      username: user.name,
      password: user.password
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow"
          >
            <GraduationCap className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to EduConnect</h1>
          <p className="text-gray-600">Your comprehensive portfolio management system</p>
        </div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
        >
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="input-field pl-10"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="input-field pl-10 pr-10"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-lg p-3"
              >
                <p className="text-red-600 text-sm">{error}</p>
              </motion.div>
            )}

            {/* Login Button */}
            <motion.button
              type="submit"
              disabled={isLoggingIn}
              className="w-full btn-primary py-3 text-lg font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoggingIn && <Loader className="animate-spin w-5 h-5" />}
              <span>{isLoggingIn ? 'Signing In...' : 'Sign In'}</span>
            </motion.button>
          </form>

          {/* Demo Users */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3 text-center">Demo Accounts (click to fill):</p>
            <div className="grid grid-cols-2 gap-2">
              {demoUsers.map((user, index) => (
                <motion.button
                  key={user.name}
                  type="button"
                  onClick={() => fillDemoUser(user)}
                  className="text-xs p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="font-medium text-gray-700">{user.name}</div>
                  <div className="text-gray-500 capitalize">{user.role}</div>
                </motion.button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">Password for all accounts: 123</p>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6"
        >
          <p className="text-sm text-gray-500">
            © 2024 EduConnect. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
