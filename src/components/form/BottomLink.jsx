import React from 'react'
import { Link } from 'react-router-dom'

export default function BottomLink({children, goTo}) {
  return (
    <Link to={goTo} className='text-blue text-xs mt-6 self-center hover:text-white transition duration-200'>{children}</Link>
  )
}
