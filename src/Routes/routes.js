import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Main from "../layouts/Main";
import Products from "../Pages/Categories/Products";
import Allusers from "../Pages/Dashboard/Admin/Allusers";
import ReportedItems from "../Pages/Dashboard/Admin/ReportedItems";
import MyOrders from "../Pages/Dashboard/Buyer/MyOrders";
import AddProduct from "../Pages/Dashboard/Seller/AddProduct";
import MyProducts from "../Pages/Dashboard/Seller/MyProducts";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import AdminRoute from "./AdminRoute";
import BuyerRoute from "./BuyerRoute";
import PrivateRoute from "./PrivateRoute";
import SellerRoute from "./SellerRoute";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children:[
            {
                path: '/',
                element: <Home></Home>
            },
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
                        element: <BuyerRoute><MyOrders></MyOrders></BuyerRoute>
                    },
                    {
                        path:'/dashboard/allusers',
                        element: <AdminRoute><Allusers></Allusers></AdminRoute>
                    },
                    {
                        path:'/dashboard/reporteditems',
                        element: <AdminRoute><ReportedItems></ReportedItems></AdminRoute>
                    }
                ]
            }
        ]
    }
])