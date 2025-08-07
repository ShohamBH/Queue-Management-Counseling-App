
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { setMeetings } from "../../redux/meetingsSlice";
import { Card, CardContent, Typography, Box, Alert, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ViewMeetings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const meetings = useSelector((state) => state.meetings.meetingsList);
  const BASE_URL = "http://localhost:8787";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const res = await fetch(`${BASE_URL}/appointments`);
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        const data = await res.json();
        const sortedMeetings = data.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
        dispatch(setMeetings(sortedMeetings));
        setLoading(false);
      } 
      catch (err) {
        console.error("Error fetching meetings:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMeetings();
  }, [dispatch]);

  const today = dayjs().startOf("day");

  if (loading) {
    return <Box>...טוען פגישות</Box>;
  }

  if (error) {
    return (
      <Box>
        <Alert severity="error">שגיאה בהבאת הפגישות: {error}</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>רשימת פגישות</Typography>
      {meetings.length > 0 ? (
        meetings.map((meeting, index) => {
          const meetingDate = dayjs(meeting.dateTime).startOf("day");
          const isToday = meetingDate.isSame(today, "day");

          return (
            <Card key={`${meeting.id}-${index}`} sx={{ marginBottom: 2, backgroundColor: isToday ? "#b9a64047" : "white" }}>
              <CardContent>
                <Typography>שירות: {meeting.serviceType}</Typography>
                <Typography variant="subtitle1">שם לקוח: {meeting.clientName}</Typography>
                <Typography>תעודת זהות: {meeting.id}</Typography>
                <Typography>טלפון: {meeting.clientPhone}</Typography>
                <Typography>סוג השירות: {meeting.serviceType}</Typography>
                <Typography>תאריך ושעה: {dayjs(meeting.dateTime).format("YYYY-MM-DD HH:mm")}</Typography>
              </CardContent>
            </Card>
          );
        })
      ) : (
        <Typography>אין פגישות זמינות</Typography>
      )}

      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate("/add-meeting")}
        sx={{ marginTop: 2 }}
      >
        הוספת פגישה
      </Button>
    </Box>
  );
};

export default ViewMeetings;
