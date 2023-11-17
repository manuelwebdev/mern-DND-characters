import { Link } from 'react-router-dom'

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
  return (
    <Link
      to={`/characters/${id}`}
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
        grid-cols-5 
        auto-rows-min	
        '
    >
      <h2 className='uppercase text-xl text-emerald-600 col-span-3'>
        {`${name} the ${background || 'adventurer'}`}
      </h2>
      <p className='col-span-2 justify-self-end'>
        lvl:{level} {characterClass}
      </p>
      <p className='text-slate-500 text-md col-span-5'>{race}</p>
      <p className='text-slate-800 text-lg col-span-2'>{alignment}</p>
      <p className='text-slate-500 text-sm col-span-3 self-end'>
        Created at: {new Date(createdAt).toDateString()}
      </p>
    </Link>
  )
}
