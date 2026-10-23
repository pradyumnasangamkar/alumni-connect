// src/pages/ConnectionsPage.jsx
import React, { useState } from 'react';
import { UserCheck, Clock, UserPlus, Check, X, Building2, GraduationCap } from 'lucide-react';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';

export const ConnectionsPage = ({
  alumniList = [],
  connectionRequests = [],
  onAcceptRequest,
  onIgnoreRequest,
  onCancelRequest,
  onViewProfile,
}) => {
  const [activeTab, setActiveTab] = useState('RECEIVED'); // 'RECEIVED' | 'MY_NETWORK' | 'SENT'

  // Accepted connections
  const connectedAlumni = alumniList.filter((a) => a.connectionStatus === 'ACCEPTED');

  // Sent requests (alumni whose status is PENDING)
  const sentRequests = alumniList.filter((a) => a.connectionStatus === 'PENDING');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-left">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#F3F5FC]">Network & Invitations</h1>
        <p className="text-xs sm:text-sm text-[#A7B2C8] mt-1">
          Manage your incoming connection requests, monitor pending invites, and nurture your university professional circle.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#26334B] gap-2">
        <button
          onClick={() => setActiveTab('RECEIVED')}
          className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === 'RECEIVED'
              ? 'border-[#8B7CFF] text-[#8B7CFF] bg-[#8B7CFF]/5'
              : 'border-transparent text-[#7F8BA3] hover:text-[#F3F5FC]'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Received Invitations</span>
          {connectionRequests.length > 0 && (
            <Badge variant="iris" size="sm">
              {connectionRequests.length}
            </Badge>
          )}
        </button>

        <button
          onClick={() => setActiveTab('MY_NETWORK')}
          className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === 'MY_NETWORK'
              ? 'border-[#8B7CFF] text-[#8B7CFF] bg-[#8B7CFF]/5'
              : 'border-transparent text-[#7F8BA3] hover:text-[#F3F5FC]'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>My Network</span>
          <Badge variant="neutral" size="sm">
            {connectedAlumni.length}
          </Badge>
        </button>

        <button
          onClick={() => setActiveTab('SENT')}
          className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === 'SENT'
              ? 'border-[#8B7CFF] text-[#8B7CFF] bg-[#8B7CFF]/5'
              : 'border-transparent text-[#7F8BA3] hover:text-[#F3F5FC]'
          }`}
        >
          <UserPlus className="w-4 h-4" />
          <span>Sent Requests</span>
          <Badge variant="neutral" size="sm">
            {sentRequests.length}
          </Badge>
        </button>
      </div>

      {/* Tab 1: Received Requests */}
      {activeTab === 'RECEIVED' && (
        <div className="space-y-4">
          {connectionRequests.length === 0 ? (
            <EmptyState
              icon={UserCheck}
              title="No pending incoming invitations"
              description="When alumni or fellow students invite you to connect, their requests will appear here."
            />
          ) : (
            connectionRequests.map((req) => (
              <div
                key={req.id}
                className="bg-[#151E33] border border-[#26334B] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <Avatar
                    src={req.sender.avatarUrl}
                    name={req.sender.fullName}
                    size="lg"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-[#F3F5FC]">
                      {req.sender.fullName}
                    </h4>
                    <p className="text-xs text-[#8B7CFF] font-medium">
                      {req.sender.currentRole} at {req.sender.currentCompany}
                    </p>
                    <p className="text-[11px] text-[#7F8BA3] mt-0.5">
                      {req.sender.department} • Sent {req.sentAt}
                    </p>
                    {req.note && (
                      <p className="text-xs text-[#A7B2C8] bg-[#10172A] p-2.5 rounded-lg border border-[#26334B]/60 mt-2.5 italic">
                        "{req.note}"
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <Button
                    variant="primary"
                    size="sm"
                    icon={Check}
                    onClick={() => onAcceptRequest && onAcceptRequest(req)}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={X}
                    onClick={() => onIgnoreRequest && onIgnoreRequest(req.id)}
                  >
                    Ignore
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: My Network */}
      {activeTab === 'MY_NETWORK' && (
        <div className="space-y-4">
          {connectedAlumni.length === 0 ? (
            <EmptyState
              icon={UserCheck}
              title="Your network is currently empty"
              description="Head over to the Alumni Directory to discover graduates and send connection requests."
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {connectedAlumni.map((alumni) => (
                <div
                  key={alumni.id}
                  className="bg-[#151E33] border border-[#26334B] rounded-2xl p-5 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={alumni.avatarUrl}
                      name={alumni.fullName}
                      size="md"
                    />
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-[#F3F5FC] truncate">
                        {alumni.fullName}
                      </h4>
                      <p className="text-xs text-[#8B7CFF] truncate">
                        {alumni.currentRole}
                      </p>
                      <p className="text-[11px] text-[#7F8BA3] truncate">
                        {alumni.currentCompany}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onViewProfile && onViewProfile(alumni)}
                  >
                    View
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Sent Requests */}
      {activeTab === 'SENT' && (
        <div className="space-y-4">
          {sentRequests.length === 0 ? (
            <EmptyState
              icon={Clock}
              title="No pending outgoing requests"
              description="Requests you send to alumni members in the directory will appear here until they accept."
            />
          ) : (
            sentRequests.map((alumni) => (
              <div
                key={alumni.id}
                className="bg-[#151E33] border border-[#26334B] rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <Avatar
                    src={alumni.avatarUrl}
                    name={alumni.fullName}
                    size="md"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-[#F3F5FC]">
                      {alumni.fullName}
                    </h4>
                    <p className="text-xs text-[#A7B2C8]">
                      {alumni.currentRole} at {alumni.currentCompany}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="warning" size="sm">
                    Pending Acceptance
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[#FF7185] border-[#FF7185]/30 hover:bg-[#FF7185]/10"
                    onClick={() => onCancelRequest && onCancelRequest(alumni.id)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
