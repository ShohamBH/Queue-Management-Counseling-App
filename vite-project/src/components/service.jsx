
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Service = ({ id, name, description, price, duration }) => {
  const isConnect = useSelector((state) => state.isLogin.isConnect);
  const navigate = useNavigate();

  const handleAddAppointment = () => {
    navigate("/add-meeting", { state: { serviceName: name, serviceDuration: duration } });
  };

  const handleEditService = () => {
    navigate(`/admin/edit-service/${id}`, {
      state: { id, name, description, price, duration },
    });
  };

  return (
    <Card variant="outlined" sx={{ width: 360, m: 2, p: 2, boxShadow: 3, minHeight: '300px' }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
          {name}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Typography variant="body1" sx={{ color: "text.secondary", mb: 1 }}>
          <strong>תיאור:</strong> {description}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>מחיר:</strong> {price}$
        </Typography>
        <Typography variant="body1">
          <strong>משך השירות:</strong> {duration} דקות
        </Typography>
      </Box>
      {isConnect === "user" && (
        <Button variant="contained" color="primary" onClick={handleAddAppointment}>
          הוספת פגישה
        </Button>
      )}
      {isConnect === "admin" && (
        <Button variant="contained" color="secondary" onClick={handleEditService}>
          צפייה בפרטי השירות
        </Button>
      )}
    </Card>
  );
};

export default Service;

