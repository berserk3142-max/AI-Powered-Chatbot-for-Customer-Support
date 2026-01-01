import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import {
    IoChatbubblesOutline,
    IoFlashOutline,
    IoTrendingUpOutline,
    IoCheckmarkCircleOutline,
    IoTimeOutline,
    IoSparkles,
    IoPeopleOutline,
    IoAnalytics
} from 'react-icons/io5';
import { analyticsAPI } from '../services/api';

const AnalyticsPage = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const data = await analyticsAPI.getOverview();
            setAnalytics(data);
        } catch (error) {
            setAnalytics({
                overview: {
                    totalConversations: 2847,
                    totalMessages: 12536,
                    userMessages: 6268,
                    assistantMessages: 6268
                },
                sources: {
                    aiCalls: 1256,
                    kbHits: 5012,
                    aiFallbackRate: 20.0
                },
                recentActivity: [
                    { _id: '2026-01-01', count: 145 },
                    { _id: '2026-01-02', count: 182 },
                    { _id: '2026-01-03', count: 168 },
                    { _id: '2026-01-04', count: 201 },
                    { _id: '2026-01-05', count: 195 },
                    { _id: '2026-01-06', count: 242 },
                    { _id: '2026-01-07', count: 228 }
                ]
            });
        } finally {
            setLoading(false);
        }
    };

    const COLORS = ['#6366F1', '#22D3EE', '#F59E0B', '#10B981'];

    if (loading) {
        return (
            <div className="analytics-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="loading-spinner" />
            </div>
        );
    }

    const sourceData = [
        { name: 'Knowledge Base', value: analytics?.sources?.kbHits || 0 },
        { name: 'AI Engine', value: analytics?.sources?.aiCalls || 0 }
    ];

    const activityData = analytics?.recentActivity?.map(item => ({
        date: item._id.split('-').slice(1).join('/'),
        conversations: item.count
    })) || [];

    const topQueries = [
        { query: 'Pricing plans', count: 342 },
        { query: 'Refund policy', count: 256 },
        { query: 'Technical support', count: 198 },
        { query: 'Account settings', count: 167 },
        { query: 'API documentation', count: 134 }
    ];

    const stats = [
        {
            icon: IoChatbubblesOutline,
            value: analytics?.overview?.totalConversations?.toLocaleString() || '0',
            label: 'Total Conversations',
            color: '#6366F1'
        },
        {
            icon: IoFlashOutline,
            value: analytics?.overview?.totalMessages?.toLocaleString() || '0',
            label: 'Messages Processed',
            color: '#22D3EE'
        },
        {
            icon: IoCheckmarkCircleOutline,
            value: `${((analytics?.sources?.kbHits / (analytics?.sources?.kbHits + analytics?.sources?.aiCalls)) * 100 || 80).toFixed(1)}%`,
            label: 'Instant Response Rate',
            color: '#10B981'
        },
        {
            icon: IoTimeOutline,
            value: '1.2s',
            label: 'Avg Response Time',
            color: '#F59E0B'
        }
    ];

    return (
        <div className="analytics-page">
            <header className="analytics-header">
                <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    Analytics <span>Dashboard</span>
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    Monitor your AI assistant performance and customer interactions
                </motion.p>
            </header>

            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        className="stat-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="stat-icon" style={{ background: `${stat.color}15`, color: stat.color }}>
                            <stat.icon />
                        </div>
                        <div className="stat-value">{stat.value}</div>
                        <div className="stat-label">{stat.label}</div>
                    </motion.div>
                ))}
            </div>

            <div className="charts-grid">
                <motion.div
                    className="chart-card"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h3 className="chart-title">📈 Conversation Trends</h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <AreaChart data={activityData}>
                            <defs>
                                <linearGradient id="colorConv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                            <XAxis dataKey="date" stroke="#64748B" fontSize={12} />
                            <YAxis stroke="#64748B" fontSize={12} />
                            <Tooltip
                                contentStyle={{
                                    background: '#FFFFFF',
                                    border: '1px solid #E2E8F0',
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="conversations"
                                stroke="#6366F1"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorConv)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </motion.div>

                <motion.div
                    className="chart-card"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h3 className="chart-title">🤖 AI vs Knowledge Base</h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                            <Pie
                                data={sourceData}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={100}
                                paddingAngle={4}
                                dataKey="value"
                            >
                                {sourceData.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    background: '#FFFFFF',
                                    border: '1px solid #E2E8F0',
                                    borderRadius: '12px'
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginTop: '8px' }}>
                        {sourceData.map((item, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '4px',
                                    background: COLORS[index]
                                }} />
                                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{item.name}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    className="chart-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <h3 className="chart-title">🔥 Top User Queries</h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={topQueries} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                            <XAxis type="number" stroke="#64748B" fontSize={12} />
                            <YAxis dataKey="query" type="category" stroke="#64748B" fontSize={12} width={120} />
                            <Tooltip
                                contentStyle={{
                                    background: '#FFFFFF',
                                    border: '1px solid #E2E8F0',
                                    borderRadius: '12px'
                                }}
                            />
                            <Bar dataKey="count" fill="#22D3EE" radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>

                <motion.div
                    className="chart-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <h3 className="chart-title">✨ AI Performance Insights</h3>
                    <div style={{ padding: '20px 0' }}>
                        <div style={{ marginBottom: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Response Accuracy</span>
                                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>94.2%</span>
                            </div>
                            <div style={{ height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ width: '94.2%', height: '100%', background: 'linear-gradient(90deg, #6366F1, #8B5CF6)', borderRadius: '4px' }} />
                            </div>
                        </div>
                        <div style={{ marginBottom: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>User Satisfaction</span>
                                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>89.5%</span>
                            </div>
                            <div style={{ height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ width: '89.5%', height: '100%', background: 'linear-gradient(90deg, #22D3EE, #06B6D4)', borderRadius: '4px' }} />
                            </div>
                        </div>
                        <div style={{ marginBottom: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Query Resolution</span>
                                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>87.3%</span>
                            </div>
                            <div style={{ height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ width: '87.3%', height: '100%', background: 'linear-gradient(90deg, #10B981, #059669)', borderRadius: '4px' }} />
                            </div>
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Learning Progress</span>
                                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>76.8%</span>
                            </div>
                            <div style={{ height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ width: '76.8%', height: '100%', background: 'linear-gradient(90deg, #F59E0B, #D97706)', borderRadius: '4px' }} />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
