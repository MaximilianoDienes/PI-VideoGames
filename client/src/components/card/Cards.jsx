import React from 'react'
import { Card } from './Card'
import { useSelector } from 'react-redux'
import styles from "./Cards.module.css"

export const Cards = ({filteredGames}) => {

  const page = useSelector((state) => state.page);
  const startIndex = (page > 1 ? ((page - 1) * 20) - 1 : 0);
  
  return (
    <div className={styles.container}>
        {filteredGames && filteredGames.slice(startIndex, startIndex + (startIndex === 1 ? 19 : 20))
        .map((g, index) => (
            <Card
            key={index}
            id={g.id}
            name={g.name} 
            image={g.image} 
            genre={g.genre}
            apiOrClient={typeof g.id === "string" ? 'CLIENT' : 'API'}
            />
        ))}
    </div>
  )
}