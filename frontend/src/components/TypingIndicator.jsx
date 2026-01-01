import { motion } from 'framer-motion';

const TypingIndicator = () => {
    return (
        <motion.div
            className="typing-indicator"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3 }}
        >
            <div className="typing-dots">
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
            </div>
            <span className="typing-text">AI is thinking...</span>
        </motion.div>
    );
};

export default TypingIndicator;
