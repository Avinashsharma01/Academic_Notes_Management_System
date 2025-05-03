import { useEffect } from "react";
import Phase1 from "../Contact_page/Phase1";
import Phase2 from "../Contact_page/Phase2";
const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="w-full min-h-screen h-auto flex  justify-center flex-col items-center bg-white  text-black">
            <Phase1 />
            <Phase2 />
        </div>
    );
};

export default Contact;
