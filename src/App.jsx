import React from 'react'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Book from './components/Book/Book'
import StoryForm from './components/StoryForm/StoryForm'

function App() {
  return (
    <div className="app">
      <Hero />
      <About />
      <Book />
      <StoryForm />
    </div>
  )
}

export default App
