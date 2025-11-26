import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const exportToPDF = async (elementRef, filename = 'portfolio') => {
  try {
    if (!elementRef.current) {
      throw new Error('No element reference provided');
    }

    // Create canvas from HTML element
    const canvas = await html2canvas(elementRef.current, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: elementRef.current.scrollWidth,
      height: elementRef.current.scrollHeight
    });

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    // Add first page
    pdf.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save the PDF
    pdf.save(`${filename}_portfolio.pdf`);
    
    return { success: true, message: 'PDF exported successfully' };
  } catch (error) {
    console.error('PDF export error:', error);
    return { success: false, error: error.message };
  }
};

export const exportToCSV = (data, filename = 'activities') => {
  try {
    if (!data || data.length === 0) {
      throw new Error('No data to export');
    }

    // Define CSV headers
    const headers = [
      'Title',
      'Description', 
      'Status',
      'Date',
      'Category',
      'Hours',
      'Approved By',
      'Approved At'
    ];

    // Convert data to CSV format
    const csvContent = [
      headers.join(','),
      ...data.map(activity => [
        `"${activity.title}"`,
        `"${activity.description.replace(/"/g, '""')}"`,
        activity.status,
        activity.date,
        activity.category || '',
        activity.hours || 0,
        activity.approvedBy || '',
        activity.approvedAt || ''
      ].join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_activities.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return { success: true, message: 'CSV exported successfully' };
  } catch (error) {
    console.error('CSV export error:', error);
    return { success: false, error: error.message };
  }
};

export const exportToJSON = (data, filename = 'activities') => {
  try {
    if (!data || data.length === 0) {
      throw new Error('No data to export');
    }

    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_activities.json`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return { success: true, message: 'JSON exported successfully' };
  } catch (error) {
    console.error('JSON export error:', error);
    return { success: false, error: error.message };
  }
};
