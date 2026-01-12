import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

/**
 * Subscribe user email and trigger e-book delivery
 * @param {string} email - User's email address
 * @returns {Promise} API response
 */
export const subscribeForEbook = async (email) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/subscribe`, {
      email
    })
    return response.data
  } catch (error) {
    console.error('Error subscribing for ebook:', error)
    throw error
  }
}

/**
 * Submit a story/testimonial
 * @param {Object} storyData - Story submission data
 * @returns {Promise} API response
 */
export const submitStory = async (storyData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/stories`, storyData)
    return response.data
  } catch (error) {
    console.error('Error submitting story:', error)
    throw error
  }
}
