import { Link } from 'react-router-dom'

// type Props = {}

const Navbar = () => {
  return (
    <>
      <header>
        <div className='bg-white'>
          <Link to='/'>
            <h1 className='text-3xl font-bold'>MERN D&D</h1>
          </Link>
        </div>
      </header>
    </>
  )
}

export default Navbar
