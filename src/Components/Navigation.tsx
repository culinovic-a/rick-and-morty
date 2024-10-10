import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navigation: React.FC = () => {
    const location = useLocation();
    const { isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between">
                <h1 className="text-white text-2xl">Rick and Morty</h1>
                <div className="space-x-4">
                    {!isAuthenticated && (
                        <>
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
                        </>
                    )}
                    {isAuthenticated && (
                        <>
                            <Link
                                to="/characters"
                                className={`text-white px-3 py-2 rounded transition duration-200 ${location.pathname === '/characters' ? 'bg-gray-700' : 'hover:bg-gray-700'
                                    }`}
                            >
                                Characters
                            </Link>
                            <Link
                                to="/login"
                                onClick={handleLogout}
                                className={`text-white px-3 py-2 rounded transition duration-200 ${location.pathname === '/log-out' ? 'bg-gray-700' : 'hover:bg-gray-700'
                                    }`}
                            >
                                Logout
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navigation;