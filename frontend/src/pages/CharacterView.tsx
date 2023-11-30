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
      <h1 className='text-3xl font-bold mb-4'>{character.name}</h1>
      <div className='space-y-2'>
        <p className='text-sm'>
          <strong>Class:</strong> {character.class}
        </p>
        <p className='text-sm'>
          <strong>Level:</strong> {character.level}
        </p>
        <p className='text-sm'>
          <strong>Race:</strong> {character.race}
        </p>
        <p className='text-sm'>
          <strong>Background:</strong> {character.background}
        </p>
        <p className='text-sm'>
          <strong>Alignment:</strong> {character.alignment}
        </p>
        <p className='text-sm'>
          <strong>Created At:</strong>{' '}
          {new Date(character.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  )
}

export default CharacterView
