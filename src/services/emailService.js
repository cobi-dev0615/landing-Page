import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

/**
 * Subscribe user email and trigger e-book delivery
 * @param {Object} data - User data containing name and email
 * @param {string} data.name - User's name or how they want to be called
 * @param {string} data.email - User's email address
 * @returns {Promise} API response
 */
export const subscribeForEbook = async ({ name, email }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/subscribe`, {
      name,
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
