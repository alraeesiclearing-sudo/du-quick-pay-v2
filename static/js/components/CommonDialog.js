import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Cancel as CloseIcon} from '@mui/icons-material';
const CommonDialog = ({ isOpen, onClose, title, content, actions }) => {
    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogActions>
                {actions || (
                    <CloseIcon color="grey" onClick={onClose} />
                )}
            </DialogActions>
            <DialogContent sx={{pt:0}}>{content}</DialogContent>
        </Dialog>
    );
};

export default CommonDialog;