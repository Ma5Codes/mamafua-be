import React, { useState } from 'react';
import { Package } from 'lucide-react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthLayout = ({ onAuthSuccess }) => {
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (formData) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      console.log('Login data:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful login
      onAuthSuccess('dashboard');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (formData) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      console.log('Signup data:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful signup
      onAuthSuccess('dashboard');
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <Package className="w-7 h-7 text-white" />
            </div>
            <span className="ml-3 text-2xl font-bold text-gray-900">WashCycle</span>
          </div>
          
          {/* Navigation Links */}
          <nav className="flex justify-center space-x-8 text-sm text-gray-600 mb-8">
            <a href="#" className="hover:text-blue-600 transition-colors">Home</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Services</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
          </nav>
          
          {/* Auth Mode Toggle */}
          <div className="flex justify-center space-x-1 mb-8">
            <button
              onClick={() => setAuthMode('login')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                authMode === 'login'
                  ? 'bg-blue-600 text-white'
                  : 'text-blue-600 hover:bg-blue-50'
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => setAuthMode('signup')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                authMode === 'signup'
                  ? 'bg-blue-600 text-white'
                  : 'text-blue-600 hover:bg-blue-50'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Animated Form Toggle */}
          <div className="relative overflow-hidden">
            <div 
              className={`transition-transform duration-300 ease-in-out ${
                authMode === 'login' ? 'transform translate-x-0' : 'transform -translate-x-full'
              }`}
            >
              {authMode === 'login' && (
                <LoginForm
                  onSubmit={handleLogin}
                  onToggleToSignup={() => setAuthMode('signup')}
                  isLoading={isLoading}
                />
              )}
            </div>
            
            <div 
              className={`absolute top-0 left-0 w-full transition-transform duration-300 ease-in-out ${
                authMode === 'signup' ? 'transform translate-x-0' : 'transform translate-x-full'
              }`}
            >
              {authMode === 'signup' && (
                <SignupForm
                  onSubmit={handleSignup}
                  onToggleToLogin={() => setAuthMode('login')}
                  isLoading={isLoading}
                />
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            By continuing, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
