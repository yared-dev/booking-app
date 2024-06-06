import {useForm, usePage} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import {useEffect, useState} from "react";
import {Grid, IconButton, MenuItem, Select} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function WorkingHoursForm({ intervals, workingHour, user }) {
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
        clearErrors} = useForm({
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
        console.log({...data, employee_id: user.id})

        post(route('admin.working-hours.store', {id: user.id}),
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
        post(route('admin.working-hours.every-day', {id: user.id}),
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

    return (
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
                <p>{workingHourData.value}</p>
            </Grid>

            <Grid item xs={12}>
                <form onSubmit={handleIntervalSelection}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <Select
                                value={data.start}
                                onChange={e => setData('start', e.target.value)}
                                displayEmpty
                            >
                                {intervals.map((interval) => (
                                    <MenuItem key={`start-${interval}`} value={interval}>
                                        {interval}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item>
                            <Select
                                value={data.end}
                                onChange={e => setData('end', e.target.value)}
                                displayEmpty
                            >
                                {intervals.map((interval) => (
                                    <MenuItem key={`end-${interval}`} value={interval}>
                                        {interval}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>

                        <Grid item>
                            {workingHourData.key === 1 && (<SecondaryButton onClick={applyEveryDay}>apply to every day</SecondaryButton>)}
                        </Grid>

                        <Grid item>
                            <PrimaryButton type={'submit'}>Save</PrimaryButton>
                        </Grid>

                        <Grid item>
                            <IconButton onClick={() => null}><DeleteIcon /></IconButton>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
}
