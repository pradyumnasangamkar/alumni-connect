// src/pages/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Briefcase, 
  Calendar, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  GraduationCap,
  Building2,
  MapPin,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ProfileCard } from '../components/cards/ProfileCard';
import { alumniProfilesMock } from '../data/mockData';

export const LandingPage = ({ onConnectProfile, onViewProfile }) => {
  const featuredProfiles = alumniProfilesMock.slice(0, 3);

  return (
    <div className="w-full min-h-screen bg-[#0B1020] text-[#F3F5FC] overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Subtle radial ambient glow behind hero */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#8B7CFF]/15 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151E33] border border-[#26334B] text-xs text-[#8B7CFF] font-medium mb-8">
          <Sparkles className="w-3.5 h-3.5 text-[#55D6E8]" />
          <span>The Next-Gen Alumni & Career Network for Engineers</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.15]">
          Connect with Alumni. <br />
          <span className="bg-gradient-to-r from-[#8B7CFF] via-[#55D6E8] to-[#8B7CFF] bg-clip-text text-transparent">
            Accelerate Your Tech Career.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-[#A7B2C8] max-w-2xl mx-auto mt-6 leading-relaxed">
          Alumni Connect bridges current university students with verified graduates working across top tech companies. Unlock senior mentorship, internal referrals, campus webinars, and AI-powered career roadmaps.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Link to="/register">
            <Button size="lg" icon={ArrowRight} className="w-full sm:w-auto">
              Join the Network Free
            </Button>
          </Link>
          <Link to="/directory">
            <Button variant="secondary" size="lg" icon={Users} className="w-full sm:w-auto">
              Explore Alumni Directory
            </Button>
          </Link>
        </div>

        {/* Live UI Mockup Preview */}
        <div className="mt-16 relative mx-auto max-w-5xl rounded-2xl border border-[#26334B] bg-[#10172A]/90 p-4 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-sm text-left">
          <div className="flex items-center justify-between pb-4 border-b border-[#26334B] mb-5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF7185]/80" />
              <span className="w-3 h-3 rounded-full bg-[#F5C76A]/80" />
              <span className="w-3 h-3 rounded-full bg-[#43D9A3]/80" />
              <span className="text-xs text-[#7F8BA3] ml-2 font-mono">alumniconnect.internal/dashboard</span>
            </div>
            <Badge variant="cyan" size="sm">Active Community Preview</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Mockup Card 1: Senior Mentor */}
            <div className="bg-[#151E33] border border-[#26334B] rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#8B7CFF]/20 text-[#8B7CFF] flex items-center justify-center font-bold">
                  PS
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#F3F5FC]">Priya Sharma</h4>
                  <p className="text-xs text-[#8B7CFF]">Google Cloud • Senior SDE</p>
                </div>
              </div>
              <p className="text-xs text-[#A7B2C8] leading-relaxed">
                "Happy to review student GitHub repos and hold mock technical rounds for Java backend roles."
              </p>
              <div className="mt-3 flex gap-1.5">
                <Badge variant="neutral" size="sm">Distributed Systems</Badge>
                <Badge variant="neutral" size="sm">Spring Cloud</Badge>
              </div>
            </div>

            {/* Mockup Card 2: AI Roadmap snippet */}
            <div className="bg-[#151E33] border border-[#26334B] rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-[#55D6E8] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Gemini Career Advisor
                </span>
                <Badge variant="iris" size="sm">Live Recommendation</Badge>
              </div>
              <p className="text-xs font-medium text-[#F3F5FC]">Java Full Stack 2026 Target</p>
              <p className="text-[11px] text-[#7F8BA3] mt-1">Recommended Phase 1 focus:</p>
              <div className="p-2 mt-2 bg-[#10172A] rounded-lg border border-[#26334B]/60 text-xs text-[#A7B2C8]">
                Master Spring Boot 3 MVC lifecycle, Hibernate caching, and BCrypt security filters.
              </div>
            </div>

            {/* Mockup Card 3: Referral alert */}
            <div className="bg-[#151E33] border border-[#26334B] rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-[#43D9A3] flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" />
                  Alumni Referral Open
                </span>
                <span className="text-[10px] text-[#7F8BA3]">1h ago</span>
              </div>
              <p className="text-xs font-semibold text-[#F3F5FC]">Associate Software Engineer</p>
              <p className="text-xs text-[#A7B2C8]">Salesforce • Hyderabad / Hybrid</p>
              <div className="mt-4 flex items-center justify-between text-xs text-[#7F8BA3]">
                <span>Batch of 2026 Eligible</span>
                <span className="text-[#8B7CFF] font-medium">Verified Posting</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pillars Grid */}
      <section className="py-20 bg-[#10172A]/50 border-y border-[#26334B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F3F5FC]">
              Everything you need to step confidently into industry
            </h2>
            <p className="text-sm text-[#A7B2C8] mt-3">
              Built specifically for engineering cohorts to foster authentic connections without the noise of generic social media.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {/* Feature 1 */}
            <div className="bg-[#151E33] border border-[#26334B] rounded-2xl p-6 hover:border-[#8B7CFF]/50 transition-colors">
              <div className="p-3 bg-[#8B7CFF]/15 text-[#8B7CFF] rounded-xl w-fit mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#F3F5FC] mb-2">Verified Alumni Directory</h3>
              <p className="text-xs text-[#A7B2C8] leading-relaxed">
                Filter alumni by graduation year, engineering department, current employer, and technical domain with zero spam.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#151E33] border border-[#26334B] rounded-2xl p-6 hover:border-[#55D6E8]/50 transition-colors">
              <div className="p-3 bg-[#55D6E8]/15 text-[#55D6E8] rounded-xl w-fit mb-4">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#F3F5FC] mb-2">Exclusive Opportunity Board</h3>
              <p className="text-xs text-[#A7B2C8] leading-relaxed">
                Direct job postings and internship openings shared directly by alumni working inside top engineering teams.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#151E33] border border-[#26334B] rounded-2xl p-6 hover:border-[#43D9A3]/50 transition-colors">
              <div className="p-3 bg-[#43D9A3]/15 text-[#43D9A3] rounded-xl w-fit mb-4">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#F3F5FC] mb-2">Webinars & Tech Galas</h3>
              <p className="text-xs text-[#A7B2C8] leading-relaxed">
                Attend interactive placement prep webinars, live system design breakdowns, and annual campus reunions.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-[#151E33] border border-[#26334B] rounded-2xl p-6 hover:border-[#F5C76A]/50 transition-colors">
              <div className="p-3 bg-[#F5C76A]/15 text-[#F5C76A] rounded-xl w-fit mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#F3F5FC] mb-2">AI Career Advisor</h3>
              <p className="text-xs text-[#A7B2C8] leading-relaxed">
                Get tailored learning roadmaps, project suggestions, and interview question banks customized to your target role.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Alumni Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <Badge variant="iris" size="sm" className="mb-2">Network Highlights</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F3F5FC]">
              Meet Alumni Leading Across the Industry
            </h2>
            <p className="text-sm text-[#A7B2C8] mt-2">
              Our graduates work at world-class engineering organizations and are ready to guide you.
            </p>
          </div>
          <Link to="/directory" className="mt-4 sm:mt-0">
            <Button variant="secondary" size="sm" icon={ArrowRight}>
              View All Alumni
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {featuredProfiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              onConnect={onConnectProfile}
              onViewProfile={onViewProfile}
            />
          ))}
        </div>
      </section>

      {/* AI Spotlight Section */}
      <section className="py-20 bg-gradient-to-b from-[#10172A] to-[#0B1020] border-t border-[#26334B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#151E33] border border-[#26334B] rounded-3xl p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#8B7CFF]/10 blur-[90px] rounded-full pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="text-left space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B7CFF]/20 text-[#8B7CFF] text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-[#55D6E8]" />
                  <span>Powered by Google Gemini</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#F3F5FC] leading-snug">
                  Personalized career roadmaps built around your exact skillset
                </h2>
                <p className="text-sm text-[#A7B2C8] leading-relaxed">
                  Not sure which topics to master for your upcoming interviews? Share your current academic status and dream company, and get a realistic roadmap, capstone project ideas, and frequently asked interview questions.
                </p>

                <ul className="space-y-2.5 text-xs text-[#A7B2C8]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#43D9A3]" />
                    <span>Backend & Full Stack roadmaps focused on Java, Spring Boot, and React</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#43D9A3]" />
                    <span>Real-world portfolio project specifications recruiters love</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#43D9A3]" />
                    <span>Curated technical interview questions with beginner-friendly explanations</span>
                  </li>
                </ul>

                <div className="pt-2">
                  <Link to="/ai-advisor">
                    <Button variant="primary" icon={Sparkles}>
                      Try AI Career Advisor Now
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Sample AI Output Preview Card */}
              <div className="bg-[#10172A] border border-[#26334B] rounded-2xl p-6 text-left space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#26334B]">
                  <span className="text-xs font-semibold text-[#8B7CFF]">AI Career Guidance Plan</span>
                  <Badge variant="cyan" size="sm">Java Full Stack</Badge>
                </div>
                <div className="space-y-3 text-xs">
                  <div>
                    <p className="text-[#7F8BA3] font-medium">Career Assessment:</p>
                    <p className="text-[#F3F5FC] mt-0.5">High demand for developers who understand the complete request lifecycle from React client to Spring Boot Service down to MySQL queries.</p>
                  </div>
                  <div>
                    <p className="text-[#7F8BA3] font-medium">Recommended Milestone 1:</p>
                    <p className="text-[#55D6E8] mt-0.5">Implement JWT authentication with HttpOnly cookies & Spring Security 6 filter chains.</p>
                  </div>
                  <div>
                    <p className="text-[#7F8BA3] font-medium">Placement Interview Check:</p>
                    <p className="text-[#A7B2C8] mt-0.5">"Explain how Hibernate interacts with the JDBC driver and why the N+1 problem occurs."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Conversion CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F3F5FC]">
          Ready to elevate your engineering career?
        </h2>
        <p className="text-sm text-[#A7B2C8] mt-4 max-w-xl mx-auto">
          Join hundreds of students and alumni already collaborating, sharing opportunities, and advancing together.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/register">
            <Button size="lg" icon={ArrowRight}>
              Create Student Account
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
