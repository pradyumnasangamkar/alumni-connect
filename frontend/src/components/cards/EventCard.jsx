// src/components/cards/EventCard.jsx
import React from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Calendar, Clock, MapPin, Users, Check, UserCheck } from 'lucide-react';

/**
 * Event card displaying workshops, webinars, and reunions with live RSVP state.
 */
export const EventCard = ({
  event,
  onToggleRsvp,
}) => {
  const {
    title,
    eventType,
    organizerName,
    date,
    time,
    locationOrLink,
    maxCapacity,
    registeredCount,
    isRegistered,
    description,
  } = event;

  const percentFull = Math.min(100, Math.round((registeredCount / maxCapacity) * 100));

  const getEventTypeBadge = (type) => {
    switch (type) {
      case 'WEBINAR':
        return <Badge variant="iris" size="sm">Webinar</Badge>;
      case 'WORKSHOP':
        return <Badge variant="cyan" size="sm">Hands-on Workshop</Badge>;
      case 'REUNION':
        return <Badge variant="warning" size="sm">Networking Gala</Badge>;
      default:
        return <Badge variant="neutral" size="sm">{type}</Badge>;
    }
  };

  return (
    <div className="bg-[#151E33] border border-[#26334B] hover:border-[#8B7CFF]/50 rounded-2xl p-5 sm:p-6 transition-all duration-200 flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          {getEventTypeBadge(eventType)}
          <span className="text-xs text-[#7F8BA3]">Hosted by {organizerName}</span>
        </div>

        <h3 className="text-base font-semibold text-[#F3F5FC] hover:text-[#8B7CFF] transition-colors">
          {title}
        </h3>

        <p className="text-xs text-[#A7B2C8] mt-2.5 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Date and Time */}
        <div className="space-y-2 text-xs text-[#A7B2C8] mt-4 pt-3 border-t border-[#26334B]/60">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-[#8B7CFF]" />
            <span className="font-medium text-[#F3F5FC]">{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#55D6E8]" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-2 text-[#7F8BA3]">
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate">{locationOrLink}</span>
          </div>
        </div>

        {/* Capacity Bar */}
        <div className="mt-4 pt-3 border-t border-[#26334B]/60">
          <div className="flex items-center justify-between text-xs text-[#7F8BA3] mb-1.5">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span>Attendees</span>
            </span>
            <span className="font-medium text-[#F3F5FC]">
              {registeredCount} / {maxCapacity} seats filled
            </span>
          </div>
          <div className="w-full bg-[#10172A] rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                percentFull > 85 ? 'bg-[#FF7185]' : 'bg-[#8B7CFF]'
              }`}
              style={{ width: `${percentFull}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-[#26334B]/60">
        {isRegistered ? (
          <Button
            variant="outline"
            size="sm"
            className="w-full text-[#43D9A3] border-[#43D9A3]/30 hover:border-[#FF7185]/40 hover:text-[#FF7185] group/btn"
            icon={Check}
            onClick={() => onToggleRsvp && onToggleRsvp(event.id)}
          >
            <span className="group-hover/btn:hidden">RSVP Confirmed</span>
            <span className="hidden group-hover/btn:inline">Cancel RSVP</span>
          </Button>
        ) : (
          <Button
            variant="primary"
            size="sm"
            className="w-full"
            icon={UserCheck}
            disabled={registeredCount >= maxCapacity}
            onClick={() => onToggleRsvp && onToggleRsvp(event.id)}
          >
            {registeredCount >= maxCapacity ? 'Event Full' : 'RSVP to Attend'}
          </Button>
        )}
      </div>
    </div>
  );
};
