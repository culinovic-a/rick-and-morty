import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Pages/LoginPage/Login";
import SignUp from "../Pages/SignUpPage/SignUp";
import Characters from "../Pages/CharactersPage/Characters";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'sign-up',
                element: <SignUp />
            },
            {
                path: 'characters',
                element: <Characters />
            },
        ]
    }
])