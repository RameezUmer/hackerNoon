import { useNavigate } from "react-router-dom";
import Tasks from "./tasks"
import toast from "react-hot-toast";

const Form = ({items}: {items: any}) => {

  const token = localStorage.getItem("Token");
  const navigate = useNavigate();

  const addActivtiy = async (data: any) => {
      
      data.preventDefault();
      const newActivity = {
          
          name: data?.target.activity.value,
          time: data?.target.time.value
      }
      
      await fetch(`${import.meta.env.VITE_PUBLIC_BACKEND_URL}/AddActivity`, {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newActivity),
      }).then( () => {
          console.log("Added with success");
      }
        
  )
  

  data.target.activity.value = ""
      data.target.time.value = ""
  }


    // const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("Token");
        // window.location.href = "/App";
        // navigate("/loginScreen");
        toast.success("Logged out successfully")
        navigate('/login');
    }

    return (
    <div className="app">
    <header className="app-header">
      <h1>Productivity Tracker</h1>
      <form onSubmit={addActivtiy}>
        <div> 
          <label htmlFor="activity">Activity:</label>
          <input
            type="text"
            id="activity"
            name="activity"
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="time">Time Taken:</label>
          <input type="text" id="time" name="time" autoComplete="off" />
        </div>
        <button type="submit">Add</button>
      </form>
    </header>
    <main className="app-main">
      {/* <Tasks /> */}
    </main>
    <button onClick={logout} className="bg-green-100 text-black rounded mt-4 font-semibold"> Logout</button>
  </div>
  )
}

export default Form