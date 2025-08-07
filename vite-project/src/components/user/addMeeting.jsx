import React, { useState } from "react";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { addMeetingHandler, validateForm } from './addMeetingH';


const AddMeeting = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const [formData, setFormData] = useState({
    id: "",
    serviceType: state?.serviceName || "",
    duration: state?.serviceDuration || 0,
    dateTime: dayjs(new Date()),
    clientName: "",
    clientPhone: "",
    clientEmail: "",
  });
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(true);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleClose = () => {
    setOpen(false);
    navigate('/'); // ניווט לדף הבית
  };

  const addMeetingHandlerWrapper = async () => {
    const formIsValid = validateForm(formData, setErrors);
    if (!formIsValid) return;

    try {
      const success = await addMeetingHandler(formData, setErrors, dispatch, navigate);
      if (success) {
        setOpen(false);
      }
    } catch (error) {
      setErrors({ form: "אירעה שגיאה בחיבור לשרת" });
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>קבע פגישה</DialogTitle>
        <DialogContent>
          <DialogContentText>נא למלא את כל השדות</DialogContentText>
          {errors.form && <p style={{ color: "red" }}>{errors.form}</p>}
          <TextField
            label="ת.ז" fullWidth
            error={!!errors.id} helperText={errors.id}
            onChange={(e) => handleChange("id", e.target.value)}
            sx={{ mt: 2 }} // ריווח בין השדות
          />
          <TextField
            label="סוג שירות" fullWidth
            error={!!errors.serviceType} helperText={errors.serviceType}
            value={formData.serviceType}
            onChange={(e) => handleChange("serviceType", e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            label="שם לקוח" fullWidth
            error={!!errors.clientName} helperText={errors.clientName}
            onChange={(e) => handleChange("clientName", e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            label="טלפון לקוח" fullWidth
            error={!!errors.clientPhone} helperText={errors.clientPhone}
            onChange={(e) => handleChange("clientPhone", e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            label="מייל לקוח" fullWidth
            error={!!errors.clientEmail} helperText={errors.clientEmail}
            onChange={(e) => handleChange("clientEmail", e.target.value)}
            sx={{ mt: 2 }}
          />
          <DateTimePicker
            label="תאריך ושעה"
            value={formData.dateTime}
            onChange={(newDateTime) => handleChange("dateTime", newDateTime)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ביטול</Button>
          <Button onClick={addMeetingHandlerWrapper} variant="contained">קבע פגישה</Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default AddMeeting;
