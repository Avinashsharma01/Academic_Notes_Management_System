import { useNavigate } from "react-router-dom";
const Dashboard = () => {
    const navigate = useNavigate();
    return (
        <div className="p-5 bg-slate-600 w-full h-screen text-white">
            <h1>Dashboard</h1>
            <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error
                cupiditate illum laudantium inventore quibusdam incidunt dicta
                quasi officiis et quae vero fuga ex, vel obcaecati deserunt
                quidem omnis! Ex quidem dolores, non voluptas, harum quibusdam
                adipisci magnam veniam at deserunt sint animi numquam debitis, a
                doloribus provident aperiam officia ducimus quaerat praesentium!
                Modi voluptatibus vero placeat numquam alias cupiditate
                assumenda a delectus blanditiis iure earum consequatur, dolor
                exercitationem ullam quos aliquam suscipit similique animi
                eligendi esse mollitia. Est libero repellendus necessitatibus
                illum perferendis. Rerum impedit adipisci libero blanditiis
                repellat sint, magnam praesentium aliquid! Modi aperiam fugit
                autem dicta dolor vel.
            </p>

            <h1
                onClick={() => navigate("/notes")}
                className="bg-white text-black p-2 mt-5 inline-block cursor-pointer"
            >
                Go to notes page{" "}
            </h1>
        </div>
    );
};

export default Dashboard;
