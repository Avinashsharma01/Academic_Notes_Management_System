import { useEffect } from "react";

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        // bg-[#1E2A38]
        <div className="w-full min-h-screen h-auto flex flex-col items-center justify-center bg-white  text-black">
            <h1 className="text-3xl font-bold mb-4">About Us</h1>
        </div>
    );
};

export default About;
