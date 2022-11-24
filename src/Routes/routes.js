import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Main from "../layouts/Main";
import Seller from "../Pages/Dashboard/Seller";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children:[
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path:'/dashboard',
                element: <DashboardLayout></DashboardLayout>,
                children:[
                    {
                        path:'/dashboard/seller/:id',
                        element: <Seller></Seller>
                    }
                ]
            }
        ]
    }
])