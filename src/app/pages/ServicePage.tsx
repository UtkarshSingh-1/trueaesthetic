import { useParams, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Check, Calendar, ChevronDown, ChevronUp, ArrowRight, Syringe, Sparkles, Scissors, Droplets, Waves } from 'lucide-react';
import { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { services, getServiceBySlug } from '../data/services';

const slugIcons: Record<string, React.ElementType> = {
    'injectables': Syringe,
    'skin-rejuvenation': Sparkles,
    'hair-restoration': Scissors,
    'iv-wellness': Droplets,
    'body-contouring': Waves,
};

export function ServicePage() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const service = getServiceBySlug(slug || '');
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    if (!service) {
        return (
            <PageLayout>
                <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
                    <h2 className="text-3xl font-light mb-4">Service Not Found</h2>
                    <p className="text-[#6B6661] mb-8">The service you're looking for doesn't exist.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-8 py-4 bg-[#2D2A26] text-white rounded-full uppercase tracking-wider text-sm hover:bg-[#C6A87D] transition-colors"
                    >
                        Back to Home
                    </button>
                </div>
            </PageLayout>
        );
    }

    const Icon = slugIcons[service.slug] || Sparkles;
    const serviceIndex = services.findIndex(s => s.slug === service.slug);
    const nextService = services[(serviceIndex + 1) % services.length];

    const handleBook = () => {
        navigate(`/book?service=${service.slug}`);
    };

    return (
        <PageLayout>
            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#2D2A26] via-[#3a3632] to-[#2D2A26] text-white py-24 px-6">
                {/* Ambient blobs */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C6A87D]/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C6A87D]/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
                </div>
                <div className="relative max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 rounded-full bg-[#C6A87D]/20 border border-[#C6A87D]/30 flex items-center justify-center">
                                <Icon className="w-7 h-7 text-[#C6A87D]" />
                            </div>
                            <p className="text-[#C6A87D] uppercase tracking-widest text-sm">{service.subtitle}</p>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-light mb-6 leading-tight">
                            {service.title}
                        </h1>
                        <p className="text-2xl sm:text-3xl text-[#C6A87D] italic font-light mb-8">
                            "{service.tagline}"
                        </p>
                        <p className="text-gray-300 text-lg max-w-2xl leading-relaxed mb-10">
                            {service.description}
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={handleBook}
                            className="px-8 py-4 bg-[#C6A87D] text-white rounded-full uppercase tracking-wider text-sm hover:bg-[#b89770] transition-colors flex items-center gap-3 w-fit"
                        >
                            <Calendar className="w-5 h-5" />
                            Book {service.title}
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-20 px-6 bg-[#F7F4F1]">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-12">
                            Why <span className="italic text-[#C6A87D]">{service.title}?</span>
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {service.benefits.map((benefit, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.07 }}
                                    className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-[#E8DFD8] hover:border-[#C6A87D]/40 transition-colors"
                                >
                                    <div className="w-8 h-8 rounded-full bg-[#C6A87D]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Check className="w-4 h-4 text-[#C6A87D]" />
                                    </div>
                                    <span className="text-[#2D2A26]">{benefit}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 px-6 bg-gradient-to-b from-[#E8DFD8] to-[#F7F4F1]">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-12">
                            How It <span className="italic text-[#C6A87D]">Works</span>
                        </h2>
                        <div className="flex flex-col gap-6">
                            {service.steps.map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="flex gap-6 items-start group"
                                >
                                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-[#C6A87D] to-[#F5E8DC] flex items-center justify-center text-white text-xl font-light shadow-md">
                                        {i + 1}
                                    </div>
                                    <div className="bg-white rounded-3xl p-6 flex-1 border border-[#E8DFD8] hover:border-[#C6A87D]/40 hover:shadow-md transition-all">
                                        <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                                        <p className="text-[#6B6661] leading-relaxed">{step.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-20 px-6 bg-[#F7F4F1]">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-12">
                            Common <span className="italic text-[#C6A87D]">Questions</span>
                        </h2>
                        <div className="space-y-3">
                            {service.faqs.map((faq, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.07 }}
                                    className="bg-white rounded-2xl border border-[#E8DFD8] overflow-hidden"
                                >
                                    <button
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#F7F4F1] transition-colors"
                                    >
                                        <span className="font-medium text-[#2D2A26] pr-4">{faq.q}</span>
                                        <motion.div
                                            animate={{ rotate: openFaq === i ? 180 : 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="flex-shrink-0"
                                        >
                                            <ChevronDown className="w-5 h-5 text-[#C6A87D]" />
                                        </motion.div>
                                    </button>
                                    <motion.div
                                        initial={false}
                                        animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
                                        transition={{ duration: 0.25 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-5 text-[#6B6661] leading-relaxed border-t border-[#E8DFD8] pt-4">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6 bg-gradient-to-br from-[#2D2A26] to-[#3a3632] text-white">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-light mb-3">
                            Ready to begin?
                        </h2>
                        <p className="text-gray-400">Book your personalized consultation today.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={handleBook}
                            className="px-8 py-4 bg-[#C6A87D] text-white rounded-full uppercase tracking-wider text-sm hover:bg-[#b89770] transition-colors flex items-center gap-2"
                        >
                            <Calendar className="w-4 h-4" />
                            Book {service.title}
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => navigate(`/services/${nextService.slug}`)}
                            className="px-8 py-4 border border-white/30 text-white rounded-full uppercase tracking-wider text-sm hover:border-[#C6A87D] hover:text-[#C6A87D] transition-all flex items-center gap-2"
                        >
                            Next: {nextService.title}
                            <ArrowRight className="w-4 h-4" />
                        </motion.button>
                    </div>
                </div>
            </section>

            {/* Other Services */}
            <section className="py-16 px-6 bg-[#F7F4F1]">
                <div className="max-w-4xl mx-auto">
                    <h3 className="text-2xl font-light mb-8 text-center">Explore Other Treatments</h3>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
                        {services
                            .filter(s => s.slug !== service.slug)
                            .map((s) => {
                                const SIcon = slugIcons[s.slug] || Sparkles;
                                return (
                                    <motion.button
                                        key={s.slug}
                                        onClick={() => navigate(`/services/${s.slug}`)}
                                        whileHover={{ y: -4 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="p-4 bg-white border border-[#E8DFD8] rounded-2xl text-center hover:border-[#C6A87D]/40 hover:shadow-md transition-all group"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-[#C6A87D]/10 flex items-center justify-center mx-auto mb-2 group-hover:bg-[#C6A87D] transition-colors">
                                            <SIcon className="w-5 h-5 text-[#C6A87D] group-hover:text-white transition-colors" />
                                        </div>
                                        <p className="text-sm font-medium text-[#2D2A26]">{s.title}</p>
                                    </motion.button>
                                );
                            })}
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}
