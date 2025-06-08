import React from 'react'
import { useState } from "react"

const EventModal = ({ isOpen, onClose, onSave, eventType, x, y, defaultValues }) => {
    const [text, setText] = useState(defaultValues?.text || "");
    const [date, setDate] = useState(defaultValues?.date || "");

    const handleSubmit = () => {
        onSave({ type: eventType, text, date, x, y});
        onClose();
    }

    if(!isOpen) {
        return;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-xl w-80">
                <p className="text-[30px] font-bold mb-2">{eventType}</p>
                <input type="text" placeholder="Event Description" value={text} onChange={(e) => setText(e.target.value)} className="mt-2 border rounded-md px-2 py-2" />
                <input type="date" className="mb-2 mt-2 p-2 border w-full" value={date} onChange={(e) => setDate(e.target.value)} />
                <div className="flex justify-between">
                    <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                    <button onClick={onClose} className="text-gray-600">Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default EventModal