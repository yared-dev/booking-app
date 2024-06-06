import WorkingHoursForm from "@/Pages/Admin/Employee/Partials/WorkingHoursForm.jsx";
import {useEffect, useState} from "react";
import {Box, Container} from "@mui/material";

export default function WorkingHours({ intervals, workingHours, user }) {

    const [workingHoursData, setWorkingHoursData] = useState([]);

    useEffect(() => {
        setWorkingHoursData(workingHours)
    }, [workingHours]);

    return (
        <>
            {workingHoursData && workingHoursData.map((workingHour) => (
                <WorkingHoursForm
                    key={workingHour.key}
                    intervals={intervals}
                    workingHour={workingHour}
                    user={user}
                />
            ))}
        </>
    );
}
