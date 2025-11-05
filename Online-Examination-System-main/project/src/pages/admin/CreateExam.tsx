import React, { useState } from 'react';
import { PlusCircle, Save, Clock, Settings } from 'lucide-react';
import Layout from '../../components/common/Layout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import QuestionEditor, { Question, QuestionType } from '../../components/admin/QuestionEditor';

const CreateExam: React.FC = () => {
  // Exam settings state
  const [examTitle, setExamTitle] = useState('');
  const [examDescription, setExamDescription] = useState('');
  const [duration, setDuration] = useState(60); // minutes
  const [passingScore, setPassingScore] = useState(70); // percentage
  const [isRandomizeQuestions, setIsRandomizeQuestions] = useState(false);
  const [showResults, setShowResults] = useState(true);
  
  // Questions state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Create a new blank question
  const createNewQuestion = () => {
    const newQuestion: Question = {
      id: Math.random().toString(36).substring(2, 9),
      text: '',
      type: 'multiple-choice',
      options: [
        { id: '1', text: '', isCorrect: false },
        { id: '2', text: '', isCorrect: false },
      ],
      points: 1,
    };
    
    setCurrentQuestion(newQuestion);
    setIsEditing(true);
  };

  // Edit an existing question
  const handleEditQuestion = (question: Question) => {
    setCurrentQuestion(question);
    setIsEditing(true);
  };

  // Delete a question
  const handleDeleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  // Save question from editor
  const handleSaveQuestion = (question: Question) => {
    // Check if it's an edit or a new question
    if (questions.some(q => q.id === question.id)) {
      setQuestions(questions.map(q => q.id === question.id ? question : q));
    } else {
      setQuestions([...questions, question]);
    }
    
    setCurrentQuestion(null);
    setIsEditing(false);
  };

  // Cancel question editing
  const handleCancelEdit = () => {
    setCurrentQuestion(null);
    setIsEditing(false);
  };

  // Calculate total points
  const totalPoints = questions.reduce((sum, question) => sum + question.points, 0);

  // Handle exam creation
  const handleCreateExam = () => {
    // In a real app, this would submit to an API
    console.log({
      title: examTitle,
      description: examDescription,
      duration,
      passingScore,
      isRandomizeQuestions,
      showResults,
      questions,
      totalPoints,
    });
    
    alert('Exam created successfully!');
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Create New Exam</h1>
          <Button icon={<Save className="h-4 w-4" />} onClick={handleCreateExam}>
            Save & Publish Exam
          </Button>
        </div>

        {/* Exam Settings */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 flex items-center">
            <Settings className="h-5 w-5 text-gray-400 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Exam Settings</h2>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <Input
                  label="Exam Title"
                  value={examTitle}
                  onChange={(e) => setExamTitle(e.target.value)}
                  placeholder="Enter a descriptive title for your exam"
                  fullWidth
                />
              </div>
              
              <div className="sm:col-span-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                  placeholder="Provide instructions or details about this exam"
                  value={examDescription}
                  onChange={(e) => setExamDescription(e.target.value)}
                />
              </div>
              
              <div className="sm:col-span-3">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <Input
                    label="Duration (minutes)"
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
                    min={1}
                    fullWidth
                  />
                </div>
              </div>
              
              <div className="sm:col-span-3">
                <Input
                  label="Passing Score (%)"
                  type="number"
                  value={passingScore}
                  onChange={(e) => setPassingScore(parseInt(e.target.value) || 0)}
                  min={0}
                  max={100}
                  fullWidth
                />
              </div>
              
              <div className="sm:col-span-3">
                <div className="flex items-center">
                  <input
                    id="randomize-questions"
                    name="randomize-questions"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={isRandomizeQuestions}
                    onChange={(e) => setIsRandomizeQuestions(e.target.checked)}
                  />
                  <label htmlFor="randomize-questions" className="ml-2 block text-sm text-gray-900">
                    Randomize question order
                  </label>
                </div>
              </div>
              
              <div className="sm:col-span-3">
                <div className="flex items-center">
                  <input
                    id="show-results"
                    name="show-results"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={showResults}
                    onChange={(e) => setShowResults(e.target.checked)}
                  />
                  <label htmlFor="show-results" className="ml-2 block text-sm text-gray-900">
                    Show results immediately after submission
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Questions Section */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Exam Questions</h2>
            <div className="text-sm text-gray-500">
              Total Questions: {questions.length} | Total Points: {totalPoints}
            </div>
          </div>
          
          {isEditing ? (
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              {currentQuestion && (
                <QuestionEditor
                  question={currentQuestion}
                  onSave={handleSaveQuestion}
                  onCancel={handleCancelEdit}
                />
              )}
            </div>
          ) : (
            <>
              <div className="border-t border-gray-200">
                {questions.length > 0 ? (
                  <ul role="list" className="divide-y divide-gray-200">
                    {questions.map((question, index) => (
                      <li key={question.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 bg-blue-100 text-blue-800 font-bold rounded-full h-8 w-8 flex items-center justify-center">
                              {index + 1}
                            </div>
                            <div className="ml-4 truncate">
                              <div className="font-medium text-gray-900">{question.text || 'Untitled Question'}</div>
                              <div className="text-sm text-gray-500">
                                {question.type.charAt(0).toUpperCase() + question.type.slice(1).replace('-', ' ')} | 
                                {question.points} {question.points === 1 ? 'point' : 'points'}
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditQuestion(question)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteQuestion(question.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-4 py-8 text-center">
                    <p className="text-gray-500">No questions added yet. Click the button below to start creating questions.</p>
                  </div>
                )}
              </div>
              
              <div className="border-t border-gray-200 px-4 py-4 sm:px-6 flex justify-center">
                <Button 
                  onClick={createNewQuestion}
                  icon={<PlusCircle className="h-4 w-4" />}
                >
                  Add New Question
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CreateExam;