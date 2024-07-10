import PropTypes from 'prop-types';
// material
import { Avatar, Box, CardContent, Grid, Stack, Typography } from '@mui/material';

import ProfileTab from './ProfileTab';
import { useRouter } from 'next/navigation';
import { logout } from '@/utils/helpers/authHelpers';
import { _routes } from '@/utils/endPoints/routes';
import { useAuth } from '@/contexts/AuthContext';
import { _UserType } from '@/utils/constants/constants';

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

export default function Profile({ handleClose }) {
  const router = useRouter();
  const { setAuthenticated, user } = useAuth();

  const handleLogout = async () => {
    setAuthenticated(false)
    logout()
    router.replace(_routes.login)
  };


  return (
    <Box>
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Stack direction="row" spacing={1.25} alignItems="center">
              <Avatar alt={user?.firstName} src={user?.image} sx={{ width: 32, height: 32 }} />
              <Stack>
                <Typography variant="h6">{user?.firstName}</Typography>
                <Typography variant="caption" color="textSecondary" sx={{ textTransform: 'capitalize' }}>
                  {_UserType[user?.userType]}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
      <ProfileTab handleLogout={handleLogout} handleClose={handleClose} />

    </Box>
  );
}

Profile.propTypes = {
  handleClose: PropTypes.func
};
