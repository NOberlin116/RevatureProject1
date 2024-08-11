import { useEffect, useState } from "react"
import { UserInterface } from "../../interfaces/UserInterface"
import { Button, Table } from "react-bootstrap"
import axios from "axios"


export const User: React.FC<{users:UserInterface[]}> = ({users}) => {

    useEffect(() => {
        console.log(users)
    })


    const [selectedUser, setSelectedUser] = useState<UserInterface>({
        userId:0,
        username:"default_user",
        role:""
    })


    const [userOptions, setUserOptions] = useState<boolean>(false)


    const [newUsername, setNewUsername] = useState<string>("")


    const selectUserData = (user:UserInterface) => {
        setSelectedUser(user)
        setUserOptions(!userOptions)
    }


    const updateUsername = async () => {


        if(newUsername){
            const response = await axios.patch("http://localhost:8080/users/" + selectedUser.userId, newUsername, {
                headers: {"Content-Type":"text/plain"} 
            })
            console.log(response.data)
            setUserOptions(!userOptions)
        }

    }

    return(
        <div className="container">

            <h3>Welcome Admin! All Users: </h3>

            {userOptions?
                <div className="m-5 w-25 d-flex flex-row">
                    <p className="m-2">{selectedUser.username}</p>
                    <input className="m-2" type="text" placeholder="new username" onChange={(input) => {
                        setNewUsername(input.target.value)
                    }}/>
                    <button className="m-2" onClick={updateUsername}>Submit</button>
                    <button className="m-2">Delete</button>
                </div>
                :
                <></>
            }

            <Table striped bordered hover variant="primary">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.userId} onClick={() => {selectUserData(user)}}>
                            <td >{user.userId}</td>
                            <td>{user.username}</td>
                            <td>{user.role}</td>
                            <td><Button variant="outline-danger">Fire User</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </div>
    )
}