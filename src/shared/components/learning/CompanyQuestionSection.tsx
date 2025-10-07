'use client';

import React, { useState } from 'react';
import { CompanySection, CompanyQuestion } from '@/lib/companyQuestions';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/components/ui/collapsible';
import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Building2,
} from 'lucide-react';

interface CompanyQuestionSectionProps {
  section: CompanySection;
}

export default function CompanyQuestionSection({
  section,
}: CompanyQuestionSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  const toggleQuestion = (questionId: string) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId);
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="w-full mb-6 border-2 border-blue-100 hover:border-blue-200 transition-colors">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-blue-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{section.logo}</div>
                <div>
                  <CardTitle className="text-2xl font-bold text-blue-900">
                    {section.name}
                  </CardTitle>
                  <p className="text-gray-600 mt-1">{section.description}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      {section.questions.length} Questions
                    </Badge>
                    {section.website && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs"
                        onClick={e => {
                          e.stopPropagation();
                          window.open(section.website, '_blank');
                        }}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Website
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {isOpen ? (
                  <ChevronDown className="h-6 w-6 text-blue-600" />
                ) : (
                  <ChevronRight className="h-6 w-6 text-blue-600" />
                )}
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {section.questions.map((question, index) => (
                <Card
                  key={question.id}
                  className="border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            Q{index + 1}
                          </Badge>
                          {question.category && (
                            <Badge variant="outline" className="text-xs">
                              {question.category}
                            </Badge>
                          )}
                          {question.difficulty && (
                            <Badge
                              variant="outline"
                              className={`text-xs ${getDifficultyColor(question.difficulty)}`}
                            >
                              {question.difficulty}
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {question.question}
                        </h3>
                        {question.tags && question.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {question.tags.map(tag => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleQuestion(question.id)}
                        className="ml-4"
                      >
                        {expandedQuestion === question.id ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardHeader>

                  {expandedQuestion === question.id && (
                    <CardContent className="pt-0">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                          <Building2 className="h-4 w-4 mr-2" />
                          Sample Answer
                        </h4>
                        <p className="text-blue-800 leading-relaxed">
                          {question.answer}
                        </p>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
