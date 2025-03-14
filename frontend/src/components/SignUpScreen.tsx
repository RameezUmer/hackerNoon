import { useForm } from "react-hook-form";
import { Lock, MailIcon, PartyPopperIcon, User2 } from "lucide-react";
import { useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemaSignUp } from "../constants/validation"
import { useState } from "react";
import card3 from "../assets/card3.jpg"

const SignUpScreen = () => {
  const navigate = useNavigate();
  const { handleSubmit, register, reset, formState: {errors} } = useForm({
    resolver: yupResolver(validationSchemaSignUp),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onChange"
  });

  const onSubmit = async (data: any) => {

    const {email, password, name} = data;

    const response = await fetch(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      })
    });

    const info = await response.json();
    localStorage.setItem("Token", info.token);

    if(info.token){
      navigate("/");
    }
    console.log(data);
    reset();
  };

  // const selected = watch("name");
  const [emailS, SetEmailS] = useState(false)
  const [nameS, setNameS] = useState(false);
  const [passS, setPassS] = useState(false);
  

  return (
    <div className="flex justify-center bg-gray-200 w-full min-h-screen p-4 sm:p-8 lg:p-10">
      <div className="w-full sm:w-[80%] lg:w-[70%] flex flex-col lg:flex-row bg-white rounded-lg shadow-lg m-4 sm:m-10 items-center">
        {/* section 1: Form */}
        <div className="w-full lg:w-1/2 px-4 sm:px-12 py-8 sm:py-12">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col bg-white">
            <div className="flex items-center gap-2 mt-8 mb-6">
              <h1 className="text-xl font-semibold text-gray-700">Welcome</h1>
              <PartyPopperIcon className="text-gray-600" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-700">Sign Up Here!</h1>
            <span style={{height: "2px", width: "20%", backgroundColor: "black"}}/>
            {/* Name Input */}
            <div className="flex items-center gap-4 mt-6">
              <User2 className="text-gray-600" />
            <div className="flex flex-col w-full">
            <input
                id="name"
                className="my-1 w-full sm:w-[75%] focus:outline-none text-black"
                type="text"
                placeholder="Enter your name"
                onClick={() => setNameS(!nameS)}
                {...register("name")}
                onBlur={() => setNameS(!nameS)}
                
              />
            <span className="text-red-600">{errors.name?.message}</span>
            </div>

            </div>
            <span style={{height: "1.5px", width: "85%", backgroundColor: `${nameS ? "blue": "black"}`}}/>


            {/* Email Input */}
            <div className="flex items-center gap-4 mt-6">
              <MailIcon className="text-gray-600" />
              <div className="flex flex-col w-full">
              <input
                id="email"
                className="my-1 w-full sm:w-[75%] focus:outline-none text-black"
                type="email"
                placeholder="Enter your Email"
                onClick={() => SetEmailS(!emailS)}
                {...register("email")}
                onBlur={() => SetEmailS(!emailS)}
              />
            <span className="text-red-600">{errors.email?.message}</span>
              </div>
            </div>
            <span style={{height: "1.5px", width: "85%", backgroundColor: `${emailS ? "blue": "black"}`}}/>

            {/* Password Input */}
            <div className="flex items-center gap-4 mt-6">
              <Lock className="text-gray-600" />
              <div className="flex flex-col w-full">
              <input
                id="password"
                className="my-1 w-full sm:w-[75%] focus:outline-none text-black"
                type="password"
                placeholder="Enter your Password"
                onClick={() => setPassS(!passS)}
                {...register("password")}
                onBlur={() => setPassS(!passS)}
              />
            <span className="text-red-600">{errors.password?.message}</span>
              </div>
            </div>
            <span style={{height: "1.5px", width: "85%", backgroundColor: `${passS ? "blue" : "black"}`}}/>

            <div className="flex gap-5 mt-4">
              <button
                type="submit"
                className="mt-6 bg-gray-800 text-white p-2 rounded w-full sm:w-1/2 focus:outline-none"
              >
                Sign Up
              </button>
              <button
              onClick={() => navigate("/Login") }
                type="button"
                className="mt-6 bg-gray-600 text-white p-2 rounded w-full sm:w-1/2 focus:outline-none"
              >
                Login
              </button>
            </div>
          </form>
        </div>

        {/* section 2: Image */}
        <div style={{backgroundImage: `url(${card3})`, height: "100%",}} className="hidden sm:flex relative lg:w-1/2 bg-center bg-cover rounded-lg">
        <div className="absolute top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 hidden lg:flex rounded-lg"></div>
        <div className="hidden sm:flex absolute top-0 left-0 w-full h-full justify-center items-center ">
          <h2 className="text-gray-200 text-2xl sm:flex hidden">Over the mountains across the sea <br/>There's a girl she's waiting for me</h2>
        </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpScreen;
