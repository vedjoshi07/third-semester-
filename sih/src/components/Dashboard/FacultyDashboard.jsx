import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Users, 
  TrendingUp,
  AlertCircle,
  Eye,
  MessageSquare,
  Calendar,
  Filter
} from 'lucide-react';
import { useStore, MOCK_DATA } from '../../store/useStore';
import { formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';

const FacultyDashboard = () => {
  const { 
    user, 
    getPendingActivities, 
    getActivityStats,
    updateActivity,
    addNotification,
    setSearchQuery,
    setFilterStatus,
    searchQuery,
    filterStatus
  } = useStore();
  
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  
  const pendingActivities = getPendingActivities();
  const stats = getActivityStats();
  const recentActivities = MOCK_DATA.activities.slice(0, 5);

  const handleStatusChange = async (activityId, newStatus, reason = '') => {
    try {
      const activity = MOCK_DATA.activities.find(a => a.id === activityId);
      if (!activity) return;

      const updates = {
        status: newStatus,
        ...(newStatus === 'approved' && {
          approvedBy: user.id,
          approvedAt: new Date().toISOString()
        }),
        ...(newStatus === 'rejected' && {
          rejectedBy: user.id,
          rejectedAt: new Date().toISOString(),
          rejectionReason: reason
        })
      };

      updateActivity(activityId, updates);

      // Find student and send notification
      const student = MOCK_DATA.students.find(s => s.id === activity.userId);
      if (student) {
        const message = newStatus === 'approved' 
          ? `Your activity "${activity.title}" has been approved! 🎉`
          : `Your activity "${activity.title}" needs revision. Reason: ${reason}`;
        
        addNotification({
          message,
          type: newStatus === 'approved' ? 'success' : 'warning'
        });
      }

      toast.success(`Activity ${newStatus} successfully!`);
      setShowRejectionModal(false);
      setRejectionReason('');
    } catch (error) {
      toast.error('Failed to update activity status');
    }
  };

  const openRejectionModal = (activity) => {
    setSelectedActivity(activity);
    setShowRejectionModal(true);
  };

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
          Welcome, <span className="text-gradient">{user.name}</span>!
        </h1>
        <p className="text-gray-600 text-lg">Review and approve student activities</p>
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
              <h2 className="text-3xl font-bold text-yellow-600">{pendingActivities.length}</h2>
              <p className="text-gray-500 font-medium">Pending Reviews</p>
              <p className="text-sm text-gray-400 mt-1">Awaiting approval</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="card group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-green-600">{stats.approved}</h2>
              <p className="text-gray-500 font-medium">Approved Activities</p>
              <p className="text-sm text-gray-400 mt-1">This month</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="card group hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-blue-600">{MOCK_DATA.students.length}</h2>
              <p className="text-gray-500 font-medium">Active Students</p>
              <p className="text-sm text-gray-400 mt-1">In your department</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 text-blue-600" />
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
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="card"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field"
            />
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
          </div>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Approvals */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <AlertCircle className="w-5 h-5 text-yellow-500 mr-2" />
              Pending Approvals
            </h2>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
              {pendingActivities.length}
            </span>
          </div>

          {pendingActivities.length > 0 ? (
            <div className="space-y-4">
              {pendingActivities.map((activity) => {
                const student = MOCK_DATA.students.find(s => s.id === activity.userId);
                return (
                  <motion.div
                    key={activity.id}
                    variants={itemVariants}
                    className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">{activity.title}</h3>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {activity.description}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Users className="w-3 h-3" />
                            <span>{student?.name || 'Unknown Student'}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(activity.date).toLocaleDateString()}</span>
                          </div>
                          {activity.hours && (
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{activity.hours}h</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <motion.button
                        onClick={() => handleStatusChange(activity.id, 'approved')}
                        className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Approve</span>
                      </motion.button>
                      
                      <motion.button
                        onClick={() => openRejectionModal(activity)}
                        className="flex items-center space-x-1 px-3 py-1 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Reject</span>
                      </motion.button>
                      
                      <motion.button
                        onClick={() => setSelectedActivity(activity)}
                        className="flex items-center space-x-1 px-3 py-1 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <motion.div
              variants={itemVariants}
              className="text-center py-8"
            >
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <p className="text-gray-500">No pending approvals</p>
            </motion.div>
          )}
        </motion.div>

        {/* Recent Submissions */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="card"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <MessageSquare className="w-5 h-5 text-blue-500 mr-2" />
            Recent Submissions
          </h2>

          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const student = MOCK_DATA.students.find(s => s.id === activity.userId);
              return (
                <motion.div
                  key={activity.id}
                  variants={itemVariants}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-800">{activity.title}</h3>
                    <span className={`status-badge ${
                      activity.status === 'approved' ? 'status-approved' :
                      activity.status === 'pending' ? 'status-pending' :
                      'status-rejected'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Submitted by {student?.name || 'Unknown Student'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(activity.date), { addSuffix: true })}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Rejection Modal */}
      {showRejectionModal && selectedActivity && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Reject Activity: {selectedActivity.title}
            </h3>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Reason for rejection:
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="input-field"
                rows="3"
                placeholder="Please provide a reason for rejection..."
                required
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowRejectionModal(false);
                  setRejectionReason('');
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() => handleStatusChange(selectedActivity.id, 'rejected', rejectionReason)}
                disabled={!rejectionReason.trim()}
                className="btn-danger disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reject Activity
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default FacultyDashboard;
