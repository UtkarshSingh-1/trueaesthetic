export interface ServiceData {
    slug: string;
    title: string;
    subtitle: string;
    tagline: string;
    description: string;
    color: string;
    benefits: string[];
    steps: { title: string; description: string }[];
    faqs: { q: string; a: string }[];
}

export const services: ServiceData[] = [
    {
        slug: 'injectables',
        title: 'Injectables',
        subtitle: 'Neurotoxins & Dermal Fillers',
        tagline: 'Natural enhancement through precision.',
        description:
            'Our injectable treatments use FDA-approved neurotoxins and dermal fillers to subtly soften lines, restore volume, and harmonize facial proportions — all while preserving your natural expression.',
        color: '#C6A87D',
        benefits: [
            'Immediate visible results',
            'No surgery or downtime',
            'Fully customizable dosage',
            'Natural-looking outcomes',
            'Lasts 4–18 months depending on product',
            'Board-certified practitioners only',
        ],
        steps: [
            {
                title: 'Personalized Consultation',
                description:
                    'We analyze your facial anatomy, discuss your goals, and design a tailored treatment map — never a one-size-fits-all approach.',
            },
            {
                title: 'Precise Treatment',
                description:
                    'Using ultra-fine needles and expert technique, we administer product at exact depths and doses for the most natural result possible.',
            },
            {
                title: 'Aftercare & Follow-up',
                description:
                    'We review results at your 2-week follow-up and make any necessary adjustments, ensuring you leave fully satisfied.',
            },
        ],
        faqs: [
            { q: 'Do injectables hurt?', a: 'Most patients feel minimal discomfort. We use topical numbing cream and ultra-fine needles to ensure comfort.' },
            { q: 'How long do results last?', a: 'Neurotoxins typically last 3–4 months; dermal fillers 6–18 months depending on the product and area treated.' },
            { q: 'Is there any downtime?', a: 'Little to none. Minor redness or swelling may appear for 24–48 hours. Most patients return to daily activities immediately.' },
        ],
    },
    {
        slug: 'skin-rejuvenation',
        title: 'Skin Rejuvenation',
        subtitle: 'Advanced Skin Treatments',
        tagline: 'Reveal your most radiant skin.',
        description:
            'Our skin rejuvenation protocols combine cutting-edge technologies — including laser resurfacing, chemical peels, microneedling, and PRP — to improve texture, tone, and overall skin vitality.',
        color: '#C6A87D',
        benefits: [
            'Improved skin texture & smoothness',
            'Reduced pigmentation & redness',
            'Minimized pores',
            'Boosted collagen production',
            'Brightened overall complexion',
            'Long-lasting results with proper care',
        ],
        steps: [
            {
                title: 'Skin Analysis',
                description:
                    'A detailed assessment of your skin type, concerns, and goals using clinical imaging to create the most effective protocol.',
            },
            {
                title: 'Targeted Treatment',
                description:
                    'We apply the optimal combination of modalities for your unique skin — from gentle peels to advanced laser or PRP therapy.',
            },
            {
                title: 'Recovery & Maintenance',
                description:
                    'We provide a personalized homecare routine and schedule follow-up sessions to maintain and enhance your results.',
            },
        ],
        faqs: [
            { q: 'Which treatment is right for my skin?', a: 'We assess your skin during the consultation and recommend the best combination of modalities for your specific concerns.' },
            { q: 'How many sessions will I need?', a: 'Most patients see noticeable improvement after 3–6 sessions, spaced 4 weeks apart.' },
            { q: 'Will my skin be sensitive after treatment?', a: 'Some treatments cause temporary redness for 24–72 hours. We guide you through recovery with a curated aftercare kit.' },
        ],
    },
    {
        slug: 'hair-restoration',
        title: 'Hair Restoration',
        subtitle: 'Regenerative Hair Therapies',
        tagline: 'Restore density. Restore confidence.',
        description:
            'Our regenerative hair restoration programs use PRP therapy, growth factor treatments, and medical-grade scalp protocols to stimulate natural hair growth and slow hair loss — without surgery.',
        color: '#C6A87D',
        benefits: [
            'Non-surgical, natural approach',
            'Stimulates your own hair follicles',
            'No systemic medications required',
            'Suitable for both men and women',
            'Improves density and thickness',
            'Minimal discomfort and no downtime',
        ],
        steps: [
            {
                title: 'Trichology Assessment',
                description:
                    'We examine your scalp health, hair density, and loss patterns using specialized imaging to identify the underlying cause.',
            },
            {
                title: 'Regenerative Treatment',
                description:
                    'PRP is prepared from your own blood and injected precisely into thinning areas to stimulate dormant follicles.',
            },
            {
                title: 'Maintenance Program',
                description:
                    'A personalized maintenance schedule and home-care regimen to maximize and sustain your hair restoration results.',
            },
        ],
        faqs: [
            { q: 'How many sessions are needed?', a: 'An initial series of 3 sessions (1 month apart) is recommended, followed by maintenance every 3–6 months.' },
            { q: 'When will I see results?', a: 'Most patients notice reduced shedding after the first session and visible regrowth after 3–4 months.' },
            { q: 'Is PRP safe?', a: 'Yes. PRP uses your own blood plasma, eliminating risk of allergic reaction. It\'s FDA-cleared and widely studied.' },
        ],
    },
    {
        slug: 'iv-wellness',
        title: 'IV Wellness',
        subtitle: 'Custom Nutrient Infusions',
        tagline: 'Vitality, radiance, and clarity — from within.',
        description:
            'Our IV wellness drips deliver a precise blend of vitamins, minerals, antioxidants, and amino acids directly into your bloodstream for 100% bioavailability — boosting energy, immunity, skin glow, and recovery.',
        color: '#C6A87D',
        benefits: [
            '100% nutrient bioavailability',
            'Immediate energy and mental clarity',
            'Enhanced skin brightness & hydration',
            'Immune system support',
            'Faster recovery from fatigue or illness',
            'Fully customized formulations',
        ],
        steps: [
            {
                title: 'Health & Wellness Consult',
                description:
                    'We review your health history, lifestyle, and goals to recommend the ideal IV formulation for your needs.',
            },
            {
                title: 'Comfortable Infusion',
                description:
                    'Relax in our private suite while your custom drip is administered by a registered nurse over 45–60 minutes.',
            },
            {
                title: 'Ongoing Wellness Plan',
                description:
                    'We design a regular infusion schedule tailored to your lifestyle — weekly, bi-weekly, or monthly maintenance.',
            },
        ],
        faqs: [
            { q: 'Is IV therapy safe?', a: 'Yes. All formulations are compounded by licensed pharmacies and administered by registered nurses under physician oversight.' },
            { q: 'How quickly will I feel the effects?', a: 'Most patients feel energized and refreshed within hours. Skin benefits are typically noticeable within 24–48 hours.' },
            { q: 'How often should I get IV drips?', a: 'Frequency depends on your goals. We typically recommend weekly or bi-weekly sessions for optimal ongoing results.' },
        ],
    },
    {
        slug: 'body-contouring',
        title: 'Body Contouring',
        subtitle: 'Non-Surgical Sculpting & Tightening',
        tagline: 'Shape your body. Naturally and safely.',
        description:
            'Our non-surgical body contouring treatments use advanced technologies — including cryolipolysis, radiofrequency, HIFU, and electromagnetic muscle stimulation — to reduce fat, tighten skin, and define contours without surgery or downtime.',
        color: '#C6A87D',
        benefits: [
            'No surgery, no anesthesia, no scars',
            'Targeted fat reduction',
            'Skin tightening and toning',
            'Visible results in 2–4 sessions',
            'Comfortable, non-invasive procedure',
            'Long-lasting with healthy lifestyle',
        ],
        steps: [
            {
                title: 'Body Assessment & Goal Setting',
                description:
                    'We evaluate your target areas, body composition, and desired outcome to design the most effective sculpting protocol.',
            },
            {
                title: 'Targeted Treatment',
                description:
                    'Advanced devices are applied to your treatment areas — precisely cooling, heating, or stimulating tissue to reshape and tighten.',
            },
            {
                title: 'Results & Maintenance',
                description:
                    'We photograph and assess results at follow-up, then recommend a maintenance plan to preserve and enhance your body contours.',
            },
        ],
        faqs: [
            { q: 'Is body contouring painful?', a: 'No. Treatments are comfortable — most patients describe a warm or cooling sensation. No anesthesia is required.' },
            { q: 'How many sessions do I need?', a: 'Most protocols involve 3–6 sessions spaced 2–4 weeks apart, depending on the treatment area and technology used.' },
            { q: 'How long do results last?', a: 'Fat cells destroyed are gone permanently. Maintaining a stable weight and healthy lifestyle preserves results long-term.' },
        ],
    },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
    return services.find((s) => s.slug === slug);
}
