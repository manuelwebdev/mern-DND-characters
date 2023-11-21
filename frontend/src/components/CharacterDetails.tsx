import { Link } from 'react-router-dom'
import { useCharactersContext } from '../hooks/useCharacterContext'
import { UilTrash } from '@iconscout/react-unicons'

type Props = {
  character: any
}

export default function CharacterDetails(props: Props) {
  const {
    character: {
      _id: id,
      name,
      class: characterClass,
      level = 0,
      race = 'unknown',
      background = null,
      alignment = null,
      createdAt = new Date(),
    },
  } = props
  const { dispatch } = useCharactersContext()

  const handleDelete = async (e: any) => {
    e.preventDefault()
    try {
      const res = await fetch(`http://localhost:3000/api/characters/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      if (res.ok) {
        dispatch({ type: 'DELETE_CHARACTER', payload: data })
      }
    } catch (error) {
      console.warn(error)
    }
  }
  return (
    <div
      className='
        w-full 
        h-full
        min-h-[max-content] 
        p-2 
        shadow-sm 
        rounded 
        bg-slate-100 
        min-w-fit 
        grid 
        grid-cols-3 
        gap-4         
        '
    >
      <div className='flex flex-col col-span-2'>
        <Link to={`/character/${id}`}>
          <h2
            className='
          hover:underline
          uppercase 
          text-xl 
          text-emerald-600 
          col-span-3'
          >
            {`${name} the ${background || 'adventurer'}`}
          </h2>
        </Link>
        <p className='text-slate-500 text-md col-span-5'>
          {race} {characterClass && `(lvl:${level} ${characterClass})`}
        </p>
        <p className='text-slate-800 text-lg col-span-2'>{alignment}</p>
        <p className='text-slate-500 text-sm col-span-3 '>
          Created at: {new Date(createdAt).toDateString()}
        </p>
      </div>
      <button
        className='
          container 
          flex 
          items-center 
          col-span-1 
          justify-self-end 
          bg-slate-500 
          h-[fit-content] 
          w-[fit-content] 
          rounded 
          p-1
          text-white
          duration-300
          hover:bg-slate-600
          hover:transition-all
          hover:duration-300'
        onClick={handleDelete}
      >
        Delete
        <UilTrash size='20' color='#ffffff' />
      </button>
    </div>
  )
}
