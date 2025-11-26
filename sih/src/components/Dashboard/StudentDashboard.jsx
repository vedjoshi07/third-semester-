import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Clock, 
  Upload, 
  FolderOpen, 
  TrendingUp,
  Award,
  Calendar,
  Target
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { formatDistanceToNow } from 'date-fns';

const StudentDashboard = () => {
  const { 
    user, 
    setPage, 
    setPortfolioOwner, 
    getUserActivities, 
    getActivityStats 
  } = useStore();
  
  const userActivities = getUserActivities(user.id);
  const stats = getActivityStats();
  const recentActivities = userActivities.slice(0, 3);

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
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Welcome back, <span className="text-gradient">{user.name}</span>!
        </h1>
        <p className="text-gray-600 text-lg">Track your achievements and build your portfolio</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <motion.div variants={itemVariants} className="card group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-green-600">{stats.approved}</h2>
              <p className="text-gray-500 font-medium">Approved Activities</p>
              <p className="text-sm text-gray-400 mt-1">Great job!</p>
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
              <p className="text-gray-500 font-medium">Pending Review</p>
              <p className="text-sm text-gray-400 mt-1">Under review</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="card group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-blue-600">{stats.totalHours}</h2>
              <p className="text-gray-500 font-medium">Total Hours</p>
              <p className="text-sm text-gray-400 mt-1">Volunteer work</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="card group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-purple-600">{userActivities.length}</h2>
              <p className="text-gray-500 font-medium">Total Activities</p>
              <p className="text-sm text-gray-400 mt-1">All submissions</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Action Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <motion.button
          variants={itemVariants}
          onClick={() => setPage('logActivity')}
          className="card group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-primary-500 to-primary-600 text-white border-0"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Log New Activity</h3>
              <p className="text-primary-100">Document your latest achievement or volunteer work</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Upload className="w-6 h-6" />
            </div>
          </div>
        </motion.button>

        <motion.button
          variants={itemVariants}
          onClick={() => setPortfolioOwner(user)}
          className="card group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">View My Portfolio</h3>
              <p className="text-purple-100">Share your achievements with others</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <FolderOpen className="w-6 h-6" />
            </div>
          </div>
        </motion.button>
      </motion.div>

      {/* Recent Activities */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="card"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Recent Activities</h2>
          <button
            onClick={() => setPage('myPortfolio')}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            View All
          </button>
        </div>

        {recentActivities.length > 0 ? (
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                variants={itemVariants}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">{activity.title}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {activity.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(activity.date).toLocaleDateString()}</span>
                      </div>
                      {activity.hours && (
                        <div className="flex items-center space-x-1">
                          <Target className="w-3 h-3" />
                          <span>{activity.hours} hours</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="ml-4">
                    <span className={`status-badge ${
                      activity.status === 'approved' ? 'status-approved' :
                      activity.status === 'pending' ? 'status-pending' :
                      'status-rejected'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={itemVariants}
            className="text-center py-8"
          >
            <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No activities submitted yet</p>
            <button
              onClick={() => setPage('logActivity')}
              className="btn-primary"
            >
              Log Your First Activity
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <motion.div variants={itemVariants} className="card text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-green-600 mb-2">{stats.approved}</h3>
          <p className="text-gray-600">Approved Activities</p>
        </motion.div>

        <motion.div variants={itemVariants} className="card text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
          <h3 className="text-2xl font-bold text-yellow-600 mb-2">{stats.pending}</h3>
          <p className="text-gray-600">Pending Review</p>
        </motion.div>

        <motion.div variants={itemVariants} className="card text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-2xl font-bold text-red-600 mb-2">{stats.rejected}</h3>
          <p className="text-gray-600">Needs Revision</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StudentDashboard;
