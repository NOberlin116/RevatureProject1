import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserInterface } from "../../interfaces/UserInterface"
import { User } from "./User"
import "./UserContainer.css"

export const UserContainer: React.FC<any> = ({users:any}) => {

    const [users, setUsers] = useState<UserInterface[]>([])

    const navigate = useNavigate()

    useEffect(()=>{
        getAllUsers()
    }, [])

    const getAllUsers = async () => {

        const response = await axios.get("http://localhost:8080/users")
        .then(
            (response) => {
                console.log(response.data)
                setUsers(response.data) 
            }
        )

    }

    return(
        <div>
            <div className="button">
                <button onClick={()=>navigate("/reimbs")}>See All Reimbursements</button>
            </div>

            <User users={users}></User>
        </div>
    )

}