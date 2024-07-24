import React, { useState, useEffect } from "react";
import { useForm as useFormInertiajs, usePage } from "@inertiajs/react";
import { useForm as useFormReactHook, useWatch } from "react-hook-form";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import { IconButton, Box, styled, Chip, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"
import FormRadioGroup from "@/Components/formComponent/FormRadioGroup";
import FormTextAutoComplete from "@/Components/formComponent/FormTextAutoComplete";


//icons
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FormSelectAutoComplete from "@/Components/formComponent/FormSelectAutoComplete";


// Custom STYLE radio button
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
//------------------------##-----------------------------


export default function WorkingHoursForm({ intervals, workingHour, user, allDays = false }) {
    const [workingHourData, setWorkingHourData] = useState({});

    useEffect(() => {
        console.log('se actualiza form ', workingHour);
        setWorkingHourData(workingHour);
    }, [workingHour]);

    const {
        data,
        setData,
        post,
        processing,
        reset: resetInertiajs,
        errors,
        transform,
        clearErrors: clearErrorsInertiajs
    } = useFormInertiajs({
        day: workingHourData.key,
        start: workingHourData.start_time || null,
        end: workingHourData.end_time || null,
    });

    useEffect(() => {
        console.log('workingHourData:', workingHourData);
        setData({
            day: workingHourData.key,
            start: workingHourData.start_time || null,
            end: workingHourData.end_time || null,
        });
    }, [workingHourData]);

    const handleIntervalSelection = async (formData) => {
        console.log({ ...formData, employee_id: user.id });

        const body = {
            day: workingHourData.key,
            end: formData.txtEndHour,
            start: formData.txtStartHour
        }

        try {
            const response = await axios.post(route('admin.working-hours.store', { id: user.id }), body)
            console.log(response)
        } catch (error) {
            console.log(error)
        }

    };

    const applyEveryDay = () => {
        post(route('admin.working-hours.every-day', { id: user.id }), {
            preserveState: true,
            preserveScroll: true,
            errorBag: 'applyEveryDay',
            onSuccess: () => {
                clearErrorsInertiajs();
            },
            onError: (error) => {
                console.log(error);
            }
        });
    };

    const rdOptions = [
        { id: "work", label: "Work Hours" },
        { id: "break", label: "Break" },
    ];

    const dataServices = [
        { id: 1, name: "service test 1" },
        { id: 2, name: "service test 2" },
        { id: 3, name: "service test 3" },
        { id: 4, name: "service test 4" },
        { id: 5, name: "service test 5" },
        { id: 6, name: "long long service name test 5" },
    ];

    const defaultValues = {
        typeRecord: rdOptions[0],
        txtStartHour: null,
        txtEndHour: null,
        arrayServices: [],
    };

    const { handleSubmit,
        control,
        setValue,
        reset,
        clearErrors
    } = useFormReactHook({
        defaultValues: defaultValues,
    });

    const typeRecordValue = useWatch({ control, name: "typeRecord" });

    const [rdDisabledID, setRdDisabledID] = useState(null);
    const [mainBoxExpanded, setMainBoxExpanded] = useState(false);

    const handleExpandedMainBox = () => {
        reset();
        clearErrors();
        setRdDisabledID(null);
        setMainBoxExpanded(!mainBoxExpanded);
    };

    const [editObjectID, setEditObjectID] = useState(null);
    const [objecDayDataCreated, setObjectDayDataCreated] = useState([]);

    const onSubmit = (formData) => {
        if (typeRecordValue?.id === rdOptions[1].id) {
            delete formData.arrayServices;
        }

        if (editObjectID != null) {
            objecDayDataCreated[editObjectID] = formData;
        } else {
            setObjectDayDataCreated([...objecDayDataCreated, formData]);
        }

        handleIntervalSelection(formData);
        reset();
        setEditObjectID(null);
        setRdDisabledID(null);
    };

    const editDayCreated = (currentObject, index) => {
        reset();
        clearErrors();
        setEditObjectID(index);
        if (currentObject.arrayServices) { setValue("arrayServices", currentObject.arrayServices); }

        setValue("typeRecord", currentObject.typeRecord);
        setValue("txtStartHour", currentObject.txtStartHour);
        setValue("txtEndHour", currentObject.txtEndHour);
        setRdDisabledID(currentObject.typeRecord.id);
        setMainBoxExpanded(true);
    };

    const deleteDayCreated = (index) => {
        setObjectDayDataCreated((prevData) =>
            prevData.filter((_, i) => i !== index)
        );
    };

    return (
        <Grid container alignItems={"center"}>
            <Grid container sx={{ backgroundColor: "#E5E5E5" }} className="rounded-t-lg" px={2} alignItems="center" xs={12}>
                <Grid xs ><Typography variant="body1">{workingHourData.value}</Typography></Grid>
                <Grid xs={"auto"}><Box>
                    {allDays && (<SecondaryButton onClick={applyEveryDay}>apply to all days</SecondaryButton>)}
                    <IconButton onClick={handleExpandedMainBox}>
                        <AddIcon sx={{ backgroundColor: `${mainBoxExpanded ? "#1976D2" : "white"}`, color: `${mainBoxExpanded ? "white" : "#1976D2"}`, borderRadius: "100%" }} />
                    </IconButton>
                </Box></Grid>
            </Grid>

            {mainBoxExpanded && (
                <Grid xs={12} container p={2} sx={{ border: "1px solid #ECECEC" }} rowGap={2}>
                    <Grid xs={12} >
                        <FormRadioGroup
                            row
                            sx={{ gap: "1rem" }}
                            name="typeRecord"
                            control={control}
                            rules={{ required: "One is required" }}
                            options={rdOptions}
                            checkedIcon={<BpCheckedIcon />}
                            bpIcon={<BpIcon />}
                            bpSize="small"
                            disabledExcept={rdDisabledID}
                        />
                    </Grid>

                    <Grid xs={12} container columnGap={3} rowGap={2}>
                        <Grid xs={12} sm={12}><Typography variant="body1">{`${typeRecordValue?.id === rdOptions[0].id ? "Work Hours" : "Break Hours"}`}</Typography></Grid>
                        <Grid xs={12} sm={2.5}>
                            <FormTextAutoComplete
                                name={"txtStartHour"}
                                control={control}
                                fullWidth
                                popupIcon={null}
                                label="Start"
                                options={intervals}
                                rules={{ required: "This field is required" }}
                                icon={<AccessTimeIcon />}
                                size="small"
                            />
                        </Grid>
                        <Grid xs={12} sm={2.5}>
                            <FormTextAutoComplete
                                name={"txtEndHour"}
                                control={control}
                                fullWidth
                                popupIcon={null}
                                label="End"
                                options={intervals}
                                rules={{ required: "This field is required" }}
                                icon={<AccessTimeIcon />}
                                size="small"
                            />
                        </Grid>

                        {typeRecordValue?.id === rdOptions[0].id && (
                            <Grid xs>
                                <FormSelectAutoComplete
                                    multiple
                                    limitTags={2}
                                    name={"arrayServices"}
                                    control={control}
                                    label={"Services"}
                                    options={dataServices}
                                    rules={{ required: "This field is required" }}
                                    fullWidth
                                    size="small"
                                />
                            </Grid>
                        )}
                    </Grid>

                    <Grid container xs={12} columnGap={2}>
                        <Grid xs={"auto"} xsOffset={"auto"}>
                            <Button variant="outlined" onClick={() => setMainBoxExpanded(false)}>Cancel</Button>
                        </Grid>
                        <Grid xs={"auto"}>
                            <Button variant="contained" onClick={handleSubmit(onSubmit)}>Save</Button>
                        </Grid>
                    </Grid>
                </Grid>
            )}

            {objecDayDataCreated.map((refObject, index) => {
                return (
                    <Grid key={index} xs={12} container py={1} px={2} className={`${index === objecDayDataCreated.length - 1 ? "rounded-b-lg" : ""}`} alignItems={"center"} sx={{ border: "1px solid #ECECEC" }} color="gray" columnGap={3}>
                        <Grid xs sm={"auto"} order={{ xs: 1, sm: 1 }}>
                            <Typography variant="body1">{`${refObject.txtStartHour} - ${refObject.txtEndHour}`}</Typography>
                        </Grid>
                        <Grid xs={12} sm sx={{ overflow: 'hidden', flexWrap: 'nowrap' }} order={{ xs: 3, sm: 2 }}>
                            <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '1rem', paddingRight: '5rem', overflow: 'auto' }}>
                                {refObject.arrayServices && refObject.arrayServices.length > 0 ? (
                                    refObject.arrayServices.map((value, index) => (
                                        <Chip key={index} label={value.name} />
                                    ))
                                ) : (
                                    <Chip label="Break" />
                                )}
                            </Box>
                        </Grid>
                        <Grid xs={"auto"} order={{ xs: 2, sm: 3 }}>
                            <IconButton onClick={() => editDayCreated(refObject, index)}><EditIcon /></IconButton>
                            <IconButton onClick={() => deleteDayCreated(index)}><DeleteOutlinedIcon /></IconButton>
                        </Grid>
                    </Grid>
                );
            })}
        </Grid>
    );
}


