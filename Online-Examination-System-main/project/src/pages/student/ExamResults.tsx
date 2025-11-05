import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Award, ArrowLeft, Download, Share2 } from 'lucide-react';
import Layout from '../../components/common/Layout';
import Button from '../../components/ui/Button';

// Mock result data
const mockResult = {
  id: '1',
  examTitle: 'JavaScript Fundamentals',
  studentName: 'Alex Johnson',
  dateCompleted: '2025-05-10T15:30:00',
  timeSpent: '48:22', // minutes:seconds
  totalQuestions: 5,
  correctAnswers: 4,
  incorrectAnswers: 1,
  score: 85,
  passingScore: 70,
  status: 'Passed',
  questions: [
    {
      id: '1',
      text: 'Which of the following is NOT a primitive data type in JavaScript?',
      type: 'multiple-choice',
      userAnswer: 'Object',
      correctAnswer: 'Object',
      isCorrect: true,
      points: 2,
      earnedPoints: 2,
      explanation: 'Object is a non-primitive (reference) data type in JavaScript. The primitive data types are String, Number, Boolean, Null, Undefined, and Symbol.'
    },
    {
      id: '2',
      text: 'JavaScript is a synchronous programming language.',
      type: 'true-false',
      userAnswer: 'False',
      correctAnswer: 'False',
      isCorrect: true,
      points: 1,
      earnedPoints: 1,
      explanation: 'JavaScript is primarily asynchronous, allowing operations to continue while waiting for other operations to complete.'
    },
    {
      id: '3',
      text: 'What does the === operator do in JavaScript?',
      type: 'multiple-choice',
      userAnswer: 'Compares value and type',
      correctAnswer: 'Compares value and type',
      isCorrect: true,
      points: 2,
      earnedPoints: 2,
      explanation: 'The === (strict equality) operator checks both value and type equality without performing type conversion.'
    },
    {
      id: '4',
      text: 'What is the output of: console.log(typeof [])?',
      type: 'short-answer',
      userAnswer: 'array',
      correctAnswer: 'object',
      isCorrect: false,
      points: 3,
      earnedPoints: 0,
      explanation: 'In JavaScript, arrays are objects, so typeof [] returns "object". To check if something is an array, use Array.isArray().'
    },
    {
      id: '5',
      text: 'Explain the concept of closures in JavaScript and provide an example.',
      type: 'essay',
      userAnswer: 'A closure is when a function can remember and access variables from the place where it was defined, even after that outer function has finished executing. Example: function createCounter() { let count = 0; return function() { return ++count; }; } const counter = createCounter(); counter(); // 1, counter(); // 2',
      isCorrect: true,
      points: 5,
      earnedPoints: 5,
      feedback: 'Excellent explanation with a clear example of a counter implementation using closures.'
    },
  ],
};

const ExamResults: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const [result, setResult] = useState(mockResult);
  
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Calculate total points and earned points
  const totalPoints = result.questions.reduce((sum, q) => sum + q.points, 0);
  const earnedPoints = result.questions.reduce((sum, q) => sum + q.earnedPoints, 0);
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <Link to="/student/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-500">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Link>
            <h1 className="mt-2 text-2xl font-bold text-gray-900">{result.examTitle} Results</h1>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button 
              variant="outline"
              size="sm"
              icon={<Download className="h-4 w-4" />}
            >
              Download PDF
            </Button>
            <Button 
              variant="outline"
              size="sm"
              icon={<Share2 className="h-4 w-4" />}
            >
              Share Results
            </Button>
          </div>
        </div>
        
        {/* Results summary */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center bg-gray-50">
            <h2 className="text-lg font-medium text-gray-900">Exam Summary</h2>
            <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
              result.status === 'Passed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {result.status}
            </div>
          </div>
          
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column - Exam details */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Student</p>
                  <p className="mt-1 text-lg text-gray-900">{result.studentName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Date Completed</p>
                  <p className="mt-1 text-lg text-gray-900">{formatDate(result.dateCompleted)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Time Spent</p>
                  <p className="mt-1 text-lg text-gray-900">{result.timeSpent}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Questions</p>
                  <p className="mt-1 text-lg text-gray-900">
                    {result.correctAnswers} correct / {result.totalQuestions} total
                  </p>
                </div>
              </div>
              
              {/* Right column - Score visualization */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative h-36 w-36">
                  <svg className="h-full w-full" viewBox="0 0 36 36">
                    {/* Background circle */}
                    <circle 
                      cx="18" 
                      cy="18" 
                      r="16" 
                      fill="none" 
                      stroke="#e5e7eb" 
                      strokeWidth="2"
                    />
                    {/* Progress circle */}
                    <circle 
                      cx="18" 
                      cy="18" 
                      r="16" 
                      fill="none" 
                      stroke={result.status === 'Passed' ? '#10b981' : '#ef4444'} 
                      strokeWidth="2" 
                      strokeDasharray={`${100 * Math.PI / 1.8} ${100 * Math.PI}`} 
                      strokeDashoffset={`${100 * Math.PI / 1.8 - (result.score * Math.PI / 1.8)}`} 
                      transform="rotate(-90 18 18)" 
                    />
                    {/* Center text */}
                    <text 
                      x="18" 
                      y="18" 
                      dominantBaseline="middle" 
                      textAnchor="middle" 
                      fontSize="8" 
                      fontWeight="bold" 
                      fill={result.status === 'Passed' ? '#10b981' : '#ef4444'}
                    >
                      {result.score}%
                    </text>
                  </svg>
                  
                  {/* Score label */}
                  <div className="absolute bottom-0 left-0 right-0 text-center">
                    <p className="text-sm font-medium text-gray-500">Score</p>
                    <p className="text-lg font-semibold">
                      {earnedPoints} / {totalPoints} points
                    </p>
                  </div>
                </div>
                
                {/* Passing score indicator */}
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">Passing Score: {result.passingScore}%</p>
                  {result.status === 'Passed' && (
                    <div className="mt-2 flex items-center justify-center text-green-600">
                      <Award className="h-5 w-5 mr-1" />
                      <span className="font-medium">Congratulations!</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Detailed results */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900">Detailed Results</h2>
            <p className="mt-1 text-sm text-gray-500">
              Review your responses and correct answers for each question.
            </p>
          </div>
          
          <div className="border-t border-gray-200">
            {result.questions.map((question, index) => (
              <div key={question.id} className="border-b border-gray-200 last:border-b-0">
                <div className="px-4 py-5 sm:p-6 space-y-4">
                  <div className="flex items-start">
                    {/* Question number */}
                    <div className="flex-shrink-0 mr-3">
                      <div className={`rounded-full h-8 w-8 flex items-center justify-center text-sm font-medium ${
                        question.isCorrect 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {index + 1}
                      </div>
                    </div>
                    
                    {/* Question content */}
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-medium text-gray-900">{question.text}</h3>
                        <div className="ml-4 flex-shrink-0 flex items-center">
                          {question.isCorrect ? (
                            <>
                              <CheckCircle className="h-5 w-5 text-green-500 mr-1" />
                              <span className="text-sm font-medium text-green-700">
                                +{question.earnedPoints} points
                              </span>
                            </>
                          ) : (
                            <>
                              <XCircle className="h-5 w-5 text-red-500 mr-1" />
                              <span className="text-sm font-medium text-red-700">
                                0/{question.points} points
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      
                      {/* User answer */}
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-500">Your Answer:</p>
                        <div className={`mt-1 p-3 rounded-md ${
                          question.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                        }`}>
                          {question.userAnswer || <em className="text-gray-500">No answer provided</em>}
                        </div>
                      </div>
                      
                      {/* Correct answer if wrong */}
                      {!question.isCorrect && question.type !== 'essay' && (
                        <div className="mt-4">
                          <p className="text-sm font-medium text-gray-500">Correct Answer:</p>
                          <div className="mt-1 p-3 rounded-md bg-green-50 border border-green-200">
                            {question.correctAnswer}
                          </div>
                        </div>
                      )}
                      
                      {/* Explanation or feedback */}
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-500">
                          {question.type === 'essay' ? 'Feedback:' : 'Explanation:'}
                        </p>
                        <p className="mt-1 text-sm text-gray-700">
                          {question.type === 'essay' ? question.feedback : question.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Certificate section */}
        {result.status === 'Passed' && (
          <div className="bg-white shadow sm:rounded-lg overflow-hidden">
            <div className="p-6 flex flex-col items-center justify-center text-center">
              <Award className="h-12 w-12 text-amber-500 mb-3" />
              <h3 className="text-lg font-medium text-gray-900">Certificate of Completion</h3>
              <p className="mt-2 text-sm text-gray-500">
                Congratulations on passing {result.examTitle}! Your certificate is ready to download.
              </p>
              <Button className="mt-4" icon={<Download className="h-4 w-4" />}>
                Download Certificate
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ExamResults;