import { useNavigate } from "react-router-dom"
import "./Login.css" 
import { useState } from "react"
import axios from "axios"
import { store } from "../../globalData/store"


export const Login: React.FC = () => {


    const[user, setUser] = useState({
        username:"",
        password:""
    })


    const navigate = useNavigate()


    const storeValues = (input:any) => {
 

 
        if(input.target.name === "username"){
            setUser((user) => ({...user, username:input.target.value}))
        } else {
            setUser((user) => ({...user, password:input.target.value}))
        }
 
    }

    const login = async () => {

        //TODO: We should validate user input here AND on the backend 

        const response = await axios.post("http://localhost:8080/auth", user, {withCredentials:true})
        .then(
            (response) => {

                console.log(response.data)

                store.loggedInUser = response.data

                alert("Welcome, " + store.loggedInUser.username)

                if(response.data.role === "user"){
                    navigate("/cars")
                } 

                if(response.data.role === "admin"){
                    navigate("/users")
                }
                
            }
        )
        .catch(
            (error) => {
                alert("Login failed! Try again and do better next time")
            }
        )
    }


    return(
        <div className="login">
            <div className="text-container">
                <h1>Welcome to the Reimbursement Center</h1>
                <h3>Log in to Create, View, and Manage your Reimbursements!</h3>

                <div className="input-container">
                    <input type="text" placeholder="Username" name="username" onChange={storeValues}/>
                </div>

                <div className="input-container">
                    <input type="password" placeholder="Password" name="password" onChange={storeValues}/>
                </div>

                <button className="login-button" onClick={login}>Login</button>
                <button className="login-button" onClick={() => navigate("/register")}>Create Account</button>
            </div>

        </div>
    )
}