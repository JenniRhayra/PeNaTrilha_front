import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface ConfirmDialogProps {
    open: boolean;
    onClose: (confirm: boolean) => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ open, onClose }) => {

    if (!open) return <></>;

    const handleConfirm = () => {
        onClose(true);
    };

    const handleCancel = () => {
        onClose(false);
    };

    return (
        <Dialog
            open={open}
            onClose={() => onClose(false)}
            aria-labelledby="confirm-dialog-title"
            aria-describedby="confirm-dialog-description"
        >
            <DialogTitle id="confirm-dialog-title">Excluir Conta</DialogTitle>
            <DialogContent>
                <DialogContentText id="confirm-dialog-description">
                    Tem certeza de que deseja excluir sua conta? Esta ação não pode ser desfeita.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleConfirm} color="primary" autoFocus>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
};