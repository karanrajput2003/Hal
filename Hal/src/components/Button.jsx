import React from 'react'
// import reactLogo from '../assets/react.svg'
import { Link } from 'react-router-dom'

function Button(props) {
  return (
    <Link 
        to={props.to} 
        className='px-8 py-1 text-lg font-medium text-center text-white bg-indigo-600 rounded-md'>
            <span class="material-symbols-outlined">
                mic
            </span>
            {props.name} 
    </Link>
  )
}

export default Button