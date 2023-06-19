import React from 'react'
import {useParams} from 'react-router-dom'
function Posts() {
  let{id} = useParams();
  return (
    <div>{id}</div>
  )
}

export default Posts