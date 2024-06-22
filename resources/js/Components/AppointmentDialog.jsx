import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {forwardRef} from "react";
import {Divider, Typography} from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AppointmentDialog = ({open, handleClose, appointmentDetail}) =>{
    return (
        <>
            <Dialog
                open={open}
                fullWidth={true}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Appointment detail"}</DialogTitle>
                <Divider />
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Typography variant={'body1'}>Created On: May 29, 2024</Typography>
                        <p>Total Price: £0.00</p>
                        <p>Duration: 1h</p>

                        <p>Customers:</p>
                        <p>test 1234 1234</p>
                        <p>Have you had a Covid vaccine?: Yes</p>
                        <p>Reason for the healing session (max 1000 characters): test</p>
                        <p>: I accept the terms and conditions</p>
                        <p>Date Of Birth: 24/01/1998</p>
                        <p>Please upload your face photo (max 5MB):</p>
                        <p>City: test</p>
                        <p>Timezone: Asia/Calcutta</p>
                        <p>Order Id: 213634</p>
                    </DialogContentText>
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AppointmentDialog;
