import { Button, Table } from "react-bootstrap"
import { ReimbInterface } from "../../interfaces/ReimbInterface"
//Note: we took out the CSS import, as we're using bootstrap
import { useEffect } from "react"
import { store } from "../../globalData/store"


//We're destructuring the cars array as props in a different way here (in the generic)
//this will allow us to easily access the Array in the .map() function
export const Reimbursement: React.FC<{reimbs:ReimbInterface[]}> = ({reimbs}) => {

    //just to see the data in the console
    useEffect(()=>{
        console.log(reimbs)
    }, [])


    return(
        <div className="container">   

            <h3>{store.loggedInUser.username}'s Reimbursements:</h3>

            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {reimbs.map((reimb, index) => (
                        <tr key={reimb.reimbId}>
                            <td>{reimb.reimbId}</td>
                            <td>{reimb.description}</td>
                            <td>{reimb.amount}</td>
                            <td>{reimb.status}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )

}