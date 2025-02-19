// import Phase3 from "../Components/Phase3";
import Phase3 from "../Components/Phase3";
import Slider from "../Components/Slider";
import image1 from "../assets/images/image1.avif";
import image2 from "../assets/images/image2.avif";
import image3 from "../assets/images/image3.avif";
import { Template1 } from "../assets/CarouselData";
import Section from "../Components/Section";
import Phase4 from "../ff/src/Components/Phase4";
import Phase6 from "../ff/src/Components/Phase6";
import Phase7 from "../ff/src/Components/Phase7";
import Phase8 from "../ff/src/Components/Phase8";
import Phase5 from "../Components/Phase5";
import Breadcrumb from "../Components/Breadcrumb";
// import StaticBreadCrum from "../Components/StaticBreadCrum";
function Home() {
    const images = [
        {
            url: image1,
        },
        {
            url: image2,
        },
        {
            url: image3,
        },
    ];
    return (
        <div className=" bg-slate-300 w-full h-auto py-5 text-white ">
            <div className="breadcrum max-w-7xl mx-auto w-full flex justify-between items-center">
                <Breadcrumb />
                {/* <StaticBreadCrum /> */}
            </div>

            <div className="section">
                <Section Template1={Template1} />
            </div>
            <Slider images={images} />

            <div className="phase3 p-5">
                {/* <Phase3 /> */}
                <Phase3 />
            </div>
            <div className="phase4 p-5 w-full h-auto flex justify-center items-center">
                <Phase4 />
            </div>
            <div className="section">
                <Section Template1={Template1} />
            </div>
            <div className="phase4 p-5 w-full h-auto flex justify-center items-center">
                <Phase5 />
            </div>
            <div className="phase4 p-5 w-full h-auto flex justify-center items-center">
                <Phase6 />
            </div>
            <div className="phase4 p-5 w-full h-auto flex justify-center items-center">
                <Phase7 />
            </div>
            <div className="phase4 p-5 w-full h-auto flex justify-center items-center">
                <Phase8 />
            </div>
        </div>
    );
}

export default Home;
