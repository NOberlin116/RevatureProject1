import axios from "axios";
import { useEffect, useState } from "react";
import { Reimbursement } from "./Reimbursement";
import { ReimbInterface } from "../../interfaces/ReimbInterface";
import "./ReimbursementContainer.css";
import { useNavigate } from "react-router-dom";
import { store } from "../../globalData/store";
import { AddReimb } from "./AddReimb";

export const ReimbursementContainer: React.FC = () => {
    const [reimbs, setReimbs] = useState<ReimbInterface[]>([]);
    const [filter, setFilter] = useState("all");
    const [refresh, setRefresh] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        console.log("UserId: ", store.loggedInUser.userId)
        getReimbs();
    }, [filter, refresh]); // Fetch reimbursements when filter, sort, or refresh changes

    const getReimbs = async () => {
        try {
            // Base URL with filter for status
            let url = `http://localhost:8080/reimbs?status=${filter}`;
            console.log("User ID: ", store.loggedInUser.userId)
            // Append userId if the user is not an admin
            if (store.loggedInUser.role !== "admin") {
                url += `&userId=${store.loggedInUser.userId}`;
            }
    
            console.log("Fetching URL:", url);  // Log URL to verify
    
            // Fetch data from API
            const response = await axios.get(url);
            console.log("API Response Data:", response.data);  // Log response data
    
            let allReimbs = response.data;
            console.log("Reimbs from Back: ", allReimbs)
            if (store.loggedInUser.role === "user") {
                allReimbs = allReimbs.filter((reimb: ReimbInterface) => reimb.user.userId === store.loggedInUser.userId);
            }
            // Apply filtering based on status
            if (filter === "Pending") {
                allReimbs = allReimbs.filter((reimb: ReimbInterface) => reimb.status === "Pending");
            }
            // Set state with filtered reimbursements
            setReimbs(allReimbs);
            console.log('Filtered reimbursements:', allReimbs);
        } catch (error) {
            console.error("Error fetching reimbursements:", error);
        }
    };
    
    

    const refreshComponent = () => {
        setRefresh(prev => !prev);
    };

    function handleStatusChange(): void {
        throw new Error("Function not implemented.");
    }

    return (
        <div className="collection-container">
            <div className="button-container">
                <button onClick={() => navigate("/")}>Logout</button>
                <button onClick={refreshComponent}>Refresh Reimbursements</button>
                {store.loggedInUser.role === "admin" ? (
                    <button onClick={() => navigate("/users")}>Users</button>
                ) : null}
            </div>

            <div className="filter-container">
                <label htmlFor="filter">Show: </label>
                <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">All Reimbursements</option>
                    <option value="Pending">Pending Reimbursements</option>
                </select>
            </div>
                
            <Reimbursement reimbs={reimbs} onStatusUpdate={handleStatusChange}/>
            <AddReimb userId={store.loggedInUser.userId} />
        </div>
    );
};
