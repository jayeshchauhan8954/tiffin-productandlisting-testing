import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, useTheme } from "@mui/material";
import Scrollbar from '../Scrollbar';


export default function CustomDialog({ onClose, open, heading, showCloseIcon = true, children, actions, showBorderBottom, dialogContentBgColor, dialogContentProps, showBackButton, onBack = () => { } }) {

    const theme = useTheme()

    return (
        <Dialog maxWidth="sm" fullWidth onClose={onClose} open={open}>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}
                sx={{ borderBottom: showBorderBottom ? '1px solid #F1F1F1' : 'none', px: 2, py: 1 }}>
                <DialogTitle sx={{ m: 0, p: 0, }} id="customized-dialog-title">
                    {
                        showBackButton && (
                            <IconButton
                                aria-label="back"
                                onClick={onBack}
                            >
                                <Box component={"img"} src='/assets/images/arrow-left.svg' />
                            </IconButton>
                        )
                    }
                    {heading}
                </DialogTitle>

                {
                    showCloseIcon && (
                        <IconButton
                            aria-label="close"
                            onClick={onClose}
                            sx={{ color: (theme) => theme.palette.grey[500] }}>
                            <CloseIcon />
                        </IconButton>
                    )
                }
            </Stack>
            <DialogContent
                sx={{ bgcolor: dialogContentBgColor || theme.palette.primary.contrastText, position: 'relative' }}
                {...dialogContentProps}>
                <Scrollbar sx={{ maxHeight: 400}}>
                    {children}
                </Scrollbar>
            </DialogContent>
            <DialogActions>{actions}</DialogActions>
        </Dialog>
    )
}
