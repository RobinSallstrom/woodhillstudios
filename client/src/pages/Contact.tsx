// Contact Page — Underground Cinema Design System
// Minimalist brutalist-style form
// Left: info + tagline | Right: form

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { toast } from 'sonner';

const subjects = [
  'General Inquiry',
  'Collaboration',
  'Press',
  'Commission',
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: subjects[0], message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all fields.');
      return;
    }
    setSubmitted(true);
    toast.success('Message sent. We\'ll be in touch.');
  };

  return (
    <div className="min-h-screen bg-[#050505] pt-20 lg:pt-0 lg:pl-[200px]">
      <div className="px-6 lg:px-12 py-16 lg:py-20">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="rule-label mb-6">Get in Touch</div>
          <h1
            className="text-[clamp(3rem,8vw,7rem)] font-bold text-[#E8E0D5] leading-none"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Contact
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24">
          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col justify-between"
          >
            <div>
              <p
                className="text-white/50 text-base leading-[1.9] mb-10"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Whether you want to collaborate, commission a piece, or just say hello — we're here.
              </p>

              <div className="space-y-6">
                <div>
                  <div className="font-mono-label text-[10px] text-white/25 mb-1">Location</div>
                  <p className="text-[#E8E0D5]/70 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>Stockholm, Sweden</p>
                </div>
                <div>
                  <div className="font-mono-label text-[10px] text-white/25 mb-1">Collective</div>
                  <p className="text-[#E8E0D5]/70 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>Woodhill Studios</p>
                </div>
              </div>
            </div>

            {/* Tagline */}
            <div className="mt-16 lg:mt-0">
              <div className="w-8 h-px bg-[#C4622D] mb-4" />
              <p
                className="font-display text-[clamp(1.5rem,3vw,2.2rem)] text-[#E8E0D5]/25 italic"
              >
                Exotic Lifestyle.
              </p>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {submitted ? (
              <div className="flex flex-col items-start justify-center h-full min-h-[400px]">
                <div className="w-8 h-px bg-[#C4622D] mb-6" />
                <h2
                  className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#E8E0D5] leading-none mb-4"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  Message Received.
                </h2>
                <p className="text-white/40 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  We'll be in touch soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name */}
                <div className="group">
                  <label className="font-mono-label text-[10px] text-white/30 block mb-2">Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full bg-transparent border-b border-white/10 pb-3 text-[#E8E0D5] text-sm placeholder:text-white/20 focus:outline-none focus:border-[#C4622D] transition-colors duration-300"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="font-mono-label text-[10px] text-white/30 block mb-2">Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full bg-transparent border-b border-white/10 pb-3 text-[#E8E0D5] text-sm placeholder:text-white/20 focus:outline-none focus:border-[#C4622D] transition-colors duration-300"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="font-mono-label text-[10px] text-white/30 block mb-2">Subject</label>
                  <div className="flex flex-wrap gap-2">
                    {subjects.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setForm({ ...form, subject: s })}
                        className={`font-mono-label text-[10px] px-3 py-2 border transition-all duration-200 ${
                          form.subject === s
                            ? 'border-[#C4622D] text-[#C4622D] bg-[#C4622D]/10'
                            : 'border-white/10 text-white/30 hover:border-white/25 hover:text-white/50'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="font-mono-label text-[10px] text-white/30 block mb-2">Message *</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your project or idea..."
                    rows={5}
                    className="w-full bg-transparent border-b border-white/10 pb-3 text-[#E8E0D5] text-sm placeholder:text-white/20 focus:outline-none focus:border-[#C4622D] transition-colors duration-300 resize-none"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 group"
                >
                  <span
                    className="font-mono-label text-[11px] text-[#E8E0D5] group-hover:text-[#C4622D] transition-colors duration-300"
                  >
                    Send Message
                  </span>
                  <Send size={13} className="text-[#C4622D]" />
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
