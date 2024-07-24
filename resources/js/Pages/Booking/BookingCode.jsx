import {Box, Button, Container, CssBaseline, Divider, Stack, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";

const BookingCode = ({ bookingCodeState, onBookingCodeChange, service, usedId }) => {
    const [code, setCode] = useState('');
    const [validationCode, setValidationCode] = useState(null);
    const [validationCodeError, setValidationCodeError] = useState(null);

    const handleCodeChange = (event) => {
        setCode(event.target.value);
    };

    const handleValidate = async () => {
        setValidationCode(null);
        setValidationCodeError(null);
        try {
            const response = await axios.post(
                route('appointment.validateCode'),
                {code: code, user_id: usedId}
            );
            console.log(response)
            setValidationCode(response.data.message);
            onBookingCodeChange({
                ...bookingCodeState,
                bookingCodeValidated: validationCode === 'Code successfully validated',
            });
        } catch (error) {
            setValidationCodeError(error.response.data.message);
            console.error('Failed to fetch service by employee:', error);
        }
    };

    useEffect(() => {
        if (validationCode) {
            onBookingCodeChange({
                ...bookingCodeState,
                bookingCodeValidated: validationCode === 'Code successfully validated',
            });
        } else {
            onBookingCodeChange({
                ...bookingCodeState,
                bookingCodeValidated: false,
            });
        }
    }, [validationCode, validationCodeError]);

    return (
        <Container fixed>
           <CssBaseline/>
            <Typography variant={'subtitle1'}>
                Service
            </Typography>
            <Box sx={{ border: '1px solid #e5e7eb', borderRadius: '5px', padding: '1em'}}>
                <Box>Service: {service.name}</Box>
                <Box>Price: $ {service.price}</Box>
            </Box>

            <Typography variant={'subtitle1'}>
                Summary
            </Typography>
            <Box sx={{ border: '1px solid #e5e7eb', borderRadius: '5px', padding: '1em'}}>
                <Divider />
                <Box py={1}>
                    <Typography variant={'body2'}>
                        <span style={{ color: 'red'}}>*</span> Please enter your booking code received via email.
                    </Typography>
                    <Typography variant={'body2'}>
                        Check your inbox or junk mail.
                    </Typography>
                </Box>
                <Stack direction={'row'} justifyContent={'space-between'} py={1}>
                    <TextField
                        type={'text'}
                        size={'small'}
                        placeholder={'code'}
                        value={code}
                        onChange={handleCodeChange}
                    />
                    {validationCode && (<Typography color={'green'} variant={'body2'}>
                        {validationCode}
                    </Typography>)}
                    {validationCodeError && (<Typography color={'red'} variant={'body2'}>
                        {validationCodeError}
                    </Typography>)}
                    <Button size={'small'} variant={'contained'} onClick={handleValidate}>
                        Validate Code
                    </Button>
                </Stack>
            </Box>

        </Container>
    )
}

export default BookingCode;
