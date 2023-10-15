import React from 'react'

const Loader = () => {
  return (
    <div style={{overflow : "hidden" ,   background: "linear-gradient(  180deg,   #e5f8fe 14.25%, rgba(255, 255, 255, 0) 100%  )"}} className="flex w-100 min-h-screen items-center justify-center">
        <div className='map_bg'>

        </div>
    <i className="fas fa-globe-asia animate-bounce text-blue-500 text-5xl" aria-hidden="true">
    </i>
  </div>
  )
}

export default Loader