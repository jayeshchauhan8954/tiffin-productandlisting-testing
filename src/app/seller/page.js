import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import TiffinBusinessForm from '@/components/seller/Banner/TiffinBusinessForm';
import Footer from '@/components/seller/Footer';
import TabsComponent from '@/components/seller/Tabs';
import Banner from '@/components/seller/Banner';
import PromotionBanner from '@/components/seller/PromotionBanner';

const SellerDashboard = () => {
    return (
        <Box>
            <Banner />
            <PromotionBanner />
            <TabsComponent />
            <Footer/>
        </Box>
    );
};

export default SellerDashboard;
