import { useEffect, useState } from 'react'
import { useCharactersContext } from '../hooks/useCharacterContext'

interface Character {
  name: string
  class: string
  level: number
  race: string
  background: string
  alignment: string
  createdAt: Date
}

type Props = {
  title: string
}

export default function CharacterForm({ title }: Props) {
  const { dispatch } = useCharactersContext()
  const [character, setCharacter] = useState<Character>({
    name: '',
    class: '',
    level: 0,
    race: '',
    background: '',
    alignment: '',
    createdAt: new Date(),
  })
  const [error, setError] = useState<any>(null)
  const [classOptions, setClassOptions] = useState([])
  const [raceOptions, setRaceOptions] = useState([])
  const [backgroundOptions, setBackgroundOptions] = useState([])
  const [emptyFields, setEmptyFields] = useState<string[]>([])

  useEffect(() => {
    ;(async () => {
      const [classes, races, backgrounds] = await Promise.allSettled([
        fetch('https://www.dnd5eapi.co/api/classes'),
        fetch('https://www.dnd5eapi.co/api/races'),
        fetch('https://www.dnd5eapi.co/api/backgrounds'),
      ])

      if (classes?.status === 'fulfilled') {
        const { value } = classes
        const { results } = await value.json()
        const cOptions = results?.map((c: any) => c?.name)
        setClassOptions(cOptions)
      }
      if (races?.status === 'fulfilled') {
        const { value } = races
        const { results } = await value.json()
        const rOptions = results?.map((r: any) => r?.name)
        setRaceOptions(rOptions)
      }
      if (backgrounds?.status === 'fulfilled') {
        const { value } = backgrounds
        const { results } = await value.json()
        const bOptions = results?.map((b: any) => b?.name)
        setBackgroundOptions(bOptions)
      }
      if (classes?.status === 'rejected') {
        const { reason } = classes
        console.log(reason)
        setClassOptions([])
      }
      if (races?.status === 'rejected') {
        const { reason } = races
        console.log(reason)
        setRaceOptions([])
      }
      if (backgrounds?.status === 'rejected') {
        const { reason } = backgrounds
        console.log(reason)
        setBackgroundOptions([])
      }
    })()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault()
      const res = await fetch('http://localhost:3000/api/characters/', {
        method: 'POST',
        body: JSON.stringify(character),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!res.ok) {
        const err = await res.json()
        console.log(err)
        setError(err)
        setEmptyFields(err?.emptyFields)
      }
      if (res.ok) {
        const data = await res.json()
        setCharacter({
          name: '',
          class: '',
          level: 0,
          race: '',
          background: '',
          alignment: '',
          createdAt: new Date(),
        })
        setError(null)
        dispatch({
          type: 'CREATE_CHARACTER',
          payload: data,
        })
      }
    } catch (error) {
      console.warn(error)
      setError(error)
    }
  }

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setEmptyFields()
  }

  const inputStyle = 'w-full h-[2.5rem] rounded p-2 mb-2'

  return (
    <div className='w-full flex flex-col max-w-[calc(400px-2rem)]'>
      <h2 className='mb-4 text-bold text-2xl leading-[2rem]'>{title}</h2>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        {!!emptyFields.length && (
          <p
            className='text-red-500 border-red-500 border-2 bg-red-200 p-2 mb-2 rounded'
            style={{ wordWrap: 'break-word' }}
          >
            Please fill out the required fields.
          </p>
        )}
        <label htmlFor='name'>
          Name
          <span className='text-red-500'>*</span>
        </label>
        <input
          className={`${inputStyle} ${
            emptyFields?.includes('name') && 'border-red-500 border-2'
          }`}
          type='text'
          value={character?.name}
          placeholder='Enter name'
          name='name'
          onChange={(e) => {
            setCharacter((prevState) => ({
              ...prevState,
              name: e.target.value,
            }))
          }}
          // required
        />
        <label htmlFor='class'>
          Class
          <span className='text-red-500'>*</span>
        </label>
        <select
          name='class'
          className={`${inputStyle} ${
            emptyFields?.includes('name') && 'border-red-500 border-2'
          }`}
          id='classes'
          disabled={!!!classOptions?.length}
          // required
          onChange={(e) => {
            setCharacter((prevState) => ({
              ...prevState,
              class: e.target.value,
            }))
          }}
          value={character?.class}
        >
          <option value='' disabled hidden>
            Select a class
          </option>
          {classOptions?.map((c: string) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <label htmlFor='level'>
          Level{' '}
          <span className='text-sm text-emerald-600'>
            {character?.level === 0 ? 'unkown/npc' : character?.level}
          </span>
          <span className='text-red-500'>*</span>
        </label>
        <input
          className={`range pr-6 accent-emerald-600 mx-2 mb-3 ${
            emptyFields?.includes('level')
              ? 'accent-red-500 border-2'
              : 'accent-emerald-600'
          }`}
          type='range'
          min={0}
          max={20}
          step={1}
          value={character?.level}
          name='level'
          onChange={(e) => {
            setCharacter((prevState) => ({
              ...prevState,
              level: +e.target.value,
            }))
          }}
        />
        <label htmlFor='race'>
          Race
          <span className='text-red-500'>*</span>
        </label>
        <select
          name='race'
          disabled={!!!raceOptions?.length}
          onChange={(e) => {
            setCharacter((prevState) => ({
              ...prevState,
              race: e.target.value,
            }))
          }}
          value={character?.race}
          className={`${inputStyle} ${
            emptyFields?.includes('race') && 'border-red-500 border-2'
          }`}
        >
          <option value='' disabled hidden>
            Select a race
          </option>
          {raceOptions?.map((r: string) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <label htmlFor='background'>
          Background
          <span className='text-red-500'>*</span>
        </label>
        <select
          name='background'
          id='background'
          disabled={!!!backgroundOptions?.length}
          onChange={(e) => {
            setCharacter((prevState) => ({
              ...prevState,
              background: e.target.value,
            }))
          }}
          value={character?.background}
          className={`${inputStyle} ${
            emptyFields?.includes('background') && 'border-red-500 border-2'
          }`}
        >
          <option value='' disabled hidden>
            Select a background
          </option>
          {backgroundOptions?.map((b: string) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
        <label htmlFor='alignment'>
          Alignment
          <span className='text-red-500'>*</span>
        </label>
        <select
          name='alignment'
          onChange={(e) => {
            setCharacter((prevState) => ({
              ...prevState,
              alignment: e.target.value,
            }))
          }}
          value={character?.alignment}
          className={`${inputStyle} ${
            emptyFields?.includes('alignment') && 'border-red-500 border-2'
          }`}
        >
          <option value='' disabled hidden>
            Select an alignment
          </option>
          <option value='lawful-good'>lawful-good</option>
          <option value='neutral-good'>neutral-good</option>
          <option value='chaotic-good'>chaotic-good</option>
          <option value='lawful-neutral'>lawful-neutral</option>
          <option value='neutral'>neutral</option>
          <option value='chaotic-neutral'>chaotic-neutral</option>
          <option value='lawful-evil'>lawful-evil</option>
          <option value='neutral-evil'>neutral-evil</option>
          <option value='chaotic-evil'>chaotic-evil</option>
          <option value='unknown'>unknown</option>
        </select>
        <input
          type='submit'
          className='
            bg-emerald-600 
            text-white 
            w-[fit-content] 
            px-4
            py-1 
            my-3
            rounded-md

            transition 
            ease-in-out 
            duration-300 
            hover:bg-emerald-800 
            hover:shadow-lg
            hover:transition 
            hover:ease-in 
            hover:duration-100'
          value='Add Character'
        />
      </form>
    </div>
  )
}
