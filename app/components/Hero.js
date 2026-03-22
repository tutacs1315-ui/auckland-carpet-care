'use client';

import { Phone, ArrowRight, CheckCircle, Star } from 'lucide-react';

const trustBadges = [
  'Fully Insured',
  'Same-Day Service',
  '100% Satisfaction Guarantee',
  '15+ Years Experience',
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-hero-pattern"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 -left-32 w-80 h-80 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/3 blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="text-white">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 animate-fade-in">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium">Auckland&apos;s #1 Rated Carpet Cleaner</span>
              <div className="flex gap-0.5 ml-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 animate-fade-in-up">
              Fresh, Clean Carpets
              <span className="block text-brand-sky">Guaranteed.</span>
            </h1>

            <p className="text-lg sm:text-xl text-blue-100 mb-8 leading-relaxed animate-fade-in-up delay-100">
              Auckland&apos;s trusted carpet and upholstery cleaning specialists. We remove tough stains,
              eliminate allergens, and restore your carpets to like-new condition — fast, affordable, and 100% satisfaction guaranteed.
            </p>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-2 mb-8 animate-fade-in-up delay-200">
              {trustBadges.map((badge) => (
                <div key={badge} className="flex items-center gap-2 text-sm text-blue-100">
                  <CheckCircle size={16} className="text-brand-sky flex-shrink-0" />
                  {badge}
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up delay-300">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white text-brand-navy font-bold rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl text-base"
              >
                Get a Free Quote
                <ArrowRight size={18} />
              </a>
              <a
                href="tel:+6492345678"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white/15 backdrop-blur-sm border border-white/30 text-white font-bold rounded-xl hover:bg-white/25 transition-all duration-200 text-base"
              >
                <Phone size={18} />
                (09) 234 5678
              </a>
            </div>
          </div>

          {/* Right: Stats / Visual card */}
          <div className="hidden lg:block animate-fade-in delay-400">
            <div className="relative">
              {/* Main card */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl">
                <h3 className="text-white font-bold text-xl mb-6">Why Auckland Trusts Us</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { number: '5,000+', label: 'Happy Customers' },
                    { number: '15+',    label: 'Years Experience' },
                    { number: '4.9★',  label: 'Average Rating' },
                    { number: '100%',   label: 'Satisfaction Rate' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white/10 rounded-2xl p-4 text-center">
                      <div className="text-3xl font-black text-white mb-1">{stat.number}</div>
                      <div className="text-blue-200 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Recent review */}
                <div className="bg-white/10 rounded-2xl p-4">
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-blue-100 text-sm italic mb-2">
                    &quot;Absolutely amazing! My carpets look brand new. Fast, professional and very affordable. Highly recommend!&quot;
                  </p>
                  <p className="text-white text-sm font-semibold">— Sarah M., Remuera</p>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-brand-green text-white rounded-2xl px-4 py-3 shadow-lg animate-float">
                <div className="text-sm font-bold">Same-Day</div>
                <div className="text-xs text-emerald-100">Available!</div>
              </div>

              {/* Floating badge 2 */}
              <div className="absolute -bottom-4 -left-4 bg-yellow-500 text-white rounded-2xl px-4 py-3 shadow-lg">
                <div className="text-sm font-bold">Free Quote</div>
                <div className="text-xs text-yellow-100">No Obligation</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="#f9fafb" />
          </svg>
        </div>
      </div>
    </section>
  );
}
