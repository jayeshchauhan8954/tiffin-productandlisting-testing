import React, { useState } from 'react'
import { Box, Typography, useTheme, Grid } from '@mui/material'
import Faq from './faq/Faq';

let _tabs = {
  getHelp: "Get Help",
  faqs: "Faq",
}

export default function Help() {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState(_tabs.getHelp)

  // Helpers
  const hanldeTabSelect = (name) => () => setSelectedTab(name)

  return (
    <Grid container spacing={2} sx={{ pb: 5,}}>
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

      <Grid item md={10} xs={12} sx={{ width: '100%', }}>
        {selectedTab === _tabs.faqs && <Faq />}
      </Grid>

    </Grid>
  )
}
