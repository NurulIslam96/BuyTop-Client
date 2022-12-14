import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Main from "../layouts/Main";
import Blog from "../Pages/Blog/Blog";
import Products from "../Pages/Categories/Products";
import AllBuyers from "../Pages/Dashboard/Admin/AllBuyers";
import AllSellers from "../Pages/Dashboard/Admin/AllSellers";
import ReportedItems from "../Pages/Dashboard/Admin/ReportedItems";
import MyOrders from "../Pages/Dashboard/Buyer/MyOrders";
import AddProduct from "../Pages/Dashboard/Seller/AddProduct";
import MyProducts from "../Pages/Dashboard/Seller/MyProducts";
import Payment from "../Pages/Dashboard/Seller/Payment";
import WelcomePage from "../Pages/Dashboard/WelcomePage/WelcomePage";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import ProfileInfo from "../Pages/ProfileInfo/ProfileInfo";
import Signup from "../Pages/Signup/Signup";
import AdminRoute from "./AdminRoute";
import BuyerRoute from "./BuyerRoute";
import PrivateRoute from "./PrivateRoute";
import SellerRoute from "./SellerRoute";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
      {
        path: "/category/:id",
        element: (
          <PrivateRoute>
            <Products></Products>
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <ProfileInfo></ProfileInfo>
          </PrivateRoute>
        ),
      },
      {
        path: "/blogs",
        element: <Blog></Blog>,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout></DashboardLayout>
          </PrivateRoute>
        ),
        children: [
          {
            path: "/dashboard/addproduct",
            element: (
              <SellerRoute>
                <AddProduct></AddProduct>
              </SellerRoute>
            ),
          },
          {
            path: "/dashboard",
            element: (
              <PrivateRoute>
                <WelcomePage></WelcomePage>
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/myproducts",
            element: (
              <SellerRoute>
                <MyProducts></MyProducts>
              </SellerRoute>
            ),
          },
          {
            path: "/dashboard/myorders",
            element: (
              <BuyerRoute>
                <MyOrders></MyOrders>
              </BuyerRoute>
            ),
          },
          {
            path: "/dashboard/allsellers",
            element: (
              <AdminRoute>
                <AllSellers></AllSellers>
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/allbuyers",
            element: (
              <AdminRoute>
                <AllBuyers></AllBuyers>
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/reporteditems",
            element: (
              <AdminRoute>
                <ReportedItems></ReportedItems>
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/payment/:id",
            element: (
              <BuyerRoute>
                <Payment></Payment>
              </BuyerRoute>
            ),
            loader: ({ params }) =>
              fetch(`${process.env.REACT_APP_api_link}/payment/${params.id}`, {
                headers: {
                  authorization: `bearer ${localStorage.getItem(
                    "buytop-token"
                  )}`,
                },
              }),
          },
        ],
      },
    ],
  },
]);
