import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className='App min-h-screen max-w-[1024px] mx-auto'>
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
