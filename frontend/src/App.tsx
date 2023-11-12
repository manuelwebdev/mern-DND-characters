import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='bg-red-400'>
        <h1 className='text-3xl font-bold underline'>MERN D&D</h1>
      </div>
    </>
  )
}

export default App
