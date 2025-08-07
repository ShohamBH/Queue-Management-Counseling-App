import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { editBusinessDetailsData } from "../../redux/businessDetailslice";

const EditBusinessDetails = () => {
    const dispatch = useDispatch();
    const businessDetails = useSelector((state) => state.businessDetails.businessDetailsData);
    const [editedDetails, setEditedDetails] = useState(businessDetails);
    const BASE_URL = "http://localhost:8787";

    useEffect(() => {
        setEditedDetails(businessDetails);
    }, [businessDetails]);

    const handleChange = (e) => {
        setEditedDetails({ ...editedDetails, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`${BASE_URL}/businessData`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editedDetails),
            });

            if (!response.ok) {
                throw new Error("Failed to update business details");
            }

            // לאחר שהעדכון הצליח, נטען את הנתונים מחדש מהשרת
            const refreshedRes = await fetch(`${BASE_URL}/businessData`);
            const refreshedData = await refreshedRes.json();

            // עדכון Redux וה-SessionStorage
            dispatch(editBusinessDetailsData(refreshedData));
            sessionStorage.setItem("businessDetails", JSON.stringify(refreshedData));

            alert("השינויים נשמרו בהצלחה");
        } 
        catch (error) {
            console.error("Error updating business details:", error);
            alert("שגיאה בעדכון פרטי העסק");
        }
    };

    return (
        <Box>
            <Typography variant="h6">ערוך פרטי עסק</Typography>
            <TextField label="מספר עסק" name="id" value={editedDetails.id} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="שם" name="name" value={editedDetails.name} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="כתובת" name="address" value={editedDetails.address} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="טלפון" name="phone" value={editedDetails.phone} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="תיאור" name="description" value={editedDetails.description} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="בעלים" name="owner" value={editedDetails.owner} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="לוגו" name="logo" value={editedDetails.logo} onChange={handleChange} fullWidth margin="normal" />
            <Button variant="contained" onClick={handleSave}>שמור</Button>
        </Box>
    );
};

export default EditBusinessDetails;
