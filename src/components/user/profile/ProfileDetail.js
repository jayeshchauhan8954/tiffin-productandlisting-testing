import React, { useState } from 'react'
// Mui
import { Box, Typography, useTheme, Grid } from '@mui/material'

// Components
import Account from './profile/Account';
import ManageAddress from './profile/ManageAddress';
import ManagePassword from './profile/ManagePassword';
import DeleteAccount from './profile/DeleteAccount';
import Help from './profile/Help';
import Faq from './profile/Faq';

let _tabs = {
    profileDetails: "Profile Details",
    address: "Saved Addresses",
    password: "Manage Password",
    security: "Account Security",
    support: "Support",
    faqs: "FAQs"
}

export default function ProfileDetail() {
    const theme = useTheme();
    const [selectedTab, setSelectedTab] = useState(_tabs.profileDetails)

    // Helpers
    const hanldeTabSelect = (name) => () => setSelectedTab(name)

    return (
        <Grid container spacing={2} sx={{pb:5}}>
            <Grid item md={2} xs={12}>
                {/* Tabs Rendering */}
                {
                    Object.values(_tabs).map((tabName, i) => (
                        <Box
                            key={`tab_${i}`}
                            sx={{
                                p: selectedTab === tabName ? 2 : 2,
                                paddingLeft: selectedTab === tabName ? 3 : 3,
                                borderLeft: selectedTab === tabName ? 5 : 0,
                                borderColor: selectedTab === tabName ? theme.palette.primary.main : "transparent",
                                backgroundColor: selectedTab === tabName ? theme.palette.primary.lightPink : theme.palette.primary.contrastText,
                                cursor: 'pointer',
                                '&:hover': {
                                    backgroundColor: selectedTab === tabName ? theme.palette.primary.lightPink : theme.palette.primary.contrastText,
                                },
                            }}
                            onClick={hanldeTabSelect(tabName)}
                        >
                            <Typography component={"p"} color={theme.palette.primary.primaryGrey90} variant='heading3'>{tabName}</Typography>
                        </Box>
                    ))
                }
            </Grid>

            {/* Render Tab Details */}
            <Grid item md={10} xs={12} sx={{ width: '100%', }}>
                {selectedTab === _tabs.profileDetails && <Account />}
                {selectedTab === _tabs.address && <ManageAddress />}
                {selectedTab === _tabs.password && <ManagePassword />}
                {selectedTab === _tabs.security && <DeleteAccount />}
                {selectedTab === _tabs.support && <Help />}
                {selectedTab === _tabs.faqs && <Faq />}
            </Grid>
        </Grid>
    )
}
