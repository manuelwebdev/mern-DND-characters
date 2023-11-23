import { useEffect, useState } from 'react'
import CharacterDetails from '../components/CharacterDetails'
import CharacterForm from '../components/CharacterForm'
import { useCharactersContext } from '../hooks/useCharacterContext'
import { UilTimes } from '@iconscout/react-unicons'

type Props = {}

export default function Home({}: Props) {
  // const [characters, setCharacters] = useState<null | unknown[]>(null)
  const { characters, dispatch } = useCharactersContext()
  const [openUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false)

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
        open={openUpdateDialog}
        id='modal'
        className='
          position-absolute 
          right-0 
          top-[calc(50%-250px)] 
          w-[400px] 
          h-[500px] 
          rounded
          p-4
          backdrop:bg-gray-500
          bg-slate-400'
      >
        <button
          className='absolute right-0 top-0'
          onClick={() => setOpenUpdateDialog(false)}
        >
          <UilTimes size='20' color='#4d4d4d' />
        </button>
        <h2>Update Character</h2>
        <form onSubmit={(e) => e.preventDefault()} method='post'>
          <input
            type='text'
            name='name'
            placeholder='Name'
            className='w-full h-[2.5rem] rounded p-2 mb-2'
          />
          <input
            type='text'
            name='class'
            placeholder='Class'
            className='w-full h-[2.5rem] rounded p-2 mb-2'
          />
          <input
            type='number'
            name='level'
            placeholder='Level'
            className='w-full h-[2.5rem] rounded p-2 mb-2'
          />
          <input
            type='text'
            name='race'
            placeholder='Race'
            className='w-full h-[2.5rem] rounded p-2 mb-2'
          />
          <input
            type='text'
            name='background'
            placeholder='Background'
            className='w-full h-[2.5rem] rounded p-2 mb-2'
          />
          <input
            type='text'
            name='alignment'
            placeholder='Alignment'
            className='w-full h-[2.5rem] rounded p-2 mb-2'
          />
          <input
            type='date'
            name='createdAt'
            placeholder='Created At'
            className='w-full h-[2.5rem] rounded p-2 mb-2'
          />
          <button type='submit'>Submit</button>
        </form>
      </dialog>
      <div className='grid grid-cols-repeater md:grid-cols-[3fr_minmax(min-content,400px)] gap-4'>
        <div className='grid grid-cols-repeater gap-2'>
          {characters?.map((character: any) => (
            <CharacterDetails
              key={character?._id}
              character={character}
              setUpdateDialog={setOpenUpdateDialog}
            />
          ))}
        </div>
        <CharacterForm title='Create New Character' />
      </div>
    </div>
  )
}
