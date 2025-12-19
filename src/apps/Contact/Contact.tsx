import { useState } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { themes } from '@/styles/themes';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiTwitter, FiSend } from 'react-icons/fi';

const Contact = () => {
  const { theme, addNotification } = useAppStore();
  const currentTheme = themes[theme];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    setFormData({ name: '', email: '', message: '' });
  };

  const contactInfo = [
    { icon: FiMail, label: 'Email', value: 'mohamedwardi068@gmail.com', href: 'mailto:mohamedwardi068@gmail.com' },
    { icon: FiPhone, label: 'Phone', value: '+216 21238777', href: 'tel:+21621238777' },
    { icon: FiMapPin, label: 'Location', value: 'Sousse, Tunisia', href: '#' },
  ];

  const socialLinks = [
    { icon: FiGithub, label: 'GitHub', href: 'https://github.com/mohamedwardi068' },
    { icon: FiLinkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/mohamedwardi068' },
  ];

  return (
    <div
      className="h-full p-6 overflow-auto"
      style={{ color: currentTheme.textPrimary }}
    >
      <h1 className="text-2xl font-bold mb-6">Get in Touch</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
          <div className="space-y-4">
            {contactInfo.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-4 p-3 rounded-lg transition-colors hover:opacity-80"
                style={{ backgroundColor: `${currentTheme.accent}15` }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${currentTheme.accent}30` }}
                >
                  <item.icon className="w-5 h-5" style={{ color: currentTheme.accent }} />
                </div>
                <div>
                  <p className="text-sm opacity-70">{item.label}</p>
                  <p className="font-medium">{item.value}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Social Links */}
          <h2 className="text-lg font-semibold mt-8 mb-4">Follow Me</h2>
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                style={{ backgroundColor: `${currentTheme.accent}20` }}
                title={social.label}
              >
                <social.icon className="w-5 h-5" style={{ color: currentTheme.accent }} />
              </a>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm opacity-70 mb-1">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg outline-none transition-colors"
                style={{
                  backgroundColor: `${currentTheme.accent}15`,
                  color: currentTheme.textPrimary,
                  border: `1px solid ${currentTheme.accent}30`,
                }}
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="block text-sm opacity-70 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 rounded-lg outline-none transition-colors"
                style={{
                  backgroundColor: `${currentTheme.accent}15`,
                  color: currentTheme.textPrimary,
                  border: `1px solid ${currentTheme.accent}30`,
                }}
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm opacity-70 mb-1">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 rounded-lg outline-none transition-colors resize-none"
                style={{
                  backgroundColor: `${currentTheme.accent}15`,
                  color: currentTheme.textPrimary,
                  border: `1px solid ${currentTheme.accent}30`,
                }}
                rows={4}
                placeholder="Your message..."
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors hover:opacity-90"
              style={{
                backgroundColor: currentTheme.accent,
                color: '#FFFFFF',
              }}
            >
              <FiSend className="w-4 h-4" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
