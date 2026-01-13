import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { submitStory } from '../../services/emailService'
import './StoryForm.css'

const StoryForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm()
  
  const identificationType = watch('identificationType')

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Prepare submission data based on identification type
      const submissionData = {
        identificationType: data.identificationType,
        story: data.story,
        ...(data.identificationType === 'realName' && { name: data.name }),
        ...(data.identificationType === 'pseudonym' && { pseudonym: data.pseudonym }),
        ...(data.email && { email: data.email })
      }

      const response = await submitStory(submissionData)

      if (response.success) {
        setSubmitStatus('success')
        reset()
        // Reset status after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null)
        }, 5000)
      }
    } catch (error) {
      console.error('Error submitting story:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="section story-form-section">
      <div className="container">
        <div className="story-form-container">
          <h2 className="story-form-title">Envie seu Relato</h2>
          <p className="story-form-subtitle">
            Aqui, a privacidade é a prioridade máxima. Você não precisa estar logado para desabafar.
          </p>

          {submitStatus === 'success' && (
            <div className="form-success-message">
              <p>✓ Sua história foi enviada. Obrigado por compartilhar sua voz.</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="form-error-message">
              <p>Ocorreu um erro. Por favor, tente novamente mais tarde.</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="story-form">
            <div className="form-group">
              <label htmlFor="identificationType">Tipo de Identificação</label>
              <select
                id="identificationType"
                {...register('identificationType', {
                  required: 'Por favor, selecione um tipo de identificação'
                })}
                className="form-select"
                disabled={isSubmitting}
                defaultValue="realName"
              >
                <option value="realName">Quero usar meu nome real.</option>
                <option value="pseudonym">Quero usar um pseudônimo.</option>
                <option value="anonymous">Prefiro ser completamente anônimo.</option>
              </select>
              {errors.identificationType && (
                <span className="error-message">{errors.identificationType.message}</span>
              )}
            </div>

            {identificationType === 'realName' && (
              <div className="form-group">
                <label htmlFor="name">Seu Nome/Nickname</label>
                <input
                  type="text"
                  id="name"
                  {...register('name', {
                    required: 'Nome é obrigatório'
                  })}
                  placeholder="Digite seu nome ou como deseja ser chamado"
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <span className="error-message">{errors.name.message}</span>
                )}
              </div>
            )}

            {identificationType === 'pseudonym' && (
              <div className="form-group">
                <label htmlFor="pseudonym">Seu Nome/Nickname</label>
                <input
                  type="text"
                  id="pseudonym"
                  {...register('pseudonym', {
                    required: 'Apelido/Pseudônimo é obrigatório'
                  })}
                  placeholder="Digite seu apelido ou pseudônimo"
                  disabled={isSubmitting}
                />
                {errors.pseudonym && (
                  <span className="error-message">{errors.pseudonym.message}</span>
                )}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="story">Seu Relato</label>
              <textarea
                id="story"
                {...register('story', {
                  required: 'Por favor, compartilhe seu relato',
                  minLength: {
                    value: 50,
                    message: 'Seu relato deve ter pelo menos 50 caracteres'
                  }
                })}
                placeholder="Compartilhe sua experiência, sua luta, seu caminho para a liberdade..."
                disabled={isSubmitting}
                rows={10}
              />
              {errors.story && (
                <span className="error-message">{errors.story.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <p className="email-help-text">
                Preencha apenas se desejar receber uma resposta ou notícias. Caso contrário, deixe em branco para total anonimato.
              </p>
              <input
                type="email"
                id="email"
                {...register('email', {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Endereço de email inválido'
                  }
                })}
                placeholder="seu.email@exemplo.com (opcional)"
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
              {isSubmitting ? 'Enviando...' : 'Enviar Relato'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default StoryForm
