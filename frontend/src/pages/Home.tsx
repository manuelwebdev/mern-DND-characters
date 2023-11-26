import { useEffect, useState } from 'react'
import CharacterDetails from '../components/CharacterDetails'
import CharacterForm from '../components/CharacterForm'
import { useCharactersContext } from '../hooks/useCharacterContext'
import { UilTimes } from '@iconscout/react-unicons'
import Modal from '../components/Modal'
import CharacterUpdateForm from '../components/CharacterUpdateForm'

type Props = {}

export default function Home({}: Props) {
  // const [characters, setCharacters] = useState<null | unknown[]>(null)
  const { characters, dispatch } = useCharactersContext()
  const [openUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false)
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(
    {} as Character
  )

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
      <Modal
        isOpen={openUpdateDialog}
        onClose={() => setOpenUpdateDialog(false)}
      >
        <button
          className='absolute right-0 top-0'
          onClick={() => setOpenUpdateDialog(false)}
        >
          <UilTimes size='20' color='#4d4d4d' />
        </button>
        <h2>Update Character</h2>
        <CharacterUpdateForm
          title='Update Character'
          character={selectedCharacter}
          setOpenUpdateDialog={setOpenUpdateDialog}
        />
      </Modal>
      <div className='grid grid-cols-repeater md:grid-cols-[3fr_minmax(min-content,400px)] gap-4'>
        <div className='grid grid-cols-repeater gap-2'>
          {characters?.map((character: Character) => (
            <CharacterDetails
              key={character?._id}
              character={character}
              setUpdateDialog={setOpenUpdateDialog}
              setSelectedCharacter={setSelectedCharacter}
            />
          ))}
        </div>
        <CharacterForm title='Create New Character' />
      </div>
    </div>
  )
}
