import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  FileText, 
  TrendingUp, 
  Download,
  BarChart3,
  PieChart,
  Calendar,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Filter,
  Search
} from 'lucide-react';
import { useStore, MOCK_DATA } from '../../store/useStore';
import { exportToCSV, exportToJSON } from '../../utils/export';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { 
    getActivityStats,
    getFilteredActivities,
    setSearchQuery,
    setFilterStatus,
    setFilterCategory,
    searchQuery,
    filterStatus,
    filterCategory
  } = useStore();
  
  const [selectedTimeRange, setSelectedTimeRange] = useState('all');
  const [isExporting, setIsExporting] = useState(false);
  
  const stats = getActivityStats();
  const filteredActivities = getFilteredActivities();
  const students = MOCK_DATA.students;
  const faculty = MOCK_DATA.faculty;

  const categories = [
    'Community Service',
    'Leadership', 
    'Research',
    'Achievement',
    'Competition',
    'Internship',
    'Volunteer Work',
    'Academic Project',
    'Other'
  ];

  const handleExport = async (format) => {
    setIsExporting(true);
    
    try {
      let result;
      const data = filteredActivities;
      
      switch (format) {
        case 'csv':
          result = exportToCSV(data, 'all_activities');
          break;
        case 'json':
          result = exportToJSON(data, 'all_activities');
          break;
        default:
          throw new Error('Invalid export format');
      }

      if (result.success) {
        toast.success(result.message);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast.error(`Export failed: ${error.message}`);
    } finally {
      setIsExporting(false);
    }
  };

  const getCategoryStats = () => {
    const categoryCounts = {};
    filteredActivities.forEach(activity => {
      const category = activity.category || 'Uncategorized';
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });
    return categoryCounts;
  };

  const getMonthlyStats = () => {
    const monthlyCounts = {};
    filteredActivities.forEach(activity => {
      const month = new Date(activity.date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      });
      monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
    });
    return monthlyCounts;
  };

  const categoryStats = getCategoryStats();
  const monthlyStats = getMonthlyStats();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 text-lg">System overview and analytics</p>
      </motion.div>

      {/* Main Stats */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <motion.div variants={itemVariants} className="card group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-blue-600">{students.length}</h2>
              <p className="text-gray-500 font-medium">Total Students</p>
              <p className="text-sm text-gray-400 mt-1">Registered users</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="card group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-green-600">{stats.approved}</h2>
              <p className="text-gray-500 font-medium">Approved Activities</p>
              <p className="text-sm text-gray-400 mt-1">This period</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="card group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-yellow-600">{stats.pending}</h2>
              <p className="text-gray-500 font-medium">Pending Reviews</p>
              <p className="text-sm text-gray-400 mt-1">Awaiting approval</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="card group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-purple-600">{stats.totalHours}</h2>
              <p className="text-gray-500 font-medium">Total Hours</p>
              <p className="text-sm text-gray-400 mt-1">Volunteer work</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="card"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input-field"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="input-field"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="input-field"
            >
              <option value="all">All Time</option>
              <option value="thisMonth">This Month</option>
              <option value="lastMonth">Last Month</option>
              <option value="thisYear">This Year</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Distribution */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="card"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <PieChart className="w-5 h-5 text-blue-500 mr-2" />
            Activity Categories
          </h2>
          
          <div className="space-y-3">
            {Object.entries(categoryStats).map(([category, count]) => {
              const percentage = ((count / filteredActivities.length) * 100).toFixed(1);
              return (
                <motion.div
                  key={category}
                  variants={itemVariants}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                    <span className="font-medium text-gray-700">{category}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-gray-800">{count}</span>
                    <span className="text-sm text-gray-500 ml-2">({percentage}%)</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Monthly Trends */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="card"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <BarChart3 className="w-5 h-5 text-green-500 mr-2" />
            Monthly Activity Trends
          </h2>
          
          <div className="space-y-3">
            {Object.entries(monthlyStats).slice(-6).map(([month, count]) => (
              <motion.div
                key={month}
                variants={itemVariants}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-700">{month}</span>
                </div>
                <span className="font-semibold text-gray-800">{count} activities</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Export and Reports */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="card"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <Download className="w-5 h-5 text-purple-500 mr-2" />
          Export & Reports
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.button
            onClick={() => handleExport('csv')}
            disabled={isExporting}
            className="btn-primary flex items-center justify-center space-x-2 disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isExporting ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>Export CSV</span>
          </motion.button>

          <motion.button
            onClick={() => handleExport('json')}
            disabled={isExporting}
            className="btn-secondary flex items-center justify-center space-x-2 disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isExporting ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>Export JSON</span>
          </motion.button>

          <motion.button
            onClick={() => toast.success('Report generation started!')}
            className="btn-secondary flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FileText className="w-4 h-4" />
            <span>Generate Report</span>
          </motion.button>
        </div>
      </motion.div>

      {/* System Overview */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <motion.div variants={itemVariants} className="card text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-blue-600 mb-2">{students.length + faculty.length}</h3>
          <p className="text-gray-600">Total Users</p>
        </motion.div>

        <motion.div variants={itemVariants} className="card text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-green-600 mb-2">{stats.approved}</h3>
          <p className="text-gray-600">Approved Activities</p>
        </motion.div>

        <motion.div variants={itemVariants} className="card text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-purple-600 mb-2">
            {stats.approved > 0 ? Math.round((stats.approved / stats.total) * 100) : 0}%
          </h3>
          <p className="text-gray-600">Approval Rate</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
