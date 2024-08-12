import { FormControl } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddReimb.css"

export const AddReimb: React.FC<{ userId: any }> = ({ userId }) => {
    const [reimb, setReimbs] = useState({
        description: "",
        amount: 0,
        status: "Pending", // Ensure status is set to "Pending"
        userId: userId,
    });

    const navigate = useNavigate();

    const storeValues = (input: any) => {
        if (input.target.name === "desc") {
            setReimbs((reimb) => ({ ...reimb, description: String(input.target.value) }));
        } else if (input.target.name === "amount") {
            setReimbs((reimb) => ({ ...reimb, amount: Number(input.target.value) }));
        }
    };

    const clearForm = () => {
        setReimbs({
            description: "",
            amount: 0,
            status: "Pending", // Reset status to "Pending"
            userId: userId,
        });
    };

    const add = async () => {
        try {
            console.log("Sending reimbursement data: ", reimb);
            const response = await axios.post("http://localhost:8080/reimbs", reimb);
            console.log(response.data);
            alert("Reimbursement was created!");
            clearForm(); // Clear the form fields
            navigate("/reimbs");
        } catch (error) {
            console.error("Error: ", error);
            alert("Adding Reimbursement Failed! Error message: " + error);
        }
    };

    return (
        <div className="container">
            <h3>Enter New Reimbursement Info:</h3>
            <FormControl
                type="text"
                placeholder="Enter Description"
                name="desc"
                value={reimb.description} // Bind value to state
                onChange={storeValues}
            />
            <FormControl
                type="number"
                placeholder="Enter Amount"
                name="amount"
                value={reimb.amount} // Bind value to state
                onChange={storeValues}
            />
            <button className="submit-button" onClick={add}>
                Submit
            </button>
        </div>
    );
};
