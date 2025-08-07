import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setServices } from "../redux/servicesSlice";
import { setMeetings } from "../redux/meetingsSlice";
import Service from "./service";
import { Alert, Box, Typography } from "@mui/material";
import AddService from "./admin/addService";

const ViewService = () => {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.services.servicesList);
  const meetings = useSelector((state) => state.meetings.meetingsList);
  const isConnect = useSelector((state) => state.isLogin.isConnect);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:8787/services");
        if (!response.ok) {
          throw new Error("שגיאה בשליפת השירותים.");
        }
        const data = await response.json();
        dispatch(setServices(data));
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchMeetings = async () => {
      try {
        const response = await fetch("http://localhost:8787/appointments");
        if (!response.ok) {
          throw new Error("שגיאה בשליפת הפגישות.");
        }
        const data = await response.json();
        dispatch(setMeetings(data));
      } catch (err) {
        setError(err.message);
      }
    };

    fetchServices();
    fetchMeetings();
  }, [dispatch]);

  if (error)
     return <Alert severity="error">{error}</Alert>;

  const servicesWithMeetings = services.map(service => ({
    ...service,
    meetingCount: meetings.filter(meeting => meeting.serviceType === service.name).length
  }));

  return (
    <Box sx={{ textAlign: "center", mt: 2 }}>
      {isConnect === "admin" && <AddService />} 

      {servicesWithMeetings.length > 0 ? (
        servicesWithMeetings.map((service) => (
          <Box
            key={service.id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2
            }}
          >
            <Service {...service} />
            {isConnect === "admin" && (
              <Typography sx={{ ml: 2, fontWeight: "bold", whiteSpace: "nowrap" }}>
                נקבעו {service.meetingCount} פגישות
              </Typography>
            )}
          </Box>
        ))
      ) : (
        <Typography>אין שירותים זמינים.</Typography>
      )}
    </Box>
  );
};

export default ViewService;
