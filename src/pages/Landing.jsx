import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  MessageSquare, 
  Sparkles,
  Check,
  ChevronDown,
  Star,
  ArrowRight,
  Menu,
  X,
  Brain,
  Target,
  Users,
  Zap,
  Stethoscope,
  Code,
  TrendingUp,
  BookOpen,
  Palette,
  Gift,
  CalendarCheck
} from 'lucide-react';

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const features = [
    {
      icon: Brain,
      title: "AI That Guides, Not Writes",
      description: "Our AI asks the right questions to help you discover your authentic story. Your statement stays genuinely yours."
    },
    {
      icon: Target,
      title: "1000+ Resources",
      description: "Access real interview questions, sample answers, and successful personal statements from Oxford, Cambridge, and top UK universities."
    },
    {
      icon: Users,
      title: "Subject-Specific Coaching",
      description: "Tailored guidance for Medicine, STEM, Economics, Humanities, and Arts — each backed by a real student specialist."
    },
    {
      icon: Zap,
      title: "Instant Expert Feedback",
      description: "Get thoughtful guidance anytime, day or night. No waiting for appointments or tutors — start immediately."
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Choose your subject",
      description: "Medicine, STEM, Economics, Humanities, or Arts — pick your area and get matched with a specialist AI coach."
    },
    {
      number: "2",
      title: "Chat with your coach",
      description: "The AI asks thoughtful questions to help you discover your authentic story. It guides — it never writes for you."
    },
    {
      number: "3",
      title: "Stand out & get in",
      description: "Build a personal statement and interview confidence that shows the real you to admissions tutors."
    }
  ];

  const coaches = [
    { icon: Stethoscope, subject: "Medicine", detail: "Healthcare, Dentistry, Veterinary", status: "Specialist" },
    { icon: Code, subject: "STEM", detail: "Comp Sci, Engineering, Maths, Physics", status: "Specialist" },
    { icon: TrendingUp, subject: "Economics", detail: "Economics, Finance, Business, PPE", status: "Specialist" },
    { icon: BookOpen, subject: "Humanities", detail: "History, Law, English, Psychology", status: "Specialist" },
    { icon: Palette, subject: "Arts", detail: "Architecture, Art, Music, Design", status: "Coming Soon" },
  ];

  const plans = [
    { 
      name: 'Free', 
      price: '0',
      originalPrice: null,
      desc: 'Try it out',
      features: ['3 messages per day', 'All subjects', 'Basic coaching'],
      cta: 'Get Started',
      featured: false
    },
    { 
      name: 'Personal Statement', 
      price: '11.99',
      originalPrice: '14.99',
      desc: 'Perfect your statement',
      features: ['50 messages per day', 'All subjects', 'Advanced PS coaching', '1000+ resources'],
      cta: 'Start Now',
      featured: false
    },
    { 
      name: 'Premium', 
      price: '16.99',
      originalPrice: '19.99',
      desc: 'PS + Interview prep',
      features: ['200 messages per day', 'PS + Interview coaching', 'All subjects', '1000+ resources', 'Priority support'],
      cta: 'Go Premium',
      featured: true
    },
    { 
      name: 'Interview Prep', 
      price: '11.99',
      originalPrice: '14.99',
      desc: 'Ace your interviews',
      features: ['50 messages per day', 'All subjects', '1000+ resources', 'Interview coaching'],
      cta: 'Start Now',
      featured: false
    },
  ];

  const faqs = [
    {
      q: "Will the AI write my personal statement for me?",
      a: "No. We believe your statement should be authentically yours. Our AI coaches ask thoughtful questions to help you discover and articulate your own story. We guide your thinking — we never write for you."
    },
    {
      q: "How is this different from ChatGPT?",
      a: "Our AI is specifically built for UK university applications. It knows what admissions tutors look for, understands UCAS requirements, and has access to 1000+ real interview questions, sample answers, and successful personal statements — not generic advice."
    },
    {
      q: "What subjects do you cover?",
      a: "We have specialist AI coaches for Medicine & Healthcare, STEM (Maths, Physics, Computer Science, Engineering), Economics & Business (including PPE), Humanities (History, Law, English, Psychology), and Arts (Architecture, Art, Music, Design)."
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes, absolutely. There are no contracts or commitments. You can cancel your subscription at any time and continue using the service until the end of your billing period."
    },
    {
      q: "Who are the specialist coaches?",
      a: "Our coaches are current students at top UK universities (LSE, KCL, Oxford, Cambridge and more) who successfully went through the same application process. They help train the AI for their subject area and offer optional 1-on-1 sessions."
    },
    {
      q: "What are 1-on-1 sessions?",
      a: "You can book a personal session with a real student specialist from your chosen subject area for tailored PS feedback or mock interview practice. Sessions are £19.99 each, or subscribe for 3 months and get a free session included."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-lg shadow-coral-500/20">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-display font-bold">
                myuni<span className="text-coral-500">offer</span><span className="text-gray-400">.ai</span>
              </span>
            </Link>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-gray-600 hover:text-coral-500 transition-colors font-medium">How It Works</a>
              <a href="#coaches" className="text-gray-600 hover:text-coral-500 transition-colors font-medium">Coaches</a>
              <a href="#pricing" className="text-gray-600 hover:text-coral-500 transition-colors font-medium">Pricing</a>
              <a href="#faq" className="text-gray-600 hover:text-coral-500 transition-colors font-medium">FAQ</a>
              <Link to="/login" className="text-gray-600 hover:text-coral-500 transition-colors font-medium">Login</Link>
              <Link to="/signup" className="btn-primary">
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="md:hidden pt-4 pb-2 border-t border-gray-100 mt-4"
            >
              <div className="flex flex-col gap-3">
                <a href="#how-it-works" className="text-gray-600 py-2 font-medium" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
                <a href="#coaches" className="text-gray-600 py-2 font-medium" onClick={() => setMobileMenuOpen(false)}>Coaches</a>
                <a href="#pricing" className="text-gray-600 py-2 font-medium" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
                <a href="#faq" className="text-gray-600 py-2 font-medium" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
                <Link to="/login" className="text-gray-600 py-2 font-medium">Login</Link>
                <Link to="/signup" className="btn-primary mt-2">
                  Get Started
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 hero-pattern">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-coral-50 border border-coral-100 rounded-full text-coral-600 font-medium text-sm mb-8">
              <Sparkles className="w-4 h-4" />
              AI-Powered Application Coaching
            </div>
          </motion.div>

          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] mb-6 text-gray-900"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Get into your{' '}
            <span className="gradient-text">dream university</span>
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Personal statement coaching and interview preparation powered by AI. 
            Guided by real students from top UK universities.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to="/signup" className="btn-primary text-lg px-8 py-4">
              Start Free <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="#how-it-works" className="btn-secondary text-lg px-8 py-4">
              See How It Works
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 mt-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-center px-8 py-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-3xl md:text-4xl font-display font-bold text-coral-500">1000+</div>
              <div className="text-gray-500 text-sm mt-1">Personal statements, interview questions & sample answers</div>
            </div>
            <div className="text-center px-8 py-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-3xl md:text-4xl font-display font-bold text-coral-500">5</div>
              <div className="text-gray-500 text-sm mt-1">Subject specialist AI agents</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900">How it works</h2>
            <p className="text-gray-600">Three steps to a standout application</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                className="card card-hover p-8 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mx-auto mb-5">
                  <span className="text-white font-display font-bold text-lg">{step.number}</span>
                </div>
                <h3 className="text-xl font-display font-bold mb-2 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900">Why students choose us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Everything you need to craft a standout application</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div 
                  key={i}
                  className="card card-hover p-8"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Coaches */}
      <section id="coaches" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900">Meet your specialist coaches</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Real students from top UK universities backing each subject area</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {coaches.map((coach, i) => {
              const Icon = coach.icon;
              return (
                <motion.div 
                  key={i}
                  className="card card-hover p-6 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-gray-900 mb-1">{coach.subject}</h3>
                  <p className="text-xs text-gray-500 mb-3 leading-relaxed">{coach.detail}</p>
                  <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
                    coach.status === 'Coming Soon' 
                      ? 'bg-gray-100 text-gray-500' 
                      : 'bg-coral-50 text-coral-600'
                  }`}>
                    {coach.status}
                  </span>
                </motion.div>
              );
            })}
          </div>

          <motion.p 
            className="text-center text-gray-500 mt-8 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Each area coached by verified students from LSE, KCL, Cambridge, Imperial, Warwick & more.{' '}
            <a href="mailto:hello@myunioffer.ai" className="text-coral-500 font-semibold hover:text-coral-600 transition-colors">
              Interested in becoming a coach? Get in touch →
            </a>
          </motion.p>
        </div>
      </section>

      {/* Why Us - USPs */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900">Why we're different</h2>
            <p className="text-gray-600">Built by students who just went through it, for students going through it now</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div 
              className="card p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
            >
              <div className="text-3xl mb-4">🎓</div>
              <h3 className="text-lg font-display font-bold text-gray-900 mb-2">The best unis, the right courses</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our team are first-year students at LSE (PPE, Maths with Econ), KCL (Medicine), Cambridge (Computer Science, Economics), Imperial (Engineering), and Warwick (Economics). The best universities in the UK for their respective subjects — training the AI you'll use.
              </p>
            </motion.div>

            <motion.div 
              className="card p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-3xl mb-4">💡</div>
              <h3 className="text-lg font-display font-bold text-gray-900 mb-2">We literally just did this</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We're first-years. We just went through UCAS, personal statements, and interviews months ago. We know exactly what it's like, what we struggled with, and how much we wished we had a mentor available whenever we needed one. That's exactly what this AI is.
              </p>
            </motion.div>

            <motion.div 
              className="card p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-3xl mb-4">🏷️</div>
              <h3 className="text-lg font-display font-bold text-gray-900 mb-2">Premium coaching, fraction of the price</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Other specialist AI tools are either not subject-specific or cost thousands. UniAdmissions charges £6,000–£35,000. Private tutors charge £50–100/hour. We give you a subject-specialist AI coach from £11.99/month. Same quality, 99% less.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900">Simple, transparent pricing</h2>
            <p className="text-gray-600">Start free, upgrade when you're ready. Application season discount active.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {plans.map((plan, i) => (
              <motion.div 
                key={i}
                className={`card p-7 relative ${
                  plan.featured 
                    ? 'border-2 border-coral-500 shadow-xl shadow-coral-500/10' 
                    : ''
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-primary text-white text-xs font-semibold px-4 py-1 rounded-full">
                    Best Value
                  </div>
                )}
                <div className="text-sm font-semibold text-gray-500 mb-2">{plan.name}</div>
                <div className="mb-1">
                  <span className="text-3xl font-display font-bold text-gray-900">£{plan.price}</span>
                  <span className="text-sm font-normal text-gray-500">/mo</span>
                  {plan.originalPrice && (
                    <span className="text-sm text-gray-400 line-through ml-2">£{plan.originalPrice}</span>
                  )}
                </div>
                <div className="text-gray-600 text-sm mb-5">{plan.desc}</div>
                <ul className="space-y-2.5 mb-7">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2.5 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-coral-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/signup"
                  className={`block text-center py-3 rounded-xl font-semibold transition-all ${
                    plan.featured 
                      ? 'btn-primary w-full' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Session Banner */}
          <motion.div 
            className="mt-10 card p-8 flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center flex-shrink-0">
              <CalendarCheck className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-display font-bold text-gray-900 mb-1">1-on-1 Sessions with a Specialist</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Get matched with a real student from your chosen degree area for personalised PS feedback or mock interview practice.
              </p>
              <div className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 bg-amber-50 border border-amber-100 rounded-full text-amber-700 text-xs font-semibold">
                <Gift className="w-3.5 h-3.5" />
                Subscribe for 3 months → get 1 free session in month 3
              </div>
            </div>
            <div className="text-center flex-shrink-0">
              <div className="text-3xl font-display font-bold text-coral-500">£19.99</div>
              <div className="text-gray-500 text-sm">per session</div>
              <Link to="/signup" className="btn-primary mt-3 text-sm px-5 py-2.5">
                Book a Session
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900">Frequently asked questions</h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div 
                key={i}
                className="card overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <button
                  className="w-full p-6 flex items-center justify-between text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {faq.q}
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ml-4 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="px-6 pb-6 text-gray-600 leading-relaxed"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 gradient-primary">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-display font-bold mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to stand out?
          </motion.h2>
          <motion.p 
            className="text-xl text-white/90 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Start crafting an application that shows the real you.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link 
              to="/signup" 
              className="inline-flex items-center gap-2 bg-white text-coral-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-display font-bold">
              myuni<span className="text-coral-500">offer</span><span className="text-gray-400">.ai</span>
            </span>
          </Link>
          <div className="flex gap-8 text-sm text-gray-600">
            <a href="#" className="hover:text-coral-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-coral-500 transition-colors">Terms</a>
            <a href="mailto:hello@myunioffer.ai" className="hover:text-coral-500 transition-colors">Contact</a>
          </div>
          <div className="text-sm text-gray-500">
            © 2026 myunioffer.ai
          </div>
        </div>
      </footer>
    </div>
  );
}
