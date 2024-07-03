import React, { useState, useMemo } from "react";
import {
    Box,
    Select,
    MenuItem,
    ListSubheader,
    TextField,
    InputAdornment,
    OutlinedInput
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";


export default function PhoneField({ className = '', ...props }) {

    const [selectedCountry, setSelectedCountry] = useState(countries[0]);
    const [searchText, setSearchText] = useState("");

    const handleChangeCountry = (e) => {
        setSelectedCountry(e.target.value);
    };

    const displayedOptions = useMemo(
        () => countries.filter((country) => containsText(country, searchText)),
        [searchText]
    );

    const [shrink, setShrink] = useState(false);
    const [label_, setLabel] = useState("");

    return (
        <Box sx={{ display: 'flex' }}>
            <Select
                MenuProps={{ autoFocus: false }}
                value={selectedCountry}
                onChange={handleChangeCountry}
                onClose={() => setSearchText("")}
                renderValue={() => (
                    <Box component="span">
                        <img
                            loading="lazy"
                            width="30"
                            src={`https://flagcdn.com/w20/${selectedCountry.code.toLowerCase()}.png`}
                            srcSet={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png 2x`}
                            alt=""
                            style={{ marginRight: 10 }}
                        />
                    </Box>
                )}
                input={<OutlinedInput />}
                sx={{ '& .MuiSelect-select': { display: 'flex', alignItems: 'center' } }}
                inputProps={{ 'aria-label': 'Without label' }}
            >
                <ListSubheader>
                    <TextField
                        size="small"
                        autoFocus
                        placeholder="Type to search..."
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            )
                        }}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key !== "Escape") {
                                e.stopPropagation();
                            }
                        }}
                    />
                </ListSubheader>
                {displayedOptions.map((country, i) => (
                    <MenuItem key={i} value={country}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <img
                                    loading="lazy"
                                    width="20"
                                    src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                                    srcSet={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png 2x`}
                                    alt=""
                                    style={{ marginRight: 10 }}
                                />
                                {country.label}
                            </Box>
                            <Box sx={{ textAlign: 'right' }}>
                                +{country.phone}
                            </Box>
                        </Box>
                    </MenuItem>
                ))}
            </Select>

            <TextField
                {...props}

                placeholder={selectedCountry ? selectedCountry.example : ''}
                label={label_}
                onFocus={() => {setShrink(true); setLabel("Phone Number")}}
                onBlur={(e) => {setShrink(!!e.target.value); setLabel("")}}
                InputLabelProps={{ shrink }}
            >
                
                    
                
            </TextField>

        </Box>);
}



const containsText = (country, searchText) =>
    country.label.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js

const countries = [
    { code: 'AD', label: 'Andorra', phone: '376', example: '312 345' },
    { code: 'AE', label: 'United Arab Emirates', phone: '971', example: '050 123 4567' },
    { code: 'AF', label: 'Afghanistan', phone: '93', example: '070 123 4567' },
    { code: 'AG', label: 'Antigua and Barbuda', phone: '1-268', example: '464 1234' },
    { code: 'AI', label: 'Anguilla', phone: '1-264', example: '235 1234' },
    { code: 'AL', label: 'Albania', phone: '355', example: '066 123 4567' },
    { code: 'AM', label: 'Armenia', phone: '374', example: '077 123 456' },
    { code: 'AO', label: 'Angola', phone: '244', example: '923 123 456' },
    { code: 'AR', label: 'Argentina', phone: '54', example: '9 (11) 1234 567' },
    { code: 'AS', label: 'American Samoa', phone: '1-684', example: '733 1234' },
    { code: 'AT', label: 'Austria', phone: '43', example: '0664 123456' },
    { code: 'AU', label: 'Australia', phone: '61', example: '0412 345 678' },
];