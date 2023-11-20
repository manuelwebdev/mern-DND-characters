import { Link } from 'react-router-dom'
import { useCharactersContext } from '../hooks/useCharacterContext'

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
        console.log('deleted', data)
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
        min-h-[min-content] 
        p-2 
        shadow-sm 
        rounded 
        bg-slate-100 
        min-w-fit 
        grid 
        grid-cols-10         
        '
    >
      <div className='grid grid-cols-5 auto-rows-min	 col-span-9'>
        <h2 className='uppercase text-xl text-emerald-600 col-span-3'>
          {`${name} the ${background || 'adventurer'}`}
        </h2>
        <p className='col-span-2 justify-self-end'>
          lvl:{level} {characterClass}
        </p>
        <p className='text-slate-500 text-md col-span-5'>{race}</p>
        <p className='text-slate-800 text-lg col-span-2'>{alignment}</p>
        <p className='text-slate-500 text-sm col-span-3 self-end justify-self-end'>
          Created at: {new Date(createdAt).toDateString()}
        </p>
        <Link to={`/character/${id}`}>View</Link>
      </div>
      <button
        className='container col-span-1 bg-slate-500 h-[fit-content] rounded p-2'
        onClick={handleDelete}
      >
        <svg
          width='28'
          height='32'
          viewBox='0 0 28 32'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M3 8V27C3 29.2091 4.79086 31 7 31H21C23.2091 31 25 29.2091 25 27V8'
            stroke='black'
            stroke-linecap='round'
          />
          <rect x='0.5' y='2.5' width='27' height='4' rx='2' stroke='black' />
          <path d='M18 1L10 0.999999' stroke='black' stroke-linecap='round' />
          <path d='M11 9V27' stroke='black' stroke-linecap='round' />
          <path d='M18 9V27' stroke='black' stroke-linecap='round' />
        </svg>
      </button>
    </div>
  )
}
