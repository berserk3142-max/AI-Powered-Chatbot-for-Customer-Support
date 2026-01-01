import { motion } from 'framer-motion';

const QuickReplies = ({ onSelect }) => {
    const suggestions = [
        { text: '💰 Refund Policy', query: 'What is your refund policy?' },
        { text: '💎 Pricing Plans', query: 'What are your pricing plans?' },
        { text: '🕐 Support Hours', query: 'What are your support hours?' },
        { text: '✨ Features', query: 'What features do you offer?' },
        { text: '🔗 API Integration', query: 'How can I integrate your API?' },
        { text: '🛡️ Privacy', query: 'How do you handle my data?' }
    ];

    return (
        <div className="quick-replies">
            {suggestions.map((item, index) => (
                <motion.button
                    key={index}
                    className="quick-reply"
                    onClick={() => onSelect(item.query)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {item.text}
                </motion.button>
            ))}
        </div>
    );
};

export default QuickReplies;
