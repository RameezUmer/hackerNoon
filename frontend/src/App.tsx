import "./index.css";
import Form from "./components/Form";
import "./app.css"
import LoginScreen from "./components/loginScreen";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ForgotPasswordScreen from "./components/ForgotPasswordScreen";
import SignUpScreen from "./components/SignUpScreen";
import OTPScreen from "./components/OTPScreen";
import ResetPasswordScreen from "./components/resetPasswordScreen";
import { Toaster } from "react-hot-toast";
import Home from "./components/Home";
import NavBar from "./components/NavBar";


const App = () => {
  const token = localStorage.getItem("Token");

  const router = createBrowserRouter(
    [
      {
        path:"/home",
        element:
        <div>
          <Form/>
        </div>
      },
      {
        path:"/",
        element:
        <div>
          { token ? <Form/> : <SignUpScreen/>}
        </div>
      },
      {
        path:"/login",
        element:
        <div>
          <LoginScreen/>
        </div>
      },
      {
        path:"/signup",
        element:
        <div>
          <SignUpScreen/>
        </div>
      },
      {
        path:"/forgotPassword",
        element:
        <div>
          <ForgotPasswordScreen/>
        </div>
      },
      {
        path:"/otp",
        element:
        <div>
          <OTPScreen otpLength={6}/>
        </div>
      },
      {
        path: '/resetPasswordScreen',
        element: 
        <div>
          <ResetPasswordScreen/>
        </div>
      },
      {
        path: '/newHome',
        element: 
        <div>
          <Home/>
        </div>
      },
      // {
      //   path: '/navbar',
      //   element: 
      //   <div>
      //     <NavBar/>
      //   </div>
      // }
     
    ]
  );

  return (
   <>
    {/* <SidebarProvider> */}
        {/* <AppSidebar /> */}
             <Toaster/>
                {/* <NavBar/> */}
                  <RouterProvider router={router}/>
    {/* </SidebarProvider> */}
   </>
  )
}

export default App
