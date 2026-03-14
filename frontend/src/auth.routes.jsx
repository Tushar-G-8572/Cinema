import {createBrowserRouter} from 'react-router'
import Login from './features/auth/pages/Login.jsx'
import Register from './features/auth/pages/Register.jsx';
import Home from './features/movie/pages/Home.jsx';

const router = createBrowserRouter([
    {
        path:"/",
        element: <Home />
    },
    {
        path:"/register",
        element: <Register />
    },
    {
        path:"/login",
        element:<Login />
    }

])

export default router;