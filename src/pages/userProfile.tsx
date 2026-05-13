import type React from "react";

// --- INLINE STYLES ---
const profileWrapper: React.CSSProperties = {
    maxWidth: "500px",
    padding: "2rem",
    background: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: "#1a1a1a",
    textAlign: "center",
    gridRow: 'span 2',
    gridColumn: 'span 1',
    width: '100%'
};

const avatarStyle: React.CSSProperties = {
    width: "110px",
    height: "110px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid #010a1b",
    marginBottom: "1rem"
};

const nameStyle: React.CSSProperties = {
    fontSize: "1.5rem",
    fontWeight: "700",
    margin: "0 0 0.25rem 0",
    color: "#010a1b"
};

const emailStyle: React.CSSProperties = {
    fontSize: "0.95rem",
    color: "#64748b",
    margin: "0 0 1.5rem 0"
};

const infoCardStyle: React.CSSProperties = {
    background: "#f8fafc",
    borderRadius: "12px",
    padding: "1.25rem",
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
};

const dataRowStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
    borderBottom: "1px solid #e2e8f0",
    paddingBottom: "0.75rem"
};

const labelStyle: React.CSSProperties = {
    fontSize: "0.8rem",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: "#94a3b8",
    fontWeight: "600"
};

const valueStyle: React.CSSProperties = {
    fontSize: "1rem",
    color: "#334155",
    fontWeight: "500"
};

export default function StaticUserProfile() {
    // Static mock data object (Replace values with live variables from your app)
    const userData = {
        name: "ElktrumElk",
        email: "elk@fedora.local",
        accountType: "Front-End Developer",
        joinedDate: "October 2023",
        bio: "Building responsive web platforms with clean UI on Fedora workstation environments."
    };

    return (
        <div style={profileWrapper}>
            {/* Top Presentation Block */}
            <img 
                src="unsplash.com" 
                alt="User Profile" 
                style={avatarStyle} 
            />
            <h2 style={nameStyle}>{userData.name}</h2>
            <p style={emailStyle}>{userData.email}</p>

            {/* Detailed Data List */}
            <div style={infoCardStyle}>
                <div style={dataRowStyle}>
                    <span style={labelStyle}>Role</span>
                    <span style={valueStyle}>{userData.accountType}</span>
                </div>

                <div style={dataRowStyle}>
                    <span style={labelStyle}>Member Since</span>
                    <span style={valueStyle}>{userData.joinedDate}</span>
                </div>

                <div style={{ ...dataRowStyle, borderBottom: "none", paddingBottom: 0 }}>
                    <span style={labelStyle}>Bio</span>
                    <span style={{ ...valueStyle, lineHeight: "1.5", fontSize: "0.95rem" }}>
                        {userData.bio}
                    </span>
                </div>
            </div>
        </div>
    );
}
