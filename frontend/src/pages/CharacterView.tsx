import React from 'react'
import { useEffect, useState } from 'react'
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

const CharacterView: React.FC = () => {
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
    return <div className='text-center p-8 text-gray-700'>Loading...</div>
  }

  return (
    <div className='max-w-md mx-auto p-6 bg-white rounded-md shadow-md'>
      <h1 className='text-2xl font-semibold mb-4'>{character.name}</h1>
      <div className='space-y-2'>
        <p>
          <strong>Class:</strong> {character.class}
        </p>
        <p>
          <strong>Level:</strong> {character.level}
        </p>
        <p>
          <strong>Race:</strong> {character.race}
        </p>
        <p>
          <strong>Background:</strong> {character.background}
        </p>
        <p>
          <strong>Alignment:</strong> {character.alignment}
        </p>
        <p>
          <strong>Created At:</strong>{' '}
          {new Date(character.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  )
}

export default CharacterView
