
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Shield, Menu, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MobileLayoutProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  onLogout?: () => void;
  userType?: 'student' | 'admin';
  children: React.ReactNode;
}

const MobileLayout = ({ title, subtitle, onBack, onLogout, userType, children }: MobileLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Mobile Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-orange-200 shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1">
              {onBack && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBack}
                  className="p-2 hover:bg-orange-100 mobile-tap-target"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              )}
              
              <div className="flex items-center space-x-2">
                {userType && (
                  <div className={`p-2 rounded-full ${
                    userType === 'student' ? 'warm-gradient-peach' : 'warm-gradient-coral'
                  }`}>
                    {userType === 'student' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Shield className="h-4 w-4 text-white" />
                    )}
                  </div>
                )}
                
                <div className="min-w-0">
                  <h1 className="text-lg font-bold text-gray-800 truncate">{title}</h1>
                  {subtitle && (
                    <p className="text-sm text-gray-600 truncate">{subtitle}</p>
                  )}
                </div>
              </div>
            </div>
            
            {onLogout && (
              <Button 
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="text-sm px-3 py-2 hover:bg-orange-100 mobile-tap-target"
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-4">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-orange-200 shadow-lg">
        <div className="flex justify-around py-2">
          <Link
            to="/"
            className="flex flex-col items-center p-2 text-gray-600 hover:text-orange-600 transition-colors"
          >
            <Home className="h-5 w-5 mb-1" />
            <span className="text-xs">Home</span>
          </Link>
          <Link
            to="/menu"
            className="flex flex-col items-center p-2 text-gray-600 hover:text-orange-600 transition-colors"
          >
            <Menu className="h-5 w-5 mb-1" />
            <span className="text-xs">Menu</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default MobileLayout;
