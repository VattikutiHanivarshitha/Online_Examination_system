import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, AlertTriangle, ChevronLeft, ChevronRight, Save } from 'lucide-react';
import Button from '../../components/ui/Button';
import { Question } from '../../components/admin/QuestionEditor';

// Mock exam data
const mockExam = {
  id: '1',
  title: 'JavaScript Fundamentals',
  description: 'Test your knowledge of JavaScript core concepts.',
  timeLimit: 60, // minutes
  questions: [
    {
      id: '1',
      text: 'Which of the following is NOT a primitive data type in JavaScript?',
      type: 'multiple-choice' as const,
      options: [
        { id: '1', text: 'String', isCorrect: false },
        { id: '2', text: 'Number', isCorrect: false },
        { id: '3', text: 'Object', isCorrect: true },
        { id: '4', text: 'Boolean', isCorrect: false },
      ],
      points: 2,
    },
    {
      id: '2',
      text: 'JavaScript is a synchronous programming language.',
      type: 'true-false' as const,
      options: [
        { id: '1', text: 'True', isCorrect: false },
        { id: '2', text: 'False', isCorrect: true },
      ],
      points: 1,
    },
    {
      id: '3',
      text: 'What does the === operator do in JavaScript?',
      type: 'multiple-choice' as const,
      options: [
        { id: '1', text: 'Assigns a value', isCorrect: false },
        { id: '2', text: 'Compares value only', isCorrect: false },
        { id: '3', text: 'Compares value and type', isCorrect: true },
        { id: '4', text: 'Logical OR operation', isCorrect: false },
      ],
      points: 2,
    },
    {
      id: '4',
      text: 'What is the output of: console.log(typeof [])?',
      type: 'short-answer' as const,
      options: [],
      points: 3,
      correctAnswer: 'object',
    },
    {
      id: '5',
      text: 'Explain the concept of closures in JavaScript and provide an example.',
      type: 'essay' as const,
      options: [],
      points: 5,
    },
  ],
};

interface Answer {
  questionId: string;
  selectedOptions?: string[];
  textAnswer?: string;
}

const TakeExam: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  
  const [exam, setExam] = useState(mockExam);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(mockExam.timeLimit * 60); // in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize answers
  useEffect(() => {
    const initialAnswers = exam.questions.map(question => ({
      questionId: question.id,
      selectedOptions: [],
      textAnswer: '',
    }));
    setAnswers(initialAnswers);
  }, [exam]);
  
  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Format time remaining
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const currentQuestion = exam.questions[currentQuestionIndex];
  
  // Handle option selection for multiple choice and true/false
  const handleOptionSelect = (optionId: string) => {
    const updatedAnswers = [...answers];
    const currentAnswer = updatedAnswers[currentQuestionIndex];
    
    // For true/false and multiple-choice, replace the selection
    if (currentQuestion.type === 'true-false' || currentQuestion.type === 'multiple-choice') {
      currentAnswer.selectedOptions = [optionId];
    } 
    
    setAnswers(updatedAnswers);
  };
  
  // Handle text input for short answer and essay
  const handleTextAnswer = (text: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex].textAnswer = text;
    setAnswers(updatedAnswers);
  };
  
  // Navigation
  const goToNextQuestion = () => {
    if (currentQuestionIndex < exam.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  // Handle exam submission
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // In a real app, this would submit to an API
    console.log('Submitting answers:', answers);
    
    // Navigate to results page
    setTimeout(() => {
      navigate(`/student/results/${examId}`);
    }, 1500);
  };
  
  // Calculate progress
  const progress = ((currentQuestionIndex + 1) / exam.questions.length) * 100;
  
  // Determine if current question has been answered
  const isCurrentQuestionAnswered = () => {
    const currentAnswer = answers[currentQuestionIndex];
    if (!currentAnswer) return false;
    
    if (currentQuestion.type === 'multiple-choice' || currentQuestion.type === 'true-false') {
      return (currentAnswer.selectedOptions?.length || 0) > 0;
    } else {
      return !!currentAnswer.textAnswer?.trim();
    }
  };
  
  // Check if time is running low (less than 5 minutes)
  const isTimeRunningLow = timeRemaining < 300;
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header with exam info and timer */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{exam.title}</h1>
            </div>
            <div className={`flex items-center ${isTimeRunningLow ? 'text-red-600' : 'text-gray-700'}`}>
              <Clock className={`h-5 w-5 mr-1 ${isTimeRunningLow ? 'animate-pulse' : ''}`} />
              <span className="font-mono text-lg font-medium">{formatTime(timeRemaining)}</span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Progress bar */}
      <div className="w-full bg-gray-200">
        <div 
          className="bg-blue-600 h-1 transition-all duration-300" 
          style={{ width: `${progress}%` }} 
        />
      </div>
      
      {/* Main content */}
      <main className="flex-1 py-6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {/* Question number and points */}
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center bg-gray-50">
              <div className="flex items-center">
                <div className="bg-blue-100 text-blue-800 font-bold rounded-full h-8 w-8 flex items-center justify-center mr-2">
                  {currentQuestionIndex + 1}
                </div>
                <span className="text-sm text-gray-500">
                  Question {currentQuestionIndex + 1} of {exam.questions.length}
                </span>
              </div>
              <div className="text-sm font-medium text-gray-700">
                {currentQuestion.points} {currentQuestion.points === 1 ? 'point' : 'points'}
              </div>
            </div>
            
            {/* Question text */}
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">{currentQuestion.text}</h2>
              
              {/* Question type specific UI */}
              <div className="mt-6">
                {(currentQuestion.type === 'multiple-choice' || currentQuestion.type === 'true-false') && (
                  <div className="space-y-3">
                    {currentQuestion.options.map((option) => {
                      const isSelected = answers[currentQuestionIndex]?.selectedOptions?.includes(option.id);
                      return (
                        <div 
                          key={option.id}
                          className={`border rounded-md p-4 cursor-pointer transition-all duration-200 ${
                            isSelected 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => handleOptionSelect(option.id)}
                        >
                          <div className="flex items-center">
                            <div className={`h-5 w-5 border rounded-full flex items-center justify-center mr-3 ${
                              isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                            }`}>
                              {isSelected && (
                                <div className="h-2 w-2 rounded-full bg-white" />
                              )}
                            </div>
                            <span className={`${isSelected ? 'text-blue-700' : 'text-gray-900'}`}>
                              {option.text}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                
                {currentQuestion.type === 'short-answer' && (
                  <div>
                    <input
                      type="text"
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Type your answer here"
                      value={answers[currentQuestionIndex]?.textAnswer || ''}
                      onChange={(e) => handleTextAnswer(e.target.value)}
                    />
                  </div>
                )}
                
                {currentQuestion.type === 'essay' && (
                  <div>
                    <textarea
                      rows={6}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Type your answer here"
                      value={answers[currentQuestionIndex]?.textAnswer || ''}
                      onChange={(e) => handleTextAnswer(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
            
            {/* Navigation buttons */}
            <div className="px-4 py-4 sm:px-6 bg-gray-50 flex justify-between">
              <Button
                variant="outline"
                onClick={goToPreviousQuestion}
                disabled={currentQuestionIndex === 0}
                icon={<ChevronLeft className="h-4 w-4" />}
              >
                Previous
              </Button>
              
              {currentQuestionIndex < exam.questions.length - 1 ? (
                <Button
                  onClick={goToNextQuestion}
                  disabled={!isCurrentQuestionAnswered()}
                  icon={<ChevronRight className="h-4 w-4" />}
                  iconPosition="right"
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="success"
                  onClick={handleSubmit}
                  isLoading={isSubmitting}
                  icon={<Save className="h-4 w-4" />}
                >
                  Submit Exam
                </Button>
              )}
            </div>
          </div>
          
          {/* Question navigation */}
          <div className="mt-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {exam.questions.map((_, index) => {
                const isAnswered = answers[index]?.selectedOptions?.length || answers[index]?.textAnswer?.trim();
                return (
                  <button
                    key={index}
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      currentQuestionIndex === index
                        ? 'bg-blue-600 text-white'
                        : isAnswered
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                    onClick={() => setCurrentQuestionIndex(index)}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Warning if time is running low */}
          {isTimeRunningLow && (
            <div className="mt-6 rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Time is running out!</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>You have less than 5 minutes remaining. Please finish your exam soon.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TakeExam;