import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    location: 'Remuera, Auckland',
    rating: 5,
    text: 'I cannot believe the transformation! My carpet looks brand new. The team was professional, punctual, and incredibly thorough. Will definitely use again.',
    service: 'Steam Carpet Cleaning',
    avatar: 'SM',
    color: 'bg-blue-500',
  },
  {
    name: 'James & Lisa Chen',
    location: 'Ponsonby, Auckland',
    rating: 5,
    text: 'We had a serious red wine stain that we thought was permanent. Auckland Carpet Care removed it completely! Absolutely amazing service. Fast and friendly.',
    service: 'Stain Removal',
    avatar: 'JC',
    color: 'bg-purple-500',
  },
  {
    name: 'Mark Thompson',
    location: 'Takapuna, Auckland',
    rating: 5,
    text: 'Used them for our office space. They came in, minimal disruption, and the results were outstanding. Highly recommend for commercial cleaning.',
    service: 'Commercial Cleaning',
    avatar: 'MT',
    color: 'bg-teal-500',
  },
  {
    name: 'Emma Parekura',
    location: 'Henderson, Auckland',
    rating: 5,
    text: 'My two dogs had really done a number on the living room carpet. The team removed the odour completely and the carpet looks amazing. Very impressed!',
    service: 'Odour Removal',
    avatar: 'EP',
    color: 'bg-orange-500',
  },
  {
    name: 'David & Karen Walsh',
    location: 'Botany, Auckland',
    rating: 5,
    text: 'Booked for a house move clean. Same-day service, turned up on time, and did a brilliant job on both the carpets and the upholstery. Price was very fair.',
    service: 'Carpet & Upholstery',
    avatar: 'DW',
    color: 'bg-green-500',
  },
  {
    name: 'Priya Sharma',
    location: 'Manukau, Auckland',
    rating: 5,
    text: 'Professional equipment, eco-friendly products, and superb results. The technician was knowledgeable and really took care with our carpet. Highly recommend.',
    service: 'Steam Carpet Cleaning',
    avatar: 'PS',
    color: 'bg-indigo-500',
  },
];

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="badge bg-yellow-100 text-yellow-700 mb-3">Customer Reviews</span>
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle mx-auto">
            Here&apos;s what Auckland homeowners and businesses have to say
            about their experience with us.
          </p>

          {/* Overall rating */}
          <div className="inline-flex items-center gap-3 mt-6 bg-gray-50 rounded-2xl px-6 py-3">
            <div className="text-4xl font-black text-brand-navy">5.0</div>
            <div>
              <div className="flex gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <div className="text-sm text-gray-600">Rated 5 stars by our customers</div>
            </div>
          </div>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="card relative overflow-hidden group hover:border hover:border-blue-100"
            >
              <Quote size={32} className="text-gray-100 absolute top-4 right-4" />

              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full ${t.color} text-white flex items-center justify-center font-bold text-sm flex-shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-brand-navy">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.location}</div>
                </div>
              </div>

              <StarRating count={t.rating} />

              <p className="mt-3 text-gray-600 text-sm leading-relaxed italic">
                &quot;{t.text}&quot;
              </p>

              <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-brand-blue bg-blue-50 px-2 py-1 rounded-full">
                {t.service}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm mb-4">
            Ready to experience the difference? Get your free quote today.
          </p>
          <a href="#contact" className="btn-primary">
            Book Your Clean Today
          </a>
        </div>
      </div>
    </section>
  );
}
