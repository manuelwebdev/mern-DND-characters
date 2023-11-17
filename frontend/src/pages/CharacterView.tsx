import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

type Props = {}

export default function CharacterView({}: Props) {
  const [character, setCharacter] = useState<any>({
    name: '',
    class: '',
    level: 0,
    race: '',
    background: '',
    alignment: '',
    createdAt: new Date(),
  })
  const { id } = useParams()

  useEffect(() => {
    console.log(id)
    ;(async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/characters/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        console.log(res)
        if (res.ok) {
          const data = await res.json()
          setCharacter(data)
        }
      } catch (error) {
        console.warn(error)
      }
    })()
  }, [])

  return (
    <div>
      <h1>{character?.name}</h1>
      <p>{character?.class}</p>
      <p>{character?.level}</p>
      <p>{character?.race}</p>
      <p>{character?.background}</p>
      <p>{character?.alignment}</p>
      <p>{character?.createdAt}</p>
    </div>
  )
}
