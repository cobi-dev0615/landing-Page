import React from 'react'
import './ChapterCard.css'

const ChapterCard = ({ chapter }) => {
  return (
    <div className="chapter-card">
      <div className="chapter-number">Capítulo {chapter.number}</div>
      <h4 className="chapter-title">{chapter.title}</h4>
      <p className="chapter-description">{chapter.description}</p>
    </div>
  )
}

export default ChapterCard
