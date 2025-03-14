import { useEffect, useState } from "react";
import Filter from "./Filter"
import Form from "./Form"
import NavBar from "./NavBar"

const Home = () => {
    const [items, setItems] = useState([]);
    const token = localStorage.getItem("Token");

    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch(
            `${import.meta.env.VITE_PUBLIC_BACKEND_URL}/activities`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();
    
          setItems(data);
        };
    
        fetchData();
      }, [token]);

  return (
    <div>
        <NavBar items={items} setItems={setItems}/>
        <Form items={items}/>
    </div>
    // <SidebarProvider>
    //   <AppSidebar />
    //   <main>
    //     <SidebarTrigger/>
    //   <Form/>
    //   </main>
    // </SidebarProvider>
  )
}

export default Home