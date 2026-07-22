import { useContext } from "react"
import Header from "../../Components/Header/Header"
import WhatsappSidebar from "../../Components/WhatsappSidebar/WhatsappSidebar"
import { ContactContext } from "../../Context/ContactContext"

function HomeScreen (){
    return (
        <div>
            <WhatsappSidebar/>
        
        </div>
    )
}

export default HomeScreen

