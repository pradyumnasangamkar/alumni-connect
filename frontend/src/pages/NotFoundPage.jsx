// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="p-4 bg-[#151E33] border border-[#26334B] rounded-2xl text-[#8B7CFF] mb-4">
        <Compass className="w-10 h-10 animate-spin" style={{ animationDuration: '8s' }} />
      </div>
      <h1 className="text-4xl font-extrabold text-[#F3F5FC]">404</h1>
      <h2 className="text-lg font-semibold text-[#A7B2C8] mt-2">Page Not Found</h2>
      <p className="text-xs text-[#7F8BA3] max-w-sm mt-2 mb-6">
        The route you requested does not exist or may have been relocated.
      </p>
      <Link to="/dashboard">
        <Button variant="primary" icon={Home}>
          Return to Dashboard
        </Button>
      </Link>
    </div>
  );
};
