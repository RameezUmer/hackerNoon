import { useState } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ForgotPasswordScreen = () => {

    const navigate = useNavigate();
    const [email ,setEmail] = useState("");
    const handleSubmit = async () => {

      try{

        const response = await fetch(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/otp/requestPasswordReset`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({email})
        });
        
        const data = await response.json();
        if (response.status === 200) {
          // setIsOtpSent(true);
          toast.success(data.msg);
          navigate('/otp', {state: {email}});
        } else {
          toast.error(data.msg);
        }
      } catch (err){
        toast.error('Something went wrong');
      }
    }
  return (

    <motion.div
    initial={{ opacity: 0}}
    animate={{ opacity: 5}}
    exit={{opacity: 0}}
    transition={{ duration: 1.2 }}
    >
    <div className="w-screen h-screen flex justify-center items-center bg-gray-200">
        <div className="bg-white w-1/3 flex flex-col justify-center items-center p-10">
            <div className="text-black font-semibold">
            Enter your Email
            </div>
            <div className="w-full flex flex-col justify-center items-center gap-8">
                <input
                className="mt-8 border-1 backdrop-blur-2xl bg-white text-black w-2/3 p-2 rounded-2xl"
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
                 type="text" />
                 <button className="bg-blue-600 w-1/2 p-2 rounded-4xl" onClick={handleSubmit}>
                    Send Email/OTP 
                 </button>
            </div>
        </div>
    </div>
      </motion.div>
  )
}

export default ForgotPasswordScreen