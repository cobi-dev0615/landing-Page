import React from 'react'
import { Link } from 'react-router-dom'
import './LegalPages.css'

const TermsOfUse = () => {
  return (
    <div className="legal-page">
      <div className="container">
        <div className="legal-content">
          <h1>Termos de Uso</h1>
          
          <p className="intro">
            Ao acessar este site, você concorda em cumprir estes termos de serviço:
          </p>

          <section>
            <h2>Licença de Conteúdo</h2>
            <p>
              É concedida permissão para baixar temporariamente uma cópia do material informativo (E-book) apenas para visualização pessoal e não comercial.
            </p>
          </section>

          <section>
            <h2>Isenção de Responsabilidade</h2>
            <p>
              O material em nosso site é fornecido "como está". Não oferecemos garantias de que os resultados estratégicos descritos no e-book serão idênticos para todos os usuários, pois dependem da execução individual.
            </p>
          </section>

          <section>
            <h2>Limitações</h2>
            <p>
              Em nenhum caso nós ou nossos fornecedores seremos responsáveis por quaisquer danos decorrentes do uso ou da incapacidade de usar o material em nosso site.
            </p>
          </section>

          <section>
            <h2>Precisão dos Materiais</h2>
            <p>
              Os materiais exibidos podem incluir erros técnicos ou tipográficos. Reservamo-nos o direito de fazer alterações nos materiais a qualquer momento, sem aviso prévio.
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

export default TermsOfUse
