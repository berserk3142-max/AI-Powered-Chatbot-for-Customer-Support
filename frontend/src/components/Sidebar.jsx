import { NavLink } from 'react-router-dom';
import {
    IoHomeOutline,
    IoStatsChartOutline,
    IoSettingsOutline,
    IoHelpCircleOutline,
    IoSearchOutline,
    IoChatbubbleOutline,
    IoSparkles,
    IoAddOutline,
    IoChevronDownOutline,
    IoFolderOutline,
    IoLibraryOutline
} from 'react-icons/io5';

const Sidebar = () => {
    const navItems = [
        { to: '/', icon: IoHomeOutline, label: 'Home' },
        { to: '/analytics', icon: IoStatsChartOutline, label: 'Analytics' },
        { to: '/settings', icon: IoSettingsOutline, label: 'Settings' },
        { to: '/help', icon: IoHelpCircleOutline, label: 'Help' },
    ];

    const recentChats = [
        { id: 1, title: 'Pricing plans inquiry', category: 'Finance' },
        { id: 2, title: 'Refund request help', category: 'Payment' },
        { id: 3, title: 'Technical support', category: 'Support' },
        { id: 4, title: 'Feature suggestions', category: 'Feedback' },
    ];

    const handleNewChat = () => {
        window.location.href = '/';
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <IoSparkles />
                </div>
                <h1 className="sidebar-title">Axora<span>AI</span></h1>
            </div>

            <button className="new-chat-btn" onClick={handleNewChat}>
                <IoAddOutline size={20} />
                New Chat
            </button>

            <div className="search-bar">
                <IoSearchOutline />
                <input type="text" placeholder="Search conversations..." />
                <span className="search-shortcut">⌘K</span>
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `nav-item ${isActive ? 'active' : ''}`
                        }
                    >
                        <item.icon />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="history-section">
                <div className="history-label">Recent Conversations</div>
                {recentChats.map((chat) => (
                    <div key={chat.id} className="history-item">
                        <IoChatbubbleOutline />
                        <span>{chat.title}</span>
                    </div>
                ))}
            </div>

            <div className="sidebar-footer">
                <div className="user-profile">
                    <div className="user-avatar">U</div>
                    <div className="user-info">
                        <div className="user-name">User</div>
                        <div className="user-plan">Pro Plan</div>
                    </div>
                    <IoChevronDownOutline />
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
