import { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";

export default function TextFieldMUI({icon, posIcon="start",...props}) {

    const [isFocused, setIsFocused] = useState(false);

    return (
        <TextField           
            {...props}           
            {...(icon && {
                InputLabelProps: {
                    shrink: isFocused || props.value?.length > 0,
                    sx: { paddingLeft: isFocused ? '0rem' : '1.5rem' },
                },
                InputProps: {
                    ...props.InputProps,
                    sx:{paddingLeft:"0.5rem"},
                    startAdornment: (
                        <InputAdornment position={posIcon} sx={props.error ? { color: "#D32F2F" } : undefined}>
                            {icon}
                        </InputAdornment>
                    ),
                },
                onFocus: () => setIsFocused(true),
                onBlur: () => setIsFocused(props.value?.length > 0)
            })}
        />
    );
}