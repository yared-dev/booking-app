import {DatePicker, LocalizationProvider, YearCalendar} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFnsV3";
import {Box, Button, Divider, Grid, TextField, Typography} from "@mui/material";
import {useState} from "react";

const minDate = new Date('1900-01-01T00:00:00.000');
const maxDate = new Date('2034-01-01T00:00:00.000');

const DaysOff = ({ daysOff }) => {
    const [date, setDate] = useState(new Date());

    return (
        <div>
            <Box display={'flex'} justifyContent={'space-between'}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Grid item xs={12} md={6} pb={2}>
                        <DatePicker
                            width={"100%"}
                            views={['year']}
                            value={date}
                            minDate={minDate}
                            maxDate={maxDate}
                            onChange={(newDate) => {
                                setDate(newDate);
                            }}
                            renderInput={(params) => <TextField {...params} label="Select Year" />}
                        />
                    </Grid>
                </LocalizationProvider>

                <Button>Add Day Off</Button>

            </Box>
            <Grid container>
                <Grid item container>
                    <Grid item lg={6} xs={6}>
                        <Box width={"100%"} px={2} bgcolor={'rgba(0,0,0,.05)'} py={0.5}>
                            <Typography variant={"body1"}>Date</Typography>
                        </Box>
                    </Grid>
                    <Grid item lg={6} xs={6}>
                        <Box width={"100%"} px={2} bgcolor={'rgba(0,0,0,.05)'} py={0.5}>
                            <Typography variant={"body1"}>Day Off name</Typography>
                        </Box>
                    </Grid>

                    <Grid item container borderBottom={1} borderColor={'rgba(0,0,0,.05)'} alignItems={'center'}>
                        <Grid item lg={6} xs={6}>

                                <Typography variant={"body1"}>June 11, 2024 - June 21, 2024</Typography>

                        </Grid>
                        <Grid item lg={6} xs={6} justifyContent={'space-between'} display={'flex'} alignItems={'center'}>

                                <Typography variant={"body1"}>Prueba</Typography>
                                <Box>
                                    <Button>Edit</Button>
                                    <Button>Delete</Button>
                                </Box>

                        </Grid>
                    </Grid>

                    <Grid item container borderBottom={1} borderColor={'rgba(0,0,0,.05)'} alignItems={'center'}>
                        <Grid item lg={6} xs={6}>

                            <Typography variant={"body1"}>June 11, 2024 - June 21, 2024</Typography>

                        </Grid>
                        <Grid item lg={6} xs={6} justifyContent={'space-between'} display={'flex'} alignItems={'center'}>

                            <Typography variant={"body1"}>Prueba</Typography>
                            <Box>
                                <Button>Edit</Button>
                                <Button>Delete</Button>
                            </Box>

                        </Grid>
                    </Grid>

                    <Grid item container borderBottom={1} borderColor={'rgba(0,0,0,.05)'} alignItems={'center'}>
                        <Grid item lg={6} xs={6}>

                            <Typography variant={"body1"}>June 11, 2024 - June 21, 2024</Typography>

                        </Grid>
                        <Grid item lg={6} xs={6} justifyContent={'space-between'} display={'flex'} alignItems={'center'}>

                            <Typography variant={"body1"}>Prueba</Typography>
                            <Box>
                                <Button>Edit</Button>
                                <Button>Delete</Button>
                            </Box>

                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </div>
    );
}

export default DaysOff;
