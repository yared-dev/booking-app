import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import {useForm} from "@inertiajs/react";

export default function Profile({ auth, employee }) {
    const {
        data,
        setData,
        post,
        put,
        processing,
        reset,
        errors,
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
            if (auth.user.roles[0].name === 'admin') {
                put(route('admin.employee.update', employee.id), {
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
                put(route('employee.profile.update'), {
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
            }
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
        <>
            <form onSubmit={handleCreateEmployee} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Name"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Last Name"
                            name="lastName"
                            value={data.lastName}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Username"
                            name="username"
                            value={data.username}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Password"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Phone Number"
                            name="phoneNumber"
                            value={data.phoneNumber}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Time Zone"
                            name="timeZone"
                            value={data.timeZone}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
                <Box mt={3}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={processing}
                        fullWidth
                    >
                        Create
                    </Button>
                </Box>
            </form>
            {errors && (
                <Box mt={2}>
                    <Typography color="error">{JSON.stringify(errors)}</Typography>
                </Box>
            )}
        </>
    );
}
