// src/pages/DirectoryPage.jsx
import React, { useState, useMemo } from 'react';
import { Search, Filter, X, Users, RefreshCw } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { ProfileCard } from '../components/cards/ProfileCard';
import { EmptyState } from '../components/ui/EmptyState';

export const DirectoryPage = ({
  alumniList = [],
  onConnectProfile,
  onViewProfile,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [selectedYear, setSelectedYear] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter profiles based on user inputs
  const filteredAlumni = useMemo(() => {
    return alumniList.filter((alumni) => {
      const matchesSearch = 
        !searchTerm.trim() ||
        alumni.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.currentCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.currentRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesDept = 
        selectedDept === 'ALL' || alumni.department.toLowerCase().includes(selectedDept.toLowerCase());

      const matchesYear = 
        selectedYear === 'ALL' || alumni.graduationYear.toString() === selectedYear;

      return matchesSearch && matchesDept && matchesYear;
    });
  }, [alumniList, searchTerm, selectedDept, selectedYear]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredAlumni.length / itemsPerPage) || 1;
  const paginatedAlumni = filteredAlumni.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedDept('ALL');
    setSelectedYear('ALL');
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-left">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#F3F5FC]">Alumni Directory</h1>
        <p className="text-xs sm:text-sm text-[#A7B2C8] mt-1">
          Explore and connect with verified graduates across top technology enterprises and startups.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-[#151E33] border border-[#26334B] rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              placeholder="Search by alumni name, company, role, or technical skill..."
              icon={Search}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              rightElement={
                searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="p-1 text-[#7F8BA3] hover:text-[#F3F5FC] cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )
              }
            />
          </div>

          {/* Department Filter */}
          <select
            value={selectedDept}
            onChange={(e) => {
              setSelectedDept(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-[#10172A] border border-[#26334B] hover:border-[#3B4D6E] focus:border-[#8B7CFF] text-xs text-[#F3F5FC] rounded-lg px-3 py-2.5 outline-none cursor-pointer"
          >
            <option value="ALL">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Electronics">Electronics & Comm.</option>
          </select>

          {/* Graduation Year Filter */}
          <select
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-[#10172A] border border-[#26334B] hover:border-[#3B4D6E] focus:border-[#8B7CFF] text-xs text-[#F3F5FC] rounded-lg px-3 py-2.5 outline-none cursor-pointer"
          >
            <option value="ALL">All Graduation Batches</option>
            <option value="2022">Batch of 2022</option>
            <option value="2021">Batch of 2021</option>
            <option value="2020">Batch of 2020</option>
            <option value="2019">Batch of 2019</option>
            <option value="2018">Batch of 2018</option>
            <option value="2017">Batch of 2017</option>
          </select>
        </div>

        {/* Active Filter Indicators */}
        <div className="flex items-center justify-between text-xs text-[#7F8BA3] pt-2 border-t border-[#26334B]/60">
          <span>
            Showing <strong className="text-[#F3F5FC]">{filteredAlumni.length}</strong> alumni members
          </span>
          {(searchTerm || selectedDept !== 'ALL' || selectedYear !== 'ALL') && (
            <button
              onClick={handleResetFilters}
              className="text-[#8B7CFF] hover:underline flex items-center gap-1 cursor-pointer font-medium"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Directory Grid */}
      {paginatedAlumni.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No alumni found matching criteria"
          description="Try broadening your search term or clearing department and graduation batch filters."
          actionLabel="Reset Search & Filters"
          onAction={handleResetFilters}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedAlumni.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              onConnect={onConnectProfile}
              onViewProfile={onViewProfile}
            />
          ))}
        </div>
      )}

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <Button
            variant="secondary"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                currentPage === page
                  ? 'bg-[#8B7CFF] text-white shadow-[0_0_10px_rgba(139,124,255,0.4)]'
                  : 'bg-[#151E33] border border-[#26334B] text-[#A7B2C8] hover:text-[#F3F5FC]'
              }`}
            >
              {page}
            </button>
          ))}

          <Button
            variant="secondary"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};
