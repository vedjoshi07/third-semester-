import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';

// Mock data to simulate API responses
export const MOCK_DATA = {
  students: [
    { id: '1', name: 'Alice Johnson', role: 'student', email: 'alice@university.edu', department: 'Computer Science', year: '2024' },
    { id: '2', name: 'Bob Smith', role: 'student', email: 'bob@university.edu', department: 'Engineering', year: '2023' },
    { id: '3', name: 'Carol Davis', role: 'student', email: 'carol@university.edu', department: 'Business', year: '2024' },
  ],
  faculty: [
    { id: '4', name: 'Dr. Sarah Wilson', role: 'faculty', email: 'sarah.wilson@university.edu', department: 'Computer Science' },
    { id: '5', name: 'Prof. Michael Brown', role: 'faculty', email: 'michael.brown@university.edu', department: 'Engineering' },
  ],
  admin: [
    { id: '6', name: 'Admin User', role: 'admin', email: 'admin@university.edu' },
  ],
  activities: [
    {
      id: nanoid(),
      userId: '1',
      title: 'Volunteer at Local Animal Shelter',
      description: 'Spent 20 hours volunteering at the local animal shelter, helping with animal care, cleaning facilities, and organizing adoption events. Gained valuable experience in animal welfare and community service.',
      status: 'approved',
      date: '2024-01-15',
      category: 'Community Service',
      hours: 20,
      proof: 'volunteer_certificate.pdf',
      extractedText: 'Certificate of Volunteer Service - Alice Johnson - 20 hours completed',
      approvedBy: '4',
      approvedAt: '2024-01-16',
    },
    {
      id: nanoid(),
      userId: '1',
      title: 'Computer Science Club President',
      description: 'Led the Computer Science Club for one academic year, organizing weekly meetings, hackathons, and coding workshops. Managed a team of 15 officers and coordinated events for 200+ members.',
      status: 'approved',
      date: '2023-09-01',
      category: 'Leadership',
      hours: 150,
      proof: 'leadership_certificate.pdf',
      extractedText: 'Leadership Certificate - Computer Science Club President - Alice Johnson',
      approvedBy: '4',
      approvedAt: '2023-09-15',
    },
    {
      id: nanoid(),
      userId: '2',
      title: 'Research Assistant - Machine Learning Project',
      description: 'Worked as a research assistant on a machine learning project focused on natural language processing. Collected and analyzed data, implemented algorithms, and contributed to research paper.',
      status: 'pending',
      date: '2024-01-20',
      category: 'Research',
      hours: 40,
      proof: 'research_proposal.pdf',
      extractedText: 'Research Assistant Application - Bob Smith - ML Project',
    },
    {
      id: nanoid(),
      userId: '2',
      title: 'Engineering Competition Winner',
      description: 'Won first place in the regional engineering design competition with a sustainable energy solution. Led a team of 4 students and presented the project to industry professionals.',
      status: 'approved',
      date: '2023-11-10',
      category: 'Achievement',
      hours: 80,
      proof: 'competition_certificate.pdf',
      extractedText: 'First Place - Regional Engineering Competition - Bob Smith',
      approvedBy: '5',
      approvedAt: '2023-11-15',
    },
    {
      id: nanoid(),
      userId: '3',
      title: 'Business Case Study Competition',
      description: 'Participated in a national business case study competition, analyzing market trends and developing strategic recommendations for a Fortune 500 company.',
      status: 'rejected',
      date: '2024-01-10',
      category: 'Competition',
      hours: 30,
      proof: 'case_study.pdf',
      extractedText: 'Business Case Study - Carol Davis - Market Analysis',
      rejectedBy: '4',
      rejectedAt: '2024-01-12',
      rejectionReason: 'Insufficient documentation and unclear learning outcomes',
    },
  ],
};

// Zustand store for global state management
export const useStore = create(
  persist(
    (set, get) => ({
      // User state
      user: null,
      isAuthenticated: false,
      
      // Application state
      currentPage: 'login',
      portfolioOwner: null,
      
      // Data state
      activities: MOCK_DATA.activities,
      notifications: [],
      
      // UI state
      isLoading: false,
      searchQuery: '',
      filterStatus: 'all',
      filterCategory: 'all',
      
      // Actions
      login: (user) => {
        set({ 
          user, 
          isAuthenticated: true, 
          currentPage: 'dashboard',
          notifications: []
        });
      },
      
      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false, 
          currentPage: 'login',
          portfolioOwner: null,
          notifications: [],
          searchQuery: '',
          filterStatus: 'all',
          filterCategory: 'all'
        });
      },
      
      setPage: (page) => set({ currentPage: page }),
      
      setPortfolioOwner: (owner) => set({ 
        portfolioOwner: owner, 
        currentPage: 'portfolioViewer' 
      }),
      
      addActivity: (activity) => {
        set((state) => ({
          activities: [...state.activities, activity]
        }));
      },
      
      updateActivity: (id, updates) => {
        set((state) => ({
          activities: state.activities.map(activity =>
            activity.id === id ? { ...activity, ...updates } : activity
          )
        }));
      },
      
      deleteActivity: (id) => {
        set((state) => ({
          activities: state.activities.filter(activity => activity.id !== id)
        }));
      },
      
      addNotification: (notification) => {
        const newNotification = {
          id: nanoid(),
          message: notification.message || notification,
          type: notification.type || 'info',
          timestamp: new Date().toISOString(),
          read: false
        };
        
        set((state) => ({
          notifications: [newNotification, ...state.notifications]
        }));
      },
      
      markNotificationAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map(notification =>
            notification.id === id ? { ...notification, read: true } : notification
          )
        }));
      },
      
      clearNotifications: () => set({ notifications: [] }),
      
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      setFilterStatus: (status) => set({ filterStatus: status }),
      
      setFilterCategory: (category) => set({ filterCategory: category }),
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      // Computed values
      getFilteredActivities: () => {
        const { activities, searchQuery, filterStatus, filterCategory } = get();
        
        return activities.filter(activity => {
          const matchesSearch = !searchQuery || 
            activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            activity.description.toLowerCase().includes(searchQuery.toLowerCase());
          
          const matchesStatus = filterStatus === 'all' || activity.status === filterStatus;
          const matchesCategory = filterCategory === 'all' || activity.category === filterCategory;
          
          return matchesSearch && matchesStatus && matchesCategory;
        });
      },
      
      getUserActivities: (userId) => {
        const { activities } = get();
        return activities.filter(activity => activity.userId === userId);
      },
      
      getPendingActivities: () => {
        const { activities } = get();
        return activities.filter(activity => activity.status === 'pending');
      },
      
      getUnreadNotifications: () => {
        const { notifications } = get();
        return notifications.filter(notification => !notification.read);
      },
      
      getActivityStats: () => {
        const { activities } = get();
        return {
          total: activities.length,
          approved: activities.filter(a => a.status === 'approved').length,
          pending: activities.filter(a => a.status === 'pending').length,
          rejected: activities.filter(a => a.status === 'rejected').length,
          totalHours: activities
            .filter(a => a.status === 'approved')
            .reduce((sum, a) => sum + (a.hours || 0), 0)
        };
      }
    }),
    {
      name: 'educonnect-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        activities: state.activities,
        notifications: state.notifications
      })
    }
  )
);
