// material
import { AppBar, Box, Container, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
// components
import Scrollbar from "@/components/Scrollbar";

export default function CommonDrawer({ open, onClose, children, title, subTitle, showCloseIcon = true, anchor = 'right', width = 50, height }) {

  return (
    <Drawer anchor={anchor} open={open} onClose={onClose}>
      <Box sx={{ display: 'flex', flexDirection: 'column',}}>
        {(title || subTitle) && (
          <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'text.disabled' }}>
            <Toolbar>
              <Box sx={{ flexGrow: 1 }}>
                {title && <Typography variant="h6">{title}</Typography>}
                {subTitle && <Typography variant="caption">{subTitle}</Typography>}
              </Box>
              {showCloseIcon && (
                <IconButton size="large" color="inherit" onClick={onClose}>
                  <CloseRoundedIcon />
                </IconButton>
              )}
            </Toolbar>
          </AppBar>
        )}
        <Scrollbar show sx={{ maxWidth: { lg: `${width}vw`, xs: '100vw' }, height: { lg: `${height}vh`, xs: '100vh' }, }}>
          <Container sx={{ my: 3, flexGrow: 1 }}>
            {children}
          </Container>
        </Scrollbar>
      </Box>
    </Drawer>
  );
}
