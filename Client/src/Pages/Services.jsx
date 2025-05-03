import { useEffect } from "react";

const Services = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="w-full min-h-screen h-auto flex flex-col justify-center bg-white items-center text-black">
            <h1 className="text-3xl font-bold mb-4">Our Services</h1>
        </div>
    );
};

export default Services;
