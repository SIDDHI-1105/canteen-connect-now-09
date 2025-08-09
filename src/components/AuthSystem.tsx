import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Shield, ArrowRight, Lock, Key } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface AuthSystemProps {
  onLogin: (userType: 'student' | 'staff' | 'admin', userData: { id: string; name: string; type: 'student' | 'staff' | 'admin' }) => void;
}

interface UserData {
  id: string;
  name: string;
  type: 'student' | 'staff' | 'admin';
  pin: string;
}

const AuthSystem = ({ onLogin }: AuthSystemProps) => {
  const [currentView, setCurrentView] = useState<'select' | 'login' | 'register' | 'set-pin'>('select');
  const [userType, setUserType] = useState<'student' | 'staff' | 'admin'>('student');
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    pin: ''
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [tempUserData, setTempUserData] = useState<Partial<UserData>>({});
  const { toast } = useToast();

  // Simulate user database (in real app, this would be backend/Supabase)
  const [users, setUsers] = useState<UserData[]>([
    { id: 'STU001', name: 'Rahul Sharma', type: 'student', pin: '1234' },
    { id: 'EMP001', name: 'Dr. Priya Patel', type: 'staff', pin: '5678' },
    { id: 'ADM001', name: 'Admin User', type: 'admin', pin: '9999' },
  ]);

  useEffect(() => {
    // Check for existing session
    const savedSession = localStorage.getItem('canteen_session');
    if (savedSession) {
      const sessionData = JSON.parse(savedSession);
      onLogin(sessionData.type, sessionData);
    }
  }, [onLogin]);

  const validateId = (id: string, type: 'student' | 'staff' | 'admin') => {
    if (type === 'student') {
      return /^STU\d{3,}$/.test(id) || /^\d{6,}$/.test(id); // Format: STU001 or 202301
    } else if (type === 'staff') {
      return /^EMP\d{3,}$/.test(id) || /^[A-Z]{2}\d{3,}$/.test(id); // Format: EMP001 or TC001
    } else if (type === 'admin') {
      return /^ADM\d{3,}$/.test(id) || /^ADMIN\d{3,}$/.test(id); // Format: ADM001 or ADMIN001
    }
    return false;
  };

  const findUser = (id: string, type: 'student' | 'staff' | 'admin') => {
    return users.find(user => user.id === id && user.type === type);
  };

  const handleLogin = () => {
    if (!formData.id || !formData.pin) {
      toast({
        title: "Missing Information",
        description: "Please enter both ID and PIN",
        variant: "destructive",
      });
      return;
    }

    if (formData.pin.length !== 4) {
      toast({
        title: "Invalid PIN",
        description: "PIN must be exactly 4 digits",
        variant: "destructive",
      });
      return;
    }

    const user = findUser(formData.id, userType);
    if (!user) {
      toast({
        title: "Login Failed",
        description: "Invalid ID. Please check your credentials.",
        variant: "destructive",
      });
      return;
    }

    if (user.pin !== formData.pin) {
      toast({
        title: "Login Failed",
        description: "Invalid PIN. Please check your credentials.",
        variant: "destructive",
      });
      return;
    }

    // Create session
    const sessionData = { id: user.id, name: user.name, type: user.type };
    localStorage.setItem('canteen_session', JSON.stringify(sessionData));
    
    toast({
      title: "Login Successful",
      description: `Welcome back, ${user.name}!`,
    });

    onLogin(user.type, sessionData);
  };

  const handleRegistration = () => {
    if (!formData.id || !formData.name) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    if (!validateId(formData.id, userType)) {
      toast({
        title: "Invalid ID Format",
        description: userType === 'student' 
          ? "Student ID should be in format STU001 or roll number (6+ digits)"
          : userType === 'staff'
          ? "Employee ID should be in format EMP001 or department code"
          : "Admin ID should be in format ADM001 or ADMIN001",
        variant: "destructive",
      });
      return;
    }

    if (findUser(formData.id, userType)) {
      toast({
        title: "ID Already Exists",
        description: "This ID is already registered. Please login instead.",
        variant: "destructive",
      });
      return;
    }

    setTempUserData({
      id: formData.id,
      name: formData.name,
      type: userType
    });
    setCurrentView('set-pin');
  };

  const handleSetPin = () => {
    if (formData.pin.length !== 4 || !/^\d{4}$/.test(formData.pin)) {
      toast({
        title: "Invalid PIN",
        description: "PIN must be exactly 4 digits",
        variant: "destructive",
      });
      return;
    }

    const newUser: UserData = {
      ...tempUserData as UserData,
      pin: formData.pin
    };

    setUsers(prev => [...prev, newUser]);
    
    // Auto login after registration
    const sessionData = { id: newUser.id, name: newUser.name, type: newUser.type };
    localStorage.setItem('canteen_session', JSON.stringify(sessionData));
    
    toast({
      title: "Registration Successful",
      description: `Welcome, ${newUser.name}! You are now logged in.`,
    });

    onLogin(newUser.type, sessionData);
  };

  const resetForm = () => {
    setFormData({ id: '', name: '', pin: '' });
    setTempUserData({});
  };

  // User Type Selection View
  if (currentView === 'select') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">College Canteen</h1>
            <p className="text-gray-600">Choose your account type to continue</p>
          </div>

          <div className="space-y-4">
            <Card 
              className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-orange-200"
              onClick={() => {
                setUserType('student');
                setCurrentView('login');
                resetForm();
              }}
            >
              <CardHeader className="text-center pb-3">
                <div className="mx-auto p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 warm-gradient-peach">
                  <User className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Student Login</CardTitle>
                <CardDescription>Access with your roll number and PIN</CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-orange-200"
              onClick={() => {
                setUserType('staff');
                setCurrentView('login');
                resetForm();
              }}
            >
              <CardHeader className="text-center pb-3">
                <div className="mx-auto p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 warm-gradient-coral">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Staff Login</CardTitle>
                <CardDescription>Access with your employee ID and PIN</CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-red-200"
              onClick={() => {
                setUserType('admin');
                setCurrentView('login');
                resetForm();
              }}
            >
              <CardHeader className="text-center pb-3">
                <div className="mx-auto p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 bg-gradient-to-br from-red-500 to-red-600">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Admin Login</CardTitle>
                <CardDescription>Full system access with admin ID and PIN</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Login View
  if (currentView === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="bg-white/95 backdrop-blur shadow-2xl">
            <CardHeader className="text-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentView('select')}
                className="self-start mb-4"
              >
                ← Back
              </Button>
              
              <div className={`mx-auto p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 ${
                userType === 'student' ? 'warm-gradient-peach' : 
                userType === 'staff' ? 'warm-gradient-coral' : 
                'bg-gradient-to-br from-red-500 to-red-600'
              }`}>
                {userType === 'student' ? <User className="h-8 w-8 text-white" /> : <Shield className="h-8 w-8 text-white" />}
              </div>
              
              <CardTitle className="text-2xl font-bold">
                {userType === 'student' ? 'Student' : userType === 'staff' ? 'Staff' : 'Admin'} Login
              </CardTitle>
              <CardDescription>
                Enter your {userType === 'student' ? 'roll number' : userType === 'staff' ? 'employee ID' : 'admin ID'} and PIN
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="id" className="text-base font-medium">
                  {userType === 'student' ? 'Roll Number' : userType === 'staff' ? 'Employee ID' : 'Admin ID'}
                </Label>
                <Input
                  id="id"
                  type="text"
                  placeholder={userType === 'student' ? 'e.g., STU001 or 202301' : 
                              userType === 'staff' ? 'e.g., EMP001 or TC001' : 
                              'e.g., ADM001 or ADMIN001'}
                  value={formData.id}
                  onChange={(e) => setFormData(prev => ({ ...prev, id: e.target.value.toUpperCase() }))}
                  className="text-base h-12 rounded-xl"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pin" className="text-base font-medium">4-Digit PIN</Label>
                <Input
                  id="pin"
                  type="password"
                  placeholder="Enter your 4-digit PIN"
                  value={formData.pin}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                    setFormData(prev => ({ ...prev, pin: value }));
                  }}
                  className="text-base h-12 rounded-xl text-center text-2xl tracking-widest"
                  maxLength={4}
                  required
                />
              </div>

              <Button 
                onClick={handleLogin}
                className={`w-full h-12 text-base font-medium ${
                  userType === 'student' 
                    ? 'warm-gradient-peach hover:opacity-90' 
                    : userType === 'staff'
                    ? 'warm-gradient-coral hover:opacity-90'
                    : 'bg-gradient-to-br from-red-500 to-red-600 hover:opacity-90'
                } text-white border-0`}
              >
                <Lock className="h-4 w-4 mr-2" />
                Login
              </Button>

              <div className="text-center">
                <button
                  onClick={() => {
                    setCurrentView('register');
                    resetForm();
                  }}
                  className="text-gray-600 hover:text-gray-800 underline text-base"
                >
                  Don't have an account? Register here
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Registration View
  if (currentView === 'register') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="bg-white/95 backdrop-blur shadow-2xl">
            <CardHeader className="text-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentView('login')}
                className="self-start mb-4"
              >
                ← Back to Login
              </Button>
              
              <div className={`mx-auto p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 ${
                userType === 'student' ? 'warm-gradient-peach' : 
                userType === 'staff' ? 'warm-gradient-coral' : 
                'bg-gradient-to-br from-red-500 to-red-600'
              }`}>
                {userType === 'student' ? <User className="h-8 w-8 text-white" /> : <Shield className="h-8 w-8 text-white" />}
              </div>
              
              <CardTitle className="text-2xl font-bold">
                {userType === 'student' ? 'Student' : userType === 'staff' ? 'Staff' : 'Admin'} Registration
              </CardTitle>
              <CardDescription>
                Create your account to start ordering
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-medium">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="text-base h-12 rounded-xl"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="id" className="text-base font-medium">
                  {userType === 'student' ? 'Roll Number' : userType === 'staff' ? 'Employee ID' : 'Admin ID'}
                </Label>
                <Input
                  id="id"
                  type="text"
                  placeholder={userType === 'student' ? 'e.g., STU001 or 202301' : 
                              userType === 'staff' ? 'e.g., EMP001 or TC001' : 
                              'e.g., ADM001 or ADMIN001'}
                  value={formData.id}
                  onChange={(e) => setFormData(prev => ({ ...prev, id: e.target.value.toUpperCase() }))}
                  className="text-base h-12 rounded-xl"
                  required
                />
                <p className="text-sm text-gray-500">
                  {userType === 'student' 
                    ? 'Use format STU001 or your college roll number (6+ digits)'
                    : userType === 'staff'
                    ? 'Use format EMP001 or your department code'
                    : 'Use format ADM001 or ADMIN001 for admin access'
                  }
                </p>
              </div>

              <Button 
                onClick={handleRegistration}
                className={`w-full h-12 text-base font-medium ${
                  userType === 'student' 
                    ? 'warm-gradient-peach hover:opacity-90' 
                    : userType === 'staff'
                    ? 'warm-gradient-coral hover:opacity-90'
                    : 'bg-gradient-to-br from-red-500 to-red-600 hover:opacity-90'
                } text-white border-0`}
              >
                Continue to Set PIN
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Set PIN View
  if (currentView === 'set-pin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="bg-white/95 backdrop-blur shadow-2xl">
            <CardHeader className="text-center">
              <div className={`mx-auto p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 ${
                userType === 'student' ? 'warm-gradient-peach' : 
                userType === 'staff' ? 'warm-gradient-coral' : 
                'bg-gradient-to-br from-red-500 to-red-600'
              }`}>
                <Key className="h-8 w-8 text-white" />
              </div>
              
              <CardTitle className="text-2xl font-bold">Set Your PIN</CardTitle>
              <CardDescription>
                Create a secure 4-digit PIN for future logins
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Account Details:</strong><br/>
                  Name: {tempUserData.name}<br/>
                  ID: {tempUserData.id}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pin" className="text-base font-medium">Create 4-Digit PIN</Label>
                <Input
                  id="pin"
                  type="password"
                  placeholder="Enter 4-digit PIN"
                  value={formData.pin}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                    setFormData(prev => ({ ...prev, pin: value }));
                  }}
                  className="text-base h-12 rounded-xl text-center text-2xl tracking-widest"
                  maxLength={4}
                  required
                />
                <p className="text-sm text-gray-500">
                  Choose a PIN you'll remember. You'll need this to login every time.
                </p>
              </div>

              <Button 
                onClick={handleSetPin}
                disabled={formData.pin.length !== 4}
                className={`w-full h-12 text-base font-medium ${
                  userType === 'student' 
                    ? 'warm-gradient-peach hover:opacity-90' 
                    : userType === 'staff'
                    ? 'warm-gradient-coral hover:opacity-90'
                    : 'bg-gradient-to-br from-red-500 to-red-600 hover:opacity-90'
                } text-white border-0 disabled:opacity-50`}
              >
                <Key className="h-4 w-4 mr-2" />
                Complete Registration
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
};

export default AuthSystem;