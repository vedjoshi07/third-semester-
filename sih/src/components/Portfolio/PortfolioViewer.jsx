import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  File, 
  Download, 
  Share2, 
  CheckCircle, 
  Calendar, 
  Clock, 
  Tag,
  Award,
  User,
  Mail,
  GraduationCap,
  TrendingUp
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { exportToPDF, exportToCSV, exportToJSON } from '../../utils/export';
import toast from 'react-hot-toast';

const PortfolioViewer = ({ owner }) => {
  const { getUserActivities, getActivityStats } = useStore();
  const portfolioRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState('pdf');

  const userActivities = getUserActivities(owner.id);
  const approvedActivities = userActivities.filter(act => act.status === 'approved');
  const stats = getActivityStats();

  const handleExport = async (format) => {
    setIsExporting(true);
    setExportFormat(format);

    try {
      let result;
      
      switch (format) {
        case 'pdf':
          result = await exportToPDF(portfolioRef, `${owner.name}_Portfolio`);
          break;
        case 'csv':
          result = exportToCSV(approvedActivities, `${owner.name}_Activities`);
          break;
        case 'json':
          result = exportToJSON(approvedActivities, `${owner.name}_Activities`);
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${owner.name}'s Portfolio`,
          text: `Check out ${owner.name}'s achievements and activities!`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Share cancelled or failed');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Portfolio link copied to clipboard!');
    }
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
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {owner.name}'s Portfolio
          </h1>
          <p className="text-gray-600 text-lg">
            {approvedActivities.length} approved activities • {stats.totalHours} total hours
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <motion.button
            onClick={handleShare}
            className="btn-secondary flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </motion.button>

          <div className="relative">
            <motion.button
              onClick={() => handleExport('pdf')}
              disabled={isExporting}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isExporting && exportFormat === 'pdf' ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span>Export PDF</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Portfolio Content */}
      <motion.div
        ref={portfolioRef}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 space-y-8"
      >
        {/* Profile Section */}
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
            <User className="w-12 h-12 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{owner.name}</h2>
            <p className="text-gray-600 text-lg capitalize">{owner.role}</p>
            {owner.email && (
              <div className="flex items-center justify-center space-x-2 mt-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">{owner.email}</span>
              </div>
            )}
            {owner.department && (
              <div className="flex items-center justify-center space-x-2 mt-1">
                <GraduationCap className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">{owner.department}</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-green-600">{approvedActivities.length}</h3>
            <p className="text-sm text-gray-600">Approved Activities</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-blue-600">{stats.totalHours}</h3>
            <p className="text-sm text-gray-600">Total Hours</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-purple-600">
              {approvedActivities.filter(a => a.category === 'Achievement').length}
            </h3>
            <p className="text-sm text-gray-600">Achievements</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-orange-600">
              {new Set(approvedActivities.map(a => a.category)).size}
            </h3>
            <p className="text-sm text-gray-600">Categories</p>
          </div>
        </motion.div>

        {/* Activities Section */}
        <motion.div variants={itemVariants} className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-2">
            Approved Activities
          </h3>
          
          {approvedActivities.length > 0 ? (
            <div className="space-y-6">
              {approvedActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  variants={itemVariants}
                  className="p-6 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        {activity.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">{activity.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(activity.date).toLocaleDateString()}</span>
                    </div>
                    
                    {activity.category && (
                      <div className="flex items-center space-x-1">
                        <Tag className="w-4 h-4" />
                        <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs">
                          {activity.category}
                        </span>
                      </div>
                    )}
                    
                    {activity.hours && (
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{activity.hours} hours</span>
                      </div>
                    )}
                  </div>
                  
                  {activity.approvedAt && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-500">
                        Approved on {new Date(activity.approvedAt).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              variants={itemVariants}
              className="text-center py-12"
            >
              <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No approved activities yet</h3>
              <p className="text-gray-500">
                Activities will appear here once they are approved by faculty.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Footer */}
        <motion.div variants={itemVariants} className="text-center pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Generated on {new Date().toLocaleDateString()} • EduConnect Portfolio System
          </p>
        </motion.div>
      </motion.div>

      {/* Export Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Export Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.button
            onClick={() => handleExport('pdf')}
            disabled={isExporting}
            className="btn-primary flex items-center justify-center space-x-2 disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isExporting && exportFormat === 'pdf' ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <File className="w-4 h-4" />
            )}
            <span>PDF Document</span>
          </motion.button>

          <motion.button
            onClick={() => handleExport('csv')}
            disabled={isExporting}
            className="btn-secondary flex items-center justify-center space-x-2 disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isExporting && exportFormat === 'csv' ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>CSV Data</span>
          </motion.button>

          <motion.button
            onClick={() => handleExport('json')}
            disabled={isExporting}
            className="btn-secondary flex items-center justify-center space-x-2 disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isExporting && exportFormat === 'json' ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>JSON Data</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default PortfolioViewer;
