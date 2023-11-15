import { Link } from 'react-router-dom'

// type Props = {}

const Navbar = () => {
  return (
    <header className='py-4'>
      <div className='container mx-auto'>
        <Link to={'/'} className=' font-bold text-xl'>
          My Website
        </Link>
      </div>
    </header>
  )
}

export default Navbar
