import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link} from "@inertiajs/react";
import {Button} from "@mui/material";

export default function Index({ auth, employees }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Employees</h2>}
        >
            <Head title="Employees" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <Link href={route('admin.employee.create')} method="get" as="button" type="button">Create Employee</Link>
                        {employees.length === 0 && <div className="p-6 text-gray-900">No employees yet</div>}
                        {employees.length > 0 && employees.map((value, index) => (
                            <div key={index}>
                                <div className="p-6 text-gray-900">{JSON.stringify(value)}</div>
                                <Link href={route('admin.employee.edit', {employee: value.id})} method="get" as="button" type="button">Editar</Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
