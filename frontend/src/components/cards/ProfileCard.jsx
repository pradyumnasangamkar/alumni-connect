// src/components/cards/ProfileCard.jsx
import React from 'react';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Building2, GraduationCap, MapPin, UserPlus, Check, Clock } from 'lucide-react';

/**
 * Polished ProfileCard for the Alumni Directory and Dashboard recommendations.
 */
export const ProfileCard = ({
  profile,
  onConnect,
  onViewProfile,
}) => {
  const {
    fullName,
    headline,
    currentCompany,
    currentRole,
    department,
    graduationYear,
    location,
    avatarUrl,
    skills = [],
    connectionStatus = 'NONE', // 'NONE' | 'PENDING' | 'ACCEPTED'
  } = profile;

  return (
    <div className="bg-[#151E33] border border-[#26334B] hover:border-[#8B7CFF]/50 rounded-2xl p-5 sm:p-6 transition-all duration-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)] flex flex-col justify-between group">
      <div>
        {/* Header with Avatar and Basic Info */}
        <div className="flex items-start gap-4">
          <Avatar
            src={avatarUrl}
            name={fullName}
            size="lg"
            className="ring-2 ring-[#26334B] group-hover:ring-[#8B7CFF]/60 transition-all"
          />
          <div className="flex-1 min-w-0">
            <h3 
              onClick={() => onViewProfile && onViewProfile(profile)}
              className="text-base font-semibold text-[#F3F5FC] hover:text-[#8B7CFF] cursor-pointer transition-colors truncate"
            >
              {fullName}
            </h3>
            <p className="text-xs text-[#8B7CFF] font-medium truncate mt-0.5">
              {currentRole}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-[#A7B2C8] mt-1 truncate">
              <Building2 className="w-3.5 h-3.5 text-[#7F8BA3] shrink-0" />
              <span className="truncate">{currentCompany}</span>
            </div>
          </div>
        </div>

        {/* Headline / Summary */}
        {headline && (
          <p className="text-xs text-[#A7B2C8] line-clamp-2 mt-3.5 leading-relaxed">
            {headline}
          </p>
        )}

        {/* Metadata: Graduation & Location */}
        <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs text-[#7F8BA3] mt-3.5 pt-3 border-t border-[#26334B]/60">
          <div className="flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-[#55D6E8]" />
            <span>Class of {graduationYear} • {department?.split(' ')[0]}</span>
          </div>
          {location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#7F8BA3]" />
              <span>{location}</span>
            </div>
          )}
        </div>

        {/* Skills Chips */}
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {skills.slice(0, 4).map((skill, i) => (
              <Badge key={i} variant="neutral" size="sm">
                {skill}
              </Badge>
            ))}
            {skills.length > 4 && (
              <span className="text-[11px] text-[#7F8BA3] self-center">
                +{skills.length - 4} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="flex items-center gap-2 mt-5 pt-4 border-t border-[#26334B]/60">
        <Button
          variant="secondary"
          size="sm"
          className="flex-1"
          onClick={() => onViewProfile && onViewProfile(profile)}
        >
          View Profile
        </Button>

        {connectionStatus === 'ACCEPTED' ? (
          <Button
            variant="outline"
            size="sm"
            disabled
            className="text-[#43D9A3] border-[#43D9A3]/30 bg-[#43D9A3]/10"
            icon={Check}
          >
            Connected
          </Button>
        ) : connectionStatus === 'PENDING' ? (
          <Button
            variant="outline"
            size="sm"
            disabled
            className="text-[#F5C76A] border-[#F5C76A]/30 bg-[#F5C76A]/10"
            icon={Clock}
          >
            Pending
          </Button>
        ) : (
          <Button
            variant="primary"
            size="sm"
            icon={UserPlus}
            onClick={() => onConnect && onConnect(profile)}
          >
            Connect
          </Button>
        )}
      </div>
    </div>
  );
};
