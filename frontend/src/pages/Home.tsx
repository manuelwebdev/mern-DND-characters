import { useEffect } from 'react'
import CharacterDetails from '../components/CharacterDetails'
import CharacterForm from '../components/CharacterForm'
import { useCharactersContext } from '../hooks/useCharacterContext'
import { UilTimes } from '@iconscout/react-unicons'

type Props = {}

export default function Home({}: Props) {
  // const [characters, setCharacters] = useState<null | unknown[]>(null)
  const { characters, dispatch } = useCharactersContext()

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch('http://localhost:3000/api/characters/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (res.ok) {
          const data = await res.json()
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
      <dialog
        open
        className='
          position-absolute 
          right-0 
          top-[calc(50%-250px)] 
          w-[400px] 
          h-[500px] 
          backdrop:bg-gray-500
          bg-slate-400'
      >
        <button>
          <UilTimes size='20' color='#4d4d4d' />
        </button>
        <p>This modal dialog has a groovy backdrop!</p>
      </dialog>
      <div className='grid grid-cols-repeater md:grid-cols-[3fr_minmax(min-content,400px)] gap-4'>
        <div className='grid grid-cols-repeater gap-2'>
          {characters?.map((character: any) => (
            <CharacterDetails key={character?._id} character={character} />
          ))}
        </div>
        <CharacterForm title='Create New Character' />
      </div>
    </div>
  )
}
