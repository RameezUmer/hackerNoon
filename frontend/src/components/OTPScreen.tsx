import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const OTPScreen = ({ otpLength} : { otpLength: any}) => {
    
    const [otpFields, setOtpFields] = useState(new Array(otpLength).fill("")); 
    const ref = useRef<(HTMLInputElement | null)[]>([]);
    console.log(otpLength);
    const location = useLocation();
    const { email } = location.state;
    const Navigate = useNavigate();    
    console.log(ref);
    
    useEffect( () => {
        ref.current[0]?.focus();
    }, [])
    

    const handkeKeydown = (e: any, index: number) => {
        // console.log(e.key, e);
        
        const key = e.key;
        const copyOtpFields = [...otpFields];
        
        if(key === "Backspace"){
            console.log("Deletev pressed");
            copyOtpFields[index] = "";
            setOtpFields(copyOtpFields);
            ref.current[index - 1]?.focus();
            return;    
        }
        if(key === "ArrowRight"){
            ref.current[index + 1]?.focus();
            return;
        }
        if(key === "ArrowLeft"){
            ref.current[index - 1]?.focus();
            return;
        }
        if(isNaN(key)){
            return;
        }
        copyOtpFields[index] = key;
        if(index + 1 < otpFields.length){

            ref.current[index + 1]?.focus();
        }
        setOtpFields(copyOtpFields);
        
    }

    const sendOtp = async () => {
        const otp = otpFields.join("");
        console.log(email);
        
      try{
        const response = await fetch(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/otp/verifyOTP` , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',  // Set content type to JSON
            },
            body: JSON.stringify({
                email: email,
                otp: otp
            })
        })

        const info = await response.json();
        if(response.status === 200){
            Navigate(`/resetPasswordScreen?resetToken=${info.resetToken}`);
        } else{
            toast.error(info.msg)
        }
      }catch(err){
        toast.error(err)
        console.log("Error in sending otp to backend", err);
        
      }
        
        
    }
    
  return (

    <>
    <div className="bg-gray-200 h-screen flex flex-col gap-4 justify-center items-center w-full lg:w-full sm:w-full">
    <h1 className="text-black text-xl font-bold">OTP here</h1>
    <div className="flex gap-4 mb-4 justify-center h-[20%] items-center">
        {otpFields.map( (value, index) => {
            return <input
            type="number"
            ref={(currentInput) => (ref.current[index] = currentInput) as any}
            key={index}
            value={value}
            onKeyDown={(e) => handkeKeydown(e, index)}
            className="bg-white text-black border-1 h-[25%] w-[5%]" />
        } )}
    </div>
    <button onClick={sendOtp} className="bg-blue-600 p-2 rounded">Send OTP</button>
    </div>
    </>
  )
}

export default OTPScreen