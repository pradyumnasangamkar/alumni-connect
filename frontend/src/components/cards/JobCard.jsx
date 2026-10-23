// src/components/cards/JobCard.jsx
import React from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Building2, MapPin, Briefcase, Calendar, ExternalLink } from 'lucide-react';

/**
 * Opportunity card for jobs and internships with company details and quick apply.
 */
export const JobCard = ({
  job,
  onViewDetails,
}) => {
  const {
    title,
    companyName,
    location,
    jobType,
    experienceLevel,
    postedBy,
    deadline,
    description,
    applicationUrl,
  } = job;

  const getJobTypeBadge = (type) => {
    switch (type) {
      case 'INTERNSHIP':
        return <Badge variant="cyan" size="sm">Internship</Badge>;
      case 'REMOTE':
        return <Badge variant="iris" size="sm">Remote</Badge>;
      default:
        return <Badge variant="success" size="sm">Full-Time</Badge>;
    }
  };

  return (
    <div className="bg-[#151E33] border border-[#26334B] hover:border-[#8B7CFF]/50 rounded-2xl p-5 sm:p-6 transition-all duration-200 flex flex-col justify-between group">
      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-[#A7B2C8] flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#8B7CFF]" />
                {companyName}
              </span>
              {getJobTypeBadge(jobType)}
            </div>
            <h3 
              onClick={() => onViewDetails && onViewDetails(job)}
              className="text-base font-semibold text-[#F3F5FC] hover:text-[#8B7CFF] cursor-pointer transition-colors"
            >
              {title}
            </h3>
          </div>
        </div>

        <p className="text-xs text-[#A7B2C8] mt-3 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Details list */}
        <div className="grid grid-cols-2 gap-2 text-xs text-[#7F8BA3] mt-4 pt-3 border-t border-[#26334B]/60">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#7F8BA3]" />
            <span className="truncate">{location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-[#7F8BA3]" />
            <span className="truncate">{experienceLevel}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-[#7F8BA3] mt-3">
          <span className="truncate">Posted by: <span className="text-[#A7B2C8]">{postedBy}</span></span>
          <div className="flex items-center gap-1 text-[#F5C76A]">
            <Calendar className="w-3 h-3" />
            <span>Apply by {deadline}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-5 pt-4 border-t border-[#26334B]/60">
        <Button
          variant="secondary"
          size="sm"
          className="flex-1"
          onClick={() => onViewDetails && onViewDetails(job)}
        >
          View Details
        </Button>
        <a
          href={applicationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex"
        >
          <Button
            variant="primary"
            size="sm"
            icon={ExternalLink}
          >
            Apply
          </Button>
        </a>
      </div>
    </div>
  );
};
