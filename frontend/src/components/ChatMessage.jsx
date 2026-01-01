import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { IoSparkles, IoPersonCircle } from 'react-icons/io5';

const ChatMessage = ({ message, isBot, timestamp }) => {
    return (
        <div className={`message-wrapper ${isBot ? 'bot' : 'user'}`}>
            {isBot ? (
                <div className="message-avatar bot-avatar">
                    <IoSparkles size={16} />
                </div>
            ) : (
                <div className="message-avatar user-avatar-icon">
                    <IoPersonCircle size={20} />
                </div>
            )}

            <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className={`message-bubble ${isBot ? 'message-bot' : 'message-user'}`}
            >
                {isBot ? (
                    <div className="message-content markdown-body">
                        <ReactMarkdown
                            components={{
                                h1: ({ children }) => <h1 className="md-h1">{children}</h1>,
                                h2: ({ children }) => <h2 className="md-h2">{children}</h2>,
                                h3: ({ children }) => <h3 className="md-h3">{children}</h3>,
                                strong: ({ children }) => <strong className="md-strong">{children}</strong>,
                                ul: ({ children }) => <ul className="md-ul">{children}</ul>,
                                ol: ({ children }) => <ol className="md-ol">{children}</ol>,
                                li: ({ children }) => <li className="md-li">{children}</li>,
                                code: ({ inline, children }) => (
                                    inline
                                        ? <code className="md-inline-code">{children}</code>
                                        : <code className="md-code-block">{children}</code>
                                ),
                                a: ({ href, children }) => (
                                    <a href={href} className="md-link" target="_blank" rel="noopener noreferrer">
                                        {children}
                                    </a>
                                ),
                                p: ({ children }) => <p className="md-paragraph">{children}</p>,
                            }}
                        >
                            {message}
                        </ReactMarkdown>
                    </div>
                ) : (
                    <span className="message-text">{message}</span>
                )}

                {timestamp && (
                    <span className="message-time">
                        {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                )}
            </motion.div>
        </div>
    );
};

export const TypingIndicator = () => {
    return (
        <div className="message-wrapper bot">
            <div className="message-avatar bot-avatar">
                <IoSparkles size={16} />
            </div>
            <motion.div
                className="typing-indicator-bubble"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
            >
                <div className="typing-dots">
                    <motion.span
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    />
                    <motion.span
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                    />
                    <motion.span
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                    />
                </div>
                <span className="typing-text">AI is thinking...</span>
            </motion.div>
        </div>
    );
};

export default ChatMessage;
