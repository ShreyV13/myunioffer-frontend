import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { 
  GraduationCap, 
  Check, 
  ArrowLeft,
  ArrowRight,
  Crown,
  Sparkles,
  Zap,
  CalendarCheck,
  Gift,
  Clock,
  MessageSquare,
  Shield
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'https://uniprep-backend-dtlq.onrender.com';

export default function Pricing() {
  const { currentUser, userProfile } = useAuth();
  const [loading, setLoading] = useState(null);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '0',
      originalPrice: null,
      description: 'Try it out',
      icon: MessageSquare,
      features: [
        '3 messages per day',
        'All 5 subject agents',
        'Basic PS & interview coaching',
      ],
      notIncluded: [
        'Advanced coaching',
        '1-on-1 sessions',
        'Priority support'
      ],
      color: 'gray',
      popular: false
    },
    {
      id: 'ps',
      name: 'Personal Statement',
      price: '11.99',
      originalPrice: '14.99',
      description: 'Perfect your statement',
      icon: Sparkles,
      features: [
        '50 messages per day',
        'All 5 subject agents',
        'Advanced PS coaching',
        '1000+ resources',
        'Email support'
      ],
      notIncluded: [
        'Interview coaching',
        'Priority support'
      ],
      color: 'coral',
      popular: false
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
        'All 5 subject agents',
        'Interview coaching',
        '1000+ resources',
        'Email support'
      ],
      notIncluded: [
        'PS coaching',
        'Priority support'
      ],
      color: 'blue',
      popular: false
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
        'All 5 subject agents',
        'PS + Interview coaching',
        '1000+ resources',
        'Priority support',
        '1 free session after 3 months'
      ],
      notIncluded: [],
      color: 'amber',
      popular: true
    }
  ];

  async function handleSubscribe(planId) {
    if (planId === 'free') {
      window.location.href = '/signup';
      return;
    }
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

  const isCurrentPlan = (planId) => planId !== 'free' && userProfile?.plan === planId;

  return (
    <div className="min-h-screen bg-[#2c2c2c]">
      {/* Header */}
      <header className="glass border-b border-[rgba(255,255,255,0.06)] px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link 
            to={currentUser ? "/chat" : "/"} 
            className="flex items-center gap-2 text-[#bbb] hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </Link>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 gradient-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-display font-bold hidden sm:inline">
              myuni<span className="text-[#f07a62]">offer</span><span className="text-[#999]">.ai</span>
            </span>
          </Link>
          <div className="w-20" />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Don't leave your application to chance
          </h1>
          <p className="text-[#bbb] max-w-xl mx-auto">
            Thousands of students with perfect grades get rejected every year because their personal statement didn't stand out or their interview fell flat. The difference between an offer and a rejection is preparation — and that's exactly what we provide.
          </p>
        </motion.div>

        {/* Launch discount banner */}
        <motion.div 
          className="mb-10 p-4 bg-[rgba(240,122,98,0.1)] border border-[rgba(240,122,98,0.15)] rounded-2xl text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-center gap-2 text-[#f07a62] font-semibold text-sm">
            <Clock className="w-4 h-4" />
            🚀 Launch Discount — lock in early pricing before it increases to £14.99 / £19.99
          </div>
        </motion.div>

        {/* Plans */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            const isCurrent = isCurrentPlan(plan.id);
            
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`card p-7 relative ${
                  plan.popular 
                    ? 'border-2 border-[#f07a62] shadow-xl shadow-[rgba(240,122,98,0.15)]' 
                    : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-primary text-white text-xs font-semibold px-4 py-1 rounded-full">
                    Best Value
                  </div>
                )}

                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  plan.popular ? 'gradient-primary' : 'bg-[rgba(255,255,255,0.06)]'
                }`}>
                  <Icon className={`w-6 h-6 ${plan.popular ? 'text-white' : 'text-[#bbb]'}`} />
                </div>

                <h3 className="text-lg font-display font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-[#999] text-sm mb-4">{plan.description}</p>

                <div className="mb-5">
                  <span className="text-3xl font-display font-bold text-white">£{plan.price}</span>
                  <span className="text-sm text-[#999]">/mo</span>
                  {plan.originalPrice && (
                    <span className="text-sm text-[#999] line-through ml-2">£{plan.originalPrice}</span>
                  )}
                </div>

                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-[#bbb]">
                      <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-[#f07a62]' : 'text-[#5cb85c]'}`} />
                      {feature}
                    </li>
                  ))}
                  {plan.notIncluded.map((feature, j) => (
                    <li key={`no-${j}`} className="flex items-start gap-2.5 text-sm text-[#999]">
                      <span className="w-4 h-4 flex-shrink-0 mt-0.5 text-center">—</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {isCurrent ? (
                  <button
                    disabled
                    className="w-full py-3 rounded-xl font-semibold bg-[rgba(255,255,255,0.06)] text-[#999] cursor-not-allowed"
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
                        : 'bg-[#252525] text-white hover:bg-gray-800'
                    }`}
                  >
                    {loading === plan.id ? 'Loading...' : plan.id === 'free' ? 'Try Now' : 'Subscribe'}
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* 1-on-1 Sessions Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-8 text-center">1-on-1 Sessions</h2>
          
          <div className="card p-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center flex-shrink-0">
                <CalendarCheck className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-display font-bold text-white mb-2">Personal session with a specialist</h3>
                <p className="text-[#bbb] text-sm leading-relaxed mb-4">
                  Get matched with a real student from your chosen degree area — someone who successfully applied to the same course at a top university. They'll give you personalised PS feedback or run a realistic mock interview, tailored to your specific application.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[rgba(255,255,255,0.06)] rounded-full text-[#bbb] text-xs font-medium">
                    <Check className="w-3.5 h-3.5 text-[#5cb85c]" /> 45-minute session
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[rgba(255,255,255,0.06)] rounded-full text-[#bbb] text-xs font-medium">
                    <Check className="w-3.5 h-3.5 text-[#5cb85c]" /> Subject-matched specialist
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[rgba(255,255,255,0.06)] rounded-full text-[#bbb] text-xs font-medium">
                    <Check className="w-3.5 h-3.5 text-[#5cb85c]" /> PS feedback or mock interview
                  </span>
                </div>
              </div>
              <div className="text-center flex-shrink-0">
                <div className="text-4xl font-display font-bold text-[#f07a62]">£19.99</div>
                <div className="text-[#999] text-sm mb-3">per session</div>
                <Link to="/signup" className="btn-primary text-sm px-6 py-2.5">
                  Book a Session
                </Link>
              </div>
            </div>

            {/* Bundle */}
            <div className="mt-8 p-5 bg-[rgba(217,169,60,0.1)] border border-[rgba(217,169,60,0.15)] rounded-xl">
              <div className="flex items-start gap-3">
                <Gift className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white mb-1">3-Month Bundle Perk</h4>
                  <p className="text-sm text-[#bbb] leading-relaxed">
                    Subscribe to any paid plan for 3 consecutive months and get <span className="font-semibold text-white">1 free 1-on-1 session</span> in your third month. That's a free £19.99 session — use it for a final PS review or a pre-interview mock. The AI coaches you daily, the specialist gives you the human edge.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Value Anchoring */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mb-16 max-w-2xl mx-auto"
        >
          <div className="card p-8 text-center bg-[rgba(240,122,98,0.1)] border-[rgba(240,122,98,0.15)]">
            <p className="text-[#bbb] text-sm mb-2">The same level of coaching would cost</p>
            <div className="text-4xl font-display font-bold text-gray-300 line-through mb-1">£200+/month</div>
            <p className="text-[#bbb] text-sm mb-4">with a private admissions tutor</p>
            <div className="text-lg font-display font-bold text-white">
              With myunioffer.ai: <span className="text-[#f07a62]">from £11.99/month</span>
            </div>
          </div>
        </motion.div>

        {/* Comparison to alternatives */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-8 text-center">How we compare</h2>
          <div className="card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.06)]">
                  <th className="text-left p-4 font-semibold text-white"></th>
                  <th className="text-center p-4 font-semibold text-[#f07a62]">myunioffer.ai</th>
                  <th className="text-center p-4 font-semibold text-[#999]">Private tutors</th>
                  <th className="text-center p-4 font-semibold text-[#999]">Premium agencies</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50">
                  <td className="p-4 text-[#bbb]">PS Coaching</td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-[#f07a62] mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-[#999] mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-[#999] mx-auto" /></td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="p-4 text-[#bbb]">Interview Prep</td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-[#f07a62] mx-auto" /></td>
                  <td className="p-4 text-center text-[#999]">Sometimes</td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-[#999] mx-auto" /></td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="p-4 text-[#bbb]">Subject-specialist</td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-[#f07a62] mx-auto" /></td>
                  <td className="p-4 text-center text-[#999]">Varies</td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-[#999] mx-auto" /></td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="p-4 text-[#bbb]">Available 24/7</td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-[#f07a62] mx-auto" /></td>
                  <td className="p-4 text-center text-[#999]">No</td>
                  <td className="p-4 text-center text-[#999]">No</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Price</td>
                  <td className="p-4 text-center font-bold text-[#f07a62]">From £11.99/mo</td>
                  <td className="p-4 text-center text-[#999]">£50–100/hr</td>
                  <td className="p-4 text-center text-[#999]">£6,000–35,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Guarantees */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-[#999]">
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#5cb85c]" /> Cancel anytime, no contracts
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#5cb85c]" /> Launch pricing — won't last forever
            </span>
          </div>
        </motion.div>

        {/* Free tier reminder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <p className="text-[#999]">
            Not ready to commit?{' '}
            <Link to={currentUser ? "/chat" : "/signup"} className="text-[#f07a62] font-semibold hover:text-coral-700">
              Continue with Free
            </Link>
            {' '}— 3 messages per day, no credit card required.
          </p>
        </motion.div>
      </main>
    </div>
  );
}
