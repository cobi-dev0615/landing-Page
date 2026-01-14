import React from 'react'
import './ChapterCard.css'

const ChapterCard = ({ chapter, image }) => {
  return (
    <div className="chapter-card">
      <div className="chapter-number">Capítulo {chapter.number}</div>
      <h4 className="chapter-title">{chapter.title}</h4>
      <p className="chapter-description">{chapter.description}</p>
      {image && (
        <div className="chapter-image-wrapper">
          <img 
            src={image} 
            alt={`Ilustração do Capítulo ${chapter.number} - ${chapter.title}`}
            className="chapter-image"
          />
        </div>
      )}
    </div>
  )
}

export default ChapterCard
