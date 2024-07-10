import React, { useState } from 'react';
import { Container, useTheme } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BasicCard from './BasicCard';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3, }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>

    );
}

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function FullWidthTabs() {
    const theme = useTheme();
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => setValue(newValue);
    const handleChangeIndex = (index) => setValue(index);

    return (
        <>
            <Box sx={{ bgcolor: 'background.paper', width: '100%', maxWidth: 600, margin: 'auto' }}>
                <Tabs
                    sx={{ background: theme.palette.primary.lighterGray, borderRadius: 50, margin: 2, '& .MuiTabs-indicator': { display: 'none' }, }}
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab
                        label="TiffinStash Dilivery" {...a11yProps(0)}
                        sx={{
                            background: value === 0 ? theme.palette.primary.main : theme.palette.primary.lighterGray,
                            color: value === 0 ? theme.palette.primary.contrastText : theme.palette.primary.blackColor,
                            borderRadius: 20,
                            margin: 1,
                        }} />
                    <Tab label="Seller Delivery" {...a11yProps(1)}
                        sx={{
                            background: value === 1 ? theme.palette.primary.main : theme.palette.primary.lighterGray,
                            color: value === 1 ? theme.palette.primary.contrastText : theme.palette.primary.blackColor,
                            borderRadius: 20,
                            margin: 1,
                        }}
                    />
                    <Tab label="On-Request Delivery" {...a11yProps(2)}
                        sx={{
                            background: value === 2 ? theme.palette.primary.main : theme.palette.primary.lighterGray,
                            color: value === 2 ? theme.palette.primary.contrastText : theme.palette.primary.blackColor,
                            borderRadius: 20,
                            margin: 1,
                        }}
                    />
                </Tabs>
            </Box>
            <Box index={value}
                onChangeIndex={handleChangeIndex}>
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <BasicCard />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <BasicCard />
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <BasicCard />
                </TabPanel>
            </Box>
        </>
    );
}
