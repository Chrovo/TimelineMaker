import { db } from "../firebase/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore"
import { v4 } from "uuid"

export const createTimeline = async (userId, name, coverImageUrl="") => {
    const shareString = v4().slice(0, 8);
    return await addDoc(collection(db, "timelines"), {
        userId,
        name,
        coverImageUrl,
        events: [],
        shareString,
        createdAt: Timestamp.now()
    });
}