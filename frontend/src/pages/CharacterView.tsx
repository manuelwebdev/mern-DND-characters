import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

type Props = {}

export default function CharacterView({}: Props) {
  const { id } = useParams()
  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/characters/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (res.ok) {
          const data = await res.json()
          console.log(data)
        }
      } catch (error) {
        console.warn(error)
      }
    })()
  }, [])

  return (
    <div>
      <h1>{}</h1>
    </div>
  )
}
