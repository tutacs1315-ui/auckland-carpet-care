'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const contactInfo = [
  {
    icon: Phone,
    label: 'Admin',
    value: '021 075 0733',
    href: 'tel:+64210750733',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Phone,
    label: 'Manager (Xavier)',
    value: '021 263 5457',
    href: 'tel:+64212635457',
    color: 'bg-sky-50 text-sky-600',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'admin@aucklandcarpetcare.co.nz',
    href: 'mailto:admin@aucklandcarpetcare.co.nz',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: MapPin,
    label: 'Service Area',
    value: 'All of Auckland Region',
    href: null,
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Mon–Sat: 7am–7pm',
    href: null,
    color: 'bg-orange-50 text-orange-600',
  },
];

const services = [
  'Steam Carpet Cleaning',
  'Dry Carpet Cleaning',
  'Stain & Odour Removal',
  'Upholstery Cleaning',
  'Tile & Grout Cleaning',
  'Commercial Cleaning',
];

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    rooms: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        alert('Something went wrong. Please call us on 021 075 0733.');
      }
    } catch {
      alert('Network error. Please call us on 021 075 0733.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="badge bg-teal-100 text-teal-700 mb-3">Get In Touch</span>
          <h2 className="section-title">Get Your Free Quote Today</h2>
          <p className="section-subtitle mx-auto">
            Fill in the form below and we&apos;ll get back to you quickly with a free, no-obligation quote.
            Or give us a call for an instant quote over the phone.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left: Contact info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-brand-navy mb-4">Contact Information</h3>
              <div className="space-y-3">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  const inner = (
                    <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-brand-blue hover:shadow-sm transition-all">
                      <div className={`w-10 h-10 rounded-lg ${info.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide">{info.label}</div>
                        <div className="font-semibold text-brand-navy">{info.value}</div>
                      </div>
                    </div>
                  );
                  return info.href ? (
                    <a key={info.label} href={info.href}>{inner}</a>
                  ) : (
                    <div key={info.label}>{inner}</div>
                  );
                })}
              </div>
            </div>

            {/* Service areas */}
            <div className="bg-gray-50 rounded-2xl p-5">
              <h4 className="font-bold text-brand-navy mb-3">Areas We Cover</h4>
              <div className="grid grid-cols-2 gap-1.5 text-sm text-gray-600">
                {[
                  'Auckland CBD', 'North Shore', 'West Auckland', 'South Auckland',
                  'East Auckland', 'Manukau', 'Waitakere', 'Rodney District',
                ].map((area) => (
                  <div key={area} className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                    {area}
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency CTA */}
            <div className="bg-hero-pattern rounded-2xl p-5 text-white">
              <div className="text-sm font-semibold text-blue-200 mb-1">Need It Today?</div>
              <h4 className="text-lg font-bold mb-2">Same-Day Service Available</h4>
              <p className="text-blue-100 text-sm mb-4">
                Call us now for emergency same-day carpet cleaning across Auckland.
              </p>
              <a href="tel:+64210750733" className="inline-flex items-center gap-2 bg-white text-brand-navy font-bold px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                <Phone size={16} />
                021 075 0733
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <CheckCircle size={40} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-brand-navy mb-2">
                  Request Received!
                </h3>
                <p className="text-gray-600 max-w-sm">
                  Thanks for getting in touch. We&apos;ll be in contact shortly with your free quote.
                  If you need urgent help, call us on{' '}
                  <a href="tel:+64210750733" className="text-brand-blue font-semibold">
                    021 075 0733
                  </a>
                  .
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm text-brand-blue hover:underline"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-gray-50 rounded-2xl p-8 space-y-5"
              >
                <h3 className="text-xl font-bold text-brand-navy">Request a Free Quote</h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="021 234 5678"
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="input-field"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Service Required *
                    </label>
                    <select
                      name="service"
                      required
                      value={form.service}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="">Select a service&hellip;</option>
                      {services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Number of Rooms
                    </label>
                    <select
                      name="rooms"
                      value={form.rooms}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="">Select&hellip;</option>
                      {['1', '2', '3', '4', '5', '6+'].map((n) => (
                        <option key={n} value={n}>{n} {n === '1' ? 'room' : 'rooms'}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Additional Details
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about any specific stains, odours, or special requirements&hellip;"
                    className="input-field resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending&hellip;
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send size={18} />
                      Get My Free Quote
                    </span>
                  )}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  We respond promptly during business hours. No spam, ever.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
