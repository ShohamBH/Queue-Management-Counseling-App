import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Box, Button } from "@mui/material";
// import BusinessDetails from "../BusinessDetails";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4, gap: 2 }}>
        <Button
          onClick={() => navigate("services/add", { state: { open: true } })}
          sx={{
            backgroundColor: "#444",
            color: "gold",
            fontSize: "1.2rem",
            padding: "12px 24px",
            borderRadius: "8px",
            "&:hover": { backgroundColor: "gold", color: "#444" },
          }}
          size="large"
        >
          הוסף שירות
        </Button>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
          <Button
            sx={{
              backgroundColor: "#333",
              color: "gold",
              fontSize: "1.2rem",
              padding: "12px 24px",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "gold", color: "#333" },
            }}
            size="large"
            onClick={() => navigate("services")}
          >
            ניהול שירותים
          </Button>

          <Button
            sx={{
              backgroundColor: "#333",
              color: "gold",
              fontSize: "1.2rem",
              padding: "12px 24px",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "gold", color: "#333" },
            }}
            size="large"
            onClick={() => navigate("meetings")}
          >
            ניהול פגישות
          </Button>

          <Button
            sx={{
              backgroundColor: "#333",
              color: "gold",
              fontSize: "1.2rem",
              padding: "12px 24px",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "gold", color: "#333" },
            }}
            size="large"
            onClick={() => navigate("business/edit")}
          >
            עריכת פרטי העסק
          </Button>
        </Box>
      </Box>
      {/* <BusinessDetails></BusinessDetails> */}
      <Outlet />
    </>
  );
};

export default Admin;
