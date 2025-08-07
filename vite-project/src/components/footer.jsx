
import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const Footer = () => {
  const businessDetails = useSelector((state) => state.businessDetails.businessDetailsData);

  if (!businessDetails)
    return null; // אם אין פרטי עסק, לא נציג כלום

  return (
    <Box
      component="footer"
      sx={{
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
        backgroundColor: "#333",
        color: "#FFD700",
        textAlign: "center",
        py: 2,
        borderTop: "2px solid #FFD700",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2">עסק מספר: {businessDetails.id}</Typography>
          <Typography variant="body2">כתובת: {businessDetails.address}</Typography>
          <Typography variant="body2">טלפון: {businessDetails.phone}</Typography>
          <Typography variant="body2">בעלים: {businessDetails.owner}</Typography>
          <Typography variant="body2">{businessDetails.description}</Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            © {new Date().getFullYear()} {businessDetails.name}. כל הזכויות שמורות.
          </Typography>
        </Box>
      </Container>
    </Box>

  );
};

export default Footer;
