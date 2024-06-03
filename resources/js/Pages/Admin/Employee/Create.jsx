import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, useForm, usePage} from "@inertiajs/react";
import WorkingHoursForm from "@/Pages/Admin/Employee/Partials/WorkingHoursForm.jsx";
import WorkingHours from "@/Pages/Admin/Employee/Partials/WorkingHours.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import TextInput from "@/Components/TextInput.jsx";

const formData = {
    name: "",
    lastName: "",
    email: "",
    username: "",
    password: null,
    phoneNumber: "",
    timeZone: "",
}

export default function Index({ auth, timeIntervals, workingHours, employee = null }) {
    const { errors } = usePage().props

    const {
        data,
        setData,
        post,
        put,
        processing,
        reset,
        clearErrors
    } = useForm({
        name: employee ? employee.name : "",
        lastName: employee ? employee.lastName : "",
        email: employee ? employee.email : "",
        username: employee ? employee.username : "",
        password: "",
        phoneNumber: employee ? employee.phoneNumber : "",
        timeZone: employee ? employee.timeZone : "",
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleCreateEmployee = (e) => {
        e.preventDefault();
        if (employee) {
            put(`/admin/employee/${employee.id}`, {
                preserveState: true,
                errorBag: 'employeeEdit',
                onSuccess: () => {
                    clearErrors()
                    reset()
                },
                onError: (error) => {
                    console.log(error)
                }
            })
        } else {
            post('/admin/employee', data, {
                preserveState: true,
                errorBag: 'employeeCreate',
                onSuccess: () => {
                    clearErrors()
                    reset()
                },
                onError: (error) => {
                    console.log(error)
                }
            })
        }
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Employees</h2>}
        >
            <Head title="Employeess" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 space-y-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Details</div>
                        <form onSubmit={handleCreateEmployee} className="mt-6 space-y-6">
                            <TextInput type="text" name="name" value={data.name} onChange={handleChange}
                                   placeholder="Name"/>
                            <TextInput type="text" name="lastName" value={data.lastName} onChange={handleChange}
                                   placeholder="Last Name"/>
                            <TextInput type="text" name="email" value={data.email} onChange={handleChange}
                                   placeholder="Email"/>
                            <TextInput type="text" name="username" value={data.username} onChange={handleChange}
                                   placeholder="Username"/>
                            <TextInput type="password" name="password" value={data.password} onChange={handleChange}
                                   placeholder="Password"/>
                            <TextInput type="text" name="phoneNumber" value={data.phoneNumber} onChange={handleChange}
                                   placeholder="Phone Number"/>
                            <TextInput type="text" name="timeZone" value={data.timeZone} onChange={handleChange}
                                   placeholder="Time Zone"/>
                            <PrimaryButton type="submit" disabled={processing}>Create</PrimaryButton>
                        </form>
                        {errors && <div>{JSON.stringify(errors)}</div>}
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <WorkingHours
                            intervals={timeIntervals}
                            workingHours={workingHours}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
