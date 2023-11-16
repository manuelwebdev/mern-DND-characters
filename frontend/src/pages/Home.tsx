import { useEffect, useState } from 'react'
import CharacterDetails from '../components/CharacterDetails'
import CharacterForm from '../components/CharacterForm'

type Props = {}

export default function Home({}: Props) {
  const [characters, setCharacters] = useState<null | unknown[]>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch('http://localhost:3000/api/characters/')
        if (res.ok) {
          const data = await res.json()
          setCharacters(data)
        }
      } catch (error) {
        console.warn(error)
      }
    })()
  }, [])

  return (
    <div className='home'>
      <h2 className='text-bold text-2xl leading-[3rem]'>Characters</h2>
      <div className='grid grid-cols-1'>
        <div className='characters grid grid-cols-repeater gap-2'>
          {characters?.map((character: any) => (
            <CharacterDetails key={character?._id} character={character} />
          ))}
        </div>
        <h2 className='text-bold text-2xl leading-[3rem]'>
          Create New Character
        </h2>
        <CharacterForm />
      </div>
    </div>
  )
}
