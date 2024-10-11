import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Pages/LoginPage/Login";
import SignUp from "../Pages/SignUpPage/SignUp";
import Characters from "../Pages/CharactersPage/Characters";
import SingleCharacter from "../Pages/SingleCharacterPage/SingleCharacter";
import SingleLocation from "../Pages/SingleLocationPage/SingleLocation";
import SingleEpisode from "../Pages/SingleEpisodePage/SingleEpisode";

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
                path: 'characters/:id',
                element: <SingleCharacter />
            },
            {
                path: 'location/:id',
                element: <SingleLocation />
            },
            {
                path: 'episode/:id',
                element: <SingleEpisode />
            },
        ]
    }
])