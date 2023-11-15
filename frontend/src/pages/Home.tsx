import { useEffect, useState } from 'react'
import CharacterDetails from '../components/CharacterDetails'

type Props = {}

export default function Home({}: Props) {
  const [characters, setCharacters] = useState<null | unknown[]>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch('http://localhost:3000/api/characters/')
        if (res.ok) {
          const data = await res.json()
          console.log(res, data)
          setCharacters(data)
        }
      } catch (error) {
        console.warn(error)
      }
    })()
  }, [])

  return (
    <div className='home'>
      <div className='characters'>
        {characters?.map((character: any, id) => (
          <CharacterDetails key={character?._id} character={character} />
        ))}
      </div>
    </div>
  )
}
