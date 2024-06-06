import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { Head } from '@inertiajs/react';
import NewAuthenticatedLayout from "@/Layouts/NewAuthenticatedLayout.jsx";
import {Box} from "@mui/material";

export default function Dashboard({ auth }) {
    return (
        <NewAuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Employees</h2>}
        >
            <Head title="Dashboard" />

            <Box>
                <p>Dashboard soon</p>
            </Box>
        </NewAuthenticatedLayout>
    );
}
