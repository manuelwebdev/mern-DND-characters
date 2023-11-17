import { Link } from 'react-router-dom'

// type Props = {}

const Navbar = () => {
  return (
    <header className='py-4'>
      <div className='container mx-auto'>
        <Link to={'/'}>
          <h1 className='font-bold text-2xl'>D&D Character Tracker</h1>
        </Link>
      </div>
    </header>
  )
}

export default Navbar
