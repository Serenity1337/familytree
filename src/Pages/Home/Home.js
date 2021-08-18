import React, { useState } from 'react'
import RenderTree from '../../components/RenderTree'

export const Home = () => {
  const [tree, settree] = useState({
    name: 'me',
    surname: 'me',
    dob: 'dob',
    id: 7,
    descendants: [],
  })
  return (
    <div>
      <RenderTree tree={tree} settree={settree} />
    </div>
  )
}
