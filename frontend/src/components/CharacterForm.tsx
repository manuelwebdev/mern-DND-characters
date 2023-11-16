import { useEffect, useState } from 'react'

interface Character {
  name: string
  class: string
  level: number
  race: string
  background: string
  alignment: string
  createdAt: Date
}

export default function CharacterForm() {
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
      console.log(character)
      const res = await fetch('http://localhost:3000/api/characters/', {
        method: 'POST',
        body: JSON.stringify(character),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log(res)
      if (!res.ok) {
        const err = await res.text()
        setError(err)
      }
      if (res.ok) {
        const data = await res.json()
        console.log(data)
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
      }
    } catch (error) {
      console.warn(error)
      setError(error)
    } finally {
      console.log('done')
    }
  }
  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
      <label htmlFor='name'>Name</label>
      <input
        className=''
        type='text'
        value={character?.name}
        name='name'
        onChange={(e) => {
          setCharacter((prevState) => ({ ...prevState, name: e.target.value }))
        }}
        required
      />
      <label htmlFor='class'>Class</label>
      <select
        name='class'
        className='h-8'
        id='classes'
        disabled={!!!classOptions?.length}
        required
        onChange={(e) => {
          setCharacter((prevState) => ({
            ...prevState,
            class: e.target.value,
          }))
        }}
        defaultValue={''}
      >
        <option value='' selected disabled hidden>
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
        <span className='text-sm text-emerald-600'>{character?.level}</span>
      </label>
      <input
        className=''
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
      <label htmlFor='race'>Race</label>
      <select
        name='race'
        className='h-8'
        id='race'
        disabled={!!!raceOptions?.length}
        onChange={(e) => {
          setCharacter((prevState) => ({
            ...prevState,
            race: e.target.value,
          }))
        }}
        defaultValue={''}
      >
        <option value='' selected disabled hidden>
          Select a race
        </option>
        {raceOptions?.map((r: string) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>
      <label htmlFor='background'>Background</label>
      <select
        name='background'
        className='h-8'
        id='background'
        disabled={!!!backgroundOptions?.length}
        onChange={(e) => {
          setCharacter((prevState) => ({
            ...prevState,
            background: e.target.value,
          }))
        }}
        defaultValue={''}
      >
        <option value='' selected disabled hidden>
          Select a background
        </option>
        {backgroundOptions?.map((b: string) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>
      <label htmlFor='alignment'>Alignment</label>
      <select
        name='alignment'
        className='h-8'
        id='alignment'
        onChange={(e) => {
          setCharacter((prevState) => ({
            ...prevState,
            alignment: e.target.value,
          }))
        }}
        defaultValue={''}
      >
        <option value='' selected disabled hidden>
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
      </select>
      <button type='submit' className='bg-emerald-600 text-white w-1/3 py-1'>
        Submit
      </button>
      {console.log(error)}
      {error && <p>{error}</p>}
    </form>
  )
}
