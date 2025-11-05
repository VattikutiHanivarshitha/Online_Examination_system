import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Layers, LogOut, User, Settings, BookOpen, List, BarChart, FileText, HelpCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Navigation links based on user role
  const navLinks = currentUser?.role === 'admin' 
    ? [
        { name: 'Dashboard', href: '/admin/dashboard', icon: <BookOpen className="w-5 h-5" /> },
        { name: 'Create Exam', href: '/admin/create-exam', icon: <FileText className="w-5 h-5" /> },
        { name: 'Manage Exams', href: '/admin/manage-exams', icon: <List className="w-5 h-5" /> },
        { name: 'Question Bank', href: '/admin/question-bank', icon: <HelpCircle className="w-5 h-5" /> }
      ]
    : [
        { name: 'Dashboard', href: '/student/dashboard', icon: <BookOpen className="w-5 h-5" /> },
        { name: 'Your Results', href: '/student/results', icon: <BarChart className="w-5 h-5" /> }
      ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and site name */}
            <div className="flex">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <Layers className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">ExamPro</span>
              </Link>
            </div>
            
            {/* User menu */}
            <div className="flex items-center">
              <div className="ml-3 relative flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-700">
                      {currentUser?.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {currentUser?.role === 'admin' ? 'Administrator' : 'Student'}
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  icon={<LogOut className="h-4 w-4" />}
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto border-r border-gray-200 bg-white">
              <div className="flex-1 flex flex-col">
                <nav className="flex-1 px-2 space-y-1">
                  {navLinks.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                          isActive
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <span className={`mr-3 ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'}`}>
                          {item.icon}
                        </span>
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                <Link to="/settings" className="flex-shrink-0 group block">
                  <div className="flex items-center">
                    <div>
                      <Settings className="inline-block h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                        Settings
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;