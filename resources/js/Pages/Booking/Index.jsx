import {AppBar, Box, Button, Container, CssBaseline, Grid, Paper, Stack, Toolbar, Typography} from "@mui/material";
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PunchClockOutlinedIcon from '@mui/icons-material/PunchClockOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import Calendar from "@/Pages/Booking/Calendar.jsx";
import {useState} from "react";

function Layout({ children }) {
    return (
        <>
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    backgroundColor: '#f0f0f0'
                }}
            >
                <Box component="header" sx={{ py: 3, px: 2, backgroundColor: '#6a1b9a', color: 'white', textAlign: 'center' }}>
                    <Typography variant="h6" noWrap>
                        Star Magic
                    </Typography>
                </Box>
                <Box component="main" sx={{ flex: '1 0 auto', p: 2 }}>
                    {children}
                </Box>
                <Box component="footer" sx={{ py: 3, px: 2, backgroundColor: '#6a1b9a', color: 'white' }}>
                    <Container maxWidth="sm">
                        <Typography variant="body1" align="center">
                            Copyright © 2024 | Powered by me
                        </Typography>
                    </Container>
                </Box>
            </Box>
        </>
    );
}

export default function Index({ timeSlots }) {
    const [dateTime, setDateTime] = useState({
        selectedDate: null,
        selectedTimeSlot: null,
        bookingDateTime: null
    });

    const handleDateTimeChange = (newDateTime) => {
        console.log('newDateTimeParent: ', newDateTime)
        setDateTime(newDateTime);
    };

    return (
        <Layout>
            {/* Your main content goes here */}
            <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
                A Private Healing Session with Abhijith
            </Typography>
            <Container maxWidth="md">
                <Stack direction='row' spacing={0} justifyContent={'space-between'} backgroundColor='#ffffff'>
                    <Box width={'30%'} backgroundColor='#6a1b9a'  color='white' p={3}>
                        <Box p={'4px'} bgcolor={'rgba(255, 255, 255, 0.05)'} borderRadius={'4px'} marginBottom={'8px'}>
                            <Stack direction='row' spacing={1} alignItems={'center'} marginBottom={'2px'}>
                                <PunchClockOutlinedIcon width={'0.8em'}/>
                                <Typography variant="body1" component={"p"}>Date & Time</Typography>
                                <Box sx={{ flexGrow: 1 }} />
                                <CheckCircleOutlinedIcon />
                            </Stack>
                            <Box>
                                <Typography variant="subtitle2" component="span">{dateTime.bookingDateTime ?? dateTime.bookingDateTime}</Typography>
                            </Box>
                        </Box>
                        <Box p={'4px'} bgcolor={'rgba(255, 255, 255, 0.05)'} borderRadius={'4px'} marginBottom={'8px'}>
                            <Stack direction='row' spacing={1} alignItems={'center'} marginBottom={'2px'}>
                                <PersonOutlineOutlinedIcon width={'0.8em'}/>
                                <Typography variant="body1" component={"p"}>Your information</Typography>
                                <Box sx={{ flexGrow: 1 }} />
                                <RadioButtonUncheckedOutlinedIcon />

                            </Stack>
                        </Box>
                        <Box p={'4px'} bgcolor={'rgba(255, 255, 255, 0.05)'} borderRadius={'4px'} marginBottom={'8px'}>
                            <Stack direction='row' spacing={1} alignItems={'center'} marginBottom={'2px'}>
                                <DateRangeOutlinedIcon width={'0.8em'}/>
                                <Typography variant="body1" component={"p"}>Booking Code</Typography>
                                <Box sx={{ flexGrow: 1 }} />
                                <RadioButtonUncheckedOutlinedIcon />

                            </Stack>
                        </Box>
                    </Box>
                    <Box width={'70%'} sx={{ display: 'flex', flexDirection: 'column', maxHeight:'800px' }}>
                        <Box component="header" sx={{ py: 2, px: 2, boxShadow:'0 2px 3px rgba(26, 44, 55, 0.15)', textAlign: 'left' }}>
                            <Typography variant="h5">
                                Date & Time
                            </Typography>
                        </Box>
                        <Box component="section" sx={{ overflowY: 'auto', p: 2 }}>
                            <Calendar timeSlots={timeSlots} dateTime={dateTime} onDateTimeChange={handleDateTimeChange} />
                        </Box>
                        <Box component="footer" sx={{ py: 2, px: 2, boxShadow:'0 -2px 3px rgba(26, 44, 55, 0.15)', color: 'white', textAlign: 'right' }}>
                            <Button variant="contained" color="primary">Continue</Button>
                        </Box>
                    </Box>
                </Stack>
            </Container>
        </Layout>
    );
}
