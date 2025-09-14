'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  CheckCircle,
  MessageSquare,
} from 'lucide-react';
import { BehaviorQuestion } from '@/lib/behaviorQuestions';

interface BehaviorQuestionProps {
  question: BehaviorQuestion;
  onNext: () => void;
  onPrevious: () => void;
  onComplete: () => void;
  isFirst: boolean;
  isLast: boolean;
  showNavigation?: boolean;
}

export default function BehaviorQuestion({
  question,
  onNext,
  onPrevious,
  onComplete,
  isFirst,
  isLast,
  showNavigation = true,
}: BehaviorQuestionProps) {
  const [userAnswer, setUserAnswer] = useState('');
  const [showExample, setShowExample] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleSubmit = () => {
    if (userAnswer.trim()) {
      setHasAnswered(true);
    }
  };

  const handleNext = () => {
    if (isLast) {
      onComplete();
    } else {
      onNext();
    }
  };

  const handlePrevious = () => {
    onPrevious();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Question Card */}
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-800">
              Behavioral Question
            </CardTitle>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {question.difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            {question.question}
          </p>

          {/* Answer Input */}
          <div className="space-y-4">
            <label
              htmlFor="answer"
              className="block text-sm font-medium text-gray-700"
            >
              Your Answer (Use the STAR method: Situation, Task, Action, Result)
            </label>
            <Textarea
              id="answer"
              value={userAnswer}
              onChange={e => setUserAnswer(e.target.value)}
              placeholder="Describe your experience using the STAR method. Be specific about the situation, your task, the actions you took, and the results you achieved..."
              className="min-h-[200px] resize-none border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              disabled={hasAnswered}
            />

            {!hasAnswered && (
              <Button
                onClick={handleSubmit}
                disabled={!userAnswer.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Submit Answer
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Help Section */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Tips Card */}
        <Card className="border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-800">
              <Lightbulb className="h-5 w-5 text-yellow-600" />
              Tips for Answering
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {question.tips.map((tip, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Example Answer Card */}
        <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-800">
              <MessageSquare className="h-5 w-5 text-green-600" />
              Example Answer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowExample(!showExample)}
              className="mb-3 bg-green-100 hover:bg-green-200 text-green-800 border-green-300"
            >
              {showExample ? 'Hide Example' : 'Show Example'}
            </Button>
            {showExample && (
              <div className="p-3 bg-white rounded-lg border border-green-200">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {question.exampleAnswer}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Follow-up Questions */}
      {question.followUpQuestions && question.followUpQuestions.length > 0 && (
        <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">
              Potential Follow-up Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {question.followUpQuestions.map((followUp, index) => (
                <li key={index} className="text-sm text-gray-700">
                  • {followUp}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {question.tags.map(tag => (
          <Badge key={tag} variant="outline" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Navigation */}
      {showNavigation && (
        <div className="flex justify-between items-center pt-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={isFirst}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex gap-2">
            {hasAnswered && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Answer submitted! You can review your response above.
                </AlertDescription>
              </Alert>
            )}
          </div>

          <Button
            onClick={handleNext}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLast ? 'Complete' : 'Next'}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
