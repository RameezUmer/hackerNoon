import { Lock } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPasswordScreen = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  // const { resetToken } = location.state;
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get("resetToken");
  const [newPassword, setNewPassword] = useState("");
  console.log(resetToken, "token");

  const submitHandler = async (e: any) => {
    e.preventDefault();

    try {
      console.log(resetToken, "from inside catch");

      const response = await fetch(
        `${import.meta.env.VITE_PUBLIC_BACKEND_URL}/otp/resetPassword`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: resetToken,
            newPassword: newPassword,
          }),
        }
      );
      const info = await response.json();
      console.log(info);

      if (info === 200 || 201 || 202 || 203 || 204) {
        toast.success("passowrd reset successful")
        navigate("/login");
      } else {
        return;
      }
    } catch (err) {
      console.log("Error while sending reset password", err);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-200 h-screen">
      <div className=" w-full sm:w-1/2 md:w-1/3 py-10 bg-white mt-10 items-center ">
        <form
          className="w-full flex flex-col items-center"
          onSubmit={submitHandler}
        >
          <h1 className="text-xl font-semibold text-gray-700">
            Enter New Password
          </h1>

          {/* password field */}
          <div className="flex items-center gap-4 mt-6 w-[70%]">
            <Lock className="text-gray-600" />
            <div className="flex flex-col w-full">
              <input
                id="passowrd"
                className="my-1 w-full sm:w-full focus:outline-none text-black "
                type="text"
                placeholder="Enter new password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full flex flex-row justify-center items-center gap-4">
            <button
              // onClick={()}
              type="submit"
              className="mt-6 w-1/3 bg-gray-600 text-white p-2 rounded focus:outline-none cursor-pointer "
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordScreen;
