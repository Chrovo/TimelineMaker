import React from 'react'
 
/*Add ref stuff in a bit*/
const Box = ({ coverImage, timelineName, lastEdited }) => {
  return (
    <div className="bg-gray-950 w-[250px] h-[300px] rounded-lg ring-1 ring-gray-700 flex-row justify-center">
        <img src={coverImage} className="w-[300px] h-[225px] rounded-t-lg"/>
        <p className="ml-3 mt-2 text-[20px] text-white font-semibold">{timelineName}</p>
        <p className="ml-3 mt-2 text-white">{lastEdited}</p>
    </div>
  )
}

export default Box