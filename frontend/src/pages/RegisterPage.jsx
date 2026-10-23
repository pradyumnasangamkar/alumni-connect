// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, User, Eye, EyeOff, UserPlus, AlertCircle, Briefcase } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const RegisterPage = ({ onRegister }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('STUDENT'); // 'STUDENT' | 'ALUMNI' (ADMIN explicitly prohibited)
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify and try again.');
      return;
    }

    // Role safety enforcement: strictly ensure only STUDENT or ALUMNI can be registered
    if (role !== 'STUDENT' && role !== 'ALUMNI') {
      setErrorMessage('Invalid account role selected.');
      return;
    }

    setIsLoading(true);

    // Simulate backend Spring Boot registration latency
    setTimeout(() => {
      setIsLoading(false);
      onRegister({
        id: Date.now(),
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

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#151E33] border border-[#26334B] rounded-2xl p-6 sm:p-8 shadow-2xl text-left">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#8B7CFF] to-[#55D6E8] flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(139,124,255,0.3)]">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-[#F3F5FC]">Create an Account</h2>
          <p className="text-xs text-[#A7B2C8] mt-1">
            Join your university's verified alumni & student community
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-[#FF7185]/10 border border-[#FF7185]/30 rounded-xl flex items-center gap-2 text-xs text-[#FF7185]">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Account Role Selector */}
          <div>
            <label className="block text-xs font-medium text-[#A7B2C8] mb-2">
              I am joining as:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('STUDENT')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  role === 'STUDENT'
                    ? 'bg-[#8B7CFF]/15 border-[#8B7CFF] text-[#8B7CFF] shadow-[0_0_15px_rgba(139,124,255,0.2)]'
                    : 'bg-[#10172A] border-[#26334B] text-[#A7B2C8] hover:border-[#3B4D6E]'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Current Student</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('ALUMNI')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  role === 'ALUMNI'
                    ? 'bg-[#55D6E8]/15 border-[#55D6E8] text-[#55D6E8] shadow-[0_0_15px_rgba(85,214,232,0.2)]'
                    : 'bg-[#10172A] border-[#26334B] text-[#A7B2C8] hover:border-[#3B4D6E]'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>University Alumni</span>
              </button>
            </div>
            <p className="text-[11px] text-[#7F8BA3] mt-1.5">
              * Administrative accounts are assigned directly by university governance.
            </p>
          </div>

          <Input
            label="Full Name"
            placeholder="e.g. Sangamesh Patil"
            icon={User}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="e.g. sangamesh@university.edu"
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Minimum 8 characters"
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

          <Input
            label="Confirm Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Re-enter your password"
            icon={Lock}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full mt-2"
            isLoading={isLoading}
            icon={UserPlus}
          >
            Create {role === 'STUDENT' ? 'Student' : 'Alumni'} Account
          </Button>
        </form>

        <p className="text-center text-xs text-[#7F8BA3] mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-[#8B7CFF] hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
