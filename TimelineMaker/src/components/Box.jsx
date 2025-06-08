import React from 'react'

const Box = ({ coverImage, timelineName, lastEdited, onClick }) => {
  return (
    <div onClick={onClick} className="bg-gray-950 w-[250px] h-[300px] rounded-lg ring-1 ring-gray-700 flex-row justify-center">
        <img src={coverImage} className="w-[300px] h-[225px] rounded-t-lg" alt="Cover Image"/>
        <p className="ml-3 mt-2 text-[20px] text-white font-semibold">{timelineName}</p>
        <p className="ml-3 mt-2 text-white">{lastEdited}</p>
    </div>
  )
}

export default Box