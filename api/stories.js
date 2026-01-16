// Vercel Serverless Function for /api/stories
import dotenv from 'dotenv'
import { sendStoryConfirmation } from '../server/services/brevoService.js'
import { saveStory } from '../server/services/database.js'

// Load environment variables
dotenv.config()

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    })
  }

  try {
    const { identificationType, story, name, pseudonym, email } = req.body

    // Validation
    if (!identificationType || !story) {
      return res.status(400).json({
        success: false,
        message: 'Tipo de identificação e relato são obrigatórios'
      })
    }

    if (story.length < 50) {
      return res.status(400).json({
        success: false,
        message: 'O relato deve ter pelo menos 50 caracteres'
      })
    }

    // Validate identification type requirements
    if (identificationType === 'realName' && !name) {
      return res.status(400).json({
        success: false,
        message: 'Nome é obrigatório quando seleciona "nome real"'
      })
    }

    if (identificationType === 'pseudonym' && !pseudonym) {
      return res.status(400).json({
        success: false,
        message: 'Pseudônimo é obrigatório quando seleciona "pseudônimo"'
      })
    }

    // Prepare story data (respecting anonymity)
    const storyData = {
      identificationType,
      story,
      ...(identificationType === 'realName' && { name }),
      ...(identificationType === 'pseudonym' && { pseudonym }),
      ...(email && { email }),
      submittedAt: new Date().toISOString()
    }

    // Save to database
    await saveStory(storyData)

    // Send confirmation email if email provided
    if (email) {
      try {
        await sendStoryConfirmation({ email, identificationType })
      } catch (emailError) {
        console.error('Error sending confirmation email:', emailError)
        // Don't fail the request if email fails
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Relato enviado com sucesso. Obrigado por compartilhar sua voz.'
    })
  } catch (error) {
    console.error('Error in /api/stories:', error)
    return res.status(500).json({
      success: false,
      message: 'Erro ao processar relato. Por favor, tente novamente.'
    })
  }
}
