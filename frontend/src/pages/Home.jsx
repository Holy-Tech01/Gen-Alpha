import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWifi,
  faSignal,
  faMobile,
  faRocket,
  faShieldHalved,
  faCheck,
  faServer,
} from "@fortawesome/free-solid-svg-icons";
import "./Home.css";

const Home = () => {
  const [serverStatus, setServerStatus] = useState("Checking...");
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    checkServerHealth();
  }, []);

  const checkServerHealth = async () => {
    try {
      const response = await axios.get(
        "https://gen-alpha-3acd.onrender.com/api/health"
      );
      setServerStatus(`Server: ${response.data.status}`);
      setIsOnline(true);
    } catch (error) {
      setServerStatus(`Server: Offline`);
      setIsOnline(false);
    }
  };

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <div className="main-card">
          {/* Your Custom Logo */}
          <img
            src="/images/logo.png"
            alt="Gen Alpha Logo"
            className="logo-image"
            onError={(e) => {
              // Fallback if image doesn't load
              e.target.style.display = "none";
              const fallback = document.createElement("div");
              fallback.className = "logo-fallback";
              fallback.textContent = "α";
              e.target.parentNode.insertBefore(fallback, e.target);
            }}
          />

          <h1 className="app-title">Gen Alpha</h1>

          <p className="app-subtitle">The future of social connection</p>

          {/* Status with Font Awesome Icons */}
          <div
            className={`status-container ${isOnline ? "online" : "offline"}`}
          >
            <FontAwesomeIcon
              icon={isOnline ? faCheck : faServer}
              className={`status-icon ${isOnline ? "online" : "offline"}`}
            />
            <p className="status-text">{serverStatus}</p>
          </div>

          {/* Button with Font Awesome Icon */}
          <button onClick={checkServerHealth} className="connection-button">
            <FontAwesomeIcon icon={faRocket} className="button-icon" />
            Check Connection
          </button>
        </div>

        {/* Footer with Font Awesome Icons */}
        <div className="footer">
          <p className="footer-text">
            <FontAwesomeIcon icon={faMobile} className="footer-icon" />
            Works on all devices • Mobile optimized
          </p>
          <p className="footer-text">
            <FontAwesomeIcon icon={faRocket} className="footer-icon" />
            Fast •
            <FontAwesomeIcon icon={faShieldHalved} className="footer-icon" />
            Secure •<span className="free-text">Free</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
