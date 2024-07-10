// material
import { AppBar, Box, Container, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
// components
import Scrollbar from "@/components/Scrollbar";

// ----------------------------------------------------------------------

export default function CustomModal({ open, onClose, children, title, subTitle, anchor = 'right', width = 40, maxHeight, showCloseIcon = <CloseRoundedIcon /> }) {

  return (
    <Drawer anchor={anchor} open={open} onClose={onClose}>
      <Box sx={{ display: 'flex', flexFlow: 'column' }}>
        <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'text.disabled' }}>
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              {title && <Typography variant="h6">{title}</Typography>}
              {subTitle && <Typography variant="caption">{subTitle}</Typography>}
            </Box>
            {showCloseIcon && (
              <IconButton size="large" color="inherit" onClick={onClose}>
                {showCloseIcon}
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
        <Scrollbar sx={{ width: { lg: `${width}vw`, xs: '100vw' }, maxHeight: { lg: `${maxHeight}vh`, xs: '85vh' } }}>
          <Container sx={{ my: 3 }}>
            {children}
          </Container>
        </Scrollbar>
      </Box>
    </Drawer>
  )
}
