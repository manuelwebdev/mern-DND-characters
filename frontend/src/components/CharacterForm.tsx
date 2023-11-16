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

interface PromiseFulfilledResult<T> {
  status: 'fulfilled'
  value: T
}

interface PromiseRejectedResult {
  status: 'rejected'
  reason: any
}

type PromiseSettledResult<T> = PromiseFulfilledResult<T> | PromiseRejectedResult

type Props = {}

export default function CharacterForm({}: Props) {
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
        console.log(value)
        const { results } = await value.json()
        const cOptions = results?.map((c: any) => c?.name)
        setClassOptions(cOptions)
      }
      if (races?.status === 'fulfilled') {
        const { value } = races
        console.log(value)
        const { results } = await value.json()
        const rOptions = results?.map((r: any) => r?.name)
        setRaceOptions(rOptions)
      }
      if (backgrounds?.status === 'fulfilled') {
        const { value } = backgrounds
        console.log(value)
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
        setError(JSON.parse(err)?.error)
        return
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
      />
      <label htmlFor='class'>Class</label>
      <select
        name='class'
        className='h-8'
        id='classes'
        disabled={!!!classOptions?.length}
      >
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
      >
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
      >
        {backgroundOptions?.map((b: string) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>
      <label htmlFor='alignment'>Alignment</label>
      <select name='alignment' className='h-8' id='alignment'>
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
      {error && <p>{error}</p>}
    </form>
  )
}
