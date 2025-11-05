import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Edit, Trash, Eye, Copy, Users, Clock, Plus } from 'lucide-react';
import Layout from '../../components/common/Layout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

// Mock exam data
const mockExams = [
  {
    id: '1',
    title: 'JavaScript Fundamentals',
    description: 'Test your knowledge of JavaScript core concepts.',
    createdAt: '2025-04-20',
    status: 'Active',
    questions: 25,
    duration: 60,
    attempts: 48,
    avgScore: 78,
  },
  {
    id: '2',
    title: 'Web Design Principles',
    description: 'Assess your understanding of modern web design concepts and techniques.',
    createdAt: '2025-04-15',
    status: 'Active',
    questions: 20,
    duration: 45,
    attempts: 36,
    avgScore: 82,
  },
  {
    id: '3',
    title: 'Database Systems',
    description: 'Evaluate your knowledge of database design and SQL fundamentals.',
    createdAt: '2025-04-10',
    status: 'Draft',
    questions: 30,
    duration: 75,
    attempts: 0,
    avgScore: 0,
  },
  {
    id: '4',
    title: 'Introduction to React',
    description: 'Test your understanding of React basics and component architecture.',
    createdAt: '2025-04-05',
    status: 'Expired',
    questions: 22,
    duration: 50,
    attempts: 65,
    avgScore: 74,
  },
];

const ManageExams: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [exams, setExams] = useState(mockExams);
  
  // Filter exams based on search term and status
  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          exam.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || exam.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });
  
  // Delete exam handler
  const handleDeleteExam = (id: string) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      setExams(exams.filter(exam => exam.id !== id));
    }
  };
  
  // Duplicate exam handler
  const handleDuplicateExam = (id: string) => {
    const examToDuplicate = exams.find(exam => exam.id === id);
    if (examToDuplicate) {
      const newExam = {
        ...examToDuplicate,
        id: Math.random().toString(36).substr(2, 9),
        title: `${examToDuplicate.title} (Copy)`,
        status: 'Draft',
        attempts: 0,
        avgScore: 0,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setExams([...exams, newExam]);
    }
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Manage Exams</h1>
          <div className="mt-4 sm:mt-0">
            <Link to="/admin/create-exam">
              <Button icon={<Plus className="h-4 w-4" />}>
                Create New Exam
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Filters */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <Input
                  label="Search Exams"
                  placeholder="Search by title or description"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  fullWidth
                />
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status-filter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="expired">Expired</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Exams Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 sm:px-6 py-5 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Your Exams</h2>
          </div>
          
          {filteredExams.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Exam
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Questions
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Attempts
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Avg. Score
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredExams.map((exam) => (
                    <tr key={exam.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-100 rounded-lg">
                            <FileText className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{exam.title}</div>
                            <div className="text-sm text-gray-500">Created on {exam.createdAt}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          exam.status === 'Active' 
                            ? 'bg-green-100 text-green-800'
                            : exam.status === 'Draft'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                        }`}>
                          {exam.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {exam.questions}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {exam.duration} min
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-gray-400 mr-1" />
                          {exam.attempts}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {exam.avgScore > 0 ? `${exam.avgScore}%` : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button 
                            className="text-gray-400 hover:text-gray-500"
                            title="View"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <button 
                            className="text-indigo-600 hover:text-indigo-900"
                            title="Edit"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button 
                            className="text-blue-600 hover:text-blue-900"
                            title="Duplicate"
                            onClick={() => handleDuplicateExam(exam.id)}
                          >
                            <Copy className="h-5 w-5" />
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                            onClick={() => handleDeleteExam(exam.id)}
                          >
                            <Trash className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-4 py-5 sm:p-6 text-center">
              <p className="text-gray-500">
                {searchTerm || statusFilter !== 'all' 
                  ? 'No exams match your filters.' 
                  : 'No exams available. Create your first exam!'}
              </p>
              {(searchTerm || statusFilter !== 'all') && (
                <Button 
                  variant="outline" 
                  className="mt-4" 
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </div>
        
        {/* Stats summary */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FileText className="h-6 w-6 text-blue-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Exams</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{exams.length}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Clock className="h-6 w-6 text-green-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Active Exams</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {exams.filter(e => e.status === 'Active').length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-6 w-6 text-purple-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Attempts</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {exams.reduce((sum, exam) => sum + exam.attempts, 0)}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Eye className="h-6 w-6 text-amber-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Average Score</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {Math.round(
                          exams.filter(e => e.attempts > 0)
                            .reduce((sum, exam) => sum + exam.avgScore, 0) / 
                          exams.filter(e => e.attempts > 0).length
                        )}%
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ManageExams;