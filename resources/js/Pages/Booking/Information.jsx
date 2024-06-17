import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Box, CssBaseline, Grid } from "@mui/material";
import { useEffect } from "react";
import UnstyledSelectRichOptions from "./SelectedCountry";

const Information = ({ timeSlots, dateTime, onDateTimeChange }) => {
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
    return (
        <Box width={"100%"}>
            <CssBaseline />
            <form>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6}>
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
                    <Grid item xs={6}>
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
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6}>
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
                    <Grid item xs={6}>
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
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6}>
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
                    <Grid item xs={6}>
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
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6}>
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
                    <Grid item xs={6}>
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
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6}>
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
                    <Grid item xs={6}>
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
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6}>
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
                    <Grid item xs={6}>
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
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6}>
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
                    <Grid item xs={6}>
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
