import { useState } from "react";
import { createTimeline } from "../utils/firestore";

const Modal = ({ userID, open, onClose }) => {
    if(!open) {
        return;
    }

    const [name, setName] = useState("");
    const [coverImage, setCoverImage] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await createTimeline(userID, name, coverImage);
            onClose();
        } catch(err) {
            console.error(err);
        }
    };

    return (
        <div className="bg-black bg-opacity-70 top-0 bottom-0 right-0 left-0 z-1000 fixed">
            <div className="bg-slate-800 fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-1000 w-[400px] h-[450px] rounded-lg">
                <form className="flex-row" onSubmit={onSubmit}>
                    <p className="text-white font-bold text-[40px] ml-[70px] mt-[15px]">New Timeline</p>
                    <p className="text-white font-semibold text-[20px] ml-[50px] mt-[15px]">Timeline Name</p>
                    <input type="text" placeholder="Name" className="ml-[50px] mt-[10px] border rounded-lg px-2 py-2" onChange={(e) => setName(e.target.value)} required />
                    <p className="text-white font-semibold text-[20px] ml-[50px] mt-[30px]">Cover Image</p>
                    <input type="text" placeholder="Cover Image URL" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} className="ml-[50px] mt-[30px] border rounded-lg px-2 py-2" required />
                    <div>
                        <button type="submit" className="text-white bg-black rounded-md py-2 px-4 text-[15px] text-lg shadow-xl ring-1 ring-gray-700 ml-[50px] mt-[10px]">Submit</button>
                    </div>
                </form>
                <button onClick={onClose} className="text-black bg-white rounded-md py-2 px-4 text-[15px] text-lg shadow-xl ring-1 ring-gray-700 ml-[50px] mt-[20px]">Close</button>
            </div>
        </div>
    )
}

export default Modal