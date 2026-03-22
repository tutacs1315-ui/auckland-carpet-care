import { CheckCircle, ArrowRight } from 'lucide-react';

const plans = [
  {
    name: 'Standard Clean',
    price: 89,
    unit: 'per room',
    description: 'Perfect for regular maintenance cleaning of residential carpets.',
    features: [
      'Hot water extraction cleaning',
      'Pre-vacuuming included',
      'Spot treatment (up to 3)',
      'Deodorising treatment',
      'Fast dry — 2–4 hours',
      'Satisfaction guarantee',
    ],
    popular: false,
    cta: 'Book Standard',
    color: 'border-gray-200',
    badge: null,
  },
  {
    name: 'Deep Clean',
    price: 139,
    unit: 'per room',
    description: 'Our most popular package — ideal for heavily soiled or stained carpets.',
    features: [
      'Everything in Standard',
      'Pre-treatment of all stains',
      'High-pressure deep extraction',
      'Enzyme treatment included',
      'Carpet deodorising & sanitising',
      'Protection spray available (+$30)',
      'Priority scheduling',
    ],
    popular: true,
    cta: 'Book Deep Clean',
    color: 'border-brand-blue',
    badge: 'Most Popular',
  },
  {
    name: 'Premium Package',
    price: 299,
    unit: 'whole home',
    description: 'Complete whole-home treatment — up to 4 rooms + hallways.',
    features: [
      'Everything in Deep Clean',
      'Up to 4 rooms + hallways',
      'Upholstery spot clean (1 piece)',
      'Stain protection spray',
      'Odour elimination treatment',
      'Post-clean inspection',
      '30-day re-clean guarantee',
    ],
    popular: false,
    cta: 'Book Premium',
    color: 'border-gray-200',
    badge: 'Best Value',
  },
];

const extras = [
  { item: 'Additional room',         price: '$69' },
  { item: 'Stain protection spray',  price: '$30/room' },
  { item: 'Sofa (2-seater)',          price: '$89' },
  { item: 'Sofa (3-seater)',          price: '$119' },
  { item: 'Armchair',                price: '$49' },
  { item: 'Mattress cleaning',       price: '$79' },
  { item: 'Tile & grout (per m²)',   price: '$12' },
  { item: 'After-hours service',     price: '+$40' },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-gray-50 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="badge bg-blue-100 text-brand-blue mb-3">Pricing</span>
          <h2 className="section-title">Simple, Transparent Pricing</h2>
          <p className="section-subtitle mx-auto">
            No hidden fees, no surprises. Get your carpets professionally cleaned at fair, competitive prices.
            All prices include GST.
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl border-2 ${plan.color} p-8 shadow-md transition-all duration-300 hover:shadow-xl ${
                plan.popular ? 'ring-2 ring-brand-blue ring-offset-2 scale-105' : ''
              }`}
            >
              {plan.badge && (
                <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full ${
                  plan.popular ? 'bg-brand-blue text-white' : 'bg-yellow-500 text-white'
                }`}>
                  {plan.badge}
                </div>
              )}

              <h3 className="text-xl font-bold text-brand-navy mb-1">{plan.name}</h3>
              <p className="text-gray-500 text-sm mb-4">{plan.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-black text-brand-navy">${plan.price}</span>
                <span className="text-gray-500 ml-1">{plan.unit}</span>
              </div>

              <ul className="space-y-2.5 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <CheckCircle size={16} className="text-brand-blue flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  plan.popular
                    ? 'bg-brand-blue text-white hover:bg-blue-700 shadow-lg shadow-blue-200'
                    : 'bg-gray-100 text-brand-navy hover:bg-gray-200'
                }`}
              >
                {plan.cta}
                <ArrowRight size={16} />
              </a>
            </div>
          ))}
        </div>

        {/* Extras */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h3 className="text-xl font-bold text-brand-navy mb-2">Add-On Services</h3>
          <p className="text-gray-500 text-sm mb-6">Customise your clean with these optional extras.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {extras.map((extra) => (
              <div key={extra.item} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-700">{extra.item}</span>
                <span className="text-sm font-bold text-brand-blue ml-2">{extra.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-gray-400 text-xs mt-6">
          * Prices are indicative. Final quote provided after free assessment. All prices include GST.
          Minimum call-out may apply for single rooms under 10m².
        </p>
      </div>
    </section>
  );
}
