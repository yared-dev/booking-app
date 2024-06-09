import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link} from "@inertiajs/react";
import NewAuthenticatedLayout from "@/Layouts/NewAuthenticatedLayout.jsx";
import {Box, Button, Grid, Paper, Typography} from "@mui/material";
import React from "react";

const EmployeeGrid = ({ data, onEdit, onDelete }) => {
    return (
        <Paper style={{ padding: '16px' }}>
            <Grid
                container spacing={2}
                style={{
                    marginBottom: '8px',
                    backgroundColor: '#e0e0e0',
                    padding: '8px',
                    borderRadius: '4px'
                }}
            >
                <Grid item xs={3}>
                    <Typography variant="h6">Full Name</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h6">Email</Typography>
                </Grid>
                <Grid item xs={5}>
                    <Typography variant="h6">Actions</Typography>
                </Grid>
            </Grid>
            {data.map((employee, index) => (
                <Grid
                    container
                    spacing={2}
                    key={employee.id}
                    style={{
                        alignItems: 'center',
                        marginBottom: '8px',
                        backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff',  // Alternating background colors
                        padding: '8px',
                    }}
                >
                    <Grid item xs={3}>
                        <Typography variant="body1">{employee.name} {employee.lastName || ''}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="body1">{employee.email}</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Link href={route('admin.employee.edit', {employee: employee.id})} method="get" as="button" type="button">
                            <Button variant="contained" color="primary" size="small" style={{ marginRight: '8px' }}>Edit</Button>
                        </Link>
                        <Button onClick={() => onDelete(employee.id)} variant="contained" color="secondary" size="small">Delete</Button>
                    </Grid>
                </Grid>
            ))}
        </Paper>
    );
};

export default function Index({ auth, employees }) {
    return (
        <NewAuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Employees</h2>}
        >
            <Head title="Employees" />

            <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Link href={route('admin.employee.create')} method="get" as="button" type="button">
                        <Button variant="contained" color="primary">
                            Create Employee
                        </Button>
                    </Link>
                </Box>
                {employees.length === 0 && <div className="p-6 text-gray-900">No employees yet</div>}
                {employees.length > 0 && <EmployeeGrid data={employees} onDelete={() => null} onEdit={() => null} />}
            </Paper>
        </NewAuthenticatedLayout>
    );
}
