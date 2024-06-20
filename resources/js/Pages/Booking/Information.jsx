import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Box, CssBaseline, Grid, createTheme, useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import UnstyledSelectRichOptions from "./SelectedCountry";

const Information = ({ timeSlots, dateTime, onDateTimeChange }) => {
    const theme = createTheme();

    const { data, setData, post, processing, errors, reset } = useForm({
        firstName: "",
        lastName: "",
        email: "",
    });
    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };
    const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));

    return (
        <Box width={"100%"}>
            <CssBaseline />
            <form>
                <Grid container spacing={2} alignItems="center" direction={isLargeScreen ? "row" : "column"}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        {/* <AcUnitIcon sx={{ fontSize: 10 }}></AcUnitIcon> */}
                        <InputLabel htmlFor="firstName" value="First Name:" />
                        <TextInput
                            id="firstName"
                            type="text"
                            name="firstName"
                            value={data.firstName}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) =>
                                setData("firstName", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.firstName}
                            className="mt-2"
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <InputLabel htmlFor="lastName" value="Last Name:" />
                        <TextInput
                            id="lastName"
                            type="text"
                            name="lastName"
                            value={data.lastName}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) =>
                                setData("lastName", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.lastName}
                            className="mt-2"
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center" direction={isLargeScreen ? "row" : "column"}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        {/* <AcUnitIcon sx={{ fontSize: 10 }}></AcUnitIcon> */}
                        <InputLabel htmlFor="email" value="Email:" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <div style={{ display: "flex" }}>
                                <UnstyledSelectRichOptions></UnstyledSelectRichOptions>
                                <InputLabel htmlFor="phone" value="Phone:" />
                                <TextInput
                                    id="phone"
                                    type="text"
                                    name="phone"
                                    value={data.phone}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("phone", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.phone}
                                    className="mt-2"
                                />
                        </div>
                    </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center" direction={isLargeScreen ? "row" : "column"}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        {/* <AcUnitIcon sx={{ fontSize: 10 }}></AcUnitIcon> */}
                        <InputLabel htmlFor="City" value="City:" />
                        <TextInput
                            id="City"
                            type="text"
                            name="City"
                            value={data.City}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) =>
                                setData("City", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.firstName}
                            className="mt-2"
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <InputLabel htmlFor="fechaNacimiento" value="Date Of Birth:" />
                        <TextInput
                            id="fechaNacimiento"
                            type="date"
                            name="fechaNacimiento"
                            value={data.fechaNacimiento}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) =>
                                setData("fechaNacimiento", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.lastName}
                            className="mt-2"
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center" direction={isLargeScreen ? "row" : "column"}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        {/* <AcUnitIcon sx={{ fontSize: 10 }}></AcUnitIcon> */}
                        <InputLabel htmlFor="Gender" value="Gender:" />
                        <TextInput
                            id="Gender"
                            type="text"
                            name="Gender"
                            value={data.Gender}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) =>
                                setData("Gender", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.Gender}
                            className="mt-2"
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <InputLabel htmlFor="lastName" value="Last Name:" />
                        <TextInput
                            id="lastName"
                            type="text"
                            name="lastName"
                            value={data.lastName}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) =>
                                setData("lastName", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.lastName}
                            className="mt-2"
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center" direction={isLargeScreen ? "row" : "column"}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        {/* <AcUnitIcon sx={{ fontSize: 10 }}></AcUnitIcon> */}
                        <InputLabel htmlFor="firstName" value="First Name:" />
                        <TextInput
                            id="firstName"
                            type="text"
                            name="firstName"
                            value={data.firstName}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) =>
                                setData("firstName", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.firstName}
                            className="mt-2"
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <InputLabel htmlFor="lastName" value="Last Name:" />
                        <TextInput
                            id="lastName"
                            type="text"
                            name="lastName"
                            value={data.lastName}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) =>
                                setData("lastName", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.lastName}
                            className="mt-2"
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center" direction={isLargeScreen ? "row" : "column"}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        {/* <AcUnitIcon sx={{ fontSize: 10 }}></AcUnitIcon> */}
                        <InputLabel htmlFor="firstName" value="First Name:" />
                        <TextInput
                            id="firstName"
                            type="text"
                            name="firstName"
                            value={data.firstName}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) =>
                                setData("firstName", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.firstName}
                            className="mt-2"
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <InputLabel htmlFor="lastName" value="Last Name:" />
                        <TextInput
                            id="lastName"
                            type="text"
                            name="lastName"
                            value={data.lastName}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) =>
                                setData("lastName", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.lastName}
                            className="mt-2"
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center" direction={isLargeScreen ? "row" : "column"}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        {/* <AcUnitIcon sx={{ fontSize: 10 }}></AcUnitIcon> */}
                        <InputLabel htmlFor="firstName" value="First Name:" />
                        <TextInput
                            id="firstName"
                            type="text"
                            name="firstName"
                            value={data.firstName}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) =>
                                setData("firstName", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.firstName}
                            className="mt-2"
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <InputLabel htmlFor="lastName" value="Last Name:" />
                        <TextInput
                            id="lastName"
                            type="text"
                            name="lastName"
                            value={data.lastName}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) =>
                                setData("lastName", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.lastName}
                            className="mt-2"
                        />
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default Information;
