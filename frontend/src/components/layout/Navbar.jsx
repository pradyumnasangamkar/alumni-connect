// src/components/layout/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Users, 
  Briefcase, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  Menu, 
  X, 
  Bell, 
  User, 
  LogOut,
  ChevronDown
} from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';

export const Navbar = ({ currentUser, onLogout, notifications = [] }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const navLinks = [
    { label: 'Directory', path: '/directory', icon: Users },
    { label: 'Jobs', path: '/jobs', icon: Briefcase },
    { label: 'Events', path: '/events', icon: Calendar },
    { label: 'AI Advisor', path: '/ai-advisor', icon: Sparkles, highlight: true },
  ];

  if (currentUser?.role === 'ADMIN') {
    navLinks.push({ label: 'Admin', path: '/admin', icon: ShieldCheck });
  }

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 w-full bg-[#0B1020]/90 backdrop-blur-md border-b border-[#26334B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <Link to={currentUser ? "/dashboard" : "/"} className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#8B7CFF] to-[#55D6E8] flex items-center justify-center shadow-[0_0_15px_rgba(139,124,255,0.3)] transition-transform group-hover:scale-105">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-[#F3F5FC]">
                Alumni<span className="text-[#8B7CFF]">Connect</span>
              </span>
              <span className="text-[10px] text-[#7F8BA3] font-medium tracking-wide -mt-1">
                University Network
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          {currentUser && (
            <div className="hidden md:flex items-center gap-1">
              <Link
                to="/dashboard"
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  isActive('/dashboard') 
                    ? 'text-[#F3F5FC] bg-[#151E33] border border-[#26334B]' 
                    : 'text-[#A7B2C8] hover:text-[#F3F5FC] hover:bg-[#151E33]/50'
                }`}
              >
                Dashboard
              </Link>

              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      isActive(link.path)
                        ? 'text-[#F3F5FC] bg-[#151E33] border border-[#26334B]'
                        : link.highlight
                        ? 'text-[#8B7CFF] hover:bg-[#8B7CFF]/10'
                        : 'text-[#A7B2C8] hover:text-[#F3F5FC] hover:bg-[#151E33]/50'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{link.label}</span>
                    {link.highlight && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#55D6E8] animate-pulse" />
                    )}
                  </Link>
                );
              })}
            </div>
          )}

          {/* Right Header: Notification + Profile or Login/Register */}
          <div className="hidden md:flex items-center gap-3">
            {currentUser ? (
              <>
                {/* Notifications Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setIsNotificationsOpen(!isNotificationsOpen);
                      setIsUserMenuOpen(false);
                    }}
                    className="p-2 text-[#A7B2C8] hover:text-[#F3F5FC] hover:bg-[#151E33] rounded-lg transition-colors relative cursor-pointer"
                    aria-label="View notifications"
                  >
                    <Bell className="w-4 h-4" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#8B7CFF] ring-2 ring-[#0B1020]" />
                    )}
                  </button>

                  {/* Notification Popover */}
                  {isNotificationsOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-[#151E33] border border-[#26334B] rounded-xl shadow-2xl py-2 z-50 text-left">
                      <div className="px-4 py-2 border-b border-[#26334B] flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#F3F5FC]">Notifications</span>
                        <Badge variant="iris" size="sm">{unreadCount} new</Badge>
                      </div>
                      <div className="max-h-72 overflow-y-auto divide-y divide-[#26334B]/50">
                        {notifications.length === 0 ? (
                          <p className="p-4 text-xs text-[#7F8BA3] text-center">No notifications</p>
                        ) : (
                          notifications.map((n) => (
                            <div key={n.id} className="p-3 hover:bg-[#1C2742] transition-colors cursor-pointer">
                              <p className="text-xs font-medium text-[#F3F5FC]">{n.title}</p>
                              <p className="text-[11px] text-[#A7B2C8] mt-0.5">{n.message}</p>
                              <span className="text-[10px] text-[#7F8BA3] mt-1 block">{n.timestamp}</span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(!isUserMenuOpen);
                      setIsNotificationsOpen(false);
                    }}
                    className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-lg hover:bg-[#151E33] border border-transparent hover:border-[#26334B] transition-colors cursor-pointer"
                  >
                    <Avatar
                      src={currentUser.avatarUrl}
                      name={currentUser.fullName}
                      size="sm"
                    />
                    <div className="text-left hidden lg:block">
                      <p className="text-xs font-semibold text-[#F3F5FC] leading-none">
                        {currentUser.fullName}
                      </p>
                      <span className="text-[10px] text-[#7F8BA3] uppercase tracking-wider">
                        {currentUser.role}
                      </span>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-[#7F8BA3]" />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-[#151E33] border border-[#26334B] rounded-xl shadow-2xl py-1.5 z-50 text-left">
                      <div className="px-3.5 py-2 border-b border-[#26334B]">
                        <p className="text-xs font-medium text-[#F3F5FC]">{currentUser.fullName}</p>
                        <p className="text-[11px] text-[#7F8BA3] truncate">{currentUser.email}</p>
                      </div>
                      <Link
                        to="/dashboard"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3.5 py-2 text-xs text-[#A7B2C8] hover:text-[#F3F5FC] hover:bg-[#1C2742] transition-colors"
                      >
                        <User className="w-3.5 h-3.5 text-[#8B7CFF]" />
                        <span>Profile & Settings</span>
                      </Link>
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          if (onLogout) onLogout();
                          navigate('/login');
                        }}
                        className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-[#FF7185] hover:bg-[#FF7185]/10 transition-colors text-left cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#A7B2C8] hover:text-[#F3F5FC] hover:bg-[#151E33] transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-white bg-gradient-to-r from-[#8B7CFF] to-[#7A69FA] hover:brightness-110 shadow-[0_0_15px_rgba(139,124,255,0.25)] transition-all"
                >
                  Join Network
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#A7B2C8] hover:text-[#F3F5FC] hover:bg-[#151E33] rounded-lg cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#10172A] border-b border-[#26334B] px-4 pt-3 pb-6 space-y-2 text-left">
          {currentUser ? (
            <>
              <div className="flex items-center gap-3 p-3 bg-[#151E33] rounded-xl mb-3">
                <Avatar src={currentUser.avatarUrl} name={currentUser.fullName} size="md" />
                <div>
                  <p className="text-sm font-semibold text-[#F3F5FC]">{currentUser.fullName}</p>
                  <p className="text-xs text-[#8B7CFF] capitalize">{currentUser.role.toLowerCase()}</p>
                </div>
              </div>

              <Link
                to="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm text-[#A7B2C8] hover:text-[#F3F5FC] rounded-lg"
              >
                Dashboard
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm text-[#A7B2C8] hover:text-[#F3F5FC] rounded-lg"
                >
                  {link.label}
                </Link>
              ))}

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (onLogout) onLogout();
                  navigate('/login');
                }}
                className="w-full text-left px-3 py-2 text-sm text-[#FF7185] hover:bg-[#FF7185]/10 rounded-lg cursor-pointer mt-2"
              >
                Sign Out
              </button>
            </>
          ) : (
            <div className="space-y-2 pt-2">
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-center py-2.5 text-sm text-[#F3F5FC] bg-[#151E33] border border-[#26334B] rounded-lg"
              >
                Log In
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-center py-2.5 text-sm text-white bg-gradient-to-r from-[#8B7CFF] to-[#7A69FA] rounded-lg"
              >
                Join Network
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};
