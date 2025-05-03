import { useEffect } from "react";

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="w-full min-h-screen h-auto flex  justify-center flex-col items-center bg-white  text-black">
            <h1>Contact Us</h1>
        </div>
    );
};

export default Contact;
