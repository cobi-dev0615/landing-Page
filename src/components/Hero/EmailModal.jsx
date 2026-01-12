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
      const response = await subscribeForEbook(data.email)

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
              <label htmlFor="email">Endereço de Email</label>
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
