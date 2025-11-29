import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWifi,
  faSignal,
  faMobile,
  faRocket,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { faReact } from "@fortawesome/free-brands-svg-icons";
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
          <div className="logo-container">
            <FontAwesomeIcon icon={faReact} className="logo-icon" />
          </div>

          <h1 className="app-title">Gen Alpha</h1>

          <p className="app-subtitle">The future of social connection</p>

          <div
            className={`status-container ${isOnline ? "online" : "offline"}`}
          >
            <FontAwesomeIcon
              icon={isOnline ? faSignal : faWifi}
              className={`status-icon ${isOnline ? "online" : "offline"}`}
            />
            <p className="status-text">{serverStatus}</p>
          </div>

          <button onClick={checkServerHealth} className="connection-button">
            <FontAwesomeIcon icon={faRocket} className="button-icon" />
            Check Connection
          </button>
        </div>

        {/* Footer */}
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
