// src/components/modals/ProfileModal.jsx
import React from 'react';
import { Modal } from '../ui/Modal';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { 
  Building2, 
  GraduationCap, 
  MapPin, 
  ExternalLink, 
  Code, 
  Mail, 
  UserPlus, 
  Check, 
  Clock 
} from 'lucide-react';

export const ProfileModal = ({
  profile,
  isOpen,
  onClose,
  onConnect,
}) => {
  if (!profile) return null;

  const {
    fullName,
    email,
    headline,
    currentCompany,
    currentRole,
    department,
    graduationYear,
    location,
    avatarUrl,
    bio,
    skills = [],
    linkedinUrl,
    githubUrl,
    connectionStatus = 'NONE',
  } = profile;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Alumni Profile Details"
      description="Verified University Community Member"
      maxWidth="max-w-xl"
    >
      <div className="space-y-6 text-left">
        {/* Profile Header */}
        <div className="flex items-start gap-4 pb-4 border-b border-[#26334B]">
          <Avatar
            src={avatarUrl}
            name={fullName}
            size="xl"
            className="ring-2 ring-[#8B7CFF]/50"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-[#F3F5FC] truncate">
              {fullName}
            </h3>
            <p className="text-xs text-[#8B7CFF] font-semibold mt-0.5">
              {currentRole}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-[#A7B2C8] mt-1">
              <Building2 className="w-3.5 h-3.5 text-[#7F8BA3]" />
              <span>{currentCompany}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#7F8BA3] mt-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{location || 'Bengaluru, India'}</span>
            </div>
          </div>
        </div>

        {/* Academic Details */}
        <div className="bg-[#10172A] border border-[#26334B] rounded-xl p-3.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-[#55D6E8]" />
            <span className="text-[#F3F5FC] font-medium">{department}</span>
          </div>
          <Badge variant="cyan" size="sm">Class of {graduationYear}</Badge>
        </div>

        {/* Professional Bio */}
        {bio && (
          <div>
            <h4 className="text-xs font-semibold text-[#7F8BA3] uppercase tracking-wider mb-1.5">
              Professional Biography
            </h4>
            <p className="text-xs text-[#A7B2C8] leading-relaxed bg-[#151E33] p-3 rounded-xl border border-[#26334B]/60">
              {bio}
            </p>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-[#7F8BA3] uppercase tracking-wider mb-2">
              Skills & Competencies
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill, i) => (
                <Badge key={i} variant="neutral" size="sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Social and Contact Links */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#10172A] hover:bg-[#1C2742] border border-[#26334B] rounded-lg text-xs text-[#A7B2C8] hover:text-[#F3F5FC] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#55D6E8]" />
              <span>LinkedIn Profile</span>
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#10172A] hover:bg-[#1C2742] border border-[#26334B] rounded-lg text-xs text-[#A7B2C8] hover:text-[#F3F5FC] transition-colors"
            >
              <Code className="w-3.5 h-3.5 text-[#8B7CFF]" />
              <span>GitHub Repositories</span>
            </a>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#26334B] flex justify-end gap-2">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>

          {connectionStatus === 'ACCEPTED' ? (
            <Button
              variant="outline"
              size="sm"
              disabled
              icon={Check}
              className="text-[#43D9A3] border-[#43D9A3]/30"
            >
              Connected
            </Button>
          ) : connectionStatus === 'PENDING' ? (
            <Button
              variant="outline"
              size="sm"
              disabled
              icon={Clock}
              className="text-[#F5C76A] border-[#F5C76A]/30"
            >
              Request Pending
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              icon={UserPlus}
              onClick={() => {
                if (onConnect) onConnect(profile);
              }}
            >
              Send Connection Request
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
