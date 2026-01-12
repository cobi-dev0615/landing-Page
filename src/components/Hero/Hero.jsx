import React, { useState } from 'react'
import EmailModal from './EmailModal'
import './Hero.css'

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCTAClick = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">ELA NÃO mata de uma vez.</h1>
          <p className="hero-subtext">
            Descubra a história de Beth Mirage e como o vício em apostas destrói vidas e famílias.
          </p>
          <button className="btn hero-cta" onClick={handleCTAClick}>
            Quero baixar o ebook agora
          </button>
        </div>
      </div>
      {isModalOpen && <EmailModal onClose={handleCloseModal} />}
    </section>
  )
}

export default Hero
