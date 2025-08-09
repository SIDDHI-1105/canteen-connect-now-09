
import React, { useState } from 'react';
import AuthSystem from '../components/AuthSystem';
import StudentDashboard from '../components/StudentDashboard';
import AdminDashboard from '../components/AdminDashboard';

const Index = () => {
  const [user, setUser] = useState<{ id: string; name: string; type: 'student' | 'staff' | 'admin' } | null>(null);

  const handleLogin = (userType: 'student' | 'staff' | 'admin', userData: { id: string; name: string; type: 'student' | 'staff' | 'admin' }) => {
    setUser(userData);
  };

  const handleLogout = () => {
    // Clear session
    localStorage.removeItem('canteen_session');
    setUser(null);
  };

  // Show authentication system if not logged in
  if (!user) {
    return <AuthSystem onLogin={handleLogin} />;
  }

  // Show appropriate dashboard based on user type
  if (user.type === 'student' || user.type === 'staff') {
    return <StudentDashboard user={{ name: user.name, role: user.type === 'staff' ? 'admin' : 'student' }} onLogout={handleLogout} />;
  }

  if (user.type === 'admin') {
    return <AdminDashboard user={{ name: user.name, role: 'admin' }} onLogout={handleLogout} />;
  }

  return null;
};

export default Index;
