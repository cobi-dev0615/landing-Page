import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { subscribeForEbook } from '../../services/emailService'
import './EmailModal.css'

const EmailModal = ({ onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await subscribeForEbook({
        name: data.name,
        email: data.email,
        phone: data.phone
      })

      if (response.success) {
        setSubmitStatus('success')
        // Close modal after 2 seconds on success
        setTimeout(() => {
          onClose()
        }, 2000)
      }
    } catch (error) {
      console.error('Error submitting email:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Fechar">
          ×
        </button>
        
        <h2 className="modal-title">Baixar o E-book</h2>
        <p className="modal-description">
          Digite seu email para receber o e-book "Nas Garras de Beth Mirage" instantaneamente.
        </p>

        {submitStatus === 'success' ? (
          <div className="modal-success">
            <p>✓ Email enviado! Verifique sua caixa de entrada para o e-book.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="email-form">
            <div className="form-group">
              <label htmlFor="name">Nome (ou como deseja ser chamado)</label>
              <input
                type="text"
                id="name"
                {...register('name', {
                  required: 'Nome é obrigatório'
                })}
                placeholder="Seu nome ou como deseja ser chamado"
                disabled={isSubmitting}
              />
              {errors.name && (
                <span className="error-message">{errors.name.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                {...register('email', {
                  required: 'Email é obrigatório',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Endereço de email inválido'
                  }
                })}
                placeholder="seu.email@exemplo.com"
                disabled={isSubmitting}
              />
              {errors.email && (
                <span className="error-message">{errors.email.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone">WhatsApp/Telefone</label>
              <input
                type="tel"
                id="phone"
                {...register('phone', {
                  required: 'WhatsApp/Telefone é obrigatório',
                  pattern: {
                    value: /^[\d\s\(\)\-\+]+$/,
                    message: 'Formato de telefone inválido'
                  },
                  minLength: {
                    value: 10,
                    message: 'Telefone deve ter pelo menos 10 dígitos'
                  }
                })}
                placeholder="(11) 99999-9999"
                disabled={isSubmitting}
              />
              {errors.phone && (
                <span className="error-message">{errors.phone.message}</span>
              )}
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  {...register('consent', {
                    required: 'Você precisa concordar para receber o e-book'
                  })}
                  disabled={isSubmitting}
                  className="checkbox-input"
                />
                <span className="checkbox-text">
                  Concordo em receber conteúdo de apoio deste projeto
                </span>
              </label>
              {errors.consent && (
                <span className="error-message">{errors.consent.message}</span>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar E-book'}
            </button>

            {submitStatus === 'error' && (
              <p className="error-message">
                Ocorreu um erro. Por favor, tente novamente mais tarde.
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  )
}

export default EmailModal
