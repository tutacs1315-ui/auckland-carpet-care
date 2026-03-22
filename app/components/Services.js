import { Droplets, Sofa, Sparkles, Grid3X3, Building2, Wind } from 'lucide-react';

const services = [
  {
    icon: Droplets,
    title: 'Steam Carpet Cleaning',
    description:
      'Our hot water extraction method penetrates deep into carpet fibres, removing embedded dirt, bacteria, and allergens. Leaves carpets fresh and fast-drying.',
    features: ['Deep penetration cleaning', 'Kills 99.9% of bacteria', 'Fast drying — 2–4 hours', 'Safe for all carpet types'],
    color: 'bg-blue-50 text-blue-600',
    highlight: true,
    tag: 'Most Popular',
  },
  {
    icon: Wind,
    title: 'Dry Carpet Cleaning',
    description:
      'Ideal for delicate carpets or when minimal drying time is needed. Our low-moisture cleaning system leaves carpets clean and ready to walk on immediately.',
    features: ['Ready to use immediately', 'Gentle on delicate fibres', 'No shrinkage or colour run', 'Perfect for commercial use'],
    color: 'bg-sky-50 text-sky-600',
    highlight: false,
    tag: null,
  },
  {
    icon: Sparkles,
    title: 'Stain & Odour Removal',
    description:
      'Stubborn stains and odours don\'t stand a chance. We treat wine, pet, coffee, mud and more using professional-grade enzymatic treatments.',
    features: ['Pet & urine odour treatment', 'Wine & coffee stain removal', 'Mould & mildew treatment', 'Odour neutralisation'],
    color: 'bg-purple-50 text-purple-600',
    highlight: false,
    tag: null,
  },
  {
    icon: Sofa,
    title: 'Upholstery Cleaning',
    description:
      'Revive your sofas, chairs, and ottomans. We safely clean all fabric types including linen, velvet, microfibre, and leather conditioning.',
    features: ['All fabric types treated', 'Leather cleaning & conditioning', 'Deodorising treatment', 'Protective coating available'],
    color: 'bg-orange-50 text-orange-600',
    highlight: false,
    tag: null,
  },
  {
    icon: Grid3X3,
    title: 'Tile & Grout Cleaning',
    description:
      'Restore the shine to your tiles and remove discolouration from grout lines. We use high-pressure steam to get grout back to its original colour.',
    features: ['High-pressure steam cleaning', 'Grout colour restoration', 'Sealing available', 'Kitchen & bathroom tiles'],
    color: 'bg-teal-50 text-teal-600',
    highlight: false,
    tag: null,
  },
  {
    icon: Building2,
    title: 'Commercial Cleaning',
    description:
      'Keep your workplace clean and professional. We offer flexible scheduling including after-hours and weekend services to minimise disruption.',
    features: ['Office & retail spaces', 'After-hours scheduling', 'Regular maintenance plans', 'Bulk & contract pricing'],
    color: 'bg-indigo-50 text-indigo-600',
    highlight: false,
    tag: 'Commercial',
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-gray-50 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="badge bg-blue-100 text-brand-blue mb-3">Our Services</span>
          <h2 className="section-title">Complete Cleaning Solutions</h2>
          <p className="section-subtitle mx-auto">
            From residential carpets to commercial spaces, we deliver professional results
            using industry-leading equipment and eco-friendly products.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={`card relative overflow-hidden group ${
                  service.highlight ? 'ring-2 ring-brand-blue shadow-blue-100' : ''
                }`}
              >
                {service.tag && (
                  <span
                    className={`absolute top-4 right-4 text-xs font-bold px-2 py-1 rounded-full ${
                      service.highlight
                        ? 'bg-brand-blue text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {service.tag}
                  </span>
                )}

                <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon size={22} />
                </div>

                <h3 className="text-lg font-bold text-brand-navy mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{service.description}</p>

                <ul className="space-y-1.5">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-blue flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="mt-5 inline-flex items-center text-sm font-semibold text-brand-blue hover:text-blue-700 transition-colors"
                >
                  Book This Service →
                </a>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Not sure which service you need? We&apos;ll help you decide.</p>
          <a href="tel:+6492345678" className="btn-primary">
            Call Us for Advice — (09) 234 5678
          </a>
        </div>
      </div>
    </section>
  );
}
