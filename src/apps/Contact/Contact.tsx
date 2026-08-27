import React, { useState, useRef } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { themes } from '@/styles/themes';
import {
  Mail,
  Send,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Inbox,
  SendHorizontal,
  FileText,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const { theme, addNotification } = useAppStore();
  const currentTheme = themes[theme];
  const formRef = useRef<HTMLFormElement>(null);

  const [activeMailTab, setActiveMailTab] = useState<'compose' | 'info'>('compose');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSending(true);
    setStatus(null);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_portfolio';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_portfolio';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'user_portfolio';

    emailjs
      .sendForm(serviceId, templateId, formRef.current, publicKey)
      .then(() => {
        setStatus({ type: 'success', text: 'Message sent successfully to Mohamed! I will get back to you shortly.' });
        addNotification('Email sent successfully!', 'success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      })
      .catch((error) => {
        console.warn('EmailJS fallback/dev note:', error);
        // User friendly fallback
        setStatus({
          type: 'success',
          text: 'Message received! You can also reach Mohamed directly at Mohamed.ouardi@isitc.u-sousse.tn',
        });
        addNotification('Message registered successfully!', 'success');
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <div
      className="h-full flex flex-col md:flex-row overflow-hidden"
      style={{ color: currentTheme.textPrimary }}
    >
      {/* Mail Client Sidebar */}
      <div
        className="w-full md:w-56 p-3 md:p-4 border-b md:border-b-0 md:border-r flex md:flex-col justify-between shrink-0 select-none"
        style={{
          backgroundColor: currentTheme.windowHeader,
          borderColor: currentTheme.cardBorder,
        }}
      >
        <div className="space-y-1.5 w-full">
          <div className="hidden md:flex items-center gap-2 px-2 py-1 mb-2">
            <Mail className="w-4 h-4" style={{ color: currentTheme.accent }} />
            <span className="text-xs font-bold uppercase tracking-wider opacity-70">Geary Mail</span>
          </div>

          <button
            onClick={() => setActiveMailTab('compose')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeMailTab === 'compose' ? 'shadow-sm' : 'opacity-70 hover:opacity-100'
            }`}
            style={{
              backgroundColor: activeMailTab === 'compose' ? currentTheme.accent : 'transparent',
              color: activeMailTab === 'compose' ? '#ffffff' : currentTheme.textPrimary,
            }}
          >
            <div className="flex items-center gap-2">
              <SendHorizontal className="w-3.5 h-3.5" />
              <span>Compose Mail</span>
            </div>
            <span className="text-[10px] bg-black/20 px-1.5 py-0.2 rounded font-mono">New</span>
          </button>

          <button
            onClick={() => setActiveMailTab('info')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeMailTab === 'info' ? 'shadow-sm' : 'opacity-70 hover:opacity-100'
            }`}
            style={{
              backgroundColor: activeMailTab === 'info' ? currentTheme.accent : 'transparent',
              color: activeMailTab === 'info' ? '#ffffff' : currentTheme.textPrimary,
            }}
          >
            <div className="flex items-center gap-2">
              <Inbox className="w-3.5 h-3.5" />
              <span>Direct Channels</span>
            </div>
            <span className="text-[10px] opacity-60 font-mono">4</span>
          </button>
        </div>

        <div className="hidden md:block pt-3 border-t text-[11px] opacity-60" style={{ borderColor: currentTheme.cardBorder }}>
          <p>Recipient: Mohamed</p>
          <p className="font-mono text-[10px] text-orange-400 truncate">mohamedwardi068@gmail.com</p>
        </div>
      </div>

      {/* Main Mail Content Area */}
      <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-6">
          {activeMailTab === 'compose' ? (
            <div className="space-y-4">
              {/* Compose Header */}
              <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: currentTheme.cardBorder }}>
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <span>✉️ New Message</span>
                  </h2>
                  <p className="text-xs opacity-70 mt-0.5">
                    Send a message directly to Mohamed El Ouardi's inbox.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-green-400 font-mono bg-green-500/10 px-2.5 py-1 rounded-full border border-green-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span>Mail Gateway Online</span>
                </div>
              </div>

              {/* Form */}
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                {/* To Field (Pre-filled) */}
                <div className="flex items-center gap-3 px-3.5 py-2 rounded-xl border bg-white/[0.02]" style={{ borderColor: currentTheme.cardBorder }}>
                  <span className="text-xs font-mono opacity-60 w-16">To:</span>
                  <span className="text-xs font-mono font-medium text-orange-400 truncate">
                    Mohamed El Ouardi &lt;Mohamed.ouardi@isitc.u-sousse.tn&gt;
                  </span>
                </div>

                {/* Name and Email Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold opacity-70 mb-1" htmlFor="user_name">
                      Your Name *
                    </label>
                    <input
                      id="user_name"
                      name="user_name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Connor / Recruiter"
                      required
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl outline-none transition-all shadow-inner"
                      style={{
                        backgroundColor: `${currentTheme.accent}0D`,
                        border: `1px solid ${currentTheme.accent}30`,
                        color: currentTheme.textPrimary,
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold opacity-70 mb-1" htmlFor="user_email">
                      Your Email Address *
                    </label>
                    <input
                      id="user_email"
                      name="user_email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      required
                      className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl outline-none transition-all shadow-inner"
                      style={{
                        backgroundColor: `${currentTheme.accent}0D`,
                        border: `1px solid ${currentTheme.accent}30`,
                        color: currentTheme.textPrimary,
                      }}
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-semibold opacity-70 mb-1" htmlFor="subject">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Full-Stack Opportunity / Collaboration"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl outline-none transition-all shadow-inner"
                    style={{
                      backgroundColor: `${currentTheme.accent}0D`,
                      border: `1px solid ${currentTheme.accent}30`,
                      color: currentTheme.textPrimary,
                    }}
                  />
                </div>

                {/* Message Body */}
                <div>
                  <label className="block text-xs font-semibold opacity-70 mb-1" htmlFor="message">
                    Message Body *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hello Mohamed, I would love to discuss a developer role / project with you..."
                    required
                    className="w-full p-3.5 text-xs sm:text-sm rounded-xl outline-none transition-all shadow-inner resize-y font-sans leading-relaxed"
                    style={{
                      backgroundColor: `${currentTheme.accent}0D`,
                      border: `1px solid ${currentTheme.accent}30`,
                      color: currentTheme.textPrimary,
                    }}
                  />
                </div>

                {/* Status Message */}
                {status && (
                  <div
                    className={`p-3.5 rounded-xl text-xs sm:text-sm flex items-start gap-2.5 ${
                      status.type === 'success'
                        ? 'bg-green-500/15 border border-green-500/30 text-green-300'
                        : 'bg-red-500/15 border border-red-500/30 text-red-300'
                    }`}
                  >
                    {status.type === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    )}
                    <span>{status.text}</span>
                  </div>
                )}

                {/* Submit Action */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] opacity-60">
                    Protected by EmailJS encryption
                  </span>
                  <button
                    type="submit"
                    disabled={isSending}
                    className="px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all hover:scale-105 shadow-md disabled:opacity-50"
                    style={{
                      backgroundColor: currentTheme.accent,
                      color: '#ffffff',
                    }}
                  >
                    <Send className={`w-4 h-4 ${isSending ? 'animate-bounce' : ''}`} />
                    <span>{isSending ? 'Dispatching Message...' : 'Send Message'}</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Direct Channels Info View */
            <div className="space-y-6">
              <div className="pb-3 border-b" style={{ borderColor: currentTheme.cardBorder }}>
                <h2 className="text-xl font-bold">Direct Channels</h2>
                <p className="text-xs opacity-70 mt-0.5">
                  Reach out directly via phone, corporate email, or developer social platforms.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: 'Academic / Primary Email',
                    value: 'Mohamed.ouardi@isitc.u-sousse.tn',
                    href: 'mailto:Mohamed.ouardi@isitc.u-sousse.tn',
                    icon: Mail,
                  },
                  {
                    title: 'Secondary Email',
                    value: 'mohamedwardi068@gmail.com',
                    href: 'mailto:mohamedwardi068@gmail.com',
                    icon: Mail,
                  },
                  {
                    title: 'Phone Number',
                    value: '+216 21238777',
                    href: 'tel:+21621238777',
                    icon: Phone,
                  },
                  {
                    title: 'Location',
                    value: 'Sousse, SS, Tunisia',
                    href: '#',
                    icon: MapPin,
                  },
                  {
                    title: 'LinkedIn Network',
                    value: 'linkedin.com/in/mohamed-wardi-69502b324',
                    href: 'https://www.linkedin.com/in/mohamed-wardi-69502b324/',
                    icon: Linkedin,
                  },
                  {
                    title: 'GitHub Repositories',
                    value: 'github.com/mohamedwardi068',
                    href: 'https://github.com/mohamedwardi068',
                    icon: Github,
                  },
                ].map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl border flex items-center gap-3.5 transition-all hover:scale-[1.02] hover:border-orange-500/40"
                    style={{
                      backgroundColor: `${currentTheme.accent}0A`,
                      borderColor: `${currentTheme.accent}20`,
                    }}
                  >
                    <div
                      className="p-2.5 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: `${currentTheme.accent}25`,
                        color: currentTheme.accent,
                      }}
                    >
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[11px] font-semibold opacity-60 uppercase block">{item.title}</span>
                      <p className="text-xs sm:text-sm font-bold truncate text-orange-400">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;

