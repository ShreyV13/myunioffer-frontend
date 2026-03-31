import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
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
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -30]);

  function Counter({ target, suffix = "" }) {
    const ref = useRef(null);
    const [count, setCount] = useState(0);
    const [inView, setInView] = useState(false);
    useEffect(() => {
      const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.5 });
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, []);
    useEffect(() => {
      if (!inView) return;
      const num = parseInt(target.replace(/[^0-9]/g, ''));
      let current = 0;
      const timer = setInterval(() => {
        current += num / 30;
        if (current >= num) { setCount(num); clearInterval(timer); }
        else setCount(Math.floor(current));
      }, 40);
      return () => clearInterval(timer);
    }, [inView, target]);
    return <span ref={ref}>{inView ? count + suffix : "0" + suffix}</span>;
  }

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '0',
      originalPrice: null,
      description: 'Try it out',
      icon: MessageSquare,
      features: [
        '2 messages per day',
        'Subject-specific coaching',
        'Basic PS & interview coaching',
      ],
      notIncluded: [
        'Advanced coaching',
        'Priority support',
        'Detailed responses'
      ],
      color: 'gray',
      popular: false
    },
    {
      id: 'ps',
      name: 'Personal Statement',
      price: '8.99',
      originalPrice: '12.99',
      description: 'Perfect your statement',
      icon: Sparkles,
      features: [
        'Increased daily usage',
        'Subject-specific coaching',
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
      price: '8.99',
      originalPrice: '12.99',
      description: 'Ace your interviews',
      icon: Zap,
      features: [
        'Increased daily usage',
        'Subject-specific coaching',
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
      price: '12.99',
      originalPrice: '16.99',
      description: 'PS + Interview prep',
      icon: Crown,
      features: [
        'Most daily usage',
        'Subject-specific coaching',
        'PS + Interview coaching',
        'Deeper, more detailed responses',
        'Priority support',
        'Longest daily sessions'
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="glass border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link 
            to="/" 
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
              myuni<span className="text-coral-500">offer</span> <span className="text-gray-400">ai</span>
            </span>
          </Link>
          <div className="w-20" />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 relative overflow-hidden">
        <motion.div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-coral-200 rounded-full opacity-[0.06] blur-3xl pointer-events-none"
          style={{ y: useTransform(scrollYProgress, [0, 0.3], [0, -50]) }}
        />
        <motion.div 
          className="absolute top-60 -left-40 w-60 h-60 bg-coral-300 rounded-full opacity-[0.04] blur-3xl pointer-events-none"
          style={{ y: useTransform(scrollYProgress, [0, 0.3], [0, 30]) }}
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-4 relative z-10"
          style={{ y: heroY }}
        >
          <motion.h1 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-4 leading-tight" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            Don't leave your application<br /><span className="gradient-text">to chance.</span>
          </motion.h1>
          <motion.div 
            className="h-0.5 gradient-primary rounded-full mx-auto mt-2 mb-6"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
          <p className="text-gray-600 max-w-xl mx-auto text-lg">
            Thousands of students with perfect grades get rejected every year because their personal statement didn't stand out or their interview fell flat. Preparation is the difference.
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div 
          className="flex flex-wrap justify-center gap-10 py-8 mb-8"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {[
            { num: "120", suffix: "+", label: "students signed up" },
            { num: "1000", suffix: "+", label: "resources" },
            { num: "99", suffix: "%", label: "cheaper than tutoring" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-display font-bold text-coral-500">
                <Counter target={stat.num} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>



        {/* Plans */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            const isCurrent = isCurrentPlan(plan.id);
            
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`card p-7 relative hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${
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

                <h3 className="text-lg font-display font-bold text-gray-900 mb-1">{plan.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{plan.description}</p>

                <div className="mb-5">
                  <span className="text-3xl font-display font-bold text-gray-900">£{plan.price}</span>
                  <span className="text-sm text-gray-500">/mo</span>
                  {plan.originalPrice && (
                    <span className="text-sm text-gray-400 line-through ml-2">£{plan.originalPrice}</span>
                  )}
                </div>

                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-coral-500' : 'text-green-500'}`} />
                      {feature}
                    </li>
                  ))}
                  {plan.notIncluded.map((feature, j) => (
                    <li key={`no-${j}`} className="flex items-start gap-2.5 text-sm text-gray-400">
                      <span className="w-4 h-4 flex-shrink-0 mt-0.5 text-center text-gray-300">✕</span>
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
                ) : !currentUser ? (
                  <Link
                    to="/signup?redirect=pricing"
                    className={`block text-center w-full py-3 rounded-xl font-semibold transition-all ${
                      plan.popular
                        ? 'btn-primary'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    Sign Up to Subscribe
                  </Link>
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
                    {loading === plan.id ? 'Loading...' : plan.id === 'free' ? 'Try Now' : 'Subscribe'}
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* 1-on-1 Sessions Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-2 text-center">1-on-1 Sessions</h2>
          <motion.div className="h-0.5 w-12 gradient-primary rounded-full mx-auto mb-8" initial={{ width: 0 }} whileInView={{ width: 48 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} />
          
          <div className="card p-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center flex-shrink-0">
                <CalendarCheck className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-display font-bold text-gray-900 mb-2">Personal session with a specialist</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Get matched with a real student from your chosen degree area, someone who successfully applied to the same course at a top university. They'll give you personalised PS feedback or run a realistic mock interview, tailored to your specific application.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full text-gray-600 text-xs font-medium">
                    <Check className="w-3.5 h-3.5 text-green-500" /> 60-minute session
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full text-gray-600 text-xs font-medium">
                    <Check className="w-3.5 h-3.5 text-green-500" /> Subject-matched specialist
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full text-gray-600 text-xs font-medium">
                    <Check className="w-3.5 h-3.5 text-green-500" /> PS feedback or mock interview
                  </span>
                </div>
              </div>
              <div className="text-center flex-shrink-0">
                <div className="text-4xl font-display font-bold text-coral-500">£29.99</div>
                <div className="text-gray-500 text-sm mb-3">per session</div>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSeuFh9xiG17oow0iPtCkNAf2w8mzRIp0XsZEqjot-GoOpGnFg/viewform" target="_blank" rel="noopener noreferrer" className="btn-primary text-sm px-6 py-2.5">
                  Book a Session
                </a>
              </div>
            </div>


          </div>
        </motion.div>

        {/* Value Anchoring */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 max-w-2xl mx-auto"
        >
          <div className="relative overflow-hidden rounded-2xl border-2 border-coral-100">
            <div className="absolute inset-0 gradient-primary opacity-[0.04]" />
            <div className="relative z-10 p-8 text-center">
              <p className="text-gray-600 text-sm mb-3">The same level of coaching would cost</p>
              <motion.div 
                className="text-5xl md:text-6xl font-display font-bold text-gray-200 line-through mb-2"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
              >
                £200+/month
              </motion.div>
              <p className="text-gray-600 text-sm mb-5">with a private admissions tutor</p>
              <motion.div 
                className="text-xl font-display font-bold text-gray-900"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                With myunioffer.ai: <span className="gradient-text text-2xl">from £8.99/month</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Comparison to alternatives */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-2 text-center">How we compare</h2>
          <motion.div className="h-0.5 w-12 gradient-primary rounded-full mx-auto mb-8" initial={{ width: 0 }} whileInView={{ width: 48 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} />
          <div className="card overflow-hidden">
            <table className="w-full text-sm" style={{borderCollapse: "separate", borderSpacing: 0}}>
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left p-4 font-semibold text-gray-900"></th>
                  <th className="text-center p-4 font-semibold text-coral-500">myunioffer.ai</th>
                  <th className="text-center p-4 font-semibold text-gray-500">Private tutors</th>
                  <th className="text-center p-4 font-semibold text-gray-500">Premium agencies</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50">
                  <td className="p-4 text-gray-600">PS Coaching</td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-coral-500 mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-gray-400 mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-gray-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="p-4 text-gray-600">Interview Prep</td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-coral-500 mx-auto" /></td>
                  <td className="p-4 text-center text-gray-400">Sometimes</td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-gray-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="p-4 text-gray-600">Subject-specialist</td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-coral-500 mx-auto" /></td>
                  <td className="p-4 text-center text-gray-400">Varies</td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-gray-400 mx-auto" /></td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="p-4 text-gray-600">Available 24/7</td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-coral-500 mx-auto" /></td>
                  <td className="p-4 text-center text-gray-400">No</td>
                  <td className="p-4 text-center text-gray-400">No</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-gray-900">Price</td>
                  <td className="p-4 text-center font-bold text-coral-500">From £8.99/mo</td>
                  <td className="p-4 text-center text-gray-500">£50–100/hr</td>
                  <td className="p-4 text-center text-gray-500">£6,000–35,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Guarantees */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" /> Cancel anytime, no contracts
            </span>
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" /> Secure payment via Stripe
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-green-500" /> Launch pricing, won't last forever
            </span>
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">All payments are processed securely through Stripe. We never see or store your card details. Full refunds available, just email support@myunioffer.com.</p>
        </motion.div>

        {/* Free tier reminder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <p className="text-gray-500 text-lg">
            Not ready to commit?{' '}
            <Link to={currentUser ? "/chat" : "/signup"} className="text-coral-600 font-semibold hover:text-coral-700">
              Continue with Free
            </Link>
            {' '}, 2 messages per day, no credit card required.
          </p>
          <p className="text-gray-400 text-sm mt-4">
            Cancel anytime · Email{' '}
            <a href="mailto:support@myunioffer.com" className="text-coral-500 hover:text-coral-600">support@myunioffer.com</a>
            {' '}for help
          </p>
        </motion.div>
      </main>
    </div>
  );
}
