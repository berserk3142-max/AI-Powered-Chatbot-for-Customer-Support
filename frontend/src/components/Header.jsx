import { NavLink } from 'react-router-dom';
import {
    IoSearchOutline,
    IoHelpCircleOutline,
    IoSettingsOutline,
    IoNotificationsOutline,
    IoChevronDownOutline,
    IoCloudOutline
} from 'react-icons/io5';

const Header = () => {
    const navTabs = [
        { to: '/', label: 'Home' },
        { to: '/history', label: 'History' },
        { to: '/analytics', label: 'Updates' },
        { to: '/users', label: 'For users', hasDropdown: true },
        { to: '/queries', label: 'Queries' },
        { to: '/help', label: 'FAQs' },
    ];

    return (
        <header className="top-header">
            <div className="header-brand">
                <div className="brand-icon">
                    <IoCloudOutline />
                </div>
                <span className="brand-name">SupportBot</span>
            </div>

            <div className="header-search">
                <IoSearchOutline className="search-icon" />
                <input type="text" placeholder="Ask your question" />
            </div>

            <nav className="header-nav">
                {navTabs.map((tab) => (
                    <NavLink
                        key={tab.to}
                        to={tab.to}
                        className={({ isActive }) =>
                            `header-nav-tab ${isActive ? 'active' : ''}`
                        }
                    >
                        {tab.label}
                        {tab.hasDropdown && <IoChevronDownOutline className="dropdown-icon" />}
                    </NavLink>
                ))}
            </nav>

            <div className="header-actions-right">
                <button className="header-icon-btn">
                    <IoSearchOutline />
                </button>
                <button className="header-icon-btn">
                    <IoHelpCircleOutline />
                </button>
                <button className="header-icon-btn">
                    <IoSettingsOutline />
                </button>
                <button className="header-icon-btn">
                    <IoNotificationsOutline />
                </button>
                <div className="header-avatar">
                    <div className="avatar-circle"></div>
                </div>
            </div>
        </header>
    );
};

export default Header;
