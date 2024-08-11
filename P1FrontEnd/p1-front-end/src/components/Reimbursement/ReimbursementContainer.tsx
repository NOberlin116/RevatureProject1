import axios, { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { Reimbursement } from "./Reimbursement"
import { ReimbInterface } from "../../interfaces/ReimbInterface"
import "./ReimbursementContainer.css"
import { useNavigate } from "react-router-dom"
import { store } from "../../globalData/store"


export const ReimbursementContainer: React.FC = () => {

    const [reimbs, setReimbs] = useState<ReimbInterface[]>([])

    const navigate = useNavigate()

    useEffect(() => {
        getAllReimbs()
    }, [])

    const getAllReimbs = async () => {

        //TODO: send withCredentials to confirm the user is logged in)
        const response = await axios.get("http://localhost:8080/reimbs/" + store.loggedInUser.userId)

        setReimbs(response.data)

        console.log(response.data)

    }

    return(
        <div className="collection-container">

        <div>
            <button onClick={() => navigate("/")}>Back to Login</button>
            <button onClick={() => navigate("/addreimb")}>Add New Reimbursement</button>
            <button>Profile</button>
            {store.loggedInUser.role === "admin" ? <button onClick={() => navigate("/users")}>Users</button> : <></>}
        </div>

            {/* Sending the entire cars array to get rendered in the Car component table*/}
            <Reimbursement reimbs = {reimbs}></Reimbursement>


            {/*If you need to render multiple elements in map(), they need to be in a <div> */}

        </div>
    )
}