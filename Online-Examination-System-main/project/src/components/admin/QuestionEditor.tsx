import React, { useState } from 'react';
import { PlusCircle, Trash, Save } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';

export type QuestionType = 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';

export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options: Option[];
  points: number;
  correctAnswer?: string; // For short answer
}

interface QuestionEditorProps {
  question: Question;
  onSave: (question: Question) => void;
  onCancel: () => void;
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({ question, onSave, onCancel }) => {
  const [editedQuestion, setEditedQuestion] = useState<Question>(question);

  const handleQuestionTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedQuestion({
      ...editedQuestion,
      text: e.target.value,
    });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as QuestionType;
    
    // Reset options if needed when changing type
    let newOptions = editedQuestion.options;
    if (newType === 'true-false') {
      newOptions = [
        { id: '1', text: 'True', isCorrect: false },
        { id: '2', text: 'False', isCorrect: false },
      ];
    } else if (newType === 'short-answer' || newType === 'essay') {
      newOptions = [];
    }
    
    setEditedQuestion({
      ...editedQuestion,
      type: newType,
      options: newOptions,
    });
  };

  const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedQuestion({
      ...editedQuestion,
      points: parseInt(e.target.value) || 0,
    });
  };

  const handleOptionTextChange = (id: string, text: string) => {
    setEditedQuestion({
      ...editedQuestion,
      options: editedQuestion.options.map((option) =>
        option.id === id ? { ...option, text } : option
      ),
    });
  };

  const handleOptionCorrectChange = (id: string, isCorrect: boolean) => {
    // For single answer questions, uncheck all other options
    const newOptions = editedQuestion.options.map((option) => 
      option.id === id
        ? { ...option, isCorrect }
        : editedQuestion.type === 'true-false' || editedQuestion.type === 'multiple-choice'
          ? { ...option, isCorrect: false }
          : option
    );
    
    setEditedQuestion({
      ...editedQuestion,
      options: newOptions,
    });
  };

  const handleAddOption = () => {
    const newOption: Option = {
      id: Math.random().toString(36).substring(2, 9),
      text: '',
      isCorrect: false,
    };
    
    setEditedQuestion({
      ...editedQuestion,
      options: [...editedQuestion.options, newOption],
    });
  };

  const handleRemoveOption = (id: string) => {
    setEditedQuestion({
      ...editedQuestion,
      options: editedQuestion.options.filter((option) => option.id !== id),
    });
  };

  const handleShortAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedQuestion({
      ...editedQuestion,
      correctAnswer: e.target.value,
    });
  };

  const handleSave = () => {
    onSave(editedQuestion);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="space-y-6">
        <div>
          <label htmlFor="question-text" className="block text-sm font-medium text-gray-700 mb-1">
            Question Text
          </label>
          <textarea
            id="question-text"
            rows={3}
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
            value={editedQuestion.text}
            onChange={handleQuestionTextChange}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="question-type" className="block text-sm font-medium text-gray-700 mb-1">
              Question Type
            </label>
            <select
              id="question-type"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
              value={editedQuestion.type}
              onChange={handleTypeChange}
            >
              <option value="multiple-choice">Multiple Choice</option>
              <option value="true-false">True/False</option>
              <option value="short-answer">Short Answer</option>
              <option value="essay">Essay</option>
            </select>
          </div>

          <div>
            <label htmlFor="question-points" className="block text-sm font-medium text-gray-700 mb-1">
              Points
            </label>
            <input
              type="number"
              id="question-points"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
              value={editedQuestion.points}
              onChange={handlePointsChange}
              min="0"
            />
          </div>
        </div>

        {(editedQuestion.type === 'multiple-choice' || editedQuestion.type === 'true-false') && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Answer Options</label>
              {editedQuestion.type === 'multiple-choice' && (
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={handleAddOption}
                  icon={<PlusCircle className="h-4 w-4" />}
                >
                  Add Option
                </Button>
              )}
            </div>
            
            <div className="space-y-3">
              {editedQuestion.options.map((option) => (
                <div key={option.id} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id={`option-${option.id}`}
                    checked={option.isCorrect}
                    onChange={(e) => handleOptionCorrectChange(option.id, e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <Input
                    value={option.text}
                    onChange={(e) => handleOptionTextChange(option.id, e.target.value)}
                    placeholder="Enter option text"
                    fullWidth
                  />
                  {editedQuestion.type === 'multiple-choice' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveOption(option.id)}
                      icon={<Trash className="h-4 w-4 text-red-500" />}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {editedQuestion.type === 'short-answer' && (
          <div>
            <label htmlFor="correct-answer" className="block text-sm font-medium text-gray-700 mb-1">
              Correct Answer
            </label>
            <Input
              id="correct-answer"
              value={editedQuestion.correctAnswer || ''}
              onChange={handleShortAnswerChange}
              placeholder="Enter the correct answer"
              fullWidth
            />
          </div>
        )}

        {editedQuestion.type === 'essay' && (
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-sm text-gray-500">
              Essay questions will be manually graded after submission.
            </p>
          </div>
        )}

        <div className="flex space-x-4 justify-end pt-4">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button icon={<Save className="h-4 w-4" />} onClick={handleSave}>
            Save Question
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionEditor;