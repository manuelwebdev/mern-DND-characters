import { useEffect } from 'react'
import CharacterDetails from '../components/CharacterDetails'
import CharacterForm from '../components/CharacterForm'
import { useCharactersContext } from '../hooks/useCharacterContext'

type Props = {}

export default function Home({}: Props) {
  // const [characters, setCharacters] = useState<null | unknown[]>(null)
  const { characters, dispatch } = useCharactersContext()

  console.log({ characters })

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch('http://localhost:3000/api/characters/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        console.log(res.ok)
        if (res.ok) {
          const data = await res.json()
          console.log({ data })
          // setCharacters(data)
          dispatch({ type: 'SET_CHARACTER', payload: data })
        }
      } catch (error) {
        console.warn(error)
      }
    })()
  }, [])

  return (
    <div className='home'>
      <h2 className='text-bold text-2xl leading-[3rem]'>Characters</h2>
      <div className='grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-6'>
        <div className='characters grid grid-cols-repeater gap-2'>
          {console.log(characters)}
          {characters?.map((character: any) => (
            <CharacterDetails key={character?._id} character={character} />
          ))}
        </div>
        <CharacterForm title='Create New Character' />
      </div>
    </div>
  )
}
