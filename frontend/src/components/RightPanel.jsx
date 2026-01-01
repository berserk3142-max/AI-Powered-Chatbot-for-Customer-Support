import { useState } from 'react';
import {
    IoCalendarOutline,
    IoChevronBackOutline,
    IoChevronForwardOutline,
    IoStarOutline,
    IoFlameOutline,
    IoPeopleOutline
} from 'react-icons/io5';

const RightPanel = () => {
    const [currentDate] = useState(new Date(2023, 9, 1));

    const teamMembers = [
        { name: 'Sarah Johnson', status: 'Just rated our support!', icon: '⭐', count: 12, color: '#f59e0b' },
        { name: 'Mike Anderson', status: 'Celebrates 1 year with us!', icon: '🎉', count: 8, color: '#10b981' },
        { name: 'Emily Roberts', status: 'Just joined our support team!', icon: '👥', count: 6, color: '#8b5cf6' },
    ];

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const days = [];
        const startDay = firstDay === 0 ? 6 : firstDay - 1;

        for (let i = 0; i < startDay; i++) {
            days.push({ day: '', empty: true });
        }

        for (let i = 1; i <= daysInMonth; i++) {
            days.push({
                day: i,
                isToday: i === 15,
                isFriday: (startDay + i - 1) % 7 === 4,
                isWeekend: (startDay + i - 1) % 7 >= 5
            });
        }

        return days;
    };

    const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    const days = getDaysInMonth(currentDate);
    const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

    return (
        <aside className="right-panel">
            <div className="calendar-widget">
                <div className="calendar-header">
                    <h3>{monthName}</h3>
                    <IoCalendarOutline className="calendar-icon" />
                </div>

                <div className="calendar-weekdays">
                    {weekdays.map((day, i) => (
                        <span key={i} className={i >= 4 ? 'weekend' : ''}>{day}</span>
                    ))}
                </div>

                <div className="calendar-days">
                    {days.map((d, i) => (
                        <span
                            key={i}
                            className={`
                                calendar-day 
                                ${d.empty ? 'empty' : ''} 
                                ${d.isToday ? 'today' : ''}
                                ${d.isFriday ? 'friday' : ''}
                                ${d.isWeekend ? 'weekend' : ''}
                            `}
                        >
                            {d.day}
                        </span>
                    ))}
                </div>

                <div className="calendar-nav">
                    <button className="cal-nav-btn">
                        <IoChevronBackOutline />
                    </button>
                    <button className="cal-nav-btn">
                        <IoChevronForwardOutline />
                    </button>
                </div>
            </div>

            <div className="team-activity">
                {teamMembers.map((member, i) => (
                    <div key={i} className="team-member">
                        <div className="member-avatar" style={{ background: member.color }}>
                            {member.name.charAt(0)}
                        </div>
                        <div className="member-info">
                            <span className="member-name">{member.name}</span>
                            <span className="member-status">{member.status}</span>
                        </div>
                        <div className="member-badge">
                            <span>{member.icon}</span>
                            <span>{member.count}</span>
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default RightPanel;
