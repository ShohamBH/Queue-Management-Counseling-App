

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import './App.css';

// רכיבי ממשק
import Login from './components/admin/login';
import Home from './components/home';

// רכיבי ניהול
import Admin from './components/admin/Admin';
import BusinessDetails from './components/BusinessDetails';
import EditBusinessDetails from './components/admin/editBusinessDetails';
import ViewMeetings from './components/admin/viewMeetings';
import AddService from './components/admin/addService';
import ServiceDetails from './components/admin/serviceDetails';

// רכיבי משתמש
import AddMeeting from './components/user/addMeeting';
import ViewService from './components/veiwService';

// רכיבים משותפים
import Footer from './components/footer';
import Header from './components/header';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route path="/add-meeting" element={<AddMeeting />} />
          <Route path="/services" element={<ViewService />} />

          <Route path="/admin" element={<Admin />}>
            <Route index element={<ViewService />} />
            <Route path="services" element={<ViewService />} />
            <Route path="services/add" element={<AddService />} />
            <Route path="services/:id" element={<ServiceDetails />} />
            <Route path="edit-service/:id" element={<ServiceDetails />} />
            <Route path="meetings" element={<ViewMeetings />} />
            <Route path="business" element={<BusinessDetails />} />
            <Route path="business/edit" element={<EditBusinessDetails />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;

