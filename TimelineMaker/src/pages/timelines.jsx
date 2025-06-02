import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from "../firebase/auth";
import { plus } from "../assets"

import Box from '../components/Box';
import Modal from '../components/Modal';
import { organized } from '../assets'

const Timelines = () => {
  const [IsOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  const logout = async () => {
    try {
      await signOut();
      navigate("/");
    } catch(err) {
      console.error("Error logging out: " + err);
    }
  };

  return (
    <div className="bg-slate-900 flex-row w-screen h-screen">
      <div className="flex justify-end">
        <button onClick={logout} disabled={IsOpen} className="text-white bg-black  border-gray-300 text-[14px] rounded-md py-2 px-4 text-lg my-5 ml-3 mr-10 shadow-xl ring-1 ring-gray-700">
          Logout
        </button>
      </div>
      <div className="flex justify-center font-bold">
        <p className="bg-gradient-to-r from-blue-700 via-sky-500 to-cyan-300  bg-clip-text text-transparent text-[60px]">Your Timelines</p>
      </div>
      <div className="ml-[100px]">
        <button disabled={IsOpen} onClick={() => setIsOpen(true)} className="flex text-white bg-black  border-gray-300 text-[50px] rounded-md py-4 px-6 text-lg shadow-xl ring-1 ring-gray-700">
          <img src={plus} className="h-[20px] w-[20px] mt-1 mr-2"/>
          <p>New</p>
        </button>
        <div className="mt-10">
          <Box coverImage={organized} timelineName="Vietnam War" lastEdited="Last Edited: Yesterday, 11:32 PM"/>
        </div>
      </div>
      <Modal open={IsOpen} onClose={() => setIsOpen(false)}>Fancy Modal</Modal>
    </div>
  )
}

export default Timelines