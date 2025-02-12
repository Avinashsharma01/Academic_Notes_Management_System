import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-blue-600 p-4 text-white flex justify-between">
            <h1 className="text-xl font-bold">Hellomates</h1>
            <div>
                <Link to="/" className="px-3">
                    Home
                </Link>
                <Link to="/register" className="px-3">
                    Register
                </Link>
                <Link to="/login" className="px-3">
                    Login
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
