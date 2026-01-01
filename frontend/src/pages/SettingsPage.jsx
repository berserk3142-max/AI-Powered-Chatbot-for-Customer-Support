import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    IoMoonOutline,
    IoNotificationsOutline,
    IoTrashOutline,
    IoKeyOutline
} from 'react-icons/io5';

const SettingsPage = () => {
    const [settings, setSettings] = useState({
        darkMode: true,
        notifications: true,
        soundEnabled: true,
        autoScroll: true
    });

    const toggleSetting = (key) => {
        setSettings(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const clearHistory = () => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            localStorage.removeItem('sessionId');
            alert('Chat history cleared! Refresh to start a new session.');
        }
    };

    return (
        <div className="analytics-page">
            <header className="analytics-header">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Settings
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    Customize your chat experience
                </motion.p>
            </header>

            <div style={{ maxWidth: '600px' }}>
                <motion.div
                    className="chart-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ marginBottom: '1.5rem' }}
                >
                    <h3 className="chart-title">Appearance</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <SettingItem
                            icon={IoMoonOutline}
                            label="Dark Mode"
                            description="Use dark theme for the interface"
                            isEnabled={settings.darkMode}
                            onToggle={() => toggleSetting('darkMode')}
                        />
                    </div>
                </motion.div>

                <motion.div
                    className="chart-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{ marginBottom: '1.5rem' }}
                >
                    <h3 className="chart-title">Notifications</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <SettingItem
                            icon={IoNotificationsOutline}
                            label="Push Notifications"
                            description="Receive notifications for new messages"
                            isEnabled={settings.notifications}
                            onToggle={() => toggleSetting('notifications')}
                        />
                        <SettingItem
                            icon={IoNotificationsOutline}
                            label="Sound"
                            description="Play sound on new messages"
                            isEnabled={settings.soundEnabled}
                            onToggle={() => toggleSetting('soundEnabled')}
                        />
                    </div>
                </motion.div>

                <motion.div
                    className="chart-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h3 className="chart-title">Data & Privacy</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <button
                            onClick={clearHistory}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '1rem',
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                borderRadius: '12px',
                                color: '#EF4444',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            <IoTrashOutline size={24} />
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontWeight: '600' }}>Clear Chat History</div>
                                <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                                    Delete all your conversations
                                </div>
                            </div>
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    className="chart-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    style={{ marginTop: '1.5rem' }}
                >
                    <h3 className="chart-title">API Configuration</h3>
                    <div style={{
                        padding: '1rem',
                        background: 'rgba(79, 70, 229, 0.1)',
                        borderRadius: '12px',
                        border: '1px solid rgba(79, 70, 229, 0.2)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                            <IoKeyOutline size={20} color="var(--accent)" />
                            <span style={{ fontWeight: '600' }}>OpenAI API Key</span>
                        </div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            Configure your OpenAI API key in the backend <code>.env</code> file to enable AI responses.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const SettingItem = ({ icon: Icon, label, description, isEnabled, onToggle }) => (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem',
            background: 'var(--bg-tertiary)',
            borderRadius: '12px'
        }}
    >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Icon size={24} color="var(--accent)" />
            <div>
                <div style={{ fontWeight: '500' }}>{label}</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    {description}
                </div>
            </div>
        </div>
        <motion.button
            onClick={onToggle}
            whileTap={{ scale: 0.9 }}
            style={{
                width: '48px',
                height: '28px',
                borderRadius: '14px',
                background: isEnabled
                    ? 'linear-gradient(135deg, var(--primary), var(--accent))'
                    : 'var(--bg-primary)',
                border: isEnabled ? 'none' : '1px solid var(--bg-tertiary)',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.2s'
            }}
        >
            <motion.div
                animate={{ x: isEnabled ? 22 : 2 }}
                style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: 'white',
                    position: 'absolute',
                    top: '3px'
                }}
            />
        </motion.button>
    </div>
);

export default SettingsPage;
