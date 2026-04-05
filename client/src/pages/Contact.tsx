// Contact Page — Woodhill Studios Redesign
// Off-white bg, black text, teal accent
// Casual, grounded copy

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
      toast.error('Fill in all the fields. Please.');
      return;
    }
    setSubmitted(true);
    toast.success('Got it. We\'ll get back to you.');
  };

  return (
    <div className="min-h-screen bg-[#F2EFE9] pt-20 lg:pt-0 lg:pl-[200px]">
      <div className="px-6 lg:px-12 py-16 lg:py-20">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="rule-label mb-6">Get in Touch</div>
          <h1 className="font-hero text-[clamp(4rem,10vw,9rem)] text-[#0A0A0A] leading-none uppercase">
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
              <p className="text-[#0A0A0A]/50 text-base leading-[1.9] mb-10 font-body">
                Want to work together? Have a weird idea? Just want to say hi? Drop us a message. We read them. Eventually.
              </p>

              <div className="space-y-6">
                <div>
                  <div className="font-mono-label text-[10px] text-[#0A0A0A]/25 mb-1">Location</div>
                  <p className="text-[#0A0A0A]/70 text-sm font-body">Stockholm, Sweden</p>
                </div>
                <div>
                  <div className="font-mono-label text-[10px] text-[#0A0A0A]/25 mb-1">Collective</div>
                  <p className="text-[#0A0A0A]/70 text-sm font-body">Woodhill Studios</p>
                </div>
              </div>
            </div>

            {/* Tagline */}
            <div className="mt-16 lg:mt-0">
              <div className="w-8 h-px bg-[#2D7A6B] mb-4" />
              <p className="font-heading text-[clamp(1.5rem,3vw,2.2rem)] text-[#0A0A0A]/25">
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
                <div className="w-8 h-px bg-[#2D7A6B] mb-6" />
                <h2 className="font-hero text-[clamp(2rem,4vw,3.5rem)] text-[#0A0A0A] leading-none mb-4 uppercase">
                  Message Received.
                </h2>
                <p className="text-[#0A0A0A]/40 text-sm font-body">
                  We'll be in touch. Probably.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name */}
                <div>
                  <label className="font-mono-label text-[10px] text-[#0A0A0A]/30 block mb-2">Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full bg-transparent border-b border-[#0A0A0A]/12 pb-3 text-[#0A0A0A] text-sm placeholder:text-[#0A0A0A]/20 focus:outline-none focus:border-[#2D7A6B] transition-colors duration-300 font-body"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="font-mono-label text-[10px] text-[#0A0A0A]/30 block mb-2">Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full bg-transparent border-b border-[#0A0A0A]/12 pb-3 text-[#0A0A0A] text-sm placeholder:text-[#0A0A0A]/20 focus:outline-none focus:border-[#2D7A6B] transition-colors duration-300 font-body"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="font-mono-label text-[10px] text-[#0A0A0A]/30 block mb-2">Subject</label>
                  <div className="flex flex-wrap gap-2">
                    {subjects.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setForm({ ...form, subject: s })}
                        className={`font-mono-label text-[10px] px-3 py-2 border transition-all duration-200 ${
                          form.subject === s
                            ? 'border-[#2D7A6B] text-[#2D7A6B] bg-[#2D7A6B]/08'
                            : 'border-[#0A0A0A]/12 text-[#0A0A0A]/30 hover:border-[#0A0A0A]/25 hover:text-[#0A0A0A]/50'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="font-mono-label text-[10px] text-[#0A0A0A]/30 block mb-2">Message *</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="What's on your mind..."
                    rows={5}
                    className="w-full bg-transparent border-b border-[#0A0A0A]/12 pb-3 text-[#0A0A0A] text-sm placeholder:text-[#0A0A0A]/20 focus:outline-none focus:border-[#2D7A6B] transition-colors duration-300 resize-none font-body"
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 group"
                >
                  <span className="font-mono-label text-[11px] text-[#0A0A0A] group-hover:text-[#2D7A6B] transition-colors duration-300">
                    Send Message
                  </span>
                  <Send size={13} className="text-[#2D7A6B]" />
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
