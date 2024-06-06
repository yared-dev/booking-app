import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import React from 'react';
import {Head, useForm} from "@inertiajs/react";
import {
    Box,
    Button, Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NewAuthenticatedLayout from "@/Layouts/NewAuthenticatedLayout.jsx";

export default function Service({ auth, categories }) {
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

    return (
        <NewAuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Service</h2>}
        >
            <Head title="Services" />

            <Paper elevation={0} style={{ width: '100%'}}>
                <Stack direction='row' spacing={2} justifyContent={'space-between'}>
                    <Box flex={2} p={2}>
                        <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
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
                                <Button type="submit" variant="contained" color="primary" disabled={processing}>
                                    New Service
                                </Button>
                            </Box>
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
        </NewAuthenticatedLayout>
    );
}
