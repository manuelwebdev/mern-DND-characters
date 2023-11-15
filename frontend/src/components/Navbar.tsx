import { Link } from 'react-router-dom'

// type Props = {}

const Navbar = () => {
  return (
    <nav className='p-4'>
      <div className='container mx-auto'>
        <div className='flex items-center justify-between'>
          <div className=' font-bold text-xl'>My Website</div>
          <ul className='flex space-x-4'>
            <li>
              <a href='#' className=' hover:text-gray-600'>
                Home
              </a>
            </li>
            <li>
              <a href='#' className=' hover:text-gray-600'>
                About
              </a>
            </li>
            <li>
              <a href='#' className=' hover:text-gray-600'>
                Services
              </a>
            </li>
            <li>
              <a href='#' className=' hover:text-gray-600'>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
