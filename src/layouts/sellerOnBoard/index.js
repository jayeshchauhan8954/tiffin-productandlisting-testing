'use client';
import { useState } from 'react';
// hooks

// material
import { Container, styled, useTheme } from '@mui/material';
import Scrollbar from '@/components/Scrollbar';
//
import 'react-quill/dist/quill.snow.css'; /* quill editor CSS */
import 'simplebar-react/dist/simplebar.min.css'; /* important for using simplebar-react */
import Navbar from './Navbar';

const APP_BAR_MOBILE = 52;
const APP_BAR_DESKTOP = 75;

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100vh',
  overflow: 'hidden',
  background: theme.palette.background.paper,
}));

const MainStyle = styled(Scrollbar)(({ theme }) => ({
  flexGrow: 1,
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 0,
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 0
  }
}));

// ----------------------------------------------------------------------

export default function HomeLayout({ navConfig, children }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <RootStyle>
      <Navbar />
      <MainStyle
        sx={{
          marginTop: 10,
          padding: 8,
          height: '100vh',
          ...({
            paddingTop: theme.spacing(2),
            [theme.breakpoints.up('lg')]: {
              paddingTop: theme.spacing(2)
            }
          }),

          transition: theme.transitions.create('margin', {
            duration: theme.transitions.duration.complex
          }),
          ...({
            // ml: '102px'

          })
        }}
      >
        {children}
      </MainStyle>
    </RootStyle>
  );
}
