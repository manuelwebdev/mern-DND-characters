type Props = {
  character: any
}

export default function CharacterDetails(props: Props) {
  const {
    character: {
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
    <div className='w-full p-2 shadow-sm rounded bg-slate-100 min-w-fit'>
      <h2 className='text-xl text-emerald-600'>{name}</h2>
      <p>Class: {characterClass}</p>
      <p>Level: {level}</p>
      <p>Race: {race}</p>
      <p>Background: {background}</p>
      <p>Alignment: {alignment}</p>
      <p>Created at: {new Date(createdAt).toDateString()}</p>
    </div>
  )
}
