import { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useForm } from "@inertiajs/react";
import PhoneField from "@/Components/PhoneField";
import OutlookCalendar from "@/Components/OutlookCalendar";
import GoogleCalendar from "@/Components/GoogleCalendar";
import ButtonSinginGoogle from "@/Components/ButtonSinginGoogle";
import ButtonSinginOutlook from "@/Components/ButtonSinginOutlook";
import QuillEditor from "@/Components/QuillEditor";




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

    const [selectedComponent, setSelectedComponent] = useState('TextField');

    const renderSelectedComponent = () => {
        if (selectedComponent === 'TextField') {
            return (
                <TextField
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    fullWidth
                    rows={2}
                    sx={{
                        height: '100%',
                        '& .MuiInputBase-root': {
                            height: '100%',
                            display: 'flex',
                            alignItems: 'start'
                        }
                    }}
                />
            );
        } else if (selectedComponent === 'QuillEditor') {
            return <QuillEditor />;
        }
    };

    return (
        <>
            <form onSubmit={handleCreateEmployee} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
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
                                <PhoneField
                                    fullWidth
                                    variant="outlined"
                                    name="phoneNumber"
                                    value={data.phoneNumber}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <OutlookCalendar
                                    fullWidth
                                    variant="outlined"
                                    label="Outlook Calendar"
                                    name="outlookCalendar"

                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <ButtonSinginOutlook
                                    fullWidth
                                    variant="contained"
                                    style={{color:"white"}}
                                    label="Sing in with Outlook"
                                    name="btnOutlookCalendar"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <GoogleCalendar
                                    fullWidth
                                    variant="outlined"
                                    label="Google Calendar"
                                    name="googleCalendar"
                                    value={data.phoneNumber}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <ButtonSinginGoogle
                                    fullWidth
                                    variant="outlined"
                                    label="Sing in with Google"
                                    name="btnGoogleCalendar"

                                />
                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%', gap: '1.5rem' }}>
                            <Box sx={{
                                //backgroundImage: "url('https://i.pinimg.com/736x/36/47/bf/3647bff4a8715f851e4a7fc4aa3aa431.jpg')",
                                backgroundImage: "url('https://png.pngtree.com/png-vector/20190411/ourmid/pngtree-business-male-icon-vector-png-image_916468.jpg')",
                                borderRadius: '100%',
                                border: '1px solid black',
                                aspectRatio: 1,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                width: '8rem'
                            }}>
                            </Box>
                            <label>
                                {`${data.name} ${data.lastName}`}
                            </label>
                            <Box sx={{ padding: '0.5rem 1rem', borderRadius: '5px', backgroundColor: '#FFE5E5' }} color="red"><label>Status</label></Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{display:"flex", boxSizing:"border-box", flexDirection:"column", height:"15rem"}}>
                        
                    <Box sx={{display: "flex", justifyContent:"end" }}>
                                <Button variant="outlined" onClick={() => setSelectedComponent('QuillEditor')}>Text mode</Button>
                                <Button variant="contained" onClick={() => setSelectedComponent('TextField')}>HTML mode</Button>
                            </Box>
                        {renderSelectedComponent()}
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
