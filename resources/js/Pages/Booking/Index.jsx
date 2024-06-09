import {AppBar, Box, Button, Container, CssBaseline, Grid, Paper, Stack, Toolbar, Typography} from "@mui/material";
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PunchClockOutlinedIcon from '@mui/icons-material/PunchClockOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import Calendar from "@/Pages/Booking/Calendar.jsx";
import {router} from "@inertiajs/react";
import {useEffect, useState} from "react";
import {parseISO} from "date-fns/parseISO";
import {format} from "date-fns";
import {set} from "date-fns/set";

function Layout({ children }) {
    return (
        <>
            <CssBaseline />
            <AppBar position="fixed" sx={{ backgroundColor: '#6a1b9a' }}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Star Magic
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', paddingTop: '64px' }}>
                <Container component="main" sx={{ flexGrow: 1, mt: 4, mb: 4 }}>
                    {children}
                </Container>
                <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: '#6a1b9a', color: 'white' }}>
                    <Container maxWidth="sm">
                        <Typography variant="body1">
                            Copyright © 2024 | Powered by me
                        </Typography>
                    </Container>
                </Box>
            </Box>
        </>
    );
}

export default function Index({ timeSlots }) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [bookingDateTime, setBookingDateTime] = useState(null);

    const formatDayString = () => {
        if (!selectedDate) {
            return;
        }

        let date = parseISO(selectedDate.toISOString());

        // Extract hours, minutes, and seconds from the time string
        const [hours, minutes, seconds] = selectedTimeSlot ? selectedTimeSlot.split(':') : timeSlots['1_hour_intervals'][1].split(':');

        // Set the hours, minutes, and seconds to the parsed date
        const parsedDate = set(date, { hours, minutes, seconds });

        // Format the date components
        const formatDateTime = format(date, 'MMMM dd, yyyy') + ' - ' + format(parsedDate, 'h:mm a'); // "June 22, 2024"
        setBookingDateTime(formatDateTime);
    }

    useEffect(() => {
        if (selectedTimeSlot) {
            formatDayString()
        }
    }, [selectedTimeSlot]);

    const handleSelectTimeSlot = (e) => {
        console.log(e.target.innerText);
        setSelectedTimeSlot(e.target.innerText);
    }

    const handleFetchDaySlots = (day) => {
        console.log(day);
        router.post(route('booking.available-slots'), {
            day: day,
            employee: 3
            },
            {
                onSuccess: (response) => {
                    console.log(response);
                    setSelectedDate(day);
                    formatDayString()
                },
                onError: (error) => {
                    console.log(error);
                }
            }
        );
    }

    return (
        <Layout>
            {/* Your main content goes here */}
            <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
                A Private Healing Session with Abhijith
            </Typography>
            <Paper  elevation={2} sx={{ display: 'flex', maxWidth: 1000, minHeight: 400, maxHeight: 700, mx: 'auto', mt: 5 }}>
                <Box sx={{ width: '25%', backgroundColor: '#6a1b9a', color: 'white', p: 3, borderRadius: '10px 0 0 10px' }}>
                    {/* Sidebar content goes here */}
                    <Box p={'4px'} bgcolor={'rgba(255, 255, 255, 0.05)'} borderRadius={'4px'} marginBottom={'8px'}>
                        <Stack direction='row' spacing={1} alignItems={'center'} marginBottom={'2px'}>
                            <PunchClockOutlinedIcon width={'0.8em'}/>
                            <Typography variant="body1" component={"p"}>Date & Time</Typography>
                            <Box sx={{ flexGrow: 1 }} />
                            <CheckCircleOutlinedIcon />
                        </Stack>
                        <Box>
                            <Typography variant="subtitle2" component="span">July 10, 2024 - 12:00 AM</Typography>
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
                <Box sx={{ width: '75%', p: 2}}>
                    {/* Main content goes here */}
                    <Typography variant="h5" gutterBottom>
                        Your Information
                    </Typography>
                    <Calendar onDayClick={(e) => handleFetchDaySlots(e)}/>
                    {selectedDate && (
                        <>
                            <Typography variant="h6" gutterBottom>{bookingDateTime}</Typography>
                            <Grid container={true} spacing={1} justifyContent="center" sx={{ marginTop: 2 }}>
                                {timeSlots && timeSlots['1_hour_intervals'].map((value, index) =>
                                    (<Grid key={index} item xs={12} sm={6} onClick={handleSelectTimeSlot}>
                                        {value}
                                    </Grid>)
                                )}
                            </Grid>
                        </>
                        )}
                </Box>
            </Paper>
        </Layout>
    );
}
