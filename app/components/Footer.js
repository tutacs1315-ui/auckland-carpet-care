import { Phone, Mail, MapPin, Facebook, Instagram, Star } from 'lucide-react';

const services = [
  'Steam Carpet Cleaning',
  'Dry Carpet Cleaning',
  'Stain & Odour Removal',
  'Upholstery Cleaning',
  'Tile & Grout Cleaning',
  'Commercial Cleaning',
];

const areas = [
  'Auckland CBD', 'North Shore', 'West Auckland', 'South Auckland',
  'East Auckland', 'Manukau',
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-brand-blue flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <div className="font-bold text-lg">Auckland Carpet Care</div>
                <div className="text-blue-300 text-xs">Professional Cleaning Services</div>
              </div>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed mb-5">
              Auckland&apos;s trusted carpet and upholstery cleaning specialists. Serving the Auckland
              region for over 15 years with professional, eco-friendly cleaning solutions.
            </p>
            <div className="flex gap-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white mb-4">Our Services</h4>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s}>
                  <a href="#services" className="text-blue-200 hover:text-white text-sm transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="font-bold text-white mb-4">Service Areas</h4>
            <ul className="space-y-2">
              {areas.map((a) => (
                <li key={a} className="text-blue-200 text-sm flex items-center gap-2">
                  <MapPin size={12} className="text-blue-400 flex-shrink-0" />
                  {a}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+6492345678" className="flex items-center gap-2 text-blue-200 hover:text-white text-sm transition-colors">
                  <Phone size={14} className="text-blue-400 flex-shrink-0" />
                  (09) 234 5678
                </a>
              </li>
              <li>
                <a href="mailto:info@aucklandcarpetcare.co.nz" className="flex items-center gap-2 text-blue-200 hover:text-white text-sm transition-colors">
                  <Mail size={14} className="text-blue-400 flex-shrink-0" />
                  info@aucklandcarpetcare.co.nz
                </a>
              </li>
              <li className="flex items-center gap-2 text-blue-200 text-sm">
                <MapPin size={14} className="text-blue-400 flex-shrink-0" />
                Auckland, New Zealand
              </li>
            </ul>

            <div className="mt-6 bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <div className="text-white font-semibold text-sm">4.9/5 Rating</div>
              <div className="text-blue-200 text-xs">Based on 500+ reviews</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-blue-300">
          <span>
            © {year} Auckland Carpet Care. All rights reserved.
          </span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
