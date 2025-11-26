import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  ArrowLeft, 
  ArrowRight,
  Loader,
  AlertCircle,
  Calendar,
  Clock,
  Tag,
  Image as ImageIcon
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { simulateOCR, validateFile } from '../../utils/ocr';
import toast from 'react-hot-toast';

const ActivityForm = () => {
  const { user, addActivity, addNotification } = useStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    hours: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [file, setFile] = useState(null);
  const [ocrResult, setOcrResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Validate file
    const validation = validateFile(selectedFile);
    if (!validation.isValid) {
      toast.error(validation.errors[0]);
      return;
    }

    setFile(selectedFile);
    setIsProcessing(true);
    setOcrResult(null);

    try {
      const result = await simulateOCR(selectedFile);
      setOcrResult(result);
      toast.success('File processed successfully!');
    } catch (error) {
      toast.error('Failed to process file');
      console.error('OCR Error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    
    if (formData.hours && (isNaN(formData.hours) || formData.hours < 0)) {
      newErrors.hours = 'Hours must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      toast.error('Please upload a proof document');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate submission delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const newActivity = {
        id: Date.now().toString(),
        userId: user.id,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        hours: formData.hours ? parseInt(formData.hours) : null,
        status: 'pending',
        date: formData.date,
        proof: file.name,
        extractedText: ocrResult?.extractedText || null,
        submittedAt: new Date().toISOString()
      };

      addActivity(newActivity);
      addNotification({
        message: `Your activity "${formData.title}" has been submitted for approval.`,
        type: 'success'
      });

      toast.success('Activity submitted successfully!');

      // Reset form
      setStep(1);
      setFormData({
        title: '',
        description: '',
        category: '',
        hours: '',
        date: new Date().toISOString().split('T')[0]
      });
      setFile(null);
      setOcrResult(null);
      setErrors({});
    } catch (error) {
      toast.error('Failed to submit activity');
      console.error('Submission Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepVariants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Log New Activity</h1>
          <p className="text-gray-600">Document your achievements and experiences</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Step {step} of 2</span>
            <span className="text-sm text-gray-500">{Math.round((step / 2) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-primary-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(step / 2) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Title */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    <FileText className="w-4 h-4 inline mr-2" />
                    Activity Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`input-field ${errors.title ? 'border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="e.g., Volunteer at Local Animal Shelter"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.title}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    className={`input-field ${errors.description ? 'border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Describe your activity, what you learned, and its impact..."
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.description}
                    </p>
                  )}
                  <p className="text-gray-500 text-sm mt-1">
                    {formData.description.length}/500 characters
                  </p>
                </div>

                {/* Category and Date Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      <Tag className="w-4 h-4 inline mr-2" />
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className={`input-field ${errors.category ? 'border-red-500 focus:ring-red-500' : ''}`}
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.category}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className={`input-field ${errors.date ? 'border-red-500 focus:ring-red-500' : ''}`}
                    />
                    {errors.date && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.date}
                      </p>
                    )}
                  </div>
                </div>

                {/* Hours */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Hours Spent (Optional)
                  </label>
                  <input
                    type="number"
                    name="hours"
                    value={formData.hours}
                    onChange={handleInputChange}
                    min="0"
                    step="0.5"
                    className={`input-field ${errors.hours ? 'border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="e.g., 20"
                  />
                  {errors.hours && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.hours}
                    </p>
                  )}
                </div>

                {/* Next Button */}
                <div className="flex justify-end">
                  <motion.button
                    type="button"
                    onClick={handleNext}
                    className="btn-primary flex items-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* File Upload */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    <Upload className="w-4 h-4 inline mr-2" />
                    Upload Proof Document *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <ImageIcon className="w-12 h-12 text-gray-400 mb-4" />
                      <p className="text-lg font-medium text-gray-700 mb-2">
                        {file ? file.name : 'Click to upload or drag and drop'}
                      </p>
                      <p className="text-sm text-gray-500">
                        PDF, DOC, DOCX, JPG, PNG up to 10MB
                      </p>
                    </label>
                  </div>
                </div>

                {/* Processing Status */}
                {isProcessing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-blue-50 border border-blue-200 rounded-lg p-4"
                  >
                    <div className="flex items-center space-x-3">
                      <Loader className="animate-spin w-5 h-5 text-blue-600" />
                      <span className="text-blue-700">Processing document...</span>
                    </div>
                  </motion.div>
                )}

                {/* OCR Results */}
                {ocrResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                  >
                    <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Document Analysis
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Confidence: {Math.round(ocrResult.confidence * 100)}%
                    </p>
                    <div className="bg-white p-3 rounded border">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">
                        {ocrResult.extractedText}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-between">
                  <motion.button
                    type="button"
                    onClick={handleBack}
                    className="btn-secondary flex items-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </motion.button>

                  <motion.button
                    type="submit"
                    disabled={!file || isProcessing || isSubmitting}
                    className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting && <Loader className="animate-spin w-4 h-4" />}
                    <span>{isSubmitting ? 'Submitting...' : 'Submit Activity'}</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.div>
    </div>
  );
};

export default ActivityForm;
