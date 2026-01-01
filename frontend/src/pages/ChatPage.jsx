import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import io from 'socket.io-client';
import ChatMessage, { TypingIndicator } from '../components/ChatMessage';
import WelcomeDashboard from '../components/WelcomeDashboard';
import {
    IoSparkles,
    IoAddOutline,
    IoMicOutline,
    IoSend
} from 'react-icons/io5';

const socket = io('http://localhost:5000');

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const [userId] = useState(() => localStorage.getItem('userId') || `user_${Date.now()}`);

    useEffect(() => {
        localStorage.setItem('userId', userId);

        socket.on('connect', () => {
            console.log('Connected to socket server');
        });

        return () => {
            socket.off('connect');
        };
    }, [userId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async (messageText = input) => {
        if (!messageText.trim()) return;

        const userMsg = messageText.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setIsLoading(true);

        try {
            const res = await axios.post('http://localhost:5000/api/chat/message', {
                userId: userId,
                message: userMsg
            });

            if (res.data && res.data.reply) {
                setMessages(prev => [...prev, { role: 'assistant', content: res.data.reply }]);
            } else {
                setMessages(prev => [...prev, { role: 'assistant', content: "I received your message!" }]);
            }
        } catch (error) {
            console.error('Chat Error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "Sorry, I couldn't connect to the server. Please try again."
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const handleSuggestionClick = (query) => {
        sendMessage(query);
    };

    if (messages.length === 0 && !isLoading) {
        return (
            <div className="chat-container">
                <WelcomeDashboard onSuggestionClick={handleSuggestionClick} />

                <div className="input-area">
                    <div className="chat-input-wrapper">
                        <button className="input-icon-btn">
                            <IoAddOutline size={20} />
                        </button>
                        <input
                            ref={inputRef}
                            className="chat-input"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask me anything..."
                            disabled={isLoading}
                        />
                        <button className="input-icon-btn">
                            <IoMicOutline size={20} />
                        </button>
                        <motion.button
                            className="send-button"
                            onClick={() => sendMessage()}
                            disabled={!input.trim() || isLoading}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <IoSend />
                        </motion.button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="chat-container">
            <div className="chat-header">
                <div className="chat-header-avatar">
                    <IoSparkles />
                </div>
                <div className="chat-header-info">
                    <h3>Axora AI Assistant</h3>
                    <p>● Online</p>
                </div>
            </div>

            <div className="messages-area">
                {messages.map((m, i) => (
                    <ChatMessage
                        key={i}
                        message={m.content}
                        isBot={m.role === 'assistant'}
                    />
                ))}

                {isLoading && (
                    <div className="message-wrapper bot">
                        <div className="message-avatar">
                            <IoSparkles size={14} />
                        </div>
                        <div className="typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="input-area">
                <div className="chat-input-wrapper">
                    <button className="input-icon-btn">
                        <IoAddOutline size={20} />
                    </button>
                    <input
                        ref={inputRef}
                        className="chat-input"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me anything..."
                        disabled={isLoading}
                    />
                    <button className="input-icon-btn">
                        <IoMicOutline size={20} />
                    </button>
                    <motion.button
                        className="send-button"
                        onClick={() => sendMessage()}
                        disabled={!input.trim() || isLoading}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <IoSend />
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
