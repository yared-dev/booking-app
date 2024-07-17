import { useForm } from "react-hook-form";
import React, { useImperativeHandle, forwardRef, useState } from "react";
import { TextField, Typography, FormControl, Autocomplete, Chip, Button, IconButton } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import FormTextAutoComplete from "@/Components/formComponent/FormTextAutoComplete";
import FormSelectAutoComplete from "@/Components/formComponent/FormSelectAutoComplete";

//Icons
import AccessTimeIcon from '@mui/icons-material/AccessTime';


const SpecialDaysAddPeriodForm = forwardRef(({ index, onFormSubmit, intervals }, ref) => {

    // data for SERVICES select from database
    const dataServices = [
        { name: "service test 1" },
        { name: "service test 2" },
        { name: "service test 3" },
        { name: "service test 4" },
        { name: "service test 5" },
        { name: "long long service name test 5" },
    ];

    const defaultValues = {
        txtStartHour: null,
        txtEndHour: null,
        arrayServices: [],
    }

    //react-hook-form
    const { handleSubmit, control, setValue, reset, clearErrors } = useForm(
        { defaultValues: defaultValues }
    )

    const onSubmit = (data) => {
        onFormSubmit(data, index); // Pass index to identify which form is submitting
    };

    // Expose the handleSubmit function to the parent component via ref
    useImperativeHandle(ref, () => ({
        submitForm: () => handleSubmit(onSubmit)(),
    }));

    return (
        <Grid container xs={12} p={2} border={"1px solid #ECECEC"} gap={2}>
            <Grid xs sm={2.5}>
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

            <Grid xs sm={2.5}>
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

            <Grid xs={12} sm>
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

        </Grid>

    );

});

export default SpecialDaysAddPeriodForm;