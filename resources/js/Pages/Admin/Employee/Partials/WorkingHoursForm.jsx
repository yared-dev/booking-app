import { useForm, usePage } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import { useEffect, useState, useRef } from "react";
import { Grid, IconButton, MenuItem, Select, Box, Radio, RadioGroup, FormControl, FormControlLabel, styled, Autocomplete, TextField, Chip, Typography, InputAdornment, Button } from "@mui/material";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import HourAutoComplete from "@/Components/HourAutoComplete";

const BpIcon = styled('span')(({ theme }) => ({
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow:
        theme.palette.mode === 'dark'
            ? '0 0 0 1px rgb(16 22 26 / 40%)'
            : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
    backgroundImage:
        theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
            : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '.Mui-focusVisible &': {
        outline: '2px auto rgba(19,124,189,.6)',
        outlineOffset: 2,
    },
    'input:hover ~ &': {
        backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
    },
    'input:disabled ~ &': {
        boxShadow: 'none',
        background:
            theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
    },
}));

const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: '#409EFF',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&::before': {
        display: 'block',
        width: 16,
        height: 16,
        backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
        content: '""',
    },
    'input:hover ~ &': {
        backgroundColor: '#409EFF',
    },
});



export default function WorkingHoursForm({ intervals, workingHour, user, allDays = false }) {
    const [workingHourData, setWorkingHourData] = useState({});

    useEffect(() => {
        console.log('se actualiza form ', workingHour)
        setWorkingHourData(workingHour)
    }, [workingHour]);

    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors,
        clearErrors } = useForm({
            day: workingHourData.key,
            start: workingHourData.start_time || null,
            end: workingHourData.end_time || null,
        })

    useEffect(() => {
        console.log('workingHourData:', workingHourData);
        console.log('start_time:', workingHourData.start_time);
        setData({
            day: workingHourData.key,
            start: workingHourData.start_time || null,
            end: workingHourData.end_time || null,
        });
    }, [workingHourData, workingHourData]);

    useEffect(() => {
        console.log('se actualiza data form ', data);
    }, [data]);

    const handleIntervalSelection = (e) => {
        e.preventDefault();
        console.log({ ...data, employee_id: user.id })

        post(route('admin.working-hours.store', { id: user.id }),
            {
                preserveState: true,
                preserveScroll: true,
                errorBag: 'workingHours',
                onSuccess: () => {
                    clearErrors()
                },
                onError: (error) => {
                    console.log(error)
                }

            })
    };

    const applyEveryDay = () => {
        post(route('admin.working-hours.every-day', { id: user.id }),
            {
                preserveState: true,
                preserveScroll: true,
                errorBag: 'applyEveryDay',
                onSuccess: () => {
                    clearErrors()
                },
                onError: (error) => {
                    console.log(error)
                }

            })
    }

    //Expand box when "+" clicked
    const [mainBoxExpanded, setMainBoxExpanded] = useState(false);


    const handleExpandedMainBox = () => {
        setMainBoxExpanded(!mainBoxExpanded);
    }

    //select for radioButton
    const [selectedHourOption, setSelectedHourOption] = useState("work");

    //variables for HourAutoComplete, Start and End
    const [startInputValue, setStartInputValue] = useState('');
    const [endInputValue, setEndInputValue] = useState('');
    const [selectedChips, setSelectedChips] = useState([]);



    // data for SERVICES select
    const dataServices = [
        { name: "service test 1" },
        { name: "service test 2" },
        { name: "service test 3" },
        { name: "service test 4" },
        { name: "service test 5" },
        { name: "long long service name test 5" },
    ];
  

    //data when SAVE buttons, [Work Hours] or [Breaks]
    const saveHourObject = () => {
        console.log("BEFORE");
        console.log(objectHoursCreated);

        console.log("Type: ", selectedHourOption);
        console.log("Start value: ", startInputValue);
        console.log("End value: ", endInputValue);
        console.log('Chips seleccionados:', selectedChips);

        // Creación del objeto según el tipo
        const newHourObject = {
            type: selectedHourOption,
            start: startInputValue,
            end: endInputValue,
        };

        if (selectedHourOption === "work") {
            newHourObject.servicesSelected = selectedChips;
        }


        setObjectHoursCreated([...objectHoursCreated, newHourObject]);

    }


    const [objectHoursCreated, setObjectHoursCreated] = useState([]);



    return (
        <Box width={"100%"} display={"flex"} flexDirection={"column"}>
            {/*HEADER DAY MONDAY TO FRIDAY*/}
            <Grid container sx={{ backgroundColor: "#E5E5E5" }} className="rounded-t-lg" px={2} alignItems="center">
                <Grid items xs ><Typography variant="body1">{workingHourData.value}</Typography></Grid>
                <Grid items ><Box>
                    {allDays && (<SecondaryButton onClick={applyEveryDay}>apply to all days</SecondaryButton>)}
                    <IconButton onClick={handleExpandedMainBox}>
                        <AddIcon sx={{ backgroundColor: `${mainBoxExpanded ? "#1976D2" : "white"}`, color: `${mainBoxExpanded ? "white" : "#1976D2"}`, borderRadius: "100%" }} />
                    </IconButton>
                </Box></Grid>
            </Grid>
            {/*----------####-------------*/}

            {/*CONTAINER TO ADD HOURS*/}
            {mainBoxExpanded && (
                <Grid container margin={"auto"} p={2} sx={{ border: "1px solid #ECECEC" }}>
                    {/*RADIO BUTTONS*/}
                    <Grid item xs={12} sm={12}>
                        <RadioGroup
                            row
                            sx={{ gap: "1rem" }}
                            name="row-radio-buttons-group"
                            defaultValue="work"
                            onChange={(e) => setSelectedHourOption(e.target.value)}
                        >
                            <FormControlLabel sx={{ margin: 0 }} value="work" control={<Radio size="small" checkedIcon={<BpCheckedIcon />}
                                icon={<BpIcon />} />} label="Work Hours" />
                            <FormControlLabel sx={{ margin: 0 }} value="break" control={<Radio size="small" checkedIcon={<BpCheckedIcon />}
                                icon={<BpIcon />} />} label="Breaks" />
                        </RadioGroup>
                    </Grid>
                    {/*--------------#####---------*/}
                    {/*TEXT FIELDS (3)*/}
                    <Grid item xs={12} sm={12}>
                        <Grid container pt={2} margin={"auto"} columnGap={3} rowGap={2} >
                            <Grid item xs={12} sm={12}><Typography variant="body1">{`${selectedHourOption === "work" ? "Work Hours" : "Break Hours"}`}</Typography></Grid>
                            <Grid item xs={12} sm={2.5}>
                                <FormControl fullWidth>
                                    <HourAutoComplete intervals={intervals} label={"Start"} setSelectedValue={setStartInputValue} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={2.5} >
                                <FormControl fullWidth>
                                    <HourAutoComplete intervals={intervals} label={"End"} setSelectedValue={setEndInputValue} />
                                </FormControl>
                            </Grid>
                            {selectedHourOption === "work" && (
                                <Grid item xs >
                                    <FormControl fullWidth>
                                        <Autocomplete
                                            multiple
                                            limitTags={2}
                                            size="small"
                                            options={dataServices.map((service) => service.name)}
                                            value={selectedChips}
                                            onChange={(event, value) => setSelectedChips(value)}
                                            renderInput={(params) => <TextField {...params} label="Services" />}
                                            renderTags={(tagValue, getTagProps) => {
                                                return tagValue.map((option, index) => {

                                                    return (
                                                        <Chip
                                                            label={option}
                                                            key={index}
                                                            style={{ maxWidth: "8rem" }}
                                                        />
                                                    );
                                                });
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                    {/*------------####------------*/}
                    {/*BUTTONS CANCEL, SAVE*/}
                    <Grid item xs={12} sm={12} >
                        <Grid container pt={2} margin={"auto"} justifyContent={"end"} columnGap={2}>
                            <Grid item xs={"auto"} >
                                <Button variant="outlined" onClick={() => setMainBoxExpanded(false)}>Cancel</Button>
                            </Grid>
                            <Grid item xs={"auto"} >
                                <Button variant="contained" onClick={saveHourObject} >Save</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            )}
            {/*----------####-------------*/}

            {/*CONTAINER FOR ROWS RESULT*/}
            {objectHoursCreated.map((refObject, index) => {
    console.log('Datos de refObject en la iteración', index, ':', refObject);
    return(
                <Grid container margin={"auto"} py={1} px={2} className={`${index==objectHoursCreated.length-1?"rounded-b-lg":""}`} alignItems={"center"} sx={{ border: "1px solid #ECECEC" }} color="gray" columnGap={3}>
                    <Grid item xs sm={"auto"} order={{ xs: 1, sm: 1 }}>
                        <Typography variant="body1">{`${refObject.start} - ${refObject.end}`}</Typography>
                    </Grid>
                    <Grid item xs={12} sm sx={{ overflow: 'hidden', flexWrap: 'nowrap' }} order={{ xs: 3, sm: 2 }}>
                        <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '1rem', paddingRight: '5rem', overflow: 'auto' }}>
                            {refObject.servicesSelected && refObject.servicesSelected.length > 0 ? (
                                refObject.servicesSelected.map((value, index) => (
                                    <Chip key={index} label={value} />
                                ))
                                
                            ) : (
                                <Chip label="Break" />
                            )}
                        </Box>
                    </Grid>
                    <Grid item sm={"auto"} order={{ xs: 2, sm: 3 }}>
                        <IconButton onClick={() => null}><EditIcon /></IconButton>
                        <IconButton onClick={() => null}><DeleteOutlinedIcon /></IconButton>

                    </Grid>
                </Grid>
                );
            })}
            
        </Box>
    );

}
