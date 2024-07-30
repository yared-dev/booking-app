import WorkingHoursForm from "@/Pages/Admin/Employee/Partials/WorkingHoursForm.jsx";
import { useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";

export default function WorkingHours({ intervals, workingHours, user }) {
    const [workingHoursData, setWorkingHoursData] = useState([]);

    useEffect(() => {
        setWorkingHoursData(workingHours);
    }, [workingHours]);

    return (
        <Grid container spacing={2}>
            {workingHoursData &&
                workingHoursData.map((workingHour, index) => (
                    <Grid item xs={12} sm={12} key={workingHour.key}>
                        <WorkingHoursForm
                            key={workingHour.key}
                            intervals={intervals}
                            workingHour={workingHour}
                            user={user}
                            allDays={index === 0}
                        />
                    </Grid>
                ))}
        </Grid>
    );
}
