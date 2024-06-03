import {useForm} from "@inertiajs/react";
import WorkingHoursForm from "@/Pages/Admin/Employee/Partials/WorkingHoursForm.jsx";
import {useEffect, useState} from "react";

export default function WorkingHours({ intervals, workingHours }) {

    const [workingHoursData, setWorkingHoursData] = useState([]);

    useEffect(() => {
        console.log('se actualiza ', workingHours)
        setWorkingHoursData(workingHours)
    }, [workingHours]);

    return (
        <section className='max-w-xl'>

            <div className="mt-6 space-y-6">
                <h1>Working Hours</h1>

                {workingHoursData && workingHoursData.map((workingHour) => (
                    <WorkingHoursForm
                        key={workingHour.key}
                        intervals={intervals}
                        workingHour={workingHour}/>
                ))}
            </div>

        </section>
    );
}
