import type React from "react";
import { useState } from "react";
import { styleResponsive } from "../styles/responsivness";
import { userNotification } from "../data/user_notification";

// --- INLINE STYLES ---
const panelWrapper: React.CSSProperties = {
    width: "100%",
    height: "500px",
    background: "#ffffff",
    borderRadius: "16px",

    border: "1px solid #e2e8f0",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: "flex",
    flexDirection: "column",
    zIndex: 100,
    justifySelf: 'center'
};

const panelWrapperMobile: React.CSSProperties = {
    width: "90%",
    height: "500px",
    background: "#ffffff",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: "flex",
    flexDirection: "column",
    zIndex: 100,
    justifySelf: 'center'
};

const panelHeader: React.CSSProperties = {
    padding: "1rem 1.25rem",
    borderBottom: "1px solid #f1f5f9",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
};

const titleStyle: React.CSSProperties = {
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "#010a1b",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "8px"
};

const badgeStyle: React.CSSProperties = {
    background: "#ef4444",
    color: "#ffffff",
    fontSize: "0.75rem",
    fontWeight: "600",
    padding: "2px 8px",
    borderRadius: "20px"
};

const actionBtn: React.CSSProperties = {
    background: "none",
    border: "none",
    color: "#2563eb",
    fontSize: "0.85rem",
    fontWeight: "500",
    cursor: "pointer",
    padding: "4px 8px",
    borderRadius: "4px"
};

const listContainer: React.CSSProperties = {
    flexGrow: 1,
    overflowY: "auto", // Enables scrolling within the fixed panel boundaries
    padding: "0.5rem 0"
};

const itemStyle = (isUnread: boolean): React.CSSProperties => ({
    padding: "1rem 1.25rem",
    display: "flex",
    gap: "0.75rem",
    alignItems: "flex-start",
    backgroundColor: isUnread ? "#f8fafc" : "#ffffff",
    borderBottom: "1px solid #f1f5f9",
    cursor: "pointer",
    transition: "background-color 0.2s ease"
});

const indicatorStyle: React.CSSProperties = {
    width: "8px",
    height: "8px",
    background: "#2563eb",
    borderRadius: "50%",
    marginTop: "6px",
    flexShrink: 0
};

const contentWrapper: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
    flexGrow: 1
};

const messageStyle: React.CSSProperties = {
    fontSize: "0.9rem",
    color: "#334155",
    margin: 0,
    lineHeight: "1.4"
};

const timeStyle: React.CSSProperties = {
    fontSize: "0.75rem",
    color: "#94a3b8",
    margin: 0
};

const emptyState: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    color: "#94a3b8",
    fontSize: "0.95rem",
    gap: "0.5rem"
};

// --- TYPES ---
interface Notification {
    id: string;
    message: string;
    time: string;
    isUnread: boolean;
    type: "like" | "comment" | "system";
}


export default function NotificationPanel() {

    const { notify } = userNotification();
    const data = localStorage.getItem('data');
    const parsedData = data ? JSON.parse(data) : null;
    const userTag = parsedData?.usertag?.replace("@", '') || '';


    // Mock Database State Array
    const [notifications, setNotifications] = useState<Notification[]>(notify[userTag as keyof typeof notify] as Notification[] || []);
    const unreadCount = notifications.filter(n => n.isUnread).length;
    const { isMobile } = styleResponsive();

    // --- HANDLERS ---
    const handleMarkAsRead = (id: string) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, isUnread: false } : n)
        );
    };

    const handleMarkAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, isUnread: false })));
    };

    return (
        <div style={isMobile ? panelWrapperMobile : panelWrapper} className="notify-panel-miniDesktop">
            {/* Panel Top Heading Controls */}
            <div style={panelHeader}>
                <h3 style={titleStyle}>
                    Notifications
                    {unreadCount > 0 && <span style={badgeStyle}>{unreadCount}</span>}
                </h3>
                {unreadCount > 0 && (
                    <button style={actionBtn} onClick={handleMarkAllRead}>
                        Mark all read
                    </button>
                )}
            </div>

            {/* Main Notifications Scroll Window */}
            <div style={listContainer}>
                {notifications.length === 0 ? (
                    <div style={emptyState}>

                        <span>All caught up! No notifications.</span>
                    </div>
                ) : (
                    notifications.map((item) => (
                        <div
                            key={item.id}
                            style={itemStyle(item.isUnread)}
                            onClick={() => handleMarkAsRead(item.id)}
                        >
                            {/* Unread Active Blue Circle Indicator */}
                            {item.isUnread && <div style={indicatorStyle} />}

                            <div style={contentWrapper}>
                                <p style={messageStyle}>{item.message}</p>
                                <span style={timeStyle}>{item.time}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
