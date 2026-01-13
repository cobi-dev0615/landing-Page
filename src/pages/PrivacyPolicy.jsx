import React from 'react'
import { Link } from 'react-router-dom'
import './LegalPages.css'

const PrivacyPolicy = () => {
  return (
    <div className="legal-page">
      <div className="container">
        <div className="legal-content">
          <h1>Política de Privacidade</h1>
          
          <p className="intro">
            A sua privacidade é importante para nós. É nossa política respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar em nosso site.
          </p>

          <section>
            <h2>Coleta de Dados</h2>
            <p>
              Solicitamos informações pessoais (como nome, e-mail e WhatsApp) apenas quando realmente precisamos delas para lhe fornecer um serviço ou material solicitado (como o nosso E-book).
            </p>
          </section>

          <section>
            <h2>Uso das Informações</h2>
            <p>
              Os dados coletados são utilizados para enviar o material solicitado e para comunicações futuras sobre atualizações de nossos serviços e software.
            </p>
          </section>

          <section>
            <h2>Retenção</h2>
            <p>
              Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado.
            </p>
          </section>

          <section>
            <h2>Compartilhamento</h2>
            <p>
              Não compartilhamos suas informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
            </p>
          </section>

          <section>
            <h2>Direitos do Usuário</h2>
            <p>
              Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.
            </p>
          </section>

          <div className="legal-footer">
            <Link to="/" className="back-link">← Voltar para a página inicial</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
