import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, GraduationCap } from 'lucide-react';

export default function Privacy() {
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
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-8">Last updated: February 21, 2026</p>

        <div className="prose-legal space-y-6 text-gray-700 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-display font-bold text-gray-900 mb-2">1. Who we are</h2>
            <p>myunioffer ai ("we", "us", "our") operates the website myunioffer.com and provides AI-powered university application coaching services. We are based in the United Kingdom.</p>
            <p>For any privacy-related questions, contact us at <a href="mailto:support@myunioffer.com" className="text-coral-500 hover:text-coral-600">support@myunioffer.com</a>.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-gray-900 mb-2">2. What data we collect</h2>
            <p>When you use myunioffer ai, we collect:</p>
            <p><strong>Account information:</strong> Your name, email address, and password (encrypted) when you create an account.</p>
            <p><strong>Payment information:</strong> Processed securely by Stripe. We never see or store your full card details. Stripe may collect your card number, expiry date, and billing address.</p>
            <p><strong>Chat data:</strong> Messages you send to our AI coaching system, including personal statement drafts, interview answers, and information about your application (subject, universities, experiences). This is stored to provide continuity across your sessions.</p>
            <p><strong>Usage data:</strong> How many messages you send per day, which mode you use (PS or Interview), and general usage patterns.</p>
            <p><strong>Technical data:</strong> Your browser type, device, and IP address collected automatically for security and performance purposes.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-gray-900 mb-2">3. How we use your data</h2>
            <p>We use your data to:</p>
            <p>• Provide and improve our AI coaching service</p>
            <p>• Maintain your conversation history across sessions and devices</p>
            <p>• Process payments and manage your subscription</p>
            <p>• Send you important service updates (not marketing — we won't spam you)</p>
            <p>• Enforce rate limits based on your subscription tier</p>
            <p>• Detect and prevent fraud or abuse</p>
            <p>We do <strong>not</strong> sell your personal data to third parties. Ever.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-gray-900 mb-2">4. AI and your data</h2>
            <p>Your messages are sent to AI providers (currently Anthropic's Claude) to generate coaching responses. These messages are processed in real-time and are subject to Anthropic's data handling policies.</p>
            <p>We do <strong>not</strong> use your personal statements, interview answers, or any personal content to train AI models. Your application content remains yours.</p>
            <p>Excerpts from your conversations may be stored on our servers to provide chat history and continuity. You can delete your chat history at any time from within the app.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-gray-900 mb-2">5. Data storage and security</h2>
            <p>Your account data is stored in Google Firebase (Firestore), hosted in the EU/UK. Your payment data is handled entirely by Stripe, which is PCI DSS compliant.</p>
            <p>We use industry-standard security measures including encrypted passwords, HTTPS throughout, and secure API authentication. However, no system is 100% secure, and we encourage you to use a strong, unique password.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-gray-900 mb-2">6. Third-party services</h2>
            <p>We use the following third-party services that may process your data:</p>
            <p>• <strong>Firebase (Google)</strong> — authentication and data storage</p>
            <p>• <strong>Anthropic (Claude AI)</strong> — AI response generation</p>
            <p>• <strong>Stripe</strong> — payment processing</p>
            <p>• <strong>Vercel</strong> — website hosting</p>
            <p>• <strong>Render</strong> — backend hosting</p>
            <p>Each of these services has their own privacy policy and data handling practices.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-gray-900 mb-2">7. Your rights</h2>
            <p>Under UK GDPR, you have the right to:</p>
            <p>• <strong>Access</strong> your personal data — request a copy of what we hold</p>
            <p>• <strong>Correct</strong> inaccurate data — update your profile or ask us to fix errors</p>
            <p>• <strong>Delete</strong> your data — request we erase your account and all associated data</p>
            <p>• <strong>Export</strong> your data — receive your data in a portable format</p>
            <p>• <strong>Object</strong> to processing — in certain circumstances</p>
            <p>To exercise any of these rights, email <a href="mailto:support@myunioffer.com" className="text-coral-500 hover:text-coral-600">support@myunioffer.com</a>. We will respond within 30 days.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-gray-900 mb-2">8. Cookies</h2>
            <p>We use essential cookies only — for authentication (keeping you logged in) and basic functionality. We do not use advertising or tracking cookies.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-gray-900 mb-2">9. Age requirements</h2>
            <p>Our service is designed for students aged 16 and over who are applying to UK universities. If you are under 16, please do not use our service without parental consent.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-gray-900 mb-2">10. Changes to this policy</h2>
            <p>We may update this privacy policy from time to time. If we make significant changes, we will notify you by email or through a notice on our website. Your continued use of the service after changes constitutes acceptance of the updated policy.</p>
          </section>

          <section>
            <h2 className="text-lg font-display font-bold text-gray-900 mb-2">11. Contact</h2>
            <p>If you have any questions about this privacy policy or how we handle your data, please contact us at <a href="mailto:support@myunioffer.com" className="text-coral-500 hover:text-coral-600">support@myunioffer.com</a>.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
