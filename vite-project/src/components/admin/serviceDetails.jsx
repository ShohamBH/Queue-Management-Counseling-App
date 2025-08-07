

import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import { TextField, Button, Box, Container, Grid, Typography, Alert } from "@mui/material";

const ServiceDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const service = location.state;
  const [name, setName] = useState(service?.name || "");
  const [description, setDescription] = useState(service?.description || "");
  const [price, setPrice] = useState(service?.price || "");
  const [duration, setDuration] = useState(service?.duration || "");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!service) {
      setError("שירות לא נמצא");
    }
  }, [service]);

  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>פרטי שירות</Typography>
      <Grid container spacing={2}>
      <Grid item xs={12}>
          <TextField label="מס השירות" variant="outlined" fullWidth value={id} disabled />
        </Grid>
        <Grid item xs={12}>
          <TextField label="שם השירות" variant="outlined" fullWidth value={name} disabled />
        </Grid>
        <Grid item xs={12}>
          <TextField label="תיאור" variant="outlined" fullWidth value={description} disabled />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="מחיר" variant="outlined" fullWidth type="number" value={price} disabled />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="משך (בדקות)" variant="outlined" fullWidth type="number" value={duration} disabled />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" color="error" onClick={() => navigate("/admin/services")}>חזרה</Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ServiceDetails;
