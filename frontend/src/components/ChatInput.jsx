import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoSend } from 'react-icons/io5';

const ChatInput = ({ onSend, disabled }) => {
    const [message, setMessage] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (message.trim() && !disabled) {
            onSend(message.trim());
            setMessage('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const handleInput = (e) => {
        const target = e.target;
        target.style.height = 'auto';
        target.style.height = Math.min(target.scrollHeight, 120) + 'px';
    };

    return (
        <div className="chat-input-container">
            <form onSubmit={handleSubmit} className="chat-input-wrapper">
                <textarea
                    ref={inputRef}
                    className="chat-input"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    onInput={handleInput}
                    placeholder="Type your message..."
                    disabled={disabled}
                    rows={1}
                />
                <motion.button
                    type="submit"
                    className="send-button"
                    disabled={!message.trim() || disabled}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <IoSend />
                </motion.button>
            </form>
        </div>
    );
};

export default ChatInput;
