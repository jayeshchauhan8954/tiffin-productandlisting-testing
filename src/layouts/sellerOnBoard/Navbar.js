import PropTypes from 'prop-types';

// material
import { Box, AppBar, Toolbar, styled, Container } from '@mui/material';
import Navitems from '@/components/home/navbar/Navitems';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 60;
const APP_BAR_DESKTOP = 80;

const RootStyle = styled(AppBar)(({ theme }) => ({
  height: APP_BAR_MOBILE,
  width: '100%',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile,
  background: 'none',
  boxShadow: 'none',
  color: theme.palette.text.primary,
  [theme.breakpoints.up('lg')]: {
    height: APP_BAR_DESKTOP,
    width: `calc(100%)`
  }
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: APP_BAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APP_BAR_DESKTOP
  }
}));

// ----------------------------------------------------------------------

export default function Navbar({ navConfig = [] }) {

  return (
    <RootStyle
      sx={{
        ...({
          width: { lg: `calc(100%})` },
        })
      }}>
      <ToolbarStyle sx={{ background: "#fff", boxShadow: "0px 4px 28.1px 0px hsla(0, 0%, 0%, 0.06)" }}>
        <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box component="img" src='/assets/logo/logo.svg' alt="Tiffin Stash" sx={{ width: 150 }} />

          {/* Nav Items */}
          <Navitems navConfig={navConfig} />

        </Container>
      </ToolbarStyle>
    </RootStyle>
  );
}

Navbar.propTypes = {
  onOpenSidebar: PropTypes.func
};
