// Vercel Serverless Function for /api/health
export default async function handler(req, res) {
  return res.status(200).json({
    status: 'ok',
    message: 'API is running'
  })
}
