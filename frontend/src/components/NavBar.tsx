import { Circle, FileQuestionIcon, Search, Settings, Siren } from "lucide-react"
import Filter from "./Filter"

const NavBar = ({ items, setItems}: {items: any, setItems: any}) => {
  return (
    <div className="bg-blue-600 h-[60px] flex flex-auto items-center justify-center">
        {/* <div className="transform translate-y-0 text-white"><SidebarTrigger/></div> */}
        <button className="flex justify-start mr-auto text-white p-2 font-semibold">To Do</button>
        <div className="flex w-1/4 justify-center absolute text-black">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-black"/>
        <Filter items={items} setItems={setItems}/>
        {/* <input type="text" className="bg-white rounded w-full h-10 px-1"/> */}
        </div>
        <div className="flex gap-8">
            <Settings className="text-white"/>
            <Siren className="text-white"/>
            <FileQuestionIcon className="text-white"/>
            <Circle className=" mr-4 text-white"/>
        </div>
    </div>
  )
}

export default NavBar