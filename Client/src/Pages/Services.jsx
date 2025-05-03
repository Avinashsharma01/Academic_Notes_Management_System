import { useEffect } from "react";
import Phase1 from "../Service_Page/Phase1";
import Phase2 from "../Service_Page/Phase2";
import Phase3 from "../Service_Page/Phase3";
import Phase4 from "../Service_Page/Phase4";
const Services = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="w-full min-h-screen h-auto flex flex-col justify-center bg-white items-center text-black">
            <Phase1 />
            <Phase2 />
            <Phase3 />
            <Phase4 />
        </div>
    );
};

export default Services;
