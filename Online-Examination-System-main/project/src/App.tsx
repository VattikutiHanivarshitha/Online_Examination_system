import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminDashboard from './pages/admin/Dashboard';
import CreateExam from './pages/admin/CreateExam';
import ManageExams from './pages/admin/ManageExams';
import QuestionBank from './pages/admin/QuestionBank';
import StudentDashboard from './pages/student/Dashboard';
import TakeExam from './pages/student/TakeExam';
import ExamResults from './pages/student/ExamResults';
import NotFound from './pages/NotFound';
import LandingPage from './pages/LandingPage';

// Protected route component
const ProtectedRoute = ({ 
  children, 
  allowedRoles 
}: { 
  children: React.ReactNode;
  allowedRoles: string[];
}) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to={currentUser.role === 'admin' ? '/admin/dashboard' : '/student/dashboard'} replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Admin routes */}
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/create-exam" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <CreateExam />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/manage-exams" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <ManageExams />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/question-bank" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <QuestionBank />
              </ProtectedRoute>
            } 
          />
          
          {/* Student routes */}
          <Route 
            path="/student/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student/take-exam/:examId" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <TakeExam />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student/results/:examId" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <ExamResults />
              </ProtectedRoute>
            } 
          />
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;