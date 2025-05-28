const Hero = () => (
    <div className="bg-slate-900">
        <div className="flex justify-center items-center font-bold">
            <h1 className="text-white text-[70px]">An easy</h1>
            <h1 className="bg-gradient-to-r from-blue-900 via-sky-500 to-cyan-300  bg-clip-text text-transparent text-[70px] mx-4">Timeline</h1>
            <h1 className="text-white text-[70px]">Maker.</h1>
        </div>
        <div className="flex justify-center items-center">
            <p className="text-gray-400 text-[30px] font-thin">History, visualized.</p>
        </div>
        <div className="flex justify-center items-center mt-[35px]">
            <button className="text-sky-500 bg-white rounded-md py-2 px-4 text-[14px] text-lg my-5 ml-5 shadow-xl ring-1 ring-gray-900/5">Log In</button>
            <button className=" text-cyan-300 bg-black border-gray-300 text-[14px] rounded-md py-2 px-4 text-lg my-5 ml-3 mr-10 shadow-xl ring-1 ring-gray-900/5">Sign Up</button>
        </div>
    </div>
)

export default Hero