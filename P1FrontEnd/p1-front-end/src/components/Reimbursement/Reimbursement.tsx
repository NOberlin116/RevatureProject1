import { Button, Table } from "react-bootstrap"
import { ReimbInterface } from "../../interfaces/ReimbInterface"
import { useEffect } from "react"
import { store } from "../../globalData/store"
import { ReimbursementStatusUpdater } from "./ReimbursementStatusUpdater"


export const Reimbursement: React.FC<{reimbs:ReimbInterface[], onStatusUpdate: () => void}> = ({reimbs, onStatusUpdate}) => {


    const isAdmin = store.loggedInUser.role === "admin"
    //just to see the data in the console
    useEffect(()=>{
        console.log(reimbs)
    }, [reimbs])


    return(
        <div className="container">   

            <h3>{store.loggedInUser.username}'s Reimbursements:</h3>

            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Status</th>
                        {isAdmin && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {reimbs.map((reimb, index) => (
                        <tr key={reimb.reimbId}>
                            <td>{reimb.reimbId}</td>
                            <td>{reimb.user.username}</td>
                            <td>{reimb.description}</td>
                            <td>{reimb.amount}</td>
                            <td>{reimb.status}</td>
                            {isAdmin && (
                                <td>
                                    <ReimbursementStatusUpdater
                                        reimbId={reimb.reimbId}
                                        currentStatus={reimb.status}
                                        userRole={store.loggedInUser.role}
                                        onStatusUpdate={onStatusUpdate}
                                    />
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )

}