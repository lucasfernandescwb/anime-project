import React from 'react'

import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

export default function RootLayout() {
  return (
    <div className='wrapper'>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
