import React from 'react'
import { Link } from 'react-router-dom'

function Date(props) {
  return (
        <td
                  className="text-center text-sm p-0 relative [&amp;:has([aria-selected])]:bg-accent first:[&amp;:has([aria-selected])]:rounded-l-md last:[&amp;:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20"
                  role="presentation"
                >
                  <button
                    name="day"
                    className={props.className}
                    role="gridcell"
                    tabindex="-1"
                    type="button"
                  >
                    <Link to={`/user/record?date=${props.link}`}>{props.date}</Link>
                  </button>
                </td>
  )
}

export default Date