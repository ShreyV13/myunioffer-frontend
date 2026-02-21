import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { 
  GraduationCap, 
  CheckCircle, 
  ArrowRight,
  Loader2,
  XCircle
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'https://uniprep-backend-dtlq.onrender.com';

export default function Success() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [planName, setPlanName] = useState('');
  const { currentUser, updateUserPlan } = useAuth();

  useEffect(() => {
    async function verifyPayment() {
      const sessionId = searchParams.get('session_id');
      
      if (!sessionId) {
        setStatus('error');
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/verify-payment`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId })
        });

        const data = await res.json();

        if (data.success) {
          // Update local user plan
          if (currentUser && data.plan) {
            await updateUserPlan(currentUser.uid, data.plan);
          }
          
          setPlanName(data.plan_name || data.plan);
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch (err) {
        console.error('Failed to verify payment:', err);
        setStatus('error');
      }
    }

    verifyPayment();
  }, [searchParams, currentUser]);

  return (
    <div className="min-h-screen bg-[#f9e5df] flex flex-col items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md text-center"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shadow-lg shadow-coral-500/20">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-display font-bold">
            myuni<span className="text-coral-500">offer</span><span className="text-gray-400">.ai</span>
          </span>
        </Link>

        {/* Card */}
        <div className="card p-8">
          {status === 'loading' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-8"
            >
              <Loader2 className="w-16 h-16 text-coral-500 mx-auto mb-4 animate-spin" />
              <h2 className="text-xl font-display font-bold text-gray-900 mb-2">Processing...</h2>
              <p className="text-gray-500">Verifying your payment</p>
            </motion.div>
          )}

          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">
                Welcome to {planName || 'Premium'}!
              </h2>
              <p className="text-gray-600 mb-8">
                Your subscription is now active. You have access to all the features included in your plan.
              </p>
              <Link to="/chat" className="btn-primary w-full py-4">
                Start Coaching
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-10 h-10 text-red-600" />
              </div>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">
                Something went wrong
              </h2>
              <p className="text-gray-600 mb-8">
                We couldn't verify your payment. If you were charged, please contact support and we'll sort it out.
              </p>
              <div className="space-y-3">
                <Link to="/chat" className="btn-primary w-full py-4">
                  Go to Chat
                </Link>
                <Link to="/pricing" className="btn-secondary w-full py-4">
                  Try Again
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
