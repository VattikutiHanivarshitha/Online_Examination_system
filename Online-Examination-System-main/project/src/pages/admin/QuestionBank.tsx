import React, { useState } from 'react';
import { PlusCircle, Search, Filter, FolderPlus, HelpCircle } from 'lucide-react';
import Layout from '../../components/common/Layout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import QuestionEditor, { Question } from '../../components/admin/QuestionEditor';

// Mock categories
const categories = [
  { id: '1', name: 'JavaScript', count: 25 },
  { id: '2', name: 'HTML & CSS', count: 18 },
  { id: '3', name: 'React', count: 15 },
  { id: '4', name: 'Database', count: 12 },
  { id: '5', name: 'Network', count: 8 },
];

// Mock questions
const initialQuestions: Question[] = [
  {
    id: '1',
    text: 'Which of the following is NOT a primitive data type in JavaScript?',
    type: 'multiple-choice',
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
    type: 'true-false',
    options: [
      { id: '1', text: 'True', isCorrect: false },
      { id: '2', text: 'False', isCorrect: true },
    ],
    points: 1,
  },
  {
    id: '3',
    text: 'What does the === operator do in JavaScript?',
    type: 'multiple-choice',
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
    type: 'short-answer',
    options: [],
    points: 3,
    correctAnswer: 'object',
  },
  {
    id: '5',
    text: 'Explain the concept of closures in JavaScript and provide an example.',
    type: 'essay',
    options: [],
    points: 5,
  },
];

const QuestionBank: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  
  // New question template
  const newQuestionTemplate: Question = {
    id: Math.random().toString(36).substr(2, 9),
    text: '',
    type: 'multiple-choice',
    options: [
      { id: '1', text: '', isCorrect: false },
      { id: '2', text: '', isCorrect: false },
    ],
    points: 1,
  };
  
  // Filtered questions based on search and category
  const filteredQuestions = questions.filter(question => {
    const matchesSearch = !searchTerm || question.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || true; // In a real app, you'd check the question's category
    return matchesSearch && matchesCategory;
  });
  
  // Toggle question selection
  const toggleQuestionSelection = (id: string) => {
    if (selectedQuestions.includes(id)) {
      setSelectedQuestions(selectedQuestions.filter(qid => qid !== id));
    } else {
      setSelectedQuestions([...selectedQuestions, id]);
    }
  };
  
  // Handle new question save
  const handleSaveQuestion = (question: Question) => {
    setQuestions([...questions, question]);
    setIsAddingQuestion(false);
  };
  
  // Handle adding new category
  const handleAddCategory = () => {
    if (newCategory.trim()) {
      const newCategoryObj = {
        id: Math.random().toString(36).substr(2, 9),
        name: newCategory,
        count: 0,
      };
      // In a real app, you'd save this to your backend
      setNewCategory('');
      setIsAddingCategory(false);
    }
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Question Bank</h1>
          <div className="mt-4 sm:mt-0">
            <Button 
              icon={<PlusCircle className="h-4 w-4" />}
              onClick={() => setIsAddingQuestion(true)}
            >
              Add New Question
            </Button>
          </div>
        </div>
        
        {isAddingQuestion ? (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 bg-gray-50">
              <h2 className="text-lg font-medium text-gray-900">Create New Question</h2>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <QuestionEditor 
                question={newQuestionTemplate}
                onSave={handleSaveQuestion}
                onCancel={() => setIsAddingQuestion(false)}
              />
            </div>
          </div>
        ) : (
          <>
            {/* Filters and search */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
              {/* Categories sidebar */}
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:px-6 bg-gray-50 flex justify-between items-center">
                  <h2 className="text-base font-medium text-gray-900">Categories</h2>
                  <button
                    onClick={() => setIsAddingCategory(true)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FolderPlus className="h-5 w-5" />
                  </button>
                </div>
                
                {isAddingCategory ? (
                  <div className="p-4 border-b border-gray-200">
                    <Input
                      placeholder="New category name"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      fullWidth
                    />
                    <div className="mt-2 flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setIsAddingCategory(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        size="sm"
                        onClick={handleAddCategory}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                ) : null}
                
                <div className="px-4 py-2">
                  <button
                    className={`w-full text-left py-2 px-3 rounded-md text-sm font-medium ${
                      selectedCategory === null
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedCategory(null)}
                  >
                    All Questions
                    <span className="ml-1 text-gray-500">({questions.length})</span>
                  </button>
                  
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      className={`w-full text-left py-2 px-3 rounded-md text-sm font-medium ${
                        selectedCategory === category.id
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.name}
                      <span className="ml-1 text-gray-500">({category.count})</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Questions list */}
              <div className="sm:col-span-3 space-y-6">
                {/* Search and filter */}
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                      <div className="flex-1">
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                            placeholder="Search questions"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <Button 
                          variant="outline"
                          icon={<Filter className="h-4 w-4" />}
                        >
                          Filter
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Questions */}
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="px-4 py-5 sm:px-6 bg-gray-50 flex justify-between items-center">
                    <h2 className="text-base font-medium text-gray-900">Questions</h2>
                    <span className="text-sm text-gray-500">
                      {filteredQuestions.length} {filteredQuestions.length === 1 ? 'question' : 'questions'}
                    </span>
                  </div>
                  
                  {filteredQuestions.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                      {filteredQuestions.map((question) => {
                        const isSelected = selectedQuestions.includes(question.id);
                        
                        let typeDisplay;
                        switch(question.type) {
                          case 'multiple-choice':
                            typeDisplay = 'Multiple Choice';
                            break;
                          case 'true-false':
                            typeDisplay = 'True/False';
                            break;
                          case 'short-answer':
                            typeDisplay = 'Short Answer';
                            break;
                          case 'essay':
                            typeDisplay = 'Essay';
                            break;
                        }
                        
                        return (
                          <li 
                            key={question.id}
                            className={`px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer ${
                              isSelected ? 'bg-blue-50' : ''
                            }`}
                            onClick={() => toggleQuestionSelection(question.id)}
                          >
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                checked={isSelected}
                                onChange={() => {}}
                                onClick={(e) => e.stopPropagation()}
                              />
                              <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-gray-900">{question.text}</p>
                                <div className="mt-1 flex items-center text-sm text-gray-500">
                                  <HelpCircle className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                  <span className="mr-2">{typeDisplay}</span>
                                  <span>{question.points} {question.points === 1 ? 'point' : 'points'}</span>
                                </div>
                              </div>
                              <div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // In a real app, you'd implement edit functionality
                                  }}
                                >
                                  Edit
                                </Button>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <div className="px-4 py-16 text-center">
                      <HelpCircle className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No questions found</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {searchTerm 
                          ? 'Try adjusting your search or filter to find what you\'re looking for.'
                          : 'Get started by creating a new question.'}
                      </p>
                      {searchTerm && (
                        <div className="mt-6">
                          <Button 
                            variant="outline"
                            onClick={() => setSearchTerm('')}
                          >
                            Clear Search
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {selectedQuestions.length > 0 && (
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">
                          {selectedQuestions.length} {selectedQuestions.length === 1 ? 'question' : 'questions'} selected
                        </span>
                        <div className="flex space-x-3">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedQuestions([])}
                          >
                            Clear Selection
                          </Button>
                          <Button size="sm">
                            Add to Exam
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default QuestionBank;