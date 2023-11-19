import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

type Character = {
  name: string
  class: string
  level: number
  race: string
  background: string
  alignment: string
  createdAt: Date
}

export default function CharacterView() {
  const [character, setCharacter] = useState<Character | null>(null)
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/characters/${id}`
        )
        const data = await response.json()
        setCharacter(data)
      } catch (error) {
        console.error('Error fetching character:', error)
      }
    }

    fetchCharacter()
  }, [id])

  if (!character) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>{character.name}</h1>
      <p>Class: {character.class}</p>
      <p>Level: {character.level}</p>
      <p>Race: {character.race}</p>
      <p>Background: {character.background}</p>
      <p>Alignment: {character.alignment}</p>
      <p>Created At: {character.createdAt.toISOString()}</p>
    </div>
  )
}
