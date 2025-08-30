"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { fetchRealJobs, RealJob } from "@/lib/jobAggregator";

export default function JobsPage() {
  const [jobs, setJobs] = useState<RealJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [useRealScraping, setUseRealScraping] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedSalaryRange, setSelectedSalaryRange] = useState("All Salaries");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSource, setSelectedSource] = useState("All Sources");
  const [sortBy, setSortBy] = useState("date");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch jobs on component mount and when real scraping toggle changes
  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        const realJobs = await fetchRealJobs(useRealScraping);
        setJobs(realJobs);
        setError(null);
      } catch (err) {
        setError("Failed to load jobs. Please try again later.");
        console.error("Error loading jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, [useRealScraping]);

  // Get unique countries from real jobs
  const countries = useMemo(() => {
    const uniqueCountries = [...new Set(jobs.map(job => job.country))];
    return ["All Countries", ...uniqueCountries.sort()];
  }, [jobs]);

  // Get unique job types from real jobs
  const jobTypes = useMemo(() => {
    const uniqueTypes = [...new Set(jobs.map(job => job.type))];
    return ["All Types", ...uniqueTypes.sort()];
  }, [jobs]);

  // Get unique sources from real jobs
  const sources = useMemo(() => {
    const uniqueSources = [...new Set(jobs.map(job => job.source))];
    return ["All Sources", ...uniqueSources.sort()];
  }, [jobs]);

  const salaryRanges = [
    "All Salaries",
    "$0 - $50,000",
    "$50,000 - $100,000",
    "$100,000 - $150,000",
    "$150,000+"
  ];

  const sortOptions = [
    { value: "date", label: "Date Posted" },
    { value: "salary", label: "Salary (High to Low)" },
    { value: "salary-asc", label: "Salary (Low to High)" },
    { value: "title", label: "Job Title" },
    { value: "company", label: "Company" },
    { value: "source", label: "Source" }
  ];

  // Get unique locations for the selected country
  const availableLocations = useMemo(() => {
    const countryJobs = selectedCountry === "All Countries" 
      ? jobs 
      : jobs.filter(job => job.country === selectedCountry);
    
    const locations = [...new Set(countryJobs.map(job => job.location))];
    return ["All Locations", ...locations.sort()];
  }, [jobs, selectedCountry]);

  const filteredJobs = useMemo(() => {
    let filtered = jobs;

    // Filter by country
    if (selectedCountry !== "All Countries") {
      filtered = filtered.filter(job => job.country === selectedCountry);
    }

    // Filter by location
    if (selectedLocation && selectedLocation !== "All Locations") {
      filtered = filtered.filter(job => job.location === selectedLocation);
    }

    // Filter by job type
    if (selectedType !== "All Types") {
      filtered = filtered.filter(job => job.type === selectedType);
    }

    // Filter by source
    if (selectedSource !== "All Sources") {
      filtered = filtered.filter(job => job.source === selectedSource);
    }

    // Filter by salary range
    if (selectedSalaryRange !== "All Salaries") {
      const [min, max] = selectedSalaryRange.split(" - ");
      const minSalary = min === "$0" ? 0 : parseInt(min.replace(/[$,]/g, ""));
      const maxSalary = max === "$150,000+" ? Infinity : parseInt(max.replace(/[$,]/g, ""));
      
      filtered = filtered.filter(job => {
        if (!job.salaryMin || !job.salaryMax) return true; // Include jobs without salary info
        const jobSalary = (job.salaryMin + job.salaryMax) / 2;
        return jobSalary >= minSalary && (maxSalary === Infinity || jobSalary <= maxSalary);
      });
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query) ||
        job.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Sort jobs
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime();
        case "salary":
          if (!a.salaryMin || !b.salaryMin || !a.salaryMax || !b.salaryMax) return 0;
          return ((b.salaryMin + b.salaryMax) / 2) - ((a.salaryMin + a.salaryMax) / 2);
        case "salary-asc":
          if (!a.salaryMin || !b.salaryMin || !a.salaryMax || !b.salaryMax) return 0;
          return ((a.salaryMin + a.salaryMax) / 2) - ((b.salaryMin + b.salaryMax) / 2);
        case "title":
          return a.title.localeCompare(b.title);
        case "company":
          return a.company.localeCompare(b.company);
        case "source":
          return a.source.localeCompare(b.source);
        default:
          return 0;
      }
    });

    return filtered;
  }, [jobs, selectedCountry, selectedLocation, selectedType, selectedSource, selectedSalaryRange, searchQuery, sortBy]);

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case "Full-time":
        return "bg-gradient-to-r from-green-500 to-emerald-500 text-white";
      case "Remote":
        return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white";
      case "Contract":
        return "bg-gradient-to-r from-purple-500 to-pink-500 text-white";
      case "Part-time":
        return "bg-gradient-to-r from-yellow-500 to-orange-500 text-white";
      default:
        return "bg-gradient-to-r from-gray-500 to-slate-500 text-white";
    }
  };

  const getCountryFlag = (country: string) => {
    const flags: { [key: string]: string } = {
      "United States": "🇺🇸",
      "United Kingdom": "🇬🇧",
      "Canada": "🇨🇦",
      "Germany": "🇩🇪",
      "Australia": "🇦🇺",
      "Netherlands": "🇳🇱",
      "Romania": "🇷🇴",
      "Portugal": "🇵🇹",
      "Poland": "🇵🇱",
      "Europe": "🇪🇺"
    };
    return flags[country] || "🌍";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6 animate-spin">🔄</div>
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">
            {useRealScraping ? "Scraping Real Job Listings..." : "Loading Job Listings..."}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            {useRealScraping 
              ? "Fetching the latest React job opportunities from multiple sources" 
              : "Loading enhanced job data"
            }
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">
            {error}
          </h2>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="text-6xl mb-6 animate-bounce">💼</div>
            <h1 className="text-5xl font-bold mb-6 tracking-tight drop-shadow-lg">
              React Job Aggregator
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed drop-shadow-sm">
              {useRealScraping 
                ? "Real job listings from multiple sources including JS Guru Jobs, LinkedIn, Indeed, Stack Overflow, and more."
                : "Enhanced job data from multiple sources including JS Guru Jobs, LinkedIn, Indeed, Stack Overflow, and more."
              }
            </p>
            
            {/* Real Scraping Toggle */}
            <div className="mt-8 flex justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-1 flex items-center">
                <button
                  onClick={() => setUseRealScraping(false)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    !useRealScraping 
                      ? 'bg-white text-green-600 shadow-lg' 
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  🎭 Enhanced Data
                </button>
                <button
                  onClick={() => setUseRealScraping(true)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    useRealScraping 
                      ? 'bg-white text-green-600 shadow-lg' 
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  🌐 Real Scraping
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium">
                🌍 {jobs.length} {useRealScraping ? 'Real' : 'Enhanced'} Jobs
              </div>
              <div className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium">
                ⚡ {useRealScraping ? 'Live' : 'Simulated'} Updates
              </div>
              <div className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium">
                🎯 Global Opportunities
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Filters */}
        <div className="mb-12 space-y-6">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="🔍 Search jobs by title, company, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow-lg focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300 text-lg"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
            {/* Country Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                🌍 Country
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setSelectedLocation("All Locations");
                }}
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow-lg focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300"
              >
                {countries.map(country => (
                  <option key={country} value={country}>
                    {country === "All Countries" ? "🌍 All Countries" : `${getCountryFlag(country)} ${country}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                📍 Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow-lg focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300"
              >
                {availableLocations.map(location => (
                  <option key={location} value={location}>
                    {location === "All Locations" ? "📍 All Locations" : location}
                  </option>
                ))}
              </select>
            </div>

            {/* Job Type Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                💼 Job Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow-lg focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300"
              >
                {jobTypes.map(type => (
                  <option key={type} value={type}>
                    {type === "All Types" ? "💼 All Types" : type}
                  </option>
                ))}
              </select>
            </div>

            {/* Source Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                📊 Source
              </label>
              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow-lg focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300"
              >
                {sources.map(source => (
                  <option key={source} value={source}>
                    {source === "All Sources" ? "📊 All Sources" : source}
                  </option>
                ))}
              </select>
            </div>

            {/* Salary Range Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                💰 Salary Range
              </label>
              <select
                value={selectedSalaryRange}
                onChange={(e) => setSelectedSalaryRange(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow-lg focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300"
              >
                {salaryRanges.map(range => (
                  <option key={range} value={range}>
                    {range === "All Salaries" ? "💰 All Salaries" : range}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                🔄 Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow-lg focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="text-3xl font-bold mb-2">{filteredJobs.length}</div>
            <div className="text-green-100">Filtered Jobs</div>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="text-3xl font-bold mb-2">
              {jobs.filter(job => job.type === "Full-time").length}
            </div>
            <div className="text-blue-100">Full-time</div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="text-3xl font-bold mb-2">
              {jobs.filter(job => job.type === "Remote").length}
            </div>
            <div className="text-purple-100">Remote</div>
          </div>
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="text-3xl font-bold mb-2">
              {sources.length - 1}
            </div>
            <div className="text-yellow-100">Job Sources</div>
          </div>
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-8xl mb-6 animate-pulse">🔍</div>
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">
              No jobs found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Try adjusting your search criteria or filters.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-green-200 dark:hover:border-green-800"
              >
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                        {getCountryFlag(job.country)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 leading-tight">
                          {job.title}
                        </h3>
                        <p className="text-green-600 dark:text-green-400 font-semibold">
                          {job.company}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold shadow-lg ${getJobTypeColor(job.type)}`}>
                      {job.type}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                    {job.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span className="font-semibold flex items-center">
                      📍 {job.location}
                    </span>
                    <span className="font-semibold flex items-center">
                      💰 {job.salary}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {job.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                    {job.tags.length > 3 && (
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-full font-medium">
                        +{job.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      📅 {formatDate(job.datePosted)}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      📊 {job.source}
                    </span>
                  </div>

                  <Link
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-xl font-bold text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:from-green-600 hover:to-blue-600 block"
                  >
                    🚀 Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Land Your Dream Job?</h2>
          <p className="text-xl text-green-100 mb-8">
            {useRealScraping 
              ? "These are real job listings from top platforms. Keep checking back for new opportunities!"
              : "These are enhanced job listings based on real sources. Switch to real scraping for live data!"
            }
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/practice/fundamentals"
              className="px-8 py-4 bg-white text-green-600 rounded-xl font-bold hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              📚 Practice Questions
            </Link>
            <Link
              href="/coding"
              className="px-8 py-4 bg-white text-green-600 rounded-xl font-bold hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              🎯 Coding Challenges
            </Link>
            <Link
              href="/preparation-guides"
              className="px-8 py-4 bg-white text-green-600 rounded-xl font-bold hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              📖 Preparation Guides
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
