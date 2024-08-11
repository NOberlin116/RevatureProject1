import { FormControl } from "react-bootstrap"

export const AddReimb: React.FC = () => {

    return(
        <div className="container">
            <h3>Enter New Reimbursement Info:</h3>
            <FormControl type="text" placeholder="Enter Description" name="desc"></FormControl>
            <FormControl type="text" placeholder="Enter Amount" name="amount"></FormControl>
        </div>
    )
}