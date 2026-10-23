// src/pages/JobsPage.jsx
import React, { useState, useMemo } from 'react';
import { Search, Briefcase, PlusCircle, Building2, MapPin, Calendar, ExternalLink, X } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { JobCard } from '../components/cards/JobCard';
import { EmptyState } from '../components/ui/EmptyState';

export const JobsPage = ({
  currentUser,
  jobsList = [],
  onAddNewJob,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [activeJobDetails, setActiveJobDetails] = useState(null);

  // Form state for posting new opportunity
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newType, setNewType] = useState('FULL_TIME');
  const [newExp, setNewExp] = useState('Fresher / 0-1 Years');
  const [newDescription, setNewDescription] = useState('');
  const [newDeadline, setNewDeadline] = useState('');
  const [newUrl, setNewUrl] = useState('');

  // Filter jobs
  const filteredJobs = useMemo(() => {
    return jobsList.filter((job) => {
      const matchesSearch =
        !searchTerm.trim() ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType =
        selectedType === 'ALL' || job.jobType === selectedType;

      return matchesSearch && matchesType;
    });
  }, [jobsList, searchTerm, selectedType]);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!newTitle || !newCompany || !newDescription) return;

    const createdJob = {
      id: Date.now(),
      title: newTitle,
      companyName: newCompany,
      location: newLocation || 'Remote / Hybrid',
      jobType: newType,
      experienceLevel: newExp,
      postedBy: `${currentUser?.fullName || 'Alumni Member'} (Alumnus)`,
      postedAt: 'Just now',
      deadline: newDeadline || '2026-12-31',
      isActive: true,
      description: newDescription,
      requirements: [
        'Solid problem-solving ability and computer science fundamentals',
        'Demonstrated project experience in Java / React or relevant stack',
        'Strong communication and collaborative mindset'
      ],
      applicationUrl: newUrl || 'https://careers.example.com',
    };

    onAddNewJob(createdJob);
    setIsPostModalOpen(false);

    // Reset fields
    setNewTitle('');
    setNewCompany('');
    setNewLocation('');
    setNewDescription('');
    setNewDeadline('');
    setNewUrl('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F3F5FC]">Career Opportunities</h1>
          <p className="text-xs sm:text-sm text-[#A7B2C8] mt-1">
            Browse verified internships, graduate roles, and direct referrals shared by university alumni.
          </p>
        </div>

        {currentUser?.role === 'ALUMNI' || currentUser?.role === 'ADMIN' ? (
          <Button
            variant="primary"
            icon={PlusCircle}
            onClick={() => setIsPostModalOpen(true)}
          >
            Post an Opportunity
          </Button>
        ) : null}
      </div>

      {/* Search and Filter */}
      <div className="bg-[#151E33] border border-[#26334B] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder="Search roles by title, company, or city..."
            icon={Search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {[
            { label: 'All Openings', value: 'ALL' },
            { label: 'Full-Time', value: 'FULL_TIME' },
            { label: 'Internships', value: 'INTERNSHIP' },
            { label: 'Remote', value: 'REMOTE' },
          ].map((type) => (
            <button
              key={type.value}
              onClick={() => setSelectedType(type.value)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedType === type.value
                  ? 'bg-[#8B7CFF] text-white shadow-[0_0_10px_rgba(139,124,255,0.3)]'
                  : 'bg-[#10172A] border border-[#26334B] text-[#A7B2C8] hover:text-[#F3F5FC]'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Jobs Grid */}
      {filteredJobs.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No opportunities found"
          description="Try modifying your keyword search or filtering for all opening types."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onViewDetails={(j) => setActiveJobDetails(j)}
            />
          ))}
        </div>
      )}

      {/* Job Details Modal */}
      {activeJobDetails && (
        <Modal
          isOpen={!!activeJobDetails}
          onClose={() => setActiveJobDetails(null)}
          title={activeJobDetails.title}
          description={`${activeJobDetails.companyName} • ${activeJobDetails.location}`}
          maxWidth="max-w-xl"
        >
          <div className="space-y-4 text-xs text-[#A7B2C8]">
            <div className="flex flex-wrap gap-2 pb-3 border-b border-[#26334B]">
              <Badge variant="cyan">{activeJobDetails.jobType}</Badge>
              <Badge variant="iris">{activeJobDetails.experienceLevel}</Badge>
              <Badge variant="warning">Apply by {activeJobDetails.deadline}</Badge>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-[#F3F5FC] mb-1">About the Role</h4>
              <p className="leading-relaxed text-[#F3F5FC]/90">
                {activeJobDetails.description}
              </p>
            </div>

            {activeJobDetails.requirements?.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-[#F3F5FC] mb-1.5">Key Requirements</h4>
                <ul className="list-disc list-inside space-y-1 text-[#A7B2C8]">
                  {activeJobDetails.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-2 text-[11px] text-[#7F8BA3]">
              Posted by: <strong className="text-[#F3F5FC]">{activeJobDetails.postedBy}</strong>
            </div>

            <div className="pt-4 border-t border-[#26334B] flex justify-end gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setActiveJobDetails(null)}
              >
                Close
              </Button>
              <a
                href={activeJobDetails.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary" size="sm" icon={ExternalLink}>
                  Proceed to Application
                </Button>
              </a>
            </div>
          </div>
        </Modal>
      )}

      {/* Post New Job Modal */}
      <Modal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        title="Post a Career Opportunity"
        description="Share internships and full-time vacancies directly with verified university students."
        maxWidth="max-w-lg"
      >
        <form onSubmit={handlePostSubmit} className="space-y-3.5 text-left">
          <Input
            label="Job Title"
            placeholder="e.g. Graduate Software Engineer (Java)"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Company Name"
              placeholder="e.g. Oracle"
              value={newCompany}
              onChange={(e) => setNewCompany(e.target.value)}
              required
            />
            <Input
              label="Location"
              placeholder="e.g. Bengaluru / Remote"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#A7B2C8] mb-1.5">
                Employment Type
              </label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                className="w-full bg-[#10172A] border border-[#26334B] text-xs text-[#F3F5FC] rounded-lg px-3 py-2.5 outline-none"
              >
                <option value="FULL_TIME">Full-Time</option>
                <option value="INTERNSHIP">Internship</option>
                <option value="REMOTE">Remote</option>
              </select>
            </div>
            <Input
              label="Experience Level"
              placeholder="e.g. Fresher / 2026 Batch"
              value={newExp}
              onChange={(e) => setNewExp(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#A7B2C8] mb-1.5">
              Role Description & Tech Stack
            </label>
            <textarea
              rows={3}
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Describe the responsibilities, required skills (e.g. Spring Boot, Java, React), and referral instructions..."
              className="w-full bg-[#10172A] border border-[#26334B] text-xs text-[#F3F5FC] rounded-lg p-3 outline-none focus:border-[#8B7CFF]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Application Deadline"
              type="date"
              value={newDeadline}
              onChange={(e) => setNewDeadline(e.target.value)}
            />
            <Input
              label="Application URL / Careers Link"
              placeholder="https://..."
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
            />
          </div>

          <div className="pt-4 border-t border-[#26334B] flex justify-end gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsPostModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Publish Opportunity
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
