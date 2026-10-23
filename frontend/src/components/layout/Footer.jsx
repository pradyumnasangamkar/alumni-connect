// src/components/layout/Footer.jsx
import React from 'react';
import { GraduationCap, Heart, Shield, Users, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="w-full bg-[#0B1020] border-t border-[#26334B] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-left">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#8B7CFF] to-[#55D6E8] flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-bold text-[#F3F5FC]">
                Alumni<span className="text-[#8B7CFF]">Connect</span>
              </span>
            </div>
            <p className="text-xs text-[#7F8BA3] leading-relaxed">
              Bridging university students and alumni across global technology leaders. Empowering authentic mentorship, career opportunities, and lifelong community relationships.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A7B2C8]">Explore Platform</h4>
            <ul className="space-y-2 text-xs text-[#7F8BA3]">
              <li><Link to="/directory" className="hover:text-[#8B7CFF] transition-colors">Alumni Directory</Link></li>
              <li><Link to="/jobs" className="hover:text-[#8B7CFF] transition-colors">Career Opportunities</Link></li>
              <li><Link to="/events" className="hover:text-[#8B7CFF] transition-colors">Campus Events & Webinars</Link></li>
              <li><Link to="/ai-advisor" className="hover:text-[#8B7CFF] transition-colors">Career Guidance Assistant</Link></li>
            </ul>
          </div>

          {/* Community & Mentorship */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A7B2C8]">Community & Support</h4>
            <ul className="space-y-2 text-xs text-[#7F8BA3]">
              <li><span className="hover:text-[#8B7CFF] transition-colors cursor-pointer">Mentorship Guidelines</span></li>
              <li><span className="hover:text-[#8B7CFF] transition-colors cursor-pointer">Campus Chapters & Clubs</span></li>
              <li><span className="hover:text-[#8B7CFF] transition-colors cursor-pointer">Student Referral Network</span></li>
              <li><span className="hover:text-[#8B7CFF] transition-colors cursor-pointer">Code of Professional Ethics</span></li>
            </ul>
          </div>

          {/* Security & Access */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A7B2C8]">Student & Alumni Trust</h4>
            <div className="p-3.5 bg-[#151E33] border border-[#26334B] rounded-xl space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs text-[#43D9A3]">
                <Shield className="w-3.5 h-3.5" />
                <span className="font-semibold">Verified University Network</span>
              </div>
              <p className="text-[11px] text-[#7F8BA3] leading-relaxed">
                All alumni profiles and postings are verified against official institutional graduation records.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#26334B] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7F8BA3]">
          <p>© {new Date().getFullYear()} Alumni Connect. Official University Alumni & Career Network.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[#A7B2C8]">
              Empowering the Next Generation of Engineers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
