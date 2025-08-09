
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Shield } from 'lucide-react';
import MobileLayout from './MobileLayout';
import MobileCard from './MobileCard';
import MobileButton from './MobileButton';

interface LoginFormProps {
  role: 'student' | 'admin';
  onLogin: (role: 'student' | 'admin', name: string) => void;
  onBack: () => void;
}

const LoginForm = ({ role, onLogin, onBack }: LoginFormProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rollNumber: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(role, formData.name || 'Demo User');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <MobileCard className="bg-white/95 backdrop-blur shadow-2xl" padding="lg">
          <div className="text-center mb-6">
            <MobileButton
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="self-start mb-4"
            >
              ← Back
            </MobileButton>
            
            <div className={`mx-auto p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 ${
              role === 'student' 
                ? 'warm-gradient-peach' 
                : 'warm-gradient-coral'
            }`}>
              {role === 'student' ? (
                <User className="h-8 w-8 text-white" />
              ) : (
                <Shield className="h-8 w-8 text-white" />
              )}
            </div>
            
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {isSignUp ? 'Sign Up' : 'Login'} as {role === 'student' ? 'Student' : 'Admin'}
            </h1>
            <p className="text-base text-gray-600">
              {isSignUp 
                ? `Create your ${role} account` 
                : `Welcome back! Please enter your credentials`
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-medium">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="mobile-tap-target text-base h-12 rounded-xl"
                  required
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="mobile-tap-target text-base h-12 rounded-xl"
                required
              />
            </div>

            {isSignUp && role === 'student' && (
              <div className="space-y-2">
                <Label htmlFor="rollNumber" className="text-base font-medium">Roll Number</Label>
                <Input
                  id="rollNumber"
                  type="text"
                  placeholder="Enter your roll number"
                  value={formData.rollNumber}
                  onChange={(e) => handleInputChange('rollNumber', e.target.value)}
                  className="mobile-tap-target text-base h-12 rounded-xl"
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password" className="text-base font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="mobile-tap-target text-base h-12 rounded-xl"
                required
              />
            </div>

            <MobileButton 
              variant={role === 'student' ? 'secondary' : 'primary'}
              size="lg"
              fullWidth
            >
              {isSignUp ? 'Create Account' : 'Login'}
            </MobileButton>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-base text-gray-600 hover:text-gray-800 underline mobile-tap-target p-2"
            >
              {isSignUp 
                ? 'Already have an account? Login here' 
                : "Don't have an account? Sign up here"
              }
            </button>
          </div>
        </MobileCard>
      </div>
    </div>
  );
};

export default LoginForm;
