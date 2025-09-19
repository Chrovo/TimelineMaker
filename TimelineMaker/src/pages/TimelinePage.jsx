import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../firebase/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { signOut } from "../firebase/auth";
import EventModal from "../components/EventModal"

const TimelinePage = () => {
  const navigate = useNavigate();
  const { timelineId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [droppedItems, setDroppedItems] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const queryParams = new URLSearchParams(window.location.search);
  const isViewOnly = queryParams.get("view") == "true";
  const eventTypes = [
    { name: "Event", color: "rgb(249, 115, 22)", bgClass: "bg-orange-500" },
    { name: "War", color: "rgb(168, 85, 247)", bgClass: "bg-purple-500" },
    { name: "Election", color: "rgb(244, 63, 94)", bgClass: "bg-rose-500" },
    { name: "Movement", color: "rgb(234, 179, 8)", bgClass: "bg-yellow-500" },
    { name: "Discovery", color: "rgb(59, 130, 246)", bgClass: "bg-blue-500" },
    { name: "Assassination", color: "rgb(239, 68, 68)", bgClass: "bg-red-500" },
  ];

  const createDragImage = (eventType) => (e) => {
    e.dataTransfer.setData("text/plain", eventType.name);
    
    const dragImage = document.createElement('div');
    dragImage.style.width = '25px';
    dragImage.style.height = '25px';
    dragImage.style.backgroundColor = eventType.color;
    dragImage.style.borderRadius = '50%';
    dragImage.style.opacity = '1';
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-1000px';
    
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 8, 8);
    setTimeout(() => document.body.removeChild(dragImage), 0);
  };

  useEffect(() => {
    const getEvents = async () => {
      const q = await getDocs(collection(db, "timelines", timelineId, "events"));
      const items = q.docs.map(doc => doc.data());
      items.sort((a, b) => new Date(a.date) - new Date(b.date));
      setDroppedItems(items);
    }
    getEvents();
  }, [timelineId]);

  const logout = async () => {
    try {
      await signOut();
      navigate("/");
    } catch(err) {
      console.error("Error logging out: " + err);
    }
  };

  const handleDrop = (e) => {
    if(isViewOnly) {
      return;
    }
    e.preventDefault();
    const eventType = e.dataTransfer.getData("text/plain");
    setSelectedType(eventType);
    setIsOpen(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

const addEvent = async (data) => {
  const eventData = {
    ...data,
    type: selectedType,
  };

  if (eventData.x === undefined) delete eventData.x;
  if (eventData.y === undefined) delete eventData.y;

  const doc = collection(db, "timelines", timelineId, "events");
  await addDoc(doc, eventData);

  const sortedItems = [...droppedItems, eventData].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  setDroppedItems(sortedItems);
  setIsOpen(false);
};

  const shareTimeline = async () => {
    const viewOnlyUrl = `${window.location.origin}/timeline/${timelineId}?view=true`;
    await navigator.clipboard.writeText(viewOnlyUrl);
    alert("View-only link copied to clipboard!");
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-white flex justify-between">
        <div className="my-5 ml-10">
          <p className="bg-gradient-to-r from-blue-700 via-sky-500 to-cyan-300  bg-clip-text text-transparent text-[20px] font-semibold">Chrono</p>
        </div>
        {
          !isViewOnly && (
            <div>
            <button onClick={logout} className="text-white bg-black  border-gray-300 text-[14px] rounded-md py-2 px-4 text-lg my-5 ml-3 mr-10 shadow-xl ring-1 ring-gray-700">
              Logout
            </button>
            <button onClick={shareTimeline} className="text-black bg-white  border-gray-300 text-[14px] rounded-md py-2 px-4 text-lg my-5 mr-10 shadow-xl ring-1 ring-gray-700">
              Share
            </button>
          </div>
        )}
      </div>
      <div className="top-0 right-0 h-[5px] w-full bg-gray-400" />
      <div className="flex flex-1">
        
        {!isViewOnly && (
            <div className="bg-gray-200 text-black w-[250px] p-4 relative">
            <div className="mt-4 ml-[70px] font-semibold text-[20px]">Sidebar</div>
            <div className="absolute top-0 right-0 h-full w-[5px] bg-gray-400" />
            <div className="mt-6 space-y-4">
              <div className="mt-6 space-y-4">
                {eventTypes.map((eventType) => (
                  <div
                    key={eventType.name}
                    draggable
                    onDragStart={createDragImage(eventType)}
                    className="flex items-center cursor-pointer"
                  >
                    <div className={`w-4 h-4 ${eventType.bgClass} rounded-full mr-2`}></div>
                    <div>{eventType.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div onDrop={handleDrop} onDragOver={handleDragOver} className="flex-1 bg-white p-6">
          <p className="text-black text-xl font-bold">Timeline ID: {timelineId}</p>
          {!isViewOnly && (<p className="mt-2 text-gray-400">Drop your events here!</p>)}
          <div className="mt-10 space-y-4">
            {droppedItems.map((item, i) => (
              <div key={i} className="p-4 border rounded shadow bg-gray-100">
                <p className="font-bold">{item.type}</p>
                <p>{item.text}</p>
                <p>Event type: {item.type}</p>
                <p className="text-sm text-gray-600">{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isOpen && !isViewOnly && <EventModal isOpen={isOpen} onClose={() => setIsOpen(false)} onSave={addEvent} eventType={selectedType} />} 
    </div>
  )
}

export default TimelinePage