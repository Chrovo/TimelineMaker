import { db } from "../firebase/firebase"
import { collection, query, where, getDocs } from "firebase/firestore"
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import { signOut } from "../firebase/auth";
import { plus } from "../assets"

import Box from '../components/Box';
import Modal from '../components/Modal';
import { history } from '../assets'

const Timelines = () => {
  const [IsOpen, setIsOpen] = useState(false);
  const [timelines, setTimelines] = useState([]);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut();
      navigate("/");
    } catch(err) {
      console.error("Error logging out: " + err);
    }
  };

  useEffect(() => {
    if(!currentUser) {
      return;
    }

    const getUserTimelines = async () => {
      if(!currentUser) {
        return;
      }
      const q = query(collection(db, "timelines"), where("userId", "==", currentUser.uid));
      const querySnapshot = await getDocs(q);
      const timelines = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTimelines(timelines);
    };

    getUserTimelines();
  }, [currentUser]);

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
        <div className="flex flex-wrap gap-6 mt-10 ml-[50px]">
          {timelines.map((timeline) => (
            <Box 
              key={timeline.id} 
              coverImage={timeline.coverImage || history} 
              timelineName={timeline.name} lastEdited={timeline.createdAt?.toDate().toDateString()} 
              onClick={() => navigate(`/timeline/${timeline.id}`)}
            />
          ))}
        </div>
      </div>
      {currentUser && (<Modal userID={currentUser.uid} open={IsOpen} onClose={() => setIsOpen(false)} />)}
    </div>
  )
}

export default Timelines