import { NavLink } from 'react-router-dom';
import {
    IoHomeOutline,
    IoCloudOutline,
    IoShareSocialOutline
} from 'react-icons/io5';

const IconSidebar = () => {
    const icons = [
        { to: '/', icon: IoHomeOutline, label: 'Home' },
        { to: '/analytics', icon: IoCloudOutline, label: 'Cloud' },
        { to: '/share', icon: IoShareSocialOutline, label: 'Share' },
    ];

    return (
        <aside className="icon-sidebar">
            {icons.map((item) => (
                <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                        `icon-sidebar-btn ${isActive ? 'active' : ''}`
                    }
                    title={item.label}
                >
                    <item.icon />
                </NavLink>
            ))}
        </aside>
    );
};

export default IconSidebar;
