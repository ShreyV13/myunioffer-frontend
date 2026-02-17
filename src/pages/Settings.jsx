import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { 
  GraduationCap, 
  ArrowLeft, 
  User, 
  Mail, 
  CreditCard, 
  Crown,
  Sparkles,
  LogOut,
  ExternalLink
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'https://uniprep-backend-dtlq.onrender.com';

export default function Settings() {
  const { currentUser, userProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [loadingPortal, setLoadingPortal] = useState(false);

  const planDetails = {
    free: { name: 'Free', messages: 3, features: ['Basic PS coaching', 'All subjects'] },
    ps: { name: 'Personal Statement', messages: 50, features: ['Advanced PS coaching', 'Example statements', 'Priority support'] },
    interview: { name: 'Interview Prep', messages: 50, features: ['250+ real questions', 'Answer frameworks', 'Mock interviews'] },
    premium: { name: 'Premium', messages: 200, features: ['Everything in PS + Interview', 'Unlimited subjects', 'Priority support'] }
  };

  const currentPlan = planDetails[userProfile?.plan || 'free'];

  async function handleManageSubscription() {
    setLoadingPortal(true);
    try {
      const res = await fetch(`${API_BASE}/create-portal-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: currentUser.uid,
          return_url: window.location.href
        })
      });
      
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Failed to open billing portal:', err);
    }
    setLoadingPortal(false);
  }

  async function handleLogout() {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error('Failed to logout:', err);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="glass border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link to="/chat" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Chat</span>
          </Link>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 gradient-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-display font-bold text-gray-900 mb-8">Settings</h1>

          {/* Account */}
          <div className="card p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-gray-400" />
              Account
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Name</label>
                <div className="text-gray-900 font-medium">{userProfile?.displayName || 'Not set'}</div>
              </div>
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <div className="text-gray-900 font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  {currentUser?.email}
                </div>
              </div>
            </div>
          </div>

          {/* Subscription */}
          <div className="card p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-gray-400" />
              Subscription
            </h2>
            
            <div className="flex items-center gap-3 mb-4">
              {userProfile?.plan === 'premium' && <Crown className="w-5 h-5 text-amber-500" />}
              <span className="text-xl font-bold text-gray-900">{currentPlan.name}</span>
              {userProfile?.plan !== 'free' && (
                <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">Active</span>
              )}
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <div className="text-sm text-gray-600 mb-2">
                <strong>{currentPlan.messages}</strong> messages per day
              </div>
              <ul className="text-sm text-gray-500 space-y-1">
                {currentPlan.features.map((f, i) => (
                  <li key={i}>• {f}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {userProfile?.plan === 'free' ? (
                <Link to="/pricing" className="btn-primary flex-1 justify-center">
                  <Sparkles className="w-4 h-4" />
                  Upgrade Plan
                </Link>
              ) : (
                <button
                  onClick={handleManageSubscription}
                  disabled={loadingPortal}
                  className="btn-secondary flex-1 justify-center"
                >
                  {loadingPortal ? 'Loading...' : 'Manage Subscription'}
                  <ExternalLink className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="card p-6 border-red-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h2>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
            >
              <LogOut className="w-5 h-5" />
              Sign out
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
