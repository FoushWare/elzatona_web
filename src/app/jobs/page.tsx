'use client';

import { useState, useEffect } from 'react';
import { Search, Clock, MapPin, Building, DollarSign, Briefcase, Globe } from 'lucide-react';

interface JobSource {
  name: string;
  url: string;
  enabled: boolean;
  category: 'remote' | 'general' | 'tech';
}

interface RealJob {
  id: string;
  title: string;
  company: string;
  location: string;
  jobType: 'full-time' | 'part-time' | 'contract' | 'internship' | 'unknown';
  salary: string;
  description: string;
  tags: string[];
  link: string;
  source: string;
  postedDate?: string;
  scrapedAt: Date;
}

interface JobFilters {
  sources: string[];
  timeFilter: 'anytime' | '24h' | '7d' | '30d';
  jobType: string[];
  location: string[];
  salary: 'any' | 'entry' | 'mid' | 'senior';
}

const jobSources: JobSource[] = [
  { name: 'JS Guru Jobs', url: 'https://jsgurujobs.com', enabled: true, category: 'tech' },
  { name: 'We Work Remotely', url: 'https://weworkremotely.com', enabled: true, category: 'remote' },
  { name: 'Stack Overflow Jobs', url: 'https://stackoverflow.com', enabled: true, category: 'tech' },
  { name: 'Remote.co', url: 'https://remote.co', enabled: true, category: 'remote' },
  { name: 'AngelList', url: 'https://angel.co', enabled: true, category: 'tech' }
];

const timeFilterOptions = [
  { value: 'anytime', label: 'Any time' },
  { value: '24h', label: 'Last 24 hours' },
  { value: '7d', label: 'Last 7 days' }
];

const jobTypeOptions = [
  { value: 'all', label: 'All types' },
  { value: 'full-time', label: 'Full time' },
  { value: 'part-time', label: 'Part time' },
  { value: 'contract', label: 'Contract' }
];

const sourceOptions = [
  { value: 'all', label: 'All sources' },
  { value: 'JS Guru Jobs', label: 'JS Guru Jobs' },
  { value: 'We Work Remotely', label: 'We Work Remotely' },
  { value: 'Stack Overflow Jobs', label: 'Stack Overflow' }
];

// Segmented Control Component
interface SegmentedControlProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

function SegmentedControl({ options, value, onChange, label }: SegmentedControlProps) {
  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        {options.map((option, index) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              value === option.value
                ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            } ${
              index === 0 ? 'rounded-l-md' : ''
            } ${
              index === options.length - 1 ? 'rounded-r-md' : ''
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<RealJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<JobFilters>({
    sources: [],
    timeFilter: 'anytime',
    jobType: [],
    location: [],
    salary: 'any'
  });

  // Single value states for segmented controls
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('anytime');
  const [selectedJobType, setSelectedJobType] = useState('all');
  const [selectedSource, setSelectedSource] = useState('all');

  // Statistics
  const totalJobs = jobs.length;
  const remoteJobs = jobs.filter(job => job.location.toLowerCase().includes('remote')).length;
  const fullTimeJobs = jobs.filter(job => job.jobType === 'full-time').length;
  const sourcesCount = new Set(jobs.map(job => job.source)).size;

  useEffect(() => {
    // Update filters when segmented controls change
    const newFilters: JobFilters = {
      sources: selectedSource === 'all' ? [] : [selectedSource],
      timeFilter: selectedTimeFilter as 'anytime' | '24h' | '7d' | '30d',
      jobType: selectedJobType === 'all' ? [] : [selectedJobType],
      location: [],
      salary: 'any'
    };
    setFilters(newFilters);
  }, [selectedTimeFilter, selectedJobType, selectedSource]);

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const queryParams = new URLSearchParams({
        real: 'true',
        ...(filters.sources.length > 0 && { sources: filters.sources.join(',') }),
        ...(filters.timeFilter !== 'anytime' && { timeFilter: filters.timeFilter }),
        ...(filters.jobType.length > 0 && { jobType: filters.jobType.join(',') }),
        ...(filters.location.length > 0 && { location: filters.location.join(',') }),
        ...(filters.salary !== 'any' && { salary: filters.salary })
      });

      const response = await fetch(`/api/jobs?${queryParams}`);
      const data = await response.json();

      if (data.success) {
        setJobs(data.data);
      } else {
        setError(data.message || 'Failed to fetch jobs');
        setJobs([]);
      }
    } catch (err) {
      setError('Failed to fetch jobs');
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesSearch;
  });



  const getSourceIcon = (sourceName: string) => {
    switch (sourceName) {
      case 'JS Guru Jobs':
        return '⚡';
      case 'We Work Remotely':
        return '🏠';
      case 'Stack Overflow Jobs':
        return '💻';
      case 'Remote.co':
        return '🌍';
      case 'AngelList':
        return '👼';
      default:
        return '💼';
    }
  };

  const getJobTypeColor = (jobType: string) => {
    switch (jobType) {
      case 'full-time':
        return 'bg-green-100 text-green-800';
      case 'part-time':
        return 'bg-blue-100 text-blue-800';
      case 'contract':
        return 'bg-purple-100 text-purple-800';
      case 'internship':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading jobs from multiple sources...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Frontend Job Aggregator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Discover frontend opportunities from multiple job boards
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Jobs</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalJobs}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <Globe className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Remote Jobs</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{remoteJobs}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Building className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Full Time</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{fullTimeJobs}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <Globe className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Sources</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{sourcesCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
          <div className="mb-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search jobs, companies, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Filters Panel */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-6">
            {/* Time Filter */}
            <SegmentedControl
              label="Time Filter"
              options={timeFilterOptions}
              value={selectedTimeFilter}
              onChange={setSelectedTimeFilter}
            />

            {/* Job Type */}
            <SegmentedControl
              label="Job Type"
              options={jobTypeOptions}
              value={selectedJobType}
              onChange={setSelectedJobType}
            />

            {/* Job Sources */}
            <SegmentedControl
              label="Job Sources"
              options={sourceOptions}
              value={selectedSource}
              onChange={setSelectedSource}
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-600 mb-4">
                <Briefcase className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No jobs found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search terms or filters
              </p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => window.open(job.link, '_blank')}
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {job.title}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {getSourceIcon(job.source)} {job.source}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
                      <Building className="h-4 w-4 mr-1" />
                      <span className="mr-4">{job.company}</span>
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{job.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getJobTypeColor(job.jobType)}`}>
                        {job.jobType.replace('-', ' ')}
                      </span>
                      {job.salary !== 'Unknown' && (
                        <span className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {job.salary}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {job.description}
                </p>
                
                {job.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {job.tags.slice(0, 5).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {job.tags.length > 5 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                        +{job.tags.length - 5} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Results Count */}
        {filteredJobs.length > 0 && (
          <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
            Showing {filteredJobs.length} of {totalJobs} jobs
          </div>
        )}
      </div>
    </div>
  );
}
