import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
// material
import {
    List,
    ListItem,
    Paper,
    Box,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction,
    alpha,
    Typography,
    Tooltip,
    Stack
} from '@mui/material';
import { MIconButton } from '@/components/@material-extend';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import TextSnippetRoundedIcon from '@mui/icons-material/TextSnippetRounded';
// components
import { varFadeInRight } from '@/components/animate';
import config from '@/utils/config/config';

// ----------------------------------------------------------------------

/* Helper functions */
const isImgFile = (extension) => ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'svg', 'svg+xml'].includes(extension);
const isVideoFile = (extension) => ['mp4', 'mkv', 'mov', "webp"].includes(extension);


// ----------------------------------------------------------------------

ImageList.propTypes = {
    onRemove: PropTypes.func,
    onPreviewClick: PropTypes.func,
    showPreview: PropTypes.bool,
    showName: PropTypes.bool,
    files: PropTypes.array,
    labels: PropTypes.array
};


export default function ImageList({ files = [], showPreview, showName, onRemove = () => { }, labels, onPreviewClick = () => { }, sx = {}, imgProps = {}, isRemovable = true }) {
    const isString = (value) => typeof value === 'string';
    
    const getS3Url = (path) => config.S3Configs.base_url + path;
    const getFileUrl = (file) => file ? URL.createObjectURL(file) : null;

    const handleFilePreviewSrc = (file) => {
        let url = '';
        let fileExtension = '';
        if (isString(file)) {
            url = getS3Url(file);
            fileExtension = url?.split('.').at(-1);
        } else {
            url = getFileUrl(file);
            fileExtension = file?.name?.split('.').at(-1);
        }
        if (isImgFile(fileExtension) || isVideoFile(fileExtension)) {
            return url;
        }
        return null;
    };

    const getFileName = (file) => {
        try {
            if (isString(file)) return file.split('/').at(-1);
            return file?.name;
        } catch (error) {
            return '';
        }
    };

    const handleComponentTypeRender = (file) => {
        let url = '';
        let fileExtension = '';
        if (isString(file)) {
            url = getS3Url(file);
            fileExtension = url?.split('.').at(-1);
        } else {
            fileExtension = file?.name?.split('.').at(-1);
        }
        if (isVideoFile(fileExtension)) {
            return "video";
        } else {
            return "img";
        }
    }

    return (
        <List disablePadding sx={{ ...sx }}>
            <AnimatePresence>
                {
                    files.map((file, i) => {
                        if (!file) return
                        const { name } = file;
                        const key = isString(file) ? null : name;

                        if (showPreview) {
                            return (
                                <ListItem
                                    key={key}
                                    component={motion.div}
                                    {...varFadeInRight}
                                    sx={{
                                        p: 0,
                                        m: 0.5,
                                        width: 80,
                                        height: 80,
                                        borderRadius: 1.5,
                                        cursor: 'pointer',
                                        position: 'relative',
                                        display: 'inline-flex',
                                        ...sx
                                    }}
                                >
                                    <Paper
                                        onClick={() => onPreviewClick(isString(file) ? "" : getFileUrl(file))}
                                        variant="outlined"
                                        component={handleComponentTypeRender(file)}
                                        src={handleFilePreviewSrc(file)}
                                        autoPlay
                                        sx={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', ...imgProps }}
                                    />
                                    <Stack sx={{ mt: 15, width: 80 }}>
                                        {labels && (
                                            <Tooltip title={labels[i]}>
                                                <Typography variant="body2" noWrap textAlign="center" sx={{ width: 80, fontSize: 12, fontWeight: 'bold' }}>
                                                    {labels[i]}
                                                </Typography>
                                            </Tooltip>
                                        )}
                                        {showName && (
                                            <Tooltip title={getFileName(file)}>
                                                <Typography variant="body2" noWrap textAlign="center" sx={{ width: 80, fontSize: 12 }}>
                                                    {getFileName(file)}
                                                </Typography>
                                            </Tooltip>
                                        )}
                                    </Stack>
                                    {isRemovable &&
                                        <Box sx={{ top: 6, right: 6, position: 'absolute' }}>
                                            <MIconButton
                                                size="small"
                                                onClick={() => onRemove(file, i)}
                                                sx={{
                                                    p: '2px',
                                                    color: 'common.white',
                                                    bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                                                    '&:hover': {
                                                        bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48)
                                                    }
                                                }}
                                            >
                                                <HighlightOffRoundedIcon />
                                            </MIconButton>
                                        </Box>}
                                </ListItem>
                            );
                        }

                        return (
                            <ListItem
                                key={key}
                                component={motion.div}
                                {...varFadeInRight}
                                sx={{
                                    my: 1,
                                    py: 0.75,
                                    px: 2,
                                    borderRadius: 1,
                                    border: (theme) => `solid 1px ${theme.palette.divider}`,
                                    bgcolor: 'background.paper'
                                }}
                            >
                                <ListItemIcon>
                                    <TextSnippetRoundedIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={isString(file) ? getS3Url(file) : name}
                                    primaryTypographyProps={{ variant: 'subtitle2' }}
                                    secondaryTypographyProps={{ variant: 'caption' }}
                                />
                                <ListItemSecondaryAction>
                                    <MIconButton edge="end" size="small" onClick={() => onRemove(file, i)}>
                                        <HighlightOffRoundedIcon />
                                    </MIconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
            </AnimatePresence>
        </List>
    );
}
