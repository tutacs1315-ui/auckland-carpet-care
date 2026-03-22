import {
  ShieldCheck,
  Clock,
  Leaf,
  Award,
  Headphones,
  BadgeCheck,
  ThumbsUp,
  Zap,
} from 'lucide-react';

const reasons = [
  {
    icon: Award,
    title: '15+ Years of Experience',
    description:
      'Over a decade and a half serving Auckland homeowners and businesses with consistent, professional results.',
    color: 'text-yellow-600 bg-yellow-50',
  },
  {
    icon: ShieldCheck,
    title: 'Fully Licensed & Insured',
    description:
      'We\'re fully insured for your complete peace of mind. All our technicians are trained, certified, and background-checked.',
    color: 'text-blue-600 bg-blue-50',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly Products',
    description:
      'We use biodegradable, non-toxic cleaning solutions that are safe for your children, pets, and the environment.',
    color: 'text-green-600 bg-green-50',
  },
  {
    icon: Zap,
    title: 'Fast Drying Times',
    description:
      'Our advanced equipment extracts maximum moisture, so your carpets are typically dry within 2–4 hours.',
    color: 'text-purple-600 bg-purple-50',
  },
  {
    icon: Clock,
    title: 'Same-Day Appointments',
    description:
      'Need it done today? We offer same-day service for emergency cleans and last-minute bookings across Auckland.',
    color: 'text-red-600 bg-red-50',
  },
  {
    icon: BadgeCheck,
    title: '100% Satisfaction Guarantee',
    description:
      'If you\'re not completely happy with the results, we\'ll re-clean the area free of charge. No questions asked.',
    color: 'text-teal-600 bg-teal-50',
  },
  {
    icon: ThumbsUp,
    title: 'Upfront, Honest Pricing',
    description:
      'No hidden fees or surprise charges. We provide clear quotes before we start, so you always know what you\'re paying.',
    color: 'text-indigo-600 bg-indigo-50',
  },
  {
    icon: Headphones,
    title: '7-Day Customer Support',
    description:
      'Our friendly team is available 7 days a week to answer your questions and handle bookings.',
    color: 'text-orange-600 bg-orange-50',
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="badge bg-green-100 text-green-700 mb-3">Why Choose Us</span>
          <h2 className="section-title">The Auckland Carpet Care Difference</h2>
          <p className="section-subtitle mx-auto">
            We don&apos;t just clean carpets — we deliver a premium experience from booking to the final result.
            Here&apos;s what sets us apart.
          </p>
        </div>

        {/* Reasons grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="group p-6 rounded-2xl border border-gray-100 hover:border-brand-blue hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-11 h-11 rounded-xl ${reason.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon size={20} />
                </div>
                <h3 className="font-bold text-brand-navy mb-2">{reason.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{reason.description}</p>
              </div>
            );
          })}
        </div>

        {/* Banner */}
        <div className="mt-16 rounded-3xl bg-hero-pattern p-8 md:p-12 text-white text-center shadow-xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-3">
            Ready for Cleaner Carpets?
          </h3>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            Join thousands of satisfied Auckland customers who trust us with their homes and businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#contact" className="btn-secondary">
              Get Your Free Quote
            </a>
            <a href="#pricing" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/15 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-lg hover:bg-white/25 transition-all">
              View Pricing
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
