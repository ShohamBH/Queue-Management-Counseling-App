import { NavLink, Outlet } from 'react-router-dom';
import ViewService from './veiwService';

const Home = () => {
  return (
    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <h1>Welcome to the Home Page</h1>


      <ViewService />
      <Outlet /> {/* הוספת Outlet */}
    </div>
  );
};

export default Home;
