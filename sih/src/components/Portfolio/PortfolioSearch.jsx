import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, User, ArrowLeft, Users } from 'lucide-react';
import { useStore, MOCK_DATA } from '../../store/useStore';
import toast from 'react-hot-toast';

const PortfolioSearch = () => {
  const { setPage, setPortfolioOwner } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const allUsers = [...MOCK_DATA.students, ...MOCK_DATA.faculty];
    const results = allUsers.filter(user => 
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email?.toLowerCase().includes(query.toLowerCase()) ||
      user.department?.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(results);
    setIsSearching(false);
  };

  const handleUserSelect = (user) => {
    setPortfolioOwner(user);
    toast.success(`Viewing ${user.name}'s portfolio`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(searchQuery);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Search Portfolios</h1>
        <p className="text-gray-600">Find and view student or faculty portfolios</p>
      </motion.div>

      {/* Search Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card"
      >
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, email, or department..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleSearch(e.target.value);
              }}
              onKeyPress={handleKeyPress}
              className="input-field pl-10"
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={() => setPage('dashboard')}
              className="btn-secondary flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </button>

            <button
              onClick={() => handleSearch(searchQuery)}
              disabled={isSearching}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50"
            >
              {isSearching ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Search className="w-4 h-4" />
              )}
              <span>Search</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Users className="w-5 h-5 text-blue-500 mr-2" />
            Search Results ({searchResults.length})
          </h2>

          <div className="space-y-3">
            {searchResults.map((user) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => handleUserSelect(user)}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{user.name}</h3>
                    <p className="text-sm text-gray-600 capitalize">{user.role}</p>
                    {user.email && (
                      <p className="text-xs text-gray-500">{user.email}</p>
                    )}
                    {user.department && (
                      <p className="text-xs text-gray-500">{user.department}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium">
                      {user.role}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* No Results */}
      {searchQuery && searchResults.length === 0 && !isSearching && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card text-center py-12"
        >
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No users found</h3>
          <p className="text-gray-500">
            Try searching with a different name, email, or department.
          </p>
        </motion.div>
      )}

      {/* Quick Access */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {MOCK_DATA.students.slice(0, 4).map((student) => (
            <motion.button
              key={student.id}
              onClick={() => handleUserSelect(student)}
              className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors text-left"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{student.name}</p>
                  <p className="text-xs text-gray-500">{student.department}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PortfolioSearch;
