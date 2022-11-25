import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Main from "../layouts/Main";
import AddProduct from "../Pages/Dashboard/AddProduct";
import MyProducts from "../Pages/Dashboard/MyProducts";
import Login from "../Pages/Login/Login";
import Elitebook from "../Pages/Products/Elitebook";
import GamingLaptop from "../Pages/Products/GamingLaptop";
import Ultrabook from "../Pages/Products/Ultrabook";
import Signup from "../Pages/Signup/Signup";
import PrivateRoute from "./PrivateRoute";
import SellerRoute from "./SellerRoute";

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
                path:'/elitebook',
                element:<PrivateRoute><Elitebook></Elitebook></PrivateRoute>
            },
            {
                path:'/ultrabook',
                element:<PrivateRoute><Ultrabook></Ultrabook></PrivateRoute>
            },
            {
                path:'/gaminglaptop',
                element:<PrivateRoute><GamingLaptop></GamingLaptop></PrivateRoute>
            },
            {
                path:'/dashboard',
                element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
                children:[
                    {
                        path:'/dashboard/addproduct',
                        element: <SellerRoute><AddProduct></AddProduct></SellerRoute>
                    },
                    {
                        path:'/dashboard/myproducts',
                        element: <SellerRoute><MyProducts></MyProducts></SellerRoute>
                    },
                ]
            }
        ]
    }
])