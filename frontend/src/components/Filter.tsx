import { useEffect, useRef, useState } from 'react'
import Tasks from './tasks';

const Filter = ({items , setItems }: {items: any, setItems: any}) => {

    // const [items, setItems] = useState([]);
    const [query, setQuery] = useState("");
    const inputRef = useRef<any>(null);
    // const token = localStorage.getItem("Token");
    // const [activities, setAcvtivities] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //       const response = await fetch(
    //         `${import.meta.env.VITE_PUBLIC_BACKEND_URL}/activities`,
    //         {
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //           },
    //         }
    //       );
    //       const data = await response.json();
    
    //       setItems(data);
    //     };
    
    //     fetchData();
    //   }, [token]);
    
  
    const hanndleSubmit = (e: any) => {
      e.preventDefault();
      const value = inputRef.current.value;
      
      if(value === "") return
  
      setItems( (prev: any) => 
        [
          ...prev,
          {value: value, id: Math.random()}
        ]
      )
      inputRef.current.value = "";

    }
  
    const filteredItems = items?.filter( item => {
      console.log(query, "querydata");
      console.log(items, "data");
      const data = query.trim();
      
      return item.value.toLowerCase().trim().includes(data.toLowerCase());

    });

    <Tasks filteredItems={filteredItems}/>
  
    // const filter = (e) => {
    //   const value = e.target.value;
    //   setItems(prev => {
    //     return prev.filter(item => item.value.toLowerCase().includes(value.toLowerCase()) )
    //   })
    // }
    // const filter = (e) => {
    //   const value = e.target.value;
    //   setFilteredItems(items.filter(item => item.value.toLowerCase().includes(value.toLowerCase()) )
    // )
    // }
    return (
      <>
       <input className="bg-white rounded w-full h-10 px-1" value={query} onChange={e => setQuery(e.target.value)} type='search'/>
       <br/>
       <br/>  
       <form onSubmit={hanndleSubmit}>
        {/* New Item: <input ref={inputRef} type='text'/>
        <button>Add</button> */}
       </form>
       {/* <h3>Items :</h3>
      {
        filteredItems.map(item => (
          <div key={item.id}>{item.value}</div>
        ))
      } */}
      </>
    )
}
export default Filter