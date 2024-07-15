import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Typography, Button, IconButton, Box } from "@mui/material";

import SpecialDaysAddPeriodForm from "./SpecialDaysAddPeriodForm";
import FormDatePicker from "@/Components/formComponent/FormDatePicker";

//icons
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';




export default function SpecialDays({ intervals, workingHours, user }) {

    const defaultValues = {
        dateSpecial: null,
    }

    //const [workingHoursData, setWorkingHoursData] = useState([]);
    const [periods, setPeriods] = useState({});
    const [nextIndexPeriod, setNextIndexPeriod] = useState(0);

    //Periods Form
    const formPeriodsRefs = useRef([]);
    const [formPeriodData, setFormPeriodData] = useState({});

    //SpecialDays created, object
    const [savedDaysObject, setSavedDaysObject] = useState([]);
    const [shouldSubmit, setShouldSubmit] = useState(false);
    //react-hook-form
    const { handleSubmit, control, reset, clearErrors} = useForm(
        { defaultValues: defaultValues, }
    );

    //Expand box when "+" clicked
    const [mainBoxExpanded, setMainBoxExpanded] = useState(false);
    const handleExpandedMainBox = () => {
        setMainBoxExpanded(!mainBoxExpanded);
        if (mainBoxExpanded) {
            setPeriods(null);
            setNextIndexPeriod(0);
            //setSpecialDayDate(null);
        }
        else addPeriod();
    }

    //Button Add Period clicked
    const addPeriod = () => {
        setPeriods({ ...periods, [nextIndexPeriod]:null });
        setNextIndexPeriod(nextIndexPeriod + 1);
    }

    //Button SAVE clicked
    const handleFormPeriodSubmit = (data, index) => {
        setFormPeriodData((prevData) => ({
            ...prevData,
            [index]: data,
        }));
    };

    const handleSave = () => {
        formPeriodsRefs.current.forEach((ref) => ref.submitForm());
        setShouldSubmit(true);
    };


    const onSubmit = (data) =>{
        console.log("data:")
        console.log(data);
        const newObject = {["date"]:data.dateSpecial, formPeriodData}
        setSavedDaysObject((prevData) =>[
            ...prevData, newObject
        ]);
    };

    useEffect(() => {
        if (shouldSubmit) {
          handleSubmit(onSubmit)();
          setShouldSubmit(false);
        }
      }, [formPeriodData]);
    

    useEffect(() => {
        console.log("Form data updated:", savedDaysObject);
      }, [savedDaysObject]);
      
      useEffect(() => {
        console.log("Form period data updated:", formPeriodData);
      }, [formPeriodData]);


    // useEffect(() => {
    //     setWorkingHoursData(workingHours)
    // }, [workingHours]);

    //ESPECIAL DAY - DATE
    //const [specialDayDate, setSpecialDayDate] = useState(null);

    
    //Button removePeriod clicked
    const handleRemovePeriod = (index) => {
        const { [index]: _, ...remainingPeriods } = periods;
        setPeriods(remainingPeriods);
    }

    
    //formatDate to render in HTML
    const formattedDate = (date) => {
        return date != null | undefined ? format(new Date(date), 'MMMM d, yyyy') : '';
    };


    return (
        <Grid container columnGap={2} rowGap={1}>
            <Grid container xs={12} className="rounded-lg" sx={{ backgroundColor: "#E5E5E5" }} px={2} py={0.5}>
                <Grid xs my={"auto"} ><Typography variant="body1">Special Days</Typography></Grid>
                <Grid xs={"auto"} xsOffset={"auto"} >
                    <Button size="small" sx={{ float: "right" }} startIcon={<AddIcon sx={{ backgroundColor: `${mainBoxExpanded ? "#1976D2" : "white"}`, color: `${mainBoxExpanded ? "white" : "#1976D2"}`, borderRadius: "100%", border: "1px solid gray" }} />}
                        onClick={handleExpandedMainBox}>Add Special Day</Button>
                </Grid>
            </Grid>

            {mainBoxExpanded && (
                <Grid container xs={12} mt={2} p={2} border={"1px solid #ECECEC"}>
                    <Grid xs={12} alignItems={"center"} justifyContent={"center"} display={"flex"} gap={2}>
                         <FormDatePicker
                            name="dateSpecial"
                            control={control}
                            label="Date"
                            orientation="portrait"
                            size="small"
                            rules={{ required: "This field is required" }}
                        /> 
                        <Button size="small" sx={{ float: "right" }} startIcon={<AddIcon sx={{ backgroundColor: `${periods ? "#1976D2" : "white"}`, color: `${periods ? "white" : "#1976D2"}`, borderRadius: "100%", border: "1px solid gray" }} />}
                            onClick={addPeriod}>Add Period</Button>
                    </Grid>
                    {
                        periods && (
                            <Grid xs={12} mt={4} rowGap={2} container>
                                {Object.keys(periods).map((index) => (
                                    <Grid xs={12} container key={`grid-item-${index}`}>
                                        <Grid xs={12} container backgroundColor={"#E5E5E5"} className="rounded-t-lg" px={2}>
                                            <Grid xs my={"auto"}>
                                                <Typography variant="body1" >{`Period ${parseInt(index) + 1}`}</Typography>
                                            </Grid>
                                            <Grid xs={"auto"} xsOffset={"auto"}>
                                                <IconButton onClick={() => handleRemovePeriod(index)} ><RemoveIcon sx={{ backgroundColor: "red", color: "white", borderRadius: "100%" }} /></IconButton>
                                            </Grid>
                                        </Grid>
                                        <SpecialDaysAddPeriodForm 
                                            intervals={intervals}
                                            onFormSubmit={handleFormPeriodSubmit}
                                            ref={(el)=>(formPeriodsRefs.current[index]=el)}
                                            index = {index}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        )
                    }

                    <Grid xs={12} container mt={4} >
                        <Grid xsOffset={"auto"} display={"flex"} gap={"1rem"}>
                            <Button variant="outlined" onClick={handleExpandedMainBox}>Cancel</Button>
                            <Button variant="contained" onClick={handleSave}>Save</Button>
                        </Grid>
                    </Grid>
                </Grid>
            )}
            {savedDaysObject && Object.keys(savedDaysObject).map((index) => (
                <Grid key={`day-item-${index}`} xs={12} container mt={1} borderBottom={"1px solid #ECECEC"} px={2} pb={1}>
                    <Box sx={{ display: "flex", width: "100%" }}>
                        <Box flex={1} >
                            <Typography component="div" sx={{ display: "flex" }} variant="body1"><Box sx={{ fontWeight: "bold" }} pr={1}>Date:</Box>{`${formattedDate(savedDaysObject[index].date)}`}</Typography>
                            <Typography component="div" sx={{ display: "flex" }} variant="body1"><Box sx={{ fontWeight: "bold" }} pr={1}>Work Hours:</Box></Typography>
                            <Typography component="div" sx={{ display: "flex" }} variant="body1"><Box sx={{ fontWeight: "bold" }} pr={1}>Reflect On:</Box></Typography>
                        </Box>
                        <Box>
                            <IconButton><ContentCopyIcon /></IconButton>
                            <IconButton><EditIcon /></IconButton>
                            <IconButton><DeleteOutlinedIcon /></IconButton>
                        </Box>
                    </Box>
                </Grid>

            ))}
        </Grid>
    );
}