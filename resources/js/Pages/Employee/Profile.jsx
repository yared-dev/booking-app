import { Head, Link, usePage } from "@inertiajs/react";
import { lazy, Suspense, useState } from "react";
import { Box, Paper, Tab, Tabs, TextField, MenuItem, OutlinedInput, InputAdornment } from "@mui/material";
import NewAuthenticatedLayout from "@/Layouts/NewAuthenticatedLayout.jsx";
import WorkingHours from "@/Pages/Admin/Employee/Partials/WorkingHours.jsx";
import DaysOff from "@/Pages/Admin/Employee/Partials/DaysOff.jsx";
import LanguageIcon from '@mui/icons-material/Language';

export default function Profile({ auth, timeIntervals, workingHours }) {
    const { errors } = usePage().props

    const EmployeeProfile = lazy(() => import('@/Pages/Admin/Employee/Partials/Profile.jsx'));

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const [value, setValue] = useState(0);

    const handleChangeTabs = (event, newValue) => {
        setValue(newValue);
    };

    const TabPanel = (props) => {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        {children}
                    </Box>
                )}
            </div>
        );
    };

    //CBO

    const zones = [
        'Asia/Kabul',
        'Asia/Karachi'
    ]

    const [zone, setZone] = useState(zones[0]);
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setZone(value);
    };

    return (
        <NewAuthenticatedLayout
            user={auth.user}
            header={<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">Employee Profile</h2>
                
                    <TextField
                        size="small"
                        select
                        value={zone}
                    onChange={handleChange}
                    input={<OutlinedInput />}
                    
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LanguageIcon />
                          </InputAdornment>
                        ),
                        'aria-label': 'Without label',
                      }}
                    >
                    {zones.map((zone) => (
                        <MenuItem
                            key={zone}
                            value={zone}
                        >
                            {zone}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>
            }
        >
            <Head title="Profile" />


            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChangeTabs} aria-label="basic tabs example">
                        <Tab label="Details" component={Link} href={route('employee.profile',)} {...a11yProps(0)} />
                        <Tab label="Working hours" {...a11yProps(1)} />
                        <Tab label="Days Off" {...a11yProps(2)} />
                        <Tab label="Special Days" {...a11yProps(3)} />
                    </Tabs>
                </Box>
                <Suspense fallback={<div>Loading...</div>}>
                    <TabPanel value={value} index={0}>
                        <EmployeeProfile auth={auth} employee={auth.user} />
                    </TabPanel>
                </Suspense>
                <Suspense fallback={<div>Loading...</div>}>
                    <TabPanel value={value} index={1}>
                        <WorkingHours
                            intervals={timeIntervals}
                            workingHours={workingHours}
                            user={auth.user}
                        />
                    </TabPanel>
                </Suspense>
                <TabPanel value={value} index={2}>
                    <DaysOff />
                </TabPanel>
            </Box>



        </NewAuthenticatedLayout>
    );
}
