import React from 'react'

function Day(props) {
  return (
    <th
                  scope="col"
                  className="text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]"
                  aria-label="Sunday"
                >
                  {props.day}
                </th>
  )
}

export default Day