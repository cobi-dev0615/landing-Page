// Vercel Serverless Function for /api/subscribe
import dotenv from 'dotenv'
import { sendEbookEmail } from '../server/services/brevoService.js'

// Load environment variables
dotenv.config()

// Vercel serverless function handler
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    })
  }

  try {
    const { name, email, phone, consent } = req.body

    // Validation
    if (!email || !name || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Nome, email e telefone são obrigatórios'
      })
    }

    if (!consent) {
      return res.status(400).json({
        success: false,
        message: 'É necessário concordar com os termos para receber o e-book'
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Email inválido'
      })
    }

    // Validate phone format (basic validation)
    const phoneRegex = /^[\d\s\(\)\-\+]{10,}$/
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      return res.status(400).json({
        success: false,
        message: 'Telefone inválido'
      })
    }

    // Send e-book via Brevo
    await sendEbookEmail({ name, email, phone })

    return res.status(200).json({
      success: true,
      message: 'E-book enviado com sucesso! Verifique sua caixa de entrada.'
    })
  } catch (error) {
    console.error('Error in /api/subscribe:', error)
    console.error('Error stack:', error.stack)
    console.error('Error message:', error.message)
    return res.status(500).json({
      success: false,
      message: error.message || 'Erro ao processar solicitação. Por favor, tente novamente.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
}
