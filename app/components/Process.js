import { Phone, CalendarCheck, Sparkles, ThumbsUp } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: Phone,
    title: 'Get a Free Quote',
    description:
      'Call us or fill in our online form. We\'ll ask a few quick questions and give you a clear, upfront price — no obligation, no hidden costs.',
    color: 'bg-blue-500',
  },
  {
    step: '02',
    icon: CalendarCheck,
    title: 'Book Your Appointment',
    description:
      'Choose a time that suits you — morning, afternoon, or weekend. We\'ll confirm your booking immediately and send a reminder before we arrive.',
    color: 'bg-purple-500',
  },
  {
    step: '03',
    icon: Sparkles,
    title: 'We Clean Your Carpets',
    description:
      'Our trained technicians arrive on time with truck-mount equipment. We pre-treat stains, deep clean, and leave your home fresh and tidy.',
    color: 'bg-teal-500',
  },
  {
    step: '04',
    icon: ThumbsUp,
    title: 'Enjoy Fresh Results',
    description:
      'Admire your clean, fresh carpets. They\'ll be dry within 2–4 hours. If you\'re not 100% satisfied, we\'ll come back and re-clean at no charge.',
    color: 'bg-green-500',
  },
];

export default function Process() {
  return (
    <section id="process" className="bg-gray-50 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="badge bg-purple-100 text-purple-700 mb-3">How It Works</span>
          <h2 className="section-title">Simple, Hassle-Free Booking</h2>
          <p className="section-subtitle mx-auto">
            Getting your carpets professionally cleaned is easier than you think. Here&apos;s how our
            simple 4-step process works.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mb-16">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 via-teal-200 to-green-200 mx-20" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="flex flex-col items-center text-center group">
                  {/* Step circle */}
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 rounded-full ${step.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform z-10 relative`}>
                      <Icon size={28} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white shadow-md border-2 border-gray-100 flex items-center justify-center text-xs font-bold text-gray-700">
                      {step.step}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-brand-navy mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Photo strip */}
        <div className="grid grid-cols-3 gap-4 mb-14 rounded-3xl overflow-hidden shadow-md">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=75&auto=format&fit=crop"
            alt="Carpet cleaning technician with wand"
            className="w-full h-48 object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1527515545081-5db817172677?w=500&q=75&auto=format&fit=crop"
            alt="Hot water extraction carpet cleaning in progress"
            className="w-full h-48 object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&q=75&auto=format&fit=crop"
            alt="Clean fresh carpet after professional cleaning"
            className="w-full h-48 object-cover"
          />
        </div>

        {/* CTA */}
        <div className="mt-4 text-center">
          <a href="#contact" className="btn-primary text-base px-8 py-4">
            Start the Process &mdash; Get a Free Quote
          </a>
        </div>
      </div>
    </section>
  );
}
