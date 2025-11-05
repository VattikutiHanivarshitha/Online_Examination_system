import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Users, Clock, Award, BarChart, TrendingUp } from 'lucide-react';
import Layout from '../../components/common/Layout';
import Button from '../../components/ui/Button';

const AdminDashboard: React.FC = () => {
  // Mock data for dashboard
  const stats = [
    { name: 'Active Exams', value: '12', icon: <FileText className="h-6 w-6 text-blue-500" /> },
    { name: 'Registered Students', value: '147', icon: <Users className="h-6 w-6 text-purple-500" /> },
    { name: 'Exams Completed', value: '285', icon: <Clock className="h-6 w-6 text-green-500" /> },
    { name: 'Certificates Issued', value: '57', icon: <Award className="h-6 w-6 text-amber-500" /> },
  ];

  // Mock recent activities
  const recentActivities = [
    { id: 1, activity: 'New user John Doe registered', time: '2 hours ago' },
    { id: 2, activity: 'Final Exam was completed by 15 students', time: '5 hours ago' },
    { id: 3, activity: 'Modified Math Quiz questions', time: '1 day ago' },
    { id: 4, activity: 'Created new Database Design exam', time: '2 days ago' },
  ];

  // Mock upcoming exams
  const upcomingExams = [
    { id: 1, name: 'JavaScript Fundamentals', date: 'Tomorrow, 10:00 AM', students: 23 },
    { id: 2, name: 'Web Design Principles', date: 'May 15, 2:00 PM', students: 18 },
    { id: 3, name: 'Database Systems', date: 'May 20, 9:00 AM', students: 15 },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <Link to="/admin/create-exam">
            <Button>Create New Exam</Button>
          </Link>
        </div>

        {/* Stats overview */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {stat.icon}
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">{stat.value}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    View all
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Activity timeline */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
              <TrendingUp className="h-5 w-5 text-gray-400" />
            </div>
            <div className="border-t border-gray-200">
              <ul role="list" className="divide-y divide-gray-200">
                {recentActivities.map((activity) => (
                  <li key={activity.id} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">{activity.activity}</p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    View all activity
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming exams */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Upcoming Exams</h3>
              <BarChart className="h-5 w-5 text-gray-400" />
            </div>
            <div className="border-t border-gray-200">
              <ul role="list" className="divide-y divide-gray-200">
                {upcomingExams.map((exam) => (
                  <li key={exam.id} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{exam.name}</p>
                        <p className="text-sm text-gray-500">{exam.date}</p>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {exam.students} students
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    View all exams
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance chart */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Performance Overview</h3>
            <div>
              <select
                id="timeframe"
                name="timeframe"
                className="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 3 months</option>
                <option>Last year</option>
              </select>
            </div>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="aspect-w-16 aspect-h-7 bg-gray-50 flex items-center justify-center rounded-md">
              <div className="text-center px-4 sm:px-6 lg:px-16 py-8">
                <p className="text-sm text-gray-500">Performance chart visualization would be here.</p>
                <p className="mt-2 text-sm text-gray-500">This would show student performance trends, exam completion rates, and average scores.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;