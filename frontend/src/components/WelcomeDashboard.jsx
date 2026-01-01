import { motion } from 'framer-motion';
import {
    IoWalletOutline,
    IoTrendingUpOutline,
    IoHelpCircleOutline,
    IoRocketOutline,
    IoCodeSlashOutline,
    IoCalendarOutline
} from 'react-icons/io5';

const WelcomeDashboard = ({ onSuggestionClick }) => {
    const suggestions = [
        { icon: IoWalletOutline, text: 'Finance & Budget', query: 'Help me with finance and budgeting' },
        { icon: IoTrendingUpOutline, text: 'Track Expenses', query: 'How can I track my expenses?' },
        { icon: IoHelpCircleOutline, text: 'Get Support', query: 'I need help with your product' },
        { icon: IoRocketOutline, text: 'Product Features', query: 'What features do you offer?' },
        { icon: IoCodeSlashOutline, text: 'API Integration', query: 'How do I integrate your API?' },
        { icon: IoCalendarOutline, text: 'Schedule Demo', query: 'I want to schedule a demo' },
    ];

    return (
        <div className="welcome-dashboard">
            <motion.div
                className="welcome-mascot"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', duration: 0.8 }}
            >
                🤖
            </motion.div>

            <motion.div
                className="welcome-greeting"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <h1>How can I help you today?</h1>
                <p>Ask me anything or choose a suggestion below</p>
            </motion.div>

            <motion.div
                className="suggestion-chips"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                {suggestions.map((suggestion, index) => (
                    <motion.button
                        key={index}
                        className="chip"
                        onClick={() => onSuggestionClick(suggestion.query)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                    >
                        <suggestion.icon />
                        {suggestion.text}
                    </motion.button>
                ))}
            </motion.div>
        </div>
    );
};

export default WelcomeDashboard;
