import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Register.css"

export const Register: React.FC = () => {

    //TODO: change this to UserInterface(after lunch)
    const[user, setUser] = useState({
        username:"",
        password:"",
        role:"user"
    })

    const navigate = useNavigate()

    const storeValues = (input:any) => {

        if(input.target.name === "username"){
            setUser((user) => ({...user, username:input.target.value}))
        } else {
            //...else, change password 
            setUser((user) => ({...user, password:input.target.value}))
        }
    }

    const register = async () => {

        //TODO: check the the username and password are present

        const response = await axios.post("http://localhost:8080/users", user)
        .then((response) => {
            console.log(response.data)
            alert(response.data.username + " was created!")
            navigate("/")
        })
        .catch((error) => {
            alert("Register failed! Error message: " + error.message)
        })

    }

    return(
        <div className="register">
            <div className="text-container">
                <h3>Register for a new account here!</h3>

                <div className="input-container">
                    <input type="text" placeholder="Username" name="username" onChange={storeValues}/>
                </div>
                <div className="input-container">
                    <input type="password" placeholder="Password" name="password" onChange={storeValues}/>
                </div>

                <button className="login-button" onClick={register}>Submit</button>
                <button className="login-button" onClick={() => navigate("/")}>Back</button>
            </div>
        </div>
    )
}