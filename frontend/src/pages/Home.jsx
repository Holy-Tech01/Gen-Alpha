import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [serverStatus, setServerStatus] = useState("Checking...");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    checkServerHealth();
    checkMobile();

    // Update on resize
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  const checkServerHealth = async () => {
  try {
    // Direct connection to backend (bypass proxy)
    const response = await axios.get('http://localhost:3002/api/health')
    setServerStatus(`Server: ${response.data.status} `)
  } catch (error) {
    setServerStatus(`Server: Offline - ${error.message}`)
  }
}

  // Mobile-optimized styles
  const containerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: "100vh",
    minWidth: "100vw",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: isMobile ? "10px" : "20px",
    margin: 0,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    overflow: "auto",
    WebkitOverflowScrolling: "touch", // Smooth scrolling on iOS
  };

  const contentStyle = {
    textAlign: "center",
    width: "100%",
    maxWidth: isMobile ? "95vw" : "400px",
    padding: isMobile ? "15px" : "20px",
    margin: 0,
  };

  const cardStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    borderRadius: isMobile ? "16px" : "20px",
    padding: isMobile ? "25px 20px" : "40px 32px",
    width: "100%",
    margin: "0 auto",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  };

  const logoStyle = {
    width: isMobile ? "70px" : "90px",
    height: isMobile ? "70px" : "90px",
    borderRadius: "50%",
    margin: "0 auto 20px auto",
    objectFit: "cover",
    border: "3px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
  };

  const titleStyle = {
    fontSize: isMobile ? "26px" : "32px",
    fontWeight: "700",
    color: "#1a202c",
    marginBottom: "8px",
    lineHeight: "1.2",
  };

  const subtitleStyle = {
    color: "#718096",
    marginBottom: "24px",
    fontSize: isMobile ? "15px" : "16px",
    lineHeight: "1.4",
    fontWeight: "500",
  };

  const statusStyle = {
    backgroundColor: "rgba(247, 250, 252, 0.8)",
    borderRadius: "12px",
    padding: isMobile ? "14px" : "16px",
    marginBottom: "24px",
    border: "1px solid #e2e8f0",
    backdropFilter: "blur(5px)",
  };

  const statusTextStyle = {
    fontSize: isMobile ? "14px" : "15px",
    color: "#2d3748",
    margin: 0,
    fontWeight: "600",
  };

  const buttonStyle = {
    backgroundColor: "#4299e1",
    color: "white",
    fontWeight: "600",
    padding: isMobile ? "14px 28px" : "16px 32px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontSize: isMobile ? "15px" : "16px",
    width: "100%",
    maxWidth: isMobile ? "100%" : "220px",
    margin: "0 auto",
    display: "block",
    boxShadow: "0 4px 12px rgba(66, 153, 225, 0.3)",
  };

  const footerStyle = {
    marginTop: isMobile ? "20px" : "30px",
    padding: isMobile ? "10px" : "15px",
  };

  const footerTextStyle = {
    fontSize: isMobile ? "11px" : "12px",
    color: "rgba(255, 255, 255, 0.8)",
    margin: "4px 0",
    fontWeight: "500",
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <div style={cardStyle}>
          <img
            src="/images/logo.png"
            alt="Gen Alpha Logo"
            style={logoStyle}
            onError={(e) => {
              // Fallback to gradient if image doesn't load
              e.target.style.display = "none";
              // You could add a fallback div here
            }}
          />

          <h1 style={titleStyle}>Gen Alpha</h1>

          <p style={subtitleStyle}>The future of social connection</p>

          <div style={statusStyle}>
            <p style={statusTextStyle}>{serverStatus}</p>
          </div>

          <button
            onClick={checkServerHealth}
            style={buttonStyle}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#3182ce";
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(66, 153, 225, 0.4)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#4299e1";
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 12px rgba(66, 153, 225, 0.3)";
            }}
            onTouchStart={(e) => {
              e.target.style.backgroundColor = "#3182ce";
              e.target.style.transform = "scale(0.98)";
            }}
            onTouchEnd={(e) => {
              e.target.style.backgroundColor = "#4299e1";
              e.target.style.transform = "scale(1)";
            }}
          >
            Check Connection
          </button>
        </div>

        {/* Footer */}
        <div style={footerStyle}>
          <p style={footerTextStyle}>
             Works on all devices • Mobile optimized
          </p>
          <p style={footerTextStyle}> Fast •  Secure • Free</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
