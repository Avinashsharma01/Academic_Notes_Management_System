import { useEffect } from "react";
import Phase1 from "../About_page/Phase1";
import Phase2 from "../About_page/Phase2";
import Phase3 from "../About_page/Phase3";
import Phase4 from "../About_page/Phase4";
import Phase5 from "../About_page/Phase5";
import Phase6 from "../About_page/Phase6";
import Phase7 from "../About_page/Phase7";
const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        // bg-[#1E2A38]
        <div className="w-full min-h-screen h-auto flex flex-col items-center justify-center bg-white  text-black">
            <Phase1 />
            <Phase2 />
            <Phase3 />
            <Phase4 />
            <Phase5 />
            <Phase6 />
            <Phase7 />
        </div>
    );
};

export default About;
