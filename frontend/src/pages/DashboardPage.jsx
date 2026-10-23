// src/pages/DashboardPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  UserCheck, 
  Clock, 
  Briefcase, 
  Calendar, 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  PlusCircle, 
  Compass, 
  Share2 
} from 'lucide-react';
import { StatCard } from '../components/cards/StatCard';
import { ProfileCard } from '../components/cards/ProfileCard';
import { JobCard } from '../components/cards/JobCard';
import { EventCard } from '../components/cards/EventCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const DashboardPage = ({
  currentUser,
  alumniList = [],
  jobsList = [],
  eventsList = [],
  connections = [],
  connectionRequests = [],
  onConnectProfile,
  onViewProfile,
  onViewJob,
  onToggleRsvp,
}) => {
  // Compute real metrics from application data
  const acceptedConnectionsCount = alumniList.filter(a => a.connectionStatus === 'ACCEPTED').length;
  const pendingRequestsCount = connectionRequests.length;
  const registeredEventsCount = eventsList.filter(e => e.isRegistered).length;
  const activeJobsCount = jobsList.filter(j => j.isActive).length;

  // Suggested Alumni to connect with (those with status 'NONE')
  const suggestedAlumni = alumniList
    .filter(a => a.connectionStatus === 'NONE')
    .slice(0, 3);

  // Next upcoming events
  const upcomingEvents = eventsList.slice(0, 2);

  // Recent job listings
  const recentJobs = jobsList.slice(0, 2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Welcome Banner */}
      <div className="relative bg-gradient-to-r from-[#151E33] via-[#10172A] to-[#151E33] border border-[#26334B] rounded-3xl p-6 sm:p-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#8B7CFF]/10 blur-[80px] rounded-full pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="iris" size="sm">
                {currentUser?.role === 'ALUMNI' ? 'Alumni Mentor' : currentUser?.role === 'ADMIN' ? 'Platform Admin' : 'Student Scholar'}
              </Badge>
              <span className="text-xs text-[#7F8BA3]">B.Tech CSE Cohort '26</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#F3F5FC]">
              Welcome back, {currentUser?.fullName?.split(' ')[0]} 👋
            </h1>
            <p className="text-xs sm:text-sm text-[#A7B2C8] max-w-xl">
              Stay engaged with your alumni network, register for placement preparation webinars, and explore verified industry vacancies.
            </p>
          </div>

          {/* Profile Completion Bar */}
          <div className="bg-[#10172A] border border-[#26334B] rounded-2xl p-4 sm:w-72 shrink-0 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#F3F5FC]">Profile Strength</span>
              <span className="text-[#8B7CFF] font-bold">85% Complete</span>
            </div>
            <div className="w-full bg-[#151E33] rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#8B7CFF] to-[#55D6E8] h-full rounded-full transition-all duration-500" 
                style={{ width: '85%' }} 
              />
            </div>
            <p className="text-[11px] text-[#7F8BA3]">
              Add your GitHub repository links to reach 100% profile strength.
            </p>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={UserCheck}
          label="Network Connections"
          value={acceptedConnectionsCount}
          trend="+2 this month"
          color="iris"
        />
        <StatCard
          icon={Clock}
          label="Pending Invitations"
          value={pendingRequestsCount}
          color="warning"
        />
        <StatCard
          icon={Calendar}
          label="My Event RSVPs"
          value={registeredEventsCount}
          color="cyan"
        />
        <StatCard
          icon={Briefcase}
          label="Active Job Openings"
          value={activeJobsCount}
          trend="3 new this week"
          color="success"
        />
      </div>

      {/* Quick Action Navigation Buttons */}
      <div className="flex flex-wrap items-center gap-3 pb-2">
        <Link to="/directory">
          <Button variant="secondary" size="sm" icon={Compass}>
            Discover Alumni
          </Button>
        </Link>
        <Link to="/connections">
          <Button variant="secondary" size="sm" icon={Users}>
            Manage Requests ({pendingRequestsCount})
          </Button>
        </Link>
        <Link to="/ai-advisor">
          <Button variant="secondary" size="sm" icon={Sparkles} className="text-[#8B7CFF]">
            AI Career Advisor
          </Button>
        </Link>
        {currentUser?.role === 'ALUMNI' || currentUser?.role === 'ADMIN' ? (
          <Link to="/jobs">
            <Button variant="primary" size="sm" icon={PlusCircle}>
              Post an Opportunity
            </Button>
          </Link>
        ) : null}
      </div>

      {/* Section 1: Suggested Connections */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#F3F5FC]">Recommended Alumni Connections</h2>
            <p className="text-xs text-[#A7B2C8]">Engineers with shared university interests and career trajectories</p>
          </div>
          <Link to="/directory" className="text-xs text-[#8B7CFF] hover:underline font-medium flex items-center gap-1">
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {suggestedAlumni.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              onConnect={onConnectProfile}
              onViewProfile={onViewProfile}
            />
          ))}
        </div>
      </div>

      {/* 2-Column Split: Upcoming Events & Recommended Jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Events Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#F3F5FC]">Upcoming Campus Events</h2>
              <p className="text-xs text-[#A7B2C8]">Webinars, career panels, and developer workshops</p>
            </div>
            <Link to="/events" className="text-xs text-[#8B7CFF] hover:underline font-medium flex items-center gap-1">
              <span>All Events</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onToggleRsvp={onToggleRsvp}
              />
            ))}
          </div>
        </div>

        {/* Jobs Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#F3F5FC]">Opportunities for You</h2>
              <p className="text-xs text-[#A7B2C8]">Fresh graduate and internship openings from alumni</p>
            </div>
            <Link to="/jobs" className="text-xs text-[#8B7CFF] hover:underline font-medium flex items-center gap-1">
              <span>View All Jobs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {recentJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onViewDetails={onViewJob}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
