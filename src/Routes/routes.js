import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Main from "../layouts/Main";
import Products from "../Pages/Categories/Products";
import MyOrders from "../Pages/Dashboard/Buyer/MyOrders";
import AddProduct from "../Pages/Dashboard/Seller/AddProduct";
import MyProducts from "../Pages/Dashboard/Seller/MyProducts";
import Login from "../Pages/Login/Login";
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
                path:'/category/:id',
                element: <PrivateRoute><Products></Products></PrivateRoute>
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
                    {
                        path:'/dashboard/myorders',
                        element: <MyOrders></MyOrders>
                    }
                ]
            }
        ]
    }
])