import PropTypes from 'prop-types';

// material
import { List, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import { useSelector } from 'react-redux';
// ----------------------------------------------------------------------

export default function ProfileTab({ handleLogout }) {
  const theme = useTheme();

  const [selectedIndex, setSelectedIndex] = useState('');
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const { organization } = useSelector(state => state)

  return (
    <>
      <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
        <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="View Profile" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 3}
          onClick={(event) => {
            handleListItemClick(event, 3);
            handleLogout();
          }}
        >
          <ListItemIcon>
            <LogoutRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Exit" />
        </ListItemButton>
      </List>
    </>
  );
}

ProfileTab.propTypes = {
  handleLogout: PropTypes.func
};
