// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both your email address and password.');
      return;
    }

    setIsLoading(true);

    // Simulate backend Spring Security authentication latency
    setTimeout(() => {
      setIsLoading(false);

      // Determine role based on email or test credentials
      let role = 'STUDENT';
      let fullName = 'Sangamesh Patil';
      if (email.includes('admin')) {
        role = 'ADMIN';
        fullName = 'System Administrator';
      } else if (email.includes('alumni') || email.includes('google')) {
        role = 'ALUMNI';
        fullName = 'Priya Sharma';
      }

      onLogin({
        id: 1,
        fullName,
        email,
        role,
        avatarUrl: role === 'ALUMNI' 
          ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250"
          : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
      });

      navigate('/dashboard');
    }, 700);
  };

  const handleDemoFill = (roleType) => {
    if (roleType === 'STUDENT') {
      setEmail('student@university.edu');
      setPassword('Password@123');
    } else if (roleType === 'ALUMNI') {
      setEmail('alumni@google.com');
      setPassword('Password@123');
    } else if (roleType === 'ADMIN') {
      setEmail('admin@university.edu');
      setPassword('AdminSecure#2026');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#151E33] border border-[#26334B] rounded-2xl p-6 sm:p-8 shadow-2xl text-left">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#8B7CFF] to-[#55D6E8] flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(139,124,255,0.3)]">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-[#F3F5FC]">Welcome Back</h2>
          <p className="text-xs text-[#A7B2C8] mt-1">
            Sign in to access the Alumni Connect portal
          </p>
        </div>

        {/* Demo Fast-Fill Bar */}
        <div className="mb-6 p-3 bg-[#10172A] border border-[#26334B] rounded-xl">
          <p className="text-[11px] font-semibold text-[#8B7CFF] uppercase tracking-wider mb-2 text-center">
            Interview Demo Fast-Fill
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => handleDemoFill('STUDENT')}
              className="text-[11px] py-1.5 px-2 bg-[#151E33] hover:bg-[#1C2742] text-[#A7B2C8] hover:text-[#F3F5FC] border border-[#26334B] rounded-lg transition-colors cursor-pointer text-center font-medium"
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill('ALUMNI')}
              className="text-[11px] py-1.5 px-2 bg-[#151E33] hover:bg-[#1C2742] text-[#A7B2C8] hover:text-[#F3F5FC] border border-[#26334B] rounded-lg transition-colors cursor-pointer text-center font-medium"
            >
              Alumni
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill('ADMIN')}
              className="text-[11px] py-1.5 px-2 bg-[#151E33] hover:bg-[#1C2742] text-[#A7B2C8] hover:text-[#F3F5FC] border border-[#26334B] rounded-lg transition-colors cursor-pointer text-center font-medium"
            >
              Admin
            </button>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-[#FF7185]/10 border border-[#FF7185]/30 rounded-xl flex items-center gap-2 text-xs text-[#FF7185]">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="e.g. name@university.edu"
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[#7F8BA3] hover:text-[#F3F5FC] p-1 cursor-pointer"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full mt-2"
            isLoading={isLoading}
            icon={LogIn}
          >
            Sign In
          </Button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-xs text-[#7F8BA3] mt-6">
          Don't have an account yet?{' '}
          <Link to="/register" className="text-[#8B7CFF] hover:underline font-medium">
            Join network
          </Link>
        </p>
      </div>
    </div>
  );
};
