// src/pages/AdminPage.jsx
import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Briefcase, 
  Calendar, 
  Trash2, 
  CheckCircle, 
  AlertTriangle, 
  Search,
  UserX,
  UserCheck
} from 'lucide-react';
import { StatCard } from '../components/cards/StatCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { Avatar } from '../components/ui/Avatar';

export const AdminPage = ({
  alumniList = [],
  jobsList = [],
  eventsList = [],
  onDeleteJob,
  onDeleteEvent,
}) => {
  const [activeTab, setActiveTab] = useState('USERS'); // 'USERS' | 'JOBS' | 'EVENTS'
  const [userSearch, setUserSearch] = useState('');
  const [selectedUserToToggle, setSelectedUserToToggle] = useState(null);
  const [userStatuses, setUserStatuses] = useState({
    101: 'ACTIVE',
    102: 'ACTIVE',
    103: 'ACTIVE',
    104: 'ACTIVE',
    105: 'ACTIVE',
    106: 'ACTIVE',
  });

  const [confirmDeleteJob, setConfirmDeleteJob] = useState(null);
  const [confirmDeleteEvent, setConfirmDeleteEvent] = useState(null);

  const toggleUserStatus = (id) => {
    setUserStatuses((prev) => ({
      ...prev,
      [id]: prev[id] === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE',
    }));
    setSelectedUserToToggle(null);
  };

  const filteredUsers = alumniList.filter((user) =>
    user.fullName.toLowerCase().includes(userSearch.toLowerCase()) ||
    user.email.toLowerCase().includes(userSearch.toLowerCase()) ||
    user.currentCompany.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-left">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF7185]/15 border border-[#FF7185]/30 text-xs text-[#FF7185] font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ROLE_ADMIN Protected Zone</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F3F5FC]">Platform Governance</h1>
          <p className="text-xs sm:text-sm text-[#A7B2C8] mt-1">
            Audit user accounts, moderate community job submissions, and oversee campus events.
          </p>
        </div>
      </div>

      {/* Admin KPI Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={Users}
          label="Registered Members"
          value={alumniList.length + 1}
          color="iris"
        />
        <StatCard
          icon={Briefcase}
          label="Published Opportunities"
          value={jobsList.length}
          color="success"
        />
        <StatCard
          icon={Calendar}
          label="Scheduled Campus Events"
          value={eventsList.length}
          color="cyan"
        />
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex border-b border-[#26334B] gap-2">
        <button
          onClick={() => setActiveTab('USERS')}
          className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === 'USERS'
              ? 'border-[#8B7CFF] text-[#8B7CFF] bg-[#8B7CFF]/5'
              : 'border-transparent text-[#7F8BA3] hover:text-[#F3F5FC]'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>User Accounts & Status</span>
        </button>

        <button
          onClick={() => setActiveTab('JOBS')}
          className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === 'JOBS'
              ? 'border-[#8B7CFF] text-[#8B7CFF] bg-[#8B7CFF]/5'
              : 'border-transparent text-[#7F8BA3] hover:text-[#F3F5FC]'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Job Moderation ({jobsList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('EVENTS')}
          className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === 'EVENTS'
              ? 'border-[#8B7CFF] text-[#8B7CFF] bg-[#8B7CFF]/5'
              : 'border-transparent text-[#7F8BA3] hover:text-[#F3F5FC]'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Events Moderation ({eventsList.length})</span>
        </button>
      </div>

      {/* Tab 1: User Management Table */}
      {activeTab === 'USERS' && (
        <div className="bg-[#151E33] border border-[#26334B] rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="w-72">
              <Input
                placeholder="Search by name, email, or company..."
                icon={Search}
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
              />
            </div>
            <span className="text-xs text-[#7F8BA3]">
              {filteredUsers.length} total users found
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#10172A] text-[#7F8BA3] uppercase tracking-wider border-b border-[#26334B]">
                <tr>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Affiliation</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#26334B]/60 text-[#A7B2C8]">
                {filteredUsers.map((user) => {
                  const status = userStatuses[user.id] || 'ACTIVE';
                  return (
                    <tr key={user.id} className="hover:bg-[#1C2742]/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar src={user.avatarUrl} name={user.fullName} size="sm" />
                          <div>
                            <p className="font-semibold text-[#F3F5FC]">{user.fullName}</p>
                            <p className="text-[11px] text-[#7F8BA3]">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-[#F3F5FC]">{user.currentCompany}</p>
                        <p className="text-[11px] text-[#7F8BA3]">{user.department}</p>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="iris" size="sm">{user.role}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        {status === 'ACTIVE' ? (
                          <Badge variant="success" size="sm">Active</Badge>
                        ) : (
                          <Badge variant="error" size="sm">Suspended</Badge>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button
                          variant={status === 'ACTIVE' ? 'danger' : 'outline'}
                          size="sm"
                          icon={status === 'ACTIVE' ? UserX : UserCheck}
                          onClick={() => setSelectedUserToToggle(user)}
                        >
                          {status === 'ACTIVE' ? 'Suspend' : 'Reactivate'}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Job Moderation */}
      {activeTab === 'JOBS' && (
        <div className="space-y-4">
          {jobsList.map((job) => (
            <div
              key={job.id}
              className="bg-[#151E33] border border-[#26334B] rounded-2xl p-5 flex items-center justify-between gap-4"
            >
              <div>
                <h4 className="text-sm font-semibold text-[#F3F5FC]">{job.title}</h4>
                <p className="text-xs text-[#8B7CFF]">{job.companyName} • {job.location}</p>
                <p className="text-[11px] text-[#7F8BA3] mt-1">Posted by: {job.postedBy} • Deadline: {job.deadline}</p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="danger"
                  size="sm"
                  icon={Trash2}
                  onClick={() => setConfirmDeleteJob(job)}
                >
                  Remove Listing
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Events Moderation */}
      {activeTab === 'EVENTS' && (
        <div className="space-y-4">
          {eventsList.map((event) => (
            <div
              key={event.id}
              className="bg-[#151E33] border border-[#26334B] rounded-2xl p-5 flex items-center justify-between gap-4"
            >
              <div>
                <h4 className="text-sm font-semibold text-[#F3F5FC]">{event.title}</h4>
                <p className="text-xs text-[#55D6E8]">{event.date} • {event.time}</p>
                <p className="text-[11px] text-[#7F8BA3] mt-1">
                  Organizer: {event.organizerName} • RSVPs: {event.registeredCount}/{event.maxCapacity}
                </p>
              </div>

              <Button
                variant="danger"
                size="sm"
                icon={Trash2}
                onClick={() => setConfirmDeleteEvent(event)}
              >
                Cancel Event
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* User Status Confirmation Modal */}
      {selectedUserToToggle && (
        <Modal
          isOpen={!!selectedUserToToggle}
          onClose={() => setSelectedUserToToggle(null)}
          title="Confirm Account Status Change"
          description={`Are you sure you want to change the status for ${selectedUserToToggle.fullName}?`}
        >
          <div className="space-y-4 text-xs text-[#A7B2C8]">
            <p>
              Changing this account status will immediately update the user's login permissions in Spring Security.
            </p>
            <div className="flex justify-end gap-2 pt-2 border-t border-[#26334B]">
              <Button variant="secondary" size="sm" onClick={() => setSelectedUserToToggle(null)}>
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => toggleUserStatus(selectedUserToToggle.id)}
              >
                Confirm Status Update
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Job Delete Confirmation Modal */}
      {confirmDeleteJob && (
        <Modal
          isOpen={!!confirmDeleteJob}
          onClose={() => setConfirmDeleteJob(null)}
          title="Remove Job Opportunity"
          description={`Delete listing "${confirmDeleteJob.title}"?`}
        >
          <div className="space-y-4 text-xs text-[#A7B2C8]">
            <p>This action will delete the job from the opportunity board. This action cannot be undone.</p>
            <div className="flex justify-end gap-2 pt-2 border-t border-[#26334B]">
              <Button variant="secondary" size="sm" onClick={() => setConfirmDeleteJob(null)}>
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  onDeleteJob(confirmDeleteJob.id);
                  setConfirmDeleteJob(null);
                }}
              >
                Delete Permanently
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Event Delete Confirmation Modal */}
      {confirmDeleteEvent && (
        <Modal
          isOpen={!!confirmDeleteEvent}
          onClose={() => setConfirmDeleteEvent(null)}
          title="Cancel Scheduled Event"
          description={`Cancel "${confirmDeleteEvent.title}"?`}
        >
          <div className="space-y-4 text-xs text-[#A7B2C8]">
            <p>Cancelling will remove the event from student calendars and notify registered attendees.</p>
            <div className="flex justify-end gap-2 pt-2 border-t border-[#26334B]">
              <Button variant="secondary" size="sm" onClick={() => setConfirmDeleteEvent(null)}>
                Close
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  onDeleteEvent(confirmDeleteEvent.id);
                  setConfirmDeleteEvent(null);
                }}
              >
                Confirm Cancellation
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
