import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  }

  const goToSignup = () => {
    navigate("/signup");
  }
  
  return (<div className="bg-slate-900 flex justify-between">
      <div className="my-5 ml-10">
        {/*Logo on top left*/}
        <p className="bg-gradient-to-r from-blue-700 via-sky-500 to-cyan-300  bg-clip-text text-transparent text-[20px]">Chrono</p>
      </div>
      <div>
        {/*Sign Up and Log in buttons*/}
        <button onClick={goToLogin} className="text-white bg-black rounded-md py-2 px-4 text-[14px] text-lg my-5 ml-5 shadow-xl ring-1 ring-gray-700">
          Log In
        </button>
        <button onClick={goToSignup} className="text-black bg-white  border-gray-300 text-[14px] rounded-md py-2 px-4 text-lg my-5 ml-3 mr-10 shadow-xl ring-1 ring-gray-700">
          Sign Up
        </button>
      </div>
    </div>)
}

export default Navbar