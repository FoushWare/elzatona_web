'use client';

import React, { ReactNode } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env['NEXT_PUBLIC_SUPABASE_URL']!;
const supabaseServiceRoleKey = process.env['SUPABASE_SERVICE_ROLE_KEY']!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// Using a custom modal implementation since dialog component doesn't exist
import { Badge } from '@elzatona/shared-components';
import { Button } from '@elzatona/shared-components';
import { WebsiteFeature } from '../types/website-features';
import {
  X,
  ExternalLink,
  Github,
  Calendar,
  Users,
  Code,
  Shield,
  Eye,
  Target,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  TestTube,
  Gauge,
  Accessibility,
  Rocket,
  Link,
  BookOpen,
} from 'lucide-react';

interface FeatureDetailsModalProps {
  feature: WebsiteFeature | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function FeatureDetailsModal({
  feature,
  isOpen,
  onClose,
}: FeatureDetailsModalProps) {
  if (!feature) return null;

  const IconComponent = feature.icon;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge className='bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'>
            Completed
          </Badge>
        );
      case 'in-progress':
        return (
          <Badge className='bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'>
            In Progress
          </Badge>
        );
      case 'pending':
        return (
          <Badge className='bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'>
            Pending
          </Badge>
        );
      default:
        return <Badge variant='secondary'>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return (
          <Badge className='bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'>
            Critical
          </Badge>
        );
      case 'High':
        return (
          <Badge className='bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'>
            High
          </Badge>
        );
      case 'Medium':
        return (
          <Badge className='bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'>
            Medium
          </Badge>
        );
      case 'Low':
        return (
          <Badge className='bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'>
            Low
          </Badge>
        );
      default:
        return <Badge variant='secondary'>{priority}</Badge>;
    }
  };

  const renderList = (
    items: string[] | undefined,
    icon: React.ReactNode,
    title: string
  ) => {
    if (!items || items.length === 0) return null;

    return (
      <div className='space-y-3'>
        <h4 className='font-semibold text-lg flex items-center gap-2'>
          {icon}
          {title}
        </h4>
        <ul className='space-y-2'>
          {items.map((item, index) => (
            <li key={index} className='flex items-start gap-2'>
              <CheckCircle className='w-4 h-4 text-green-600 mt-0.5 flex-shrink-0' />
              <span className='text-sm'>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderImplementationSection = () => {
    if (!feature.implementation) return null;

    const { technologies, files, components, apis, database, deployment } =
      feature.implementation;

    return (
      <div className='space-y-4'>
        <h4 className='font-semibold text-lg flex items-center gap-2'>
          <Code className='w-5 h-5' />
          Implementation Details
        </h4>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {technologies && technologies.length > 0 && (
            <div>
              <h5 className='font-medium text-sm text-gray-600 dark:text-gray-400 mb-2'>
                Technologies
              </h5>
              <div className='flex flex-wrap gap-1'>
                {technologies.map((tech, index) => (
                  <Badge key={index} variant='outline' className='text-xs'>
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {files && files.length > 0 && (
            <div>
              <h5 className='font-medium text-sm text-gray-600 dark:text-gray-400 mb-2'>
                Key Files
              </h5>
              <div className='space-y-1'>
                {files.map((file, index) => (
                  <div
                    key={index}
                    className='text-xs font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded'
                  >
                    {file}
                  </div>
                ))}
              </div>
            </div>
          )}

          {components && components.length > 0 && (
            <div>
              <h5 className='font-medium text-sm text-gray-600 dark:text-gray-400 mb-2'>
                Components
              </h5>
              <div className='flex flex-wrap gap-1'>
                {components.map((component, index) => (
                  <Badge key={index} variant='secondary' className='text-xs'>
                    {component}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {apis && apis.length > 0 && (
            <div>
              <h5 className='font-medium text-sm text-gray-600 dark:text-gray-400 mb-2'>
                APIs
              </h5>
              <div className='flex flex-wrap gap-1'>
                {apis.map((api, index) => (
                  <Badge key={index} variant='outline' className='text-xs'>
                    {api}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {database && database.length > 0 && (
            <div>
              <h5 className='font-medium text-sm text-gray-600 dark:text-gray-400 mb-2'>
                Database
              </h5>
              <div className='flex flex-wrap gap-1'>
                {database.map((db, index) => (
                  <Badge key={index} variant='outline' className='text-xs'>
                    {db}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {deployment && deployment.length > 0 && (
            <div>
              <h5 className='font-medium text-sm text-gray-600 dark:text-gray-400 mb-2'>
                Deployment
              </h5>
              <div className='flex flex-wrap gap-1'>
                {deployment.map((dep: string, index: number) => (
                  <Badge key={index} variant='outline' className='text-xs'>
                    {dep}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black bg-opacity-50'
        onClick={onClose}
      />

      {/* Modal */}
      <div className='relative bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700'>
          <h2 className='text-xl font-semibold flex items-center gap-3'>
            <IconComponent className='w-6 h-6 text-blue-600' />
            {feature.title}
          </h2>
          <Button variant='ghost' size='sm' onClick={onClose}>
            <X className='w-4 h-4' />
          </Button>
        </div>

        {/* Content */}
        <div className='p-6 overflow-y-auto max-h-[calc(90vh-120px)]'>
          <div className='space-y-6'>
            {/* Header Info */}
            <div className='flex flex-wrap items-center gap-2'>
              {getStatusBadge(feature.status)}
              {getPriorityBadge(feature.priority)}
              <Badge variant='outline'>{feature.category}</Badge>
              <Badge variant='outline'>{feature.section}</Badge>
            </div>

            {/* Description */}
            <div>
              <h3 className='font-semibold text-lg mb-2'>Description</h3>
              <p className='text-gray-700 dark:text-gray-300'>
                {feature.description}
              </p>
            </div>

            {/* Full Story */}
            {feature.fullStory && (
              <div>
                <h3 className='font-semibold text-lg mb-2'>Full Story</h3>
                <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
                  {feature.fullStory}
                </p>
              </div>
            )}

            {/* Progress Bar for In Progress */}
            {feature.status === 'in-progress' && feature.progress && (
              <div>
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-sm font-medium'>Progress</span>
                  <span className='text-sm text-gray-600 dark:text-gray-400'>
                    {feature.progress}%
                  </span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-2'>
                  <div
                    className='bg-blue-600 h-2 rounded-full transition-all duration-300'
                    style={{ width: `${feature.progress}%` }}
                  ></div>
                </div>
                {feature.estimatedCompletion && (
                  <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
                    Estimated completion: {feature.estimatedCompletion}
                  </p>
                )}
              </div>
            )}

            {/* Implementation Details */}
            {renderImplementationSection()}

            {/* Features */}
            {renderList(
              feature.features,
              <Target className='w-5 h-5' />,
              'Features'
            )}

            {/* Benefits */}
            {renderList(
              feature.benefits,
              <CheckCircle className='w-5 h-5' />,
              'Benefits'
            )}

            {/* Challenges */}
            {renderList(
              feature.challenges,
              <AlertTriangle className='w-5 h-5' />,
              'Challenges'
            )}

            {/* Solutions */}
            {renderList(
              feature.solutions,
              <Lightbulb className='w-5 h-5' />,
              'Solutions'
            )}

            {/* Testing */}
            {renderList(
              feature.testing,
              <TestTube className='w-5 h-5' />,
              'Testing'
            )}

            {/* Performance */}
            {renderList(
              feature.performance,
              <Gauge className='w-5 h-5' />,
              'Performance'
            )}

            {/* Security */}
            {renderList(
              feature.security,
              <Shield className='w-5 h-5' />,
              'Security'
            )}

            {/* Accessibility */}
            {renderList(
              feature.accessibility,
              <Accessibility className='w-5 h-5' />,
              'Accessibility'
            )}

            {/* Future Plans */}
            {renderList(
              feature.futurePlans,
              <Rocket className='w-5 h-5' />,
              'Future Plans'
            )}

            {/* Metadata */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t'>
              {feature.completionDate && (
                <div className='flex items-center gap-2'>
                  <Calendar className='w-4 h-4 text-gray-500' />
                  <span className='text-sm'>
                    <strong>Completed:</strong> {feature.completionDate}
                  </span>
                </div>
              )}

              {feature.lastUpdated && (
                <div className='flex items-center gap-2'>
                  <Calendar className='w-4 h-4 text-gray-500' />
                  <span className='text-sm'>
                    <strong>Last Updated:</strong> {feature.lastUpdated}
                  </span>
                </div>
              )}

              {feature.contributors && feature.contributors.length > 0 && (
                <div className='flex items-center gap-2'>
                  <Users className='w-4 h-4 text-gray-500' />
                  <span className='text-sm'>
                    <strong>Contributors:</strong>{' '}
                    {feature.contributors.join(', ')}
                  </span>
                </div>
              )}

              {feature.estimatedEffort && (
                <div className='flex items-center gap-2'>
                  <Gauge className='w-4 h-4 text-gray-500' />
                  <span className='text-sm'>
                    <strong>Estimated Effort:</strong> {feature.estimatedEffort}
                  </span>
                </div>
              )}
            </div>

            {/* Dependencies */}
            {feature.dependencies && feature.dependencies.length > 0 && (
              <div>
                <h4 className='font-semibold text-lg mb-2 flex items-center gap-2'>
                  <Link className='w-5 h-5' />
                  Dependencies
                </h4>
                <div className='flex flex-wrap gap-2'>
                  {feature.dependencies.map((dep: string, index: number) => (
                    <Badge key={index} variant='outline'>
                      {dep}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Next Steps */}
            {feature.nextSteps && feature.nextSteps.length > 0 && (
              <div>
                <h4 className='font-semibold text-lg mb-2 flex items-center gap-2'>
                  <Target className='w-5 h-5' />
                  Next Steps
                </h4>
                <ol className='space-y-2'>
                  {feature.nextSteps.map((step: string, index: number) => (
                    <li key={index} className='flex items-start gap-2'>
                      <span className='bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full flex-shrink-0 mt-0.5'>
                        {index + 1}
                      </span>
                      <span className='text-sm'>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Action Buttons */}
            <div className='flex flex-wrap gap-3 pt-4 border-t'>
              {feature.url && (
                <Button
                  variant='outline'
                  onClick={() => window.open(feature.url!, '_blank')}
                  className='flex items-center gap-2'
                >
                  <ExternalLink className='w-4 h-4' />
                  View Feature
                </Button>
              )}

              {feature.demoUrl && (
                <Button
                  variant='outline'
                  onClick={() => window.open(feature.demoUrl!, '_blank')}
                  className='flex items-center gap-2'
                >
                  <Eye className='w-4 h-4' />
                  View Demo
                </Button>
              )}

              {feature.githubUrl && (
                <Button
                  variant='outline'
                  onClick={() => window.open(feature.githubUrl!, '_blank')}
                  className='flex items-center gap-2'
                >
                  <Github className='w-4 h-4' />
                  View Code
                </Button>
              )}

              {feature.documentation && feature.documentation.length > 0 && (
                <Button
                  variant='outline'
                  onClick={() => {
                    // TODO: Implement documentation viewer
                    console.log('View documentation:', feature.documentation);
                  }}
                  className='flex items-center gap-2'
                >
                  <BookOpen className='w-4 h-4' />
                  Documentation
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
