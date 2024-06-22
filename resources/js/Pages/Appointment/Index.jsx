import NewAuthenticatedLayout from "@/Layouts/NewAuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import {Box, Button, Container, Divider, Grid, Hidden, List, ListItem, ListItemText, Typography} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFnsV3";
import {useState} from "react";
import AppointmentDialog from "@/Components/AppointmentDialog.jsx";

const data = [
    {
        id: 1,
        date: "June 12, 2024",
        appointments: [
            {
                time: "9:30 am",
                service: "Algun servicio virtual",
                customer: "Some customer",
                status: "Pending",
                duration: "1h",
                healingReport: null
            },
            {
                time: "11:00 am",
                service: "Service A",
                customer: "Customer A",
                status: "Completed",
                duration: "2h",
                healingReport: "Report A"
            },
            {
                time: "10:00 am",
                service: "Service B",
                customer: "Customer B",
                status: "Completed",
                duration: "1.5h",
                healingReport: "Report B"
            },
            {
                time: "1:00 pm",
                service: "Service C",
                customer: "Customer C",
                status: "Pending",
                duration: "1h",
                healingReport: null
            }
        ]
    },
    {
        id: 3,
        date: "June 14, 2024",
        appointments: [
            {
                time: "9:00 am",
                service: "Service D",
                customer: "Customer D",
                status: "Cancelled",
                duration: "1h",
                healingReport: null
            },
            {
                time: "2:00 pm",
                service: "Service E",
                customer: "Customer E",
                status: "Completed",
                duration: "2h",
                healingReport: "Report E"
            },
            {
                time: "3:00 pm",
                service: "Service G",
                customer: "Customer G",
                status: "Completed",
                duration: "2h",
                healingReport: "Report G"
            }
        ]
    },
    {
        id: 4,
        date: "June 15, 2024",
        appointments: [
            {
                time: "8:30 am",
                service: "Service F",
                customer: "Customer F",
                status: "Pending",
                duration: "1.5h",
                healingReport: null
            }
        ]
    },
    {
        id: 5,
        date: "June 16, 2024",
        appointments: [
            {
                time: "12:00 pm",
                service: "Service H",
                customer: "Customer H",
                status: "Pending",
                duration: "1h",
                healingReport: null
            },
            {
                time: "4:00 pm",
                service: "Service I",
                customer: "Customer I",
                status: "Completed",
                duration: "1.5h",
                healingReport: "Report I"
            },
            {
                time: "10:30 am",
                service: "Service J",
                customer: "Customer J",
                status: "Pending",
                duration: "1h",
                healingReport: null
            },
            {
                time: "5:00 pm",
                service: "Service K",
                customer: "Customer K",
                status: "Completed",
                duration: "2h",
                healingReport: "Report K"
            }
        ]
    },
    {
        id: 7,
        date: "June 18, 2024",
        appointments: [
            {
                time: "9:00 am",
                service: "Service L",
                customer: "Customer L",
                status: "Pending",
                duration: "1.5h",
                healingReport: null
            },
            {
                time: "6:00 pm",
                service: "Service M",
                customer: "Customer M",
                status: "Completed",
                duration: "1h",
                healingReport: "Report M"
            }
        ]
    },
];

const index = ({auth}) => {
    const [openDetail, setOpenDetail] = useState(false);

    const handleDetailDialog = () => {
        setOpenDetail(true);

    }

    return (
        <NewAuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Appointments</h2>}
        >
            <Head title='Appointments' />

                <Grid container pb={2}>
                    <Grid item xs={8} pb={3}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker />
                        </LocalizationProvider>
                    </Grid>



                    <Hidden lgDown>
                        <Grid item container xs={12}>
                            <Grid item lg={3}></Grid>
                            <Grid item lg={3}><Typography component={"span"} variant={"caption"}>Service:</Typography></Grid>
                            <Grid item lg={3}><Typography component={"span"} variant={"caption"}>Customer:</Typography></Grid>
                            <Grid item lg={3}><Typography component={"span"} variant={"caption"}>Status:</Typography></Grid>
                        </Grid>
                    </Hidden>
                    {data && data.map((appointment, index) => (<Grid key={index} item container xs={12}>

                            <Box width={"100%"} px={2} bgcolor={'rgba(0,0,0,.05)'} py={0.5}>
                                <Typography variant={"subtitle2"}>{appointment.date}</Typography>
                            </Box>

                        {appointment.appointments && appointment.appointments.map((item, index) => (
                            <List key={`item_${index}`} sx={{ width: '100%', padding: 0}}>
                                <ListItem

                                    alignItems="flex-start"
                                    sx={{
                                        cursor: 'pointer',
                                        padding: 2,
                                        '&:hover': {
                                            backgroundColor: 'rgba(0,0,0,.04)'
                                        }
                                    }}
                                    onClick={handleDetailDialog}
                                >
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={4} lg={3} py={1}>
                                            <Hidden lgUp>
                                                <Typography component={"span"} variant={"caption"}>Time</Typography>
                                            </Hidden>

                                            <Typography component={"p"} variant={"body2"}>{item.time}</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={4} lg={3} py={1}>
                                            <Hidden lgUp>
                                                <Typography component={"span"} variant={"caption"}>Service</Typography>
                                            </Hidden>

                                            <Typography component={"p"} variant={"body2"}>{item.service}</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={4} lg={3} py={1}>
                                            <Hidden lgUp>
                                                <Typography component={"span"} variant={"caption"}>Customer</Typography>
                                            </Hidden>

                                            <Typography component={"p"} variant={"body2"}>{item.customer}</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={4} lg={3} py={1}>
                                            <Hidden lgUp>
                                                <Typography component={"span"} variant={"caption"}>Status</Typography>
                                            </Hidden>

                                            <Typography component={"p"} variant={"body2"}>{item.status}</Typography>
                                        </Grid>
                                        <Hidden lgUp>
                                            <Grid item xs={12} md={4} py={1}>
                                                <Typography component={"span"} variant={"caption"}>Duration</Typography>

                                                <Typography component={"p"} variant={"body2"}>{item.duration}</Typography>
                                            </Grid>
                                        </Hidden>
                                        <Grid item xs={12}>
                                            <Button variant={"contained"}>Upload Healing Report</Button>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider varian={'inset'} component='li' />
                            </List>))}

                    </Grid>))}
                </Grid>
            <AppointmentDialog open={openDetail} handleClose={() => setOpenDetail(false)} />
        </NewAuthenticatedLayout>
    );
}

export default index;
