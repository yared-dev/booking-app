import {useForm, usePage} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import {useEffect, useState} from "react";

export default function WorkingHoursForm({ intervals, workingHour }) {
    const { props } = usePage();
    const { employee } = props;

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
        console.log({...data, employee_id: employee.id})

        post(`/admin/user/${employee.id}/working-hours`,
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
        post(`/admin/user/${employee.id}/working-hours/apply-every-day`,
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
        <form onSubmit={handleIntervalSelection}>
            <p>{workingHourData.value}</p>

            <select value={data.start} onChange={e => setData('start', e.target.value)}>
                {intervals.map((interval) => (
                    <option key={`start-${interval}`} value={interval}>
                        {interval}
                    </option>
                ))}
            </select>

            <select value={data.end} onChange={e => setData('end', e.target.value)}>
                {intervals.map((interval) => (
                    <option key={`end-${interval}`} value={interval}>
                        {interval}
                    </option>
                ))}
            </select>

            {workingHourData.key === 1 && (<SecondaryButton onClick={applyEveryDay}>apply to every day</SecondaryButton>)}

            <PrimaryButton type={'submit'}>Save</PrimaryButton>
        </form>
    );
}
