import {Box, Button, Container, CssBaseline, Divider, Stack, TextField, Typography} from "@mui/material";

const BookingCode = ({ services }) => {
    return (
        <Container fixed>
           <CssBaseline/>

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
                    />
                    <Button size={'small'} variant={'contained'}>Validate Code</Button>
                </Stack>
            </Box>

        </Container>
    )
}

export default BookingCode;
