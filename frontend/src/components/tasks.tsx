import { Edit3Icon, Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const Tasks = ({ filteredItems}: {filteredItems: any}) => {

  const [activities, setAcvtivities] = useState(filteredItems);
  const token = localStorage.getItem("Token");
  console.log(activities, 'From task section');

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_PUBLIC_BACKEND_URL}/activities`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     const data = await response.json();

  //     setAcvtivities(data);
  //   };

  //   fetchData();
  // }, [token]);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PUBLIC_BACKEND_URL}/deleteActivtiy/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (result.msg === "Activity deleted seccessfully") {
        setAcvtivities(activities.filter((item: any) => item._id !== id));
      } else {
        toast.error("Error", result.error);
      }
    } catch (err) {
      toast.error("Error occured");
    }
  };

  const handleEdit = async (id: string, updatedData: any) => {
    console.log(updatedData, "->>>>>", id, "just befier teh fectb calll");

    const response = await fetch(
      `${import.meta.env.VITE_PUBLIC_BACKEND_URL}/editActivtiy/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          updatedData
        ),
      }
    );

    const newData = await response.json();
    console.log(newData, "////newData");

    setAcvtivities((prev: any) =>
      prev.map((item: any) => {
        return item._id === id ? newData.activity : item;
      })
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold">Today</h1>

      {activities && activities.length > 0 ? (
        <ol>
          {activities.map((activity: any) => (
            <li className="p-2 flex items-center gap-4" key={activity._id}>
              {activity.name} - {activity.time}
              <button
                onClick={() => {
                  const updatedName =
                    prompt("Enter new activity details:") || activity.name;
                  const updatedTime = prompt("Enter new time") || activity.time;
                  handleEdit(activity._id, {
                    name: updatedName,
                    time: updatedTime,
                  });
                }}
                className="ml-auto"
              >
                <Edit3Icon size={18} />
              </button>
              <button onClick={() => handleDelete(activity._id)}>
                <Trash size={18} />
              </button>
            </li>
          ))}
        </ol>
      ) : (
        <p>No activities! yet</p>
      )}
    </div>
  );
};

export default Tasks;

// mongodb+srv://rameezumer:<db_password>@cluster0.yihap.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// const DB_URI = 'mongodb+srv://rameezumer:W9Rt77rbcUxYCNE0@cluster0.yihap.mongodb.net/databaseUno?retryWrites=true&w=majority&appName=Cluster0';
