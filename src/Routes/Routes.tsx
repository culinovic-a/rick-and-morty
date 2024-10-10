import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Pages/LoginPage/Login";
import SignUp from "../Pages/SignUpPage/SignUp";
import Characters from "../Pages/CharactersPage/Characters";
import SingleCharacter from "../Pages/SingleCharacterPage/SingleCharacter";
import SingleLocation from "../Pages/SingleLocationPage/SingleLocation";

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
            {
                path: 'single-character/:id',
                element: <SingleCharacter />
            },
            {
                path: 'single-location/:id',
                element: <SingleLocation />
            },
        ]
    }
])