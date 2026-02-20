import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { 
  GraduationCap, 
  Check, 
  ArrowLeft,
  Crown,
  Sparkles,
  Zap
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'https://uniprep-backend-dtlq.onrender.com';

export default function Pricing() {
  const { currentUser, userProfile } = useAuth();
  const [loading, setLoading] = useState(null);

  const plans = [
    {
      id: 'ps',
      name: 'Personal Statement',
      price: '11.99',
      originalPrice: '14.99',
      description: 'Perfect your statement',
      icon: Sparkles,
      features: [
        '50 messages per day',
        'All subjects',
        'Advanced PS coaching',
        '1000+ resources',
        'Email support'
      ],
      color: 'coral'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '16.99',
      originalPrice: '19.99',
      description: 'PS + Interview prep',
      icon: Crown,
      features: [
        '200 messages per day',
        'PS + Interview coaching',
        'All subjects',
        '1000+ resources',
        'Priority support'
      ],
      color: 'amber',
      popular: true
    },
    {
      id: 'interview',
      name: 'Interview Prep',
      price: '11.99',
      originalPrice: '14.99',
      description: 'Ace your interviews',
      icon: Zap,
      features: [
        '50 messages per day',
        'All subjects',
        '1000+ resources',
        'Interview coaching',
        'Email support'
      ],
      color: 'blue'
    }
  ];

  async function handleSubscribe(planId) {
    if (!currentUser) {
      window.location.href = '/signup';
      return;
    }

    setLoading(planId);

    try {
      const res = await fetch(`${API_BASE}/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: currentUser.uid,
          user_email: currentUser.email,
          plan_id: planId,
          success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: window.location.href
        })
      });

      const data = await res.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('No checkout URL returned');
      }
    } catch (err) {
      console.error('Failed to create checkout session:', err);
    }

    setLoading(null);
  }

  const isCurrentPlan = (planId) => userProfile?.plan === planId;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="glass border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link 
            to={currentUser ? "/chat" : "/"} 
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </Link>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 gradient-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-display font-bold hidden sm:inline">
              myuni<span className="text-coral-500">offer</span><span className="text-gray-400">.ai</span>
            </span>
          </Link>
          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            Choose your plan
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Start free with 3 messages per day, or upgrade for more features and unlimited coaching. Application season discount active.
          </p>
        </motion.div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            const isCurrent = isCurrentPlan(plan.id);
            
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`card p-8 relative ${
                  plan.popular 
                    ? 'border-2 border-coral-500 shadow-xl shadow-coral-500/10' 
                    : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-primary text-white text-xs font-semibold px-4 py-1 rounded-full">
                    Best Value
                  </div>
                )}

                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  plan.popular ? 'gradient-primary' : 'bg-gray-100'
                }`}>
                  <Icon className={`w-6 h-6 ${plan.popular ? 'text-white' : 'text-gray-600'}`} />
                </div>

                <h3 className="text-xl font-display font-bold text-gray-900 mb-1">{plan.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-display font-bold text-gray-900">£{plan.price}</span>
                  <span className="text-gray-500">/month</span>
                  {plan.originalPrice && (
                    <span className="text-sm text-gray-400 line-through ml-2">£{plan.originalPrice}</span>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-gray-600">
                      <Check className={`w-5 h-5 flex-shrink-0 ${plan.popular ? 'text-coral-500' : 'text-green-500'}`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {isCurrent ? (
                  <button
                    disabled
                    className="w-full py-3 rounded-xl font-semibold bg-gray-100 text-gray-500 cursor-not-allowed"
                  >
                    Current Plan
                  </button>
                ) : (
                  <button
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={loading === plan.id}
                    className={`w-full py-3 rounded-xl font-semibold transition-all ${
                      plan.popular
                        ? 'btn-primary'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    {loading === plan.id ? 'Loading...' : 'Get Started'}
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Free tier reminder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <p className="text-gray-500">
            Not ready to commit?{' '}
            <Link to={currentUser ? "/chat" : "/signup"} className="text-coral-600 font-semibold hover:text-coral-700">
              Continue with Free
            </Link>
            {' '}— 3 messages per day, no credit card required.
          </p>
        </motion.div>
      </main>
    </div>
  );
}
