import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, CheckCircle, Clock, Award, Calendar } from 'lucide-react';
import Layout from '../../components/common/Layout';
import Button from '../../components/ui/Button';

// Mock exam data
const availableExams = [
  {
    id: '1',
    title: 'JavaScript Fundamentals',
    description: 'Test your knowledge of JavaScript core concepts.',
    duration: 60,
    questions: 25,
    startDate: '2025-05-10T10:00:00',
    endDate: '2025-05-20T23:59:59',
  },
  {
    id: '2',
    title: 'Web Design Principles',
    description: 'Assess your understanding of modern web design concepts and techniques.',
    duration: 45,
    questions: 20,
    startDate: '2025-05-15T14:00:00',
    endDate: '2025-05-25T23:59:59',
  },
  {
    id: '3',
    title: 'Database Systems',
    description: 'Evaluate your knowledge of database design and SQL fundamentals.',
    duration: 75,
    questions: 30,
    startDate: '2025-05-20T09:00:00',
    endDate: '2025-05-30T23:59:59',
  },
];

// Mock completed exams
const completedExams = [
  {
    id: '101',
    title: 'HTML & CSS Basics',
    completedDate: '2025-04-28',
    score: 92,
    passing: 70,
    status: 'Passed',
  },
  {
    id: '102',
    title: 'Introduction to React',
    completedDate: '2025-04-15',
    score: 85,
    passing: 65,
    status: 'Passed',
  },
];

const StudentDashboard: React.FC = () => {
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>

        {/* Available Exams */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-blue-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Available Exams</h2>
            </div>
          </div>
          <ul role="list" className="divide-y divide-gray-200">
            {availableExams.map((exam) => (
              <li key={exam.id}>
                <div className="px-4 py-5 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-4 sm:mb-0">
                    <h3 className="text-lg font-medium text-gray-900">{exam.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{exam.description}</p>
                    <div className="mt-2 flex flex-wrap items-center text-sm text-gray-500">
                      <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      <span className="mr-4">{exam.duration} minutes</span>
                      <span className="mr-4">{exam.questions} questions</span>
                      <span>Available until: {formatDate(exam.endDate)}</span>
                    </div>
                  </div>
                  <div>
                    <Link to={`/student/take-exam/${exam.id}`}>
                      <Button>
                        Start Exam
                      </Button>
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Recently Completed */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:px-6 flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Recently Completed</h2>
          </div>
          <ul role="list" className="divide-y divide-gray-200">
            {completedExams.map((exam) => (
              <li key={exam.id}>
                <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className={`rounded-full h-10 w-10 flex items-center justify-center ${
                        exam.status === 'Passed' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {exam.status === 'Passed' ? (
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        ) : (
                          <Clock className="h-6 w-6 text-red-600" />
                        )}
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">{exam.title}</h3>
                      <div className="text-sm text-gray-500">
                        Completed on {exam.completedDate} | Score: {exam.score}% (Passing: {exam.passing}%)
                      </div>
                    </div>
                  </div>
                  <div>
                    <Link to={`/student/results/${exam.id}`}>
                      <Button variant="outline" size="sm">
                        View Results
                      </Button>
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="px-4 py-4 sm:px-6 border-t border-gray-200">
            <Link to="/student/results" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              View all completed exams
            </Link>
          </div>
        </div>

        {/* Upcoming Schedule */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:px-6 flex items-center">
            <Calendar className="h-5 w-5 text-amber-500 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Your Schedule</h2>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <ul className="divide-y divide-gray-200">
              {availableExams.slice(0, 2).map((exam) => (
                <li key={exam.id} className="py-3 flex justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{exam.title}</p>
                    <p className="text-sm text-gray-500">{formatDate(exam.startDate)}</p>
                  </div>
                  <div className="text-sm text-green-600">Available</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Your Achievements */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:px-6 flex items-center">
            <Award className="h-5 w-5 text-purple-500 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Your Achievements</h2>
          </div>
          <div className="px-4 py-5 sm:p-6 flex flex-wrap gap-4">
            <div className="bg-purple-50 rounded-lg p-4 flex flex-col items-center">
              <Award className="h-8 w-8 text-purple-600" />
              <span className="mt-2 text-sm font-medium text-purple-800">Perfect Score</span>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <span className="mt-2 text-sm font-medium text-blue-800">5 Exams Completed</span>
            </div>
            <div className="bg-amber-50 rounded-lg p-4 flex flex-col items-center">
              <Clock className="h-8 w-8 text-amber-600" />
              <span className="mt-2 text-sm font-medium text-amber-800">Speedy Finisher</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentDashboard;