import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

const UnauthorizedPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <ShieldAlert className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Unauthorized Access</h1>
        <p className="text-gray-600 mb-8">
          Sorry, you don't have permission to access this page. Please log in with appropriate credentials.
        </p>
        <div className="space-x-4">
          <Link to="/login" className="btn-primary">
            Login
          </Link>
          <Link to="/" className="btn-secondary">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage; 