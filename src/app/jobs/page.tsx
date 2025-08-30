"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

// Mock job data - in real implementation, this would come from API
const mockJobs = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "TechCorp Inc.",
    country: "United States",
    location: "San Francisco, CA",
    salary: "$120,000 - $150,000",
    type: "Full-time",
    datePosted: "2024-01-15",
    link: "https://example.com/job1",
    description: "We're looking for a Senior React Developer to join our team and help build amazing user experiences.",
    tags: ["React", "TypeScript", "Node.js", "AWS"]
  },
  {
    id: 2,
    title: "Frontend Engineer (React)",
    company: "StartupXYZ",
    country: "United Kingdom",
    location: "London, UK",
    salary: "£60,000 - £80,000",
    type: "Full-time",
    datePosted: "2024-01-14",
    link: "https://example.com/job2",
    description: "Join our fast-growing startup and help shape the future of our product with React and modern web technologies.",
    tags: ["React", "JavaScript", "CSS", "Git"]
  },
  {
    id: 3,
    title: "React Developer (Remote)",
    company: "RemoteTech",
    country: "Canada",
    location: "Remote",
    salary: "$90,000 - $110,000",
    type: "Remote",
    datePosted: "2024-01-13",
    link: "https://example.com/job3",
    description: "Work from anywhere! We're seeking a talented React developer to join our distributed team.",
    tags: ["React", "Remote", "TypeScript", "GraphQL"]
  },
  {
    id: 4,
    title: "Junior React Developer",
    company: "DigitalAgency",
    country: "Germany",
    location: "Berlin, Germany",
    salary: "€45,000 - €55,000",
    type: "Full-time",
    datePosted: "2024-01-12",
    link: "https://example.com/job4",
    description: "Perfect opportunity for a junior developer to grow their React skills in a supportive environment.",
    tags: ["React", "JavaScript", "CSS", "Junior"]
  },
  {
    id: 5,
    title: "React Native Developer",
    company: "MobileFirst",
    country: "Australia",
    location: "Sydney, Australia",
    salary: "A$100,000 - A$130,000",
    type: "Full-time",
    datePosted: "2024-01-11",
    link: "https://example.com/job5",
    description: "Build amazing mobile apps with React Native. Join our mobile development team!",
    tags: ["React Native", "Mobile", "JavaScript", "iOS"]
  },
  {
    id: 6,
    title: "Full Stack React Developer",
    company: "EnterpriseCorp",
    country: "Netherlands",
    location: "Amsterdam, Netherlands",
    salary: "€70,000 - €90,000",
    type: "Full-time",
    datePosted: "2024-01-10",
    link: "https://example.com/job6",
    description: "Full stack role with React frontend and Node.js backend. Great opportunity for growth!",
    tags: ["React", "Node.js", "Full Stack", "MongoDB"]
  }
];

const countries = [
  "All Countries",
  "United States",
  "United Kingdom",
  "Canada",
  "Germany",
  "Australia",
  "Netherlands"
];

const jobTypes = [
  "All Types",
  "Full-time",
  "Remote",
  "Contract",
  "Part-time"
];

export default function JobsPage() {
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [selectedType, setSelectedType] = useState("All Types");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSalaryRange, setSelectedSalaryRange] = useState("All");

  const filteredJobs = useMemo(() => {
    let filtered = mockJobs;

    // Filter by country
    if (selectedCountry !== "All Countries") {
      filtered = filtered.filter(job => job.country === selectedCountry);
    }

    // Filter by job type
    if (selectedType !== "All Types") {
      filtered = filtered.filter(job => job.type === selectedType);
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

    return filtered;
  }, [selectedCountry, selectedType, searchQuery]);

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
      "Netherlands": "🇳🇱"
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
              Find the latest React job opportunities worldwide. Browse, filter, and apply to positions that match your skills and preferences.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium">
                🌍 {mockJobs.length} Jobs Available
              </div>
              <div className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium">
                ⚡ Real-time Updates
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
          <div className="flex flex-wrap gap-6">
            {/* Country Filter */}
            <div className="flex-1 min-w-48">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                🌍 Country
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow-lg focus:border-green-500 focus:ring-4 focus:ring-green-500/20 transition-all duration-300"
              >
                {countries.map(country => (
                  <option key={country} value={country}>
                    {country === "All Countries" ? "🌍 All Countries" : `${getCountryFlag(country)} ${country}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Job Type Filter */}
            <div className="flex-1 min-w-48">
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
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="text-3xl font-bold mb-2">{mockJobs.length}</div>
            <div className="text-green-100">Total Jobs</div>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="text-3xl font-bold mb-2">
              {mockJobs.filter(job => job.type === "Full-time").length}
            </div>
            <div className="text-blue-100">Full-time</div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="text-3xl font-bold mb-2">
              {mockJobs.filter(job => job.type === "Remote").length}
            </div>
            <div className="text-purple-100">Remote</div>
          </div>
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="text-3xl font-bold mb-2">
              {new Set(mockJobs.map(job => job.country)).size}
            </div>
            <div className="text-yellow-100">Countries</div>
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
            Keep checking back for new opportunities or explore our other resources!
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
