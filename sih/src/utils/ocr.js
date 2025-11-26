// Utility function to simulate OCR processing
export const simulateOCR = (file) => {
  return new Promise((resolve, reject) => {
    // Simulate network latency
    setTimeout(() => {
      try {
        // Mock OCR results based on file type
        const fileExtension = file.name.split('.').pop().toLowerCase();
        let mockText = '';
        
        switch (fileExtension) {
          case 'pdf':
            mockText = `PDF Document Analysis:
            Document Type: Certificate/Award
            Student Name: [Extracted from document]
            Institution: University Name
            Date: ${new Date().toLocaleDateString()}
            Description: This appears to be an official certificate or award document.
            Key Information: Achievement details, verification codes, and official signatures detected.`;
            break;
            
          case 'jpg':
          case 'jpeg':
          case 'png':
            mockText = `Image Analysis Results:
            Document Type: Certificate/Photo
            Text Recognition: High confidence
            Detected Elements: 
            - Official letterhead
            - Student name and ID
            - Achievement title
            - Date and signature
            - Institution logo
            
            Note: This image contains clear, readable text that has been successfully extracted.`;
            break;
            
          case 'doc':
          case 'docx':
            mockText = `Word Document Analysis:
            Document Type: Report/Application
            Content Summary: This document contains detailed information about the student's activity or achievement.
            Key Sections Identified:
            - Personal information
            - Activity description
            - Learning outcomes
            - Supporting evidence
            - Contact information`;
            break;
            
          default:
            mockText = `File Analysis:
            File Type: ${fileExtension.toUpperCase()}
            Content: This file has been processed and analyzed.
            Note: Text extraction completed successfully.
            Timestamp: ${new Date().toISOString()}`;
        }
        
        resolve({
          success: true,
          extractedText: mockText,
          confidence: Math.random() * 0.3 + 0.7, // 70-100% confidence
          processingTime: Math.random() * 1000 + 500, // 500-1500ms
          fileInfo: {
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified
          }
        });
      } catch (error) {
        reject({
          success: false,
          error: 'Failed to process file',
          details: error.message
        });
      }
    }, Math.random() * 1000 + 500); // 500-1500ms delay
  });
};

// Real OCR implementation would use services like:
// - Google Cloud Vision API
// - AWS Textract
// - Azure Computer Vision
// - Tesseract.js for client-side processing

export const validateFile = (file) => {
  const allowedTypes = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  
  const maxSize = 10 * 1024 * 1024; // 10MB
  
  const errors = [];
  
  if (!allowedTypes.includes(file.type)) {
    errors.push('File type not supported. Please upload PDF, DOC, DOCX, JPG, or PNG files.');
  }
  
  if (file.size > maxSize) {
    errors.push('File size too large. Please upload files smaller than 10MB.');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
