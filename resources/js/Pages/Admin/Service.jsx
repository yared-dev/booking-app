import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import React, {useState} from 'react';
import {Head, router, useForm} from "@inertiajs/react";
import {
    Autocomplete,
    Box,
    Button, Divider, FormControl,
    IconButton, InputLabel,
    List,
    ListItem,
    ListItemText, MenuItem,
    Paper, Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NewAuthenticatedLayout from "@/Layouts/NewAuthenticatedLayout.jsx";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Unstable_Grid2";

const serviceDuration = [
    {id: 1, value: 30, displayName: '30 min'},
    {id: 2, value: 60, displayName: '1h'},
    {id: 3, value: 90, displayName: '1h 30 min'},
    {id: 4, value: 120, displayName: '2h'},
    {id: 5, value: 150, displayName: '2h 30 min'},
    {id: 6, value: 180, displayName: '3h'},
    {id: 7, value: 210, displayName: '3h 30min'},
    {id: 8, value: 240, displayName: '4h'},
]

export default function Service({ auth, categories, services }) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        clearErrors} = useForm({"name": ""})

    function handleCategorySubmit(e) {
        e.preventDefault();

        post('/admin/category', data, {
            preserveState: true,
            onSuccess: () => {
                clearErrors()
                reset()
            },
            onError: (error) => {
                console.log(error)
            }
        })
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = async () => {
        try {
            const response = await axios.get(route('admin.employee.list')); // Replace with your API endpoint
            setEmployees(response.data);
        } catch (error) {
            console.error('Failed to fetch employees:', error);
        } finally {
            setOpen(true);
        }
        setOpen(true);
    };

    const [employees, setEmployees] = useState([]);

    const handleClose = () => {
        setOpen(false);
    };

    const [form, setForm] = useState({
        name: '',
        category: '',
        employee: [],
        duration: '',
        price: ''
    });

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const handleEmployeeChange = (event, value) => {
        setForm({
            ...form,
            employee: value.map(employee => employee.id)
        });
    };
    const handleCreateService = async (e) => {
        e.preventDefault();
        console.log(form)
        router.post(route('admin.service.store'), form);
        handleClose()
    };

    return (
        <NewAuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Service</h2>}
        >
            <Head title="Services" />

            <Paper elevation={0} style={{ width: '100%'}}>
                <Stack direction='row' spacing={2} justifyContent={'space-between'}>
                    <Box flex={2} p={2}>
                        <Paper elevation={1} sx={{ padding: 2, borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Categories
                            </Typography>
                            <form onSubmit={handleCategorySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <TextField
                                    label="Category name"
                                    variant="outlined"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    fullWidth
                                />
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button type="submit" variant="contained" color="primary" disabled={processing}>
                                        Create
                                    </Button>
                                </Box>
                            </form>
                            <List>
                                {categories.map((category, index) => (
                                    <React.Fragment key={category.id}>
                                        <ListItem
                                            secondaryAction={
                                                <>
                                                    <IconButton edge="end" aria-label="edit" onClick={() => null}>
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton edge="end" aria-label="delete" onClick={() => null}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </>
                                            }
                                        >
                                            <ListItemText primary={category.name} />
                                        </ListItem>
                                        {index < categories.length - 1 && <Divider />}
                                    </React.Fragment>
                                ))}
                            </List>
                        </Paper>
                    </Box>
                    <Box flex={4} p={2}>
                        <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
                            <Box display={'flex'} justifyContent={'space-between'}>
                                <Typography variant="h6" gutterBottom>
                                    Services
                                </Typography>
                                <Button type="submit" variant="contained" color="primary" onClick={handleClickOpen} disabled={processing}>
                                    New Service
                                </Button>
                            </Box>
                            <List>
                                {services.map((service, index) => (
                                    <React.Fragment key={index}>
                                        <ListItem
                                              secondaryAction={
                                                  <>
                                                      <IconButton edge="end" aria-label="edit" onClick={() => null}>
                                                          <EditIcon />
                                                      </IconButton>
                                                      <IconButton edge="end" aria-label="delete" onClick={() => null}>
                                                          <DeleteIcon />
                                                      </IconButton>
                                                  </>
                                              }
                                        >
                                            <ListItemText primary={service.name} />
                                        </ListItem>
                                        {index < categories.length - 1 && <Divider />}
                                    </React.Fragment>
                                ))}
                            </List>
                        </Paper>
                    </Box>
                </Stack>
                {/*<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={handleCategorySubmit}>
                        <input type={"text"}
                               value={data.name}
                               onChange={e => setData('name', e.target.value)}/>
                        <button type={"submit"} disabled={processing}>Create</button>
                    </form>
                    {errors && <div>Error: {JSON.stringify(errors)}</div>}
                    {categories.map((category) => (<div key={category.id}>{category.name}</div>))}
                </div>*/}



            </Paper>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth={'sm'}
            >
                <DialogTitle>Service</DialogTitle>
                <DialogContent>
                    <form id={'create-service'}>
                        <Grid container spacing={2} p={1}>
                            <Grid item xs={12} md={12}>
                                <Typography variant={'h6'}>Detail</Typography>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    variant={'outlined'}
                                    label={'Name'}
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="select-category-label">Category</InputLabel>
                                    <Select
                                        labelId="select-category-label"
                                        id="select-category"
                                        name="category"
                                        value={form.category}
                                        onChange={handleChange}
                                        label="Category"
                                    >
                                        {categories.map((category, index) => (
                                            <MenuItem key={index} value={category.id}>{category.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <Autocomplete
                                        multiple
                                        id="tags-outlined"
                                        options={employees}
                                        getOptionLabel={(option) => option.name + ' ' + option.lastName}
                                        value={employees.filter(employee => form.employee.includes(employee.id))}
                                        onChange={handleEmployeeChange}
                                        filterSelectedOptions
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Employee"
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Typography variant={'h6'}>Duration & Price</Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="select-duration-label">Duration</InputLabel>
                                    <Select
                                        labelId="select-duration-label"
                                        id="select-duration"
                                        name="duration"
                                        value={form.duration}
                                        onChange={handleChange}
                                        label="Duration"
                                    >
                                        {serviceDuration.map((duration, index) => (
                                            <MenuItem key={index} value={duration.id}>{duration.displayName}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    variant={'outlined'}
                                    label={'Price'}
                                    name="price"
                                    value={form.price}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleCreateService}>Save</Button>
                </DialogActions>
            </Dialog>
        </NewAuthenticatedLayout>
    );
}
