import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import {
    Box,
    Button,
    Checkbox,
    CssBaseline,
    Grid,
    MenuItem,
    Select,
    TextareaAutosize,
    createTheme,
    styled,
    useMediaQuery,
} from "@mui/material";
import { useEffect } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PrimaryButton from "@/Components/PrimaryButton";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});
const GENDER = [
    {
        value: 0,
        label: "Male",
    },
    {
        value: 1,
        label: "Female",
    },
    {
        value: 2,
        label: "Other",
    },
];
const VACUNE = [
    {
        value: 0,
        label: "Yes",
    },
    {
        value: 1,
        label: "No",
    },
];
const Information = ({ triggerSubmit, submitInformation }) => {
    const label = { inputProps: { "aria-label": "Checkbox demo" } };
    const theme = createTheme();

    const { data, setData, post, processing,    errors, reset } = useForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        City: '',
        fechaNacimiento: '',
        gender: 0,
        fullAdrress: '',
        Country: '',
        vacune: 0,
        anotherVacune: '',
        aboutUs: '',
        medication: '',
        reasonHealing: '',
        remember: false,
    });
    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    useEffect(() => {
        console.log('info form ', triggerSubmit);
        if (triggerSubmit) {
            document.getElementById('hiddenSubmitButton').click();
        }
    }, [triggerSubmit]);

    const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));

    return (
        <Box width={"100%"}>
            <CssBaseline />
            <form onSubmit={submitInformation}>
                <Grid
                    container
                    paddingTop={5}
                    spacing={2}
                    alignItems="center"
                    direction={isLargeScreen ? "row" : "column"}
                >
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        {/* <AcUnitIcon sx={{ fontSize: 10 }}></AcUnitIcon> */}
                        <InputLabel htmlFor="firstName" value="First Name:" />
                        <TextInput
                            required
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
                            required
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
                <Grid
                    container
                    paddingTop={5}
                    spacing={2}
                    alignItems="center"
                    direction={isLargeScreen ? "row" : "column"}
                >
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        {/* <AcUnitIcon sx={{ fontSize: 10 }}></AcUnitIcon> */}
                        <InputLabel htmlFor="email" value="Email:" />
                        <TextInput
                            required
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
                        {/* <div style={{ display: "flex" }}> */}
                        {/* <UnstyledSelectRichOptions></UnstyledSelectRichOptions> */}
                        <InputLabel htmlFor="phone" value="Phone:" />
                        <TextInput
                            required
                            id="phone"
                            type="text"
                            name="phone"
                            value={data.phone}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData("phone", e.target.value)}
                        />
                        <InputError message={errors.phone} className="mt-2" />
                        {/* </div> */}
                    </Grid>
                </Grid>
                <Grid
                    container
                    paddingTop={5}
                    spacing={2}
                    alignItems="center"
                    direction={isLargeScreen ? "row" : "column"}
                >
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        {/* <AcUnitIcon sx={{ fontSize: 10 }}></AcUnitIcon> */}
                        <InputLabel htmlFor="City" value="City:" />
                        <TextInput
                            required
                            id="City"
                            type="text"
                            name="City"
                            value={data.City}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData("City", e.target.value)}
                        />
                        <InputError
                            message={errors.firstName}
                            className="mt-2"
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <InputLabel
                            htmlFor="fechaNacimiento"
                            value="Date Of Birth:"
                        />
                        <TextInput
                            required
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
                <Grid
                    container
                    paddingTop={5}
                    spacing={2}
                    alignItems="center"
                    direction={isLargeScreen ? "row" : "column"}
                >
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        {/* <AcUnitIcon sx={{ fontSize: 10 }}></AcUnitIcon> */}
                        <InputLabel htmlFor="Gender" value="Gender:" />
                        <Select
                            style={{ width: "100%", height: "2.5em" }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={data.gender}
                            onChange={(e) => setData("gender", data.gender)}
                        >
                            {GENDER.map((element) => {
                                return (
                                    <MenuItem
                                        value={element.value}
                                        key={element.value}
                                    >
                                        {element.label}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                        <InputError message={errors.Gender} className="mt-2" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <InputLabel
                            htmlFor="fullAdrress"
                            value="Full Address:"
                        />
                        <TextInput
                            required
                            id="fullAdrress"
                            type="text"
                            name="fullAdrress"
                            value={data.fullAdrress}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) =>
                                setData("fullAdrress", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.fullAdrress}
                            className="mt-2"
                        />
                    </Grid>
                </Grid>
                <Grid
                    container
                    paddingTop={5}
                    spacing={2}
                    alignItems="center"
                    direction={isLargeScreen ? "row" : "column"}
                >
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        {/* <AcUnitIcon sx={{ fontSize: 10 }}></AcUnitIcon> */}
                        <InputLabel htmlFor="Country" value="Country:" />
                        <TextInput
                            required
                            id="Country"
                            type="text"
                            name="Country"
                            value={data.Country}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData("Country", e.target.value)}
                        />
                        <InputError message={errors.Country} className="mt-2" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <InputLabel
                            htmlFor="filePhoto"
                            value="Please upload your face photo (max 5MB)"
                        />
                        <Button
                            style={{ width: "100%" }}
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload file
                            <VisuallyHiddenInput
                                type="file"
                                name="myImage"
                                accept="image/*"
                            />
                        </Button>
                    </Grid>
                </Grid>
                <Grid
                    container
                    paddingTop={5}
                    spacing={2}
                    alignItems="center"
                    direction={isLargeScreen ? "row" : "column"}
                >
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        {/* <AcUnitIcon sx={{ fontSize: 10 }}></AcUnitIcon> */}
                        <InputLabel
                            htmlFor="vacune"
                            value="Have you had a Covid vaccine?:"
                        />
                        <Select
                            style={{ width: "100%", height: "2.5em" }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={data.vacune}
                            onChange={(e) => setData("vacune", data.vacune)}
                        >
                            {VACUNE.map((element) => {
                                return (
                                    <MenuItem
                                        value={element.value}
                                        key={element.value}
                                    >
                                        {element.label}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                        <InputError message={errors.vacune} className="mt-2" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <InputLabel
                            htmlFor="anotherVacune"
                            value="Have you had other vaccine? If yes, which one?:"
                        />
                        <TextInput
                            required
                            id="anotherVacune"
                            type="text"
                            name="anotherVacune"
                            value={data.anotherVacune}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) =>
                                setData("anotherVacune", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.anotherVacune}
                            className="mt-2"
                        />
                    </Grid>
                </Grid>
                <Grid
                    container
                    paddingTop={5}
                    spacing={2}
                    alignItems="center"
                    direction={isLargeScreen ? "row" : "column"}
                >
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        {/* <AcUnitIcon sx={{ fontSize: 10 }}></AcUnitIcon> */}
                        <InputLabel
                            htmlFor="aboutUs"
                            value="Where did you hear about us:"
                        />
                        <TextInput
                            required
                            id="aboutUs"
                            type="text"
                            name="aboutUs"
                            value={data.aboutUs}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData("aboutUs", e.target.value)}
                        />
                        <InputError message={errors.aboutUs} className="mt-2" />
                    </Grid>
                </Grid>
                <Grid
                    container
                    paddingTop={5}
                    spacing={2}
                    alignItems="center"
                    direction={isLargeScreen ? "row" : "column"}
                >
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <InputLabel
                            htmlFor=""
                            value="Are you taking any medication(if yes please fill the below boxes.):"
                        />
                    </Grid>
                </Grid>
                <Grid
                    container
                    paddingTop={5}
                    spacing={2}
                    alignItems="center"
                    direction={isLargeScreen ? "row" : "column"}
                >
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <InputLabel
                            htmlFor=""
                            value="What medication are you taking: ( How much, How long, How often )."
                        />
                        <InputLabel
                            htmlFor=""
                            value="(Please add N/A if it is not applicable):"
                        />
                        <TextareaAutosize
                            minRows={6}
                            id="medication"
                            type="text"
                            name="medication"
                            value={data.medication}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) =>
                                setData("medication", e.target.value)
                            }
                        ></TextareaAutosize>
                        <InputError
                            message={errors.medication}
                            className="mt-2"
                        />
                    </Grid>
                </Grid>
                <Grid
                    container
                    paddingTop={5}
                    spacing={2}
                    alignItems="center"
                    direction={isLargeScreen ? "row" : "column"}
                >
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <InputLabel
                            htmlFor="reasonHealing"
                            value="Reason for the healing session (max 1000 characters):"
                        />
                        <TextareaAutosize
                            minRows={6}
                            id="reasonHealing"
                            type="text"
                            name="reasonHealing"
                            value={data.reasonHealing}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) =>
                                setData("reasonHealing", e.target.value)
                            }
                        ></TextareaAutosize>
                        <InputError
                            message={errors.reasonHealing}
                            className="mt-2"
                        />
                    </Grid>
                </Grid>
                <Grid
                    container
                    paddingTop={5}
                    spacing={2}
                    alignItems="center"
                    direction={isLargeScreen ? "row" : "column"}
                >
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Checkbox
                            name="remember"
                            required={true}
                            checked={data.remember}
                            label="Required"
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <InputLabel
                            htmlFor="reasonHealing"
                            value="Reason for the healing session (max 1000 characters):"
                        />
                    </Grid>
                </Grid>
                <Button type={'submit'} id="hiddenSubmitButton" hidden>Submit</Button>
            </form>
        </Box>
    );
};

export default Information;
