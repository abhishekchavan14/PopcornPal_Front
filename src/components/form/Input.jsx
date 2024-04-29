import React, { forwardRef } from 'react'

export default function({name, label, placeholder, ...rest }) {
  return (
    <div className='flex flex-col mb-8'>
        <label htmlFor={name} className='text-md text-white'>{label}</label>
        <input type="text" id={name} name={name} placeholder={placeholder} className='text-white border border-dark-subtle rounded-md p-1 indent-1 bg-transparent hover:border-primary-red transition duration-300' {...rest}/>
    </div>
  )
}
