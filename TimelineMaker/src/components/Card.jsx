import React from "react"

const Card = React.forwardRef(({ text, bullet1, bullet2, bullet3, color }, ref) => (
    <div ref={ref} className="bg-gray-950 w-[300px] h-[450px] rounded-lg ring-1 ring-gray-700 flex-row justify-center">
      <div className="flex justify-center">
        <p className={`${color} text-[40px] font-bold`}>{text}</p>
      </div>
      <div className="flex-col space-y-20 ml-[15px] mt-[20px]">
        <div className="flex">
          <svg className="h-[1lh] w-5.5 shrink-0" viewBox="0 0 22 22" fill="none" strokeLinecap="square">
            <circle cx="11" cy="11" r="11" className="fill-sky-400/25" />
            <circle cx="11" cy="11" r="10.5" className="stroke-sky-400/25" />
            <path d="M8 11.5L10.5 14L14 8" className="stroke-sky-300" />
          </svg>
          <p className="font-thin text-gray-300 ml-[10px] text-[20px] -translate-y-1">{bullet1}</p>
        </div>
        <div className="flex">
          <svg className="h-[1lh] w-5.5 shrink-0" viewBox="0 0 22 22" fill="none" strokeLinecap="square">
            <circle cx="11" cy="11" r="11" className="fill-sky-400/25" />
            <circle cx="11" cy="11" r="10.5" className="stroke-sky-400/25" />
            <path d="M8 11.5L10.5 14L14 8" className="stroke-sky-300" />
          </svg>
          <p className="font-thin text-gray-300 ml-[10px] text-[20px] -translate-y-1">{bullet2}</p>
        </div>
        <div className="flex">
          <svg className="h-[1lh] w-5.5 shrink-0" viewBox="0 0 22 22" fill="none" strokeLinecap="square">
            <circle cx="11" cy="11" r="11" className="fill-sky-400/25" />
            <circle cx="11" cy="11" r="10.5" className="stroke-sky-400/25" />
            <path d="M8 11.5L10.5 14L14 8" className="stroke-sky-300" />
          </svg>
          <p className="font-thin text-gray-300 ml-[10px] text-[20px] -translate-y-1">{bullet3}</p>
        </div>
      </div>
    </div>
))

export default Card