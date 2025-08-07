import dayjs from "dayjs";
import { addMeeting } from "../../redux/meetingsSlice";

const API_URL = "http://localhost:8787/";

export const validateForm = (formData, setErrors) => {
  let newErrors = {};
  if (!formData.id) newErrors.id = "חובה להזין ת.ז";
  if (!formData.serviceType) newErrors.serviceType = "חובה להזין סוג שירות";
  if (!formData.clientName) newErrors.clientName = "חובה להזין שם לקוח";
  if (!formData.clientPhone || !/^\d{10}$/.test(formData.clientPhone)) newErrors.clientPhone = "חובה להזין מספר טלפון תקין";
  if (!formData.clientEmail || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.clientEmail)) newErrors.clientEmail = "חובה להזין כתובת מייל תקינה";
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export const addMeetingHandler = async (formData, setErrors, dispatch, navigate) => {
  try {
    const meetingStart = dayjs(formData.dateTime);
    const meetingEnd = meetingStart.add(formData.duration, "minute");
    const now = dayjs();
    const minAllowedTime = now.add(5, "minute");

    if (meetingStart.isBefore(now)) {
      setErrors({ form: "לא ניתן לקבוע פגישה בזמן שעבר. אנא בחר זמן עתידי." });
      return false;
    }

    if (meetingStart.isBefore(minAllowedTime)) {
      setErrors({ form: "לא ניתן לקבוע פגישה בטווח של 5 דקות מהזמן הנוכחי. יש לבחור זמן מאוחר יותר." });
      return false;
    }

    const response = await fetch(API_URL + "appointments");
    const meetings = await response.json();

    const isConflict = meetings.some((meeting) => {
      const existingMeetingStart = dayjs(meeting.dateTime);
      const existingMeetingEnd = existingMeetingStart.add(meeting.duration, "minute");
      return meetingStart.isBefore(existingMeetingEnd) && meetingEnd.isAfter(existingMeetingStart);
    });

    if (isConflict) {
      setErrors({ form: "פגישה קיימת בתאריך זה או בטווח השעות המבוקש. אנא בחר תאריך ושעה אחרים." });
      return false;
    }

    const addResponse = await fetch(API_URL + "appointment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        dateTime: formData.dateTime.format(),
      }),
    });

    if (!addResponse.ok) {
      setErrors({ form: "אירעה שגיאה בשליחת הנתונים" });
      return false;
    }

    dispatch(addMeeting({ ...formData, dateTime: formData.dateTime.format() }));
    alert(`פגישה נוספה בהצלחה!\nשם הלקוח: ${formData.clientName}\nתאריך ושעה: ${formData.dateTime.format("DD/MM/YYYY HH:mm")}\nנא לא לשכוח ולאשר הגעה יום לפני. תודה ויומטוב!`);
    navigate('/');

    return true;
  } catch (error) {
    setErrors({ form: "אירעה שגיאה בחיבור לשרת" });
    return false;
  }
};
