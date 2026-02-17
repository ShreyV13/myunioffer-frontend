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
  Zap
} from 'lucide-react';

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const features = [
    {
      icon: Brain,
      title: "AI That Guides, Not Writes",
      description: "Our AI asks the right questions to help you discover your authentic story. Your statement stays yours."
    },
    {
      icon: Target,
      title: "1000+ Resources",
      description: "Access interview questions, sample answers, and personal statements from Oxford, Cambridge, and top UK universities."
    },
    {
      icon: Users,
      title: "Subject-Specific Coaching",
      description: "Tailored guidance for Medicine, STEM, Economics, Humanities, Arts and more."
    },
    {
      icon: Zap,
      title: "Instant Expert Feedback",
      description: "Get thoughtful guidance anytime, no waiting for appointments or tutors."
    }
  ];

  const plans = [
    { 
      name: 'Free', 
      price: 0, 
      desc: 'Try it out',
      features: ['3 messages per day', 'All subjects', 'Basic coaching'],
      cta: 'Get Started',
      featured: false
    },
    { 
      name: 'Personal Statement', 
      price: 19, 
      desc: 'Perfect your statement',
      features: ['50 messages per day', 'All subjects', 'Advanced PS coaching', 'Sample statements'],
      cta: 'Start Now',
      featured: false
    },
    { 
      name: 'Premium', 
      price: 39, 
      desc: 'Complete preparation',
      features: ['200 messages per day', 'PS + Interview prep', '1000+ resources', 'Priority support'],
      cta: 'Go Premium',
      featured: true
    },
  ];

  const testimonials = [
    { 
      text: "The AI asked exactly the questions I needed to think about. My personal statement went from generic to genuinely personal.", 
      name: "Sarah K.", 
      school: "Cambridge Medicine",
      rating: 5
    },
    { 
      text: "Interview practice felt so real. When I got to the actual interview, I'd already thought through most of the questions.", 
      name: "James L.", 
      school: "Oxford PPE",
      rating: 5
    },
    { 
      text: "Finally, something that helps you think instead of just writing for you. My statement sounds like ME now.", 
      name: "Priya M.", 
      school: "Imperial CS",
      rating: 5
    }
  ];

  const faqs = [
    {
      q: "Will the AI write my personal statement for me?",
      a: "No. We believe your statement should be authentically yours. Our AI coaches ask thoughtful questions to help you discover and articulate your own story. We guide your thinking — we never write for you."
    },
    {
      q: "What resources do you have?",
      a: "We have over 1000 resources including real interview questions, sample answers, and successful personal statements from Oxford, Cambridge, and other top UK universities."
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes, absolutely. There are no contracts or commitments. You can cancel your subscription at any time and continue using the service until the end of your billing period."
    },
    {
      q: "What subjects do you cover?",
      a: "We have specialist AI coaches for Medicine & Healthcare, STEM (Maths, Physics, Computer Science, Engineering), Economics & Business, Humanities (History, Law, English, Philosophy, PPE), Arts (Art, Music, Architecture), and many more."
    },
    {
      q: "How is this different from ChatGPT?",
      a: "Our AI is specifically trained for UK university applications. It knows what admissions tutors look for, understands UCAS requirements, and has access to over 1000 interview questions, sample answers, and successful personal statements."
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
              <a href="#features" className="text-gray-600 hover:text-coral-500 transition-colors font-medium">Features</a>
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
                <a href="#features" className="text-gray-600 py-2 font-medium" onClick={() => setMobileMenuOpen(false)}>Features</a>
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
            Expert guidance, real questions, authentic results.
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
            <a href="#features" className="btn-secondary text-lg px-8 py-4">
              See How It Works
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="flex justify-center mt-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-center px-8 py-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-3xl md:text-4xl font-display font-bold text-coral-500">1000+</div>
              <div className="text-gray-500 text-sm mt-1">Interview questions, sample answers & personal statements</div>
            </div>
          </motion.div>
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
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900">Why students love us</h2>
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

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900">Simple, transparent pricing</h2>
            <p className="text-gray-600">Start free, upgrade when you're ready</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <motion.div 
                key={i}
                className={`card p-8 relative ${
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
                    Most Popular
                  </div>
                )}
                <div className="text-sm font-semibold text-gray-500 mb-2">{plan.name}</div>
                <div className="text-4xl font-display font-bold mb-1 text-gray-900">
                  £{plan.price}<span className="text-base font-normal text-gray-500">/mo</span>
                </div>
                <div className="text-gray-600 text-sm mb-6">{plan.desc}</div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-gray-600">
                      <Check className="w-5 h-5 text-coral-500 flex-shrink-0" />
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
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900">What students say</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div 
                key={i}
                className="card p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.school}</div>
                </div>
              </motion.div>
            ))}
          </div>
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
