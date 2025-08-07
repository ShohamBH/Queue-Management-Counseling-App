import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editBusinessDetailsData } from '../redux/businessDetailslice';
import { Typography, Box } from '@mui/material';

const BusinessDetails = () => {
    const BASE_URL = "http://localhost:8787";
    const dispatch = useDispatch();
    const businessDetails = useSelector((state) => state.businessDetails.businessDetailsData);

    const fetchBusinessDetails = async () => {
        try {
            const response = await fetch(`${BASE_URL}/businessData`);
            if (!response.ok)
                 throw new Error('Server error');
            const data = await response.json();
            dispatch(editBusinessDetailsData(data));
            sessionStorage.setItem("businessDetails", JSON.stringify(data)); 
        } 
        catch (error) {
            console.error("שגיאה בהתחברות לשרת:", error);
            const cachedData = sessionStorage.getItem("businessDetails");
            if (cachedData) {
                dispatch(editBusinessDetailsData(JSON.parse(cachedData)));
            }
        }
    };

    useEffect(() => {
        if (!businessDetails || Object.keys(businessDetails).length === 0) {
            fetchBusinessDetails();
        }
    }, [dispatch]);

    if (!businessDetails || Object.keys(businessDetails).length === 0) {
        return (
            <Box>
                <Typography>טוען...</Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Typography>שם: {businessDetails.name}</Typography>
            <Typography>כתובת: {businessDetails.address}</Typography>
            <Typography>טלפון: {businessDetails.phone}</Typography>
            <Typography>תיאור: {businessDetails.description}</Typography>
            <Typography>בעלים: {businessDetails.owner}</Typography>
        </Box>
    );
};

export default BusinessDetails;
