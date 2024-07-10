'use client';
import PropTypes from 'prop-types';
// material
import { Box, IconButton, Typography } from '@mui/material';

import { useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// ----------------------------------------------------------------------

BreadCrumb.propTypes = {
    action: PropTypes.node,
    links: PropTypes.array,
    sx: PropTypes.object
};

export default function BreadCrumb({ action, links = [], sx, ...other }) {
    const router = useRouter();
    const handleNavigation = (link = null) => {
        if (link) {
            router.push(link)
        } else {
            router.back()
        }
    }
    return (
        <Box sx={{ mb: 1, ...sx }} {...other}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
                    {links?.length > 1 &&
                        <IconButton size='small' onClick={() => handleNavigation(null)}>
                            <ArrowBackIcon fontSize='small' />
                        </IconButton>
                    }
                    {
                        links.map((item, i) => <Typography
                            key={item?.name}
                            sx={{ cursor: item?.link ? "pointer" : "text" }}
                            onClick={() => handleNavigation(item?.link)}
                            variant={links?.length === 1 ? "h5" : "h6"}
                            color="text.secondary.lighter">
                            {item?.name}{(links.length - 1 > i ? "/" : "")}
                        </Typography>)
                    }
                </Box>

                {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
            </Box>
        </Box>
    );
}
