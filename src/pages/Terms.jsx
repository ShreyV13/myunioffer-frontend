import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, GraduationCap } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-white">
      <header className="glass border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
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

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: February 21, 2026</p>

        <div className="prose-legal space-y-6 text-gray-700 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-display font-bold text-gray-900 mb-2">1. What myunioffer ai is</h2>
            <p>myunioffer ai provides AI-powered coaching for UK university applications, including personal statement guidance and interview preparation. We also offer optional 1-on-1 sessions with real students from top UK universities.</p>
            <p>By using our service, you agree to these terms. If you don't agree, please don't use the service.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-gray-900 mb-2">2. What the AI does and doesn't do</h2>
            <p>Our AI is a <strong>coaching tool</strong>, it helps you think through your application, asks questions to draw out your experiences, and gives feedback on your writing.</p>
            <p>The AI does <strong>not</strong>:</p>
            <p>• Write your personal statement for you</p>
            <p>• Guarantee admission to any university</p>
            <p>• Provide legally binding advice</p>
            <p>• Replace professional academic counselling</p>
            <p>You are solely responsible for the content of your university applications. We provide guidance, but the final decisions and submissions are yours.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-gray-900 mb-2">3. Accounts</h2>
            <p>You must create an account to use our service. You are responsible for keeping your login details secure. You must be at least 16 years old to create an account.</p>
            <p>You agree to provide accurate information when signing up. We reserve the right to suspend or terminate accounts that violate these terms.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-gray-900 mb-2">4. Subscriptions and payments</h2>
            <p>We offer free and paid subscription tiers. Paid subscriptions are billed monthly through Stripe.</p>
            <p><strong>Free tier:</strong> 3 messages per day in each mode (PS and Interview).</p>
            <p><strong>Paid tiers:</strong> Higher message limits as described on our pricing page. Prices are shown inclusive of any applicable taxes.</p>
            <p><strong>1-on-1 sessions:</strong> Booked separately and paid per session. Sessions are subject to availability of our specialist coaches.</p>
            <p>Prices may change. If we increase prices, existing subscribers will be notified at least 14 days in advance and can cancel before the new price takes effect.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-gray-900 mb-2">5. Cancellations and refunds</h2>
            <p>You can cancel your subscription at any time. After cancellation, you will continue to have access to your paid features until the end of your current billing period.</p>
            <p>We offer full refunds on request. To request a refund, email <a href="mailto:support@myunioffer.com" className="text-coral-500 hover:text-coral-600">support@myunioffer.com</a>. Refunds are processed within 5-10 business days.</p>
            <p>For 1-on-1 sessions, cancellations made at least 24 hours before the scheduled session will receive a full refund. Cancellations made less than 24 hours before, or no-shows, are non-refundable.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-gray-900 mb-2">6. Your content</h2>
            <p>You retain ownership of everything you write, your personal statement drafts, interview answers, and all other content you share through the service.</p>
            <p>By using the service, you grant us a limited licence to process your content through our AI system solely for the purpose of providing coaching responses. We will not publish, share, or sell your content.</p>
            <p>We do not use your content to train AI models.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-gray-900 mb-2">7. Acceptable use</h2>
            <p>You agree not to:</p>
            <p>• Use the service to generate content that you will submit as entirely AI-written (this defeats the purpose and risks your application)</p>
            <p>• Share your account with others</p>
            <p>• Attempt to extract, scrape, or reverse-engineer our AI system, prompts, or training data</p>
            <p>• Use the service for any illegal purpose</p>
            <p>• Abuse, harass, or send harmful content through the chat system</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-gray-900 mb-2">8. Intellectual property</h2>
            <p>The myunioffer ai brand, website, AI system, and all associated content are our intellectual property. You may not copy, reproduce, or redistribute any part of our service without written permission.</p>
            <p>The personal statement database and interview question bank are proprietary resources. You may not attempt to access, download, or reproduce these resources outside of normal use of the coaching service.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-gray-900 mb-2">9. Limitation of liability</h2>
            <p>We provide our service "as is" without guarantees of any kind. While we strive to provide high-quality coaching:</p>
            <p>• We do not guarantee that you will receive an offer from any university</p>
            <p>• We are not liable for any decisions you make based on AI coaching</p>
            <p>• We are not responsible for university application outcomes</p>
            <p>• Our maximum liability to you is limited to the amount you have paid us in the 12 months before any claim</p>
            <p>The AI may occasionally produce inaccurate information. Always verify important details independently, especially deadlines, entry requirements, and university-specific policies.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-gray-900 mb-2">10. Service availability</h2>
            <p>We aim to keep the service available 24/7 but cannot guarantee uninterrupted access. The service may occasionally be unavailable due to maintenance, updates, or technical issues beyond our control.</p>
            <p>Our backend may experience brief delays when waking from inactivity. This is normal and does not indicate a problem with your account.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-gray-900 mb-2">11. Changes to these terms</h2>
            <p>We may update these terms from time to time. If we make significant changes, we will notify you by email or through a notice on our website. Your continued use of the service after changes constitutes acceptance.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-gray-900 mb-2">12. Governing law</h2>
            <p>These terms are governed by the laws of England and Wales. Any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-gray-900 mb-2">13. Contact</h2>
            <p>If you have any questions about these terms, please contact us at <a href="mailto:support@myunioffer.com" className="text-coral-500 hover:text-coral-600">support@myunioffer.com</a>.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
