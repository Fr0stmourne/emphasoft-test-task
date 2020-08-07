import React from 'react'
import CircleLoader from 'react-spinners/CircleLoader'
import './index.scss'

export default function Preloader() {
  return (
    <div className="preloader">
      <CircleLoader size={'100%'}/>
    </div>
  )
}