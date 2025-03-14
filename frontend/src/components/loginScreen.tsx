import { Lock, User2 } from "lucide-react"
import { useState } from "react";
import { useForm } from "react-hook-form"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {


  const navigate = useNavigate();
  const {handleSubmit, register, formState: {errors}} = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const [emailS, SetEmailS] = useState(false);
  const [passS, setPassS] = useState(false);

  const onsubmit = async (data: any,e: any) => {
    e.preventDefault();

    const { email, password} = data;

    const response = await fetch(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/auth/login`, 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      }
    );

    const info = await response.json();
    localStorage.setItem("Token", info.token);

    if(info.statusCode === 401){
      toast.error(info.msg)
    }else{
      // toast.success("Logged In");
      toast.success('Login successful!', { 
        duration: 4000, // Duration of the toast
        position: 'top-right', // Position of the toast
      });
    }
    if(info.token){
      // navigate('/home')
      navigate('/newHome')
    }

    console.log(info);
    
  }

  return (
    <div className="flex justify-center items-center bg-gray-200 h-screen">
      <div className=" w-full sm:w-1/2 md:w-1/3 py-10 bg-white mt-10 items-center ">

        <form className="w-full flex flex-col items-center" onSubmit={handleSubmit(onsubmit)}>
        <h1 className="text-xl font-semibold text-gray-700">Login</h1>

        {/* email field  */}
        <div className="flex items-center gap-4 mt-6 w-[70%]">
              <User2 className="text-gray-600" />
            <div className="flex flex-col w-full">
            <input
                id="email"
                className="my-1 w-full sm:w-full focus:outline-none text-black"
                type="text"
                placeholder="Enter your email"
                onClick={() => SetEmailS(!emailS)}
                {...register("email")}
                onBlur={() => SetEmailS(!emailS)}
                
              />
            <span className="text-red-600">{errors.email?.message}</span>
            <span style={{height: "2px", width: "100%", backgroundColor: `${emailS ? "blue": "black"}`}}/>
            </div>

            </div>


            {/* password field */}

            <div className="flex items-center gap-4 mt-6 w-[70%]">
              <Lock className="text-gray-600" />
            <div className="flex flex-col w-full">
            <input
                id="passowrd"
                className="my-1 w-full sm:w-full focus:outline-none text-black "
                type="text"
                placeholder="Enter your password"
                onClick={() => setPassS(!passS)}
                {...register("password")}
                onBlur={() => setPassS(!passS)}
                
              />
            <span style={{height: "2px", width: "100%", backgroundColor: `${passS ? "blue": "black"}`}}/>

            <span className="text-red-600">{errors.password?.message}</span>
            </div>

            </div>

           <div className="w-full flex flex-row justify-center items-center gap-4">
           <button
              // onClick={()}
                type="submit"
                className="mt-6 w-1/3 bg-gray-600 text-white p-2 rounded focus:outline-none cursor-pointer "
              >
                Login
              </button>
              <button
              onClick={() => navigate('/forgotPassword')}
                type="button"
                className="mt-6 w-1/3 bg-blue-600 text-white p-2 rounded focus:outline-none cursor-pointer "
              >
                Forget Password ?
              </button>
           </div>
        </form>
      </div>
    </div>
  )
}

export default LoginScreen

