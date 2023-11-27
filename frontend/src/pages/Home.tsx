import { useEffect, useState } from 'react'
import CharacterDetails from '../components/CharacterDetails'
import CharacterForm from '../components/CharacterForm'
import { useCharactersContext } from '../hooks/useCharacterContext'
import { UilTimes } from '@iconscout/react-unicons'
import Modal from '../components/Modal'
import CharacterUpdateForm from '../components/CharacterUpdateForm'

type Props = {}

export default function Home({}: Props) {
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
          dispatch({ type: 'SET_CHARACTER', payload: data })
        }
      } catch (error) {
        console.warn(error)
      }
    })()
  }, [])

  return (
    <div className='home'>
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
      <Modal
        isOpen={openUpdateDialog}
        onClose={() => setOpenUpdateDialog(false)}
      >
        <CharacterUpdateForm
          title='Update Character'
          character={selectedCharacter}
          setOpenUpdateDialog={setOpenUpdateDialog}
        />
      </Modal>
    </div>
  )
}
