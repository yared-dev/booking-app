import {AppBar, Box, Button, Container, CssBaseline, Grid, Paper, Stack, Toolbar, Typography} from "@mui/material";
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PunchClockOutlinedIcon from '@mui/icons-material/PunchClockOutlined';
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import Calendar from "@/Pages/Booking/Calendar.jsx";
import Information from "@/Pages/Booking/Information";
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

const STEPS = [
    {
        id: 0,
        route: "calendar",
        description: "Date & Time"
    },
    {
        id: 1,
        route: "information",
        description: "Your Information"
    },
    {
        id: 2,
        route: "BokkingCode",
        description: "BokkingCode"
    },
];
export default function Index({ timeSlots }) {
    const [dateTime, setDateTime] = useState({
        selectedDate: null,
        selectedTimeSlot: null,
        bookingDateTime: null
    });
    const [steps, setSteps] = useState(STEPS[0]);

    const handleDateTimeChange = (newDateTime) => {
        console.log('newDateTimeParent: ', newDateTime)
        setDateTime(newDateTime);
    };

    const handleNextStep = (step) => {
        if(!step){
            step = steps;
        }
        const getStep = STEPS.filter(e => e.id == step.id)[0];
        let position = getStep.id + 1;
        if(!STEPS[position]){
            position = 0;
        }
        setSteps(STEPS[position])
    };

    const submitInformation = (e) => {
        console.log("🚀 ~ submitInformation ~ e:", e)
    };
    return (
        <Layout>
            {/* Your main content goes here */}
            <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
                A Private Healing Session with Abhijith
            </Typography>
            <Container maxWidth="lg">
                <Stack direction='row' spacing={0} justifyContent={'space-between'} backgroundColor='#ffffff'>
                    <Box width={'30%'} backgroundColor='#6a1b9a'  color='white' p={3} className="hideSideBar" >
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
                    <Box width={'70%'} sx={{ display: 'flex', flexDirection: 'column', maxHeight:'800px' }} className="showAllBar" >
                        <Box component="header" sx={{ py: 2, px: 2, boxShadow:'0 2px 3px rgba(26, 44, 55, 0.15)', textAlign: 'left' }}>
                            <Typography variant="h5">
                                {steps.description}
                            </Typography>
                        </Box>
                        <Box component="section" sx={{ overflowY: 'auto', p: 2 }}>
                            {steps.route == 'calendar' ? (<Calendar timeSlots={timeSlots} dateTime={dateTime} onDateTimeChange={handleDateTimeChange} />): null}
                            {steps.route == 'information' ? (<Information submitInformation={submitInformation} />): null}
                        </Box>
                        <Box component="footer" sx={{ py: 2, px: 2, boxShadow:'0 -2px 3px rgba(26, 44, 55, 0.15)', color: 'white', textAlign: 'right' }}>
                            {steps.route == 'calendar' ? (<Button variant="contained" color="primary" onClick={()=>handleNextStep()}>Continue</Button>): null}
                            {steps.route == 'information' ? (<Button variant="contained" color="primary" onClick={()=>handleNextStep()}>Continue</Button>): null}
                            {steps.route == 'BokkingCode' ? (<Button variant="contained" color="primary" onClick={()=>handleNextStep()}>Continue</Button>): null}
                        </Box>
                    </Box>
                </Stack>
            </Container>
        </Layout>
    );
}
