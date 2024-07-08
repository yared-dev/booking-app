import {DatePicker, LocalizationProvider, YearCalendar} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFnsV3";
import {Box, Button, Divider, TextField, Typography,FormControlLabel, Checkbox} from "@mui/material";

import { DateRangePicker, SingleInputDateRangeField } from '@mui/x-date-pickers-pro';
import Grid from '@mui/material/Grid';

import {useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';


const minDate = new Date('1900-01-01T00:00:00.000');
const maxDate = new Date('2034-01-01T00:00:00.000');

const DaysOff = ({ daysOff }) => {
    const [date, setDate] = useState(new Date());

    //Color for legends [EveryYear] [OnceOff]
    const colorLegendEveryYear = "#FFA700";
    const colorLegendOnceOff = "#FF1563";

    //Expanded form
    const [mainBoxExpanded, setMainBoxExpanded] = useState(false);
    const handleExpandedMainBox = () => {
        setMainBoxExpanded(!mainBoxExpanded);
    }

    //checkbox repeat every years
    const checkBoxDefaultColor = "#222222";
    const checkboxCheckedColor = "#1976D2";
    const [checked, setChecked] = useState(false);
    const handleChange = ()=>{
        setChecked(!checked);
    }

    return (
        <div>

        <Grid container columnGap={2} rowGap={1}>
            <Grid item xs={12} sm={"auto"}  sx={{border:"1px solid red"}}>
            <LocalizationProvider  dateAdapter={AdapterDateFns}>

                        <DatePicker
                            sx={{width:'100%'}}
                            views={['year']}
                            value={date}
                            minDate={minDate}
                            slotProps={{ textField: { size: 'small' } }}
                            maxDate={maxDate}
                            onChange={(newDate) => {
                                setDate(newDate);
                            }}
                            renderInput={(params) => <TextField {...params}  label="Select Year" />}
                        />

                </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={"auto"} smOffset={"auto"} sx={{border:"1px solid blue"}} display={"flex"} gap={"1rem"} alignItems={"center"} justifyContent={"space-between"}>
                <Typography variant="body1"><SquareRoundedIcon fontSize="small" sx={{color:`${colorLegendEveryYear}`}}/>Repeat Every Year</Typography>
                <Typography variant="body1"><SquareRoundedIcon fontSize="small" sx={{color:`${colorLegendOnceOff}`}}/>Once Off</Typography>
            </Grid>
            <Grid item xs={12} sm={"auto"} smOffset={0} my={"auto"}>
                            <Button size="small" sx={{float:"right"}} startIcon={<AddIcon sx={{ backgroundColor: `${mainBoxExpanded ? "#1976D2" : "white"}`, color: `${mainBoxExpanded ? "white" : "#1976D2"}`, borderRadius: "100%", border:"1px solid gray" }} />}
                    onClick={handleExpandedMainBox}>Add Day Off</Button>
            </Grid>
        </Grid>
        {/*Form to add "days off"*/}
        <Grid container mt={2}>
            <Grid item container xs={12} sm={12} px={2} sx={{backgroundColor:"#E5E5E5"}} className="rounded-t-lg">
                <Grid item xs={"auto"} sm={"auto"}><Typography>Title</Typography></Grid>
                <Grid item xs={"auto"} sm={"auto"} smOffset={"auto"}><FormControlLabel control={<Checkbox defaultChecked />} sx={{color:`${checked?checkboxCheckedColor:checkBoxDefaultColor}`}} label="Repeat Yearly" checked={checked}
  onChange={handleChange} /></Grid>
            </Grid>
            <Grid item xs={12} sm={12}>
                <Grid container margin={"auto"} p={2} sx={{ border: "1px solid #ECECEC" }}>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateRangePicker
  slots={{ field: SingleInputDateRangeField }}
  name="allowedRange"
/>

                </LocalizationProvider>

                </Grid>
            </Grid>
        </Grid>

            <Box display={'flex'} justifyContent={'space-between'}>


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
