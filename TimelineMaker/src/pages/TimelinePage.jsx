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
  const [connections, setConnections] = useState([]);
  const [draggingFrom, setDraggingFrom] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
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

  const handleConnectionStart = (eventId, side) => {
    setDraggingFrom({ eventId, side });
  };

  const handleConnectionEnd = (eventId, side) => {
    if (draggingFrom && draggingFrom.eventId !== eventId) {
      const newConnection = {
        from: draggingFrom,
        to: { eventId, side }
      };
      setConnections([...connections, newConnection]);
    }
    setDraggingFrom(null);
  };

  const handleMouseMove = (e) => {
    if (draggingFrom) {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const getConnectionPoint = (eventId, side) => {
    const element = document.getElementById(`event-${eventId}-${side}`);
    if (!element) return { x: 0, y: 0 };
    const rect = element.getBoundingClientRect();
    const container = document.getElementById('timeline-container').getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2 - container.left,
      y: rect.top + rect.height / 2 - container.top
    };
  };

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
        <div 
          id="timeline-container"
          onDrop={handleDrop} 
          onDragOver={handleDragOver} 
          onMouseMove={handleMouseMove}
          onMouseUp={() => setDraggingFrom(null)}
          className="flex-1 bg-white p-6 relative"
        >
          <p className="text-black text-xl font-bold">Timeline ID: {timelineId}</p>
          {!isViewOnly && (<p className="mt-2 text-gray-400">Drop your events here!</p>)}
          
          {/* SVG for connection lines */}
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            {/* Draw existing connections */}
            {connections.map((conn, idx) => {
              const from = getConnectionPoint(conn.from.eventId, conn.from.side);
              const to = getConnectionPoint(conn.to.eventId, conn.to.side);
              const midX = (from.x + to.x) / 2;
              
              return (
                <path
                  key={idx}
                  d={`M ${from.x} ${from.y} Q ${midX} ${from.y}, ${midX} ${(from.y + to.y) / 2} T ${to.x} ${to.y}`}
                  stroke="#665054"
                  strokeWidth="2"
                  fill="none"
                />
              );
            })}
            
            {/* Draw line being dragged */}
            {draggingFrom && (
              <path
                d={`M ${getConnectionPoint(draggingFrom.eventId, draggingFrom.side).x} ${getConnectionPoint(draggingFrom.eventId, draggingFrom.side).y} Q ${(getConnectionPoint(draggingFrom.eventId, draggingFrom.side).x + mousePos.x) / 2} ${getConnectionPoint(draggingFrom.eventId, draggingFrom.side).y}, ${(getConnectionPoint(draggingFrom.eventId, draggingFrom.side).x + mousePos.x) / 2} ${(getConnectionPoint(draggingFrom.eventId, draggingFrom.side).y + mousePos.y) / 2} T ${mousePos.x} ${mousePos.y}`}
                stroke="#665054"
                strokeWidth="2"
                fill="none"
              />
            )}
          </svg>
          
          <div className="mt-10 overflow-x-auto relative" style={{ zIndex: 2 }}>
            <div className="flex space-x-6 pb-4" style={{ minWidth: 'max-content' }}>
              {droppedItems.map((item, i) => (
                <div key={i} className="w-48 p-4 border rounded shadow bg-gray-100 flex-shrink-0 relative select-none">
                  {/* Left connection point */}
                  <div
                    id={`event-${i}-left`}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-gray-500 rounded-full cursor-pointer hover:scale-150 transition-transform z-10"
                    onMouseDown={() => handleConnectionStart(i, 'left')}
                    onMouseUp={() => handleConnectionEnd(i, 'left')}
                  />
                  
                  {/* Right connection point */}
                  <div
                    id={`event-${i}-right`}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-gray-500 rounded-full cursor-pointer hover:scale-150 transition-transform z-10"
                    onMouseDown={() => handleConnectionStart(i, 'right')}
                    onMouseUp={() => handleConnectionEnd(i, 'right')}
                  />
                  
                  <p className="font-bold">{item.type}</p>
                  <p>{item.text}</p>
                  <p>Event type: {item.type}</p>
                  <p className="text-sm text-gray-600">{item.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {isOpen && !isViewOnly && <EventModal isOpen={isOpen} onClose={() => setIsOpen(false)} onSave={addEvent} eventType={selectedType} />} 
    </div>
  )
}

export default TimelinePage