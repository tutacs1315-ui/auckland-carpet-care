'use client';

import { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Why Us',   href: '#why-us' },
  { label: 'Process',  href: '#process' },
  { label: 'Pricing',  href: '#pricing' },
  { label: 'Reviews',  href: '#testimonials' },
  { label: 'Contact',  href: '#contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-2'
          : 'bg-transparent py-4'
      }`}
    >
      {/* Top bar */}
      <div className={`${scrolled ? 'hidden' : 'block'} bg-brand-navy text-white text-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 flex justify-between items-center">
          <span>Auckland&apos;s Professional Carpet Cleaning Specialists</span>
          <div className="flex items-center gap-4">
            <span>Mon&ndash;Sat: 7am&ndash;7pm</span>
            <a href="tel:+64210750733" className="font-semibold hover:text-brand-sky transition-colors">
              021 075 0733
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-brand-blue flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div>
              <div className={`font-bold text-lg leading-tight transition-colors ${scrolled ? 'text-brand-navy' : 'text-white'}`}>
                Auckland Carpet Care
              </div>
              <div className={`text-xs transition-colors ${scrolled ? 'text-gray-500' : 'text-blue-100'}`}>
                Professional Cleaning Services
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  scrolled
                    ? 'text-gray-700 hover:text-brand-blue hover:bg-blue-50'
                    : 'text-blue-100 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+64210750733"
              className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
                scrolled ? 'text-brand-blue' : 'text-white'
              }`}
            >
              <Phone size={16} />
              021 075 0733
            </a>
            <a href="#contact" className="btn-primary text-sm px-4 py-2">
              Free Quote
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled
                ? 'text-gray-700 hover:bg-gray-100'
                : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-blue-50 hover:text-brand-blue transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-2">
              <a href="tel:+64210750733" className="btn-secondary text-sm">
                <Phone size={16} /> 021 075 0733
              </a>
              <a href="#contact" className="btn-primary text-sm">
                Get a Free Quote
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
