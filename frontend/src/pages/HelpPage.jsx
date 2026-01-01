import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    IoChevronDownOutline,
    IoHelpCircleOutline,
    IoBookOutline,
    IoChatbubbleOutline,
    IoMailOutline
} from 'react-icons/io5';

const HelpPage = () => {
    const [openFaq, setOpenFaq] = useState(null);

    const faqs = [
        {
            question: 'How does the AI chatbot work?',
            answer: 'Our chatbot uses a two-tier response system. First, it searches our Knowledge Base for instant answers to common questions. If no match is found, it uses GPT-4 AI to generate a helpful response while maintaining conversation context.'
        },
        {
            question: 'What can I ask the chatbot?',
            answer: 'You can ask about pricing, refunds, account issues, features, integrations, privacy policies, and general support questions. The chatbot is designed to handle a wide range of customer inquiries.'
        },
        {
            question: 'How is my data protected?',
            answer: 'All conversations are encrypted and stored securely. We are GDPR compliant and you can request data deletion at any time. Your data is never shared with third parties.'
        },
        {
            question: 'Can I talk to a human?',
            answer: 'Yes! While our AI handles most queries instantly, you can request human support during business hours. Simply ask to "speak to a human" or "contact support".'
        },
        {
            question: 'Why does the chatbot sometimes use AI fallback?',
            answer: 'When your question is not in our Knowledge Base, the chatbot uses GPT-4 to provide a helpful response. This ensures you always get an answer, even for unique questions.'
        }
    ];

    const resources = [
        {
            icon: IoBookOutline,
            title: 'Documentation',
            description: 'Read our comprehensive API docs',
            link: '#'
        },
        {
            icon: IoChatbubbleOutline,
            title: 'Community',
            description: 'Join our Discord community',
            link: '#'
        },
        {
            icon: IoMailOutline,
            title: 'Email Support',
            description: 'support@example.com',
            link: 'mailto:support@example.com'
        }
    ];

    return (
        <div className="analytics-page">
            <header className="analytics-header">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Help Center
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    Find answers to common questions and get support
                </motion.p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
                <motion.div
                    className="chart-card"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h3 className="chart-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <IoHelpCircleOutline />
                        Frequently Asked Questions
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                style={{
                                    background: 'var(--bg-tertiary)',
                                    borderRadius: '12px',
                                    overflow: 'hidden'
                                }}
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '1rem',
                                        background: 'transparent',
                                        border: 'none',
                                        color: 'var(--text-primary)',
                                        cursor: 'pointer',
                                        textAlign: 'left',
                                        fontWeight: '500'
                                    }}
                                >
                                    {faq.question}
                                    <motion.div
                                        animate={{ rotate: openFaq === index ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <IoChevronDownOutline />
                                    </motion.div>
                                </button>
                                <AnimatePresence>
                                    {openFaq === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            style={{
                                                padding: '0 1rem 1rem',
                                                color: 'var(--text-secondary)',
                                                fontSize: '0.9rem',
                                                lineHeight: '1.6'
                                            }}
                                        >
                                            {faq.answer}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="chart-card" style={{ marginBottom: '1.5rem' }}>
                        <h3 className="chart-title">Resources</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {resources.map((resource, index) => (
                                <a
                                    key={index}
                                    href={resource.link}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        padding: '1rem',
                                        background: 'var(--bg-tertiary)',
                                        borderRadius: '12px',
                                        textDecoration: 'none',
                                        color: 'inherit',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <resource.icon size={24} color="white" />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '600' }}>{resource.title}</div>
                                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                            {resource.description}
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="chart-card">
                        <h3 className="chart-title">💡 Quick Tips</h3>
                        <ul style={{
                            listStyle: 'none',
                            padding: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.75rem'
                        }}>
                            <li style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                • Use keywords like "refund" or "pricing" for instant answers
                            </li>
                            <li style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                • The chatbot remembers context from previous messages
                            </li>
                            <li style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                • Click quick reply buttons for common questions
                            </li>
                            <li style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                • Check the Analytics page to see chatbot performance
                            </li>
                        </ul>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default HelpPage;
