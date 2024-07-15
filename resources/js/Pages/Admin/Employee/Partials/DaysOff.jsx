import { useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { Box, Button, Typography, FormControlLabel, Checkbox, TextField, styled, RadioGroup, Radio, IconButton } from "@mui/material";
import { addDays, format } from "date-fns";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import FormRadioGroup from "@/Components/formComponent/FormRadioGroup";

import AddIcon from '@mui/icons-material/Add';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import FormDatePicker from "@/Components/formComponent/FormDatePicker";
import FormTextField from "@/Components/formComponent/FormTextField";
import FormCheckboxGroup from "@/Components/formComponent/FormCheckbox";

//Styles for RadioButton

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
//-------------------------------------------------




export default function DaysOff({ daysOff }) {

    const rdOptions = [
        { id: 0, label: "Single Date" },
        { id: 1, label: "Date Range" }
    ]

    const checkboxes = [{ id: 0, label: "Repeat Yearly" }];

    //Color and const for legends [EveryYear] [OnceOff]
    const colorLegendEveryYear = "#FFA700";
    const colorLegendOnceOff = "#FF1563";

    const squareEveryyear = <SquareRoundedIcon fontSize="small" sx={{ color: `${colorLegendEveryYear}` }} />
    const squareOnceOff = <SquareRoundedIcon fontSize="small" sx={{ color: `${colorLegendOnceOff}` }} />

    //color for checked
    const checkboxCheckedColor = "#1976D2";

    //--------------------###########--------------------------

    // year variable
    const [year, setYear] = useState(new Date());
    const minDate = new Date(year.getFullYear(), 0, 1);
    const maxDate = new Date(year.getFullYear(), 11, 31);

    //default values for FormControl react-hook-form
    const defaultValues = {
        typeRecord: rdOptions[0],
        dateStart: null,
        dateEnd: null,
        txtDayOffName: "",
        ckYearly:[]
    }

    //react-hook-form
    const { handleSubmit, control, setValue, reset, clearErrors } = useForm(
        { defaultValues: defaultValues, }
    )

    const typeRecordValue = useWatch({ control, name: "typeRecord" });
    const typeStartDate = useWatch({ control, name: "dateStart" });

    //Expanded form
    const [mainBoxExpanded, setMainBoxExpanded] = useState(false);
    const handleExpandedMainBox = () => {
        reset();
        clearErrors();
        setMainBoxExpanded(!mainBoxExpanded);
    }

    //onSubmit ADD DAYS OFF button
    const [editObjectID, setEditObjectID] = useState(null); //For edit
    const [objectDaysOffCreated, setObjectDaysOffCreated] = useState([]);

    const onSubmit = (data) => {

        console.log(data);

        data.yearly = data.ckYearly[0]?.id === checkboxes[0].id;
        //delete data.ckYearly;

        if (typeRecordValue?.id === rdOptions[0].id) {
            delete data.dateEnd;
        }

        if (editObjectID != null) {
            objectDaysOffCreated[editObjectID] = data;

        } else {
            setObjectDaysOffCreated([...objectDaysOffCreated, data]);
        }
        reset();
        setEditObjectID(null);
    }
    
    //----------------EDIT AND DELETE ---------------------
    const editDayOffCreated = (currentObject, index)=>{
        reset();
        clearErrors();
        setEditObjectID(index);
        if (currentObject.dateEnd) { setValue("dateEnd", currentObject.dateEnd) }
        setValue("typeRecord", currentObject.typeRecord);
        setValue("dateStart", currentObject.dateStart);
        setValue("txtDayOffName", currentObject.txtDayOffName);
        if(currentObject.ckYearly) {setValue("ckYearly", currentObject.ckYearly)}
                        
    }

    const deleteDayOffCreated = (index) =>{
        setObjectDaysOffCreated((prevData) =>
            prevData.filter((_, i) => i !== index)
        );
    }

    //format to render in HTML
    const formattedDate = (date) => {
        return date != null | undefined ? format(new Date(date), 'MMMM d, yyyy') : '';
    };

    return (
        <div>

            <Grid container columnGap={2} rowGap={1}>
                <Grid xs={12} sm={"auto"} >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            sx={{ width: '100%' }}
                            label={"Year"}
                            orientation="portrait"
                            views={['year']}
                            value={year}
                            slotProps={{ textField: { size: 'small' } }}
                            maxDate={maxDate}
                            onChange={(newYear) => {
                                setYear(newYear);
                            }}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid xs={12} sm={"auto"} smOffset={"auto"} display={"flex"} gap={"1rem"} alignItems={"center"} justifyContent={"space-between"}>
                    <Box display={"flex"} alignItems={"center"} gap={0.5}>
                        {squareEveryyear}
                        <Typography variant="body1">Repeat Every Year</Typography>
                    </Box>
                    <Box display={"flex"} alignItems={"center"} gap={0.5}>
                        {squareOnceOff}
                        <Typography variant="body1">Once Off</Typography>
                    </Box>


                </Grid>
                <Grid xs={12} sm={"auto"} smOffset={0} my={"auto"}>
                    <Button size="small" sx={{ float: "right" }} startIcon={<AddIcon sx={{ backgroundColor: `${mainBoxExpanded ? "#1976D2" : "white"}`, color: `${mainBoxExpanded ? "white" : "#1976D2"}`, borderRadius: "100%", border: "1px solid gray" }} />}
                        onClick={handleExpandedMainBox}>Add Day Off</Button>
                </Grid>
            </Grid>
            {/*Form to add "days off"*/}
            {mainBoxExpanded && (
                <Grid container mt={4}>
                    <Grid container xs={12} sm={12} px={2} sx={{ backgroundColor: "#E5E5E5" }} className="rounded-t-lg">
                        <Grid xs={"auto"} sm={"auto"} my={"auto"}><Typography>Day Off</Typography></Grid>
                        <Grid xs={"auto"} sm={"auto"} xsOffset={"auto"}>
                            <FormCheckboxGroup 
                                 name="ckYearly"
                                 control={control}
                                 options={checkboxes}
                                 fullWidth
                                 checkedColor={checkboxCheckedColor}
                            />
                        </Grid>
                    </Grid>

                    <Grid container margin={"auto"} p={2} sx={{ border: "1px solid #ECECEC" }} xs rowGap={2}>
                        <Grid xs={12} sm={"auto"}>
                            <FormRadioGroup
                                row
                                sx={{ gap: "1rem" }}
                                name="typeRecord"
                                control={control}
                                rules={{ required: "One is required" }}
                                options={rdOptions}
                                checkedIcon={<BpCheckedIcon />}
                                bpIcon={<BpIcon />}
                                fullWidth
                            />
                        </Grid>
                        <Grid container xs={12} columnGap={2} rowGap={2}>
                            <Grid xs md={"auto"}>
                                <FormDatePicker
                                    name={"dateStart"}
                                    control={control}
                                    label={`${typeRecordValue.id === rdOptions[0].id ? "" : "Start "}Date`}
                                    orientation="portrait"
                                    size={"small"}
                                    rules={{ required: "This field is required" }}
                                    minDate={minDate}
                                    maxDate={maxDate}
                                    referenceDate={minDate}
                                    closeOnSelect
                                />
                            </Grid>

                            {typeRecordValue.id === rdOptions[1].id && (
                                <Grid xs md={"auto"}>
                                    <FormDatePicker
                                        name="dateEnd"
                                        control={control}
                                        label="End Date"
                                        orientation="portrait"
                                        size="small"
                                        rules={{ required: "This field is required" }}
                                        minDate={typeStartDate ? addDays(typeStartDate, 1) : null}
                                        maxDate={maxDate}
                                        referenceDate={minDate}
                                        closeOnSelect
                                    />
                                </Grid>
                            )}

                            <Grid xs={12} sm={typeRecordValue.id === rdOptions[0].id ? true : 12} lg>
                                <FormTextField 
                                    name="txtDayOffName"
                                    control={control}
                                    label="Name"
                                    size="small"
                                    fullWidth
                                    rules={{ required: "This field is required" }}
                                /> 
                            </Grid>
                        </Grid>
                        <Grid container xs={12} columnGap={2}>
                            <Grid xs={"auto"} xsOffset={"auto"}>
                                <Button sx={{ width: "100%" }} variant="outlined" onClick={() => setMainBoxExpanded(false)}>Cancel</Button>
                            </Grid>
                            <Grid xs={"auto"}  >
                                <Button sx={{ width: "100%" }} variant="contained" onClick={handleSubmit(onSubmit)}>Add Day Off</Button>
                            </Grid>

                        </Grid>
                    </Grid>

                </Grid>
            )}
            {objectDaysOffCreated.length > 0 && (
                <Grid container mt={4} maxHeight={300} sx={{ overflowY: "auto" }}>
                    <Grid container xs={12} bgcolor={"#E5E5E5"} className="rounded-lg" position={"sticky"} top={0} zIndex={10} >
                        <Grid xs={6} sm={4}>
                            <Box width={"100%"} px={2} py={0.5}>
                                <Typography variant={"body1"}>Date</Typography>
                            </Box>
                        </Grid>
                        <Grid xs={6} sm>
                            <Box width={"100%"} px={2} py={0.5} >
                                <Typography variant={"body1"}>Day Off name</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    {objectDaysOffCreated.map((data, index) => {
                        console.log('Datos de data en la iteración', index, ':', data);
                        return (
                            <Grid xs={12} container borderBottom={1} px={2} py={1} borderColor={"#E5E5E5"} alignItems={'center'} key={index}>
                                <Grid xs={6} sm={4}>
                                    <Box display={"flex"} alignItems={"center"} gap={0.5}>
                                        {data.yearly ? squareEveryyear : squareOnceOff}
                                        <Typography variant={"body1"}>{`${formattedDate(data.dateStart)}${data.dateEnd ? ` - ${formattedDate(data.dateEnd)}` : ''}`}</Typography>
                                    </Box>
                                </Grid>
                                <Grid xs={6} sm justifyContent={'space-between'} display={'flex'} alignItems={'center'}>
                                    <Typography variant={"body1"}>{`${data.txtDayOffName}`}</Typography>
                                    <Box>
                                        <IconButton onClick={() => editDayOffCreated(data, index)}><EditIcon /></IconButton>
                                        <IconButton onClick={() => deleteDayOffCreated(index)}><DeleteOutlinedIcon /></IconButton>
                                    </Box>

                                </Grid>
                            </Grid>
                        );
                    })}
                </Grid>
            )}
        </div >
    );
}
