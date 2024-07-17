import {
    AppBar,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    IconButton,
    Paper,
    Stack,
    Toolbar,
    Typography
} from "@mui/material";
import Calendar from "@/Pages/Booking/Calendar.jsx";
import Information from "@/Pages/Booking/Information";
import {useState} from "react";
import BookingCode from "@/Pages/Booking/BookingCode.jsx";
import {
    CheckCircleOutlined, DateRangeOutlined, NavigateBeforeOutlined, NavigateNextOutlined,
    PersonOutlineOutlined,
    PunchClockOutlined,
    RadioButtonUnchecked
} from "@mui/icons-material";

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
    { id: 0, route: 'calendar', description: 'Select Date & Time' },
    { id: 1, route: 'information', description: 'Your Information' },
    { id: 2, route: 'BookingCode', description: 'Booking Code' },
];

export default function Index({ user }) {
    const [dateTime, setDateTime] = useState({
        selectedDate: null,
        selectedTimeSlot: null,
        bookingDateTime: null,
    });

    const [calendarState, setCalendarState] = useState({
        currentDate: new Date(),
        days: [],
        timeSlots: null,
    });

    const [informationState, setInformationState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        City: '',
        fechaNacimiento: '',
        gender: 0,
        fullAdrress: '',
        Country: '',
        vacune: 0,
        anotherVacune: '',
        aboutUs: '',
        medication: '',
        reasonHealing: '',
        remember: false,
    });

    const [steps, setSteps] = useState(STEPS[0]);
    const [triggerSubmit, setTriggerSubmit] = useState(false);

    const handleDateTimeChange = (newDateTime) => {
        setDateTime(newDateTime);
    };

    const handleCalendarChange = (newCalendarState) => {
        setCalendarState(newCalendarState);
    };

    const handleInformationChange = (newInformationState) => {
        setInformationState(newInformationState);
    };

    const goToStep = (stepIndex) => {
        if (stepIndex >= 0 && stepIndex < STEPS.length) {
            setSteps(STEPS[stepIndex]);
        }
    };

    const handleNextStep = () => {
        const currentStepIndex = steps.id;
        if (currentStepIndex < STEPS.length - 1) {
            goToStep(currentStepIndex + 1);
        }
    };

    const handleBackOneStep = () => {
        const currentStepIndex = steps.id;
        if (currentStepIndex > 0) {
            goToStep(currentStepIndex - 1);
        }
    };

    const triggerFormSubmit = () => {
        setTriggerSubmit(true);
    };

    const submitInformation = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
        setTriggerSubmit(false);
        handleNextStep();
    };

    return (
        <Layout>
            <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
                A Private Healing Session with {user.name} {user.last_name}
            </Typography>
            <Container maxWidth="lg">
                <Stack direction='row' spacing={0} justifyContent={'space-between'} backgroundColor='#ffffff'>
                    <Box width={'30%'} backgroundColor='#6a1b9a' color='white' p={3} className="hideSideBar">
                        <Box p={'4px'} bgcolor={'rgba(255, 255, 255, 0.05)'} borderRadius={'4px'} marginBottom={'8px'}>
                            <Stack direction='row' spacing={1} alignItems={'center'} marginBottom={'2px'}>
                                <PunchClockOutlined width={'0.8em'} />
                                <Typography variant="body1" component={"p"}>Date & Time</Typography>
                                <Box sx={{ flexGrow: 1 }} />
                                <CheckCircleOutlined />
                            </Stack>
                            <Box>
                                <Typography variant="subtitle2" component="span">{dateTime.bookingDateTime ?? dateTime.bookingDateTime}</Typography>
                            </Box>
                        </Box>
                        <Box p={'4px'} bgcolor={'rgba(255, 255, 255, 0.05)'} borderRadius={'4px'} marginBottom={'8px'}>
                            <Stack direction='row' spacing={1} alignItems={'center'} marginBottom={'2px'}>
                                <PersonOutlineOutlined width={'0.8em'} />
                                <Typography variant="body1" component={"p"}>Your information</Typography>
                                <Box sx={{ flexGrow: 1 }} />
                                <RadioButtonUnchecked />
                            </Stack>
                        </Box>
                        <Box p={'4px'} bgcolor={'rgba(255, 255, 255, 0.05)'} borderRadius={'4px'} marginBottom={'8px'}>
                            <Stack direction='row' spacing={1} alignItems={'center'} marginBottom={'2px'}>
                                <DateRangeOutlined width={'0.8em'} />
                                <Typography variant="body1" component={"p"}>Booking Code</Typography>
                                <Box sx={{ flexGrow: 1 }} />
                                <RadioButtonUnchecked />
                            </Stack>
                        </Box>
                    </Box>
                    <Box width={'70%'} sx={{ display: 'flex', flexDirection: 'column', maxHeight: '800px' }} className="showAllBar">
                        <Box component="header" sx={{ py: 2, px: 2, boxShadow: '0 2px 3px rgba(26, 44, 55, 0.15)', textAlign: 'left' }}>
                            <Stack direction={'row'} alignItems={'center'}>
                                {steps.id > 0 && (
                                    <IconButton onClick={handleBackOneStep}>
                                        <NavigateBeforeOutlined />
                                    </IconButton>
                                )}
                                <Typography variant="h5">
                                    {steps.description}
                                </Typography>
                            </Stack>
                        </Box>
                        <Box component="section" sx={{ overflowY: 'auto', p: 2 }}>
                            {steps.route === 'calendar' && (
                                <Calendar
                                    dateTime={dateTime}
                                    onDateTimeChange={handleDateTimeChange}
                                    calendarState={calendarState}
                                    onCalendarChange={handleCalendarChange}
                                    user={user}
                                />
                            )}
                            {steps.route === 'information' && (
                                <Information
                                    informationState={informationState}
                                    onInformationChange={handleInformationChange}
                                    triggerSubmit={triggerSubmit}
                                    submitInformation={submitInformation}
                                />
                            )}
                            {steps.route === 'BookingCode' && <BookingCode />}
                        </Box>
                        <Box component="footer" sx={{ py: 2, px: 2, boxShadow: '0 -2px 3px rgba(26, 44, 55, 0.15)', color: 'white', textAlign: 'right' }}>
                            {steps.id < STEPS.length - 1 && (
                                <Button variant="contained" color="primary" onClick={handleNextStep}>
                                    Continue <NavigateNextOutlined />
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Stack>
            </Container>
        </Layout>
    );
}
