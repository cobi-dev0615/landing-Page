import React from 'react'
import ChapterCard from './ChapterCard'
import './Book.css'

const Book = () => {
  const chapters = [
    {
      number: 1,
      title: "O PRIMEIRO BEIJO",
      description: "Ela não vem chutando a porta. Beth Mirage é educada. Descubra como o primeiro encontro começa de forma inocente, mas leva à dependência total."
    },
    {
      number: 2,
      title: "A PAREDE DE VIDRO (ISOLAMENTO)",
      description: "Beth Mirage é ciumenta. Ela constrói uma parede de vidro ao redor de si mesma. Você ainda vê as pessoas, mas não as ouve mais. O viciado se torna um Zumbi."
    },
    {
      number: 3,
      title: "O ROUBO DA ALMA (O DESVIO DE CARÁTER)",
      description: "Beth remove a bússola moral. Quando o dinheiro acaba, a vítima olha para o que não deveria ser tocado. O primeiro passo é sempre pequeno, o último é devastador."
    },
    {
      number: 4,
      title: "RETRATOS DE UM ZUMBI (A CASCA VAZIA)",
      description: "O Zumbi não dorme; ele desliga por exaustão. Nada traz mais alegria: nem um abraço, nem uma conquista. Beth se tornou o único sol em um sistema solar escuro."
    },
    {
      number: 5,
      title: "O CAMINHO DO HERÓI (A FUGA)",
      description: "Escapar de Beth Mirage é como arrancar a própria pele. O primeiro passo do herói é a humilhação total: admitir o vício. Beth morre na luz; ela se alimenta do segredo."
    }
  ]

  return (
    <section className="section book">
      <div className="container">
        <h2 className="book-title">O Livro</h2>
        <div className="book-cover-container">
          <img 
            src="/images/book-cover.jpeg" 
            alt="Capa do livro Nas Garras de Beth Mirage" 
            className="book-cover-image"
          />
        </div>
        
        <div className="chapters-container">
          <h3 className="chapters-title">Capítulos</h3>
          <div className="chapters-grid">
            {chapters.map((chapter) => (
              <ChapterCard 
                key={chapter.number} 
                chapter={chapter}
                image={chapter.number === 4 ? '/images/chapter4.jpeg' : chapter.number === 5 ? '/images/chapter5.jpeg' : null}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Book
