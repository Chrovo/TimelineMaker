import { useEffect, useRef } from "react";
import Card from "./Card";
import VanillaTilt from "vanilla-tilt";

const Benefits = () => {
    const cardRefs = [useRef(null), useRef(null), useRef(null)];

    useEffect(() => {
        cardRefs.forEach(ref => {
            if(ref.current) {
                VanillaTilt.init(ref.current, {});
            }
        });
    }, []);
    
    return (
    <div className="flex bg-slate-900 justify-center space-x-20">
        <script type="text/javascript" src="vanilla-tilt.js"></script>
        <Card ref={cardRefs[0]} text="Free" bullet1="No hidden fees" bullet2="Full access to all tools" bullet3="Unlimited timelines and sharing" color="text-blue-500" data-tilt/>
        <Card ref={cardRefs[1]} text="Style" bullet1="Built for teachers, with feedback in mind" bullet2="Fast, reliable performance" bullet3="Easy access anywhere" color="text-sky-500" data-tilt/>
        <Card ref={cardRefs[2]} text="Easy" bullet1="Drag & drop" bullet2="Intuitive Design" bullet3="Share with one click" color="text-cyan-300" data-tilt/>
    </div>
)}

export default Benefits