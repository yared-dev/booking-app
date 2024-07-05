import { useState } from 'react';
import { Autocomplete, TextField, InputAdornment } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function HourAutoComplete({ className = '', intervals, setSelectedValue, ...props }) {

    //just shrink for "start" and "end" textfield. onFocus, onBlur
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState('');

    

    return (
        <Autocomplete
            popupIcon={null}
            size="small"
            inputValue={inputValue}
            onInputChange={(event, value) => {setInputValue(value); setSelectedValue(value)}}
            options={intervals.map((interval) => interval)}
            
            renderInput={(params) => {
                return (
                    <TextField
                        {...params}
                        label={props.label}
                        InputLabelProps={{ shrink: isFocused, sx: { paddingLeft: isFocused ? '0px' : '1rem' } }}
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position="start"><AccessTimeIcon sx={{ fontSize: 15 }} /></InputAdornment>
                            )
                        }}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(inputValue.length > 0)}
                    />
                );
            }}
        />
    );
}