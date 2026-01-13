import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p className="footer-text">
            © {new Date().getFullYear()} Beth Mirage. Todos os direitos reservados.
          </p>
          <div className="footer-links">
            <Link to="/termos-de-uso" className="footer-link">
              Termos de Uso
            </Link>
            <span className="footer-separator">|</span>
            <Link to="/politica-de-privacidade" className="footer-link">
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
