import React, { useState } from "react";
import axios from "axios";

interface ReimbursementStatusUpdaterProps {
    reimbId: number | undefined;
    currentStatus: string;
    userRole: string;
    onStatusUpdate: () => void;
}

export const ReimbursementStatusUpdater: React.FC<ReimbursementStatusUpdaterProps> = ({ reimbId, currentStatus, userRole, onStatusUpdate }) => {
    const [status, setStatus] = useState<string>(currentStatus);

    const handleStatusChange = async () => {
        try {
            await axios.put(`http://localhost:8080/reimbs/${reimbId}/status`, null, {
                params: {
                    status: status,
                    userRole: userRole
                }
            });
            alert("Status updated successfully!");
            onStatusUpdate(); // Refresh the list after updating
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update status.");
        }
    };

    return (
        <div>
            <select value={status} onChange={(e) => setStatus(e.target.value)} onBlur={handleStatusChange}>
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Denied">Denied</option>
            </select>
        </div>
    );
};
