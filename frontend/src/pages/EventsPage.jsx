// src/pages/EventsPage.jsx
import React, { useState, useMemo } from 'react';
import { Calendar, Search, Users, PlusCircle, CheckCircle2 } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { EventCard } from '../components/cards/EventCard';
import { EmptyState } from '../components/ui/EmptyState';
import { Badge } from '../components/ui/Badge';

export const EventsPage = ({
  eventsList = [],
  onToggleRsvp,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');

  const filteredEvents = useMemo(() => {
    return eventsList.filter((event) => {
      const matchesSearch =
        !searchTerm.trim() ||
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.organizerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType =
        selectedType === 'ALL' || event.eventType === selectedType;

      return matchesSearch && matchesType;
    });
  }, [eventsList, searchTerm, selectedType]);

  const myRsvpdCount = eventsList.filter((e) => e.isRegistered).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F3F5FC]">Campus & Virtual Events</h1>
          <p className="text-xs sm:text-sm text-[#A7B2C8] mt-1">
            Join placement strategy webinars, live coding workshops, and regional alumni networking sessions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="success" size="md">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>You have {myRsvpdCount} RSVP'd events</span>
          </Badge>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-[#151E33] border border-[#26334B] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder="Search events by topic, guest speaker, or agenda..."
            icon={Search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {[
            { label: 'All Formats', value: 'ALL' },
            { label: 'Webinars', value: 'WEBINAR' },
            { label: 'Workshops', value: 'WORKSHOP' },
            { label: 'Reunions & Galas', value: 'REUNION' },
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

      {/* Event Grid */}
      {filteredEvents.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No events matching criteria"
          description="Check back soon for new webinar schedules and placement preparation workshops."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onToggleRsvp={onToggleRsvp}
            />
          ))}
        </div>
      )}
    </div>
  );
};
