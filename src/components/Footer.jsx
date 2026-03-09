import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-top">
        <ul className="footer-nav">
          <li><a href="/" className="footer-link">About Us</a></li>
          <li><a href="/" className="footer-link">Contact</a></li>
          <li><a href="/" className="footer-link">FAQ</a></li>
          <li><a href="/" className="footer-link">Privacy</a></li>
        </ul>

        <button className="btn-footer-cta">Sign Up</button>
      </div>

      <div className="footer-divider"></div>

      <div className="footer-bottom">
        <div className="footer-brand">
          <p>© 2026 La Tiendita. Todos los derechos reservados.</p>
        </div>

        <div className="footer-socials">
          <span>❤️</span>
          <span>📸</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;