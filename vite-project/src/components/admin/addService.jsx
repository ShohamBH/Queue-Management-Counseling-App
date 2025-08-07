
import React, { useState } from "react";
import { TextField, Button, Alert, Box, Typography, Dialog } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const AddService = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({ name: "", description: "", price: "", duration: "" });
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(location.state?.open || false);

    const validateForm = () => {
        if (!formData.name || !formData.description || formData.price <= 0 || formData.duration <= 0) {
            setError("אנא מלא את כל השדות כנדרש.");
            return false;
        }
        setError(null);
        return true;
    };

    const addServiceHandler = async (e) => {
        e.preventDefault();
        if (!validateForm()) 
            return;

        try {
            const response = await fetch("http://localhost:8787/service", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, id: crypto.randomUUID() }),
            });

            if (!response.ok) 
                throw new Error("שגיאה בהוספת השירות.");

            setFormData({ name: "", description: "", price: "", duration: "" });
            setOpen(false);
            navigate("/admin/services");
            alert("השירות נוסף בהצלחה!");
            
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Dialog open={open} onClose={() => { setOpen(false); navigate("/admin/services"); }} maxWidth="sm" fullWidth>
            <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h5" gutterBottom>הוסף שירות חדש</Typography>
                <form onSubmit={addServiceHandler} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <TextField label="שם" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} fullWidth required />
                    <TextField label="תיאור" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} fullWidth multiline rows={3} required />
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <TextField label="מחיר (₪)" type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} fullWidth required />
                        <TextField label="משך (דקות)" type="number" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} fullWidth required />
                    </Box>
                    {error && <Alert severity="error">{error}</Alert>}
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Button onClick={() => { setOpen(false); navigate("/admin/services"); }} color="secondary">ביטול</Button>
                        <Button type="submit" color="primary" variant="contained">הוסף</Button>
                    </Box>
                </form>
            </Box>
        </Dialog>
    );
};

export default AddService;