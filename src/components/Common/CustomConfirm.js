import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, Typography } from "@mui/material";

CustomConfirm.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool,
    heading: PropTypes.oneOf([PropTypes.string, PropTypes.node, PropTypes.func, null]),
    content: PropTypes.oneOf([PropTypes.string, PropTypes.node, PropTypes.func, null]),
    actions: PropTypes.oneOf([PropTypes.node, null]),
    onConfirm: PropTypes.func,
    onDecline: PropTypes.func
}

export default function CustomConfirm({
    onClose,
    open,
    heading,
    content,
    actions,
    onConfirm = () => { },
    onDecline = () => { },
    minWidth
}) {
    let _actions = null;
    let _heading = null;
    if (!actions) {
        _actions = (
            <>
                <Button size="small" onClick={onDecline} focusRipple>Cancel</Button>
                <Button size="small" onClick={onConfirm}>Ok</Button>
            </>
        )
    } else { _actions = actions; }

    if (!heading) {
        _heading = 'Are You Sure, You want to delete ?'
    } else { _heading = heading; }


    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle sx={{ m: 0, p: 2, minWidth:minWidth || 300 }}>{_heading}</DialogTitle>
            <DialogContent>{content}</DialogContent>
            <DialogActions>{_actions}</DialogActions>
        </Dialog>
    )
}
