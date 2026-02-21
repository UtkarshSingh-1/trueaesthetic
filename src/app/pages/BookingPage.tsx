import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { useSearchParams, useNavigate } from 'react-router';
import { PageLayout } from '../components/PageLayout';
import { services } from '../data/services';
import { Calendar, User, Mail, Phone, MessageSquare, CheckCircle, ChevronDown } from 'lucide-react';

const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM',
];

export function BookingPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const preSelected = searchParams.get('service') || '';
    const formRef = useRef<HTMLFormElement>(null);

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        service: preSelected,
        date: '',
        time: '',
        message: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const update = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!form.name.trim()) newErrors.name = 'Full name is required';
        if (!form.email.trim()) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Please enter a valid email';
        if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!form.service) newErrors.service = 'Please select a service';
        if (!form.date) newErrors.date = 'Please choose a preferred date';
        if (!form.time) newErrors.time = 'Please choose a preferred time';
        return newErrors;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setSubmitting(true);
        // Simulate a short delay (replace with real API call when ready)
        setTimeout(() => {
            setSubmitting(false);
            setSubmitted(true);
        }, 1000);
    };

    // Min date = today
    const today = new Date().toISOString().split('T')[0];

    if (submitted) {
        return (
            <PageLayout>
                <div className="min-h-[80vh] flex items-center justify-center px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-lg w-full text-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                            className="w-24 h-24 bg-gradient-to-br from-[#C6A87D] to-[#F5E8DC] rounded-full flex items-center justify-center mx-auto mb-8"
                        >
                            <CheckCircle className="w-12 h-12 text-white" />
                        </motion.div>
                        <h2 className="text-4xl font-light mb-4">
                            You're <span className="italic text-[#C6A87D]">Booked</span>
                        </h2>
                        <p className="text-[#6B6661] text-lg mb-2">
                            Thank you, <strong>{form.name}</strong>!
                        </p>
                        <p className="text-[#6B6661] mb-8">
                            We've received your appointment request for <strong>{form.date}</strong> at <strong>{form.time}</strong>.
                            Our team will confirm via <strong>{form.email}</strong> within 24 hours.
                        </p>
                        <div className="bg-white rounded-3xl p-6 border border-[#C6A87D]/20 text-left mb-8 space-y-3 text-sm">
                            <div className="flex justify-between"><span className="text-[#6B6661]">Service</span><span className="font-medium">{services.find(s => s.slug === form.service)?.title || form.service}</span></div>
                            <div className="flex justify-between"><span className="text-[#6B6661]">Date</span><span className="font-medium">{form.date}</span></div>
                            <div className="flex justify-between"><span className="text-[#6B6661]">Time</span><span className="font-medium">{form.time}</span></div>
                            <div className="flex justify-between"><span className="text-[#6B6661]">Phone</span><span className="font-medium">{form.phone}</span></div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => navigate('/')}
                                className="px-8 py-4 bg-[#2D2A26] text-white rounded-full uppercase tracking-wider text-sm hover:bg-[#C6A87D] transition-colors"
                            >
                                Back to Home
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', service: '', date: '', time: '', message: '' }); }}
                                className="px-8 py-4 border-2 border-[#C6A87D] text-[#2D2A26] rounded-full uppercase tracking-wider text-sm hover:bg-[#C6A87D] hover:text-white transition-all"
                            >
                                Book Another
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </PageLayout>
        );
    }

    const inputClass = (field: string) =>
        `w-full px-4 py-3.5 bg-white border rounded-2xl text-[#2D2A26] placeholder-[#9B9690] focus:outline-none focus:ring-2 transition-all duration-200 ${errors[field]
            ? 'border-red-300 focus:ring-red-200'
            : 'border-[#E8DFD8] focus:ring-[#C6A87D]/30 focus:border-[#C6A87D]'
        }`;

    return (
        <PageLayout>
            {/* Hero */}
            <div className="relative bg-gradient-to-br from-[#F7F4F1] via-[#E8DFD8] to-[#F5E8DC] pt-16 pb-20 px-6 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#C6A87D]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#F5E8DC]/60 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
                </div>
                <div className="relative max-w-2xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <p className="text-[#C6A87D] uppercase tracking-widest text-sm mb-4">True Aesthetic Clinic</p>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light mb-4 leading-tight">
                            Book Your<br /><span className="italic text-[#C6A87D]">Consultation</span>
                        </h1>
                        <p className="text-[#6B6661] text-lg max-w-md mx-auto">
                            Take the first step toward natural, refined beauty. Fill in your details below and we'll confirm your appointment within 24 hours.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Form */}
            <div className="max-w-2xl mx-auto px-6 py-16">
                <motion.form
                    ref={formRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-[#2D2A26] mb-2">
                            <User className="w-4 h-4 inline mr-1.5 text-[#C6A87D]" />Full Name *
                        </label>
                        <input
                            type="text"
                            placeholder="Jane Smith"
                            value={form.name}
                            onChange={(e) => update('name', e.target.value)}
                            className={inputClass('name')}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    {/* Email & Phone */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[#2D2A26] mb-2">
                                <Mail className="w-4 h-4 inline mr-1.5 text-[#C6A87D]" />Email Address *
                            </label>
                            <input
                                type="email"
                                placeholder="jane@example.com"
                                value={form.email}
                                onChange={(e) => update('email', e.target.value)}
                                className={inputClass('email')}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#2D2A26] mb-2">
                                <Phone className="w-4 h-4 inline mr-1.5 text-[#C6A87D]" />Phone Number *
                            </label>
                            <input
                                type="tel"
                                placeholder="(555) 000-0000"
                                value={form.phone}
                                onChange={(e) => update('phone', e.target.value)}
                                className={inputClass('phone')}
                            />
                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                        </div>
                    </div>

                    {/* Service */}
                    <div>
                        <label className="block text-sm font-medium text-[#2D2A26] mb-2">
                            <ChevronDown className="w-4 h-4 inline mr-1.5 text-[#C6A87D]" />Service of Interest *
                        </label>
                        <div className="relative">
                            <select
                                value={form.service}
                                onChange={(e) => update('service', e.target.value)}
                                className={`${inputClass('service')} appearance-none pr-10 cursor-pointer`}
                            >
                                <option value="">Select a treatment</option>
                                {services.map((s) => (
                                    <option key={s.slug} value={s.slug}>
                                        {s.title} — {s.subtitle}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9B9690] pointer-events-none" />
                        </div>
                        {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
                    </div>

                    {/* Date & Time */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[#2D2A26] mb-2">
                                <Calendar className="w-4 h-4 inline mr-1.5 text-[#C6A87D]" />Preferred Date *
                            </label>
                            <input
                                type="date"
                                min={today}
                                value={form.date}
                                onChange={(e) => update('date', e.target.value)}
                                className={inputClass('date')}
                            />
                            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#2D2A26] mb-2">
                                <Calendar className="w-4 h-4 inline mr-1.5 text-[#C6A87D]" />Preferred Time *
                            </label>
                            <div className="relative">
                                <select
                                    value={form.time}
                                    onChange={(e) => update('time', e.target.value)}
                                    className={`${inputClass('time')} appearance-none pr-10 cursor-pointer`}
                                >
                                    <option value="">Select a time</option>
                                    {timeSlots.map((t) => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9B9690] pointer-events-none" />
                            </div>
                            {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
                        </div>
                    </div>

                    {/* Message */}
                    <div>
                        <label className="block text-sm font-medium text-[#2D2A26] mb-2">
                            <MessageSquare className="w-4 h-4 inline mr-1.5 text-[#C6A87D]" />Additional Notes
                            <span className="text-[#9B9690] font-normal ml-1">(optional)</span>
                        </label>
                        <textarea
                            rows={4}
                            placeholder="Any concerns, medical history, or questions you'd like us to know..."
                            value={form.message}
                            onChange={(e) => update('message', e.target.value)}
                            className={`${inputClass('message')} resize-none`}
                        />
                    </div>

                    {/* Info box */}
                    <div className="bg-[#C6A87D]/10 border border-[#C6A87D]/20 rounded-2xl p-4 text-sm text-[#6B6661]">
                        <p>📋 <strong>All consultations are confidential.</strong> We'll confirm your appointment via email within 24 hours. Mon–Fri 9AM–6PM, Sat 10AM–4PM.</p>
                    </div>

                    {/* Submit */}
                    <motion.button
                        type="submit"
                        whileHover={{ scale: submitting ? 1 : 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={submitting}
                        className={`w-full py-5 rounded-full uppercase tracking-wider text-sm font-medium transition-all duration-300 flex items-center justify-center gap-3 ${submitting
                                ? 'bg-[#C6A87D]/60 text-white cursor-not-allowed'
                                : 'bg-[#2D2A26] text-white hover:bg-[#C6A87D]'
                            }`}
                    >
                        {submitting ? (
                            <>
                                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Submitting...
                            </>
                        ) : (
                            <>
                                <Calendar className="w-5 h-5" />
                                Request Appointment
                            </>
                        )}
                    </motion.button>
                </motion.form>
            </div>
        </PageLayout>
    );
}
