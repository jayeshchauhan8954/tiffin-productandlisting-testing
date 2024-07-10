import Link from 'next/link';
import { useState } from 'react';
// material
import SettingsIcon from '@mui/icons-material/Settings';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import { List, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';
// utils

// ----------------------------------------------------------------------

const SettingTab = () => {
  const theme = useTheme();

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
      <ListItemButton >
        <ListItemIcon>
          <VpnKeyRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Change password" />

      </ListItemButton>
      <ListItemButton component={Link} href={"/"}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings config" />

      </ListItemButton>

    </List>
  );
};

export default SettingTab;
