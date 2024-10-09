import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const NavigationNonAuth: React.FC = () => {
    const location = useLocation();

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between">
                <h1 className="text-white text-2xl">Rick and Morty</h1>
                <div className="space-x-4">
                    <Link
                        to="/login"
                        className={`text-white px-3 py-2 rounded transition duration-200 ${location.pathname === '/login' ? 'bg-gray-700' : 'hover:bg-gray-700'
                            }`}
                    >
                        Login
                    </Link>
                    <Link
                        to="/sign-up"
                        className={`text-white px-3 py-2 rounded transition duration-200 ${location.pathname === '/sign-up' ? 'bg-gray-700' : 'hover:bg-gray-700'
                            }`}
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default NavigationNonAuth;