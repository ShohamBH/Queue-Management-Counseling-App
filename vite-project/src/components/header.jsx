import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/loginSlice';
import { useNavigate, Link } from 'react-router-dom';
import logoImage from '../img/RABIMמזמור-לתודה.jpg';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLogin.value);
  const businessName = useSelector((state) => state.businessDetails.businessDetailsData?.name) || 'שם העסק';

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#333', color: '#FFD700', borderBottom: '2px solid #FFD700', width: '100%', top: 0, left: 0, zIndex: 1000, justifyContent: "space-between" }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={logoImage} alt="Logo" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
        </Box>

        <Box>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit', textAlign: 'center' }}>
            <Typography variant="h6">{businessName}</Typography>
          </Link>
        </Box>

        <Box>
          {isLoggedIn ? (
            <>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
